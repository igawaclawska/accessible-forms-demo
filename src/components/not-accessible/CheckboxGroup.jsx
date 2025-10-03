import styles from "./CheckboxGroup.module.css";
import ErrorMessage from "./ErrorMessage";

export default function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  error,
}) {
  const errorId = `checkbox-group-error-${label.replace(/\s/g, "")}`;

  return (
    <div className={styles.styledCheckboxGroup}>
      <div className={styles.groupLabel}>{label}</div>

      {options.map((option) => {
        const isChecked = selected.includes(option.value);

        return (
          <div
            key={option.value}
            onClick={() => onChange(option.value)}
            className={styles.optionWrapper}
          >
            <div
              className={`${styles.optionLabel} ${
                isChecked ? styles.checked : ""
              }`}
            >
              {option.label}
            </div>
          </div>
        );
      })}

      <ErrorMessage error={error} id={`${errorId}Error`} />
    </div>
  );
}
