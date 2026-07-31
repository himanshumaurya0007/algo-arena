/**
 * Validation functions for the multi-step profile wizard.
 * Matches the MySQL database schema constraints exactly.
 *
 * Tables covered:
 *   Step 1 - profiles: first_name, middle_name, last_name, phone_number, gender, date_of_birth, bio
 *            addresses: city, state, country, pincode
 *   Step 2 - education (client-side list, no dedicated DB table in schema)
 *   Step 3 - professional_details: experience_level
 *   Step 4 - social_links: github_url, linkedin_url, portfolio_url, leetcode_url
 */

const VALID_GENDERS = ['MALE', 'FEMALE', 'OTHER'];
const VALID_EXPERIENCE_LEVELS = ['STUDENT', 'FRESHER', 'INTERN', 'JUNIOR', 'MID_LEVEL', 'SENIOR'];

/**
 * Validate phone number (basic international format)
 */
function isValidPhone(phone) {
  return /^[\d\s\-+().]{7,20}$/.test(phone);
}

/**
 * Validate URL (optional field)
 */
function isValidUrl(url) {
  if (!url || url.trim() === '') return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate date string (YYYY-MM-DD)
 */
function isValidDate(dateStr) {
  if (!dateStr) return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

/**
 * Step 1: Basic Details validation
 * Maps to: profiles table + addresses table
 */
export function validateBasicDetails(data) {
  const errors = {};

  // profiles.first_name VARCHAR(50) NOT NULL
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (data.firstName.trim().length > 50) {
    errors.firstName = 'First name cannot exceed 50 characters';
  }

  // profiles.middle_name VARCHAR(50) [optional]
  if (data.middleName && data.middleName.trim().length > 50) {
    errors.middleName = 'Middle name cannot exceed 50 characters';
  }

  // profiles.last_name VARCHAR(50) NOT NULL
  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.trim().length > 50) {
    errors.lastName = 'Last name cannot exceed 50 characters';
  }

  // profiles.phone_number VARCHAR(20) [optional]
  if (data.phoneNumber && !isValidPhone(data.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }

  // profiles.gender ENUM('MALE','FEMALE','OTHER') [optional]
  if (data.gender && !VALID_GENDERS.includes(data.gender.toUpperCase())) {
    errors.gender = 'Invalid gender selected';
  }

  // profiles.date_of_birth DATE [optional but validated if provided]
  if (data.dateOfBirth && !isValidDate(data.dateOfBirth)) {
    errors.dateOfBirth = 'Please enter a valid date';
  }

  // addresses.city VARCHAR(100) [optional]
  if (data.city && data.city.trim().length > 100) {
    errors.city = 'City cannot exceed 100 characters';
  }

  // addresses.state VARCHAR(100) [optional]
  if (data.state && data.state.trim().length > 100) {
    errors.state = 'State cannot exceed 100 characters';
  }

  // addresses.country VARCHAR(100) [optional]
  if (data.country && data.country.trim().length > 100) {
    errors.country = 'Country cannot exceed 100 characters';
  }

  // addresses.pincode VARCHAR(20) [optional]
  if (data.pincode && data.pincode.trim().length > 20) {
    errors.pincode = 'Pincode cannot exceed 20 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Step 2: Education Details validation
 * (Client-side tracking; no dedicated education table in current schema)
 */
export function validateEducationDetails(data) {
  const errors = {};
  const educationErrors = [];

  if (!data.education || data.education.length === 0) {
    errors.education = 'Please add at least one education entry';
    return { isValid: false, errors };
  }

  let hasError = false;
  data.education.forEach((edu, index) => {
    const eduErr = {};
    if (!edu.collegeName?.trim()) {
      eduErr.collegeName = 'College name is required';
      hasError = true;
    }
    if (!edu.degree?.trim()) {
      eduErr.degree = 'Degree is required';
      hasError = true;
    }
    if (!edu.branch?.trim()) {
      eduErr.branch = 'Branch is required';
      hasError = true;
    }
    if (!edu.passingYear) {
      eduErr.passingYear = 'Passing year is required';
      hasError = true;
    }
    educationErrors[index] = eduErr;
  });

  if (hasError) {
    errors.educationErrors = educationErrors;
  }

  return {
    isValid: !hasError,
    errors,
  };
}

/**
 * Step 3: Professional Details validation
 * Maps to: professional_details table
 * Only field: experience_level ENUM DEFAULT 'STUDENT'
 */
export function validateProfessionalDetails(data) {
  const errors = {};

  // professional_details.experience_level ENUM DEFAULT 'STUDENT'
  if (data.experienceLevel && !VALID_EXPERIENCE_LEVELS.includes(data.experienceLevel.toUpperCase())) {
    errors.experienceLevel = 'Invalid experience level selected';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Step 4: Social Links validation
 * Maps to: social_links table
 * Fields: github_url, linkedin_url, portfolio_url, leetcode_url (all optional, VARCHAR 255)
 */
export function validateSocialLinks(data) {
  const errors = {};
  const urlFields = ['github', 'linkedin', 'portfolioWebsite', 'leetcode'];

  urlFields.forEach((field) => {
    if (data[field] && data[field].trim() && !isValidUrl(data[field])) {
      errors[field] = 'Please enter a valid URL (including https://)';
    }
    if (data[field] && data[field].trim().length > 255) {
      errors[field] = 'URL cannot exceed 255 characters';
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate all steps at once (for final submission)
 */
export function validateAllSteps(formData) {
  const step1 = validateBasicDetails(formData);
  const step2 = validateEducationDetails(formData);
  const step3 = validateProfessionalDetails(formData);
  const step4 = validateSocialLinks(formData);

  return {
    isValid: step1.isValid && step2.isValid && step3.isValid && step4.isValid,
    steps: [step1, step2, step3, step4],
  };
}
