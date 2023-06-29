import { useContext } from "react";
import { Text } from "../../api/Context/Text";

import Link from "next/link";

export default function Contact() {
  const text = useContext(Text);
  const contact = text.contact;

  return (
    <div id="contact" className="section-standard background-tertiary">
      <div className="row d-flex-center text-center">
        <div className="col-11 col-md-10">
          <div className="row d-flex-center">
            <div className="col-12 col-md-7">
              <h1 className="header-large">{contact.contact}</h1>
              <p className="p-large">{contact.content}</p>
              <h3 className="p-large mb-0">
                <span
                  className="span-large"
                  role="img"
                  aria-label="email emoji"
                >
                  {"✉️ "}
                </span>
                <Link
                  className="link-large"
                  href={`mailto:info@unlike.school?subject=${contact.mailSubject}`}
                >
                  info@unlike.school
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
