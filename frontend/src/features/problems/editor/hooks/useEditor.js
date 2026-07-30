import { useEffect, useMemo, useState } from 'react';
import defaultCode from '../constants/defaultCode';

const languageNameToEditorValue = {
  C: 'c',
  'C++': 'cpp',
  Java: 'java',
};

function createBoilerplateMap(boilerplates = []) {
  return boilerplates.reduce((result, boilerplate) => {
    const editorLanguage =
      languageNameToEditorValue[boilerplate.programmingLanguageName];

    if (editorLanguage) {
      result[editorLanguage] = boilerplate.templateCode;
    }

    return result;
  }, {});
}

const useEditor = (boilerplates = []) => {
  const boilerplateCode = useMemo(
    () => createBoilerplateMap(boilerplates),
    [boilerplates]
  );

  const [language, setLanguage] = useState('cpp');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [code, setCode] = useState(defaultCode.cpp);

  useEffect(() => {
    const firstLanguage = Object.keys(boilerplateCode)[0];

    if (!firstLanguage) {
      return;
    }

    queueMicrotask(() => {
      setLanguage(firstLanguage);
      setCode(boilerplateCode[firstLanguage]);
    });
  }, [boilerplateCode]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);

    if (boilerplateCode[newLanguage]) {
      setCode(boilerplateCode[newLanguage]);
      return;
    }

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
