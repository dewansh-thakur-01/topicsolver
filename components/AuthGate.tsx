'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/useAuthStore';
import { AuthView } from './AuthView';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CodeMentorWidget } from './CodeMentorWidget';

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Show clean spinner/fallback until client session rehydrates
  if (!hasHydrated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F7F9FC] dark:bg-[#090C12]">
        <div className="flex flex-col items-center space-y-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#2B6FF3] border-t-transparent animate-spin" />
          <span className="text-xs font-bold text-[#687385] dark:text-[#94A3B8]">Loading TOPIC SOLVER...</span>
        </div>
      </div>
    );
  }

  // If not authenticated, render the Sign In / Sign Up page
  if (!isAuthenticated) {
    return <AuthView />;
  }

  // If authenticated, render full website
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-transparent relative z-10">
        {children}
      </main>
      <CodeMentorWidget />
      <Footer />
    </>
  );
};
