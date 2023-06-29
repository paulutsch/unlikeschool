import { useContext } from "react";
import { Text } from "../../../api/Context/Text";

import SendInBlue from "./SendInBlue";

export default function Newsletter() {
  const text = useContext(Text);

  return (
    <div id="newsletter" className="section-standard">
      <div className="row d-flex-center">
        <div className="col-10 col-md-8 col-lg-7 text-center">
          <div className="row">
            <div className="col-12">
              <h1 className="header-large">{text.newsletter.title}</h1>
            </div>
          </div>
          <div className={"row d-flex-center"}>
            <SendInBlue text={text.newsletter} />
          </div>
        </div>
      </div>
    </div>
  );
}
