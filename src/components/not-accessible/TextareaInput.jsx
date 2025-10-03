import ErrorMessage from "./ErrorMessage";
import styles from "./TextareaInput.module.css";

export default function TextareaInput({
  id,
  label,
  value,
  onChange,
  error,
  helperText,
  maxLength,
}) {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <textarea
        id={id}
        rows={5}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={helperText}
      />
      <ErrorMessage error={error} id={`${id}Error`} />
    </div>
  );
}
