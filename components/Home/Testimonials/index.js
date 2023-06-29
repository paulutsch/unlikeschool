import { useContext } from "react";
import { Text } from "../../../api/Context/Text";

import TestimonialSlider from "./TestimonialSlider";
import Trustpilot from "./Trustpilot";

export default function Testimonials() {
  const text = useContext(Text);
  const testimonials = text.testimonials;
  const trustpilotNote = text.trustpilotNote;

  return (
    <div className="section-standard d-flex-center flex-column">
      <TestimonialSlider testimonials={testimonials} />
      <Trustpilot trustpilotNote={trustpilotNote} />
    </div>
  );
}
