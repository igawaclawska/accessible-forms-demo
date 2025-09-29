import ErrorMessage from "./ErrorMessage";
import styles from "./TextareaInput.module.css";
import HelperText from "./HelperText";

export default function TextareaInput({
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
      <HelperText id={id} helperText={helperText} />
      <ErrorMessage error={error} id={`${id}Error`} />
    </div>
  );
}
