import ErrorMessage from "./ErrorMessage";
import styles from "./PasswordInput.module.css";
import errorStyles from "./ErrorMessage.module.css";
import HelperText from "./HelperText";

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
      <div>
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
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          aria-pressed={showPassword}
          aria-controls={id}
        >
          {showPassword ? "Hide password" : "Show password"}
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
