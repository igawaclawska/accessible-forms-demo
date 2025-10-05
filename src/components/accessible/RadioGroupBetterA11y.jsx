import ErrorMessageBetterA11y from "./ErrorMessageBetterA11y";
import styles from "./RadioGroupBetterA11y.module.css";

export default function RadioGroupBetterA11y({
  label,
  options,
  selected,
  onChange,
  onBlur,
  error,
  name,
  inputRef,
}) {
  const groupName = name || label.replace(/\s/g, "").toLowerCase();
  const errorId = errorMessage ? `${id}-error` : "";

  return (
    <fieldset
      className={styles.styledRadioGroup}
      aria-describedby={`${errorId}`}
    >
      <legend className={styles.radioGroupLabel}>{label}:</legend>
      {options.map((option, idx) => {
        const optionId = `${groupName}-${option.value.replace(
          /[^a-zA-Z0-9]/g,
          ""
        )}`;
        return (
          <div className={styles.optionWrapper} key={option.value}>
            <input
              ref={inputRef ? inputRef[idx] : undefined}
              type="radio"
              id={optionId}
              name={groupName}
              value={option.value}
              checked={selected === option.value}
              onChange={onChange}
              onBlur={onBlur}
              className={styles.styledInput}
              aria-invalid={!!error}
            />
            <label htmlFor={optionId} className={styles.optionLabel}>
              {option.label}
            </label>
          </div>
        );
      })}
      <ErrorMessageBetterA11y error={error} id={errorId} />
    </fieldset>
  );
}
