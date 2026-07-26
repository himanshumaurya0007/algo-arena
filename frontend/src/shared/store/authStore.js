import { create } from "zustand";
import api from "../lib/axios";

const DEMO_MODE = true; // Set to false when backend is running

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      if (DEMO_MODE) {
        // Demo mode - simulate login with local storage
        const registeredUser = JSON.parse(localStorage.getItem("registeredUser") || "null");
        if (!registeredUser) {
          throw new Error("Please Register First");
        }
        if (registeredUser.email !== email) {
          throw new Error("Invalid email address.");
        }
        if (registeredUser.password !== password) {
          throw new Error("Invalid password.");
        }

        const user = {
          id: 1,
          username: registeredUser.name,
          email: registeredUser.email,
          role: "User",
        };
        const accessToken = "demo-token-" + Date.now();
        const refreshToken = "demo-refresh-" + Date.now();

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        set({ user, isAuthenticated: true, isLoading: false });
        return user;
      }

      const response = await api.post("/auth/login", { email, password });
      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed. Please try again.";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      if (DEMO_MODE) {
        // Demo mode - save to local storage
        localStorage.setItem("registeredUser", JSON.stringify({
          name: userData.username || userData.name,
          email: userData.email,
          password: userData.password,
        }));
        localStorage.setItem("isRegistered", "true");

        set({ isLoading: false });
        return { message: "Registration successful" };
      }

      const response = await api.post("/auth/register", userData);
      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed. Please try again.";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      if (refreshToken && !DEMO_MODE) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch {
      // Ignore logout errors
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      set({ user: null, isAuthenticated: false, error: null });
    }
  },

  clearError: () => set({ error: null }),
}));

// Selector helpers for components
export const selectLoading = (state) => state.isLoading;
export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.isAuthenticated;

export default useAuthStore;

