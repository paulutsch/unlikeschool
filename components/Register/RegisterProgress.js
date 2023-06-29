import { Fragment, useContext } from "react";
import { Text } from "../../api/Context/Text";

import { Button } from "react-bootstrap";
import { BounceLoader } from "react-spinners";

export default function RegisterProgress({ step, setStep }) {
  const text = useContext(Text);

  return (
    <>
      <div className="d-flex-between mb-3">
        {[1, 2, 3].map((i) => (
          <Fragment key={`step_${i}`}>
            <div className="d-flex-center">
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: "1px solid #000",
                  opacity: step < i ? "0.2" : "1.0",
                  backgroundColor: "#fff",
                  color: step == i ? "var(--secondary-color)" : "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage:
                    step > i ? `url('checkmark-flat.svg')` : "none",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {step < i
                  ? i
                  : step == i && (
                      <BounceLoader size={15} color="var(--secondary-color)" />
                    )}
              </div>
            </div>
            {i !== 3 && (
              <div
                style={{
                  flex: 1,
                  height: "3px",
                  margin: "10px",
                  borderTop:
                    step > i
                      ? "3px solid var(--secondary-color)"
                      : "3px dotted rgba(0, 0, 0, 0.2)",
                }}
              ></div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="d-flex-between">
        {step > 1 ? (
          <Button
            onClick={() => setStep(step - 1)}
            className="btn-sm button-standard"
          >
            &larr;
          </Button>
        ) : (
          <div placeholder="true" />
        )}
        <div>
          <p className="subheader-large m-0">
            {step + ". " + text.register.stepDescriptions[step - 1]}
          </p>
        </div>
        <div placeholder="true" />
      </div>
    </>
  );
}
