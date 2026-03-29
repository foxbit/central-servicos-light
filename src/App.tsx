import { HashRouter, Routes, Route } from 'react-router-dom';
import { Hub } from './pages/Hub';
import { LinksRepo } from './pages/LinksRepo';
import { VideosRepo } from './pages/VideosRepo';
import { SkillsRepo } from './pages/SkillsRepo';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/links" element={<LinksRepo />} />
        <Route path="/videos" element={<VideosRepo />} />
        <Route path="/skills" element={<SkillsRepo />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
