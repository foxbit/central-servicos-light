import { Link2, Video, Zap, Star } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { HubCard } from '../components/cards/HubCard';
import linksData from '../data/links.json';
import videosData from '../data/videos.json';

export function Hub() {
  return (
    <PageWrapper>
      <div className="pt-12 pb-16 animate-slide-up">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium text-violet-300 mb-8 border-violet-500/20">
            <Star className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
            Seu hub de recursos digitais
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-white">Central de </span>
            <span className="gradient-text">Serviços</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Organize e acesse seus recursos digitais favoritos. Links e vídeos curados em um só lugar.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex justify-center gap-8 mb-12">
          {[
            { icon: Link2, label: 'Links salvos', value: linksData.length },
            { icon: Video, label: 'Vídeos arquivados', value: videosData.length },
            { icon: Zap, label: 'Acesso instantâneo', value: '100%' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Icon className="w-4 h-4 text-violet-400" />
                <span className="text-2xl font-bold text-white">{value}</span>
              </div>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <HubCard
            to="/links"
            title="Repositório de Links"
            description="Acesse e pesquise sua coleção de links curados com tags, descrições e pré-visualizações."
            icon={<Link2 className="w-7 h-7" />}
            count={linksData.length}
            gradient="bg-gradient-to-br from-violet-600/20 to-purple-600/20"
          />
          <HubCard
            to="/videos"
            title="Repositório de Vídeos"
            description="Encontre rapidamente vídeos salvos por título, canal ou categoria em um layout visual."
            icon={<Video className="w-7 h-7" />}
            count={videosData.length}
            gradient="bg-gradient-to-br from-red-600/20 to-orange-600/20"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
