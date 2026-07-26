// Email Validation
export const validateEmail = (email) => {

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);

};



// Password Validation
export const validatePassword = (password) => {

  return password.length >= 6;

};



// Required Field Validation
export const requiredField = (value) => {

  return value.trim() !== "";

};



// Register Form Validation
export const validateRegisterForm = (data) => {

  const errors = {};


  if (!requiredField(data.name)) {
    errors.name = "Name is required";
  }


  if (!validateEmail(data.email)) {
    errors.email = "Invalid email";
  }


  if (!validatePassword(data.password)) {
    errors.password =
      "Password must be at least 6 characters";
  }


  if (data.password !== data.confirmPassword) {
    errors.confirmPassword =
      "Passwords do not match";
  }


  return errors;

};