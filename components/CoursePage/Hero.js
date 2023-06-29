import { Button } from "react-bootstrap";

import Image from "next/image";

export default function Hero({ course }) {
  return (
    <div className="section-standard background-quaternary pt-70">
      <div className="row d-flex-center">
        <div className="col-10 col-md-5">
          <div className="inner-content">
            <h1 className="header-large">{course.title}</h1>
            <h5 className="mb-3">{course.header}</h5>
            <p className="p-large not-centered">{course.subHeader}</p>
            <Button
              className="button-standard"
              onClick={() => {
                document.querySelector("#overview").scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {course.findOutMore} &darr;
            </Button>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mt-4">
          <Image
            src={`/courses/${course.slug}.png`}
            alt={`course mascot: ${course.slug}`}
            width={200}
            height={200}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
