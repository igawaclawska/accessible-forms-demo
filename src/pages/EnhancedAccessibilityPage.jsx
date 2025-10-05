import { useRef } from "react";
import useFocusFirstErrorField from "../hooks/useFocusErrorField";
import styles from "./FormAccessibilityPage.module.css";
import TextInputBetterA11y from "../components/accessible/TextInputBetterA11y";
import PasswordInputBetterA11y from "../components/accessible/PasswordInputBetterA11y";
import SelectInputBetterA11y from "../components/accessible/SelectInputBetterA11y";
import CheckboxGroupBetterA11y from "../components/accessible/CheckboxGroupBetterA11y";
import RadioGroupBetterA11y from "../components/accessible/RadioGroupBetterA11y";
import TextareaInputBetterA11y from "../components/accessible/TextareaInputBetterA11y";
import CheckboxWithLabelBetterA11y from "../components/accessible/CheckboxWithLabelBetterA11y";
import {
  teamSizeOptions,
  interestOptions,
  jobTitleOptions,
} from "../constants/formOptions";
import { FIELD } from "../constants/formFields";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";

export default function FormAccessibilityPage() {
  const {
    formData,
    errors,
    handleChange,
    handleMultipleChoice,
    handleBlur,
    handleBlurMultipleChoice,
    handleAdditionalCommentsChange,
    handleSubmit,
  } = useForm({
    fullName: "",
    email: "",
    password: "",
    jobTitle: "",
    accepted: false,
    interests: [],
    teamSize: "",
    additionalComments: "",
  });

  const refs = {
    fullName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    jobTitle: useRef(null),
    interests: interestOptions.map(() => useRef(null)),
    teamSize: teamSizeOptions.map(() => useRef(null)),
    additionalComments: useRef(null),
    accepted: useRef(null),
  };

  const fieldOrder = [
    "fullName",
    "email",
    "password",
    "jobTitle",
    "interests",
    "teamSize",
    "additionalComments",
    "accepted",
  ];

  useFocusFirstErrorField(errors, refs, fieldOrder);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo} aria-label="BrightPath Solutions Logo">
            <span className={styles.companyName}>Accessible Forms Demo</span>
          </div>
          <nav className={styles.headerNav} aria-label="Main navigation">
            <Link to="/poor-accessibility" className={styles.headerLink}>
              Poor Accessibility
            </Link>
            <Link to="/" className={styles.headerLink}>
              Enhanced Accessibility
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <h1>User Registration</h1>
        <section aria-labelledby="registrationFormTitle">
          <form
            onSubmit={handleSubmit((data) =>
              alert(JSON.stringify(data, null, 2))
            )}
            noValidate
            className={styles.form}
          >
            <TextInputBetterA11y
              id="fullName"
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange(FIELD.FULL_NAME)}
              onBlur={handleBlur(FIELD.FULL_NAME)}
              autoComplete="name"
              required
              error={errors.fullName}
              inputRef={refs.fullName}
            />

            <TextInputBetterA11y
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange(FIELD.EMAIL)}
              onBlur={handleBlur(FIELD.EMAIL)}
              autoComplete="email"
              required
              error={errors.email}
              helperText="Enter a valid email address (e.g., name@example.com)."
              inputRef={refs.email}
            />

            <PasswordInputBetterA11y
              id="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange(FIELD.PASSWORD)}
              onBlur={handleBlur(FIELD.PASSWORD)}
              required
              error={errors.password}
              helperText="Must be at least 8 characters."
              inputRef={refs.password}
            />

            <SelectInputBetterA11y
              id="jobTitle"
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange(FIELD.JOB_TITLE)}
              onBlur={handleBlur(FIELD.JOB_TITLE)}
              required
              options={jobTitleOptions}
              error={errors.jobTitle}
              inputRef={refs.jobTitle}
            />

            <CheckboxGroupBetterA11y
              label="Select your interests:"
              name="interests"
              options={interestOptions}
              selected={formData.interests}
              onChange={handleMultipleChoice}
              onBlur={() => handleBlurMultipleChoice()}
              error={errors.interests}
              inputRef={refs.interests}
            />

            <RadioGroupBetterA11y
              label="Team Size"
              name="teamSize"
              options={teamSizeOptions}
              selected={formData.teamSize}
              onChange={handleChange(FIELD.TEAM_SIZE)}
              onBlur={handleBlur(FIELD.TEAM_SIZE)}
              error={errors.teamSize}
              inputRef={refs.teamSize}
            />

            <TextareaInputBetterA11y
              id="additionalComments"
              label="Additional Comments"
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleAdditionalCommentsChange}
              onBlur={handleBlur(FIELD.ADDITIONAL_COMMENTS)}
              error={errors.additionalComments}
              helperText={`Optional. Max 500 characters. ${
                500 - (formData.additionalComments?.length || 0)
              } characters left.`}
              maxLength={500}
            />

            <CheckboxWithLabelBetterA11y
              accepted={formData.accepted}
              onChange={handleChange(FIELD.ACCEPTED)}
              onBlur={handleBlur(FIELD.ACCEPTED)}
              error={errors.accepted}
              id="terms"
              name="terms"
              inputRef={refs.accepted}
            />

            <button type="submit">Register</button>
          </form>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerBrand}>Accessible Forms Demo</p>
          <nav className={styles.footerNav}>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              GitHub
            </a>
            <a href="mailto:info@brightpath.com" className={styles.footerLink}>
              Contact
            </a>
          </nav>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} Accessible Forms Demo. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
