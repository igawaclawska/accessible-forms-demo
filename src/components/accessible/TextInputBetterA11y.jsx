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
        aria-describedby={
          error
            ? `${id}Error${helperText ? ` ${id}Help` : ""}`
            : helperText
            ? `${id}Help`
            : undefined
        }
      />
      <HelperTextBetterA11y id={id} helperText={helperText} />
      <ErrorMessageBetterA11y error={error} id={`${id}Error`} />
    </div>
  );
}
