'use client'
import { useEffect, useState } from 'react'

interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function TaskList() {
  const [tasks, settasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchtasks() {
      try {
        const response = await fetch('/api/tasks')
        const data = await response.json()
        settasks(data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchtasks()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>tasks</h1>
      <table className='w-full text-center'>
        <thead>
          <tr>
            <th><strong>id</strong></th>
            <th><strong>title</strong></th>
            <th><strong>status</strong></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.completed ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
