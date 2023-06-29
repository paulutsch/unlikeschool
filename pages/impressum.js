import { useContext } from "react";
import { Text } from "../api/Context/Text";

import Impressum from "../components/Impressum";

export default function ImpressumPage() {
  const text = useContext(Text);
  const legalNotice = text.legalNotice;

  return (
    <div>
      <Impressum text={legalNotice} />
    </div>
  );
}
