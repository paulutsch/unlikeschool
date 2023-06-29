import { useContext } from "react";
import { Text } from "../../../../api/Context/Text";

import { Accordion, Button } from "react-bootstrap";

import Image from "next/image";
import Link from "next/link";

import DatesTable from "./DatesTable.js";

export default function CourseAccordion() {
  const text = useContext(Text);

  return (
    <Accordion className="m-4 mx-0">
      {text.courses.map((course, idx) => (
        <Accordion.Item eventKey={idx} key={course.title}>
          <div className="row d-flex-center">
            <Accordion.Header>
              <div className="col-2 swordDiv">
                {text.courses.map((_, _idx) => (
                  <Image
                    src="/sword.png"
                    alt="Minecraft Sword"
                    width={20}
                    height={20}
                    style={{
                      opacity: _idx <= idx ? 1 : 0.25,
                    }}
                    key={`sword_${idx}${_idx}`}
                  />
                ))}
              </div>
              <div className="col-7">
                <h3 className="m-0 p-large not-centered">{course.title}</h3>
              </div>
            </Accordion.Header>
          </div>
          <Accordion.Body>
            <div className="row">
              <div className="col-12 d-flex flex-column justify-content-between">
                <div className="row d-flex-between flex-row-reverse">
                  <div className="col-12 col-md-6">
                    <div className="d-flex-between flex-column">
                      <div className="info">
                        <p className="m-1">📅 {course.weeklyMeets}</p>
                        <p className="m-1">🔄 {course.duration}</p>
                        <p className="m-1">⏳ {course.minutes}</p>
                        <p className="m-1">
                          <span className="price">{course.costPerLesson}</span>
                          {" " + course.costPerLessonText}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <hr className="d-sm-block d-md-none" />
                    <span className="arrowDiv"></span>
                    <p className="m-0">{course.overview[0]}</p>
                    <p className="m-0">{course.overview[1]}</p>
                    <div className="mt-2">
                      <Link href={`/courses/${course.slug}`}>
                        <Button className="button-standard">
                          {text.toCourse} &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />

                <DatesTable course={course} />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
