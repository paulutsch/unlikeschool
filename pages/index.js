import Hero from "../components/Home/Hero";
import Testimonials from "../components/Home/Testimonials";
import CourseOverview from "../components/Home/CourseOverview";
import Benefits from "../components/Home/Benefits";
import Instructor from "../components/Home/Instructor";
import Newsletter from "../components/Home/Newsletter";
import CTA from "../components/Home/CTA";
import FAQs from "../components/Home/FAQs";
import Contact from "../components/Home/Contact";

export default function Home(props) {
  return (
    <div className="container-standard">
      <Hero />
      <Testimonials />
      <CourseOverview />
      <Benefits />
      <Instructor />
      <Newsletter />
      <CTA />
      <FAQs />
      <Contact />
    </div>
  );
}
