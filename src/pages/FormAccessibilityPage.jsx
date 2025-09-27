import { useState } from "react";
import styles from "./FormAccessibilityPage.module.css"; // <-- Import the CSS module

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
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // <-- Add this

  const handleChange = (field) => (e) => {
    const value = field === "accepted" ? e.target.checked : e.target.value;
    setFormData((f) => ({ ...f, [field]: value }));

    // Only validate after submit
    if (submitted) {
      setErrors((prev) => ({
        ...prev,
        [field]: validate({ ...formData, [field]: value })[field],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // <-- Mark as submitted
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <>
      <header className={styles.header}>
        {/* <p>
          Please fill out the form below to register for the event. Fields
          marked with * are required.
        </p> */}
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
                autoComplete="name"
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "nameError" : undefined}
              />
              {errors.name && (
                <div
                  id="nameError"
                  role="alert"
                  aria-live="polite"
                  style={{ color: "red" }}
                >
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
                autoComplete="email"
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "emailError" : undefined}
              />
              {errors.email && (
                <div
                  id="emailError"
                  role="alert"
                  aria-live="polite"
                  style={{ color: "red" }}
                >
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
                required
                aria-invalid={!!errors.tickets}
                aria-describedby={errors.tickets ? "ticketsError" : undefined}
              />
              {errors.tickets && (
                <div
                  id="ticketsError"
                  role="alert"
                  aria-live="polite"
                  style={{ color: "red" }}
                >
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
                onChange={handleChange("comments")}
                aria-describedby={
                  errors.comments
                    ? "commentsError commentsHelp"
                    : "commentsHelp"
                }
                aria-invalid={!!errors.comments}
              />
              <p id="commentsHelp">Optional. Max 500 characters.</p>
              {errors.comments && (
                <div
                  id="commentsError"
                  role="alert"
                  aria-live="polite"
                  style={{ color: "red" }}
                >
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
                  id="trackError"
                  role="alert"
                  aria-live="polite"
                  style={{ color: "red" }}
                >
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
                    aria-invalid={!!errors.contact}
                    aria-describedby={
                      errors.contact ? "contactError" : undefined
                    }
                  />
                  <label htmlFor="contactPhone">Phone</label>
                </div>
                {errors.contact && (
                  <div
                    id="contactError"
                    role="alert"
                    aria-live="polite"
                    style={{ color: "red" }}
                  >
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
                  id="termsError"
                  role="alert"
                  aria-live="polite"
                  style={{ color: "red" }}
                >
                  {errors.accepted}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit">Submit Registration</button>
          </form>
        </section>
      </main>
    </>
  );
}
