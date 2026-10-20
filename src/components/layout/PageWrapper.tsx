import { ReactNode } from 'react';
import { Header } from './Header';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-ink text-paper flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 pb-16 w-full flex-1">
        {children}
      </main>

      <footer className="border-t border-line">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            Second Brain (rede interna)
          </p>
        </div>
      </footer>
    </div>
  );
}
