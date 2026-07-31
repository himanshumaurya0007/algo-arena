/**
 * EducationDetails - Step 2 of the profile wizard.
 * Allows adding multiple education entries using EducationCard.
 */

import { motion } from 'framer-motion';
import { FiPlus, FiBookOpen } from 'react-icons/fi';
import EducationCard from './EducationCard';
import { createNewId } from '../data/ProfileService';

const emptyEducation = {
  id: '',
  collegeName: '',
  university: '',
  degree: '',
  branch: '',
  specialization: '',
  cgpa: '',
  percentage: '',
  passingYear: '',
  startYear: '',
  endYear: '',
  currentSemester: '',
  achievements: '',
};

function EducationDetails({ data, errors, onChange }) {
  const educationList = data.education || [];

  const handleAddEducation = () => {
    const newEdu = {
      ...emptyEducation,
      id: createNewId('edu'),
    };
    onChange({
      ...data,
      education: [...educationList, newEdu],
    });
  };

  const handleEducationChange = (index, updatedEdu) => {
    const updated = [...educationList];
    updated[index] = updatedEdu;
    onChange({ ...data, education: updated });
  };

  const handleDeleteEducation = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    onChange({ ...data, education: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Education Details</h2>
          <p className="mt-1 text-sm text-text-muted">
            Add your educational background
          </p>
        </div>
      </div>

      {/* Education Cards */}
      {educationList.length > 0 ? (
        <div className="space-y-4">
          {educationList.map((edu, index) => (
            <EducationCard
              key={edu.id || index}
              education={edu}
              index={index}
              onChange={handleEducationChange}
              onDelete={handleDeleteEducation}
              errors={errors}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border px-6 py-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
            <FiBookOpen className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-text">No Education Added Yet</h3>
          <p className="mt-2 max-w-md text-center text-sm text-text-muted">
            Add your educational background including college, degree, and achievements to showcase your academic journey.
          </p>
          {errors.education && (
            <p className="mt-2 text-sm text-danger">{errors.education}</p>
          )}
        </div>
      )}

      {/* Add Education Button */}
      <button
        type="button"
        onClick={handleAddEducation}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-4 text-sm font-medium text-text-muted transition-all hover:border-secondary hover:bg-secondary/5 hover:text-secondary"
      >
        <FiPlus className="h-5 w-5" />
        Add Education
      </button>

      <p className="text-xs text-text-muted">
        {educationList.length} education entr{educationList.length === 1 ? 'y' : 'ies'} added
      </p>
    </motion.div>
  );
}

export default EducationDetails;

