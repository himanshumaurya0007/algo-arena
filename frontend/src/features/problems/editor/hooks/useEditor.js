import { useState } from "react";
import defaultCode from "../constants/defaultCode";

const useEditor = () => {
  const [language, setLanguage] = useState("cpp");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [code, setCode] = useState(defaultCode.cpp);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);

    if (defaultCode[newLanguage]) {
      setCode(defaultCode[newLanguage]);
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const changeFontSize = (size) => {
    setFontSize(Number(size));
  };

 return {
    language,
    theme,
    fontSize,
    code,

    setCode,

    changeLanguage,
    changeTheme,
    changeFontSize,
};
};

export default useEditor;