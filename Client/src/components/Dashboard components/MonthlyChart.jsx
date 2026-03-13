import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { useTheme } from '../../context/Themecontext.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const MonthlyChart = ({ data }) => {
  const { isDark } = useTheme();

  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : '#F3F4F6';
  const tickColor = isDark ? '#6b7280' : '#6B7280';
  const tooltipBg = isDark ? 'rgba(10,22,40,0.95)' : 'rgba(0,0,0,0.8)';
  const fillColor = isDark ? 'rgba(19,97,182,0.15)' : 'rgba(91,127,232,0.10)';
  const lineColor = isDark ? '#1361b6' : '#5B7FE8';
  const pointColor = isDark ? '#2d5db5' : '#5B7FE8';

  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Total Appointments',
      data: data.values,
      borderColor: lineColor,
      backgroundColor: fillColor,
      pointBackgroundColor: pointColor,
      pointBorderColor: isDark ? '#0a1628' : '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.4,
      fill: true,
      borderWidth: 3,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: tooltipBg,
        padding: 12,
        borderRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: { label: (ctx) => `Appointments: ${ctx.parsed.y}` },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, weight: '600' }, color: tickColor },
      },
      y: {
        beginAtZero: true,
        grid: { color: gridColor, drawBorder: false },
        ticks: { font: { size: 12, weight: '600' }, color: tickColor },
      },
    },
    interaction: { intersect: false, mode: 'index' },
  };

  // ── Theme tokens ──
  const card = isDark
    ? 'bg-[#1b2a4a]/60 border border-[#1361b6]/40 hover:border-[#1361b6]/60'
    : 'bg-white border border-gray-100 hover:shadow-xl';
  const title = isDark ? 'text-gray-200' : 'text-gray-800';

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg transition-all duration-300 ${card}`}
      data-testid="monthly-chart-card"
    >
      <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${title}`}>
        This Week Appointment Level
      </h3>
      <div className="h-[280px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MonthlyChart;