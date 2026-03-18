import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import CartSidebar from '@/components/CartSidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Tasty Bites - Exquisite Dining',
  description: 'Experience the finest gastronomy with our curated menu and elegant atmosphere.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-body bg-white text-gray-900`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen relative">
              <Navbar />
              <BottomNav />
              <CartSidebar />
              <main className="flex-grow pt-16 md:pt-20 pb-36 md:pb-0">
                {children}
              </main>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
