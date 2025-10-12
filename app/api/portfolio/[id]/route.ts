import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET single portfolio item - Public endpoint
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio item' }, { status: 500 });
  }
}

// PUT - Update portfolio item (Protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, category, description, image, featured, order } = body;

    // Check if portfolio item exists
    const existing = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    // Update portfolio item
    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(category && { category }),
        ...(description && { description }),
        ...(image && { image }),
        ...(featured !== undefined && { featured }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    console.error('Portfolio update error:', error);
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
  }
}

// DELETE - Delete portfolio item (Protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if portfolio item exists
    const existing = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    // Delete portfolio item
    await prisma.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Portfolio item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Portfolio deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
  }
}
