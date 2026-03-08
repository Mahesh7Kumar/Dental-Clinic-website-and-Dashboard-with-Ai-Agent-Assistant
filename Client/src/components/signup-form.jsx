import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User, Lock, Phone, Stethoscope, ChevronLeft, ChevronRight,
  Camera, CalendarDays, Clock, X
} from "lucide-react";

// ── Dark tokens (hardcoded) ───────────────────────────────────
const T = {
  pageBg: '#0f1e35',
  cardBg: '#0f1e35',
  cardBorder: 'rgba(19,97,182,0.4)',
  inputBg: 'rgba(255,255,255,0.05)',
  inputBorder: 'rgba(255,255,255,0.1)',
  rowBg: 'rgba(255,255,255,0.04)',
  divider: 'rgba(255,255,255,0.08)',
  textPrimary: '#f9fafb',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',
  iconColor: '#60a5fa',
  sectionInnerBg: '#0d1a2d',
};

// ─── helpers ──────────────────────────────────────────────────
const to12h = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// ─── Mini Calendar ─────────────────────────────────────────────
function MiniCalendar({ selectedDates = [], onChange }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const fmt = (d) => `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const toggle = (ds) => onChange(selectedDates.includes(ds) ? selectedDates.filter((d) => d !== ds) : [...selectedDates, ds].sort());
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const prevMonth = () => { if (isCurrentMonth) return; if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); } else setViewMonth((m) => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); } else setViewMonth((m) => m + 1); };
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-2">
        <button type="button" onClick={prevMonth} disabled={isCurrentMonth}
          className={`p-1 rounded transition ${isCurrentMonth ? "opacity-30 cursor-not-allowed" : ""}`}
          style={{ color: T.textMuted }}
          onMouseEnter={(e) => { if (!isCurrentMonth) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span style={{ color: T.textSecondary, fontSize: "0.75rem", fontWeight: 600 }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} className="p-1 rounded transition"
          style={{ color: T.textMuted }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[9px] font-bold py-0.5" style={{ color: T.textMuted }}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />;
          const ds = fmt(day);
          const isSel = selectedDates.includes(ds);
          const isPast = new Date(ds) < new Date(new Date().toDateString());
          return (
            <button type="button" key={ds} disabled={isPast} onClick={() => toggle(ds)}
              className="mx-auto w-7 h-7 rounded-full text-[10px] font-semibold transition-all flex items-center justify-center"
              style={{
                color: isSel ? "#fff" : isPast ? "#4b5563" : T.textSecondary,
                background: isSel ? "linear-gradient(135deg,#1361b6,#2d5db5)" : "transparent",
                cursor: isPast ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => { if (!isSel && !isPast) e.currentTarget.style.backgroundColor = "rgba(19,97,182,0.25)"; }}
              onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.backgroundColor = "transparent"; }}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Time Picker ───────────────────────────────────────────────
const ALL_TIMES = [];
for (let h = 8; h <= 20; h++) {
  ALL_TIMES.push(`${String(h).padStart(2, "0")}:00`);
  if (h < 20) ALL_TIMES.push(`${String(h).padStart(2, "0")}:30`);
}

function TimePicker({ selectedTimes = [], onChange }) {
  const toggle = (t) => onChange(selectedTimes.includes(t) ? selectedTimes.filter((s) => s !== t) : [...selectedTimes, t].sort());
  return (
    <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto pr-0.5">
      {ALL_TIMES.map((t) => {
        const active = selectedTimes.includes(t);
        return (
          <button type="button" key={t} onClick={() => toggle(t)}
            className="text-[10px] font-semibold py-1.5 rounded transition-all"
            style={{
              color: active ? "#fff" : T.textMuted,
              background: active ? "linear-gradient(135deg,#1361b6,#2d5db5)" : "transparent",
              border: `1px solid ${active ? "transparent" : T.inputBorder}`,
            }}
            onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = "#1361b6"; e.currentTarget.style.backgroundColor = "rgba(19,97,182,0.15)"; } }}
            onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = T.inputBorder; e.currentTarget.style.backgroundColor = "transparent"; } }}>
            {to12h(t)}
          </button>
        );
      })}
    </div>
  );
}

// ─── Field label ───────────────────────────────────────────────
const Field = ({ label, id, required, children }) => (
  <div className="space-y-1">
    <Label htmlFor={id} className="text-xs font-semibold" style={{ color: T.textSecondary }}>
      {required && <span style={{ color: "#ef4444" }} className="mr-0.5">*</span>}{label}:
    </Label>
    {children}
  </div>
);

// ─── Input with icon ───────────────────────────────────────────
const DarkInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textMuted }} />}
    <Input {...props}
      className={Icon ? "pl-8" : ""}
      style={{
        height: 36, borderRadius: 8, fontSize: "0.875rem",
        backgroundColor: T.inputBg,
        borderColor: T.inputBorder,
        color: T.textPrimary,
      }} />
  </div>
);

// ─── Section panel (Calendar / Time) ──────────────────────────
const SectionPanel = ({ icon: Icon, label, count, children }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${T.cardBorder}` }}>
    <div className="px-3 py-2 flex items-center gap-1.5"
      style={{ backgroundColor: "rgba(255,255,255,0.05)", borderBottom: `1px solid ${T.divider}` }}>
      <Icon className="w-3.5 h-3.5" style={{ color: T.iconColor }} />
      <span className="text-xs font-semibold" style={{ color: T.textSecondary }}>{label}</span>
      {count > 0 && (
        <span className="ml-auto text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full"
          style={{ background: "linear-gradient(135deg,#1361b6,#2d5db5)" }}>
          {count}
        </span>
      )}
    </div>
    <div className="p-2.5" style={{ backgroundColor: T.sectionInnerBg }}>
      {children}
    </div>
  </div>
);

const ROLES = ["doctor", "admin", "reception"];

// ══════════════════════════════════════════════════════════════
// SIGNUP FORM
// ══════════════════════════════════════════════════════════════
export function SignupForm({ className, onSubmit, onCancel, ...props }) {
  const [formData, setFormData] = useState({
    username: "", password: "", confirmPassword: "",
    role: "doctor", name: "", specialization: "", phone: "",
  });
  const [availDates, setAvailDates] = useState([]);
  const [availTimes, setAvailTimes] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const set = (k) => (e) => setFormData((f) => ({ ...f, [k]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { alert("Passwords do not match!"); return; }
    onSubmit?.({ ...formData, imageFile, available_date: availDates, available_slots: availTimes });
  };

  const initials = formData.name
    ? formData.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "DR";

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: T.cardBg, border: `1px solid ${T.cardBorder}` }}>

        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3.5"
          style={{ background: "linear-gradient(135deg,#0d1f3c 0%,#1361b6 100%)", borderBottom: `1px solid ${T.divider}` }}>
          <h2 className="text-sm font-bold text-white tracking-wide">Register New User</h2>
          {onCancel && (
            <button type="button" onClick={onCancel}
              className="p-1 rounded transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)" }}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-5 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ maxHeight: "72vh" }}>

            {/* Avatar + Role */}
            <div className="flex items-center gap-4 p-3 rounded-xl"
              style={{ backgroundColor: T.rowBg, border: `1px solid ${T.cardBorder}` }}>
              <div className="relative group cursor-pointer flex-shrink-0"
                onClick={() => fileInputRef.current?.click()}>
                <div className="w-14 h-14 rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.2)", backgroundColor: T.inputBg }}>
                  {imagePreview
                    ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    : <span className="text-sm font-black" style={{ color: T.textMuted }}>{initials}</span>
                  }
                </div>
                <div className="absolute -bottom-1 -right-1 p-1 rounded-md shadow"
                  style={{ backgroundColor: "#1361b6", border: "2px solid #0f1e35" }}>
                  <Camera className="w-2.5 h-2.5 text-white" />
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>

              <div className="flex-1 space-y-1">
                <Label className="text-xs font-semibold" style={{ color: T.textSecondary }}>
                  <span style={{ color: "#ef4444" }} className="mr-0.5">*</span>Role:
                </Label>
                <div className="flex gap-2">
                  {ROLES.map((r) => {
                    const active = formData.role === r;
                    return (
                      <button type="button" key={r}
                        onClick={() => setFormData((f) => ({ ...f, role: r }))}
                        className="flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all"
                        style={{
                          color: active ? "#fff" : T.textMuted,
                          background: active ? "linear-gradient(135deg,#0d1f3c,#1361b6)" : "transparent",
                          border: `1px solid ${active ? "transparent" : T.inputBorder}`,
                        }}>
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Username + Password */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Username" id="username" required>
                <DarkInput icon={User} id="username" placeholder="Enter username" value={formData.username} onChange={set("username")} required />
              </Field>
              <Field label="Password" id="password" required>
                <DarkInput icon={Lock} id="password" type="password" placeholder="••••••••" value={formData.password} onChange={set("password")} required />
              </Field>
            </div>

            {/* Confirm Password + Name */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Confirm Password" id="confirmPassword" required>
                <DarkInput icon={Lock} id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={set("confirmPassword")} required />
              </Field>
              <Field label="Full Name" id="name" required>
                <DarkInput icon={User} id="name" placeholder="Dr. John Smith" value={formData.name} onChange={set("name")} required />
              </Field>
            </div>

            {/* Specialization + Phone */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Specialization" id="specialization">
                <DarkInput icon={Stethoscope} id="specialization" placeholder="Cardiologist" value={formData.specialization} onChange={set("specialization")} />
              </Field>
              <Field label="Phone" id="phone">
                <DarkInput icon={Phone} id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={set("phone")} />
              </Field>
            </div>

            {/* Calendar + Time Slots */}
            <div className="grid grid-cols-2 gap-3">
              <SectionPanel icon={CalendarDays} label="Available Dates" count={availDates.length}>
                <MiniCalendar selectedDates={availDates} onChange={setAvailDates} />
                {availDates.length > 0 && (
                  <div className="mt-2 pt-2 flex flex-wrap gap-1 max-h-16 overflow-y-auto"
                    style={{ borderTop: `1px solid ${T.divider}` }}>
                    {availDates.map((d) => (
                      <span key={d} onClick={() => setAvailDates(availDates.filter((x) => x !== d))}
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-white cursor-pointer hover:opacity-75 transition"
                        style={{ background: "linear-gradient(135deg,#1361b6,#2d5db5)" }}>
                        {new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} ✕
                      </span>
                    ))}
                  </div>
                )}
              </SectionPanel>

              <SectionPanel icon={Clock} label="Time Slots" count={availTimes.length}>
                <TimePicker selectedTimes={availTimes} onChange={setAvailTimes} />
                {availTimes.length > 0 && (
                  <div className="mt-2 pt-2 flex flex-wrap gap-1 max-h-16 overflow-y-auto"
                    style={{ borderTop: `1px solid ${T.divider}` }}>
                    {availTimes.map((t) => (
                      <span key={t} onClick={() => setAvailTimes(availTimes.filter((x) => x !== t))}
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-white cursor-pointer hover:opacity-75 transition"
                        style={{ background: "linear-gradient(135deg,#1361b6,#2d5db5)" }}>
                        {to12h(t)} ✕
                      </span>
                    ))}
                  </div>
                )}
              </SectionPanel>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3.5"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderTop: `1px solid ${T.divider}` }}>
            <p className="text-xs" style={{ color: T.textMuted }}>
              Already have an account?{" "}
              <a href="/admin/login" className="font-semibold hover:underline" style={{ color: "#3b82f6" }}>Sign in</a>
            </p>
            <div className="flex items-center gap-2">
              {onCancel && (
                <button type="button" onClick={onCancel}
                  className="px-4 py-2 text-sm font-semibold rounded-lg transition-all"
                  style={{ color: T.textSecondary, backgroundColor: T.inputBg, border: `1px solid ${T.inputBorder}` }}>
                  Cancel
                </button>
              )}
              <button type="submit"
                className="px-5 py-2 text-sm font-bold text-white rounded-lg shadow transition-all hover:shadow-md hover:-translate-y-px active:translate-y-0"
                style={{ background: "linear-gradient(135deg,#0d1f3c,#1361b6)" }}>
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}