import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { BarLoader } from "react-spinners";

const SendInBlue = ({ text }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [newsletterChecked, setNewsletterChecked] = useState(false);

  const handleNewsletterCheckboxChange = (event) => {
    setNewsletterChecked(event.target.checked);
  };

  const handleEmailChange = (event) => {
    setEmailAddress(event.target.value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.REQUIRED_CODE_ERROR_MESSAGE =
        "Wählen Sie bitte einen Ländervorwahl aus.";
      window.LOCALE = "de";
      window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
        text.invalidInfo;
      window.REQUIRED_ERROR_MESSAGE = text.emptyField;
      window.GENERIC_INVALID_MESSAGE = text.invalidInfo;
      window.translation = {
        common: {
          selectedList: "{quantity} Liste ausgewählt",
          selectedLists: "{quantity} Listen ausgewählt",
        },
      };
      var AUTOHIDE = Boolean(0);
    }
  }, [text]);

  // barely changed the default by SendInBlue
  return (
    <>
      <Script
        defer
        src="https://sibforms.com/forms/end-form/build/main.js"
      ></Script>

      <link
        rel="stylesheet"
        href="https://sibforms.com/forms/end-form/build/sib-styles.css"
      />
      <p className="p-large subtitle">{text.subtitle}</p>

      {text.description.map((bit, i) => (
        <p key={`newsletter_bit_${i}`} className={"description"}>
          {bit}
        </p>
      ))}

      <div className="sib-form p-0 pb-4">
        <div id="sib-form-container" className="sib-form-container">
          <div
            id="error-message"
            className="sib-form-message-panel"
            style={{
              fontSize: "16px",
              textAlign: "left",
            }}
          >
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg
                viewBox="0 0 512 512"
                className="sib-icon sib-notification__icon"
              >
                <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                {text.error}
              </span>
            </div>
          </div>
          <div></div>
          <div
            id="success-message"
            className="sib-form-message-panel"
            style={{
              fontSize: "16px",
              textAlign: "left",
              color: "#085229",
              backgroundColor: "#e7faf0",
              borderRadius: "3px",
              borderColor: "#13ce66",
              maxWidth: "540px",
            }}
          >
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg
                viewBox="0 0 512 512"
                className="sib-icon sib-notification__icon"
              >
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                {text.checkMail}
              </span>
            </div>
          </div>
          <div></div>
          <div
            id="sib-container"
            className="sib-container--large sib-container--vertical p-0"
            style={{
              textAlign: "left",
              backgroundColor: "rgba(255,255,255,1)",
              maxWidth: "540px",
              direction: "ltr",
            }}
          >
            <form
              id="sib-form"
              method="POST"
              action="https://3aee31f1.sibforms.com/serve/MUIEAIJ5V729zc6AROuNYyYJaKoxFxiFk66tyiAchN8_nvjpQDCfLRsJZTPir55LNi12Cp15eGejnc-ncdk7duG6kslMPrkMBCqbGGyG1Ox9qUFu5AtPf7jfrgR9hfLc5uaCqhQ0JPBJidkUE_7VMmBJaPphwxYKWgZmrFhZXGnqUv2Yn-KKTLWoqs5cI9BoTxbyzjn-9KimWOfB"
              data-type="subscription"
            >
              <div style={{ padding: "8px 0" }}>
                <div className="sib-input sib-form-block p-0">
                  <div className="form__entry entry_block">
                    <div className="form__label-row ">
                      <div className="entry__field">
                        <input
                          className="input "
                          type="text"
                          id="VORNAME"
                          name="VORNAME"
                          autoComplete="off"
                          placeholder="Name"
                          data-required="true"
                          required
                        />
                      </div>
                      <div className="entry__field">
                        <input
                          className="input "
                          type="text"
                          id="EMAIL"
                          name="EMAIL"
                          autoComplete="off"
                          placeholder="Email"
                          data-required="true"
                          required
                        />
                      </div>
                    </div>

                    <label
                      className="entry__error entry__error--primary"
                      style={{
                        fontSize: "16px",
                        textAlign: "left",
                        color: "#661d1d",
                        backgroundColor: "#ffeded",
                        borderRadius: "3px",
                        borderColor: "#ff4949",
                      }}
                    ></label>
                  </div>
                </div>
              </div>
              <div style={{ padding: "8px 0" }}>
                <div className="sib-optin sib-form-block p-0">
                  <div className="form__entry entry_mcq">
                    <div
                      className="form__label-row"
                      style={{ textAlign: "left" }}
                    >
                      <div className="entry__choice">
                        <label>
                          <input
                            type="checkbox"
                            className="input_replaced"
                            checked={newsletterChecked}
                            id="OPT_IN"
                            name="OPT_IN"
                            onChange={handleNewsletterCheckboxChange}
                          />
                          <span className="checkbox checkbox_tick_positive"></span>
                          <span
                            style={{
                              fontSize: "14px",
                              textAlign: "left",
                              backgroundColor: "transparent",
                            }}
                          >
                            <p>
                              {text.wantToSubscribe}
                              <a
                                target="_blank"
                                className="clickable_link"
                                href="https://de.sendinblue.com/legal/termsofuse/"
                              >
                                Nutzungsbedingungen
                              </a>
                              .
                            </p>
                          </span>
                        </label>
                      </div>
                    </div>

                    <label
                      className="entry__error entry__error--primary"
                      style={{
                        fontSize: "16px",
                        textAlign: "left",
                        color: "#661d1d",
                        backgroundColor: "#ffeded",
                        borderRadius: "3px",
                        borderColor: "#ff4949",
                      }}
                    ></label>
                    <label
                      className="m-0 w-100"
                      style={{
                        fontSize: "12px",
                        color: "#8390A4",
                        textAlign: "left",
                      }}
                    >
                      {text.unsubscribeAnytime}
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ padding: "8px 0" }}>
                <div
                  className="sib-form-block p-0"
                  style={{ textAlign: "left" }}
                >
                  <button
                    className="sib-form-block__button sib-form-block__button-with-loader"
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      backgroundColor: "#3E4857",
                      borderRadius: "3px",
                      borderWidth: "0px",
                    }}
                    form="sib-form"
                    type="submit"
                  >
                    <svg
                      className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                      viewBox="0 0 512 512"
                    >
                      <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                    </svg>
                    {text.subscribe}
                  </button>
                </div>
              </div>

              <input
                type="text"
                name="email_address_check"
                value={emailAddress}
                className="input--hidden"
                onChange={handleEmailChange}
              />
              <input type="hidden" name="locale" value="de" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendInBlue;
