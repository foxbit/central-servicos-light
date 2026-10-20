import { Link, useLocation } from 'react-router-dom';
import { Layers } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const breadcrumbs: Record<string, string> = {
    '/links': 'Links',
    '/videos': 'Vídeos',
    '/skills': 'Skills',
  };

  const current = breadcrumbs[location.pathname];

  return (
    <header className="sticky top-0 z-50 bg-ink border-b border-line">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2.5 group min-h-[44px]">
            <div className="w-8 h-8 border border-line flex items-center justify-center group-hover:border-accent transition-colors duration-150">
              <Layers className="w-4 h-4 text-accent" />
            </div>
            <span className="font-serif font-semibold text-sm text-paper group-hover:text-accent transition-colors duration-150">
              Second Brain
            </span>
          </Link>

          {!isHome && current && (
            <nav className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em]">
              <Link to="/" className="text-muted hover:text-accent transition-colors duration-150 min-h-[44px] flex items-center">
                Home
              </Link>
              <span className="text-muted">/</span>
              <span className="text-paper">{current}</span>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
