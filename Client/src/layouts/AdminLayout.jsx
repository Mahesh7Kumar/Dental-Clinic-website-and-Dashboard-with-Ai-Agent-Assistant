import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function AdminLayout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/admin/login');
  }, [user, navigate]);

  return (
    <div className="
      flex flex-col sm:flex-row h-screen
      bg-gradient-to-br from-[#0d1f3c] via-[#111827] to-[#1e293b]
      text-gray-100
      overflow-hidden
      p-4 sm:p-6
    ">

      {/* ── DESKTOP: Left Sidebar ── */}
      <div className="
        hidden sm:flex flex-col
        w-20 lg:w-24
        bg-[#1b2a4a]/90
        rounded-3xl
        shadow-[0_0_25px_rgba(0,0,0,0.45)]
        border border-[#1361b6]
        backdrop-blur-lg
        p-4
      ">
        <Sidebar expanded={false} closeSidebar={() => { }} />
      </div>

      {/* Gap between sidebar and content (desktop only) */}
      <div className="hidden sm:block w-4" />

      {/* ── Main Content ── */}
      <div className="
        flex-1
        overflow-auto
        [&::-webkit-scrollbar]:hidden
        [-ms-overflow-style:none]
        [scrollbar-width:none]
        relative
        ml-0 sm:ml-2
        p-0 sm:p-2
      ">
        <Outlet />
      </div>

      {/* ── MOBILE: Bottom Horizontal Sidebar ── */}
      <div className="
        sm:hidden
        flex flex-row items-center justify-around
        w-full
        mt-4
        bg-[#1b2a4a]/90
        rounded-3xl
        shadow-[0_0_25px_rgba(0,0,0,0.45)]
        border border-[#1361b6]
        backdrop-blur-lg
        px-4 py-3
      ">
        <Sidebar expanded={false} horizontal closeSidebar={() => { }} />
      </div>

    </div>
  );
}