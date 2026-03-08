import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, CircleX, ChevronDown, UserCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { StethoscopeIcon } from "../components/ui/stethoscope";
import BookAppointmentModal from "./BookAppointmentModal";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/user/services" },
  { label: "Services", path: "" },
  { label: "Transformations", path: "/user/about" },
  { label: "Blog", path: "/user/blog" },
  { label: "Contact Us", path: "/user/contact" },
];

const serviceItems = [
  { label: "Laser Root Canal Treatment", path: "/user/laser-root-canal" },
  { label: "Dental Implants", path: "/user/dental-implants" },
  { label: "Dental Braces", path: "/user/dental-braces" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();                          // 👈 added
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [desktopServiceOpen, setDesktopServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);  // 👈 added

  const desktopServiceRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (desktopServiceRef.current && !desktopServiceRef.current.contains(e.target)) {
        setDesktopServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setOpen(false);
        setMobileServiceOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setMobileServiceOpen(false);
    setDesktopServiceOpen(false);
  };

  return (
    <div className="w-full flex justify-center mt-4 px-2 fixed top-0 left-0 z-50">
      <nav
        ref={mobileMenuRef}
        className="bg-[#74A7BB]/70 backdrop-blur-sm text-white rounded-full py-3 px-6
          w-full md:w-[95%] shadow-lg flex items-center justify-between relative"
      >
        {/* ── Logo ── */}
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 p-2 rounded-full">
            <StethoscopeIcon size={24} className="text-white" />
          </div>
          <div className="leading-tight hidden sm:block">
            <p className="font-semibold text-sm">Skin Care</p>
            <p className="text-xs opacity-90">Specialist Clinic</p>
          </div>
        </div>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => {
            if (item.label === "Services") {
              return (
                <div key="services-desktop" className="relative" ref={desktopServiceRef}>
                  <button
                    onClick={() => setDesktopServiceOpen((p) => !p)}
                    className="text-sm opacity-80 hover:opacity-100 flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${desktopServiceOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {desktopServiceOpen && (
                    <div className="absolute top-9 left-0 bg-white text-black rounded-xl shadow-lg w-64 p-2 z-50">
                      {serviceItems.map((s) => (
                        <Link
                          key={s.label}
                          to={s.path}
                          onClick={() => setDesktopServiceOpen(false)}
                          className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm transition ${isActive ? "font-semibold underline" : "opacity-80 hover:opacity-100"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ── Desktop CTA + Admin Icon ── */}
        <div className="hidden md:flex items-center gap-3">

          <Button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-white text-black px-6 py-2 font-semibold shadow-md hover:bg-gray-100"
          >
            Book Appointment
          </Button>
          {/* 👇 Admin Icon with Tooltip */}
          <div className="relative">
            <button
              onClick={() => navigate("/admin/login")}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="bg-white/20 hover:bg-white/30 transition p-2 rounded-full"
              aria-label="Admin Login"
            >
              <UserCircle size={22} className="text-white" />
            </button>

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute top-11 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                Admin
                {/* Arrow */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0
                  border-l-[6px] border-l-transparent
                  border-r-[6px] border-r-transparent
                  border-b-[6px] border-b-black" />
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {open ? <CircleX size={28} /> : <Menu size={28} />}
        </button>

        {/* ── Mobile Dropdown ── */}
        {open && (
          <div className="absolute top-full left-0 w-full mt-3 bg-[#74A7BB] rounded-2xl p-5 shadow-lg md:hidden z-50">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                if (item.label === "Services") {
                  return (
                    <div key="services-mobile">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileServiceOpen((p) => !p);
                        }}
                        className="text-base opacity-90 w-full text-left flex items-center justify-between py-1"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${mobileServiceOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileServiceOpen && (
                        <div className="ml-3 mt-2 space-y-1 border-l-2 border-white/30 pl-3">
                          {serviceItems.map((s) => (
                            <Link
                              key={s.label}
                              to={s.path}
                              onClick={closeAll}
                              className="block text-sm py-1.5 opacity-80 hover:opacity-100 transition-opacity"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeAll}
                    className={`text-base py-1 ${isActive ? "font-semibold underline" : "opacity-90 hover:opacity-100"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Button
                onClick={() => { setShowForm(true); closeAll(); }}
                className="rounded-full bg-white text-black w-full mt-1 font-semibold"
              >
                Book Appointment
              </Button>

              <button
                onClick={() => { navigate("/admin/login"); closeAll(); }}
                className="flex items-center gap-2 text-base py-1 opacity-90 hover:opacity-100 text-left"
              >
                <UserCircle size={20} />
                Admin Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {showForm && (
        <BookAppointmentModal onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}