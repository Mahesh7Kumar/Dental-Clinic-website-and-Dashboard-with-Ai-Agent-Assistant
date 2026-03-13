import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Select Role</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => navigate('/user/home')} className="w-full">Continue as User</Button>
          <Button onClick={() => navigate('/admin/login')} className="w-full">Continue as Admin</Button>
          <Button onClick={() => navigate('/admin/register')} className="w-full">
            Register as Admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}