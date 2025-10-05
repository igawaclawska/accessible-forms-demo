import ErrorMessagePoorA11y from "./ErrorMessagePoorA11y";
import styles from "./TextInputPoorA11y.module.css";

export default function TextInputPoorA11y({
  id,
  label,
  name,
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
        name={name}
        value={value}
        onChange={onChange}
        placeholder={helperText}
      />
      <ErrorMessagePoorA11y error={error} />
    </div>
  );
}
