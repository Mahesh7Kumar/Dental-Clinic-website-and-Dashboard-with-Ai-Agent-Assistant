import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function DoctorCard({ doctor }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{doctor.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={doctor.image} alt={doctor.name} className="w-full h-32 object-cover" />
        <p>{doctor.specialization}</p>
      </CardContent>
    </Card>
  );
}