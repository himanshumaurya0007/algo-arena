import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../shared/store/authStore';
import AuthLayout from './AuthLayout';
import Input from '../../shared/ui/Input';
import PasswordInput from '../../shared/ui/PasswordInput';
import Button from '../../shared/ui/Button';
import Divider from '../../shared/ui/Divider';
import { validateEmail, validatePassword } from '../../shared/utils/validation';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading: loading } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!validateEmail(formData.email)) errors.email = 'Please enter a valid email address';
    if (!validatePassword(formData.password)) errors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await register({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      toast.error(msg);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join AlgoArena today.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          error={formErrors.name}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@gmail.com"
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
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          error={formErrors.confirmPassword}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </Button>
      </form>

      <Divider className="my-6">OR</Divider>

      <p className="text-center text-slate-400">
        Already have an account?
        <Link to="/login" className="ml-2 text-amber-500 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;

