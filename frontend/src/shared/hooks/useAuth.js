import { useState } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "../services/authService";


const useAuth = () => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);



  // LOGIN
  const login = async (data) => {

    try {

      setLoading(true);
      setError(null);


      const response = await loginUser(data);


      // Store user data
      if (response.user) {

        setUser(response.user);

        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );

      }


      // Store JWT token
      if (response.token) {

        localStorage.setItem(
          "token",
          response.token
        );

      }


      return response;


    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed";


      setError(message);

      return null;


    } finally {

      setLoading(false);

    }

  };





  // REGISTER
  const register = async (data) => {

    try {

      setLoading(true);
      setError(null);


      const response = await registerUser(data);


      return response;


    } catch (err) {


      const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed";


      setError(message);


      return null;


    } finally {

      setLoading(false);

    }

  };





  // LOGOUT
  const logout = () => {

    logoutUser();


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    setUser(null);

  };





  return {

    user,

    loading,

    error,

    login,

    register,

    logout,

  };

};


export default useAuth;