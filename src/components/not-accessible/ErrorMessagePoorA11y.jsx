import ErrorIcon from "./icons/ErrorIcon";
import styles from "./ErrorMessagePoorA11y.module.css";

export default function ErrorMessagePoorA11y({ error }) {
  if (!error) return null;
  return (
    <div className={styles.errorMsg}>
      <span className={styles.errorSpan}>
        <ErrorIcon />
      </span>
      {error}
    </div>
  );
}
