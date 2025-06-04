import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function HomePage() {
    return (
        <main className="w-screen">
            <TaskForm />
            <TaskList />
        </main>
    )
}
