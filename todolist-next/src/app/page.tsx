import TaskList from "./components/TaskList";
import prisma from "../../lib/prisma";

// 1. Fetch data directly on the server
async function getTasks() {
    // You can use Prisma, or any other DB client here
    const tasks = await prisma.task.findMany();
    return tasks;
}

export default async function TasksPage() {
    // 2. Await the data
    const initialTasks = await getTasks();

    // 3. Pass the data as props to your client component
    return <TaskList initialTasks={initialTasks} />;
}
