import ErrorMessage from "./ErrorMessage";
import styles from "./TextInput.module.css";
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
      <HelperText id={id} helperText={helperText} />
      <ErrorMessage error={error} id={`${id}Error`} />
    </div>
  );
}
