import PropTypes from "prop-types";

export default function FilterBar({
  filter,
  sortBy,
  onFilterChange,
  onSortChange,
}) {
  const filters = ["all", "active", "completed", "high", "overdue"];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => onFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

FilterBar.propTypes = {
  filter: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
