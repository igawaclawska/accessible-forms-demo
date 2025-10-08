import ErrorMessagePoorA11y from "./ErrorMessagePoorA11y";
import styles from "./PasswordInputPoorA11y.module.css";

export default function PasswordInputPoorA11y({
  id,
  label,
  name,
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
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={helperText}
      />
      <ErrorMessagePoorA11y error={error} />
    </div>
  );
}
