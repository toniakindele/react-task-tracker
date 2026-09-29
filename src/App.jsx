import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskSummary from "./components/TaskSummary.jsx";

// Default starter tasks
const starterTasks = [
  { id: crypto.randomUUID(), title: "Read the Module 2 lesson", completed: false, priority: "High" },
  { id: crypto.randomUUID(), title: "Create a React component", completed: true, priority: "Medium" },
  { id: crypto.randomUUID(), title: "Test persistent local storage", completed: false, priority: "Low"},
  { id: crypto.randomUUID(), title: "Implement filter functionality", completed: false, priority: "Low"},
];

export default function App() {
  const [tasks, setTasks] = useState(() => 
    {
      const savedTask = localStorage.getItem("react-task-tracker-tasks");
      return savedTask ? JSON.parse(savedTask) : starterTasks;
    });

// Filter
const [filter, setFilter] = useState("All");



// Synchronizes the tasks state when tasks update
    useEffect(() => {
      localStorage.setItem("react-task-tracker-tasks", JSON.stringify(tasks));
    }, [tasks]);

// Adds tasks
  function addTask(title, priority) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title, completed: false, priority },
    ]);
  }

  // Completion status
  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

// Delete task
  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  // Recalculates metrics of tasks
  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;

  //Filter tasks based on active filter state selection
  const displayedTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true; 
  });

  return (
    <main className="app-shell">
      <section className="app-card" aria-labelledby="page-title">
        <header className="app-header">
          <p className="eyebrow">INEW-2434 | Module 2</p>
          <h1 id="page-title"> Toni's React Task Tracker</h1>
          <p>Practice components, props, state, events, forms, and lists.</p>
        </header>

        <TaskForm onAddTask={addTask} />

        <nav className = "filter-nav" aria-label = "Filter tasks" style = {{display: "flex", gap: "8px", margin: "16px 0"}}>
          {["All", "Active", "Completed"].map((type) => (
            <button
              key = {type}
              type = "button"
              onClick = {() => setFilter(type)}
              className = {`filter-btn ${filter === type ? "active" : ""}`}
              style = {{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                cursor: "pointer",
                background: filter === type ? "#0f172a" : "#ffffff",
                color: filter === type ? "#ffffff" : "#0f172a",
                fontWeight: filter === type ? "bold" : "normal",
              }}
            >
              {type}
            </button>
          ))}
        </nav>

          <TaskSummary tasks = {tasks} />
        
        <TaskList tasks={displayedTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
      </section>
    </main>
  );
}
