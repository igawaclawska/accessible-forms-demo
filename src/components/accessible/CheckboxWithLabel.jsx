import styles from "./CheckboxWithLabel.module.css";
import ErrorMessage from "./ErrorMessage";

export default function CheckboxWithLabel({
  accepted,
  onChange,
  onBlur,
  error,
  required = true,
  id = "terms",
  inputRef,
}) {
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
          aria-describedby={error ? `${id}Error` : undefined}
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
      <ErrorMessage error={error} id={`${id}Error`} />
    </div>
  );
}
