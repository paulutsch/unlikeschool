import { useState, useContext } from "react";
import { Language } from "../../api/Context/Language";
import { Text } from "../../api/Context/Text";
import { CourseDates } from "../../api/Context/CourseDates";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import RegisterProgress from "../../components/Register/RegisterProgress";
import CourseSelect from "../../components/Register/CourseSelect";
import StartDateSelect from "../../components/Register/StartDateSelect";
import CustomerForm from "../../components/Register/CustomerForm";

import { Form } from "react-bootstrap";
import { BarLoader } from "react-spinners";

import { createCheckout } from "../../api/firebase";
import { getAuth, signInAnonymously } from "firebase/auth";
import redirectToStripe from "../../api/stripe";

export default function Register() {
  const language = useContext(Language);
  const text = useContext(Text);
  const courseDates = useContext(CourseDates);

  const auth = getAuth();

  const [step, setStep] = useState(1);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  const [userData, setUserData] = useState({
    parentName: "",
    childName: "",
    email: "",
    courseId: "",
    startDateId: "",
    coupon: "",
    termsAccepted: false,
    newsletter: false,
    dataProcessingAccepted: false,
  });

  function sanitizeInput(input) {
    return input.replace(/(<|>|'|"|;)/g, "");
  }

  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const updateUserData = (key, value) => {
    if (key === "email" && !isValidEmail(value)) {
      console.log("Invalid email address");
      return;
    }

    setUserData((prevUserData) => ({
      ...prevUserData,
      [key]: typeof value === "string" ? sanitizeInput(value) : value,
    }));

    if (key === "courseId") setStep(2);
    else if (key === "startDateId") setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingSession(true);
    handleCheckout();
  };

  const handleCheckout = async () => {
    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    try {
      const session = await createCheckout(userData);
      redirectToStripe(session);
    } catch (e) {
      console.error(e);
    }
  };

  if (courseDates.areLoading) {
    return (
      <div id="register" className="section-standard">
        <div className="row d-flex-center">
          <BarLoader color="var(--secondary-color)" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Register - Unlike School</title>
      </Head>
      <div className="container-standard pt-70">
        <div id="register" className="section-standard">
          <div className="row d-flex-center max-width-800">
            <div className="col-12 px-3">
              <h1 className="header-large text-center">
                {text.register.title}
              </h1>

              <RegisterProgress step={step} setStep={setStep} />
              <Form onSubmit={handleSubmit}>
                {step == 1 && <CourseSelect updateUserData={updateUserData} />}

                {step == 2 && (
                  <StartDateSelect
                    courseSlug={userData.courseId}
                    updateUserData={updateUserData}
                  />
                )}

                {step == 3 && (
                  <CustomerForm
                    userData={userData}
                    updateUserData={updateUserData}
                    isCreatingSession={isCreatingSession}
                  />
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
