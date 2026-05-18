import { memo, useCallback } from "react";
import PropTypes from "prop-types";

const TaskCard = memo(function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const priorityColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981",
  };

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const handleToggle = useCallback(() => onToggle(task.id), [task.id, onToggle]);
  const handleDelete = useCallback(() => onDelete(task.id), [task.id, onDelete]);
  const handleEdit = useCallback(() => onEdit(task), [task, onEdit]);

  return (
    <article className={`task-card ${task.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}>
      <div className="task-card-left">
        <button
          className={`task-checkbox ${task.completed ? "checked" : ""}`}
          onClick={handleToggle}
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}>
          {task.completed && "✓"}
        </button>
      </div>

      <div className="task-card-body">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div
            className="priority-dot"
            style={{ background: priorityColors[task.priority] }}
            title={`Priority: ${task.priority}`}
          />
        </div>

        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}

        <div className="task-meta">
          {task.dueDate && (
            <span className={`task-due ${isOverdue ? "overdue-text" : ""}`}>
              📅 {new Date(task.dueDate).toLocalDateString("en-us", { month: "short", day: "numeric" })}
              {isOverdue && " (Overdue!)"}
            </span>
          )}
          <span className="task-category">🏷️ {task.category}</span>
          {task.tags?.map(tag => (
            <span className="task-tag" key={tag}>#{tag}</span>
          ))}
        </div>
      </div>

      <div className="task-card-actions">
        <button className="btn-edit" onClick={handleEdit} aria-label="Edit task">✏️</button>
        <button className="btn-delte" onClick={handleDelete} aria-label="Delete task">🗑️</button>
      </div>
    </article>
  );
});

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.oneOf(["high", "medium", "low"]).isRequired,
    category: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TaskCard;
