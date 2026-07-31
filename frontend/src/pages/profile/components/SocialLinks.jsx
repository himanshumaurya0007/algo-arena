/**
 * SocialLinks - Step 4 of the profile wizard.
 * Maps to the `social_links` DB table.
 * Fields: github_url, linkedin_url, portfolio_url, leetcode_url.
 */

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiGlobe, FiEdit3 } from 'react-icons/fi';

const socialPlatforms = [
  {
    id: 'github',
    dbField: 'githubUrl',
    label: 'GitHub',
    icon: FiGithub,
    placeholder: 'https://github.com/username',
    iconBg: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    borderFocus: 'hover:border-gray-600 focus:border-gray-600',
  },
  {
    id: 'linkedin',
    dbField: 'linkedinUrl',
    label: 'LinkedIn',
    icon: FiLinkedin,
    placeholder: 'https://linkedin.com/in/username',
    iconBg: 'bg-blue-100 text-blue-600',
    borderFocus: 'hover:border-blue-600 focus:border-blue-600',
  },
  {
    id: 'portfolioWebsite',
    dbField: 'portfolioUrl',
    label: 'Portfolio Website',
    icon: FiGlobe,
    placeholder: 'https://yourwebsite.com',
    iconBg: 'bg-secondary/10 text-secondary',
    borderFocus: 'hover:border-secondary focus:border-secondary',
  },
  {
    id: 'leetcode',
    dbField: 'leetcodeUrl',
    label: 'LeetCode',
    icon: FiEdit3,
    placeholder: 'https://leetcode.com/username',
    iconBg: 'bg-yellow-100 text-yellow-600',
    borderFocus: 'hover:border-yellow-600 focus:border-yellow-600',
  },
];

function SocialLinks({ data, errors, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-text">Social Links</h2>
        <p className="mt-1 text-sm text-text-muted">
          Connect your professional and coding profiles
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          const value = data[platform.id] || '';
          const error = errors[platform.id];

          return (
            <div
              key={platform.id}
              className={`group rounded-xl border bg-surface p-4 shadow-sm transition-all ${
                value ? 'border-secondary/30' : 'border-border hover:shadow-md'
              } ${error ? 'border-danger' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${platform.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="mb-1 block text-xs font-medium text-text">
                    {platform.label}
                  </label>
                  <input
                    type="url"
                    value={value}
                    onChange={(e) => onChange({ ...data, [platform.id]: e.target.value })}
                    placeholder={platform.placeholder}
                    className={`w-full rounded-lg border bg-background px-3 py-1.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:ring-2 ${
                      error
                        ? 'border-danger focus:ring-danger/20'
                        : `border-border ${platform.borderFocus} focus:ring-secondary/20`
                    }`}
                  />
                  {error && (
                    <p className="mt-0.5 text-xs text-danger">{error}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-text-muted">
        All fields are optional. Add links to your professional and coding profiles.
      </p>
    </motion.div>
  );
}

export default SocialLinks;
