import { useState } from 'react';
import { Play, CirclePlay, Video as VideoIcon } from 'lucide-react';
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
      className="group flex flex-col glass overflow-hidden transition-all duration-300
                 hover:scale-[1.02] hover:border-white/20 hover:shadow-xl hover:shadow-red-500/10"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        {!imgError && item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900/40 to-gray-900">
            <VideoIcon className="w-10 h-10 text-red-400/60" />
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-900/50">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* YouTube logo */}
        <div className="absolute top-2.5 right-2.5">
          <div className="w-7 h-7 bg-red-600 rounded-md flex items-center justify-center shadow-lg">
            <CirclePlay className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Channel */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-xs text-gray-400 font-medium truncate">{item.channel}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-100 line-clamp-2 leading-snug group-hover:text-white transition-colors flex-1">
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
