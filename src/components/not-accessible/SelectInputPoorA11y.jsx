import ErrorMessagePoorA11y from "./ErrorMessagePoorA11y";
import styles from "./SelectInputPoorA11y.module.css";

export default function SelectInputPoorA11y({
  id,
  label,
  value,
  onChange,
  options,
  error,
  inputRef,
}) {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <select ref={inputRef} id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessagePoorA11y error={error} id={`${id}Error`} />
    </div>
  );
}
