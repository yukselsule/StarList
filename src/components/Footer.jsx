import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} StarList. Film data from{" "}
        <a href="https://www.themoviedb.org/">TMDB</a>
      </p>
    </footer>
  );
}

export default Footer;
