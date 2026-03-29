import { Link2, Video, BookOpen } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { HubCard } from '../components/cards/HubCard';
import linksData from '../data/links.json';
import videosData from '../data/videos.json';
import skillsData from '../data/skills.json';

export function Hub() {
  return (
    <PageWrapper>
      <div className="pt-8 pb-16 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <HubCard
            to="/links"
            title="Links"
            description="Acesse e pesquise sua coleção de links curados com tags, descrições e pré-visualizações."
            icon={<Link2 className="w-7 h-7" />}
            count={linksData.length}
            gradient="bg-gradient-to-br from-violet-600/20 to-purple-600/20"
          />
          <HubCard
            to="/videos"
            title="Vídeos"
            description="Encontre rapidamente vídeos salvos por título, canal ou categoria em um layout visual."
            icon={<Video className="w-7 h-7" />}
            count={videosData.length}
            gradient="bg-gradient-to-br from-red-600/20 to-orange-600/20"
          />
          <HubCard
            to="/skills"
            title="Skills"
            description="Repositórios GitHub com prompts, regras e skills para potencializar seus agentes e modelos."
            icon={<BookOpen className="w-7 h-7" />}
            count={skillsData.length}
            gradient="bg-gradient-to-br from-emerald-600/20 to-teal-600/20"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
