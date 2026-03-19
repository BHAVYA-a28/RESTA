"use client";
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

function QRScannerContent() {
  const searchParams = useSearchParams();
  const { setTableNumber } = useCart();

  useEffect(() => {
    const table = searchParams.get('table');
    if (table) {
      console.log('Setting table number from URL:', table);
      setTableNumber(table);
      // Optional: Store in localStorage is already handled by CartContext useEffect
    }
  }, [searchParams, setTableNumber]);

  return null;
}

export default function QRTableWatcher() {
  return (
    <Suspense fallback={null}>
      <QRScannerContent />
    </Suspense>
  );
}
