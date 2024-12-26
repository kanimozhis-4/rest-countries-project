import React, { Children, createContext, useState } from "react";
import App from "../App";
export const ThemeContext = createContext();
function ThemeModeProvider() {
  const [isLight, setIsLight] = useState(true);

  const handleMode = () => {
    setIsLight((prevMode) => !prevMode);
  };
  return (
    <ThemeContext.Provider value={{ isLight, handleMode }}>
      <App />
    </ThemeContext.Provider>
  );
}

export default ThemeModeProvider;
