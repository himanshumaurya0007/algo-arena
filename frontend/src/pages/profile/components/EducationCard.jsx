/**
 * EducationCard - Single education entry with expand/collapse.
 * Used within EducationDetails component.
 */

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiTrash2, FiBook } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function EducationCard({ education, index, onChange, onDelete, errors }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (field, value) => {
    onChange(index, { ...education, [field]: value });
  };

  const eduErrors = errors?.educationErrors?.[index] || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all hover:shadow-md"
    >
      {/* Card Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-background/50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
          <FiBook className="h-5 w-5 text-secondary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-text">
            {education.collegeName || `Education #${index + 1}`}
          </p>
          <p className="text-xs text-text-muted">
            {education.degree || 'No degree specified'}
            {education.branch ? ` - ${education.branch}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">
            {index + 1}/{/* total count displayed elsewhere */}
          </span>
          {isExpanded ? (
            <FiChevronUp className="h-4 w-4 text-text-muted" />
          ) : (
            <FiChevronDown className="h-4 w-4 text-text-muted" />
          )}
        </div>
      </button>

      {/* Card Body */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-border px-5 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* College Name */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">
                    College Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={education.collegeName || ''}
                    onChange={(e) => handleChange('collegeName', e.target.value)}
                    placeholder="e.g., Stanford University"
                    className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:ring-2 ${
                      eduErrors.collegeName
                        ? 'border-danger focus:ring-danger/20'
                        : 'border-border focus:border-secondary focus:ring-secondary/20'
                    }`}
                  />
                  {eduErrors.collegeName && (
                    <p className="mt-1 text-xs text-danger">{eduErrors.collegeName}</p>
                  )}
                </div>

                {/* University */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">University</label>
                  <input
                    type="text"
                    value={education.university || ''}
                    onChange={(e) => handleChange('university', e.target.value)}
                    placeholder="University name"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                {/* Degree */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">
                    Degree <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={education.degree || ''}
                    onChange={(e) => handleChange('degree', e.target.value)}
                    placeholder="e.g., Bachelor of Science"
                    className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:ring-2 ${
                      eduErrors.degree
                        ? 'border-danger focus:ring-danger/20'
                        : 'border-border focus:border-secondary focus:ring-secondary/20'
                    }`}
                  />
                  {eduErrors.degree && (
                    <p className="mt-1 text-xs text-danger">{eduErrors.degree}</p>
                  )}
                </div>

                {/* Branch */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">
                    Branch <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={education.branch || ''}
                    onChange={(e) => handleChange('branch', e.target.value)}
                    placeholder="e.g., Computer Science"
                    className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:ring-2 ${
                      eduErrors.branch
                        ? 'border-danger focus:ring-danger/20'
                        : 'border-border focus:border-secondary focus:ring-secondary/20'
                    }`}
                  />
                  {eduErrors.branch && (
                    <p className="mt-1 text-xs text-danger">{eduErrors.branch}</p>
                  )}
                </div>

                {/* Specialization */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Specialization</label>
                  <input
                    type="text"
                    value={education.specialization || ''}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                    placeholder="e.g., Artificial Intelligence"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                {/* CGPA */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">CGPA</label>
                  <input
                    type="text"
                    value={education.cgpa || ''}
                    onChange={(e) => handleChange('cgpa', e.target.value)}
                    placeholder="e.g., 3.8"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                {/* Percentage */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Percentage</label>
                  <input
                    type="text"
                    value={education.percentage || ''}
                    onChange={(e) => handleChange('percentage', e.target.value)}
                    placeholder="e.g., 92"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                {/* Passing Year */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">
                    Passing Year <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={education.passingYear || ''}
                    onChange={(e) => handleChange('passingYear', e.target.value)}
                    placeholder="e.g., 2020"
                    className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:ring-2 ${
                      eduErrors.passingYear
                        ? 'border-danger focus:ring-danger/20'
                        : 'border-border focus:border-secondary focus:ring-secondary/20'
                    }`}
                  />
                  {eduErrors.passingYear && (
                    <p className="mt-1 text-xs text-danger">{eduErrors.passingYear}</p>
                  )}
                </div>

                {/* Start Year */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Start Year</label>
                  <input
                    type="text"
                    value={education.startYear || ''}
                    onChange={(e) => handleChange('startYear', e.target.value)}
                    placeholder="e.g., 2016"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                {/* End Year */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">End Year</label>
                  <input
                    type="text"
                    value={education.endYear || ''}
                    onChange={(e) => handleChange('endYear', e.target.value)}
                    placeholder="e.g., 2020"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                {/* Current Semester */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Current Semester</label>
                  <input
                    type="text"
                    value={education.currentSemester || ''}
                    onChange={(e) => handleChange('currentSemester', e.target.value)}
                    placeholder="e.g., 6th"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-text">Achievements</label>
                <textarea
                  value={education.achievements || ''}
                  onChange={(e) => handleChange('achievements', e.target.value)}
                  rows={2}
                  placeholder="List your academic achievements, awards, etc."
                  className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              {/* Delete Button */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => onDelete(index)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-danger transition-colors hover:bg-danger/10"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                  Remove Education
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default EducationCard;

