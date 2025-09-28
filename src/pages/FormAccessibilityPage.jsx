import { useState } from "react";
import styles from "./FormAccessibilityPage.module.css";
import ErrorIcon from "../components/icons/ErrorIcon";

const validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "Full name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email =
      "Oops! That doesn’t look like a valid email. Try again (e.g., name@example.com).";
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
      errors.password =
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.";
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

const teamSizeOptions = [
  { value: "1", label: "1 (Solo)" },
  { value: "2-5", label: "2-5" },
  { value: "6+", label: "6+" },
];

const interestOptions = [
  { value: "tech", label: "Technology" },
  { value: "design", label: "Design" },
  { value: "music", label: "Music" },
];

const jobTitleOptions = [
  { value: "", label: "Please select your job title" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "manager", label: "Manager" },
  { value: "qa", label: "QA Engineer" },
];

export default function FormAccessibilityPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    jobTitle: "",
    accepted: false,
    interests: [],
    teamSize: "",
    additionalComments: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === "accepted" ? e.target.checked : e.target.value;
    setFormData((f) => ({ ...f, [field]: value }));

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validate({ ...formData, [field]: value })[field],
      }));
    }
  };

  const handleMultipleChoice = (option) => {
    const selected = formData.interests.includes(option)
      ? formData.interests.filter((o) => o !== option)
      : [...formData.interests, option];

    setFormData((prev) => ({
      ...prev,
      interests: selected,
    }));

    if (touched.interests) {
      setErrors((prev) => ({
        ...prev,
        interests: validate({ ...formData, interests: selected }).interests,
      }));
    }
  };

  const handleBlur = (field) => () => {
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({
        ...prev,
        [field]: validate(formData)[field],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: validate(formData)[field],
      }));
    }
  };

  const handleBlurMultipleChoice = () => {
    if (!touched.interests) {
      setTouched((prev) => ({ ...prev, interests: true }));
      setErrors((prev) => ({
        ...prev,
        interests: validate(formData).interests,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        interests: validate(formData).interests,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      jobTitle: true,
      accepted: true,
      interests: true,
      teamSize: true,
      additionalComments: true,
    });
    if (Object.keys(validationErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Company Logo/Name */}
          <div className={styles.logo} aria-label="Company Logo">
            <img
              src="/logo.svg"
              alt="Company Logo"
              className={styles.logoImg}
            />
            <span className={styles.companyName}>Acme Events</span>
          </div>
          {/* Login Button */}
          <button className={styles.loginBtn} type="button">
            Login
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <h1>User Registration</h1>
        <section aria-labelledby="registrationFormTitle">
          <h2 id="registrationFormTitle" className={styles["sr-only"]}>
            Registration Form
          </h2>
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            {/* Full Name */}
            <div className={styles.inputContainer}>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                autoComplete="name"
                required
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullNameError" : undefined}
              />
              {errors.fullName && (
                <div
                  className={styles.errorMsg}
                  id="fullNameError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.fullName}
                </div>
              )}
            </div>

            {/* Email */}
            <div className={styles.inputContainer}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                autoComplete="email"
                required
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "emailError emailHelp" : "emailHelp"
                }
              />
              <p id="emailHelp" className={styles.helperText}>
                Enter a valid email address (e.g., name@example.com).
              </p>
              {errors.email && (
                <div
                  className={styles.errorMsg}
                  id="emailError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className={styles.inputContainer}>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  autoComplete="new-password"
                  required
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password
                      ? "passwordError passwordHelp"
                      : "passwordHelp"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-pressed={showPassword}
                  aria-controls="password"
                >
                  {showPassword ? "Hide password" : "Show password"}
                </button>
              </div>
              <p id="passwordHelp" className={styles.helperText}>
                Must be at least 8 characters and include an uppercase letter, a
                lowercase letter, a number, and a special character.
              </p>
              {errors.password && (
                <div
                  className={styles.errorMsg}
                  id="passwordError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.password}
                </div>
              )}
            </div>

            {/* Job Title Select */}
            <div className={styles.inputContainer}>
              <label htmlFor="jobTitle">Job Title</label>
              <select
                id="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange("jobTitle")}
                onBlur={handleBlur("jobTitle")}
                required
                aria-invalid={!!errors.jobTitle}
                aria-describedby={errors.jobTitle ? "jobTitleError" : undefined}
              >
                {jobTitleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.jobTitle && (
                <div
                  className={styles.errorMsg}
                  id="jobTitleError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.jobTitle}
                </div>
              )}
            </div>

            {/* Interests Multiple Choice Checkbox Group */}
            <div
              role="group"
              aria-label="Interests"
              className={styles.styledCheckboxGroup}
              aria-describedby={errors.interests ? "interestsError" : undefined}
            >
              <div className={styles.groupLabel}>Select your interests:</div>

              {interestOptions.map((option) => (
                <div key={option.value}>
                  <input
                    type="checkbox"
                    id={`interest-${option.value}`}
                    value={option.value}
                    checked={formData.interests.includes(option.value)}
                    onChange={() => handleMultipleChoice(option.value)}
                    onBlur={handleBlurMultipleChoice}
                    className={styles.hiddenInput}
                    aria-invalid={!!errors.interests}
                  />
                  <label
                    htmlFor={`interest-${option.value}`}
                    className={styles.optionLabel}
                  >
                    {option.label}
                  </label>
                </div>
              ))}

              {errors.interests && (
                <div
                  className={styles.errorMsg}
                  id="interestsError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.interests}
                </div>
              )}
            </div>

            {/* Team Size Radio Group */}
            <div
              role="radiogroup"
              aria-label="Team Size"
              className={styles.styledRadioGroup}
              aria-describedby={errors.teamSize ? "teamSizeError" : undefined}
            >
              <div className={styles.radioGroupLabel} id="teamSize-label">
                Team Size:
              </div>

              {teamSizeOptions.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={`team-${option.value.replace("+", "plus")}`}
                    name="teamSize"
                    value={option.value}
                    checked={formData.teamSize === option.value}
                    onChange={handleChange("teamSize")}
                    onBlur={handleBlur("teamSize")}
                    className={styles.styledInput}
                    required
                    aria-invalid={!!errors.teamSize}
                  />
                  <label
                    htmlFor={`team-${option.value.replace("+", "plus")}`}
                    className={styles.optionLabel}
                  >
                    {option.label}
                  </label>
                </div>
              ))}

              {errors.teamSize && (
                <div
                  className={styles.errorMsg}
                  id="teamSizeError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.teamSize}
                </div>
              )}
            </div>

            {/* Additional Comments */}
            <div className={styles.inputContainer}>
              <label htmlFor="additionalComments">Additional Comments</label>
              <textarea
                id="additionalComments"
                rows={5}
                value={formData.additionalComments}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 500);
                  setFormData((f) => ({ ...f, additionalComments: value }));
                  if (touched.additionalComments) {
                    setErrors((prev) => ({
                      ...prev,
                      additionalComments: validate({
                        ...formData,
                        additionalComments: value,
                      }).additionalComments,
                    }));
                  }
                }}
                onBlur={handleBlur("additionalComments")}
                aria-describedby={
                  errors.additionalComments
                    ? "additionalCommentsError additionalCommentsHelp"
                    : "additionalCommentsHelp"
                }
                aria-invalid={!!errors.additionalComments}
                maxLength={500}
              />
              <p id="additionalCommentsHelp" className={styles.helperText}>
                Optional. Max 500 characters.{" "}
                {500 - (formData.additionalComments?.length || 0)} characters
                left.
              </p>
              {errors.additionalComments && (
                <div
                  className={styles.errorMsg}
                  id="additionalCommentsError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.additionalComments}
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className={styles.inputContainer}>
              <div className={styles.checkboxContainer}>
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.accepted}
                  onChange={handleChange("accepted")}
                  onBlur={handleBlur("accepted")}
                  required
                  aria-invalid={!!errors.accepted}
                  aria-describedby={errors.accepted ? "termsError" : undefined}
                />
                <label htmlFor="terms">
                  I agree to the terms and conditions
                </label>
              </div>
              {errors.accepted && (
                <div
                  className={styles.errorMsg}
                  id="termsError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.accepted}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit">Register</button>
          </form>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.content}>
          <p className={styles.name}>Forms</p>
        </div>
      </footer>
    </>
  );
}
