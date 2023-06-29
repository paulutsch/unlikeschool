import { useEffect, useState, createContext } from "react";

const Language = createContext();

const LanguageProvider = (props) => {
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    // setLanguage(navigator.language);
    setLanguage("de-DE");
  }, []);

  return (
    language && (
      <Language.Provider value={language}>{props.children}</Language.Provider>
    )
  );
};

export { Language, LanguageProvider };
