import styles from "./CheckboxWithLabelBetterA11y.module.css";
import ErrorMessageBetterA11y from "./ErrorMessageBetterA11y";

export default function CheckboxWithLabelBetterA11y({
  accepted,
  onChange,
  onBlur,
  error,
  required = true,
  id = "terms",
  inputRef,
}) {
  const errorId = error ? `${id}-error` : "";

  return (
    <div className={styles.inputContainer}>
      <div className={styles.checkboxContainer}>
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          checked={accepted}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          aria-invalid={!!error}
          aria-describedby={`${errorId}`}
        />
        <label htmlFor={id}>
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
      <ErrorMessageBetterA11y error={error} id={errorId} />
    </div>
  );
}
