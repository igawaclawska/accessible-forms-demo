import { useState } from "react";
import styles from "./FormAccessibilityPage.module.css"; // <-- Import the CSS module
import ErrorIcon from "../components/icons/ErrorIcon";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email =
      "Oops! That doesn’t look like a valid email. Try again (e.g., name@example.com).";
  }
  if (!values.tickets) {
    errors.tickets = "Number of tickets is required";
  } else if (Number(values.tickets) < 1 || Number(values.tickets) > 10) {
    errors.tickets = "Tickets must be between 1 and 10";
  }
  if (values.comments && values.comments.length > 500) {
    errors.comments = "Comments must be 500 characters or less";
  }
  if (!values.track) {
    errors.track = "Please select an event track";
  }
  if (!values.contact) {
    errors.contact = "Please select a contact method";
  }
  if (!values.accepted) {
    errors.accepted = "You must accept the terms";
  }
  if (!values.exampleRadio) {
    errors.exampleRadio = "Please choose an option";
  }
  if (!values.multipleChoice || values.multipleChoice.length === 0) {
    errors.multipleChoice = "Please select at least one option";
  }
  return errors;
};

export default function FormAccessibilityPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tickets: "",
    comments: "",
    track: "",
    contact: "",
    accepted: false,
    exampleRadio: "", // <-- Add this line
    multipleChoice: [], // <-- Add this line
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

  const toggle = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleMultipleChoice = (option) => {
    const selected = formData.multipleChoice.includes(option)
      ? formData.multipleChoice.filter((o) => o !== option)
      : [...formData.multipleChoice, option];

    setFormData((prev) => ({
      ...prev,
      multipleChoice: selected,
    }));

    if (touched.multipleChoice) {
      setErrors((prev) => ({
        ...prev,
        multipleChoice: validate({ ...formData, multipleChoice: selected })
          .multipleChoice,
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
    if (!touched.multipleChoice) {
      setTouched((prev) => ({ ...prev, multipleChoice: true }));
      setErrors((prev) => ({
        ...prev,
        multipleChoice: validate(formData).multipleChoice,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        multipleChoice: validate(formData).multipleChoice,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      tickets: true,
      comments: true,
      track: true,
      contact: true,
      accepted: true,
      exampleRadio: true,
      multipleChoice: true,
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
            <img src="/logo.svg" alt="Company Logo" className={styles.logoImg} />
            <span className={styles.companyName}>Acme Events</span>
          </div>
          {/* Login Button */}
          <button className={styles.loginBtn} type="button">
            Login
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <h1>Event Registration</h1>
        <section aria-labelledby="registrationFormTitle">
          <h2 id="registrationFormTitle" className={styles["sr-only"]}>
            Registration Form
          </h2>
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            {/* Text input */}

            <div className={styles.inputContainer}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                autoComplete="name"
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "nameError" : undefined}
              />
              {errors.name && (
                <div
                  className={styles.errorMsg}
                  id="nameError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email input */}

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

            {/* Numeric field */}
            <div className={styles.inputContainer}>
              <label htmlFor="tickets">Number of Tickets (1–10)</label>
              <input
                id="tickets"
                type="number"
                min="1"
                max="10"
                value={formData.tickets}
                onChange={handleChange("tickets")}
                onBlur={handleBlur("tickets")}
                required
                aria-invalid={!!errors.tickets}
                aria-describedby={errors.tickets ? "ticketsError" : undefined}
              />
              {errors.tickets && (
                <div
                  className={styles.errorMsg}
                  id="ticketsError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.tickets}
                </div>
              )}
            </div>

            {/* Long textfield */}
            <div className={styles.inputContainer}>
              <label htmlFor="comments">
                Special Requests / Accessibility Needs
              </label>
              <textarea
                id="comments"
                rows={5}
                value={formData.comments}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 500);
                  setFormData((f) => ({ ...f, comments: value }));
                  if (touched.comments) {
                    setErrors((prev) => ({
                      ...prev,
                      comments: validate({ ...formData, comments: value })
                        .comments,
                    }));
                  }
                }}
                onBlur={handleBlur("comments")}
                aria-describedby={
                  errors.comments
                    ? "commentsError commentsHelp"
                    : "commentsHelp"
                }
                aria-invalid={!!errors.comments}
                maxLength={500}
              />
              <p id="commentsHelp" className={styles.helperText}>
                Optional. Max 500 characters. {500 - formData.comments.length}{" "}
                characters left.
              </p>
              {errors.comments && (
                <div
                  className={styles.errorMsg}
                  id="commentsError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.comments}
                </div>
              )}
            </div>

            {/* Select */}
            <div className={styles.inputContainer}>
              <label htmlFor="track">Event Track</label>
              <select
                id="track"
                value={formData.track}
                onChange={handleChange("track")}
                onBlur={handleBlur("track")}
                required
                aria-invalid={!!errors.track}
                aria-describedby={errors.track ? "trackError" : undefined}
              >
                <option value="">--Please select--</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="design">Design</option>
              </select>
              {errors.track && (
                <div
                  className={styles.errorMsg}
                  id="trackError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.track}
                </div>
              )}
            </div>

            {/* Radiogroup */}
            <fieldset>
              <legend>Preferred Contact Method</legend>
              <div className={styles.inputContainer}>
                <div className={styles.checkboxContainer}>
                  <input
                    type="radio"
                    id="contactEmail"
                    name="contact"
                    value="email"
                    checked={formData.contact === "email"}
                    onChange={handleChange("contact")}
                    onBlur={handleBlur("contact")}
                    required
                    aria-invalid={!!errors.contact}
                    aria-describedby={
                      errors.contact ? "contactError" : undefined
                    }
                  />
                  <label htmlFor="contactEmail">Email</label>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="radio"
                    id="contactPhone"
                    name="contact"
                    value="phone"
                    checked={formData.contact === "phone"}
                    onChange={handleChange("contact")}
                    onBlur={handleBlur("contact")}
                    aria-invalid={!!errors.contact}
                    aria-describedby={
                      errors.contact ? "contactError" : undefined
                    }
                  />
                  <label htmlFor="contactPhone">Phone</label>
                </div>
                {errors.contact && (
                  <div
                    className={styles.errorMsg}
                    id="contactError"
                    role="alert"
                    aria-live="polite"
                  >
                    <span aria-hidden="true">
                      <ErrorIcon />
                    </span>
                    {errors.contact}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Checkbox */}
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

            {/*Radio Group*/}
            <div
              role="radiogroup"
              aria-label="Example radio group"
              className={styles.styledRadioGroup}
              aria-describedby={
                errors.exampleRadio ? "exampleRadioError" : undefined
              }
            >
              <div className={styles.radioGroupLabel} id="example-label">
                Choose an option:
              </div>

              <div>
                <input
                  type="radio"
                  id="option1"
                  name="exampleRadio"
                  value="option1"
                  checked={formData.exampleRadio === "option1"}
                  onChange={handleChange("exampleRadio")}
                  onBlur={handleBlur("exampleRadio")}
                  className={styles.styledInput}
                  required
                  aria-invalid={!!errors.exampleRadio}
                />
                <label htmlFor="option1" className={styles.optionLabel}>
                  Option 1
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="option2"
                  name="exampleRadio"
                  value="option2"
                  checked={formData.exampleRadio === "option2"}
                  onChange={handleChange("exampleRadio")}
                  onBlur={handleBlur("exampleRadio")}
                  className={styles.styledInput}
                  required
                  aria-invalid={!!errors.exampleRadio}
                />
                <label htmlFor="option2" className={styles.optionLabel}>
                  Option 2
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="option3"
                  name="exampleRadio"
                  value="option3"
                  checked={formData.exampleRadio === "option3"}
                  onChange={handleChange("exampleRadio")}
                  onBlur={handleBlur("exampleRadio")}
                  className={styles.styledInput}
                  required
                  aria-invalid={!!errors.exampleRadio}
                />
                <label htmlFor="option3" className={styles.optionLabel}>
                  Option 3
                </label>
              </div>
              {errors.exampleRadio && (
                <div
                  className={styles.errorMsg}
                  id="exampleRadioError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.exampleRadio}
                </div>
              )}
            </div>

            {/* Multiple Choice Checkbox Group */}
            <div
              role="group"
              aria-label="Example multiple choice group"
              className={styles.styledCheckboxGroup}
              aria-describedby={
                errors.multipleChoice ? "multipleChoiceError" : undefined
              }
            >
              <div className={styles.groupLabel}>
                Select one or more options:
              </div>

              <div>
                <input
                  type="checkbox"
                  id="mc-option1"
                  value="option1"
                  checked={formData.multipleChoice.includes("option1")}
                  onChange={() => handleMultipleChoice("option1")}
                  onBlur={handleBlurMultipleChoice}
                  className={styles.hiddenInput}
                  aria-invalid={!!errors.multipleChoice}
                />
                <label htmlFor="mc-option1" className={styles.optionLabel}>
                  Option 1
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="mc-option2"
                  value="option2"
                  checked={formData.multipleChoice.includes("option2")}
                  onChange={() => handleMultipleChoice("option2")}
                  onBlur={handleBlurMultipleChoice}
                  className={styles.hiddenInput}
                  aria-invalid={!!errors.multipleChoice}
                />
                <label htmlFor="mc-option2" className={styles.optionLabel}>
                  Option 2
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="mc-option3"
                  value="option3"
                  checked={formData.multipleChoice.includes("option3")}
                  onChange={() => handleMultipleChoice("option3")}
                  onBlur={handleBlurMultipleChoice}
                  className={styles.hiddenInput}
                  aria-invalid={!!errors.multipleChoice}
                />
                <label htmlFor="mc-option3" className={styles.optionLabel}>
                  Option 3
                </label>
              </div>
              {errors.multipleChoice && (
                <div
                  className={styles.errorMsg}
                  id="multipleChoiceError"
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">
                    <ErrorIcon />
                  </span>
                  {errors.multipleChoice}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit">Submit Registration</button>
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
