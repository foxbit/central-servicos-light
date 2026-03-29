import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { LinkItem } from '../../types';
import { TagBadge } from '../ui/TagBadge';

interface LinkCardProps {
  item: LinkItem;
}

function getThumbnailSrc(ogImage: string, url: string): string {
  if (ogImage) return ogImage;
  return `https://image.thum.io/get/width/640/crop/360/${encodeURIComponent(url)}`;
}

export function LinkCard({ item }: LinkCardProps) {
  const [imgError, setImgError] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  let domain = '';
  try {
    domain = new URL(item.url).hostname;
  } catch {
    domain = item.url;
  }

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  const thumbnailSrc = getThumbnailSrc(item.ogImage, item.url);

  function handleImgError() {
    if (!usedFallback && item.ogImage) {
      setUsedFallback(true);
    } else {
      setImgError(true);
    }
  }

  const currentSrc = usedFallback
    ? `https://image.thum.io/get/width/640/crop/360/${encodeURIComponent(item.url)}`
    : thumbnailSrc;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col glass overflow-hidden transition-all duration-300
                 hover:scale-[1.02] hover:border-white/20 hover:shadow-xl hover:shadow-violet-500/10"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        {!imgError ? (
          <img
            src={currentSrc}
            alt={item.title}
            onError={handleImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900/40 to-gray-900">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-violet-400" />
            </div>
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* External link indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-7 h-7 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Domain */}
        <div className="flex items-center gap-1.5">
          <img
            src={faviconUrl}
            alt=""
            className="w-4 h-4 rounded-sm opacity-70"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="text-xs text-gray-500 truncate">{domain}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-100 line-clamp-2 leading-snug group-hover:text-white transition-colors">
          {item.title}
        </h3>

        {/* Notes */}
        {item.notes && (
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed flex-1">
            {item.notes}
          </p>
        )}

        {/* Tags */}
        {item.customTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {item.customTags.slice(0, 4).map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
