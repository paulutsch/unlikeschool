import { useContext } from "react";
import { motion, useCycle } from "framer-motion";

import { Text } from "../../api/Context/Text";

import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";

import styles from "../../styles/NavBar.module.css";

const NavBar = ({ language, setLanguage }) => {
  const text = useContext(Text);

  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 5 }}
      className={styles.navBar}
    >
      <NavLogo />
      <NavLinks
        toggleOpen={toggleOpen}
        links={text.links}
        enroll={text.enroll}
      />
      <MobileNav toggle={toggleOpen} links={text.links} enroll={text.enroll} />
    </motion.div>
  );
};

export default NavBar;
