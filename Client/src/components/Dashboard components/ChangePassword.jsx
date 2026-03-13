import { useState, useContext } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import AuthContext from '../../context/AuthContext.jsx';
import api from '../../utils/api.js';

export default function ChangePassword({ onSuccess }) {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [show, setShow] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const toggleShow = (field) => setShow(prev => ({ ...prev, [field]: !prev[field] }));

    const getStrength = (pw) => {
        if (!pw) return 0;
        let score = 0;
        if (pw.length >= 8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    };

    const strength = getStrength(formData.newPassword);
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.newPassword !== formData.confirmPassword)
            return setError('New passwords do not match');
        if (formData.newPassword.length < 8)
            return setError('Password must be at least 8 characters');

        try {
            setLoading(true);
            await api.post('/api/v1/admin/change-password', {
                id: user.id,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });
          
            setSuccess('Password updated successfully');
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => onSuccess?.(), 1500);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: 'currentPassword', label: 'Current Password', icon: KeyRound },
        { name: 'newPassword', label: 'New Password', icon: Lock },
        { name: 'confirmPassword', label: 'Confirm Password', icon: ShieldCheck },
    ];

    return (
        <div className="space-y-5">

            {/* Status banners */}
            {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                </div>
            )}
            {success && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {success}
                </div>
            )}

            {/* Fields */}
            {fields.map(({ name, label, icon: Icon }) => (
                <div key={name} className="space-y-1.5">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" /> {label}
                    </Label>
                    <div className="relative">
                        <Input
                            type={show[name] ? 'text' : 'password'}
                            name={name}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            value={formData[name]}
                            onChange={handleChange}
                            required
                            className="rounded-xl border-gray-200 focus:border-blue-400 h-11 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => toggleShow(name)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                        >
                            {show[name] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Strength bar — only for new password */}
                    {name === 'newPassword' && formData.newPassword && (
                        <div className="space-y-1 pt-1">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map(i => (
                                    <div
                                        key={i}
                                        className="h-1 flex-1 rounded-full transition-all duration-300"
                                        style={{
                                            background: i <= strength ? strengthColor[strength] : '#e5e7eb'
                                        }}
                                    />
                                ))}
                            </div>
                            <p className="text-[11px] font-semibold" style={{ color: strengthColor[strength] }}>
                                {strengthLabel[strength]} password
                            </p>
                        </div>
                    )}
                </div>
            ))}

            {/* Actions */}
            <div className="flex gap-3 pt-1">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => onSuccess?.()}
                    className="flex-1 h-11 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={loading || !!success}
                    className="flex-1 h-11 rounded-xl font-semibold text-white shadow-lg gap-2"
                    style={{ background: 'linear-gradient(135deg, #1a3a6e 0%, #2d5db5 60%, #5B7FE8 100%)' }}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Updating...
                        </span>
                    ) : (
                        <><ShieldCheck className="w-4 h-4" /> Update Password</>
                    )}
                </Button>
            </div>
        </div>
    );
}