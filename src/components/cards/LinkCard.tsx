import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { LinkItem } from '../../types';
import { TagBadge } from '../ui/TagBadge';

interface LinkCardProps {
  item: LinkItem;
}

const SCREENSHOT_URL = (url: string) =>
  `https://image.thum.io/get/width/640/crop/360/${encodeURIComponent(url)}`;

function buildSrcQueue(item: LinkCardProps['item']): string[] {
  const queue: string[] = [];
  if (item.thumbnail) queue.push(item.thumbnail);
  if (item.ogImage && item.ogImage !== item.thumbnail) queue.push(item.ogImage);
  queue.push(SCREENSHOT_URL(item.url));
  return queue;
}

export function LinkCard({ item }: LinkCardProps) {
  const srcQueue = buildSrcQueue(item);
  const [srcIndex, setSrcIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  let domain = '';
  try {
    domain = new URL(item.url).hostname;
  } catch {
    domain = item.url;
  }

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

  function handleImgError() {
    if (srcIndex + 1 < srcQueue.length) {
      setSrcIndex((i) => i + 1);
    } else {
      setImgError(true);
    }
  }

  const currentSrc = srcQueue[srcIndex];

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex flex-col overflow-hidden min-h-[44px]"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-ink border-b border-line">
        {!imgError ? (
          <img
            src={currentSrc}
            alt={item.title}
            onError={handleImgError}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 border border-line flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-muted" />
            </div>
          </div>
        )}
        {/* External link indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <div className="w-7 h-7 bg-ink border border-line flex items-center justify-center">
            <ExternalLink className="w-3.5 h-3.5 text-paper" />
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
            className="w-4 h-4 opacity-70"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="meta truncate">{domain}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-sm font-semibold text-paper line-clamp-2 leading-snug flex-1">
          {item.title}
        </h3>

        {/* Notes */}
        {item.notes && (
          <p className="font-serif text-xs text-muted line-clamp-2 leading-relaxed flex-1">
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
