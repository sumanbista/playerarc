import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerListPage from './pages/PlayerListPage';
import PlayerProfilePage from './pages/PlayerProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayerListPage />} />
        <Route path="/players/:id" element={<PlayerProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
