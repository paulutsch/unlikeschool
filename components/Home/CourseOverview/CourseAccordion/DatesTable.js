import { useContext } from "react";
import { Language } from "../../../../api/Context/Language";
import { Text } from "../../../../api/Context/Text";
import { CourseDates } from "../../../../api/Context/CourseDates";

import { Button, Table } from "react-bootstrap";
import { BarLoader } from "react-spinners";

import Link from "next/link";

export default function DatesTable({ course }) {
  const language = useContext(Language);
  const text = useContext(Text);
  const courseDates = useContext(CourseDates);

  if (courseDates.areLoading) {
    return <BarLoader color="var(--secondary-color)" />;
  }

  const thisCourseDates = courseDates[course.slug];

  if (thisCourseDates.length === 0) {
    return <>{text.courseFull}</>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{text.course}</th>
        </tr>
      </thead>
      <tbody>
        {thisCourseDates.map((date, index) => (
          <tr key={index}>
            <td className="align-middle">
              <div className="d-flex-between">
                <div className="mx-2">
                  <p className="m-1">{date.ageGroup + " Jahre"}</p>
                  <p className="m-1">
                    {new Intl.DateTimeFormat(language, {
                      weekday: "short",
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(date.date)) + " Uhr"}
                  </p>
                </div>
                <div className="mx-2">
                  <Link href="/register">
                    <Button className="button-standard">{text.select}</Button>
                  </Link>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
