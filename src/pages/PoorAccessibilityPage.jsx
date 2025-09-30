import { useRef, useEffect } from "react";
import styles from "./FormAccessibilityPage.module.css";
import TextInput from "../components/accessible/TextInput";
import PasswordInput from "../components/accessible/PasswordInput";
import SelectInput from "../components/accessible/SelectInput";
import CheckboxGroup from "../components/accessible/CheckboxGroup";
import RadioGroup from "../components/accessible/RadioGroup";
import TextareaInput from "../components/accessible/TextareaInput";
import CheckboxWithLabel from "../components/accessible/CheckboxWithLabel";
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

  // Create refs for each field
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

  // Focus and scroll to first error field after errors change
  useEffect(() => {
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
    const errorFields = fieldOrder.filter((key) => errors[key]);
    if (errorFields.length === 0) return;

    const firstError = errorFields[0];
    const ref = refs[firstError];
    const errorValue = errors[firstError];

    // Generic helper for array errors
    const getErrorIndex = (errorArr) =>
      Array.isArray(errorArr) ? errorArr.findIndex(Boolean) || 0 : 0;

    if (Array.isArray(ref)) {
      const errorIndex = getErrorIndex(errorValue);
      if (ref[errorIndex]?.current) {
        ref[errorIndex].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        ref[errorIndex].current.focus();
      }
    } else if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  }, [errors]);

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
            <TextInput
              id="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange(FIELD.FULL_NAME)}
              onBlur={handleBlur(FIELD.FULL_NAME)}
              autoComplete="name"
              required
              error={errors.fullName}
              inputRef={refs.fullName}
            />

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
              inputRef={refs.email}
            />

            <PasswordInput
              id="password"
              label="Password"
              value={formData.password}
              onChange={handleChange(FIELD.PASSWORD)}
              onBlur={handleBlur(FIELD.PASSWORD)}
              required
              error={errors.password}
              helperText="Must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
              inputRef={refs.password}
            />

            <SelectInput
              id="jobTitle"
              label="Job Title"
              value={formData.jobTitle}
              onChange={handleChange(FIELD.JOB_TITLE)}
              onBlur={handleBlur(FIELD.JOB_TITLE)}
              required
              options={jobTitleOptions}
              error={errors.jobTitle}
              inputRef={refs.jobTitle}
            />

            <CheckboxGroup
              label="Select your interests:"
              options={interestOptions}
              selected={formData.interests}
              onChange={handleMultipleChoice}
              onBlur={() => handleBlurMultipleChoice()}
              error={errors.interests}
              inputRef={refs.interests}
            />

            <RadioGroup
              label="Team Size"
              options={teamSizeOptions}
              selected={formData.teamSize}
              onChange={handleChange(FIELD.TEAM_SIZE)}
              onBlur={handleBlur(FIELD.TEAM_SIZE)}
              error={errors.teamSize}
              inputRef={refs.teamSize}
            />

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

            <CheckboxWithLabel
              accepted={formData.accepted}
              onChange={handleChange(FIELD.ACCEPTED)}
              onBlur={handleBlur(FIELD.ACCEPTED)}
              error={errors.accepted}
              id="terms"
              inputRef={refs.accepted}
            />

            <button type="submit">Register</button>
          </form>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerBrand}>BrightPath Solutions</p>
          <nav className={styles.footerNav} aria-label="Footer">
            <a
              href="https://github.com/"
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
            &copy; {new Date().getFullYear()} BrightPath Solutions. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
