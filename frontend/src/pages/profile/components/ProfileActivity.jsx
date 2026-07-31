import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

dayjs.extend(relativeTime);

const difficultyColors = {
  Easy: 'bg-success/15 text-success',
  Medium: 'bg-warning/15 text-warning',
  Hard: 'bg-danger/15 text-danger',
};

const statusIcons = {
  Accepted: FiCheckCircle,
  Wrong: FiXCircle,
  Pending: FiClock,
};

const statusColors = {
  Accepted: 'text-success',
  Wrong: 'text-danger',
  Pending: 'text-text-muted',
};

const activities = [
  {
    id: 1,
    problem: 'Two Sum',
    difficulty: 'Easy',
    status: 'Accepted',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: 2,
    problem: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    status: 'Wrong',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 3,
    problem: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    status: 'Accepted',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: 4,
    problem: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    status: 'Pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: 5,
    problem: 'Valid Parentheses',
    difficulty: 'Easy',
    status: 'Accepted',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
];

function ProfileActivity() {
  return (
    <div>
      <h2 className="heading-sm text-primary mb-4">Recent Activity</h2>
      <div className="bg-surface shadow-card rounded-lg overflow-hidden">
        <div className="divide-y divide-border">
          {activities.map((activity) => {
            const StatusIcon = statusIcons[activity.status];
            const statusColor = statusColors[activity.status];
            const diffColor = difficultyColors[activity.difficulty];

            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-background/50"
              >
                <StatusIcon className={`h-5 w-5 flex-shrink-0 ${statusColor}`} />

                <div className="min-w-0 flex-1">
                  <p className="text-text truncate text-sm font-medium">
                    {activity.problem}
                  </p>
                  <p className="text-text-muted mt-0.5 text-xs">
                    {dayjs(activity.timestamp).fromNow()}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${diffColor}`}
                >
                  {activity.difficulty}
                </span>

                <span className="text-text-muted hidden text-xs sm:block">
                  {activity.status}
                </span>
              </div>
            );
          })}
        </div>

        <button className="text-primary w-full cursor-pointer border-t border-border px-4 py-3 text-center text-sm font-medium transition-colors hover:bg-background/50">
          View All Activity →
        </button>
      </div>
    </div>
  );
}

export default ProfileActivity;


