import styles from "./FormAccessibilityPage.module.css";
import TextInput from "../components/not-accessible/TextInput";
import PasswordInput from "../components/not-accessible/PasswordInput";
import SelectInput from "../components/not-accessible/SelectInput";
import CheckboxGroup from "../components/not-accessible/CheckboxGroup";
import RadioGroup from "../components/not-accessible/RadioGroup";
import TextareaInput from "../components/not-accessible/TextareaInput";
import CheckboxWithLabel from "../components/not-accessible/CheckboxWithLabel";
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
            <TextInput
              id="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange(FIELD.FULL_NAME)}
              error={errors.fullName}
            />

            <TextInput
              id="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange(FIELD.EMAIL)}
              error={errors.email}
              helperText="Enter a valid email address (e.g., name@example.com)."
            />

            <PasswordInput
              id="password"
              label="Password"
              value={formData.password}
              onChange={handleChange(FIELD.PASSWORD)}
              error={errors.password}
              helperText="Must be at least 8 characters."
            />

            <SelectInput
              id="jobTitle"
              label="Job Title"
              value={formData.jobTitle}
              onChange={handleChange(FIELD.JOB_TITLE)}
              required
              options={jobTitleOptions}
              error={errors.jobTitle}
            />

            <CheckboxGroup
              label="Select your interests:"
              options={interestOptions}
              selected={formData.interests}
              onChange={handleMultipleChoice}
              error={errors.interests}
            />

            <RadioGroup
              label="Team Size"
              options={teamSizeOptions}
              selected={formData.teamSize}
              onChange={handleChange(FIELD.TEAM_SIZE)}
              error={errors.teamSize}
            />

            <TextareaInput
              id="additionalComments"
              label="Additional Comments"
              value={formData.additionalComments}
              onChange={handleAdditionalCommentsChange}
              error={errors.additionalComments}
              helperText={`Optional. Max 500 characters.`}
              maxLength={500}
            />

            <CheckboxWithLabel
              accepted={formData.accepted}
              onChange={handleChange(FIELD.ACCEPTED)}
              error={errors.accepted}
              id="terms"
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
