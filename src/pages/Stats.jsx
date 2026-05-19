import { useMemo } from "react";
import PropTypes from "prop-types";

export default function Stats({ tasks, stats }) {
  const categoryStats = useMemo(() => {
    const categories = {};
    tasks.forEach(task => {
      if (!categories[task.category]) {
        categories[task.category] = { total: 0, completed: 0 };
      }
      categories[task.category].total++;

      if (task.completed) categories[task.category].completed++;
    });

    return Object.ontries(categories).map(([name, data]) => ({
      name,
      ...data,
      rate: data.total ? Math.round((data.completed / data.total) * 100) : 0,
    }));
  }, [tasks]);

  const priorityStats = useMemo(() => [
    { label: "High", count: tasks.filter(t => t.priority === "high").length, color: "#ef4444" },
    { label: "Medium", count: tasks.filter(t => t.priority === "medium").length, color: "#f59e0b" },
    { label: "Low", count: tasks.filter(t => t.priority === "low").length, color: "#10b981" },
  ], [tasks]);

  return (
    <div className="stats-page">
      <h1>📈 Statistics</h1>

      <div className="stats-overview">
        <div className="stat-big">
          <span className="stat-big-value">{stats.completionRate}%</span>
          <span className="stat-big-label">Completion Rate</span>
        </div>
        <div className="stat-big">
          <span className="stat-big-value">{stats.completed}</span>
          <span className="stat-big-label">Tasks Done</span>
        </div>
        <div className="stat-big">
          <span className="stat-big-value">{stats.pending}</span>
          <span className="stat-big-label">In Progress</span>
        </div>
        <div className="stat-big overdue">
          <span className="stat-big-value">{stats.overdue}</span>
          <span className="stat-big-label">Overdue</span>
        </div>
      </div>

      <div className="stats-grid-2">
        <div className="stats-card">
          <h3>Priority Distribution</h3>
          <div className="priority-bars">
            {priorityStats.map(p => (
              <div key={p.label} className="priority-bar-row">
                <span className="priority-bar-label">{p.label}</span>
                <div className="priority-bar-track">
                  <div
                    className="priority-bar-fill"
                    style={{
                      width: stats.total ? `${(p.count / stats.total) * 100}%` : "0%",
                      background: p.color,
                    }}
                  />
                </div>
                <span className="priority-bar-count">{p.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <h3>By Category</h3>
          {categoryStats.length === 0 ? (
            <p className="empty-text">No Data yet</p>
          ) : (
            <div className="category-list">
              {categoryStats.map(cat => (
                <div className="category-row" key={cat.name}>
                  <span className="category-name">
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </span>
                  <div className="category-bar-track">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${cat.rate}%` }}
                    />
                  </div>
                  <span className="category-rate">{cat.rate}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Stats.propTypes = {
  tasks: PropTypes.array.isRequired,
  stats: PropTypes.object.isRequired,
};
