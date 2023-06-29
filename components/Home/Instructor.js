import { useContext } from "react";
import { Text } from "../../api/Context/Text";

import { Accordion } from "react-bootstrap";
import Image from "next/image";

export default function Instructor() {
  const text = useContext(Text);

  return (
    <div id="instructor" className="section-standard">
      <div className="row d-flex-center">
        <div className="col-10">
          <div className="row d-flex-center pb-5">
            <div className="col-12 col-md-6 col-lg-6">
              <h1 className="header-large">
                {text.instructor.meetYourInstructor}
              </h1>
              <p className="p-large not-centered m-0 mb-3">
                {text.instructor.intro}
              </p>
              <Accordion key="instructors_journey_paul">
                <Accordion.Item eventKey={text.instructor.name}>
                  <div className="row d-flex-center">
                    <Accordion.Header>
                      <div className="col-8">
                        <h5 className="m-0">{text.instructor.journey}</h5>
                      </div>
                    </Accordion.Header>
                  </div>
                  <Accordion.Body>
                    <div className="row align-items-center">
                      <div className="col-12 d-flex-between flex-column">
                        <div style={{ listStyleType: "none", paddingLeft: 0 }}>
                          {text.instructor.qualifications.map(
                            (qualification, idx) => (
                              <p
                                className="p-small not-centered m-0 mb-2"
                                key={`${text.instructor.name}_qfc_${idx}`}
                              >
                                {qualification}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="col-12 col-md-6 col-lg-5 p-0 d-flex-center h-100 m-4 mx-0 px-3">
              <div className="circle">
                <Image
                  src="/instructor.jpg"
                  alt="Image of Paul"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
