import ErrorMessageBetterA11y from "./ErrorMessageBetterA11y";
import styles from "./SelectInputBetterA11y.module.css";

export default function SelectInputBetterA11y({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  options,
  error,
  inputRef,
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <select
        ref={inputRef}
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
      <ErrorMessageBetterA11y error={error} id={`${id}Error`} />
    </div>
  );
}
