import { ReactNode } from 'react';
import { Header } from './Header';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen">
      {/* Decorative blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -left-60 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-60 left-1/3 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-4 pb-16">
        {children}
      </main>
    </div>
  );
}
