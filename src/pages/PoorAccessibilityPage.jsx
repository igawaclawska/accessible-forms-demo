import styles from "./FormAccessibilityPage.module.css";
import TextInputPoorA11y from "../components/not-accessible/TextInputPoorA11y";
import SelectInputPoorA11y from "../components/not-accessible/SelectInputPoorA11y";
import CheckboxGroupPoorA11y from "../components/not-accessible/CheckboxGroupPoorA11y";
import RadioGroupPoorA11y from "../components/not-accessible/RadioGroupPoorA11y";
import TextareaInputPoorA11y from "../components/not-accessible/TextareaInputPoorA11y";
import CheckboxWithLabelPoorA11y from "../components/not-accessible/CheckboxWithLabelPoorA11y";
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
            <TextInputPoorA11y
              id="fullName"
              type="text"
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange(FIELD.FULL_NAME)}
              error={errors.fullName}
            />

            <TextInputPoorA11y
              id="email"
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange(FIELD.EMAIL)}
              error={errors.email}
              helperText="Enter a valid email address (e.g., name@example.com)."
            />

            <TextInputPoorA11y
              id="password"
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange(FIELD.PASSWORD)}
              error={errors.password}
              helperText="Must be at least 8 characters."
            />

            <SelectInputPoorA11y
              id="jobTitle"
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange(FIELD.JOB_TITLE)}
              required
              options={jobTitleOptions}
              error={errors.jobTitle}
            />

            <CheckboxGroupPoorA11y
              label="Select your interests:"
              name="interests"
              options={interestOptions}
              selected={formData.interests}
              onChange={handleMultipleChoice}
              error={errors.interests}
            />

            <RadioGroupPoorA11y
              label="Team Size"
              name="teamSize"
              options={teamSizeOptions}
              selected={formData.teamSize}
              onChange={handleChange(FIELD.TEAM_SIZE)}
              error={errors.teamSize}
            />

            <TextareaInputPoorA11y
              id="additionalComments"
              label="Additional Comments"
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleAdditionalCommentsChange}
              error={errors.additionalComments}
              helperText={`Optional. Max 500 characters.`}
              maxLength={500}
            />

            <CheckboxWithLabelPoorA11y
              accepted={formData.accepted}
              onChange={handleChange(FIELD.ACCEPTED)}
              error={errors.accepted}
              id="terms"
              name="terms"
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
