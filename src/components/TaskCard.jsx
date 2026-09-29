export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <li className={`task-card ${task.completed ? "completed" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.title}</span>

        <span
          className = {`priority-badge ${task.priority.toLowerCase()}`}
          style = {{
            fontSize: "0.75rem",
            fontWeight: "bold",
            padding: "2px 6px",
            borderRadius: "4px",
            background: task.priority === "High" ? "#fee2e2" : task.priority === "Medium" ? "#fef3c7" : "#f1f5f9",
            color: task.priority === "High" ? "#991b1b" : task.priority === "Medium" ? "#92400e" : "#475569",
            marginLeft: "4px"
          }}
        >
          {task.priority}
        </span>
      </label>
      <button className="delete-button" type="button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}
