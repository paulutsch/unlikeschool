import { useState, useContext } from "react";
import { Language } from "../../api/Context/Language";
import { Text } from "../../api/Context/Text";

import { Accordion, Button, Table, Form, Alert } from "react-bootstrap";
import { BarLoader, BounceLoader } from "react-spinners";

import { verifyCoupon } from "../../api/firebase";

import Link from "next/link";

export default function CustomerForm({
  userData,
  updateUserData,
  isCreatingSession,
}) {
  const language = useContext(Language);
  const text = useContext(Text);

  const [verifyCouponLoading, setVerifyCouponLoading] = useState(false);
  const [couponVerification, setCouponVerification] = useState({});

  const verifyDiscount = async (code) => {
    setVerifyCouponLoading(true);

    try {
      const response = await verifyCoupon({ code });

      setCouponVerification(response.data);
    } catch (e) {
      console.error("Error verifying discount code:", e);
    }

    setVerifyCouponLoading(false);
  };

  return (
    <>
      {/* Email */}
      <Form.Group className="mb-4">
        <Form.Label className="p-large mb-1">{text.register.email}</Form.Label>
        <Form.Control
          type="email"
          value={userData.email}
          placeholder={text.register.email}
          onChange={(e) => updateUserData("email", e.target.value)}
          required
        />
      </Form.Group>

      {/* Parent's Personal Information */}
      <Form.Group className="mb-4">
        <Form.Label className="p-large mb-1">
          {text.register.parentName}
        </Form.Label>
        <Form.Control
          type="text"
          value={userData.parentName}
          placeholder={text.register.typeParentName}
          onChange={(e) => updateUserData("parentName", e.target.value)}
          required
        />
      </Form.Group>

      {/* Child's Personal Information */}
      <Form.Group className="mb-4">
        <Form.Label className="p-large mb-1">
          {text.register.childName}
        </Form.Label>
        <Form.Control
          type="text"
          value={userData.childName}
          placeholder={text.register.typeChildName}
          onChange={(e) => updateUserData("childName", e.target.value)}
          required
        />
      </Form.Group>

      {/* Coupon */}
      <Form.Group className="mb-4">
        <Form.Label className="p-large mb-1">
          {text.register.discountCode}
        </Form.Label>
        <div className="d-flex align-items-center p-0">
          <Form.Control
            type="text"
            value={userData.coupon}
            placeholder={text.register.typeCoupon}
            onChange={(e) => updateUserData("coupon", e.target.value)}
          />
          <Button
            variant="primary"
            onClick={() => verifyDiscount(userData.coupon)}
          >
            {verifyCouponLoading ? (
              <BounceLoader size={25} color="rgba(77, 235, 168, 1)" />
            ) : (
              text.register.verifyCoupon
            )}
          </Button>
        </div>

        {/* display message of verifyCoupon */}
        {couponVerification.message && (
          <div>
            <Alert
              variant={
                couponVerification.success === true ? "success" : "danger"
              }
            >
              {couponVerification.message === "valid"
                ? text.register.couponValid
                : couponVerification.message === "used before"
                ? text.register.couponUsed
                : text.register.couponInvalid}
            </Alert>
          </div>
        )}
      </Form.Group>

      {/* Terms and Conditions */}
      <Form.Group className="p-large p-0 mb-1" style={{ textAlign: "left" }}>
        <Form.Check
          type="checkbox"
          label={
            <>
              {text.register.agreeTac}
              <Link
                href={language === "de-DE" ? "/AGB.pdf" : "/T&C.pdf"}
                target="_blank"
              >
                {text.register.tac}
              </Link>
              .
            </>
          }
          checked={userData.termsAccepted}
          onChange={(e) => updateUserData("termsAccepted", e.target.checked)}
          required
        />
      </Form.Group>

      {/* Newsletter */}
      <Form.Group className="p-large p-0 mb-1" style={{ textAlign: "left" }}>
        <Form.Check
          type="checkbox"
          label={text.register.newsletter}
          checked={userData.newsletter}
          onChange={(e) => updateUserData("newsletter", e.target.checked)}
        />
      </Form.Group>

      {/* Data Processing Consent */}
      <Form.Group className="p-large p-0 mb-1" style={{ textAlign: "left" }}>
        <Form.Check
          type="checkbox"
          label={text.register.dataConsent}
          checked={userData.dataProcessingAccepted}
          onChange={(e) =>
            updateUserData("dataProcessingAccepted", e.target.checked)
          }
          required
        />
      </Form.Group>

      {/* Submit Button */}
      <div className="d-flex-center mb-5">
        <Button
          type="submit"
          className="btn-lg button-standard m-3"
          disabled={isCreatingSession}
        >
          {isCreatingSession ? (
            <div className="d-flex-center flex-column">
              {text.register.processing}
              <BarLoader size={4} color="rgba(77, 235, 168, 1)" />
            </div>
          ) : (
            text.register.proceedToPayment
          )}
        </Button>
      </div>
    </>
  );
}
