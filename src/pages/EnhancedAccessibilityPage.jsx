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
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function FormAccessibilityPage() {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    handleChange,
    handleMultipleChoice,
    handleAdditionalCommentsChange,
    handleSubmit,
  } = useForm({
    // fullName: "",
    email: "",
    password: "",
    // jobTitle: "",
    accepted: false,
    interests: [],
    teamSize: "",
    additionalComments: "",
  });

  const handleFormSubmit = handleSubmit((data) => {
    if (
      Object.values(errors).every(
        (err) => !err || (Array.isArray(err) && err.length === 0)
      )
    ) {
      navigate("/success", { state: { formData: data } });
    }
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <title>Better Accessibility</title>
        <h1>Form - better a11y</h1>
        <section>
          <form
            autoComplete="off"
            onSubmit={handleFormSubmit}
            noValidate
            className={styles.form}
          >
            {/* <TextInputBetterA11y
              id="fullName"
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange(FIELD.FULL_NAME)}
              error={errors.fullName}
            /> */}

            <TextInputBetterA11y
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange(FIELD.EMAIL)}
              error={errors.email}
              helperText="Enter a valid email address (e.g., name@example.com)."
            />

            <PasswordInputBetterA11y
              id="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange(FIELD.PASSWORD)}
              error={errors.password}
              helperText="Must be at least 8 characters."
            />

            {/* <SelectInputBetterA11y
              id="jobTitle"
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange(FIELD.JOB_TITLE)}
              options={jobTitleOptions}
              error={errors.jobTitle}
            /> */}

            <CheckboxGroupBetterA11y
              label="Select your interests:"
              name="interests"
              options={interestOptions}
              selected={formData.interests}
              onChange={handleMultipleChoice}
              error={errors.interests}
            />

            <RadioGroupBetterA11y
              label="Team Size"
              name="teamSize"
              options={teamSizeOptions}
              selected={formData.teamSize}
              onChange={handleChange(FIELD.TEAM_SIZE)}
              error={errors.teamSize}
            />

            <TextareaInputBetterA11y
              id="additionalComments"
              label="Additional Comments"
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleAdditionalCommentsChange}
              error={errors.additionalComments}
              helperText={`Optional. 100 out of ${
                100 - (formData.additionalComments?.length || 0)
              } characters left.`}
              maxLength={100}
            />

            <CheckboxWithLabelBetterA11y
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
      <Footer />
    </>
  );
}
