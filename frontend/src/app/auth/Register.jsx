import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../shared/store/authStore';
import AuthLayout from './AuthLayout';
import Input from '../../shared/ui/Input';
import PasswordInput from '../../shared/ui/PasswordInput';
import Button from '../../shared/ui/Button';
import Divider from '../../shared/ui/Divider';
import SuccessModal from '../../shared/ui/SuccessModal';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../../shared/utils/validation';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading: loading } = useAuthStore();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Live Validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    let error = '';

    switch (name) {
      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (!validateUsername(value)) {
          error =
            'Username must be 3-20 characters and can contain letters, numbers, and underscores (_)';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value.trim()) {
          error = 'Password is required';
        } else if (!validatePassword(value)) {
          error =
            'Password must be at least 8 characters with uppercase, lowercase, and a number';
        }
        break;

      case 'confirmPassword':
        if (!value.trim()) {
          error = 'Confirm Password is required';
        } else if (value !== updatedFormData.password) {
          error = 'Passwords do not match';
        }
        break;

      default:
        break;
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
      ...(name === 'password' && {
        confirmPassword:
          updatedFormData.confirmPassword &&
          updatedFormData.confirmPassword !== value
            ? 'Passwords do not match'
            : '',
      }),
    }));
  };

  // Final Validation on Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (!validateUsername(formData.username)) {
      errors.username =
        'Username must be 3-20 characters and can contain letters, numbers, and underscores (_)';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password =
        'Password must be at least 8 characters with uppercase, lowercase, and a number';
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setShowSuccess(true);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Registration failed';

      toast.error(msg);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/login');
  };

  return (
    <>
      <SuccessModal
        isOpen={showSuccess}
        title="Registration Successful!"
        message="Your account has been created successfully. Please login to continue."
        onClose={handleSuccessClose}
      />
      <AuthLayout
        title="Create Account"
        subtitle="Join AlgoArena today."
      >
        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe"
            error={formErrors.username}
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
          <Link
            to="/login"
            className="ml-2 text-amber-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </AuthLayout>
    </>
  );
};

export default Register;
