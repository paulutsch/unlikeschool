import { useContext } from "react";
import { Text } from "../../api/Context/Text";

export default function Benefits() {
  const text = useContext(Text);

  return (
    <div
      id="whyunlikeschool"
      className="section-standard background-quaternary"
    >
      <div className="row d-flex-center">
        <div className="col-11 col-md-9 col-lg-7 w-100 text-center">
          <div className="row">
            <div className="col-12">
              <h1 className="header-large">{text.whyUnlikeSchool.title}</h1>
            </div>
          </div>
          <div className="row d-flex-center">
            <div className="col-12 col-lg-8">
              <div className="row d-flex-center">
                {text.whyUnlikeSchool.bullets.map((bullet, index) => (
                  <div className="box col-10 col-md-4" key={index}>
                    <h3>{bullet.title}</h3>
                    <p className="m-0">{bullet.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
