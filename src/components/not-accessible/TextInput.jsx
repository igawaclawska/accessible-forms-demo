import ErrorMessage from "./ErrorMessage";
import styles from "./TextInput.module.css";

export default function TextInput({
  id,
  label,
  value,
  onChange,
  error,
  helperText,
}) {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={helperText}
      />
      <ErrorMessage error={error} id={`${id}Error`} />
    </div>
  );
}
