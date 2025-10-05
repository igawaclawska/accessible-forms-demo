import ErrorMessageBetterA11y from "./ErrorMessageBetterA11y";
import styles from "./TextareaInputBetterA11y.module.css";
import HelperTextBetterA11y from "./HelperTextBetterA11y";

export default function TextareaInputBetterA11y({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  maxLength,
}) {
  const helperId = helperText ? `${id}-helper` : "";
  const errorId = errorMessage ? `${id}-error` : "";

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        rows={5}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-describedby={`${helperId} ${errorId}`}
        aria-invalid={!!error}
        maxLength={maxLength}
      />
      <HelperTextBetterA11y id={helperId} helperText={helperText} />
      <ErrorMessageBetterA11y error={error} id={errorId} />
    </div>
  );
}
