import { Outlet } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashTopbar from '../components/DashTopbar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <DashSidebar />
      <DashTopbar />
      <main
        className="pt-16 pl-56 min-h-screen"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
