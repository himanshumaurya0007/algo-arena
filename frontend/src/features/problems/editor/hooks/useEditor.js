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
      result[editorLanguage] = {
        programmingLanguageId: boilerplate.programmingLanguageId,
        templateCode: boilerplate.templateCode,
      };
    }

    return result;
  }, {});
}

const useEditor = (boilerplates = []) => {
  const boilerplateMap = useMemo(
    () => createBoilerplateMap(boilerplates),
    [boilerplates]
  );

  const [language, setLanguage] = useState('cpp');

  const [programmingLanguageId, setProgrammingLanguageId] = useState('');

  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [code, setCode] = useState(defaultCode.cpp);

  useEffect(() => {
    const firstLanguage = Object.keys(boilerplateMap)[0];

    if (!firstLanguage) {
      return;
    }

    const firstBoilerplate = boilerplateMap[firstLanguage];

    queueMicrotask(() => {
      setLanguage(firstLanguage);

      setProgrammingLanguageId(
        firstBoilerplate.programmingLanguageId
      );

      setCode(firstBoilerplate.templateCode);
    });
  }, [boilerplateMap]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);

    const selectedBoilerplate = boilerplateMap[newLanguage];

    if (selectedBoilerplate) {
      setProgrammingLanguageId(
        selectedBoilerplate.programmingLanguageId
      );

      setCode(selectedBoilerplate.templateCode);

      return;
    }

    setProgrammingLanguageId('');

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
    programmingLanguageId,
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