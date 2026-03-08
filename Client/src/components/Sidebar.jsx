import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  LogOut
} from "lucide-react";

export default function Sidebar({ expanded, horizontal = false, closeSidebar }) {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/admin/dashboard" },
    { label: "Appointments", icon: <CalendarCheck size={22} />, path: "/admin/appointments" },
    { label: "Leads", icon: <Users size={22} />, path: "/admin/leads" },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/admin/login');
    closeSidebar();
  };

  /* ─────────────────────────────────────────
     MOBILE — horizontal bottom bar
  ───────────────────────────────────────── */
  if (horizontal) {
    return (
      <nav className="flex flex-row items-center justify-around w-full">

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`
                  flex items-center justify-center
                  w-12 h-12
                  rounded-xl transition
                  ${isActive
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-blue-400/20 hover:text-white"
                  }
                `}
              >
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-blue-400" : "text-gray-400"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1"
        >
          <div className="
            flex items-center justify-center
            w-12 h-12
            rounded-xl transition
            text-red-400
            hover:bg-red-500/20
            hover:text-red-300
          ">
            <LogOut size={22} />
          </div>
          <span className="text-[10px] font-medium text-red-400">Logout</span>
        </button>

      </nav>
    );
  }

  /* ─────────────────────────────────────────
     DESKTOP — vertical left sidebar
  ───────────────────────────────────────── */
  return (
    <aside className="flex flex-col h-full justify-between">

      {/* Logo */}
      <div className="text-white font-bold text-xl text-center">
        {expanded ? "MedCare" : "MC"}
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-4 mt-10">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={closeSidebar}
              >
                <div
                  className={`
                    flex items-center
                    ${expanded ? "justify-start px-4 gap-3" : "justify-center"}
                    w-full h-12
                    rounded-xl cursor-pointer transition
                    ${isActive
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-blue-400/20 hover:text-white"
                    }
                  `}
                >
                  {item.icon}
                  {expanded && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className={`
          flex items-center
          ${expanded ? "justify-start px-4 gap-3" : "justify-center"}
          w-full h-12
          rounded-xl transition
          text-red-400
          hover:bg-red-500/20
          hover:text-red-300
        `}
      >
        <LogOut size={22} />
        {expanded && <span className="text-sm font-medium">Logout</span>}
      </button>

    </aside>
  );
}