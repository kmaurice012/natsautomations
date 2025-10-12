import { NextResponse } from 'next/server';

// Temporary debug endpoint - DELETE THIS AFTER DEBUGGING
export async function GET() {
  const databaseUrl = process.env.DATABASE_URL || 'NOT SET';
  const directUrl = process.env.DIRECT_DATABASE_URL || 'NOT SET';
  const nextAuthUrl = process.env.NEXTAUTH_URL || 'NOT SET';
  const nextAuthSecret = process.env.NEXTAUTH_SECRET || 'NOT SET';
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || 'NOT SET';

  return NextResponse.json({
    message: 'Environment Variables Check',
    variables: {
      DATABASE_URL: {
        isSet: databaseUrl !== 'NOT SET',
        startsWithAccelerate: databaseUrl.startsWith('prisma+postgres://'),
        preview: databaseUrl.substring(0, 50) + '...',
      },
      DIRECT_DATABASE_URL: {
        isSet: directUrl !== 'NOT SET',
        startsWithPostgres: directUrl.startsWith('postgres://'),
      },
      NEXTAUTH_URL: {
        isSet: nextAuthUrl !== 'NOT SET',
        value: nextAuthUrl,
      },
      NEXTAUTH_SECRET: {
        isSet: nextAuthSecret !== 'NOT SET',
        length: nextAuthSecret.length,
      },
      BLOB_READ_WRITE_TOKEN: {
        isSet: blobToken !== 'NOT SET',
      },
    },
    warning: 'DELETE THIS ENDPOINT AFTER DEBUGGING! (app/api/debug-env/route.ts)',
  });
}
