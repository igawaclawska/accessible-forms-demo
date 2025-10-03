import styles from "./HelperText.module.css";

export default function HelperText({ id, helperText }) {
  if (!helperText) return null;
  return (
    <p id={`${id}Help`} className={styles.helperText}>
      {helperText}
    </p>
  );
}
