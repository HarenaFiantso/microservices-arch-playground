import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';

import { Bounce, ToastContainer } from 'react-toastify';

import { Footer, Navbar } from '@/components';

import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Kitro | Choose the best shoes',
  description: 'Discover and buy the best shoes for you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
        <div className="mx-auto p-4 sm:max-w-xl sm:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
          <Navbar />
          {children}
          <Footer />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          toastClassName={`${raleway.className} text-sm font-medium`}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
