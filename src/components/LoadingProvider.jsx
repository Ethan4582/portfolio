"use client";

import { useState, useEffect } from 'react';
import LoadingScreen from "@/components/LoadingScreen";

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    if (typeof window !== 'undefined' && !localStorage.getItem('hasLoaded')) {
      setIsLoading(true);
      localStorage.setItem('hasLoaded', 'true');
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {children}
    </>
  );
}
