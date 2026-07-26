import api from './api';

export const adminService = {
  // Users
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await api.get('/admin/categories');
    return response.data;
  },

  createCategory: async (data) => {
    const response = await api.post('/admin/categories', data);
    return response.data;
  },

  updateCategory: async (id, data) => {
    const response = await api.put(`/admin/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  },

  // Topics
  getTopics: async () => {
    const response = await api.get('/admin/topics');
    return response.data;
  },

  // Problems
  getProblems: async () => {
    const response = await api.get('/admin/problems');
    return response.data;
  },

  createProblem: async (data) => {
    const response = await api.post('/admin/problems', data);
    return response.data;
  },

  updateProblemStatus: async (id, status) => {
    const response = await api.put(`/admin/problems/${id}`, { status });
    return response.data;
  },

  deleteProblem: async (id) => {
    const response = await api.delete(`/admin/problems/${id}`);
    return response.data;
  },
};

