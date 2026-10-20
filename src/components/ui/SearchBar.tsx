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
        <Search className="absolute left-4 w-5 h-5 text-muted pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="ds-input w-full pl-12 pr-12 py-3.5 text-sm font-serif transition-colors duration-150"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Limpar pesquisa"
            className="absolute right-1 text-muted hover:text-accent transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {resultCount !== undefined && value && (
        <p className="meta mt-2 text-center">
          {resultCount === 0 ? 'Nenhum resultado encontrado' : `${resultCount} resultado${resultCount !== 1 ? 's' : ''} encontrado${resultCount !== 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  );
}
