import ErrorMessage from "./ErrorMessage";
import styles from "./SelectInput.module.css";
import errorStyles from "./ErrorMessage.module.css";

export default function SelectInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  options,
  error,
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}Error` : undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div
          className={errorStyles.errorMsg}
          id={`${id}Error`}
          role="alert"
          aria-live="polite"
        >
          <ErrorMessage error={error} />
        </div>
      )}
    </div>
  );
}
