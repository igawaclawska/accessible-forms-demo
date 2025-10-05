import styles from "./TextareaInputBetterA11y.module.css";
import HelperTextBetterA11y from "./HelperTextBetterA11y";
import { useEffect, useState } from "react";

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
  const errorId = error ? `${id}-error` : "";

  const [delayedHelperText, setDelayedHelperText] = useState(helperText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedHelperText(helperText);
    }, 2000);
    return () => clearTimeout(timer);
  }, [helperText, value]);

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
      <HelperTextBetterA11y helperText={helperText} />

      {/* Screen-reader-only counter with 500ms delay */}
      <div
        id={helperId}
        aria-live="polite"
        style={{ position: "absolute", left: "-9999px" }}
      >
        {delayedHelperText} characters remaining
      </div>
    </div>
  );
}
