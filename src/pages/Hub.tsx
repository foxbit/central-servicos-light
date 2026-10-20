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
        <p className="kicker">Hub interno</p>
        <h1 className="font-serif text-4xl font-semibold text-paper mb-3">
          Central de Serviços
        </h1>
        <p className="font-serif text-muted leading-relaxed mb-8 max-w-2xl">
          Uma grade única com links, vídeos e skills curados. Escolha uma coleção para buscar e abrir.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <HubCard
            to="/links"
            title="Links"
            description="Acesse e pesquise sua coleção de links curados com tags, descrições e pré-visualizações."
            icon={<Link2 className="w-6 h-6" />}
            count={linksData.length}
          />
          <HubCard
            to="/videos"
            title="Vídeos"
            description="Encontre rapidamente vídeos salvos por título, canal ou categoria em um layout visual."
            icon={<Video className="w-6 h-6" />}
            count={videosData.length}
          />
          <HubCard
            to="/skills"
            title="Skills"
            description="Repositórios GitHub com prompts, regras e skills para potencializar seus agentes e modelos."
            icon={<BookOpen className="w-6 h-6" />}
            count={skillsData.length}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
