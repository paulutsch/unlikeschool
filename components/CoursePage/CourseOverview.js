export default function CourseOverview({ course }) {
  return (
    <div id="overview" className="section-standard">
      <div className="row d-flex-center">
        <div className="col-10">
          <h1 className="header-large">{course.courseDescription}</h1>
          <div className="row d-flex-center">
            <div className="col-12 col-md-4 mb-3">
              <h2>{course.content.name}</h2>
              {course.content.content.map((text, idx) => (
                <div className="d-flex" key={`text_content_${idx}`}>
                  <span className="d-inline">&rarr;</span>
                  <p className="mx-2 mb-2">{text}</p>
                </div>
              ))}
            </div>
            <div className="col-12 col-md-4 mb-3">
              <h2>{course.audience.name}</h2>
              {course.audience.audience.map((text, idx) => (
                <div className="d-flex" key={`text_audience_${idx}`}>
                  <span className="d-inline">&rarr;</span>
                  <p className="mx-2 mb-2">{text}</p>
                </div>
              ))}
            </div>
            <div className={"col-12 col-md-4 mb-3"}>
              <h2>{course.goals.name}</h2>
              {course.goals.goals.map((text, idx) => (
                <div className="d-flex" key={`text_goals_${idx}`}>
                  <span className="d-inline">&rarr;</span>
                  <p className="mx-2 mb-2">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
