/**
 * ProgressStepper - Horizontal step indicator with animated progress bar.
 * Shows 4 steps: Basic Details, Education, Professional, Social Links.
 */

import { FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, label: 'Basic Details', shortLabel: 'Basic' },
  { id: 2, label: 'Education', shortLabel: 'Edu' },
  { id: 3, label: 'Professional', shortLabel: 'Pro' },
  { id: 4, label: 'Social Links', shortLabel: 'Social' },
];

function ProgressStepper({ currentStep, onStepClick }) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Progress bar background */}
      <div className="relative mb-6 mt-2">
        <div className="h-2 w-full rounded-full bg-border">
          {/* Animated progress fill */}
          <motion.div
            className="h-2 rounded-full bg-secondary"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Step indicators */}
        <div className="absolute -top-4 left-0 flex w-full justify-between">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;
            const isClickable = step.id < currentStep;

            return (
              <button
                key={step.id}
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
                className={`flex flex-col items-center transition-all duration-200 ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
                aria-label={`Go to step ${step.id}: ${step.label}`}
              >
                {/* Circle */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isCompleted ? '#F9A826' : isActive ? '#F9A826' : '#d9d9d9',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm ${
                    isActive ? 'ring-4 ring-secondary/30' : ''
                  }`}
                >
                  {isCompleted ? (
                    <FiCheck className="h-4 w-4" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </motion.div>

                {/* Label - hidden on small screens */}
                <span
                  className={`mt-2 hidden text-xs font-medium transition-colors sm:block ${
                    isActive
                      ? 'text-secondary'
                      : isCompleted
                        ? 'text-text-muted'
                        : 'text-text-muted/60'
                  }`}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressStepper;

