import { BookOpen } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SearchBar } from '../components/ui/SearchBar';
import { SkillCard } from '../components/cards/SkillCard';
import { CardGrid } from '../components/grid/CardGrid';
import { useSearch } from '../hooks/useSearch';
import { SkillItem } from '../types';
import skillsRaw from '../data/skills.json';

const skills: SkillItem[] = skillsRaw.map((item, i) => ({ ...item, id: String(i) }));

export function SkillsRepo() {
  const { query, setQuery, filtered } = useSearch(
    skills,
    (item) => [item.title, item.notes, ...item.customTags]
  );

  return (
    <PageWrapper>
      <div className="pt-8 pb-4 animate-slide-up">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Skills para LLM</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">
            {skills.length} repositórios salvos — pesquise por título, descrição ou tags
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Pesquisar skills por título, descrição ou tag..."
            resultCount={query ? filtered.length : undefined}
          />
        </div>

        {/* Grid */}
        <CardGrid
          isEmpty={filtered.length === 0}
          emptyMessage="Nenhuma skill encontrada para essa pesquisa."
        >
          {filtered.map((item) => (
            <SkillCard key={item.id} item={item} />
          ))}
        </CardGrid>
      </div>
    </PageWrapper>
  );
}
