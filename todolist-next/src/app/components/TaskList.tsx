'use client'

// Your Server Action import remains the same
import { createTask, deleteTask } from '../actions/action';

// Define the Task type
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// 1. Accept the initial data as a prop
export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
    // 2. No more useState or useEffect for fetching!
    // const [tasks, setTasks] = useState<Task[]>(initialTasks) // You could do this, but you don't need to. The page will refresh.

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            {/* The form stays the same. When submitted, it will trigger the revalidation */}
            <form action={createTask} className='w-[80%] grid grid-cols-2 text-center'>
                <input
                    type="text"
                    name="title"
                    placeholder="Add task"
                    required
                />
                <button type="submit" className='bg-gray-400 px-4 cursor-pointer'> + </button>
            </form>

            <table className='w-[80%] text-center my-4'>
                <thead>
                    <tr>
                        <th className='pb-3'><strong>id</strong></th>
                        <th className='pb-3'><strong>title</strong></th>
                        <th className='pb-3'><strong>status</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {/* 3. Map over the prop directly */}
                    {initialTasks.map((task) => (
                        <tr key={task.id}>
                            <td className='pb-3'>{task.id}</td>
                            <td className='pb-3'>{task.title}</td>
                            <td className='pb-3'>{task.completed ? "✅" : "❌"}</td>
                            <td className='pb-3'>
                                <form action={deleteTask.bind(null, task.id)}>
                                    <button type='submit' className='bg-red-600 px-4 cursor-pointer'>Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
