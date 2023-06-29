import { useContext } from "react";
import { Text } from "../../api/Context/Text";

import { Button } from "react-bootstrap";
import Link from "next/link";

export default function CTA() {
  const text = useContext(Text);
  const cta = text.callToAction;

  return (
    <div className="section-standard background-tertiary">
      <div className="col-11 col-md-10 d-flex-center flex-column text-center max-width-800">
        <h1 className="header-large">{cta.callToAction}</h1>
        <p className="p-large">{cta.wrapup}</p>
        <p className="p-large">{cta.hitHome}</p>
        <Link href="/register" passHref>
          <Button className="button-standard link-large">{cta.enroll}</Button>
        </Link>
      </div>
    </div>
  );
}
