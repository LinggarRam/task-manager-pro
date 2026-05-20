/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-wrapper ${theme}`} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
