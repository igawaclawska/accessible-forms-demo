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
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        rows={5}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-describedby={error ? `${id}Error ${id}Help` : `${id}Help`}
        aria-invalid={!!error}
        maxLength={maxLength}
      />
      <HelperTextBetterA11y id={id} helperText={helperText} />
      <ErrorMessageBetterA11y error={error} id={`${id}Error`} />
    </div>
  );
}
