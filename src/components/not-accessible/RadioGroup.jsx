import ErrorMessage from "./ErrorMessage";
import styles from "./RadioGroup.module.css";

export default function RadioGroup({
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
  const errorId = `radio-group-error-${label.replace(/\s/g, "")}`;

  return (
    <fieldset
      className={styles.styledRadioGroup}
      aria-describedby={error ? `${groupName}Error` : undefined}
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
            />
            <label htmlFor={optionId} className={styles.optionLabel}>
              {option.label}
            </label>
          </div>
        );
      })}
      <ErrorMessage error={error} id={`${errorId}Error`} />
    </fieldset>
  );
}
