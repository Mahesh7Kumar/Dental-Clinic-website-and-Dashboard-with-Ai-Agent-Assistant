import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import N8nChat from '../components/ChatWidget.jsx';
import AiAgent from '../components/AiAgent.jsx';

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      {/* <N8nChat /> */}
      <AiAgent />
    </div>
  );
}