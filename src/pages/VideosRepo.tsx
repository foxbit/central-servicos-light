import { Video } from 'lucide-react';
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/25">
              <Video className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Repositório de Vídeos</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">
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
