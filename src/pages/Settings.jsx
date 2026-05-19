import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { user, updateProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleNameChange = (e) => {
    updateProfile({ name: e.target.value });
  };

  return (
    <div className="settings-page">
      <h1>⚙️ Settings</h1>

      <div className="settings-card">
        <h2>Profile</h2>

        <div className="settings-row">
          <div className="avatar-lg">{user?.avatar}</div>

          <div className="settings-form">
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                value={user?.name || ""}
                onChange={handleNameChange}
                className="settings-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="settings-input readonly"
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                value={user?.role || ""}
                readOnly
                className="settings-input readonly"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h2>Appearance</h2>

        <div className="settings-toggle-row">
          <div>
            <p className="settings-label">Theme</p>
            <p className="settings-hint">
              Currently using <strong>{theme}</strong> mode
            </p>
          </div>

          <button className="btn btn-outline" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Switch to dark" : "☀️ Switch to light"}
          </button>
        </div>
      </div>

      <div className="settings-card danger-zone">
        <h2>Account</h2>
        <div className="settings-toggle-row">
          <div>
            <p className="settings-label">Log Out</p>
            <p className="settings-hint">You will be logged of your account</p>
          </div>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
