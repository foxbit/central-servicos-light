import { Link2 } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SearchBar } from '../components/ui/SearchBar';
import { LinkCard } from '../components/cards/LinkCard';
import { CardGrid } from '../components/grid/CardGrid';
import { useSearch } from '../hooks/useSearch';
import { LinkItem } from '../types';
import linksRaw from '../data/links.json';

const links: LinkItem[] = linksRaw.map((item, i) => ({ ...item, id: String(i) }));

export function LinksRepo() {
  const { query, setQuery, filtered } = useSearch(
    links,
    (item) => [item.title, item.notes, ...item.customTags]
  );

  return (
    <PageWrapper>
      <div className="pt-8 pb-4 animate-slide-up">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Repositório de Links</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">
            {links.length} links salvos — pesquise por título, descrição ou tags
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Pesquisar links por título, descrição ou tag..."
            resultCount={query ? filtered.length : undefined}
          />
        </div>

        {/* Grid */}
        <CardGrid
          isEmpty={filtered.length === 0}
          emptyMessage="Nenhum link encontrado para essa pesquisa."
        >
          {filtered.map((item) => (
            <LinkCard key={item.id} item={item} />
          ))}
        </CardGrid>
      </div>
    </PageWrapper>
  );
}
