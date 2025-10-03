import ErrorMessage from "./ErrorMessage";
import styles from "./PasswordInput.module.css";

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  error,
  helperText,
  inputRef,
}) {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>

      <input
        ref={inputRef}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={helperText}
      />
      <ErrorMessage error={error} id={`${id}Error`} />
    </div>
  );
}
