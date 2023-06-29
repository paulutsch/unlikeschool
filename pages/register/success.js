import { useContext } from "react";
import { Text } from "../../api/Context/Text";

import Link from "next/link";
import { Button } from "react-bootstrap";

const Success = () => {
  const text = useContext(Text);
  const success = text.success;

  return (
    <div className="section-standard d-flex-center text-center">
      <div className="max-width-800">
        <h1>{success.header}</h1>
        <p>{success.description}</p>
        <p>{success.confirmationMail}</p>{" "}
        <Link
          className="d-block mb-3"
          href={`mailto:info@unlike.school?subject=${success.mailSubject}`}
        >
          info@unlike.school
        </Link>
        <Link href="/">
          <Button className="button-standard">{success.return}</Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
