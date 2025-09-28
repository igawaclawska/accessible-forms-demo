import ErrorMessage from "./ErrorMessage";
import styles from "./PasswordInput.module.css";
import errorStyles from "./ErrorMessage.module.css";
import HelperText from "./HelperText";
import EyeIcon from "./icons/EyeIcon";

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  showPassword,
  setShowPassword,
  error,
  helperText,
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputRow}>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="new-password"
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}Error ${id}Help` : `${id}Help`}
        />
        <button
          className={styles.eyeButton}
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          aria-pressed={showPassword}
          aria-controls={id}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <EyeIcon isOpen={showPassword} />
        </button>
      </div>
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
