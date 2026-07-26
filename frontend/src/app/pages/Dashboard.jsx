import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../shared/services/dashboardService';
import Loader from '../../shared/ui/Loader';
import Badge from '../../shared/ui/Badge';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardService.getStats,
  });

  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ['dashboard-activity'],
    queryFn: () => dashboardService.getActivity(10),
  });

  const stats = statsData?.data;
  const activities = activityData?.data || [];

  if (statsLoading || activityLoading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text font-heading">Dashboard</h1>
        <p className="text-text-muted mt-2">Track your coding progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Problems Solved" value={stats?.solvedProblems || 0} color="text-success" />
        <StatCard label="Total Submissions" value={stats?.totalSubmissions || 0} color="text-info" />
        <StatCard label="Acceptance Rate" value={`${stats?.acceptanceRate || 0}%`} color="text-primary" />
        <StatCard label="Current Streak" value={`${stats?.currentStreak || 0} days`} color="text-warning" />
      </div>

      {/* Difficulty Breakdown */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Solved by Difficulty</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-500/10 rounded-lg">
            <p className="text-2xl font-bold text-success">{stats?.easySolved || 0}</p>
            <p className="text-sm text-text-muted">Easy</p>
          </div>
          <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
            <p className="text-2xl font-bold text-warning">{stats?.mediumSolved || 0}</p>
            <p className="text-sm text-text-muted">Medium</p>
          </div>
          <div className="text-center p-4 bg-red-500/10 rounded-lg">
            <p className="text-2xl font-bold text-danger">{stats?.hardSolved || 0}</p>
            <p className="text-sm text-text-muted">Hard</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Recent Activity</h2>
        {activities.length === 0 ? (
          <p className="text-text-muted">No recent activity. Start solving problems!</p>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.submissionId}
                className="flex items-center justify-between p-3 bg-background rounded-lg"
              >
                <div>
                  <Link
                    to={`/problems/${activity.problemSlug}`}
                    className="text-text hover:text-primary transition-colors font-medium"
                  >
                    {activity.problemTitle}
                  </Link>
                  <p className="text-xs text-text-muted mt-1">
                    {activity.language} • {new Date(activity.submittedAt).toLocaleString()}
                  </p>
                </div>
                <Badge className={
                  activity.status === 'Accepted' ? 'bg-success' :
                  activity.status === 'WrongAnswer' ? 'bg-danger' : 'bg-warning'
                }>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color = 'text-primary' }) {
  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <p className="text-text-muted text-sm">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}

export default Dashboard;

