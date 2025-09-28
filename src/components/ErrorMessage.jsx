import ErrorIcon from "./icons/ErrorIcon";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <>
      <span className={styles.errorSpan} aria-hidden="true">
        <ErrorIcon />
      </span>
      {error}
    </>
  );
}
