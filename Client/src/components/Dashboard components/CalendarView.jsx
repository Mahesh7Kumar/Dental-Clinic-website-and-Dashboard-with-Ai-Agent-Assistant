import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useTheme } from '../../context/Themecontext.jsx';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const CalendarView = ({ calendarData }) => {
  const { isDark } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(calendarData.currentMonth);
  const [currentYear, setCurrentYear] = useState(calendarData.currentYear);

  const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m, y) => new Date(y, m, 1).getDay();

  const isSameMonthYear = currentMonth === calendarData.currentMonth && currentYear === calendarData.currentYear;
  const isCurrentDate = (d) => d === calendarData.currentDate && isSameMonthYear;
  const isCompletedDate = (d) => calendarData.completedDates.includes(d) && isSameMonthYear;
  const isApptDate = (d) => calendarData.appointmentDates.includes(d) && isSameMonthYear;

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  // ── Theme tokens ──
  const card = isDark
    ? 'bg-[#1b2a4a]/60 border border-[#1361b6]/40 hover:border-[#1361b6]/60'
    : 'bg-white border border-gray-100 hover:shadow-xl';
  const headerBg = isDark
    ? 'linear-gradient(135deg, #0d1f3c 0%, #1361b6 100%)'
    : 'linear-gradient(135deg, #5B7FE8 0%, #6B90F1 100%)';
  const navBtn = isDark
    ? 'bg-white/10 border border-white/10 hover:bg-white/20'
    : 'bg-white/20 hover:bg-white/30';
  const dayHeaderColor = isDark ? 'text-gray-500' : 'text-indigo-400';
  const defaultDay = isDark
    ? 'text-gray-400 hover:bg-white/10 hover:text-gray-200'
    : 'text-gray-700 hover:bg-indigo-50';
  const divider = isDark ? 'border-white/10' : 'border-gray-100';
  const legendText = 'text-gray-500';

  const renderCalendar = () => {
    const total = daysInMonth(currentMonth, currentYear);
    const first = getFirstDay(currentMonth, currentYear);
    const cells = [];

    for (let i = 0; i < first; i++) cells.push(<div key={`e${i}`} className="h-10" />);

    for (let day = 1; day <= total; day++) {
      const isCurrent = isCurrentDate(day);
      const isCompleted = isCompletedDate(day);
      const hasAppt = isApptDate(day);

      let cls = 'h-10 w-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 relative cursor-pointer';
      let style = {};

      if (isCurrent || isCompleted) {
        cls += ' text-white shadow-lg scale-105';
        style = { background: 'linear-gradient(135deg, #1361b6, #2d5db5)' };
      } else if (hasAppt && isDark) {
        cls += ' text-green-300 bg-green-500/20 border border-green-500/30';
      } else if (hasAppt && !isDark) {
        cls += ' text-white bg-green-500 shadow-sm';
      } else {
        cls += ` ${defaultDay}`;
      }

      cells.push(
        <div key={day} className={cls} style={style} data-testid={`calendar-day-${day}`}>
          {day}
          {isCompleted && (
            <Check className="w-3 h-3 absolute -top-0.5 -right-0.5 text-white bg-green-500 rounded-full p-0.5" />
          )}
        </div>
      );
    }
    return cells;
  };

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg transition-all duration-300 ${card}`}
      data-testid="calendar-card"
    >
      {/* Header */}
      <div
        className="flex justify-between items-center mb-6 p-4 rounded-xl text-white"
        style={{ background: headerBg }}
      >
        <h3 className="text-sm font-bold uppercase tracking-widest">My Calendar</h3>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className={`p-1.5 rounded-lg backdrop-blur-sm transition-all duration-200 active:scale-95 ${navBtn}`} data-testid="prev-month-button">
            <ChevronLeft className="w-4 h-4 text-white/90" />
          </button>
          <span className="text-sm font-semibold min-w-[110px] text-center" data-testid="current-month">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <button onClick={nextMonth} className={`p-1.5 rounded-lg backdrop-blur-sm transition-all duration-200 active:scale-95 ${navBtn}`} data-testid="next-month-button">
            <ChevronRight className="w-4 h-4 text-white/90" />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className={`h-8 flex items-center justify-center text-xs font-bold uppercase tracking-wider ${dayHeaderColor}`}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

      {/* Legend */}
      <div className={`flex items-center gap-4 mt-5 pt-4 border-t ${divider}`}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(135deg, #1361b6, #2d5db5)' }} />
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${legendText}`}>Today / Done</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded-sm ${isDark ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-500'}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${legendText}`}>Appointment</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;