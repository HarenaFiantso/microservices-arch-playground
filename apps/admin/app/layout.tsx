import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';

import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Kitro | Admin dashboard',
  description: 'Admin dashboard of the kitro e-commerce client application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>{children}</body>
    </html>
  );
}
