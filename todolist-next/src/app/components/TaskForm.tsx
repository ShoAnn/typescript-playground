"use client"

import { useState } from "react";

export default function TaskForm() {
    const [title, setTitle] = useState('')
    async function createTask(submission: React.FormEvent) {
        submission.preventDefault();

        try {
            const res = await fetch('../api/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicaiton/json',
                },
                body: JSON.stringify({ title })
            })
            if (res.ok) {
                setTitle('')
            }
        } catch (error) {
            console.log(`Task creation failed. ${error}`)
        }
    }
    return (
        <>
            <form onSubmit={createTask}>
                <input
                    type="text"
                    placeholder="Add task name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </form>
        </>
    )
}
