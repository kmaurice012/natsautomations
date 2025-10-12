import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        service,
        message: message || '',
        status: 'new',
        priority: 'medium',
        source: 'website',
      },
    });

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully', leadId: lead.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
