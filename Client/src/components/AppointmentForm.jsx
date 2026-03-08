import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select } from './ui/select';
import { Textarea } from './ui/textarea';
import api from '../utils/api.js';

const AppointmentForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_phone: '',
    patient_email: '',
    date: '',
    time: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/v1/appointments', formData);
      onSuccess();
    } catch (error) {
      console.error('Appointment error:', error);
    }
  };

  const featchavailableslots = async () => {
    try {
      const response = await api.get(`/api/v1/appointments/slots`)
      console.log("1234",response)
    } catch (error) {

    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <Input
        name="patient_name"
        placeholder="Name"
        onChange={handleChange}
        required
      />

      <Input
        name="patient_phone"
        placeholder="Phone Number"
        onChange={handleChange}
        required
      />

      <Input
        name="patient_email"
        placeholder="Email"
        onChange={handleChange}
      />

      <Input
        name="date"
        type="date"
        onChange={handleChange}
        required
      />

      <Input
        name="time"
        type="time"
        onChange={handleChange}
        required
      />

      <Button type="submit">Book Appointment</Button>
    </form>
  );
}

export default AppointmentForm;
