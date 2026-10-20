import { FolderGit2, ExternalLink } from 'lucide-react';
import { SkillItem } from '../../types';
import { TagBadge } from '../ui/TagBadge';

interface SkillCardProps {
  item: SkillItem;
}

function parseGithubRepo(url: string): { owner: string; repo: string } | null {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== 'github.com') return null;
    const parts = pathname.replace(/^\//, '').split('/');
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

export function SkillCard({ item }: SkillCardProps) {
  const parsed = parseGithubRepo(item.url);
  const ogImage = parsed
    ? `https://opengraph.githubassets.com/1/${parsed.owner}/${parsed.repo}`
    : '';

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex flex-col overflow-hidden min-h-[44px]"
    >
      {/* OG Image, GitHub gera automaticamente */}
      <div className="relative aspect-video overflow-hidden bg-ink border-b border-line">
        {ogImage ? (
          <img
            src={ogImage}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 border border-line flex items-center justify-center">
              <FolderGit2 className="w-5 h-5 text-muted" />
            </div>
          </div>
        )}
        {/* External link */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <div className="w-7 h-7 bg-ink border border-line flex items-center justify-center">
            <ExternalLink className="w-3.5 h-3.5 text-paper" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Repo path */}
        {parsed && (
          <div className="flex items-center gap-1.5">
            <FolderGit2 className="w-3.5 h-3.5 text-muted shrink-0" />
            <span className="meta truncate">
              {parsed.owner}/{parsed.repo}
            </span>
          </div>
        )}

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
