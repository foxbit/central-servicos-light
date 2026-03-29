import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export function SearchBar({ value, onChange, placeholder = 'Pesquisar...', resultCount }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 rounded-xl glass text-gray-100 placeholder-gray-500
                     focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30
                     transition-all duration-200 text-sm"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {resultCount !== undefined && value && (
        <p className="mt-2 text-xs text-gray-500 text-center">
          {resultCount === 0 ? 'Nenhum resultado encontrado' : `${resultCount} resultado${resultCount !== 1 ? 's' : ''} encontrado${resultCount !== 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  );
}
