import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import CartSidebar from '@/components/CartSidebar';
import QRTableWatcher from '@/components/QRTableWatcher';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Tasty Bites | Premium Indian Dining | 123 Food Street',
  description: 'Experience the finest Indian gastronomy at Tasty Bites. Award-winning cuisine, elegant atmosphere, and fresh farm-to-table ingredients. Open Mon-Sun 11AM-11PM.',
  keywords: 'Restaurant, Indian Food, Fine Dining, Tasty Bites, Table Reservation, Gourmet, Food District',
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
              <QRTableWatcher />
              <main className="flex-grow pt-16 md:pt-20 pb-12 md:pb-0">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
