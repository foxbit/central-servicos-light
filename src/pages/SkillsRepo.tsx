import { PageWrapper } from '../components/layout/PageWrapper';
import { SearchBar } from '../components/ui/SearchBar';
import { SkillCard } from '../components/cards/SkillCard';
import { CardGrid } from '../components/grid/CardGrid';
import { useSearch } from '../hooks/useSearch';
import { SkillItem } from '../types';
import skillsRaw from '../data/skills.json';

const skills: SkillItem[] = (skillsRaw as any[]).map((item, i) => ({ ...item, id: String(i) }));

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
          <p className="kicker">Skills</p>
          <h1 className="font-serif text-3xl font-semibold text-paper mb-2">Skills para LLM</h1>
          <p className="font-serif text-muted text-sm">
            {skills.length} repositórios salvos, pesquise por título, descrição ou tags
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
