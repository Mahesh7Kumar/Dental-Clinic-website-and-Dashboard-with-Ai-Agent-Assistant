import { useState, useEffect } from 'react';
import api from '../../utils/api.js';
import GreetingCard from '../../components/Dashboard components/GreetingCard';
import ProfileCard from '../../components/Dashboard components/ProfileCard';
import AppointmentStats from '../../components/Dashboard components/AppointmentStats';
import TodayAppointments from '../../components/Dashboard components/TodayAppointments';
import MonthlyChart from '../../components/Dashboard components/MonthlyChart';
import CalendarView from '../../components/Dashboard components/CalendarView';
import {
    appointmentStatsData,
    todayAppointments,
    monthlyAppointmentData,
    calendarData,
} from '../../components/data/dummyData';
import {
    Activity,
    Users,
    CalendarCheck,
    Clock,
    TrendingUp,
    Heart,
    Stethoscope,
    AlertCircle,
} from 'lucide-react';

// ── Quick Stat Card ────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }) {
    return (
        <div className={`
      relative overflow-hidden
      bg-[#1b2a4a]/70 border border-white/10
      rounded-2xl p-5
      flex items-start gap-4
      hover:border-${color}-500/40 hover:bg-[#1b2a4a]
      transition-all duration-300
      group
    `}>
            {/* Glow blob */}
            <div className={`absolute -top-4 -right-4 w-24 h-24 bg-${color}-500/10 rounded-full blur-2xl group-hover:bg-${color}-500/20 transition-all duration-500`} />

            <div className={`w-11 h-11 rounded-xl bg-${color}-500/15 border border-${color}-500/30 flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className={`text-${color}-400`} />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</p>
                <p className="text-white text-2xl font-bold mt-0.5">{value}</p>
                {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
            </div>
        </div>
    );
}

// ── Section Header ─────────────────────────────────────────
function SectionHeader({ icon: Icon, title, subtitle, accent = 'blue' }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-lg bg-${accent}-500/15 border border-${accent}-500/30 flex items-center justify-center`}>
                <Icon size={15} className={`text-${accent}-400`} />
            </div>
            <div>
                <h2 className="text-white font-semibold text-sm">{title}</h2>
                {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
            </div>
        </div>
    );
}

// ── Divider ────────────────────────────────────────────────
function Divider() {
    return (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    );
}

// ── Main Dashboard ─────────────────────────────────────────
const DashboardPage = () => {
    const [profile, setProfile] = useState({
        name: '',
        title: '',
        phone: '',
        image: '',
        about: '',
        maxAppointmentsPerDay: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDoctor = async () => {
        try {
            const res = await api.get('/api/v1/doctor');
            setProfile(res.data);
        } catch (err) {
            console.error('Fetch doctor failed:', err.response?.data || err.message);
            setError('Failed to load profile data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, []);

    const handleProfileUpdate = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
                    <p className="text-gray-400 text-sm">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-center">
                    <AlertCircle size={40} className="text-red-400" />
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="
      h-full
      overflow-y-auto
      [&::-webkit-scrollbar]:hidden
      [-ms-overflow-style:none]
      [scrollbar-width:none]
    ">
            <div className="p-1 space-y-6 pb-8">

                {/* ── Top Bar ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full" />
                            <h1 className="text-white font-bold text-xl sm:text-2xl">
                                Hospital Dashboard
                            </h1>
                        </div>
                        <p className="text-gray-500 text-xs mt-1 ml-3.5">{today}</p>
                    </div>

                    {/* Live indicator */}
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/25 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-xs font-medium">System Online</span>
                    </div>
                </div>

                <Divider />

                {/* ── Quick Stats Row ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        icon={CalendarCheck}
                        label="Today's Appointments"
                        value="12"
                        sub="4 remaining"
                        color="blue"
                    />
                    <StatCard
                        icon={Users}
                        label="Total Patients"
                        value="248"
                        sub="+3 this week"
                        color="cyan"
                    />
                    <StatCard
                        icon={Clock}
                        label="Avg. Wait Time"
                        value="18m"
                        sub="↓ 3m from yesterday"
                        color="purple"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Monthly Growth"
                        value="+14%"
                        sub="vs last month"
                        color="green"
                    />
                </div>

                <Divider />

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ── Left Column ── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Greeting */}
                        <div className="bg-[#1b2a4a]/70 border border-white/10 rounded-2xl p-5">
                            <SectionHeader
                                icon={Heart}
                                title="Welcome Back"
                                subtitle="Here's your clinical overview for today"
                                accent="pink"
                            />
                            <GreetingCard profile={profile} />
                        </div>

                        {/* Stats + Today's Appointments */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#1b2a4a]/70 border border-white/10 rounded-2xl p-5">
                                <SectionHeader
                                    icon={Activity}
                                    title="Appointment Stats"
                                    subtitle="Status breakdown"
                                    accent="blue"
                                />
                                <AppointmentStats stats={appointmentStatsData} />
                            </div>

                            <div className="bg-[#1b2a4a]/70 border border-white/10 rounded-2xl p-5">
                                <SectionHeader
                                    icon={CalendarCheck}
                                    title="Today's Schedule"
                                    subtitle="Upcoming appointments"
                                    accent="cyan"
                                />
                                <TodayAppointments appointments={todayAppointments} />
                            </div>
                        </div>

                        {/* Monthly Chart */}
                        <div className="bg-[#1b2a4a]/70 border border-white/10 rounded-2xl p-5">
                            <SectionHeader
                                icon={TrendingUp}
                                title="Monthly Appointments"
                                subtitle="Patient volume trends"
                                accent="green"
                            />
                            <MonthlyChart data={monthlyAppointmentData} />
                        </div>

                    </div>

                    {/* ── Right Column ── */}
                    <div className="space-y-6">

                        {/* Profile Card */}
                        <div className="bg-[#1b2a4a]/70 border border-white/10 rounded-2xl p-5">
                            <SectionHeader
                                icon={Stethoscope}
                                title="Doctor Profile"
                                subtitle="Your information"
                                accent="purple"
                            />
                            <ProfileCard profile={profile} onUpdate={handleProfileUpdate} />
                        </div>

                        {/* Calendar */}
                        <div className="bg-[#1b2a4a]/70 border border-white/10 rounded-2xl p-5">
                            <SectionHeader
                                icon={CalendarCheck}
                                title="Appointment Calendar"
                                subtitle="Monthly view"
                                accent="blue"
                            />
                            <CalendarView calendarData={calendarData} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;