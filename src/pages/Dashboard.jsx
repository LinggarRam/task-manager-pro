import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Timer from "../components/Timer";
import StatsCard from "../components/StatsCard";
import PropTypes from "prop-types";
import "../styles/Dashboard.css";

export default function Dashboard({ tasks, stats }) {
  const { user } = useAuth();

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((t) => !t.completed && t.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
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
        <StatsCard
          icon="📋"
          label="Total Tasks"
          value={stats.total}
          variant="total"
        />
        <StatsCard
          icon="✅"
          label="Completed"
          value={stats.completed}
          variant="completed"
        />
        <StatsCard
          icon="⏳"
          label="Pending"
          value={stats.pending}
          variant="pending"
        />
        <StatsCard
          icon="⚠️"
          label="Overdue"
          value={stats.overdue}
          variant="overdue"
        />
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
          <h3>📅 Upcoming Tasks</h3>
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
