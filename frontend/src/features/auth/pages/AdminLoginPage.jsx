// import { Link } from 'react-router-dom';
// import Button from '../../../shared/ui/Button';
// import Card from '../../../shared/ui/Card';


// function AdminLoginPage() {
//   return (
//     <main className="mx-auto max-w-md px-6 py-12">
//       <Card className="space-y-6">
//         <div>
//           <h1 className="heading-lg">Admin Login</h1>
//           <p className="body text-text-muted mt-2">
//             Sign in to manage problems, articles, blogs, and users.
//           </p>
//         </div>

//         <form className="space-y-4">
//           <label className="block space-y-2">
//             <span className="text-sm font-semibold">Admin Email</span>
//             <input
//               className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
//               placeholder="admin@example.com"
//               type="email"
//             />
//           </label>

//           <label className="block space-y-2">
//             <span className="text-sm font-semibold">Password</span>
//             <input
//               className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
//               placeholder="Enter admin password"
//               type="password"
//             />
//           </label>

//           <Button className="w-full" type="submit" variant="secondary">
//             Login as Admin
//           </Button>
//         </form>

//         <p className="text-text-muted text-center text-sm">
//           Wrong option?{' '}
//           <Link className="text-primary font-semibold" to="/login">
//             Choose again
//           </Link>
//         </p>
//       </Card>
//     </main>
//   );
// }

// export default AdminLoginPage;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";
import { loginAdmin } from "../api/authApi";

import {
  validateEmail,
  validatePassword,
} from "../../../shared/utils/validation";

function AdminLoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modalData, setModalData] = useState({
    type: "",
    title: "",
    message: "",
  });

  const openModal = (type, title, message) => {
    setModalData({
      type,
      title,
      message,
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = "";

    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!validateEmail(value)) {
        error = "Enter a valid email address";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        error = "Password is required";
      } else if (!validatePassword(value)) {
        error =
          "Password must contain at least 8 characters with uppercase, lowercase and number";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      validationErrors.password =
        "Password must contain at least 8 characters with uppercase, lowercase and number";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      openModal(
        "error",
        "Login Failed",
        "Please fix the validation errors."
      );

      return;
    }

    try {
      setIsLoading(true);

      const response = await loginAdmin({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("adminToken", response.token);

      if (response.expiresAt) {
        localStorage.setItem("adminTokenExpiresAt", response.expiresAt);
      }

      openModal(
        "success",
        "Login Successful!",
        "Welcome Admin!"
      );

      setFormData({
        email: "",
        password: "",
      });

      setErrors({});
      setShowPassword(false);

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1200);
    } catch (error) {
      openModal(
        "error",
        "Login Failed",
        error.message || "Invalid admin email or password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="flex justify-center">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
                  modalData.type === "success"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500"
                    : "bg-red-500/20 text-red-400 border border-red-500"
                }`}
              >
                {modalData.type === "success" ? "✓" : "!"}
              </div>
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-white">
              {modalData.title}
            </h2>

            <p className="mt-3 text-center text-sm text-slate-400">
              {modalData.message}
            </p>

            <button
              onClick={() => setShowModal(false)}
              className={`mt-6 w-full rounded-lg py-3 font-semibold ${
                modalData.type === "success"
                  ? "bg-emerald-500 text-black"
                  : "bg-red-500 text-white"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-md px-6 py-12">
        <Card className="space-y-6">
          <div>
            <h1 className="heading-lg">Admin Login</h1>

            <p className="body text-text-muted mt-2">
              Sign in to manage problems, articles, blogs and users.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <label className="block space-y-2">
              <span className="text-sm font-semibold">Admin Email</span>

              <input
                className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold">Password</span>

              <div className="relative">
                <input
                  className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 pr-12 outline-none"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter admin password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500"
                >
                  <FaEye size={18} />
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </label>

            <Button
              className="w-full"
              type="submit"
              variant="secondary"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login as Admin"}
            </Button>
          </form>

          <p className="text-text-muted text-center text-sm">
            Wrong option?{" "}
            <Link className="text-primary font-semibold" to="/login">
              Choose again
            </Link>
          </p>
        </Card>
      </main>
    </>
  );
}

export default AdminLoginPage;
