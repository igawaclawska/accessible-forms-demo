import { useState } from "react";
import styles from "./FormAccessibilityPage.module.css"; // <-- Import the CSS module
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
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (values.bio && values.bio.length > 500) {
    errors.bio = "Bio must be 500 characters or less";
  }
  if (!values.role) {
    errors.role = "Please select a user role";
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
  return errors;
};

export default function FormAccessibilityPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    bio: "",
    role: "",
    accepted: false,
    interests: [],
    teamSize: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [selected, setSelected] = useState([]);

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
      bio: true,
      role: true,
      accepted: true,
      interests: true,
      teamSize: true,
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
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                autoComplete="new-password"
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "passwordError" : undefined}
              />
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

            {/* Bio */}
            <div className={styles.inputContainer}>
              <label htmlFor="bio">Short Bio</label>
              <textarea
                id="bio"
                rows={5}
                value={formData.bio}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 500);
                  setFormData((f) => ({ ...f, bio: value }));
                  if (touched.bio) {
                    setErrors((prev) => ({
                      ...prev,
                      bio: validate({ ...formData, bio: value }).bio,
                    }));
                  }
                }}
                onBlur={handleBlur("bio")}
                aria-describedby={errors.bio ? "bioError bioHelp" : "bioHelp"}
                aria-invalid={!!errors.bio}
                maxLength={500}
              />
              <p id="bioHelp" className={styles.helperText}>
                Optional. Max 500 characters. {500 - formData.bio.length}{" "}
                characters left.
              </p>
              {errors.bio && (
                <div
                  className={styles.errorMsg}
                  id="bioError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.bio}
                </div>
              )}
            </div>

            {/* Role Select */}
            <div className={styles.inputContainer}>
              <label htmlFor="role">User Role</label>
              <select
                id="role"
                value={formData.role}
                onChange={handleChange("role")}
                onBlur={handleBlur("role")}
                required
                aria-invalid={!!errors.role}
                aria-describedby={errors.role ? "roleError" : undefined}
              >
                <option value="">--Please select--</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
              {errors.role && (
                <div
                  className={styles.errorMsg}
                  id="roleError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.role}
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

              <div>
                <input
                  type="checkbox"
                  id="interest-tech"
                  value="tech"
                  checked={formData.interests.includes("tech")}
                  onChange={() => handleMultipleChoice("tech")}
                  onBlur={handleBlurMultipleChoice}
                  className={styles.hiddenInput}
                  aria-invalid={!!errors.interests}
                />
                <label htmlFor="interest-tech" className={styles.optionLabel}>
                  Technology
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="interest-design"
                  value="design"
                  checked={formData.interests.includes("design")}
                  onChange={() => handleMultipleChoice("design")}
                  onBlur={handleBlurMultipleChoice}
                  className={styles.hiddenInput}
                  aria-invalid={!!errors.interests}
                />
                <label htmlFor="interest-design" className={styles.optionLabel}>
                  Design
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="interest-music"
                  value="music"
                  checked={formData.interests.includes("music")}
                  onChange={() => handleMultipleChoice("music")}
                  onBlur={handleBlurMultipleChoice}
                  className={styles.hiddenInput}
                  aria-invalid={!!errors.interests}
                />
                <label htmlFor="interest-music" className={styles.optionLabel}>
                  Music
                </label>
              </div>
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

              <div>
                <input
                  type="radio"
                  id="team-1"
                  name="teamSize"
                  value="1"
                  checked={formData.teamSize === "1"}
                  onChange={handleChange("teamSize")}
                  onBlur={handleBlur("teamSize")}
                  className={styles.styledInput}
                  required
                  aria-invalid={!!errors.teamSize}
                />
                <label htmlFor="team-1" className={styles.optionLabel}>
                  1 (Solo)
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="team-2-5"
                  name="teamSize"
                  value="2-5"
                  checked={formData.teamSize === "2-5"}
                  onChange={handleChange("teamSize")}
                  onBlur={handleBlur("teamSize")}
                  className={styles.styledInput}
                  required
                  aria-invalid={!!errors.teamSize}
                />
                <label htmlFor="team-2-5" className={styles.optionLabel}>
                  2-5
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="team-6plus"
                  name="teamSize"
                  value="6+"
                  checked={formData.teamSize === "6+"}
                  onChange={handleChange("teamSize")}
                  onBlur={handleBlur("teamSize")}
                  className={styles.styledInput}
                  required
                  aria-invalid={!!errors.teamSize}
                />
                <label htmlFor="team-6plus" className={styles.optionLabel}>
                  6+
                </label>
              </div>
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
