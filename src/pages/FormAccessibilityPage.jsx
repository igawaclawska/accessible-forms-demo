import { useState } from "react";
import styles from "./FormAccessibilityPage.module.css";
import errorStyles from "../components/ErrorMessage.module.css";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import SelectInput from "../components/SelectInput";
import CheckboxGroup from "../components/CheckboxGroup";
import RadioGroup from "../components/RadioGroup";
import TextareaInput from "../components/TextareaInput";
import ErrorMessage from "../components/ErrorMessage";

const FIELD = {
  FULL_NAME: "fullName",
  EMAIL: "email",
  PASSWORD: "password",
  JOB_TITLE: "jobTitle",
  ACCEPTED: "accepted",
  INTERESTS: "interests",
  TEAM_SIZE: "teamSize",
  ADDITIONAL_COMMENTS: "additionalComments",
};

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

  const handleAdditionalCommentsChange = (e) => {
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
            <TextInput
              id="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange(FIELD.FULL_NAME)}
              onBlur={handleBlur(FIELD.FULL_NAME)}
              autoComplete="name"
              required
              error={errors.fullName}
            />
            {/* Email */}
            <TextInput
              id="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange(FIELD.EMAIL)}
              onBlur={handleBlur(FIELD.EMAIL)}
              autoComplete="email"
              required
              error={errors.email}
              helperText="Enter a valid email address (e.g., name@example.com)."
            />
            {/* Password */}
            <PasswordInput
              id="password"
              label="Password"
              value={formData.password}
              onChange={handleChange(FIELD.PASSWORD)}
              onBlur={handleBlur(FIELD.PASSWORD)}
              required
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={errors.password}
              helperText="Must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
            />
            {/* Job Title Select */}
            <SelectInput
              id="jobTitle"
              label="Job Title"
              value={formData.jobTitle}
              onChange={handleChange(FIELD.JOB_TITLE)}
              onBlur={handleBlur(FIELD.JOB_TITLE)}
              required
              options={jobTitleOptions}
              error={errors.jobTitle}
            />
            {/* Interests Multiple Choice Checkbox Group */}
            <CheckboxGroup
              label="Select your interests:"
              options={interestOptions}
              selected={formData.interests}
              onChange={handleMultipleChoice}
              onBlur={handleBlurMultipleChoice}
              error={errors.interests}
            />
            {/* Team Size Radio Group */}
            <RadioGroup
              label="Team Size"
              options={teamSizeOptions}
              selected={formData.teamSize}
              onChange={handleChange(FIELD.TEAM_SIZE)}
              onBlur={handleBlur(FIELD.TEAM_SIZE)}
              error={errors.teamSize}
            />
            {/* Additional Comments */}
            <TextareaInput
              id="additionalComments"
              label="Additional Comments"
              value={formData.additionalComments}
              onChange={handleAdditionalCommentsChange}
              onBlur={handleBlur(FIELD.ADDITIONAL_COMMENTS)}
              error={errors.additionalComments}
              helperText={`Optional. Max 500 characters. ${
                500 - (formData.additionalComments?.length || 0)
              } characters left.`}
              maxLength={500}
            />
            {/* Terms Checkbox */}
            <div className={styles.inputContainer}>
              <div className={styles.checkboxContainer}>
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.accepted}
                  onChange={handleChange(FIELD.ACCEPTED)}
                  onBlur={handleBlur(FIELD.ACCEPTED)}
                  required
                  aria-invalid={!!errors.accepted}
                  aria-describedby={errors.accepted ? "termsError" : undefined}
                />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.termsLink}
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
              {errors.accepted && (
                <div
                  className={errorStyles.errorMsg}
                  id="termsError"
                  role="alert"
                  aria-live="polite"
                >
                  <ErrorMessage error={errors.accepted} />
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
