import {  useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import useDebounce from "../hooks/useDebounce";
import "../styles/Tasks.css";

export default function Tasks({ tasks, onAdd, onToggle, onDelete, onUpdate, onClearCompleted }) {
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const debounceSearch = useDebounce(search, 300);

  const handleAddTask = useCallback((formData) => {
    onAdd(formData);
    setShowForm(false);
  }, [onAdd]);

  const handleEditTask = useCallback((formData) => {
    onUpdate(editTask.id, formData);
    setEditTask(null);
  }, [editTask, onUpdate]);

  const handleOpenEdit = useCallback((task) => {
    setEditTask(task);
  }, []);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter === "active") result = result.filter(t => !t.completed);
    else if (filter === "completed") result = result.filter(t => t.completed);
    else if (filter === "high") result = result.filter(t => t.priority === "high");
    else if (filter === "overdue") {
      result = result.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date());
    }

    if (debounceSearch) {
      const q = debounceSearch.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    const sorted = [...result];
    if (sortBy === "newest") sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === "dueDate") sorted.sort((a, b) => new Date(a.dueDate || "9999") - new Date(b.dueDate || "9999"));
    else if (sortBy === "priority") {
      const order = { high: 0, medium: 1, low: 2 };
      sorted.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return sorted;
  }, [tasks, filter, debounceSearch, sortBy]);

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <div>
          <h1>My Tasks</h1>
          <p>{filteredTasks.length} tasks</p>
        </div>

        <div className="tasks-header-actions">
          {tasks.some(t => t.completed) && (
            <button className="btn btn-outline btn-sm" onClick={onClearCompleted}>
              Clear Completed
            </button>
          )}

          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Task
          </button>
        </div>
      </div>

      <div className="tasks-controls">
        <input
          type="search"
          className="search-input"
          placeholder="Search Tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="filter-group">
          {["all", "active", "completed", "high", "overdue"].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toLowerCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <h3>Tasks Tidak Ditemukan</h3>
          <p>{search ? "Try different search terms" : "Add a task to get started!"}</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={handleOpenEdit}
            />
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editTask && (
        <TaskForm
          editTask={editTask}
          onSubmit={handleEditTask}
          onCancel={() => setEditTask(null)}
        />
      )}
    </div>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};
