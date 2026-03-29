import { ReactNode } from 'react';
import { SearchX } from 'lucide-react';

interface CardGridProps {
  children: ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export function CardGrid({ children, isEmpty, emptyMessage = 'Nenhum item encontrado.' }: CardGridProps) {
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 text-gray-500" />
        </div>
        <p className="text-gray-400 font-medium">{emptyMessage}</p>
        <p className="text-gray-600 text-sm mt-1">Tente buscar por outro termo.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-fade-in">
      {children}
    </div>
  );
}
