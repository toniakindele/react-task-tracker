export default function TaskSummary({tasks}){
    const activeCount = tasks.filter((task) => !task.completed).length;
    const completedCount = tasks.filter((task) => task.completed).length;

    return (
        <section className = "summary" aria-label = "Task summary">
            <span>{activeCount} active</span>
            <span>{completedCount} completed</span>
            <span>{tasks.length} total</span>
        </section>
    );
}