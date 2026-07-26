import api from './api';

export const profileService = {
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  update: async (data) => {
    const response = await api.put('/profile', data);
    return response.data;
  },

  getEducation: async () => {
    const response = await api.get('/profile/education');
    return response.data;
  },

  addEducation: async (data) => {
    const response = await api.post('/profile/education', data);
    return response.data;
  },

  updateEducation: async (id, data) => {
    const response = await api.put(`/profile/education/${id}`, data);
    return response.data;
  },

  deleteEducation: async (id) => {
    const response = await api.delete(`/profile/education/${id}`);
    return response.data;
  },

  getProfessional: async () => {
    const response = await api.get('/profile/professional');
    return response.data;
  },

  updateProfessional: async (data) => {
    const response = await api.put('/profile/professional', data);
    return response.data;
  },

  getSocialLinks: async () => {
    const response = await api.get('/profile/social-links');
    return response.data;
  },

  updateSocialLinks: async (data) => {
    const response = await api.put('/profile/social-links', data);
    return response.data;
  },
};

