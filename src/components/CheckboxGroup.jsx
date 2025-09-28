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
  const errorId = `checkbox-group-error-${label.replace(/\s/g, "")}`;

  return (
    <fieldset
      className={styles.styledCheckboxGroup}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className={styles.groupLabel}>{label}</legend>
      {options.map((option) => (
        <div className={styles.optionWrapper} key={option.value}>
          <input
            type="checkbox"
            id={`interest-${option.value}`}
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
            onBlur={onBlur}
            className={styles.hiddenInput}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
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
          id={errorId}
          role="alert"
          aria-live="polite"
        >
          <ErrorMessage error={error} />
        </div>
      )}
    </fieldset>
  );
}
