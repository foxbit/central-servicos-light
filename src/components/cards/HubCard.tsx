import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HubCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  count?: number;
}

export function HubCard({ title, description, icon, to, count }: HubCardProps) {
  return (
    <Link to={to} className="card group block min-h-[44px]">
      <div className="p-8">
        {/* Icon */}
        <div className="inline-flex w-12 h-12 border border-line items-center justify-center mb-6 text-accent">
          {icon}
        </div>

        {/* Content */}
        <h2 className="font-serif text-2xl font-semibold text-paper mb-2">
          {title}
        </h2>
        <p className="font-serif text-muted text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-line pt-4">
          {count !== undefined && (
            <span className="meta">
              {count} itens
            </span>
          )}
          <div className="ml-auto flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-paper group-hover:text-accent transition-colors duration-150">
            Acessar
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
