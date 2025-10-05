import styles from "./CheckboxGroupBetterA11y.module.css";
import ErrorMessageBetterA11y from "./ErrorMessageBetterA11y";

export default function CheckboxGroupBetterA11y({
  label,
  options,
  selected,
  onChange,
  onBlur,
  error,
  inputRef,
}) {
  const errorId = errorMessage ? `${id}-error` : "";

  return (
    <fieldset
      className={styles.styledCheckboxGroup}
      aria-describedby={`${helperId} ${errorId}`}
    >
      <legend className={styles.groupLabel}>{label}</legend>
      {options.map((option, idx) => (
        <div className={styles.optionWrapper} key={option.value}>
          <input
            ref={inputRef ? inputRef[idx] : undefined}
            type="checkbox"
            id={`interest-${option.value}`}
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
            onBlur={onBlur}
            className={styles.hiddenInput}
            aria-invalid={!!error}
            aria-describedby={`${errorId}`}
          />
          <label
            htmlFor={`interest-${option.value}`}
            className={styles.optionLabel}
          >
            {option.label}
          </label>
        </div>
      ))}
      <ErrorMessageBetterA11y error={error} id={errorId} />
    </fieldset>
  );
}
