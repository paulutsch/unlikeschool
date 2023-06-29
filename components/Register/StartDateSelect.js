import { useContext } from "react";
import { Language } from "../../api/Context/Language";
import { Text } from "../../api/Context/Text";
import { CourseDates } from "../../api/Context/CourseDates";

import { Button, Table, Form } from "react-bootstrap";

export default function StartDateSelect({ courseSlug, updateUserData }) {
  const language = useContext(Language);
  const text = useContext(Text);
  const courseDates = useContext(CourseDates);

  return (
    <div className="row" id="startDateSelect">
      <Form.Group className="col-12 mb-4">
        <Form.Label className="row p-large mb-1" htmlFor="startDate">
          {text.register.selectedStartDate}
        </Form.Label>
        {courseDates[courseSlug].length == 0 ? (
          <div>{text.courseFull}</div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{text.startDate}</th>
                <th>{text.ageGroup}</th>
                <th>{text.select}</th>
              </tr>
            </thead>
            <tbody>
              {courseDates[courseSlug].map((startDate, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    {new Intl.DateTimeFormat(language, {
                      weekday: "short",
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(startDate.date)) + " Uhr"}
                  </td>
                  <td className="align-middle">
                    {startDate.ageGroup + " Jahre"}
                  </td>
                  <td className="align-middle">
                    <Button
                      variant="primary"
                      onClick={() =>
                        updateUserData("startDateId", startDate.id)
                      }
                    >
                      {text.select}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Form.Group>
    </div>
  );
}
