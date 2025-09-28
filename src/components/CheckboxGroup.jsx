import styles from "./CheckboxGroup.module.css";
import errorStyles from "./ErrorMessage.module.css";
import ErrorMessage from "./ErrorMessage";

export default function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={styles.styledCheckboxGroup}
      aria-describedby={error ? `${label.replace(/\s/g, "")}Error` : undefined}
    >
      <div className={styles.groupLabel}>{label}</div>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="checkbox"
            id={`interest-${option.value}`}
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
            onBlur={onBlur}
            className={styles.hiddenInput}
            aria-invalid={!!error}
          />
          <label
            htmlFor={`interest-${option.value}`}
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
