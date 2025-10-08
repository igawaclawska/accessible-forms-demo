import ErrorMessageBetterA11y from "./ErrorMessageBetterA11y";
import styles from "./SelectInputBetterA11y.module.css";

export default function SelectInputBetterA11y({
  id,
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  inputRef,
}) {
  const errorId = error ? `${id}-error` : "";

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <select
        ref={inputRef}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={`${errorId}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessageBetterA11y error={error} id={errorId} />
    </div>
  );
}
