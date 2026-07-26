// Username regex: alphanumeric, underscores, 3-20 characters
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// Email regex validation
export const validateEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Password regex: at least 8 characters, 1 uppercase, 1 lowercase, 1 digit
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Required Field Validation
export const requiredField = (value) => {
  return value.trim() !== "";
};

// Register Form Validation
export const validateRegisterForm = (data) => {
  const errors = {};

  if (!requiredField(data.username)) {
    errors.username = "Username is required";
  } else if (!validateUsername(data.username)) {
    errors.username = "Username must be 3-20 alphanumeric characters";
  }

  if (!validateEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (!validatePassword(data.password)) {
    errors.password =
      "Password must be at least 8 characters with uppercase, lowercase, and a number";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
