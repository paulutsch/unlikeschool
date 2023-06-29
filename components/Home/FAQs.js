import { useContext } from "react";
import { Text } from "../../api/Context/Text";

import { Accordion } from "react-bootstrap";

export default function FAQs() {
  const text = useContext(Text);
  const faqs = text.faqs;

  return (
    <>
      <div className="section-standard d-flex-center">
        <div className="col-11 col-md-10 max-width-800">
          <h1 className="header-large">FAQs</h1>
          <Accordion className="m-4 mx-0">
            {faqs.map((faq, idx) => (
              <Accordion.Item key={idx} eventKey={idx}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>
                  <ul className="m-0 p-0">
                    {faq.answers.map((answer, index) => (
                      <li className="m-3" key={index}>
                        {answer}
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
