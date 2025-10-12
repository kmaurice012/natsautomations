# Vercel Deployment Guide

## Vercel Blob Storage - Free Tier Information

✅ **Vercel Blob is FREE on the Hobby plan!**

**Free Tier Includes:**
- **Storage**: 1 GB total storage
- **Bandwidth**: Unlimited bandwidth
- **Requests**: Unlimited API requests
- **Perfect for**: Portfolio images, user uploads, small to medium websites

**What 1 GB means for you:**
- ~200-500 high-quality portfolio images (2-5 MB each)
- ~1000+ optimized web images (500 KB - 1 MB each)
- More than enough for a typical business portfolio

**Paid Plans** (if you ever need more):
- Pro: $0.15/GB/month (starts at $20/month total for Vercel Pro)
- Enterprise: Custom pricing

For your portfolio site, the free tier is more than sufficient! 🎉

---

## Current Issues & Solutions

### 1. NextAuth Configuration Error

**Problem**: "There is a problem with the server configuration"

**Solution**: Add these environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
NEXTAUTH_SECRET=34Q8YTpIdDhR2NYk1QnMp3ABuRXM18q3Q11JMZ+XLLE=
NEXTAUTH_URL=https://your-domain.vercel.app
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=your-key
DIRECT_DATABASE_URL=postgres://bbcdd034d5045ecd9e098a591f468a3d5517e0d5c5bf746b58ddf2afadefb303:sk_ZAOfa7pPKUKpY-dqITo4e@db.prisma.io:5432/postgres?sslmode=require
```

**Important**: Replace `your-domain.vercel.app` with your actual Vercel domain.

### 2. Image Rendering Issue

**Problem**: Uploaded images don't render in production

**Root Cause**: Vercel uses serverless functions and doesn't support persistent file storage. Files uploaded to `/public/uploads/` are lost after each deployment.

**Solutions**:

#### Option A: Vercel Blob Storage (Recommended - Easiest)

1. Install Vercel Blob:
```bash
npm install @vercel/blob
```

2. Add to Vercel project:
   - Go to your Vercel dashboard
   - Navigate to **Storage** tab
   - Click **Create Database** → **Blob**
   - Copy the `BLOB_READ_WRITE_TOKEN` that's generated

3. Add environment variable:
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
```

4. Update the upload API to use Vercel Blob instead of local file system

#### Option B: Cloudinary (Free Tier Available)

1. Sign up at https://cloudinary.com (free tier: 25 credits/month)

2. Get your credentials from the dashboard

3. Install Cloudinary SDK:
```bash
npm install cloudinary
```

4. Add environment variables in Vercel:
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

5. Update the upload API to use Cloudinary

#### Option C: Use External Image URLs Only

Simplest solution - only allow portfolio items to use external URLs (Unsplash, Pexels, etc.) instead of file uploads. This requires no additional setup.

## Step-by-Step: Setting Up Vercel Blob Storage

### 1. Create Blob Store in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com
2. **Select your project**
3. **Click the "Storage" tab** at the top
4. **Click "Create Database"** → Select **"Blob"**
5. **Name your store**: `portfolio-images` (or any name you like)
6. **Copy the `BLOB_READ_WRITE_TOKEN`** that appears
   - It looks like: `vercel_blob_rw_XXXXXXXXXXXXX`

### 2. Set Environment Variables in Vercel

1. **Navigate to Settings**
   - Click **Settings** in the top menu
   - Click **Environment Variables** in the sidebar

2. **Add Each Variable**
   - Click **Add New**
   - Enter variable name (e.g., `NEXTAUTH_SECRET`)
   - Enter value
   - Select environments: **Production**, **Preview**, **Development** (check all three)
   - Click **Save**

3. **Required Variables**
   ```
   NEXTAUTH_SECRET          = 34Q8YTpIdDhR2NYk1QnMp3ABuRXM18q3Q11JMZ+XLLE=
   NEXTAUTH_URL             = https://your-domain.vercel.app
   DATABASE_URL             = (your Prisma Accelerate URL)
   DIRECT_DATABASE_URL      = (your direct Postgres URL)
   BLOB_READ_WRITE_TOKEN    = vercel_blob_rw_XXXXXXXXXXXXX
   ```

4. **Optional Variables** (if using external services)
   ```
   SMTP_HOST                = smtp.gmail.com
   SMTP_PORT                = 587
   SMTP_USER                = your-email@gmail.com
   SMTP_PASSWORD            = your-app-password
   SMTP_FROM                = noreply@natsautomations.co.ke
   ```

5. **Redeploy**
   - After adding variables, go to **Deployments** tab
   - Click the three dots (**...**) on the latest deployment
   - Click **Redeploy**
   - ✅ Check "Use existing Build Cache"
   - Click **Redeploy**

## Verifying the Fix

After redeployment:

1. **Test Login**
   - Go to your site
   - Navigate to `/crm/login`
   - Try logging in
   - Should work without "server configuration" error

2. **Test Portfolio**
   - Portfolio items should display correctly
   - Images from external URLs (Unsplash, Pexels) should render
   - Uploaded images won't work until you implement cloud storage

## Next Steps

Choose one of the image storage solutions above and I can help you implement it. The quickest options are:

1. **Easiest**: Use Vercel Blob (takes 5 minutes to set up)
2. **Most flexible**: Use Cloudinary (free tier is generous)
3. **Simplest**: Remove file upload, use external URLs only

Let me know which solution you prefer!
