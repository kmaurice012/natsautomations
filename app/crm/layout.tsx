'use client';

import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    </SessionProvider>
  );
}
