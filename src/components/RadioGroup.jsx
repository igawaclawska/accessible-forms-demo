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
  name, // add a name prop for uniqueness
}) {
  const groupName = name || label.replace(/\s/g, "").toLowerCase();

  return (
    <fieldset
      className={styles.styledRadioGroup}
      aria-describedby={error ? `${groupName}Error` : undefined}
    >
      <legend className={styles.radioGroupLabel}>{label}:</legend>
      {options.map((option) => {
        const optionId = `${groupName}-${option.value.replace(
          /[^a-zA-Z0-9]/g,
          ""
        )}`;
        return (
          <div className={styles.optionWrapper} key={option.value}>
            <input
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
      {error && (
        <div
          className={errorStyles.errorMsg}
          id={`${groupName}Error`}
          role="alert"
          aria-live="polite"
        >
          <ErrorMessage error={error} />
        </div>
      )}
    </fieldset>
  );
}
