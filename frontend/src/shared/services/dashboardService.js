import api from './api';

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  getActivity: async (count = 10) => {
    const response = await api.get('/dashboard/activity', { params: { count } });
    return response.data;
  },
};

