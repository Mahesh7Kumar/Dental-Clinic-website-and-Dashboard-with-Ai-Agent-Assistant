import { useState, useEffect, useRef, useContext } from 'react';
import {
  Edit2, Phone, MapPin, Check, Camera, User, Stethoscope,
  Clock, CalendarDays, ChevronLeft, ChevronRight, UserLock, UserPlus
} from 'lucide-react';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import api from '../../utils/api.js';
import ChangePassword from './ChangePassword.jsx';
import AuthContext from '../../context/AuthContext.jsx';
import Register from '../../pages/Admin/Register.jsx';
import { useTheme } from '../../context/Themecontext.jsx';

/* ─── helpers ─── */
const to12h = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
};
const parseArr = (val) => {
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val || '[]'); } catch { return []; }
};
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

/* ─── Mini Calendar ─── */
function MiniCalendar({ selectedDates = [], onChange, isDark }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const fmt = (d) => `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const toggle = (ds) => onChange(selectedDates.includes(ds) ? selectedDates.filter((d)=>d!==ds) : [...selectedDates,ds].sort());
  const isCurrentMonth = viewYear===today.getFullYear() && viewMonth===today.getMonth();

  const prevMonth = () => { if(isCurrentMonth)return; if(viewMonth===0){setViewMonth(11);setViewYear((y)=>y-1);}else setViewMonth((m)=>m-1); };
  const nextMonth = () => { if(viewMonth===11){setViewMonth(0);setViewYear((y)=>y+1);}else setViewMonth((m)=>m+1); };
  const cells = [...Array(firstDay).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];

  const hoverBtn = isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  const chevronColor = isDark ? 'text-gray-400' : 'text-gray-500';
  const monthLabel = isDark ? 'text-gray-300' : 'text-gray-700';
  const dayHeader = isDark ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-2">
        <button onClick={prevMonth} disabled={isCurrentMonth}
          className={`p-1 rounded transition ${isCurrentMonth?'opacity-30 cursor-not-allowed':hoverBtn}`}>
          <ChevronLeft className={`w-3.5 h-3.5 ${chevronColor}`}/>
        </button>
        <span className={`text-xs font-semibold ${monthLabel}`}>{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className={`p-1 rounded transition ${hoverBtn}`}>
          <ChevronRight className={`w-3.5 h-3.5 ${chevronColor}`}/>
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d)=>(
          <div key={d} className={`text-center text-[9px] font-bold py-0.5 ${dayHeader}`}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day,i)=>{
          if(!day) return <div key={`e${i}`}/>;
          const ds=fmt(day);
          const isSel=selectedDates.includes(ds);
          const isPast=new Date(ds)<new Date(new Date().toDateString());
          const baseText = isDark
            ? (isPast?'text-gray-600':'text-gray-300')
            : (isPast?'text-gray-300':'text-gray-600');
          const hoverStyle = !isPast && !isSel ? (isDark?'hover:bg-[#1361b6]/30':'hover:bg-blue-50') : '';
          return (
            <button key={ds} disabled={isPast} onClick={()=>toggle(ds)}
              className={`mx-auto w-7 h-7 rounded-full text-[10px] font-semibold transition-all
                ${isPast?'cursor-not-allowed':''} ${isSel?'text-white shadow':baseText} ${hoverStyle}`}
              style={isSel?{background:'linear-gradient(135deg,#1361b6,#2d5db5)'}:{}}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Time Picker ─── */
const ALL_TIMES = [];
for(let h=8;h<=20;h++){
  ALL_TIMES.push(`${String(h).padStart(2,'0')}:00`);
  if(h<20) ALL_TIMES.push(`${String(h).padStart(2,'0')}:30`);
}

function TimePicker({ selectedTimes=[], onChange, isDark }){
  const toggle=(t)=>onChange(selectedTimes.includes(t)?selectedTimes.filter((s)=>s!==t):[...selectedTimes,t].sort());
  return (
    <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto pr-0.5">
      {ALL_TIMES.map((t)=>{
        const active=selectedTimes.includes(t);
        const inactiveClass = isDark
          ? 'text-gray-400 border-white/10 hover:border-[#1361b6]/50 hover:bg-[#1361b6]/10'
          : 'text-gray-500 border-gray-200 hover:border-blue-300 hover:bg-blue-50';
        return (
          <button key={t} onClick={()=>toggle(t)}
            className={`text-[10px] font-semibold py-1.5 rounded border transition-all
              ${active?'text-white border-transparent shadow':inactiveClass}`}
            style={active?{background:'linear-gradient(135deg,#1361b6,#2d5db5)'}:{}}>
            {to12h(t)}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Field wrapper ─── */
const Field = ({label, required, children, isDark}) => (
  <div className="space-y-1">
    <Label className={`text-xs font-semibold ${isDark?'text-gray-400':'text-gray-600'}`}>
      {required && <span className={`mr-0.5 ${isDark?'text-red-400':'text-red-500'}`}>*</span>}{label}:
    </Label>
    {children}
  </div>
);

/* ─── Input with icon ─── */
const IconInput = ({icon:Icon, isDark, ...props}) => (
  <div className="relative">
    {Icon && <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDark?'text-gray-500':'text-gray-400'}`}/>}
    <Input {...props}
      className={`${Icon?'pl-8':''} h-9 rounded-lg text-sm ${
        isDark
          ? 'bg-white/5 border-white/10 text-gray-200 placeholder:text-gray-600 focus:border-[#1361b6] focus:ring-1 focus:ring-[#1361b6]/30'
          : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
      }`}/>
  </div>
);

/* ══════════════════════════════════════════
   PROFILE CARD
══════════════════════════════════════════ */
const ProfileCard = ({profile, onUpdate}) => {
  if(!profile) return null;
  const { isDark } = useTheme();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [imagePreview, setImagePreview] = useState(profile.image||null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const {user} = useContext(AuthContext);
  const [availDates, setAvailDates] = useState(()=>parseArr(profile.available_date));
  const [availTimes, setAvailTimes] = useState(()=>parseArr(profile.available_slots));
  const fileInputRef = useRef(null);

  useEffect(()=>{
    setEditedProfile(profile);
    setImagePreview(profile.image||null);
    setAvailDates(parseArr(profile.available_date));
    setAvailTimes(parseArr(profile.available_slots));
  },[profile]);

  const handleImageChange=(e)=>{
    const file=e.target.files[0]; if(!file)return;
    setImageFile(file);
    const reader=new FileReader();
    reader.onloadend=()=>setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave=async()=>{
    setSaving(true);
    try{
      const fd=new FormData();
      fd.append('name',editedProfile.name||'');
      fd.append('specialization',editedProfile.specialization||editedProfile.title||'');
      fd.append('phone',editedProfile.phone||'');
      fd.append('location',editedProfile.location||'');
      fd.append('available_date',JSON.stringify(availDates));
      fd.append('available_slots',JSON.stringify(availTimes));
      if(imageFile) fd.append('image',imageFile);
      await api.put('/api/v1/doctor/',fd,{headers:{'Content-Type':'multipart/form-data'},params:{id:user.id}});
      onUpdate({...editedProfile,image:imagePreview,available_date:availDates,available_slots:availTimes});
      setIsEditModalOpen(false);
    }catch(err){console.error('Failed:',err.response?.data||err.message);}
    finally{setSaving(false);}
  };

  const handleCancel=()=>{
    setEditedProfile(profile); setImagePreview(profile.image||null); setImageFile(null);
    setAvailDates(parseArr(profile.available_date)); setAvailTimes(parseArr(profile.available_slots));
    setIsEditModalOpen(false);
  };

  const openEdit=()=>{
    setEditedProfile(profile); setImagePreview(profile.image||null); setImageFile(null);
    setAvailDates(parseArr(profile.available_date)); setAvailTimes(parseArr(profile.available_slots));
    setIsEditModalOpen(true);
  };

  const initials=profile.name?profile.name.split(' ').map((n)=>n[0]).join('').toUpperCase():'DR';
  const today=new Date(new Date().toDateString());
  const futureDates=[...availDates].filter((d)=>new Date(d+'T00:00:00')>=today).sort();
  const displayDates=futureDates.slice(0,5);
  const displayTimes=[...availTimes].sort();

  // ── Theme tokens ──
  const card = isDark
    ? 'bg-[#1b2a4a]/60 border border-[#1361b6]/40 hover:border-[#1361b6]/60'
    : 'bg-white border border-gray-100 hover:shadow-xl';
  const bannerBg = isDark
    ? 'linear-gradient(135deg,#0d1f3c 0%,#1361b6 60%,#2d5db5 100%)'
    : 'linear-gradient(135deg,#1a3a6e 0%,#2d5db5 60%,#5B7FE8 100%)';
  const avatarBorder = isDark ? '#1b2a4a' : '#fff';
  const avatarRing = isDark ? 'ring-[#1361b6]/40' : 'ring-blue-100';
  const nameColor = isDark ? 'text-white' : 'text-gray-800';
  const divider = isDark ? 'border-white/10' : 'border-gray-100';
  const contactBg = isDark ? 'bg-white/5 border border-white/10' : 'bg-blue-50';
  const contactIconBg = isDark ? 'bg-[#1361b6]/20 border border-[#1361b6]/30' : 'bg-blue-100';
  const contactIconColor = isDark ? 'text-blue-400' : 'text-blue-600';
  const contactText = isDark ? 'text-gray-300' : 'text-gray-700';
  const sectionBorder = isDark ? 'border border-[#1361b6]/40' : 'border border-blue-100';
  const sectionHeaderBg = isDark ? 'bg-[#1361b6]/20 border-b border-[#1361b6]/30' : 'linear-gradient(135deg,#1a3a6e,#2d5db5)';
  const sectionHeaderText = 'text-white';
  const sectionBody = isDark ? 'bg-white/5' : 'bg-gradient-to-br from-blue-50 to-white';
  const tagStyle = isDark
    ? 'text-blue-300 bg-blue-500/20 border border-blue-500/30'
    : 'text-white';
  const tagInlineStyle = isDark ? {} : {background:'linear-gradient(135deg,#2d5db5,#5B7FE8)'};
  const emptyText = isDark ? 'text-gray-500' : 'text-gray-400';
  const moreTag = isDark ? 'bg-white/5 text-gray-500 border border-white/10' : 'bg-gray-100 text-gray-500';

  // Modal tokens
  const modalBg = isDark ? '#0f1e35' : '#fff';
  const modalHeaderBg = isDark
    ? 'linear-gradient(135deg,#0d1f3c 0%,#1361b6 100%)'
    : 'linear-gradient(135deg,#1a3a6e 0%,#2d5db5 100%)';
  const modalBorder = isDark ? 'border border-[#1361b6]/40' : 'border-0';
  const modalBodyDivider = isDark ? 'border-white/10' : 'border-gray-200';
  const modalAvatarRowBg = isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100';
  const modalAvatarBorderDash = isDark ? 'border-white/20 group-hover:border-[#1361b6]/70' : 'border-gray-300 group-hover:border-blue-400';
  const modalAvatarBg = isDark ? 'bg-white/5' : 'bg-white';
  const modalInitialColor = isDark ? 'text-gray-500' : 'text-gray-300';
  const modalSubName = isDark ? 'text-gray-200' : 'text-gray-700';
  const modalSubSpec = isDark ? 'text-gray-500' : 'text-gray-400';
  const modalSectionBorder = isDark ? 'border border-white/10' : 'border border-gray-200';
  const modalSectionHeaderBg = isDark ? 'bg-white/5 border-b border-white/10' : 'bg-gray-50 border-b border-gray-100';
  const modalSectionHeaderText = isDark ? 'text-gray-400' : 'text-gray-600';
  const modalCalBg = isDark ? 'bg-[#0d1a2d]' : 'bg-white';
  const modalTagStyle = isDark
    ? 'text-blue-300 bg-blue-500/20 border border-blue-500/30 cursor-pointer hover:opacity-75 transition'
    : 'text-white cursor-pointer hover:opacity-75 transition';
  const modalTagInline = isDark ? {} : {background:'linear-gradient(135deg,#2d5db5,#5B7FE8)'};
  const footerBg = isDark ? 'bg-white/5' : 'bg-gray-50';
  const cancelBtn = isDark
    ? 'text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-gray-200'
    : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50';

  const SectionHeader = ({icon:Icon, label}) => (
    isDark ? (
      <div className={`px-4 py-2 text-xs font-bold tracking-widest uppercase flex items-center gap-2 ${sectionHeaderBg}`}>
        <Icon className="w-3.5 h-3.5 text-blue-400"/><span className={sectionHeaderText}>{label}</span>
      </div>
    ) : (
      <div className="px-4 py-1.5 text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2"
        style={{background:sectionHeaderBg}}>
        <Icon className="w-3.5 h-3.5"/>{label}
      </div>
    )
  );

  return (
    <>
      {/* ── PROFILE CARD ── */}
      <div className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${card}`}>
        <div className="h-20 w-full" style={{background:bannerBg}}/>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button onClick={()=>setRegisterOpen(true)}
            className="bg-white/10 backdrop-blur-sm p-2 rounded-xl text-white/80 transition-all duration-200 hover:bg-white/20 hover:text-white hover:scale-110 active:scale-95 border border-white/10"
            title="Add User"><UserPlus className="w-4 h-4"/></button>
          <button onClick={openEdit}
            className="bg-white/10 backdrop-blur-sm p-2 rounded-xl text-white/80 transition-all duration-200 hover:bg-white/20 hover:text-white hover:scale-110 active:scale-95 border border-white/10"
            title="Edit Profile"><Edit2 size={16}/></button>
        </div>

        <div className="flex flex-col items-center -mt-12 px-6 pb-6">
          {/* Avatar */}
          <div className="relative mb-3">
            <div className="absolute inset-0 rounded-full blur-lg opacity-40"
              style={{background:'linear-gradient(135deg,#1361b6,#2d5db5)'}}/>
            <Avatar className={`relative w-24 h-24 border-4 shadow-xl ring-2 ${avatarRing}`}
              style={{borderColor:avatarBorder}}>
              <AvatarImage src={profile.image} alt={profile.name} className="object-cover"/>
              <AvatarFallback className="text-2xl font-bold text-white"
                style={{background:'linear-gradient(135deg,#0d1f3c,#1361b6)'}}>
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <h2 className={`text-xl font-bold tracking-tight ${nameColor}`}>{profile.name}</h2>
          <span className="mt-1.5 px-3 py-0.5 rounded-full text-xs font-semibold text-blue-300 bg-blue-500/20 border border-blue-500/30">
            {profile.title||profile.specialization}
          </span>

          <div className={`w-full border-t my-4 ${divider}`}/>

          {/* Contact */}
          <div className="w-full space-y-2">
            {[{Icon:Phone,val:profile.phone},{Icon:MapPin,val:profile.location}].map(({Icon,val},i)=>(
              <div key={i} className={`flex items-center gap-3 rounded-xl px-3 py-2 ${contactBg}`}>
                <div className={`p-1.5 rounded-lg ${contactIconBg}`}>
                  <Icon className={`w-3.5 h-3.5 ${contactIconColor}`}/>
                </div>
                <span className={`text-sm font-medium ${contactText}`}>{val||'—'}</span>
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className={`w-full mt-4 rounded-xl overflow-hidden ${sectionBorder}`}>
            <SectionHeader icon={CalendarDays} label="Available Dates"/>
            <div className={`px-4 py-3 ${sectionBody}`}>
              {displayDates.length===0
                ? <p className={`text-xs text-center py-1 ${emptyText}`}>No upcoming dates</p>
                : <div className="flex flex-wrap gap-1.5">
                    {displayDates.map((d)=>(
                      <span key={d} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagStyle}`} style={tagInlineStyle}>
                        {new Date(d+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}
                      </span>
                    ))}
                    {futureDates.length>5&&(
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${moreTag}`}>
                        +{futureDates.length-5} more
                      </span>
                    )}
                  </div>
              }
            </div>
          </div>

          {/* Times */}
          <div className={`w-full mt-3 rounded-xl overflow-hidden ${sectionBorder}`}>
            <SectionHeader icon={Clock} label="Available Times"/>
            <div className={`px-4 py-3 ${sectionBody}`}>
              {displayTimes.length===0
                ? <p className={`text-xs text-center py-1 ${emptyText}`}>No times set</p>
                : <div className="flex flex-wrap gap-1.5">
                    {displayTimes.map((t)=>(
                      <span key={t} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagStyle}`} style={tagInlineStyle}>
                        {to12h(t)}
                      </span>
                    ))}
                  </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* ══ EDIT MODAL ══ */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent
          className={`sm:max-w-2xl p-0 overflow-hidden rounded-2xl shadow-2xl [&::-webkit-scrollbar]:hidden ${modalBorder}`}
          style={{background:modalBg, scrollbarWidth:'none'}}>

          <div className="flex items-center justify-between px-5 py-3.5"
            style={{background:modalHeaderBg, borderBottom: isDark?'1px solid rgba(255,255,255,0.1)':'1px solid #e5e7eb'}}>
            <h2 className="text-sm font-bold text-white tracking-wide">Edit Profile</h2>
            <button onClick={()=>setIsChangePasswordOpen(true)}
              className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 border border-white/20"
              title="Change Password"><UserLock className="w-4 h-4"/></button>
          </div>

          <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{maxHeight:'75vh',scrollbarWidth:'none'}}>
            <div className="p-5 space-y-4">

              {/* Avatar row */}
              <div className={`flex items-center gap-4 p-3 rounded-xl ${modalAvatarRowBg}`}>
                <div className="relative group cursor-pointer flex-shrink-0" onClick={()=>fileInputRef.current?.click()}>
                  <div className={`w-14 h-14 rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all ${modalAvatarBorderDash} ${modalAvatarBg}`}>
                    {imagePreview
                      ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover"/>
                      : <span className={`text-sm font-black ${modalInitialColor}`}>{initials}</span>
                    }
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#1361b6] p-1 rounded-md border border-[#0d1f3c] shadow">
                    <Camera className="w-2.5 h-2.5 text-white"/>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>
                </div>
                <div>
                  <p className={`text-sm font-bold ${modalSubName}`}>{editedProfile.name||'Doctor'}</p>
                  <p className={`text-xs mt-0.5 ${modalSubSpec}`}>{editedProfile.specialization||'Click avatar to change photo'}</p>
                </div>
              </div>

              {/* Name + Spec */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Full Name" required isDark={isDark}>
                  <IconInput icon={User} isDark={isDark} placeholder="Dr. John Smith"
                    value={editedProfile.name||''}
                    onChange={(e)=>setEditedProfile({...editedProfile,name:e.target.value})}/>
                </Field>
                <Field label="Specialization" isDark={isDark}>
                  <IconInput icon={Stethoscope} isDark={isDark} placeholder="Cardiologist"
                    value={editedProfile.specialization||editedProfile.title||''}
                    onChange={(e)=>setEditedProfile({...editedProfile,specialization:e.target.value,title:e.target.value})}/>
                </Field>
              </div>

              {/* Phone + Location */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Phone" isDark={isDark}>
                  <IconInput icon={Phone} isDark={isDark} placeholder="+91 98765 43210"
                    value={editedProfile.phone||''}
                    onChange={(e)=>setEditedProfile({...editedProfile,phone:e.target.value})}/>
                </Field>
                <Field label="Location" isDark={isDark}>
                  <IconInput icon={MapPin} isDark={isDark} placeholder="Chennai, Tamil Nadu"
                    value={editedProfile.location||''}
                    onChange={(e)=>setEditedProfile({...editedProfile,location:e.target.value})}/>
                </Field>
              </div>

              {/* Calendar + Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-xl overflow-hidden ${modalSectionBorder}`}>
                  <div className={`px-3 py-2 flex items-center gap-1.5 ${modalSectionHeaderBg}`}>
                    <CalendarDays className="w-3.5 h-3.5 text-blue-400"/>
                    <span className={`text-xs font-semibold ${modalSectionHeaderText}`}>Available Dates</span>
                    {availDates.length>0&&(
                      <span className="ml-auto text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full bg-[#1361b6]">{availDates.length}</span>
                    )}
                  </div>
                  <div className={`p-2.5 ${modalCalBg}`}>
                    <MiniCalendar selectedDates={availDates} onChange={setAvailDates} isDark={isDark}/>
                    {availDates.length>0&&(
                      <div className={`mt-2 pt-2 border-t flex flex-wrap gap-1 max-h-16 overflow-y-auto ${isDark?'border-white/10':'border-gray-100'}`}>
                        {[...availDates].sort().map((d)=>(
                          <span key={d} onClick={()=>setAvailDates(availDates.filter((x)=>x!==d))}
                            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${modalTagStyle}`}
                            style={modalTagInline}>
                            {new Date(d+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'})} ✕
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={`rounded-xl overflow-hidden ${modalSectionBorder}`}>
                  <div className={`px-3 py-2 flex items-center gap-1.5 ${modalSectionHeaderBg}`}>
                    <Clock className="w-3.5 h-3.5 text-blue-400"/>
                    <span className={`text-xs font-semibold ${modalSectionHeaderText}`}>Time Slots</span>
                    {availTimes.length>0&&(
                      <span className="ml-auto text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full bg-[#1361b6]">{availTimes.length}</span>
                    )}
                  </div>
                  <div className={`p-2.5 ${modalCalBg}`}>
                    <TimePicker selectedTimes={availTimes} onChange={setAvailTimes} isDark={isDark}/>
                    {availTimes.length>0&&(
                      <div className={`mt-2 pt-2 border-t flex flex-wrap gap-1 max-h-16 overflow-y-auto ${isDark?'border-white/10':'border-gray-100'}`}>
                        {[...availTimes].sort().map((t)=>(
                          <span key={t} onClick={()=>setAvailTimes(availTimes.filter((x)=>x!==t))}
                            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${modalTagStyle}`}
                            style={modalTagInline}>
                            {to12h(t)} ✕
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-end gap-2 px-5 py-3.5 border-t ${footerBg} ${isDark?'border-white/10':'border-gray-200'}`}>
            <button onClick={handleCancel}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${cancelBtn}`}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2 text-sm font-bold text-white rounded-lg shadow transition-all hover:shadow-md hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              style={{background:'linear-gradient(135deg,#0d1f3c,#1361b6)'}}>
              {saving ? (
                <><svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>Saving...</>
              ) : (
                <><Check className="w-3.5 h-3.5"/>Save Changes</>
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent
          className={`sm:max-w-md p-0 overflow-hidden rounded-2xl shadow-2xl ${modalBorder}`}
          style={{background:modalBg}}>
          <div className="flex items-center px-5 py-3.5"
            style={{background:modalHeaderBg, borderBottom: isDark?'1px solid rgba(255,255,255,0.1)':'1px solid #e5e7eb'}}>
            <h2 className="text-sm font-bold text-white tracking-wide">Change Password</h2>
          </div>
          <div className="px-6 py-6">
            <ChangePassword onSuccess={()=>setIsChangePasswordOpen(false)}/>
          </div>
        </DialogContent>
      </Dialog>

      <Register open={registerOpen} onOpenChange={setRegisterOpen}/>
    </>
  );
};

export default ProfileCard;