import { useState, useEffect } from "react";
import { X, User, Phone, Mail, Calendar, Clock, CheckCircle } from "lucide-react";
import api from "../utils/api.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    date: d.toLocaleDateString("en-GB").replace(/\//g, "-"),
    iso: dateStr,
  };
};

const formatTime = (timeStr) => {
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return { display: `${String(h12).padStart(2, "0")}:${m}`, ampm, raw: timeStr };
};

const formatDisplayDate = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return d
    .toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/ /g, "-");
};

// ─── Spinner ──────────────────────────────────────────────────────────────────
const Spinner = ({ color = "#3b82f6" }) => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" style={{ color }}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

// ─── Doctor Card ──────────────────────────────────────────────────────────────
const DoctorCard = ({ doctor, selected, onClick }) => (
  <button
    onClick={() => onClick(doctor)}
    className="flex-shrink-0 w-[120px] rounded-2xl p-3 flex flex-col items-center gap-2 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
    style={{
      background: selected ? "linear-gradient(135deg, #1565C0 0%, #42a5f5 100%)" : "#fff",
      border: selected ? "2.5px solid #1565C0" : "2.5px solid #c8ddf7",
      boxShadow: selected
        ? "0 8px 24px rgba(21,101,192,0.25)"
        : "0 2px 12px rgba(100,150,220,0.10)",
    }}
  >
    <div
      className="w-14 h-14 rounded-full overflow-hidden border-2 shadow"
      style={{ borderColor: selected ? "rgba(255,255,255,0.7)" : "#c8ddf7" }}
    >
      {doctor.image ? (
        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: "#e8f4fd" }}
        >
          <User className="w-7 h-7" style={{ color: "#74A7BB" }} />
        </div>
      )}
    </div>
    <div className="text-center">
      <p
        className="font-bold text-xs leading-tight"
        style={{ color: selected ? "#fff" : "#1a3a6e" }}
      >
        {doctor.name}
      </p>
      <p
        className="text-[10px] mt-0.5 leading-tight"
        style={{ color: selected ? "rgba(255,255,255,0.8)" : "#74A7BB" }}
      >
        {doctor.title || doctor.specialization}
      </p>
    </div>
  </button>
);

// ─── Date Pill ────────────────────────────────────────────────────────────────
const DatePill = ({ dateObj, selected, onClick }) => (
  <button
    onClick={() => onClick(dateObj.iso)}
    className="flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-200 min-w-[80px] hover:scale-105 active:scale-95"
    style={{
      background: selected ? "linear-gradient(135deg, #1565C0, #42a5f5)" : "#fff",
      border: selected ? "2px solid #1565C0" : "2px solid #c8ddf7",
      boxShadow: selected ? "0 4px 14px rgba(21,101,192,0.25)" : "0 1px 6px rgba(100,150,220,0.10)",
    }}
  >
    <span
      className="text-[9px] font-bold tracking-widest"
      style={{ color: selected ? "rgba(255,255,255,0.75)" : "#74A7BB" }}
    >
      {dateObj.day}
    </span>
    <span
      className="font-bold text-[11px] mt-0.5"
      style={{ color: selected ? "#fff" : "#1a3a6e" }}
    >
      {dateObj.date}
    </span>
  </button>
);

// ─── Time Pill ────────────────────────────────────────────────────────────────
const TimePill = ({ timeObj, selected, onClick }) => (
  <button
    onClick={() => onClick(timeObj.raw)}
    className="flex items-baseline gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
    style={{
      background: selected ? "linear-gradient(135deg, #1565C0, #42a5f5)" : "#fff",
      border: selected ? "2px solid #1565C0" : "2px solid #c8ddf7",
      boxShadow: selected ? "0 4px 14px rgba(21,101,192,0.25)" : "0 1px 6px rgba(100,150,220,0.10)",
    }}
  >
    <span
      className="font-bold text-sm"
      style={{ color: selected ? "#fff" : "#1a3a6e" }}
    >
      {timeObj.display}
    </span>
    <span
      className="text-[9px] font-semibold"
      style={{ color: selected ? "rgba(255,255,255,0.8)" : "#74A7BB" }}
    >
      {timeObj.ampm}
    </span>
  </button>
);

// ─── Form Input ───────────────────────────────────────────────────────────────
const FormInput = ({ icon: Icon, label, required, error, ...props }) => (
  <div className="space-y-1.5">
    <label className="font-bold text-sm flex items-center gap-1.5" style={{ color: "#1a3a6e" }}>
      <Icon className="w-3.5 h-3.5" style={{ color: "#74A7BB" }} />
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
      {!required && <span className="text-xs font-normal ml-1" style={{ color: "#9cb8d4" }}>(optional)</span>}
    </label>
    <input
      {...props}
      className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 border-2
        ${error ? "border-red-300 bg-red-50" : ""}`}
      style={
        !error
          ? {
            background: "#f0f7ff",
            border: "2px solid #c8ddf7",
            color: "#1a3a6e",
          }
          : { color: "#1a3a6e" }
      }
      onFocus={(e) => {
        if (!error) {
          e.target.style.borderColor = "#1565C0";
          e.target.style.background = "#fff";
        }
      }}
      onBlur={(e) => {
        if (!error) {
          e.target.style.borderColor = "#c8ddf7";
          e.target.style.background = "#f0f7ff";
        }
      }}
    />
    {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
  </div>
);

// ─── Hint ─────────────────────────────────────────────────────────────────────
const Hint = ({ children }) => (
  <p className="text-xs italic flex items-center gap-1.5" style={{ color: "#9cb8d4" }}>
    <span className="text-sm leading-none">←</span> {children}
  </p>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionTitle = ({ icon: Icon, children }) => (
  <h3
    className="font-black text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2"
    style={{ color: "#1a3a6e" }}
  >
    <Icon className="w-3.5 h-3.5" style={{ color: "#74A7BB" }} />
    {children}
  </h3>
);

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ date, time, onClose }) => {
  const t = formatTime(time);
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-5 px-8 py-8">
      {/* Checkmark */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #42a5f5, #1565C0)",
          boxShadow: "0 12px 40px rgba(21,101,192,0.35)",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-14 h-14" fill="none"
          stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div className="text-center space-y-3">
        <h3 className="text-2xl font-black tracking-tight" style={{ color: "#1a3a6e" }}>
          Your Appointment Book
        </h3>
        <div
          className="inline-block rounded-full px-8 py-2"
          style={{ background: "linear-gradient(135deg, #e8f4fd, #c8ddf7)" }}
        >
          <span className="font-black text-lg" style={{ color: "#1565C0" }}>
            Successfully
          </span>
        </div>
        <p className="font-bold text-base" style={{ color: "#1a3a6e" }}>
          {formatDisplayDate(date)} – {t.display}
          <span className="text-[10px] align-super ml-0.5">{t.ampm}</span>
        </p>
        <p className="font-semibold text-sm" style={{ color: "#74A7BB" }}>
          Don't miss the appointment
        </p>
      </div>

      <button
        onClick={onClose}
        className="font-black px-10 py-2.5 rounded-full shadow-lg text-sm transition-all hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #1565C0, #42a5f5)",
          color: "#fff",
          boxShadow: "0 8px 24px rgba(21,101,192,0.3)",
        }}
      >
        Done
      </button>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN MODAL
// ═══════════════════════════════════════════════════════════════════════════════
export default function BookAppointmentModal({ onClose }) {
  const [phase, setPhase] = useState("welcome");
  const [doctors, setDoctors] = useState([]);

  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});

  // ── Load doctor ───────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/v1/doctor/all");
        const docs = res.data;
        console.log("Fetched doctors:", docs);
        if (Array.isArray(docs) && docs.length > 0) {
          setDoctors(docs); // ✅ was: if (doc?.id) setDoctors([doc])
        }
      } catch (err) {
        console.error("Failed to load doctor:", err);
      } finally {
        setTimeout(() => setPhase("form"), 1400);
      }
    };
    load();
  }, []);

  // ── Select doctor → dates ─────────────────────────────────────────────────
  const handleSelectDoctor = async (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedSlot(null);
    setAvailableDates([]);
    setAvailableSlots([]);
    setLoadingDates(true);
    try {
      const res = await api.get("/api/v1/appointments/available-dates", {
        params: { doctor_id: doctor.id },
      });
      const doctorData = res.data?.data?.find((d) => d.id === doctor.id);
      setAvailableDates(doctorData?.availableDates || []);
    } catch (err) {
      console.error("Failed to fetch dates:", err);
    } finally {
      setLoadingDates(false);
    }
  };

  // ── Select date → slots ───────────────────────────────────────────────────
  const handleSelectDate = async (iso) => {
    setSelectedDate(iso);
    setSelectedSlot(null);
    setAvailableSlots([]);
    setLoadingSlots(true);
    try {
      const res = await api.get("/api/v1/appointments/available-slots", {
        params: { doctor_id: selectedDoctor.id, available_date: iso },
      });
      setAvailableSlots(res.data?.data?.availableSlots || []);
    } catch (err) {
      console.error("Failed to fetch slots:", err);
    } finally {
      setLoadingSlots(false);
    }
  };

  // ── Validate ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Mobile number is required";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone.trim())) e.phone = "Enter a valid number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    return e;
  };

  // ── Book ──────────────────────────────────────────────────────────────────
  const handleBook = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setBooking(true);
    try {
      await api.post("/api/v1/appointments/create", {
        patient_name: form.name.trim(),
        patient_phone: form.phone.trim(),
        patient_email: form.email.trim() || null,
        date: selectedDate,
        time: selectedSlot,
        source: "website",
      });
      setPhase("booked");
    } catch (err) {
      console.error("Booking failed:", err);
    } finally {
      setBooking(false);
    }
  };

  const canBook = !!(selectedDoctor && selectedDate && selectedSlot && form.name && form.phone);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[60] px-3 py-4"
      style={{ background: "rgba(26,58,110,0.45)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full rounded-3xl shadow-2xl overflow-hidden"
        style={{
          maxWidth: "880px",
          maxHeight: "92vh",
          background: "linear-gradient(160deg, #dceefb 0%, #e8f4fd 50%, #f0f7ff 100%)",
          border: "1.5px solid #c8ddf7",
        }}
      >
        {/* Decorative top band matching navbar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
          style={{ background: "linear-gradient(90deg, #74A7BB, #1565C0, #42a5f5, #74A7BB)" }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full transition-all hover:scale-110"
          style={{ background: "#e8f4fd", color: "#1a3a6e" }}
        >
          <X size={20} />
        </button>

        {/* ══ WELCOME PHASE ═════════════════════════════════════════════════ */}
        {phase === "welcome" && (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 px-8">
            {/* Animated logo dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full animate-bounce"
                  style={{
                    background: i === 0 ? "#74A7BB" : i === 1 ? "#1565C0" : "#42a5f5",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
            <div className="text-center space-y-2">
              {/* Clinic icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                style={{ background: "linear-gradient(135deg, #1565C0, #42a5f5)" }}
              >
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-3xl font-black tracking-tight" style={{ color: "#1a3a6e" }}>
                Welcome to Demo Dental Clinic
              </h2>
              <p className="text-sm" style={{ color: "#74A7BB" }}>
                Loading available appointments…
              </p>
            </div>
          </div>
        )}

        {/* ══ SUCCESS PHASE ═════════════════════════════════════════════════ */}
        {phase === "booked" && (
          <SuccessScreen date={selectedDate} time={selectedSlot} onClose={onClose} />
        )}

        {/* ══ FORM PHASE ════════════════════════════════════════════════════ */}
        {phase === "form" && (
          <>
            {/* Header */}
            <div
              className="px-6 pt-6 pb-4 text-center border-b"
              style={{ borderColor: "#c8ddf7" }}
            >
              <h2 className="text-xl font-black tracking-tight" style={{ color: "#1a3a6e" }}>
                Book Appointment with Us
              </h2>
              <p className="text-xs mt-1" style={{ color: "#74A7BB" }}>
                Fast · Simple · Hassle-free
              </p>
            </div>

            {/* Two-column body */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 80px)" }}
            >
              {/* ── LEFT: Selectors ── */}
              <div
                className="p-5 space-y-5 border-r"
                style={{ borderColor: "#c8ddf7" }}
              >
                {/* Doctors */}
                <section>
                  <SectionTitle icon={User}>Doctors</SectionTitle>
                  {doctors.length === 0 ? (
                    <p className="text-sm italic" style={{ color: "#9cb8d4" }}>No doctors found</p>
                  ) : (
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {doctors.map((doc) => (
                        <DoctorCard
                          key={doc.id}
                          doctor={doc}
                          selected={selectedDoctor?.id === doc.id}
                          onClick={handleSelectDoctor}
                        />
                      ))}
                    </div>
                  )}
                </section>

                {/* Available Dates */}
                <section>
                  <SectionTitle icon={Calendar}>Available Date</SectionTitle>
                  {!selectedDoctor ? (
                    <Hint>Select a doctor first</Hint>
                  ) : loadingDates ? (
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#74A7BB" }}>
                      <Spinner /> Loading…
                    </div>
                  ) : availableDates.length === 0 ? (
                    <p className="text-sm italic" style={{ color: "#9cb8d4" }}>No available dates</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {availableDates.map((d) => (
                        <DatePill
                          key={d}
                          dateObj={formatDate(d)}
                          selected={selectedDate === d}
                          onClick={handleSelectDate}
                        />
                      ))}
                    </div>
                  )}
                </section>

                {/* Available Slots */}
                <section>
                  <SectionTitle icon={Clock}>Available Slots</SectionTitle>
                  {!selectedDoctor ? (
                    <Hint>Select a doctor first</Hint>
                  ) : !selectedDate ? (
                    <Hint>Select a date first</Hint>
                  ) : loadingSlots ? (
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#74A7BB" }}>
                      <Spinner /> Loading…
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <p className="text-sm italic" style={{ color: "#9cb8d4" }}>No slots available</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map((slot) => (
                        <TimePill
                          key={slot}
                          timeObj={formatTime(slot)}
                          selected={selectedSlot === slot}
                          onClick={setSelectedSlot}
                        />
                      ))}
                    </div>
                  )}
                </section>
              </div>

              {/* ── RIGHT: Patient form ── */}
              <div className="p-5 flex flex-col gap-4">

                <FormInput
                  icon={User} label="Name" required
                  type="text" placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  error={errors.name}
                />

                <FormInput
                  icon={Phone} label="Mobile Number" required
                  type="tel" placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  error={errors.phone}
                />

                <FormInput
                  icon={Mail} label="Email" required={false}
                  type="email" placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  error={errors.email}
                />

                {/* Summary badge */}
                {selectedDate && selectedSlot && (
                  <div
                    className="rounded-xl px-4 py-2.5 flex items-center gap-2.5"
                    style={{
                      background: "linear-gradient(135deg, #e8f4fd, #dceefb)",
                      border: "1.5px solid #c8ddf7",
                    }}
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#1565C0" }} />
                    <p className="text-xs font-semibold" style={{ color: "#1a3a6e" }}>
                      {formatDisplayDate(selectedDate)}&nbsp;&nbsp;|&nbsp;&nbsp;
                      {formatTime(selectedSlot).display}
                      <span className="text-[9px] align-super">{formatTime(selectedSlot).ampm}</span>
                    </p>
                  </div>
                )}

                <div className="flex-1" />

                {/* Book button */}
                <button
                  onClick={handleBook}
                  disabled={!canBook || booking}
                  className="w-full py-3 rounded-2xl font-black text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: canBook && !booking
                      ? "linear-gradient(135deg, #1565C0 0%, #42a5f5 100%)"
                      : "#e8f0f8",
                    color: canBook && !booking ? "#fff" : "#9cb8d4",
                    boxShadow: canBook && !booking ? "0 8px 24px rgba(21,101,192,0.3)" : "none",
                    cursor: canBook && !booking ? "pointer" : "not-allowed",
                  }}
                >
                  {booking ? <><Spinner color="#fff" /> Booking…</> : "Book Appointment"}
                </button>

                {/* Progress hint */}
                {!canBook && (
                  <p className="text-xs text-center -mt-1" style={{ color: "#9cb8d4" }}>
                    {!selectedDoctor
                      ? "Select a doctor to continue"
                      : !selectedDate
                        ? "Select a date to continue"
                        : !selectedSlot
                          ? "Select a time slot to continue"
                          : "Fill in your details above"}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}