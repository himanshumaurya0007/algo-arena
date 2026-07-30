import { useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("vs-dark");

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

export default useTheme;