import styles from "./CheckboxGroupPoorA11y.module.css";
import ErrorMessagePoorA11y from "./ErrorMessagePoorA11y";

export default function CheckboxGroupPoorA11y({
  label,
  options,
  selected,
  onChange,
  error,
}) {
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

      <ErrorMessagePoorA11y error={error} />
    </div>
  );
}
