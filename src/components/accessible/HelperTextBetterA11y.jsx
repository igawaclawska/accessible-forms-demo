import styles from "./HelperTextBetterA11y.module.css";

export default function HelperTextBetterA11y({ id, helperText }) {
  if (!helperText) return null;
  return (
    <p id={id} className={styles.helperText}>
      {helperText}
    </p>
  );
}
