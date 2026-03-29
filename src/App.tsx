import { HashRouter, Routes, Route } from 'react-router-dom';
import { Hub } from './pages/Hub';
import { LinksRepo } from './pages/LinksRepo';
import { VideosRepo } from './pages/VideosRepo';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/links" element={<LinksRepo />} />
        <Route path="/videos" element={<VideosRepo />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
