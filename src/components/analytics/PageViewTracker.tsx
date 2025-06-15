
'use client';

import { useEffect } from 'react';
import { incrementPageView } from '@/services/analytics-service';

export default function PageViewTracker() {
  useEffect(() => {
    incrementPageView();
  }, []);

  return null; // Este componente no renderiza nada
}
