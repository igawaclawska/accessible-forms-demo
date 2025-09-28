export const validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "Full name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Oops! That doesn’t look like a valid email. Try again.";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else {
    const pwd = values.password;
    const hasMinLen = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    if (!(hasMinLen && hasUpper && hasLower && hasNumber && hasSpecial)) {
      errors.password = "Please use a valid password format.";
    }
  }
  if (!values.jobTitle) {
    errors.jobTitle = "Please select a job title";
  }
  if (!values.accepted) {
    errors.accepted = "You must accept the terms";
  }
  if (!values.interests || values.interests.length === 0) {
    errors.interests = "Please select at least one interest";
  }
  if (!values.teamSize) {
    errors.teamSize = "Please select a team size";
  }
  if (values.additionalComments && values.additionalComments.length > 500) {
    errors.additionalComments =
      "Additional comments must be 500 characters or less";
  }
  return errors;
};
