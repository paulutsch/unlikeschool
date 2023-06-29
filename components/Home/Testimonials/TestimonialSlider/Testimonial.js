import Image from "next/image";
import Link from "next/link";

import styles from "../../../../styles/Testimonial.module.css";

const Testimonial = ({ testimonial, currentIndex, index }) => {
  const isActive = currentIndex === index;

  return (
    <div className={`${styles.testimonial} ${isActive ? styles.active : ""}`}>
      <div className={styles.testimonialRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Image
            key={star}
            className={styles.star}
            src={
              star <= testimonial.rating
                ? "/star_filled.svg"
                : "/star_empty.svg"
            }
            alt="Star"
            width={20}
            height={20}
          />
        ))}
      </div>
      {/* <h5>{testimonial.title}</h5> */}
      <blockquote className={styles.testimonialText}>
        “{testimonial.text}”
      </blockquote>
      <p className={styles.testimonialAuthor}>- {testimonial.author}</p>
    </div>
  );
};

export default Testimonial;
