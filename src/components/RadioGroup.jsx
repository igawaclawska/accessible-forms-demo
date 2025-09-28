import ErrorMessage from "./ErrorMessage";
import styles from "./RadioGroup.module.css";
import errorStyles from "./ErrorMessage.module.css";

export default function RadioGroup({
  label,
  options,
  selected,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={styles.styledRadioGroup}
      aria-describedby={error ? `${label.replace(/\s/g, "")}Error` : undefined}
    >
      <div className={styles.radioGroupLabel}>{label}:</div>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={`team-${option.value.replace("+", "plus")}`}
            name={label}
            value={option.value}
            checked={selected === option.value}
            onChange={onChange}
            onBlur={onBlur}
            className={styles.styledInput}
            required
            aria-invalid={!!error}
          />
          <label
            htmlFor={`team-${option.value.replace("+", "plus")}`}
            className={styles.optionLabel}
          >
            {option.label}
          </label>
        </div>
      ))}
      {error && (
        <div
          className={errorStyles.errorMsg}
          id={`${label.replace(/\s/g, "")}Error`}
          role="alert"
          aria-live="polite"
        >
          <ErrorMessage error={error} />
        </div>
      )}
    </div>
  );
}
