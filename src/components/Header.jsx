import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <span className={styles.companyName}>Accessible Forms Demo</span>
        </div>
        <nav className={styles.headerNav} aria-label="Main navigation">
          <Link
            to="/poor-accessibility"
            className={`${styles.headerLink} ${
              location.pathname === "/poor-accessibility" ? styles.active : ""
            }`}
          >
            Poor Accessibility
          </Link>
          <Link
            to="/"
            className={`${styles.headerLink} ${
              location.pathname === "/" ? styles.active : ""
            }`}
          >
            Enhanced Accessibility
          </Link>
        </nav>
      </div>
    </header>
  );
}
