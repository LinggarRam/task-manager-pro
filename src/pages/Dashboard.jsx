import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Timer from "../components/Timer";
import PropTypes from "prop-types";

export default function Dashboard({ tasks, stats }) {
  const { user } = useAuth();

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((t) => !t.completed && t.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 3);
  }, [tasks]);

  const recentTasks = useMemo(() => {
    return tasks
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [tasks]);

  const handleTimerComplete = (mode) => {
    console.log(`${mode} session complete`);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-welcome">
        <div>
          <h1>
            Good {getGreeting()}, {user?.name.split(" ")[0]}! 👋
          </h1>
          <p>
            You have <strong>{stats.pending}</strong> pending tasks today!
          </p>
        </div>
        <Link to="/tasks" className="btn btn-primary">
          + New Tasks
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-grid total">
          <span className="stat-icon">📋</span>
          <div>
            <p className="stat-label">Total Tasks</p>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>
        <div className="stat-grid completed">
          <span className="stat-icon">✅</span>
          <div>
            <p className="stat-label">Completed</p>
            <p className="stat-value">{stats.completed}</p>
          </div>
        </div>
        <div className="stat-grid pending">
          <span className="stat-icon">⏳</span>
          <div>
            <p className="stat-label">Pending</p>
            <p className="stat-value">{stats.pending}</p>
          </div>
        </div>
        <div className="stat-grid overdue">
          <span className="stat-icon">⚠️</span>
          <div>
            <p className="stat-label">Overdue</p>
            <p className="stat-value">{stats.overdue}</p>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Overall Completion</span>
          <span>{stats.completionRate}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📅✅ Upcoming Tasks</h3>
          {upcomingTasks.length === 0 ? (
            <p className="empty-text">No Upcoming Tasks!</p>
          ) : (
            <ul className="task-preview-list">
              {upcomingTasks.map((task) => (
                <li key={task.id} className="task-preview-item">
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                  </span>
                  <span className="task-preview-title">{task.title}</span>
                  <span className="task-preview-date">
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/" className="card-link">
            View All
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>🍅 Focus Timer</h3>
          <Timer initialSeconds={1500} onComplete={handleTimerComplete} />
        </div>
      </div>
    </div>
  );
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
};

Dashboard.propTypes = {
  tasks: PropTypes.array.isRequired,
  stats: PropTypes.object.isRequired,
};
