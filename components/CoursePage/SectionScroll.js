import ContentScroll from "./ContentScroll";

import styles from "../../styles/CoursePage.module.css";

export default function SectionScroll({ course }) {
  return (
    <div
      id="sections"
      className={`section-standard ${styles.scrollPageWrapOuter}`}
    >
      <div className={styles.scrollPageWrapInner}>
        <div className="row d-flex-center">
          <div className="col-12">
            <h1 className="header-large">{course.sections.name}</h1>

            <ContentScroll items={course.sections.sections} />
          </div>
        </div>
      </div>
    </div>
  );
}
