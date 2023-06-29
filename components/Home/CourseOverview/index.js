import { useContext } from "react";
import { Text } from "../../../api/Context/Text";

import CourseAccordion from "./CourseAccordion";

export default function CourseOverview() {
  const text = useContext(Text);

  return (
    <div id="courses" className="section-standard background-secondary">
      <div className="row d-flex-center w-100">
        <div className="col-12 d-flex flex-column align-items-center">
          <h1 className="header-large text-center">
            {text.courseOverview.title}
          </h1>
        </div>

        <div className={"col-12 col-md-9 col-lg-6 "}>
          <CourseAccordion />
        </div>
      </div>
    </div>
  );
}
