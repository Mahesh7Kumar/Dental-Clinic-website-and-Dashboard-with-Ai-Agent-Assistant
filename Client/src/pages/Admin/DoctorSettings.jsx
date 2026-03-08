import { useState, useEffect } from 'react';
import api from '../../utils/api.js';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function DoctorSettings() {
  const [doctor, setDoctor] = useState({ name: '', specialization: '', phone: '', image: '', about: '', available_days: [], available_slots: [], max_appointments_per_day: 0, consultation_fee: 0 });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await api.get('/api/v1/doctor');
        setDoctor(res.data);
      } catch (err) {
        console.error("Fetch doctor failed:", err.response?.data || err.message);
      }
    };
    fetchDoctor();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", doctor.name);
      formData.append("specialization", doctor.specialization);
      formData.append("phone", doctor.phone);
      formData.append("location", doctor.location);
      formData.append("max_appointments_per_day", doctor.max_appointments_per_day);
      // ✅ Convert arrays to JSON strings
      formData.append("available_days", JSON.stringify(doctor.available_days));
      formData.append("available_slots", JSON.stringify(doctor.available_slots));

      // ✅ image only if selected
      if (doctor.image instanceof File) {
        formData.append("image", doctor.image);
      }

      const response = await api.put("/api/v1/doctor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Doctor profile updated successfully");

    } catch (error) {
      console.error("SERVER ERROR:", error.response?.data || error.message);
    }
  };



  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Doctor Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Name" value={doctor.name} onChange={(e) => setDoctor({ ...doctor, name: e.target.value })} />
        <Input placeholder="Specialization" value={doctor.specialization} onChange={(e) => setDoctor({ ...doctor, specialization: e.target.value })} />
        <Input placeholder="Phone" value={doctor.phone} onChange={(e) => setDoctor({ ...doctor, phone: e.target.value })} />
        <Input placeholder="Location" value={doctor.location} onChange={(e) => setDoctor({ ...doctor, location: e.target.value })} />
      
        <Input
          type="file"
          onChange={(e) => setDoctor({ ...doctor, image: e.target.files[0] })}
        />
        <Input placeholder="Available Days" value={doctor.available_days.join(', ')} onChange={(e) =>
          setDoctor({
            ...doctor,
            available_days: e.target.value
              .split(",")
              .map(day => day.trim())
          })
        }
        />
        <Input placeholder="Available Slots" value={doctor.available_slots.join(', ')} onChange={(e) =>
          setDoctor({
            ...doctor,
            available_slots: e.target.value
              .split(",")
              .map(slot => slot.trim())
          })
        }
        />
        <Input placeholder="Max Appointments Per Day" type="number" value={doctor.max_appointments_per_day} onChange={(e) => setDoctor({ ...doctor, max_appointments_per_day: Number(e.target.value) })} />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}