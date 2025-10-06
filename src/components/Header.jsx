import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <span className={styles.companyName}>Accessible Forms Demo</span>
        </div>
        <nav className={styles.headerNav} aria-label="Main navigation">
          <Link to="/poor-accessibility" className={styles.headerLink}>
            Poor Accessibility
          </Link>
          <Link to="/" className={styles.headerLink}>
            Enhanced Accessibility
          </Link>
        </nav>
      </div>
    </header>
  );
}
