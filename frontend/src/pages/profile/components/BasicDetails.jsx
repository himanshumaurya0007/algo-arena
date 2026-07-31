/**
 * BasicDetails - Step 1 of the profile wizard.
 * Covers fields from the `profiles` table (personal info) and `addresses` table.
 * DB fields: first_name, middle_name, last_name, phone_number, gender,
 *            date_of_birth, bio, profile_picture_url,
 *            city, state, country, pincode.
 */

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiCamera, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
];

function BasicDetails({ data, errors, onChange, onFieldBlur }) {
  const [bioCharCount, setBioCharCount] = useState(data.bio?.length || 0);
  const MAX_BIO_CHARS = 500;

  const handleChange = (field, value) => {
    if (field === 'bio') setBioCharCount(value.length);
    onChange({ ...data, [field]: value });
  };

  // Profile picture dropzone
  const onDropProfilePicture = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        onChange({ ...data, profilePicture: { file, preview: previewUrl } });
      }
    },
    [data, onChange]
  );

  const { getRootProps: getProfileRootProps, getInputProps: getProfileInputProps } = useDropzone({
    onDrop: onDropProfilePicture,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-xl font-bold text-text">Basic Details</h2>
        <p className="mt-1 text-sm text-text-muted">Your personal information and address</p>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex items-center gap-6">
        <div
          {...getProfileRootProps()}
          className={`relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-colors sm:h-28 sm:w-28 ${
            data.profilePicture?.preview
              ? 'border-secondary/50 ring-4 ring-secondary/20'
              : 'border-border hover:border-secondary/50 hover:ring-4 hover:ring-secondary/20'
          } ${errors.profilePicture ? 'border-danger' : ''}`}
        >
          <input {...getProfileInputProps()} />
          {data.profilePicture?.preview ? (
            <>
              <img
                src={data.profilePicture.preview}
                alt="Profile"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange({ ...data, profilePicture: null });
                }}
                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-danger text-white transition-colors hover:bg-danger/80"
                aria-label="Remove profile picture"
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-text-muted">
              <FiCamera className="h-6 w-6" />
              <span className="mt-1 text-[10px]">Upload</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-text">Profile Picture</p>
          <p className="text-xs text-text-muted">JPG, PNG or WebP. Max 5MB.</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid gap-5 sm:grid-cols-3">
        {/* First Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={data.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            onBlur={() => onFieldBlur?.('firstName')}
            placeholder="First name"
            className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:ring-2 ${
              errors.firstName
                ? 'border-danger focus:ring-danger/20'
                : 'border-border focus:border-secondary focus:ring-secondary/20'
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-danger">{errors.firstName}</p>
          )}
        </div>

        {/* Middle Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            Middle Name <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={data.middleName || ''}
            onChange={(e) => handleChange('middleName', e.target.value)}
            onBlur={() => onFieldBlur?.('middleName')}
            placeholder="Middle name"
            className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:ring-2 ${
              errors.middleName
                ? 'border-danger focus:ring-danger/20'
                : 'border-border focus:border-secondary focus:ring-secondary/20'
            }`}
          />
          {errors.middleName && (
            <p className="mt-1 text-xs text-danger">{errors.middleName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={data.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            onBlur={() => onFieldBlur?.('lastName')}
            placeholder="Last name"
            className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:ring-2 ${
              errors.lastName
                ? 'border-danger focus:ring-danger/20'
                : 'border-border focus:border-secondary focus:ring-secondary/20'
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-danger">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Username (readonly) */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Username</label>
          <input
            type="text"
            value={data.username || ''}
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-text-muted outline-none"
          />
          <p className="mt-1 text-xs text-text-muted">Username cannot be changed</p>
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
          <input
            type="email"
            value={data.email || ''}
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-text-muted outline-none"
          />
          <p className="mt-1 text-xs text-text-muted">Email cannot be changed here</p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Phone Number</label>
          <input
            type="tel"
            value={data.phoneNumber || ''}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            onBlur={() => onFieldBlur?.('phoneNumber')}
            placeholder="+91 98765 43210"
            className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:ring-2 ${
              errors.phoneNumber
                ? 'border-danger focus:ring-danger/20'
                : 'border-border focus:border-secondary focus:ring-secondary/20'
            }`}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-danger">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            Gender <span className="text-danger">*</span>
          </label>
          <select
            value={data.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            onBlur={() => onFieldBlur?.('gender')}
            className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors focus:ring-2 ${
              errors.gender
                ? 'border-danger focus:ring-danger/20'
                : 'border-border focus:border-secondary focus:ring-secondary/20'
            }`}
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="mt-1 text-xs text-danger">{errors.gender}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            Date of Birth <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            value={data.dateOfBirth || ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            onBlur={() => onFieldBlur?.('dateOfBirth')}
            className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors focus:ring-2 ${
              errors.dateOfBirth
                ? 'border-danger focus:ring-danger/20'
                : 'border-border focus:border-secondary focus:ring-secondary/20'
            }`}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-xs text-danger">{errors.dateOfBirth}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Bio</label>
        <textarea
          value={data.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={4}
          maxLength={MAX_BIO_CHARS}
          placeholder="Tell us about yourself..."
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        />
        <div className="mt-1 flex justify-between">
          <p className="text-xs text-text-muted">Share your background and goals</p>
          <p className={`text-xs ${bioCharCount > MAX_BIO_CHARS * 0.9 ? 'text-danger' : 'text-text-muted'}`}>
            {bioCharCount}/{MAX_BIO_CHARS}
          </p>
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">Address Details</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* City */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              City <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={data.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              onBlur={() => onFieldBlur?.('city')}
              placeholder="City"
              className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:ring-2 ${
                errors.city
                  ? 'border-danger focus:ring-danger/20'
                  : 'border-border focus:border-secondary focus:ring-secondary/20'
              }`}
            />
            {errors.city && <p className="mt-1 text-xs text-danger">{errors.city}</p>}
          </div>

          {/* State */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              State <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={data.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
              onBlur={() => onFieldBlur?.('state')}
              placeholder="State"
              className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:ring-2 ${
                errors.state
                  ? 'border-danger focus:ring-danger/20'
                  : 'border-border focus:border-secondary focus:ring-secondary/20'
              }`}
            />
            {errors.state && <p className="mt-1 text-xs text-danger">{errors.state}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              Country <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={data.country || ''}
              onChange={(e) => handleChange('country', e.target.value)}
              onBlur={() => onFieldBlur?.('country')}
              placeholder="Country"
              className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:ring-2 ${
                errors.country
                  ? 'border-danger focus:ring-danger/20'
                  : 'border-border focus:border-secondary focus:ring-secondary/20'
              }`}
            />
            {errors.country && <p className="mt-1 text-xs text-danger">{errors.country}</p>}
          </div>

          {/* Pincode */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Pincode</label>
            <input
              type="text"
              value={data.pincode || ''}
              onChange={(e) => handleChange('pincode', e.target.value)}
              onBlur={() => onFieldBlur?.('pincode')}
              placeholder="Pincode"
              className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:ring-2 ${
                errors.pincode
                  ? 'border-danger focus:ring-danger/20'
                  : 'border-border focus:border-secondary focus:ring-secondary/20'
              }`}
            />
            {errors.pincode && <p className="mt-1 text-xs text-danger">{errors.pincode}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default BasicDetails;
