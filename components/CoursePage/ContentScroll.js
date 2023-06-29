import { useState, useEffect } from "react";

import styles from "../../styles/CoursePage.module.css";

const ContentScroll = ({ items }) => {
  const boxContentWidth = 300;
  const [activeIndex, setActiveIndex] = useState(0);
  const [boxWidth, setBoxWidth] = useState(600);
  const [emptyBoxWidth, setEmptyBoxWidth] = useState(0);

  const numBoxes = items.length + 2;
  const totalBoxWidth = numBoxes * boxWidth;

  const handleArrowClick = (direction) => {
    const horizontalScroll = document.getElementById("horizontalScroll");
    const scrollContent = document.getElementById("scrollContent");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");

    const scrollContentWidth = scrollContent.clientWidth;
    const numBoxesPerPage = Math.floor(scrollContentWidth / boxWidth);
    let newActiveIndex = activeIndex;

    if (direction === "left") {
      newActiveIndex = activeIndex > 0 ? activeIndex - 1 : 0;
    } else if (direction === "right") {
      newActiveIndex =
        activeIndex < items.length - 1 ? activeIndex + 1 : items.length - 1;
    }

    if (newActiveIndex === 0) {
      leftArrow.style.opacity = "0";
    } else {
      leftArrow.style.opacity = "1";
    }
    if (newActiveIndex === items.length - 1) {
      rightArrow.style.opacity = "0";
    } else {
      rightArrow.style.opacity = "1";
    }

    setActiveIndex(newActiveIndex);
    const newScrollLeft = newActiveIndex * boxWidth;

    horizontalScroll.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const _emptyBoxWidth = Math.max(0, (window.innerWidth - boxWidth) / 2);
    if (window.innerWidth < boxWidth) {
      setBoxWidth(window.innerWidth);
    }

    setEmptyBoxWidth(_emptyBoxWidth);
  }, [boxWidth]);

  return (
    <div className={styles.scrollWrapper}>
      <div id="horizontalScroll" className={styles.horizontalScroll}>
        <div
          id="scrollContent"
          className={styles.scrollContent}
          style={{ width: `${totalBoxWidth}px` }}
        >
          <div
            className={`${styles.box} ${styles.emptyBox}`}
            style={{ width: `${emptyBoxWidth}px` }}
          />
          {items.map((item, index) => (
            <div
              className={`${styles.box} ${
                index === activeIndex ? styles.active : ""
              }`}
              style={{ width: `${boxWidth}px` }}
              key={index}
              onClick={() =>
                index > activeIndex
                  ? handleArrowClick("right")
                  : handleArrowClick("left")
              }
            >
              <div
                className="d-flex-center"
                style={{ width: `${boxContentWidth}px` }}
              >
                <div>
                  <h1>{item.title}</h1>
                  <p>{item.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div
            className={`${styles.box} ${styles.emptyBox}`}
            style={{ width: `${emptyBoxWidth}px` }}
          />
        </div>
      </div>
      <div
        id="leftArrow"
        className={`${styles.arrow} ${styles.leftArrow}`}
        opacity={activeIndex === 0 ? 0 : 1}
        onClick={() => handleArrowClick("left")}
      >
        &larr;
      </div>
      <div
        id="rightArrow"
        className={`${styles.arrow} ${styles.rightArrow}`}
        onClick={() => handleArrowClick("right")}
      >
        &rarr;
      </div>
    </div>
  );
};

export default ContentScroll;
