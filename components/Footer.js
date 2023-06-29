import React from "react";
import styles from "../styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>&copy; {currentYear} Unlike School</span>
        <Link href="/impressum" className={styles.link}>
          Impressum
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
