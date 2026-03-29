import { Link, useLocation } from 'react-router-dom';
import { Layers } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const breadcrumbs: Record<string, string> = {
    '/links': 'Links',
    '/videos': 'Vídeos',
  };

  const current = breadcrumbs[location.pathname];

  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="glass flex items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-200 group-hover:text-white transition-colors">
              Central de Serviços
            </span>
          </Link>

          {!isHome && current && (
            <nav className="flex items-center gap-1.5 text-sm">
              <Link to="/" className="text-gray-500 hover:text-gray-300 transition-colors">
                Home
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-gray-300 font-medium">{current}</span>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
