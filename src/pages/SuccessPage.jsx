import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./FormAccessibilityPage.module.css";

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <title>Success Page</title>
        <h1 id="successTitle">Registration Successful!</h1>
        <p>
          We're excited to welcome you! Your registration has been received and
          everything looks great.
        </p>
        <p>
          You’ll hear from us soon with more details. In the meantime, feel free
          to explore our site or reach out if you have any questions.
        </p>
        <p>Thank you for joining our community!</p>
      </main>
      <Footer />
    </>
  );
}
