import { ScrollArea } from '../../components/ui/scroll-area';
import { CalendarX } from 'lucide-react';
import { useTheme } from '../../context/Themecontext.jsx';

const statusStyles = {
  dark: {
    completed: 'bg-green-500/20 text-green-400 border border-green-500/30',
    cancelled:  'bg-red-500/20   text-red-400   border border-red-500/30',
    confirmed:  'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    pending:    'bg-blue-500/20  text-blue-400  border border-blue-500/30',
    default:    'bg-gray-500/20  text-gray-400  border border-gray-500/30',
  },
  light: {
    completed: 'bg-green-100 text-green-700',
    cancelled:  'bg-red-100   text-red-700',
    confirmed:  'bg-yellow-100 text-yellow-700',
    pending:    'bg-blue-100  text-blue-700',
    default:    'bg-gray-100  text-gray-600',
  },
};

const dotColors = {
  completed: 'bg-green-500',
  cancelled:  'bg-red-500',
  confirmed:  'bg-yellow-500',
  pending:    'bg-blue-500',
  default:    'bg-gray-400',
};

const TodayAppointments = ({ appointments }) => {
  const { isDark } = useTheme();

  const getStatusStyle = (status) => {
    const map = isDark ? statusStyles.dark : statusStyles.light;
    return map[status?.toLowerCase()] || map.default;
  };
  const getDotColor = (status) => dotColors[status?.toLowerCase()] || dotColors.default;

  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    .toUpperCase();

  // ── Theme tokens ──
  const card = isDark
    ? 'bg-[#1b2a4a]/60 border border-[#1361b6]/40 hover:border-[#1361b6]/60'
    : 'bg-white border border-gray-100 hover:shadow-xl';
  const title = isDark ? 'text-gray-200' : 'text-gray-800';
  const rowBg = isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100 hover:translate-x-1';
  const timeText = isDark ? 'text-gray-300' : 'text-gray-700';
  const typeText = isDark ? 'text-gray-400' : 'text-gray-600';
  const emptyBg = isDark ? 'bg-[#1361b6]/15' : 'bg-gradient-to-br from-indigo-50 to-blue-50';
  const emptyTitle = isDark ? 'text-gray-300' : 'text-gray-700';
  const emptySubtitle = isDark ? 'text-gray-500' : 'text-gray-400';
  const emptyIcon = isDark ? 'text-blue-400' : 'text-indigo-400';

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg transition-all duration-300 ${card}`}
      data-testid="today-appointments-card"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className={`text-sm font-bold uppercase tracking-widest ${title}`}>
          Today's Appointments
        </h3>
        <span
          className="text-xs font-bold text-white px-3 py-1 rounded-lg"
          style={{ background: 'linear-gradient(135deg, #1361b6, #2d5db5)' }}
          data-testid="appointment-date"
        >
          {formattedDate}
        </span>
      </div>

      {appointments && appointments.length > 0 ? (
        <ScrollArea className="h-[380px] pr-3">
          <div className="space-y-2">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${rowBg}`}
                data-testid={`appointment-item-${appt.id}`}
              >
                <span className={`text-xs font-semibold min-w-[68px] ${timeText}`}>
                  {appt.time}
                </span>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getDotColor(appt.status)}`} />
                <span className={`text-xs font-medium truncate flex-1 ${typeText}`}>
                  {appt.type}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="h-[380px] flex flex-col items-center justify-center gap-4" data-testid="no-appointments">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${emptyBg}`}>
            <CalendarX className={`w-8 h-8 ${emptyIcon}`} />
          </div>
          <div className="text-center">
            <p className={`font-semibold text-base ${emptyTitle}`}>No Appointments for Today</p>
            <p className={`text-sm mt-1 ${emptySubtitle}`}>Enjoy your free day!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayAppointments;