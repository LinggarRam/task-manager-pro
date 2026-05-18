import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

export default function Navbar({ taskCount }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-icon">✅</span>
          <span className="brand-name">TaskManager Pro</span>
        </div>

        <nav className="navbar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            📋 Tasks
            {taskCount > 0 && <span className="nav-badge">{taskCount}</span>}
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            📈 Stats
          </NavLink>
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            ⚙️ Setting
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <button
            className="btn-theme"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {user && (
            <div className="user-info">
              <div className="avatar">{user.avatar}</div>
              <span className="user-name">{user.name.split(" ")[0]}</span>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  taskCount: PropTypes.number.isRequired,
};
