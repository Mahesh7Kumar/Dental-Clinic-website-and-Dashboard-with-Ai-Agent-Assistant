import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { LoginForm } from "../../components/login-form.jsx"
import { useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import Rectangle from "../../assets/Rectangle.png"

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    loginUser(email, password);   // 👈 your existing logic reused
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative h-[50dvh] overflow-hidden">
      <img
        src={Rectangle}
        alt="Contact"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="w-96 bg-gray-400/40 backdrop-blur-sm border-2 border-amber-50 rounded-lg p-8 shadow-lg space-y-6">
        <CircleArrowLeft onClick={() => navigate("/")} />
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
