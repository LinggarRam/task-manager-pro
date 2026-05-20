import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="btn-theme"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
