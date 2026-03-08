import { useState, useEffect, useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import api from '../../utils/api.js';
import GreetingCard from '../../components/Dashboard components/GreetingCard';
import ProfileCard from '../../components/Dashboard components/ProfileCard';
import AppointmentStats from '../../components/Dashboard components/AppointmentStats';
import TodayAppointments from '../../components/Dashboard components/TodayAppointments';
import MonthlyChart from '../../components/Dashboard components/MonthlyChart';
import CalendarView from '../../components/Dashboard components/CalendarView';
import AuthContext from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/Themecontext.jsx';

const DashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();

  const [appointmentStats, setAppointmentStats] = useState({
    total: 0, completed: 0, cancelled: 0, balance: 0, completionPercentage: 0,
  });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [weeklyData, setWeeklyData] = useState({ labels: [], values: [] });
  const [calendarInfo, setCalendarInfo] = useState({
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    currentDate: new Date().getDate(),
    appointmentDates: [],
    completedDates: [],
  });

  const fetchDoctor = async () => {
    try {
      const res = await api.get('/api/v1/doctor', { params: { id: user.id } });
      const data = res.data;
      const parseArr = (val) => {
        if (Array.isArray(val)) return val;
        try { return JSON.parse(val || '[]'); } catch { return []; }
      };
      data.available_date = parseArr(data.available_date);
      data.available_slots = parseArr(data.available_slots);
      setProfile(data);
    } catch (err) {
      console.error('❌ Fetch doctor failed:', err.response?.status, err.response?.data || err.message);
      setError('Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointmentStats = async () => {
    try { const res = await api.get('/api/v1/appointments/stats'); setAppointmentStats(res.data); }
    catch (err) { console.error('Failed to fetch stats:', err.response?.data || err.message); }
  };

  const fetchTodayAppointments = async () => {
    try { const res = await api.get('/api/v1/appointments/today'); setTodayAppointments(res.data); }
    catch (err) { console.error("Failed to fetch today's appointments:", err.response?.data || err.message); }
  };

  const fetchWeeklyData = async () => {
    try { const res = await api.get('/api/v1/appointments/weekly'); setWeeklyData(res.data); }
    catch (err) { console.error('Failed to fetch weekly data:', err.response?.data || err.message); }
  };

  const fetchCalendarData = async () => {
    try { const res = await api.get('/api/v1/appointments/calendar'); setCalendarInfo(res.data); }
    catch (err) { console.error('Failed to fetch calendar data:', err.response?.data || err.message); }
  };

  useEffect(() => {
    fetchDoctor();
    fetchAppointmentStats();
    fetchTodayAppointments();
    fetchWeeklyData();
    fetchCalendarData();
  }, []);

  const handleProfileUpdate = (updatedProfile) => setProfile(updatedProfile);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className={`animate-spin w-10 h-10 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          <button
            onClick={() => { setError(null); setLoading(true); fetchDoctor(); }}
            className="px-5 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition text-sm font-semibold"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    // ── transparent: background comes from document.body set by ThemeContext ──
    <div className="w-full transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">

        {/* ── Theme Toggle ── */}
        {/* <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
              border transition-all duration-300 shadow-sm
              ${isDark
                ? 'bg-[#1b2a4a]/80 border-[#1361b6]/40 text-gray-300 hover:bg-[#1b2a4a] hover:border-[#1361b6]/70'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-blue-300 shadow'}
            `}
          >
            {isDark ? (
              <><Sun className="w-4 h-4 text-yellow-400" /><span>Light Mode</span></>
            ) : (
              <><Moon className="w-4 h-4 text-blue-500" /><span>Dark Mode</span></>
            )}
          </button>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <GreetingCard profile={profile} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AppointmentStats stats={appointmentStats} />
              <TodayAppointments appointments={todayAppointments} />
            </div>
            <MonthlyChart data={weeklyData} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {profile && <ProfileCard profile={profile} onUpdate={handleProfileUpdate} />}
            <CalendarView calendarData={calendarInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;