import { PageWrapper } from '../components/layout/PageWrapper';
import { SearchBar } from '../components/ui/SearchBar';
import { VideoCard } from '../components/cards/VideoCard';
import { CardGrid } from '../components/grid/CardGrid';
import { useSearch } from '../hooks/useSearch';
import { VideoItem } from '../types';
import videosRaw from '../data/videos.json';

const videos: VideoItem[] = (videosRaw as any[]).map((item, i) => ({
  id: String(item.id ?? i),
  title: String(item.title ?? ''),
  channel: String(item.channel ?? ''),
  thumbnail: String(item.thumbnail ?? ''),
  youtubeUrl: String(item.youtubeUrl ?? item.url ?? ''),
  tags:
    Array.isArray(item.tags) && item.tags.length > 0
      ? item.tags.map(String)
      : Array.isArray(item.customTags)
        ? item.customTags.map(String)
        : [],
  url: item.url ? String(item.url) : undefined,
  duration: item.duration ?? undefined,
  customTags: Array.isArray(item.customTags) ? item.customTags.map(String) : undefined,
  notes: item.notes ? String(item.notes) : undefined,
  archivedAt: item.archivedAt ? String(item.archivedAt) : undefined,
}));

export function VideosRepo() {
  const { query, setQuery, filtered } = useSearch(
    videos,
    (item) => [item.title, item.channel, ...item.tags]
  );

  return (
    <PageWrapper>
      <div className="pt-8 pb-4 animate-slide-up">
        {/* Page header */}
        <div className="mb-8">
          <p className="kicker">Vídeos</p>
          <h1 className="font-serif text-3xl font-semibold text-paper mb-2">Repositório de Vídeos</h1>
          <p className="font-serif text-muted text-sm">
            {videos.length} vídeos arquivados — pesquise por título, canal ou tags
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Pesquisar vídeos por título, canal ou tag..."
            resultCount={query ? filtered.length : undefined}
          />
        </div>

        {/* Grid */}
        <CardGrid
          isEmpty={filtered.length === 0}
          emptyMessage="Nenhum vídeo encontrado para essa pesquisa."
        >
          {filtered.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </CardGrid>
      </div>
    </PageWrapper>
  );
}
