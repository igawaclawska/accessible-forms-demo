import ErrorMessageBetterA11y from "./ErrorMessageBetterA11y";
import styles from "./TextInputBetterA11y.module.css";
import HelperTextBetterA11y from "./HelperTextBetterA11y";

export default function TextInputBetterA11y({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  autoComplete,
  error,
  helperText,
  inputRef,
}) {
  const helperId = helperText ? `${id}-helper` : "";
  const errorId = errorMessage ? `${id}-error` : "";

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={!!error}
        aria-describedby={`${helperId} ${errorId}`}
      />
      <HelperTextBetterA11y id={helperId} helperText={helperText} />
      <ErrorMessageBetterA11y error={error} id={errorId} />
    </div>
  );
}
