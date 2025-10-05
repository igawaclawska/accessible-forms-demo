import styles from "./CheckboxWithLabelPoorA11y.module.css";
import ErrorMessagePoorA11y from "./ErrorMessagePoorA11y";

export default function CheckboxWithLabelPoorA11y({
  accepted,
  onChange,
  name,
  error,
  id = "terms",
  inputRef,
}) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.checkboxContainer}>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="checkbox"
          checked={accepted}
          onChange={onChange}
        />
        <label>
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
      <ErrorMessagePoorA11y error={error} />
    </div>
  );
}
