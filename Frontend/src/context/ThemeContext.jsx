import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primary: "#25bc95",
    secondary: "#25bc95",
    accent: "#F2F2F2",
    text: "#FFFFFF",
    background: "#F9FAFB",
    dark_text: "#1A1A1A",
    normal_text: "#9a9a9a",
    gradient1:"#c9ece4",
    gradient2:"#25bc966f"

  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy access
export const useTheme = () => useContext(ThemeContext);
