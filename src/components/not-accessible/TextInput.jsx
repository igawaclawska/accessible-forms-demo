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
      <label>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
      />
      <HelperText id={id} helperText={helperText} />
      <ErrorMessage error={error} id={`${id}Error`} />
    </div>
  );
}
