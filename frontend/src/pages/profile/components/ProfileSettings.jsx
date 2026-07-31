import { FiLock, FiBell, FiEye, FiLogOut } from 'react-icons/fi';
import Button from '../../../shared/ui/Button';

const settingsSections = [
  {
    id: 'password',
    label: 'Change Password',
    description: 'Update your account password',
    icon: FiLock,
  },
  {
    id: 'notifications',
    label: 'Notification Preferences',
    description: 'Manage email and push notifications',
    icon: FiBell,
  },
  {
    id: 'theme',
    label: 'Appearance',
    description: 'Toggle dark mode, font size, and layout',
    icon: FiEye,
  },
];

function ProfileSettings() {
  return (
    <div>
      <h2 className="heading-sm text-primary mb-4">Account Settings</h2>
      <div className="bg-surface shadow-card rounded-lg divide-y divide-border">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              className="flex w-full cursor-pointer items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-background/50"
            >
              <div className="bg-background text-primary rounded-lg p-2.5">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text">{section.label}</p>
                <p className="text-text-muted text-xs">{section.description}</p>
              </div>
              <span className="text-text-muted text-sm">→</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          variant="outline"
          className="flex items-center gap-2 !text-danger !border-danger hover:!bg-danger hover:!text-white"
        >
          <FiLogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default ProfileSettings;

