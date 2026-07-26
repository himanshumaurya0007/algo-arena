import api from './api';

export const problemService = {
  getAll: async (params = {}) => {
    const response = await api.get('/problems', { params });
    return response.data;
  },

  getBySlug: async (slug) => {
    const response = await api.get(`/problems/${slug}`);
    return response.data;
  },
};

