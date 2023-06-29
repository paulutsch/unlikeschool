import { useContext } from "react";
import { Text } from "../../api/Context/Text";

import Link from "next/link";
import { Button } from "react-bootstrap";

const Cancel = () => {
  const text = useContext(Text);
  const cancel = text.cancel;

  return (
    <div className="section-standard d-flex-center text-center">
      <div className="max-width-800">
        <h1>{cancel.header}</h1>
        <p>{cancel.description}</p>
        <p>{cancel.tryAgain}</p>
        <Link
          className="d-block mb-3"
          href={`mailto:info@unlike.school?subject=${cancel.mailSubject}.`}
        >
          info@unlike.school
        </Link>
        <Link href="/register">
          <Button className="button-standard">{cancel.return}</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
