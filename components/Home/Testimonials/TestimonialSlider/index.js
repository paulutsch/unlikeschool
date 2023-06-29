import { useState } from "react";
import Testimonial from "./Testimonial";

import styles from "../../../../styles/TestimonialSlider.module.css";

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
  };

  return (
    <div className="d-flex-center">
      {/* <button
        className={styles.prev}
        onClick={prevTestimonial}
      >
        &lt;
      </button> */}
      <div className={styles.container}>
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            testimonial={testimonial}
            currentIndex={currentIndex}
            index={index}
          />
        ))}
      </div>
      {/* <button
        className={styles.next}
        onClick={nextTestimonial}
      >
        &gt;
      </button> */}
    </div>
  );
};

export default TestimonialSlider;
