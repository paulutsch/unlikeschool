import { Nav, Button } from "react-bootstrap";
import Link from "next/link";

import NavToggle from "./NavToggle";

const NavLinks = ({ toggleOpen, links, enroll }) => {
  return (
    <Nav className="ml-auto align-items-center">
      {links.map((link, index) => (
        <Link
          className="mx-4 visible-lg color-primary p-standard"
          href={link.href}
          key={link.text}
        >
          {link.text}
        </Link>
      ))}

      <Link href="/register" passHref>
        <Button className="mx-3 visible-md button-standard">{enroll}</Button>
      </Link>
      <NavToggle toggleOpen={toggleOpen} />
    </Nav>
  );
};

export default NavLinks;
