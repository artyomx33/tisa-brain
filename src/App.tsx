import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import ParentProfiles from './pages/ParentProfiles';
import ContentGenerator from './pages/ContentGenerator';
import ScenarioSimulator from './pages/ScenarioSimulator';
import ContentCalendar from './pages/ContentCalendar';
import ChannelPlaybooks from './pages/ChannelPlaybooks';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import History from './pages/History';
import ABTesting from './pages/ABTesting';
import Analytics from './pages/Analytics';
import EmailAssistant from './pages/EmailAssistant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="profiles" element={<ParentProfiles />} />
          <Route path="generator" element={<ContentGenerator />} />
          <Route path="email" element={<EmailAssistant />} />
          <Route path="simulator" element={<ScenarioSimulator />} />
          <Route path="ab-testing" element={<ABTesting />} />
          <Route path="history" element={<History />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="calendar" element={<ContentCalendar />} />
          <Route path="channels" element={<ChannelPlaybooks />} />
          <Route path="documents" element={<Documents />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
