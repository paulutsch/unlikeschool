import Link from "next/link";
import { Button } from "react-bootstrap";

import styles from "../../styles/CoursePage.module.css";

export default function CTA({ course }) {
  return (
    <div id="call-to-action" className="section-standard background-tertiary">
      <div className="d-flex-center flex-column text-center">
        <h1 className="header-large">{course.callToAction}</h1>
        <div className={styles.content}>
          <p className="p-large m-0">{course.wrapup}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.infoTag}>📅 {course.weeklyMeets}</p>
          <p className={styles.infoTag}>🔄 {course.duration}</p>
          <p className={styles.infoTag}>⏳ {course.minutes}</p>
          <p className={styles.infoTagLast}>
            <span className="price">{course.costPerLesson}</span>
            {" " + course.costPerLessonText}
          </p>
        </div>
        <div className={styles.cta}></div>
        <Link href="/register">
          <Button className="button-standard link-large">
            {course.enroll}
          </Button>
        </Link>
        <p className="mb-5">
          <span className={styles.installmentOptions}>
            {course.installmentOptionsText}
          </span>
        </p>
      </div>
    </div>
  );
}
