import ErrorMessage from "./ErrorMessage";
import styles from "./TextInput.module.css";
import errorStyles from "./ErrorMessage.module.css";
import HelperText from "./HelperText";

export default function TextInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  autoComplete,
  error,
  helperText,
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
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
      <HelperText id={id} helperText={helperText} />
      {error && (
        <div
          className={errorStyles.errorMsg}
          id={`${id}Error`}
          role="alert"
          aria-live="polite"
        >
          <ErrorMessage error={error} />
        </div>
      )}
    </div>
  );
}
