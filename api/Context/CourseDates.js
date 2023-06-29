import { useState, useEffect, createContext } from "react";
import { fetchCourseDates } from "../firebase";

const CourseDates = createContext();

const CourseDatesProvider = (props) => {
  const [courseDates, setCourseDates] = useState({ areLoading: true });

  useEffect(() => {
    async function setDates() {
      try {
        const res = await fetchCourseDates();
        const courseDates = res.data;

        const availableCourseDates = Object.fromEntries(
          Object.entries(courseDates).map(([slug, dates]) => [
            slug,
            dates.filter(
              (courseDate) =>
                courseDate.isAvailable && new Date(courseDate.date) > new Date()
            ),
          ])
        );

        setCourseDates(availableCourseDates);
      } catch (e) {
        console.error("error fetching course dates: ", e);
      }
    }

    setDates();
  }, []);

  return (
    <CourseDates.Provider value={courseDates}>
      {props.children}
    </CourseDates.Provider>
  );
};

export { CourseDates, CourseDatesProvider };
