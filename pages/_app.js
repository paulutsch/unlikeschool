import { useState, useEffect, useContext } from "react";

import { LanguageProvider } from "../api/Context/Language";
import { TextProvider } from "../api/Context/Text";
import { CourseDatesProvider } from "../api/Context/CourseDates";

import Layout from "../components/Layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <LanguageProvider>
      <TextProvider>
        <CourseDatesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CourseDatesProvider>
      </TextProvider>
    </LanguageProvider>
  );
};

export default App;
