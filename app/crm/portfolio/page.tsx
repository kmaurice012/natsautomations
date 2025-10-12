'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/ui/Toast';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export default function PortfolioManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'cctv',
    description: '',
    image: '',
    featured: false,
    order: 0,
  });
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    itemId: string | null;
  }>({ isOpen: false, itemId: null });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/crm/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPortfolio();
    }
  }, [status]);

  const fetchPortfolio = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setPortfolioItems(data.portfolio);
      } else {
        toast.error('Failed to fetch portfolio', 'Unable to load portfolio items');
      }
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
      toast.error('Connection Error', 'Failed to fetch portfolio items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    setUploading(true);
    try {
      const fileFormData = new FormData();
      fileFormData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: fileFormData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Image Uploaded', 'Your image has been uploaded successfully');
        return data.url;
      } else {
        const error = await response.json();
        toast.error('Upload Failed', error.error || 'Failed to upload image');
        return null;
      }
    } catch (error: any) {
      console.error('File upload error:', error);
      toast.error('Upload Error', error.message || 'Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      // If using file upload and a file is selected, upload it first
      if (uploadMethod === 'file' && selectedFile) {
        const uploadedUrl = await uploadFile();
        if (!uploadedUrl) {
          return; // Upload failed
        }
        imageUrl = uploadedUrl;
      }

      // Validate we have an image
      if (!imageUrl) {
        toast.warning('Missing Image', 'Please provide an image for the portfolio item');
        return;
      }

      const url = editingItem ? `/api/portfolio/${editingItem.id}` : '/api/portfolio';
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });

      if (response.ok) {
        fetchPortfolio();
        setShowModal(false);
        resetForm();
        toast.success(
          editingItem ? 'Portfolio Updated' : 'Portfolio Created',
          editingItem
            ? 'Portfolio item has been updated successfully'
            : 'New portfolio item has been created successfully'
        );
      } else {
        const error = await response.json();
        console.error('Server error:', error);
        toast.error(
          'Save Failed',
          error.details || error.error || 'Failed to save portfolio item'
        );
      }
    } catch (error: any) {
      console.error('Failed to save portfolio item:', error);
      toast.error('Error', error.message || 'Failed to save portfolio item');
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      featured: item.featured,
      order: item.order,
    });
    setImagePreview(item.image);
    setSelectedFile(null);
    setUploadMethod('url');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPortfolio();
        toast.success('Portfolio Deleted', 'Portfolio item has been deleted successfully');
      } else {
        toast.error('Delete Failed', 'Failed to delete portfolio item');
      }
    } catch (error) {
      console.error('Failed to delete portfolio item:', error);
      toast.error('Error', 'Failed to delete portfolio item');
    }
  };

  const confirmDelete = (id: string) => {
    setConfirmDialog({ isOpen: true, itemId: id });
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'cctv',
      description: '',
      image: '',
      featured: false,
      order: 0,
    });
    setSelectedFile(null);
    setImagePreview('');
    setUploadMethod('file');
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'cctv',
      description: '',
      image: '',
      featured: false,
      order: 0,
    });
    setSelectedFile(null);
    setImagePreview('');
    setUploadMethod('file');
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Portfolio Management
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage your portfolio showcase
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="/crm/dashboard" className="btn-outline">
                Dashboard
              </a>
              <a href="/" className="btn-outline">
                View Website
              </a>
              <button onClick={() => signOut()} className="btn-primary">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">
              Total Projects
            </p>
            <h3 className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {portfolioItems.length}
            </h3>
          </div>
          {['cctv', 'solar', 'fence', 'gate', 'smart'].map((cat) => (
            <div
              key={cat}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl shadow-lg p-6 border border-purple-200 dark:border-purple-800"
            >
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1 capitalize">
                {cat}
              </p>
              <h3 className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {portfolioItems.filter((item) => item.category === cat).length}
              </h3>
            </div>
          ))}
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <button onClick={handleAddNew} className="btn-primary">
            + Add New Project
          </button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
                    📸
                  </div>
                )}
                {item.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Order: {item.order}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(item.id)}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {portfolioItems.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              No portfolio items yet. Add your first project!
            </p>
            <button onClick={handleAddNew} className="btn-primary">
              + Add New Project
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Residential CCTV Installation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="cctv">CCTV</option>
                  <option value="solar">Solar</option>
                  <option value="fence">Fence</option>
                  <option value="gate">Gate</option>
                  <option value="smart">Smart Home</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Describe the project..."
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Project Image *
                </label>

                {/* Toggle between URL and File Upload */}
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setUploadMethod('file')}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                      uploadMethod === 'file'
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    📤 Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMethod('url')}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                      uploadMethod === 'url'
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    🔗 Use URL
                  </button>
                </div>

                {/* File Upload */}
                {uploadMethod === 'file' && (
                  <div>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <div className="text-6xl mb-4">📁</div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Click to upload image
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, WebP or GIF (max 5MB)
                        </p>
                      </label>
                    </div>

                    {selectedFile && (
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                          ✓ Selected: {selectedFile.name}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* URL Input */}
                {uploadMethod === 'url' && (
                  <div>
                    <input
                      type="text"
                      required={uploadMethod === 'url'}
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://example.com/image.jpg or /images/project.jpg"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      💡 Get free images from{' '}
                      <a
                        href="https://unsplash.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:underline"
                      >
                        Unsplash
                      </a>{' '}
                      or{' '}
                      <a
                        href="https://pexels.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:underline"
                      >
                        Pexels
                      </a>
                    </p>
                  </div>
                )}

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preview:
                    </p>
                    <div className="relative h-48 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Lower numbers appear first
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Featured
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Mark as featured
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Uploading...
                    </>
                  ) : (
                    <>{editingItem ? 'Update' : 'Create'}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Portfolio Item"
        message="Are you sure you want to delete this portfolio item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        onConfirm={() => {
          if (confirmDialog.itemId) {
            handleDelete(confirmDialog.itemId);
          }
        }}
        onCancel={() => setConfirmDialog({ isOpen: false, itemId: null })}
      />
    </>
  );
}
