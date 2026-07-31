import { FiCode, FiAward, FiZap, FiTrendingUp } from 'react-icons/fi';

const statCards = [
  {
    label: 'Problems Solved',
    value: 142,
    icon: FiCode,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    label: 'Current Rank',
    value: '#247',
    icon: FiAward,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    label: 'Day Streak',
    value: '12',
    icon: FiZap,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    label: 'Submissions',
    value: '386',
    icon: FiTrendingUp,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

function ProfileStats() {
  return (
    <div>
      <h2 className="heading-sm text-primary mb-4">Statistics</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-surface shadow-card rounded-lg p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className={`${stat.bgColor} ${stat.color} rounded-lg p-2.5`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-text-muted mt-1 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileStats;

