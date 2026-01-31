'use client';
import './globals.css';
import { ReactNode, useState } from 'react';
import { UserProvider } from '@/lib/UserContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<{ id: string; display_name: string } | null>(null);

  return (
    <html>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
