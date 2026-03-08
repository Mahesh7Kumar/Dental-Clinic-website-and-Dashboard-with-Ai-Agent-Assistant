import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import UserLayout from './layouts/UserLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import RoleSelection from './components/RoleSelection.jsx';
import Home from './pages/User/Home.jsx';
import Services from './pages/User/Services.jsx';
import About from './pages/User/About.jsx';
import Contact from './pages/User/Contact.jsx';
import Login from './pages/Admin/Login.jsx';
import Register from './pages/Admin/Register.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import Appointments from './pages/Admin/Appointments.jsx';
import DoctorSettings from './pages/Admin/DoctorSettings.jsx';
import AISettings from './pages/Admin/AISettings.jsx';
import Leads from './pages/Admin/Leads.jsx';
import WebsiteEditor from './pages/Admin/WebsiteEditor.jsx';
import Blog from './pages/User/Blog.jsx';
import LaserRootCanal from './components/LaserRootCanal.jsx';
import DentalImplants from './components/DentalImplants.jsx';
import DentalBraces from './components/DentalBraces.jsx';
import DashboardPage from './pages/Admin/Dashboardpage.jsx';

const App = () => {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" element={<RoleSelection />} /> */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/user/services" element={<Services />} />
            <Route path='/user/laser-root-canal' element={<LaserRootCanal />} />
            <Route path='/user/dental-implants' element={<DentalImplants />} />
            <Route path='/user/dental-braces' element={<DentalBraces />} />
            <Route path="/user/about" element={<About />} />
            <Route path="/user/blog" element={<Blog />} />
            <Route path="/user/contact" element={<Contact />} />
          </Route>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path='/admin/dashboardpage' element={<DashboardPage />} />
            <Route path="/admin/appointments" element={<Appointments />} />
            <Route path="/admin/doctor-settings" element={<DoctorSettings />} />
            <Route path="/admin/ai-settings" element={<AISettings />} />
            <Route path="/admin/leads" element={<Leads />} />
            <Route path="/admin/website-editor" element={<WebsiteEditor />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;