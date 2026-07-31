/**
 * ProfessionalDetails - Step 3 of the profile wizard.
 * Maps to the `professional_details` DB table.
 * Only field: experience_level ENUM('STUDENT','FRESHER','INTERN','JUNIOR','MID_LEVEL','SENIOR').
 */

import { motion } from 'framer-motion';

const EXPERIENCE_LEVELS = [
  {
    value: 'STUDENT',
    label: 'Student',
    description: 'Currently enrolled in a college or university',
  },
  {
    value: 'FRESHER',
    label: 'Fresher',
    description: 'Recently graduated, no prior work experience',
  },
  {
    value: 'INTERN',
    label: 'Intern',
    description: 'Currently doing or completed an internship',
  },
  {
    value: 'JUNIOR',
    label: 'Junior',
    description: '0–2 years of professional experience',
  },
  {
    value: 'MID_LEVEL',
    label: 'Mid-Level',
    description: '2–5 years of professional experience',
  },
  {
    value: 'SENIOR',
    label: 'Senior',
    description: '5+ years of professional experience',
  },
];

function ProfessionalDetails({ data, errors, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-xl font-bold text-text">Professional Details</h2>
        <p className="mt-1 text-sm text-text-muted">Select your current experience level</p>
      </div>

      {/* Experience Level Selection */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text">
          Experience Level <span className="text-danger">*</span>
        </label>

        {errors.experienceLevel && (
          <p className="mb-3 text-xs text-danger">{errors.experienceLevel}</p>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE_LEVELS.map((level) => {
            const isSelected = data.experienceLevel === level.value;
            return (
              <button
                key={level.value}
                type="button"
                onClick={() => onChange({ ...data, experienceLevel: level.value })}
                className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-secondary bg-secondary/10 shadow-sm ring-2 ring-secondary/20'
                    : 'border-border bg-surface hover:border-secondary/40 hover:bg-secondary/5'
                } ${errors.experienceLevel ? 'border-danger/50' : ''}`}
              >
                <span
                  className={`text-sm font-semibold ${
                    isSelected ? 'text-secondary' : 'text-text'
                  }`}
                >
                  {level.label}
                </span>
                <span className="mt-1 text-xs text-text-muted leading-snug">
                  {level.description}
                </span>
                {isSelected && (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white">
                    ✓ Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default ProfessionalDetails;
