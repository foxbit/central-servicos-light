import { PageWrapper } from '../components/layout/PageWrapper';
import { SearchBar } from '../components/ui/SearchBar';
import { LinkCard } from '../components/cards/LinkCard';
import { CardGrid } from '../components/grid/CardGrid';
import { useSearch } from '../hooks/useSearch';
import { LinkItem } from '../types';
import linksRaw from '../data/links.json';

const links: LinkItem[] = (linksRaw as any[]).map((item, i) => ({
  id: String(item.id ?? i),
  title: String(item.title ?? ''),
  ogImage: item.ogImage ? String(item.ogImage) : undefined,
  thumbnail: item.thumbnail ? String(item.thumbnail) : undefined,
  url: String(item.url ?? ''),
  customTags: Array.isArray(item.customTags) ? item.customTags.map(String) : [],
  notes: String(item.notes ?? item.description ?? ''),
  description: item.description ? String(item.description) : undefined,
  archivedAt: item.archivedAt ? String(item.archivedAt) : undefined,
}));

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
          <p className="kicker">Links</p>
          <h1 className="font-serif text-3xl font-semibold text-paper mb-2">Repositório de Links</h1>
          <p className="font-serif text-muted text-sm">
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
