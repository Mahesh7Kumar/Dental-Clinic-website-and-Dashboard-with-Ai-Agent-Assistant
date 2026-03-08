import { createContext, useContext, useState, useEffect } from 'react';

const defaultValue = { isDark: true, toggleTheme: () => { } };

export const ThemeContext = createContext(defaultValue);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  // ── Apply theme globally so parent layout wrappers also change ──
  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
      document.body.style.backgroundColor = '#0a1628';
      document.body.style.color = '#e5e7eb';
      // Override any layout wrapper bg via CSS variable
      root.style.setProperty('--layout-bg', '#0a1628');
      root.style.setProperty('--sidebar-bg', '#0d1e38');
      root.style.setProperty('--navbar-bg', '#0d1e38');
      root.style.setProperty('--card-bg', 'rgba(27,42,74,0.6)');
      root.style.setProperty('--text-primary', '#f9fafb');
      root.style.setProperty('--text-secondary', '#9ca3af');
      root.style.setProperty('--border-color', 'rgba(19,97,182,0.4)');
    } else {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
      document.body.style.backgroundColor = '#f3f4f6';
      document.body.style.color = '#1f2937';
      root.style.setProperty('--layout-bg', '#f3f4f6');
      root.style.setProperty('--sidebar-bg', '#ffffff');
      root.style.setProperty('--navbar-bg', '#ffffff');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#6b7280');
      root.style.setProperty('--border-color', '#e5e7eb');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return defaultValue;
  return ctx;
};