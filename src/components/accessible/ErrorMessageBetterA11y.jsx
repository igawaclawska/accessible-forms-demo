import ErrorIcon from "./icons/ErrorIcon";
import styles from "./ErrorMessageBetterA11y.module.css";

export default function ErrorMessageBetterA11y({ error, id }) {
  if (!error) return null;
  return (
    <div className={styles.errorMsg} id={id}>
      <span className={styles.errorSpan} aria-hidden="true">
        <ErrorIcon />
      </span>
      {error}
    </div>
  );
}
