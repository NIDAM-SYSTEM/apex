
import { Routes, Route } from 'react-router-dom';
import './index.css';

import HomePage from './pages/HomePage';
import VaultPage from './pages/VaultPage';
import HelpPage from './pages/HelpPage';
import ClubPage from './pages/ClubPage';
import ArticlesPage from './pages/ArticlesPage';
import EventsPage from './pages/EventsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

import { StudyTimerProvider } from './contexts/StudyTimerContext';
import GlobalStudyTimer from './components/study/GlobalStudyTimer';

export default function App() {
  return (
    <StudyTimerProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/club" element={<ClubPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>

      <GlobalStudyTimer />
    </StudyTimerProvider>
  );
}
