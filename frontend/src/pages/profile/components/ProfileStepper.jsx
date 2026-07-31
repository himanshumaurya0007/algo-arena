/**
 * ProfileStepper - Main wizard orchestrator.
 * Manages the 4-step flow: Basic Details → Education → Professional → Social Links.
 * Handles navigation, validation, save draft, and submit.
 */

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSave, FiArrowLeft, FiArrowRight, FiCheck, FiSend } from 'react-icons/fi';

import ProgressStepper from './ProgressStepper';
import BasicDetails from './BasicDetails';
import EducationDetails from './EducationDetails';
import ProfessionalDetails from './ProfessionalDetails';
import SocialLinks from './SocialLinks';

import { validateBasicDetails, validateEducationDetails, validateProfessionalDetails, validateSocialLinks } from '../data/validation';
import { fetchProfile, saveProfile, saveDraft } from '../data/ProfileService';

const TOTAL_STEPS = 4;

function ProfileStepper({ username }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  // Load profile data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProfile(username);
        setFormData(data);
      } catch (err) {
        toast.error('Failed to load profile data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [username]);

  // Track unsaved changes
  const handleFormChange = useCallback((updatedData) => {
    setFormData(updatedData);
    setHasChanges(true);
    // Clear errors for fields that are now valid
    setErrors({});
  }, []);

  // Mark field as touched (for validation on blur)
  const handleFieldBlur = useCallback((fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  // Validate current step
  const validateCurrentStep = useCallback(() => {
    if (!formData) return false;

    let result;
    switch (currentStep) {
      case 1:
        result = validateBasicDetails(formData);
        break;
      case 2:
        result = validateEducationDetails(formData);
        break;
      case 3:
        result = validateProfessionalDetails(formData);
        break;
      case 4:
        result = validateSocialLinks(formData);
        break;
      default:
        result = { isValid: true, errors: {} };
    }

    setErrors(result.errors || {});
    return result.isValid;
  }, [currentStep, formData]);

  // Navigate to next step
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      setErrors({});
    } else {
      toast.error('Please fix the errors before proceeding');
    }
  };

  // Navigate to previous step
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  // Save as draft
  const handleSaveDraft = async () => {
    if (!formData) return;
    setIsSaving(true);
    try {
      await saveDraft({ ...formData, username });
      toast.success('Draft saved successfully!', {
        icon: '💾',
        duration: 3000,
      });
      setHasChanges(false);
    } catch (err) {
      toast.error(err.message || 'Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  // Submit profile
  const handleSubmit = async () => {
    // Validate all steps
    const allValid = [1, 2, 3, 4].every((step) => {
      let result;
      switch (step) {
        case 1: result = validateBasicDetails(formData); break;
        case 2: result = validateEducationDetails(formData); break;
        case 3: result = validateProfessionalDetails(formData); break;
        case 4: result = validateSocialLinks(formData); break;
      }
      if (!result.isValid) {
        setErrors(result.errors || {});
        setCurrentStep(step);
        return false;
      }
      return true;
    });

    if (!allValid) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveProfile({ ...formData, username });
      toast.success('Profile submitted successfully! 🎉', {
        duration: 5000,
      });
      setHasChanges(false);
    } catch (err) {
      toast.error(err.message || 'Failed to submit profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step component
  const renderStepContent = () => {
    if (!formData) return null;

    switch (currentStep) {
      case 1:
        return (
          <BasicDetails
            data={formData}
            errors={errors}
            onChange={handleFormChange}
            onFieldBlur={handleFieldBlur}
          />
        );
      case 2:
        return (
          <EducationDetails
            data={formData}
            errors={errors}
            onChange={handleFormChange}
          />
        );
      case 3:
        return (
          <ProfessionalDetails
            data={formData}
            errors={errors}
            onChange={handleFormChange}
          />
        );
      case 4:
        return (
          <SocialLinks
            data={formData}
            errors={errors}
            onChange={handleFormChange}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-transparent" />
          <p className="text-sm text-text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-text-muted">Failed to load profile data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Stepper */}
      <ProgressStepper currentStep={currentStep} onStepClick={setCurrentStep} />

      {/* Step Content */}
      <div className="rounded-2xl bg-surface p-6 shadow-card sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left side */}
          <div className="flex gap-3">
            {/* Previous Button */}
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-background"
              >
                <FiArrowLeft className="h-4 w-4" />
                Previous
              </button>
            )}
          </div>

          {/* Right side */}
          <div className="flex flex-wrap gap-3">
            {/* Save Draft */}
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving || !hasChanges}
              className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-background hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSave className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>

            {/* Next / Submit */}
            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md"
              >
                Next
                <FiArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiSend className="h-4 w-4" />
                    Submit Profile
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Step indicator text */}
      <p className="text-center text-xs text-text-muted">
        Step {currentStep} of {TOTAL_STEPS}
        {hasChanges && ' • Unsaved changes'}
      </p>
    </div>
  );
}

export default ProfileStepper;

