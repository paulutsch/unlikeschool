import { motion } from "framer-motion";
import { Nav } from "react-bootstrap";
import Link from "next/link";

import { variants } from "./motion";
import styles from "../../../styles/NavBar.module.css";

const MobileNav = ({ toggleOpen, links, enroll }) => {
  return (
    <motion.div
      className={"background-tertiary " + styles.background}
      variants={variants.div}
    >
      <motion.ul>
        <motion.li
          variants={variants.item}
          whileHover={{ color: "white" }}
          className={
            "mb-4 d-flex flex-row align-items-center justify-content-between " +
            styles.mobileNavItem
          }
        >
          <Nav.Link
            href={"/register"}
            className="text-justify background-tertiary "
            onClick={(event) => {
              toggleOpen();
            }}
          >
            {enroll}
          </Nav.Link>
        </motion.li>
        {links.map((link) => (
          <motion.li
            variants={variants.item}
            whileHover={{ color: "white" }}
            key={link.text}
            className={styles.mobileNavItem}
          >
            <Nav.Link
              href={link.href}
              className={"background-tertiary "}
              onClick={(event) => {
                toggle();
              }}
            >
              {link.text}
            </Nav.Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default MobileNav;
