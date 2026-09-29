import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [ priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError("Please enter a task title.");
      return;
    }

    onAddTask(cleanTitle, priority);
    setTitle("");
    setPriority("Medium");
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title">New task</label>
      <div className="form-row">
        <input
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Example: Practice props"
          aria-describedby={error ? "task-error" : undefined}
        />
        <select
          value = {priority}
          onChange = {(e) => setPriority(e.target.value)}
          aria-label = "Task priority"
          style = {{border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px"}}
        >
          <option value = "Low">Low</option>
          <option value = "Medium">Medium</option>
          <option value = "High">High</option>
        </select>

        <button type="submit">Add task</button>
      </div>
      {error && <p id="task-error" className="form-error" role="alert">{error}</p>}
    </form>
  );
}
