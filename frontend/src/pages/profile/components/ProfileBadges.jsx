import { FiAward, FiStar, FiTarget, FiTrendingUp, FiCode, FiZap } from 'react-icons/fi';

const badges = [
  { id: 1, name: '100 Problems', icon: FiCode, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 2, name: '7-Day Streak', icon: FiZap, color: 'text-warning', bg: 'bg-warning/10' },
  { id: 3, name: 'Top 500', icon: FiAward, color: 'text-secondary', bg: 'bg-secondary/10' },
  { id: 4, name: 'Rising Star', icon: FiStar, color: 'text-info', bg: 'bg-info/10' },
  { id: 5, name: 'Consistent', icon: FiTarget, color: 'text-success', bg: 'bg-success/10' },
  { id: 6, name: 'Improver', icon: FiTrendingUp, color: 'text-danger', bg: 'bg-danger/10' },
];

function ProfileBadges() {
  return (
    <div>
      <h2 className="heading-sm text-primary mb-4">Achievements</h2>
      <div className="bg-surface shadow-card rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className="group flex cursor-pointer flex-col items-center gap-2 rounded-lg p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`${badge.bg} ${badge.color} rounded-full p-3 transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-text-muted text-center text-xs font-medium">
                  {badge.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfileBadges;

