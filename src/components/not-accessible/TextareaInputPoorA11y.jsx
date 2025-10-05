import ErrorMessagePoorA11y from "./ErrorMessagePoorA11y";
import styles from "./TextareaInputPoorA11y.module.css";

export default function TextareaInputPoorA11y({
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
      <ErrorMessagePoorA11y error={error} id={`${id}Error`} />
    </div>
  );
}
