/**
 * ProfileOverview - Public / Showcase view for the AlgoArena User Profile.
 * Displays Necessary Details, Education Details, Professional Details, and Social Media Links.
 */

import { motion } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiBookOpen,
  FiGlobe,
  FiAward,
  FiCode,
  FiExternalLink,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiEdit3,
  FiLayers,
} from 'react-icons/fi';

const socialIconMap = {
  github: { label: 'GitHub', icon: FiGithub, color: 'hover:text-gray-900 border-gray-700/30 bg-gray-500/10' },
  linkedin: { label: 'LinkedIn', icon: FiLinkedin, color: 'hover:text-blue-500 border-blue-500/30 bg-blue-500/10' },
  portfolioWebsite: { label: 'Portfolio', icon: FiGlobe, color: 'hover:text-secondary border-secondary/30 bg-secondary/10' },
  leetcode: { label: 'LeetCode', icon: FiEdit3, color: 'hover:text-amber-500 border-amber-500/30 bg-amber-500/10' },
  codechef: { label: 'CodeChef', icon: FiEdit3, color: 'hover:text-amber-700 border-amber-700/30 bg-amber-700/10' },
  codeforces: { label: 'Codeforces', icon: FiEdit3, color: 'hover:text-red-500 border-red-500/30 bg-red-500/10' },
  hackerrank: { label: 'HackerRank', icon: FiEdit3, color: 'hover:text-emerald-500 border-emerald-500/30 bg-emerald-500/10' },
  geeksforgeeks: { label: 'GeeksforGeeks', icon: FiEdit3, color: 'hover:text-green-500 border-green-500/30 bg-green-500/10' },
  twitter: { label: 'Twitter / X', icon: FiTwitter, color: 'hover:text-sky-400 border-sky-400/30 bg-sky-400/10' },
  instagram: { label: 'Instagram', icon: FiInstagram, color: 'hover:text-pink-500 border-pink-500/30 bg-pink-500/10' },
  youtube: { label: 'YouTube', icon: FiYoutube, color: 'hover:text-red-600 border-red-600/30 bg-red-600/10' },
  medium: { label: 'Medium', icon: FiEdit3, color: 'hover:text-slate-300 border-slate-500/30 bg-slate-500/10' },
  devto: { label: 'Dev.to', icon: FiEdit3, color: 'hover:text-slate-200 border-slate-600/30 bg-slate-600/10' },
  personalBlog: { label: 'Personal Blog', icon: FiGlobe, color: 'hover:text-secondary border-secondary/30 bg-secondary/10' },
};

function ProfileOverview({ data, onEditClick }) {
  if (!data) return null;

  const fullName = `${data.firstName || ''} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName || ''}`.trim() || data.username;
  const avatarUrl = data.profilePicture?.preview || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`;
  const coverUrl = data.coverImage?.preview || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

  // Active social links filter
  const activeSocials = Object.entries(socialIconMap).filter(
    ([key]) => data[key] && data[key].trim() !== ''
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Hero Cover & Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
        {/* Cover Image Banner */}
        <div className="h-44 w-full overflow-hidden bg-gradient-to-r from-secondary/30 via-indigo-900/30 to-purple-900/30 sm:h-56">
          <img
            src={coverUrl}
            alt="Cover"
            className="h-full w-full object-cover opacity-80"
          />
        </div>

        {/* Profile Avatar & Primary Info */}
        <div className="relative px-6 pb-8 pt-0 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end">
              {/* Profile Avatar */}
              <div className="-mt-16 relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-surface bg-surface shadow-xl ring-4 ring-secondary/20 sm:-mt-20 sm:h-36 sm:w-36">
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Title & Username */}
              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{fullName}</h1>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                    <FiCheckCircle className="h-3.5 w-3.5" /> Verified Developer
                  </span>
                </div>

                <p className="mt-1 text-sm font-semibold text-secondary">
                  @{data.username} • {data.currentRole || 'Software Developer'}
                </p>

                {data.portfolioTagline && (
                  <p className="mt-2 text-xs italic text-text-muted max-w-xl">
                    "{data.portfolioTagline}"
                  </p>
                )}
              </div>
            </div>

            {/* Edit Profile Quick Action Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onEditClick}
                className="flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-secondary/25 transition-all hover:bg-secondary/90 hover:shadow-xl"
              >
                <FiEdit3 className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Info Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/60 pt-5 text-xs text-text-muted">
            {data.city && data.country && (
              <span className="flex items-center gap-1.5 font-medium">
                <FiMapPin className="h-4 w-4 text-secondary" />
                {data.city}, {data.state ? `${data.state}, ` : ''}{data.country} {data.pincode ? `(${data.pincode})` : ''}
              </span>
            )}

            {data.email && (
              <span className="flex items-center gap-1.5 font-medium">
                <FiMail className="h-4 w-4 text-secondary" />
                {data.email}
              </span>
            )}

            {data.phoneNumber && (
              <span className="flex items-center gap-1.5 font-medium">
                <FiPhone className="h-4 w-4 text-secondary" />
                {data.phoneNumber}
              </span>
            )}

            {data.experienceLevel && (
              <span className="flex items-center gap-1.5 font-medium rounded-full bg-secondary/10 px-2.5 py-0.5 text-secondary">
                <FiAward className="h-3.5 w-3.5" />
                {data.experienceLevel} Level
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid Section 1: Necessary Details & Social Links */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Necessary / Personal Details Card */}
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8 lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <FiUser className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">Necessary & Personal Details</h2>
              <p className="text-xs text-text-muted">Basic bio, contact, and preferences</p>
            </div>
          </div>

          {/* Bio */}
          {data.bio && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                About / Bio
              </h3>
              <p className="text-sm leading-relaxed text-text bg-background/50 p-4 rounded-2xl border border-border/40">
                {data.bio}
              </p>
            </div>
          )}

          {/* Key Attributes */}
          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div className="rounded-2xl bg-background p-3.5 border border-border/40">
              <span className="text-text-muted font-medium">Gender:</span>
              <p className="mt-0.5 text-sm font-semibold capitalize text-text">{data.gender || 'N/A'}</p>
            </div>

            <div className="rounded-2xl bg-background p-3.5 border border-border/40">
              <span className="text-text-muted font-medium">Date of Birth:</span>
              <p className="mt-0.5 text-sm font-semibold text-text">{data.dateOfBirth || 'N/A'}</p>
            </div>

            <div className="rounded-2xl bg-background p-3.5 border border-border/40">
              <span className="text-text-muted font-medium">Current Role:</span>
              <p className="mt-0.5 text-sm font-semibold text-text">{data.currentRole || 'N/A'}</p>
            </div>

            <div className="rounded-2xl bg-background p-3.5 border border-border/40">
              <span className="text-text-muted font-medium">Experience Level:</span>
              <p className="mt-0.5 text-sm font-semibold text-text">{data.experienceLevel || 'N/A'}</p>
            </div>
          </div>

          {/* Preferred Programming Languages */}
          {data.preferredProgrammingLanguage?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                Preferred Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.preferredProgrammingLanguage.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary border border-secondary/20"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {data.interests?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                Interests & Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-background px-3 py-1 text-xs font-medium text-text-muted border border-border"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Social Media Links Card */}
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8 lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <FiGlobe className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">Social Media & Coding Links</h2>
              <p className="text-xs text-text-muted">Connected online profiles</p>
            </div>
          </div>

          {activeSocials.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {activeSocials.map(([key, config]) => {
                const Icon = config.icon;
                const url = data[key];

                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between rounded-2xl border p-3 transition-all ${config.color}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs font-bold truncate text-text">{config.label}</span>
                    </div>
                    <FiExternalLink className="h-3.5 w-3.5 text-text-muted opacity-60 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-text-muted">
              No social links connected yet. Click Edit Profile to add GitHub, LinkedIn, LeetCode, etc.
            </div>
          )}
        </div>
      </div>

      {/* Grid Section 2: Education Details & Professional Experience */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Education Details Card */}
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8 lg:col-span-6 space-y-5">
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <FiBookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">Education Details</h2>
              <p className="text-xs text-text-muted">Academic background & qualifications</p>
            </div>
          </div>

          {data.education && data.education.length > 0 ? (
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="relative rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur-sm space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-text">
                        {edu.degree} in {edu.branch}
                      </h3>
                      <p className="text-xs font-semibold text-secondary">{edu.collegeName}</p>
                    </div>
                    <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                      {edu.startYear} - {edu.passingYear || edu.endYear}
                    </span>
                  </div>

                  {edu.specialization && (
                    <p className="text-xs text-text-muted">
                      <span className="font-semibold text-text">Specialization:</span> {edu.specialization}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-xs text-text-muted pt-1">
                    {edu.cgpa && (
                      <span className="font-semibold text-emerald-400">
                        CGPA: {edu.cgpa} / 10
                      </span>
                    )}
                    {edu.percentage && <span>Percentage: {edu.percentage}%</span>}
                  </div>

                  {edu.achievements && (
                    <p className="mt-2 text-xs bg-surface p-2.5 rounded-xl border border-border/40 text-text-muted">
                      🏆 <span className="font-semibold text-text">Achievements:</span> {edu.achievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-text-muted">
              No education entries added yet.
            </div>
          )}
        </div>

        {/* Professional Work Experience Card */}
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8 lg:col-span-6 space-y-5">
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiBriefcase className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">Professional Experience</h2>
              <p className="text-xs text-text-muted">Work history & technical roles</p>
            </div>
          </div>

          {data.experience && data.experience.length > 0 ? (
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  className="rounded-2xl border border-border/60 bg-background/60 p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-text">{exp.jobTitle}</h3>
                      <p className="text-xs font-semibold text-secondary">{exp.companyName}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                      {exp.isCurrentWorking ? 'Present' : exp.endingDate || 'Completed'}
                    </span>
                  </div>

                  {/* Skills used */}
                  {exp.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-text-muted border border-border/50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-text-muted">
              No professional experience added yet.
            </div>
          )}
        </div>
      </div>

      {/* Grid Section 3: Projects & Tech Skills Matrix */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Projects Showcase */}
        {data.projects?.length > 0 && (
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8 lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <FiCode className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text">Featured Projects</h2>
                <p className="text-xs text-text-muted">Highlighted technical work</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="flex flex-col justify-between rounded-2xl border border-border/60 bg-background/60 p-4 space-y-3"
                >
                  <div>
                    <h3 className="text-sm font-bold text-text">{proj.projectName}</h3>
                    <p className="mt-1 text-xs text-text-muted line-clamp-3">{proj.description}</p>
                  </div>

                  {proj.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((t) => (
                        <span key={t} className="rounded bg-surface px-2 py-0.5 text-[10px] text-secondary">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2 border-t border-border/40 text-xs">
                    {proj.githubLink && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-semibold text-text hover:text-secondary"
                      >
                        <FiGithub className="h-3.5 w-3.5" /> Code
                      </a>
                    )}
                    {proj.liveDemoLink && (
                      <a
                        href={proj.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-semibold text-secondary hover:underline"
                      >
                        <FiExternalLink className="h-3.5 w-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Job Preferences */}
        <div className={`rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8 space-y-5 ${data.projects?.length > 0 ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
              <FiLayers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">Skills & Career Preferences</h2>
              <p className="text-xs text-text-muted">Target roles & tech stack</p>
            </div>
          </div>

          {/* Programming Languages */}
          {data.programmingLanguages?.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-2">
                Languages
              </span>
              <div className="flex flex-wrap gap-1.5">
                {data.programmingLanguages.map((l) => (
                  <span key={l} className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Frameworks */}
          {data.frameworks?.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-2">
                Frameworks
              </span>
              <div className="flex flex-wrap gap-1.5">
                {data.frameworks.map((f) => (
                  <span key={f} className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-text-muted border border-border">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Job Expectations */}
          <div className="rounded-2xl bg-background p-4 border border-border/50 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">Target Role:</span>
              <span className="font-bold text-text">{data.expectedJobRole || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Preferred Location:</span>
              <span className="font-semibold text-text">{data.preferredWorkLocation || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Salary Expectation:</span>
              <span className="font-semibold text-emerald-400">{data.salaryExpectation || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Open to Relocation:</span>
              <span className="font-semibold text-text">{data.openToRelocation || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileOverview;

