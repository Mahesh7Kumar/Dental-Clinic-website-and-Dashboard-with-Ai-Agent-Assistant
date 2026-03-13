import { useState, useEffect } from 'react';
import { useTheme } from '../../context/Themecontext.jsx';
const GreetingCard = ({ profile }) => {
  const { isDark } = useTheme();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const getGreeting = () => {
    const hour = currentDateTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getDayMessage = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `Have a Nice ${days[currentDateTime.getDay()]}!`;
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8 md:p-10 shadow-xl transition-all duration-500 hover:shadow-2xl"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0d1f3c 0%, #1361b6 60%, #2d5db5 100%)'
          : 'linear-gradient(135deg, #5B7FE8 0%, #6B90F1 50%, #7BA4F5 100%)',
      }}
      data-testid="greeting-card"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />

      {/* Date pill */}
      <div className="relative flex justify-between items-start mb-6">
        <div
          className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/30 transition-all duration-300 hover:bg-white/30"
          data-testid="datetime-display"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-white font-medium text-sm md:text-base">
            {formatDateTime(currentDateTime)}
          </span>
        </div>
      </div>

      {/* Greeting */}
      <div className="relative space-y-3">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg"
          data-testid="greeting-title"
        >
          {getGreeting()}, {profile?.name}!
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium" data-testid="day-message">
          {getDayMessage()}
        </p>
      </div>
    </div>
  );
};

export default GreetingCard;