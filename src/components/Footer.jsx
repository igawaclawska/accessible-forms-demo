import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerBrand}>Accessible Forms Demo</p>
        <nav className={styles.footerNav}>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            GitHub
          </a>
          <a href="mailto:info@brightpath.com" className={styles.footerLink}>
            Contact
          </a>
        </nav>
        <p className={styles.footerCopyright}>
          &copy; {new Date().getFullYear()} Accessible Forms Demo. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
