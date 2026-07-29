import defaultCode from "../constants/defaultCode";

/**
 * Returns starter code for the selected language
 */
export const getDefaultCode = (language) => {
  return defaultCode[language] || "";
};

/**
 * Returns Monaco editor language
 */
export const getEditorLanguage = (language) => {
  switch (language) {
    case "c":
      return "c";

    case "cpp":
      return "cpp";

    case "java":
      return "java";

    case "python":
      return "python";

    case "javascript":
      return "javascript";

    case "csharp":
      return "csharp";

    default:
      return "cpp";
  }
};

/**
 * Clears editor output
 */
export const clearOutput = () => {
  return "";
};

/**
 * Resets code according to language
 */
export const resetEditor = (language) => {
  return getDefaultCode(language);
};

/**
 * Checks whether language is supported
 */
export const isLanguageSupported = (language) => {
  return Object.keys(defaultCode).includes(language);
};