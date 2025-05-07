// frontend/app/layout.tsx
import React from 'react';

export const metadata = {
  title: 'Mi app',
  description: 'Descripción de la app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
