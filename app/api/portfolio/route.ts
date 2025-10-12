import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET all portfolio items - Public endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (category && category !== 'all') where.category = category;
    if (featured === 'true') where.featured = true;

    const portfolio = await prisma.portfolio.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

// POST - Create new portfolio item (Protected)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, description, image, featured, order } = body;

    // Validation
    if (!title || !category || !description || !image) {
      return NextResponse.json(
        { error: 'Missing required fields: title, category, description, image' },
        { status: 400 }
      );
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        category,
        description,
        image,
        featured: featured || false,
        order: order || 0,
      },
    });

    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error: any) {
    console.error('Portfolio creation error:', error.message);
    return NextResponse.json({
      error: 'Failed to create portfolio item',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
