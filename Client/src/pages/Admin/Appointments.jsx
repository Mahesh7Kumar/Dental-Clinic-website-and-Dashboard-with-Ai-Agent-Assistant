import { useState, useEffect } from 'react';
import api from '../../utils/api.js';
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from '../../components/ui/table';
import { DeleteIcon } from '../../components/ui/delete';
import { CalendarDays, X } from 'lucide-react';

// ── Helpers ──────────────────────────────────────────────
function formatDate(dateStr) {
  const [year, month, day] = dateStr.slice(0, 10).split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[+month - 1]} ${+day}, ${year}`;
}

function formatTime12(timeStr) {
  const [hourStr, minute] = timeStr.split(':');
  let hour = parseInt(hourStr);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const statusStyles = {
  completed: 'bg-green-500/20  text-green-400  border border-green-500/30',
  confirmed: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  cancelled: 'bg-red-500/20    text-red-400    border border-red-500/30',
  pending: 'bg-blue-500/20   text-blue-400   border border-blue-500/30',
  reminded: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  not_reminded: 'bg-gray-500/20   text-gray-400   border border-gray-500/30',
};

function StatusBadge({ status }) {
  const style =
    statusStyles[status?.toLowerCase()] ||
    'bg-gray-500/20 text-gray-400 border border-gray-500/30';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${style}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {status}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────
export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(getTodayDate());

  const fetchAppointments = async (date) => {
    setLoading(true);
    try {
      const res = await api.get('/api/v1/appointments', {
        params: { filterdate: date },
      });
      setAppointments(res.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(filterDate);
  }, [filterDate]);

  const handleDelete = async (id) => {
    await api.delete(`/api/v1/appointments/${id}`);
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  const handleDateChange = (e) => setFilterDate(e.target.value);
  const handleClearDate = () => setFilterDate(getTodayDate());

  return (
    <div className="flex flex-col h-full gap-4 sm:gap-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
            Appointments
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Manage all patient appointments
          </p>
        </div>

        {/* Filter + count */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">

          {/* Date Picker */}
          <div className="relative flex items-center">
            <CalendarDays
              size={14}
              className="absolute left-3 text-gray-400 pointer-events-none"
            />
            <input
              type="date"
              value={filterDate}
              onChange={handleDateChange}
              className="
                pl-8 pr-7 py-1.5
                text-xs sm:text-sm text-gray-300
                bg-white/5 border border-white/10
                rounded-lg
                outline-none
                focus:border-[#1361b6]
                transition-colors
                [color-scheme:dark]
                cursor-pointer
                w-full sm:w-auto
              "
            />
            {filterDate !== getTodayDate() && (
              <button
                onClick={handleClearDate}
                className="absolute right-2 text-gray-500 hover:text-gray-300 transition-colors"
                title="Reset to today"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Count badge */}
          <span className="text-xs sm:text-sm text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg whitespace-nowrap">
            {filterDate === getTodayDate()
              ? `Today: ${appointments.length}`
              : `Found: ${appointments.length}`}
          </span>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="flex flex-col flex-1 min-h-0 bg-[#1b2a4a]/60 border border-[#1361b6]/40 rounded-2xl shadow-lg overflow-hidden">

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-3 text-gray-400 text-sm">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
            Loading appointments...
          </div>

          /* Empty */
        ) : appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-400 text-sm gap-2">
            <span className="text-4xl">📅</span>
            <p className="text-center px-4">
              No appointments on {formatDate(filterDate)}
            </p>
            {filterDate !== getTodayDate() && (
              <button
                onClick={handleClearDate}
                className="mt-1 text-blue-400 hover:text-blue-300 text-xs underline transition-colors"
              >
                Back to today
              </button>
            )}
          </div>

          /* Table — single scroll container, header + body together */
        ) : (
          <div className="
            flex-1 min-h-0
            overflow-auto
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          ">
            <Table className="w-full min-w-[580px]">

              {/* Sticky Header */}
              <TableHeader>
                <TableRow className="border-b border-white/10 hover:bg-transparent">
                  <TableHead className="
                    sticky top-0 z-10
                    bg-[#1b2a4a]
                    text-gray-400 font-semibold text-xs uppercase tracking-wider
                    px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                    w-10
                  ">
                    #
                  </TableHead>
                  <TableHead className="
                    sticky top-0 z-10
                    bg-[#1b2a4a]
                    text-gray-400 font-semibold text-xs uppercase tracking-wider
                    px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                    min-w-[130px] sm:min-w-[160px]
                  ">
                    Patient
                  </TableHead>
                  <TableHead className="
                    sticky top-0 z-10
                    bg-[#1b2a4a]
                    text-gray-400 font-semibold text-xs uppercase tracking-wider
                    px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                    min-w-[100px] sm:min-w-[120px]
                  ">
                    Date
                  </TableHead>
                  <TableHead className="
                    sticky top-0 z-10
                    bg-[#1b2a4a]
                    text-gray-400 font-semibold text-xs uppercase tracking-wider
                    px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                    min-w-[80px] sm:min-w-[100px]
                  ">
                    Time
                  </TableHead>
                  <TableHead className="
                    sticky top-0 z-10
                    bg-[#1b2a4a]
                    text-gray-400 font-semibold text-xs uppercase tracking-wider
                    px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                    min-w-[100px] sm:min-w-[130px]
                  ">
                    Status
                  </TableHead>
                  <TableHead className="
                    sticky top-0 z-10
                    bg-[#1b2a4a]
                    text-gray-400 font-semibold text-xs uppercase tracking-wider
                    px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                    text-right w-14 sm:w-16
                  ">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* Body */}
              <TableBody>
                {appointments.map((appt, index) => (
                  <TableRow
                    key={appt.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    {/* Index */}
                    <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 text-gray-500 text-xs sm:text-sm w-10">
                      {index + 1}
                    </TableCell>

                    {/* Patient */}
                    <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 min-w-[130px] sm:min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <div className="
                          w-6 h-6 sm:w-8 sm:h-8
                          flex-shrink-0 rounded-full
                          bg-blue-500/20 border border-blue-500/30
                          flex items-center justify-center
                          text-blue-400 text-xs font-bold
                        ">
                          {appt.patient_name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-medium text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px] lg:max-w-none">
                          {appt.patient_name}
                        </span>
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 text-gray-300 text-xs sm:text-sm min-w-[100px] whitespace-nowrap">
                      {formatDate(appt.date)}
                    </TableCell>

                    {/* Time */}
                    <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 text-gray-300 text-xs sm:text-sm min-w-[80px] whitespace-nowrap">
                      {formatTime12(appt.time)}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 min-w-[100px]">
                      <StatusBadge status={appt.status} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 text-right w-14 sm:w-16">
                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors group"
                        title="Delete appointment"
                      >
                        <DeleteIcon
                          size={15}
                          className="text-gray-500 group-hover:text-red-400 transition-colors"
                        />
                      </button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}