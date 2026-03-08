export const profileData = {
  name: "Dr. Kevin",
  title: "Dental Specialist",
  phone: "+91 9675645385",
  location: "Chennai",
  maxAppointmentsPerDay: 30,
  image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
};

export const appointmentStatsData = {
  total: 20,
  completed: 16,
  cancelled: 3,
  balance: 3,
  completionPercentage: 80
};

export const todayAppointments = [
  { id: 1, time: "10:30 AM", type: "Tooth Implantation Checkup", status: "scheduled" },
  { id: 2, time: "11:00 AM", type: "Tooth Implantation Checkup", status: "scheduled" },
  { id: 3, time: "11:30 AM", type: "Tooth Canaan and tooth checkup", status: "scheduled" },
  { id: 4, time: "12:00 AM", type: "Tooth Canaan and tooth checkup", status: "scheduled" },
  { id: 5, time: "12:50 PM", type: "Regular Check-up", status: "scheduled" },
  { id: 6, time: "02:30 PM", type: "Braceke Alignment", status: "cancelled" },
  { id: 7, time: "03:00 PM", type: "Braceke Alignment", status: "cancelled" },
  { id: 8, time: "04:30 PM", type: "Braceke Alignment", status: "cancelled" },
  { id: 9, time: "05:00 PM", type: "Braceke Alignment", status: "scheduled" },
  { id: 10, time: "05:30 PM", type: "Tooth Canaan and tooth checkup", status: "scheduled" },
  { id: 11, time: "06:00 PM", type: "Braceke Alignment", status: "scheduled" },
  { id: 12, time: "06:30 PM", type: "Tooth Canaan and tooth checkup", status: "scheduled" },
];

export const monthlyAppointmentData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values: [15, 22, 18, 28, 5, 30, 25]
};

export const calendarData = {
  currentMonth: 1, // Fed (0-indexed)
  currentYear: 2026,
  currentDate: 23,
  appointmentDates: [1, 2, 5, 8, 12, 18, 19, 25, 26, 29],
  completedDates: [1, 2, 5, 8, 12, 18, 19]
};