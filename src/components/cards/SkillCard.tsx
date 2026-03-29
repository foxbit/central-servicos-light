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
      className="group flex flex-col glass overflow-hidden transition-all duration-300
                 hover:scale-[1.02] hover:border-white/20 hover:shadow-xl hover:shadow-emerald-500/10"
    >
      {/* OG Image — GitHub gera automaticamente */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        {ogImage ? (
          <img
            src={ogImage}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-900/40 to-gray-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* External link */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-7 h-7 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Repo path */}
        {parsed && (
          <div className="flex items-center gap-1.5">
            <FolderGit2 className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <span className="text-xs text-gray-500 truncate">
              {parsed.owner}/<span className="text-gray-400">{parsed.repo}</span>
            </span>
          </div>
        )}

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
