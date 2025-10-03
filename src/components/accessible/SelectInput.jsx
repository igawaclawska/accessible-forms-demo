import ErrorMessage from "./ErrorMessage";
import styles from "./SelectInput.module.css";

export default function SelectInput({
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
      <ErrorMessage error={error} id={`${id}Error`} />
    </div>
  );
}
