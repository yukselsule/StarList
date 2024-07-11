import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; Copyright {new Date().getFullYear()} StarList</p>
    </footer>
  );
}

export default Footer;
