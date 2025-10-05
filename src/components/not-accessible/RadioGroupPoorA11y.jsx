import ErrorMessagePoorA11y from "./ErrorMessagePoorA11y";
import styles from "./RadioGroupPoorA11y.module.css";

export default function RadioGroupPoorA11y({
  label,
  options,
  selected,
  onChange,
  error,
  name,
}) {
  const groupName = name || label.replace(/\s/g, "").toLowerCase();
  const errorId = `radio-group-error-${label.replace(/\s/g, "")}`;

  const handleClick = (value) => {
    if (onChange) {
      onChange({ target: { name: groupName, value } });
    }
  };

  return (
    <div className={styles.styledRadioGroup}>
      <label className={styles.radioGroupLabel}>{label}:</label>

      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <div
            key={option.value}
            className={styles.optionWrapper}
            onClick={() => handleClick(option.value)}
          >
            <div
              className={`${styles.optionLabel} ${
                isSelected ? styles.optionSelected : ""
              }`}
            >
              <span
                className={`${styles.radioCircle} ${
                  isSelected ? styles.radioCircleChecked : ""
                }`}
              />
              {option.label}
            </div>
          </div>
        );
      })}

      <ErrorMessagePoorA11y error={error} id={`${errorId}Error`} />
    </div>
  );
}
