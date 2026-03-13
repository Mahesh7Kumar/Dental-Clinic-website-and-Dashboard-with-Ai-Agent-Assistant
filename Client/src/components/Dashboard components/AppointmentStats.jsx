import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../../context/Themecontext.jsx';

ChartJS.register(ArcElement, Tooltip, Legend);

const AppointmentStats = ({ stats }) => {
  const { isDark } = useTheme();

  const chartData = {
    labels: ['Completed', 'Cancelled', 'Balance'],
    datasets: [{
      data: [stats.completed, stats.cancelled, stats.balance],
      backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
      borderWidth: 0,
      cutout: '75%',
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: isDark ? 'rgba(10,22,40,0.95)' : 'rgba(0,0,0,0.8)',
        padding: 12,
        borderRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
      },
    },
  };

  // ── Theme tokens ──
  const card = isDark
    ? 'bg-[#1b2a4a]/60 border border-[#1361b6]/40 hover:border-[#1361b6]/60'
    : 'bg-white border border-gray-100 hover:shadow-xl';
  const title = isDark ? 'text-gray-200' : 'text-gray-800';
  const centerNum = isDark ? 'text-white' : 'text-gray-800';
  const centerSub = isDark ? 'text-gray-400' : 'text-gray-500';
  const legendLabel = isDark ? 'text-gray-400' : 'text-gray-600';
  const legendValue = isDark ? 'text-gray-100' : 'text-gray-800';
  const divider = isDark ? 'border-white/10' : 'border-gray-100';

  const legendItems = [
    { label: 'Total', value: stats.total, color: isDark ? 'bg-gray-300' : 'bg-gray-800' },
    { label: 'Completed', value: stats.completed, color: 'bg-green-500' },
    { label: 'Cancelled', value: stats.cancelled, color: 'bg-red-500' },
    { label: 'Balance', value: stats.balance, color: 'bg-yellow-500' },
  ];

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg transition-all duration-300 ${card}`}
      data-testid="appointment-stats-card"
    >
      <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${title}`}>
        Appointment Scheduled
      </h3>

      {/* Donut chart */}
      <div className="relative w-44 h-44 mx-auto">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${centerNum}`} data-testid="completion-percentage">
            {stats.completionPercentage}%
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-wide text-center mt-1 ${centerSub}`}>
            Appointment<br />Completed
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className={`mt-5 pt-4 border-t ${divider} grid grid-cols-2 gap-x-4 gap-y-3`}>
        {legendItems.map(({ label, value, color }) => (
          <div key={label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color}`} />
              <span className={`text-xs font-medium truncate ${legendLabel}`}>{label}</span>
            </div>
            <span className={`text-sm font-bold flex-shrink-0 ${legendValue}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentStats;