import { useState } from 'react';
import { Play, Video as VideoIcon } from 'lucide-react';
import { VideoItem } from '../../types';
import { TagBadge } from '../ui/TagBadge';

interface VideoCardProps {
  item: VideoItem;
}

export function VideoCard({ item }: VideoCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={item.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex flex-col overflow-hidden min-h-[44px]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-ink border-b border-line">
        {!imgError && item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <VideoIcon className="w-10 h-10 text-muted" />
          </div>
        )}

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <div className="w-14 h-14 bg-ink border border-line flex items-center justify-center">
            <Play className="w-6 h-6 text-accent fill-accent ml-0.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Channel */}
        {item.channel && (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-accent shrink-0" />
            <span className="meta truncate">{item.channel}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-serif text-sm font-semibold text-paper line-clamp-2 leading-snug flex-1">
          {item.title}
        </h3>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {item.tags.slice(0, 4).map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
