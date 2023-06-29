import { useContext } from "react";
import { Text } from "../../api/Context/Text";

import { Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const text = useContext(Text);

  return (
    <div className="section-standard background-tertiary">
      <Image
        src="/hero.jpeg"
        alt="Group of teenagers walking horizontally with backpacks and headphones"
        fill
        style={{
          width: "100%",
          objectFit: "cover",
          objectPosition: "top",
          // marginTop: "70px",
        }}
        quality={100}
      />
      <div className="row">
        <div className="col-12 p-0">
          <div className="h-100">
            <div
              className="col-10 col-md-8 col-lg-6 mx-auto"
              style={{
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <div className="inner-content text-center">
                <h1 className="header-large mt-0">{text.hero.header}</h1>
                <p className="p-large">{text.hero.subHeader}</p>
                <div>
                  <Link href="/register" passHref>
                    <Button className="button-standard link-large m-2 mt-0">
                      {text.callToAction.enroll}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
