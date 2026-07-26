import api from './api';

export const submissionService = {
  create: async (data) => {
    const response = await api.post('/submissions', data);
    return response.data;
  },

  getMine: async () => {
    const response = await api.get('/submissions/mine');
    return response.data;
  },

  getByProblem: async (problemId) => {
    const response = await api.get(`/submissions/problem/${problemId}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/submissions/${id}`);
    return response.data;
  },
};

