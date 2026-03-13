import api from "../../utils/api.js";
import { SignupForm } from "../../components/signup-form.jsx";

export default function Register({ open, onOpenChange }) {
  if (!open) return null;

  const handleRegister = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("role", formData.role || "doctor");
      data.append("name", formData.name);
      data.append("specialization", formData.specialization || "");
      data.append("phone", formData.phone || "");
      data.append("available_date", JSON.stringify(formData.available_date || []));
      data.append("available_slots", JSON.stringify(formData.available_slots || []));
      if (formData.imageFile) data.append("image", formData.imageFile);

      const res = await api.post("/api/v1/admin/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message || "Registration successful");
      onOpenChange(false);
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,12,26,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onOpenChange(false); }}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <SignupForm onSubmit={handleRegister} onCancel={() => onOpenChange(false)} />
      </div>
    </div>
  );
}