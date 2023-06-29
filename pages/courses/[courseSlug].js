import { useContext } from "react";
import { Text } from "../../api/Context/Text";

import Head from "next/head";

import Hero from "../../components/CoursePage/Hero";
import CourseOverview from "../../components/CoursePage/CourseOverview";
import SectionScroll from "../../components/CoursePage/SectionScroll";
import CTA from "../../components/CoursePage/CTA";

Course.getInitialProps = ({ query }) => {
  const { courseSlug } = query;
  return { courseSlug };
};

export default function Course({ courseSlug }) {
  const text = useContext(Text);
  const course = text.courses.find((c) => c.slug === courseSlug);

  return (
    <div className="container-standard">
      <Head>
        <title>{course.title} - Unlike School</title>
      </Head>
      <Hero course={course} />
      <CourseOverview course={course} />
      {/* <SectionScroll course={course} /> */}
      <CTA course={course} />
    </div>
  );
}
