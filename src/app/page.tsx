'use client';

import { useFileStore, AppStep } from '@/store/useFileStore';
import { UploadStep } from '@/components/main/UploadStep';
import { EditStep } from '@/components/main/EditStep';
import { ResultStep } from '@/components/main/ResultStep';
import { AdBanner } from '@/components/main/AdBanner';
import { Image as ImageIcon } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react'; // Import NextAuth.js hooks and functions
import { Button } from '@/components/ui/button'; // Import Button component

const StepRenderer = ({ step }: { step: AppStep }) => {
  switch (step) {
    case 'upload':
      return <UploadStep />;
    case 'edit':
      return <EditStep />;
    case 'result':
      return <ResultStep />;
    default:
      return null;
  }
};

export default function HomePage() {
  const step = useFileStore((state) => state.step);
  const { data: session, status } = useSession(); // Get session data

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-4 sm:p-8 md:p-12">
      <header className="w-full max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-8 h-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold">WebPnifty</h1>
        </div>
        <div className="flex items-center gap-4">
          {status === 'authenticated' ? (
            <>
              <span className="text-muted-foreground hidden sm:block">Welcome, {session.user?.name || session.user?.email}!</span>
              <Button onClick={() => signOut()} variant="outline" size="sm">Sign Out</Button>
            </>
          ) : (
            <Button onClick={() => signIn()} variant="outline" size="sm">Sign In</Button>
          )}
        </div>
      </header>
      
      <div className="w-full flex-grow flex items-center justify-center">
        <StepRenderer step={step} />
      </div>

      <footer className="w-full max-w-4xl mx-auto mt-8 text-center text-muted-foreground text-sm">
        {/* Placeholder for Ad Banner */}
        <AdBanner adSlot="0000000000" /> {/* TODO: Replace with your AdSense ad slot ID */}
        <p className="mt-4">&copy; {new Date().getFullYear()} WebPnifty. All rights reserved.</p>
      </footer>
    </main>
  );
}