import { FiCalendar, FiMapPin, FiLink, FiTwitter } from 'react-icons/fi';

function ProfileHeader({ user }) {
  return (
    <div className="bg-surface shadow-card rounded-lg p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="relative">
          <div className="ring-secondary h-24 w-24 overflow-hidden rounded-full ring-4">
            <img
              src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=algoarena'}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
          <span
            className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white ${
              user.isOnline ? 'bg-success' : 'bg-text-muted'
            }`}
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="heading-sm text-primary">{user.name}</h1>
          <p className="text-text-muted mt-1">@{user.username}</p>
          {user.bio && <p className="body text-text mt-3 max-w-xl">{user.bio}</p>}

          {/* Meta Info */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted sm:justify-start">
            {user.location && (
              <span className="flex items-center gap-1.5">
                <FiMapPin className="h-4 w-4" />
                {user.location}
              </span>
            )}
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                <FiLink className="h-4 w-4" />
                {new URL(user.website).hostname}
              </a>
            )}
            {user.twitter && (
              <a
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                <FiTwitter className="h-4 w-4" />
                @{user.twitter}
              </a>
            )}
            {user.joinDate && (
              <span className="flex items-center gap-1.5">
                <FiCalendar className="h-4 w-4" />
                Joined {user.joinDate}
              </span>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="bg-secondary cursor-pointer rounded-md px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:opacity-90">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;

