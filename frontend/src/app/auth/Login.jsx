import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../shared/store/authStore';
import AuthLayout from './AuthLayout';
import Input from '../../shared/ui/Input';
import PasswordInput from '../../shared/ui/PasswordInput';
import Button from '../../shared/ui/Button';
import Divider from '../../shared/ui/Divider';
import SuccessModal from '../../shared/ui/SuccessModal';
import { validateEmail, validatePassword } from '../../shared/utils/validation';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading: loading } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'email' && value && !validateEmail(value)) {
      setFormErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
    }
    if (name === 'password' && value && !validatePassword(value)) {
      setFormErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!validateEmail(formData.email)) errors.email = 'Please enter a valid email address';
    if (!validatePassword(formData.password)) errors.password = 'Password must be at least 8 characters';
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  

    try {
      await login(formData.email, formData.password);
      setShowSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      toast.error(msg);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/dashboard');
  };

  return (
    <>
      <SuccessModal
        isOpen={showSuccess}
        title="Login Successful!"
        message="Welcome back to AlgoArena. Happy coding!"
        onClose={handleSuccessClose}
      />
      <AuthLayout title="Welcome Back" subtitle="Login to continue your coding journey.">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            error={formErrors.email}
          />
          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            error={formErrors.password}
          />
          <div className="flex justify-end">
            <button type="button" className="text-sm text-amber-500 hover:underline">
              Forgot Password?
            </button>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Divider className="my-6">OR</Divider>

        <p className="text-center text-slate-400">
          Don't have an account?
          <Link to="/register" className="ml-2 text-amber-500 hover:underline">
            Register
          </Link>
        </p>
      </AuthLayout>
    </>
  );
};

export default Login;

