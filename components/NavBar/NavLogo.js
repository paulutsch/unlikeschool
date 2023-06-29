import Link from "next/link";
import Image from "next/image";

import styles from "../../styles/NavBar.module.css";

const NavLogo = () => {
  return (
    <Link href="/">
      <Image
        className={styles.logo}
        src="/logo.svg"
        width="223"
        height="30"
        alt="Unlike School Logo"
      />
    </Link>
  );
};

export default NavLogo;
