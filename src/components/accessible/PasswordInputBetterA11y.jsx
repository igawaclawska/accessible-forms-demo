import { useState } from "react";
import ErrorMessageBetterA11y from "./ErrorMessageBetterA11y";
import styles from "./PasswordInputBetterA11y.module.css";
import HelperTextBetterA11y from "./HelperTextBetterA11y";
import EyeIcon from "./icons/EyeIcon";

export default function PasswordInputBetterA11y({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  error,
  helperText,
  inputRef,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputRow}>
        <input
          ref={inputRef}
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
      <HelperTextBetterA11y id={id} helperText={helperText} />
      <ErrorMessageBetterA11y error={error} id={`${id}Error`} />
    </div>
  );
}
