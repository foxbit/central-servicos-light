import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HubCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  count?: number;
  gradient: string;
}

export function HubCard({ title, description, icon, to, count, gradient }: HubCardProps) {
  return (
    <Link
      to={to}
      className="group block glass relative overflow-hidden transition-all duration-300
                 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-violet-500/10"
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${gradient}`} />

      <div className="relative p-8">
        {/* Icon */}
        <div className={`inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-6 ${gradient} shadow-lg`}>
          <div className="text-white">
            {icon}
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
          {title}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {count !== undefined && (
            <span className="text-xs text-gray-500 bg-white/5 rounded-full px-3 py-1 border border-white/10">
              {count} itens
            </span>
          )}
          <div className="ml-auto flex items-center gap-1.5 text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
            Acessar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
