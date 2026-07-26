import { useState, useEffect } from 'react';
import { dashboardService } from '../../../shared/services/dashboardService';
import Loader from '../../../shared/ui/Loader';
import { FiUsers, FiTerminal, FiFileText, FiFolder } from 'react-icons/fi';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: FiUsers },
    { label: 'Total Problems', value: stats?.totalProblems || 0, icon: FiTerminal },
    { label: 'Total Submissions', value: stats?.totalSubmissions || 0, icon: FiFileText },
    { label: 'Total Categories', value: stats?.totalCategories || 0, icon: FiFolder },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text font-heading mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-surface rounded-lg border border-border p-6"
          >
            <div className="text-2xl mb-2">
              <card.icon />
            </div>
            <p className="text-3xl font-bold text-text">{card.value}</p>
            <p className="text-text-muted text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
