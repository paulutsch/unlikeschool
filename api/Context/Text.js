import { useState, useContext, createContext } from "react";
import { Language } from "./Language";
import textObject from "../../data/text";

const Text = createContext();

const TextProvider = (props) => {
  const language = useContext(Language);
  const [text, setText] = useState(textObject[language]);

  return text && <Text.Provider value={text}>{props.children}</Text.Provider>;
};

export { Text, TextProvider };
