import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import DashboardLayout from './dashboard/layout/DashboardLayout';
import OverviewPage from './dashboard/pages/OverviewPage';
import LiveActivityPage from './dashboard/pages/LiveActivityPage';
import AnalyticsPage from './dashboard/pages/AnalyticsPage';
import LogsPage from './dashboard/pages/LogsPage';
import AuthenticatePage from './dashboard/pages/AuthenticatePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="live"         element={<LiveActivityPage />} />
          <Route path="analytics"    element={<AnalyticsPage />} />
          <Route path="logs"         element={<LogsPage />} />
          <Route path="authenticate" element={<AuthenticatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
