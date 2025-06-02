// // to do list using interface
interface Task {
	readonly id: number;
	title: string;
	completed: boolean;
	readonly creationDate: number;
	completionDate: number | null;
}

class ToDoList {
	private tasks: Task[];
	nextId: number = 1;

	constructor(tasks?: Task[]) {
		this.tasks = [];

		if (tasks) {
			tasks.forEach(task => {
				this.addTask(
					task.title,
					task.creationDate,
					task.completed,
					task.completionDate
				)
			});
		}
	}

	private getNextId(): number {
		const newId = this.nextId;
		this.nextId++;
		return newId;
	}

	getTaskById(id: number): Task | undefined {
		const task = this.tasks.find(task => task.id === id);
		return task ? { ...task } : undefined;
	}

	getCompleted(): Task[] {
		return this.tasks.filter(task => task.completed).map(task => ({ ...task }))
	}

	getPending(): Task[] {
		return this.tasks.filter(task => task.completed === false).map(task => ({ ...task }))
	}

	addTask(
		title: string,
		creationDate: number = Date.now(),
		completed: boolean = false,
		completionDate: number | null
	) {
		const newTask: Task = {
			id: this.getNextId(),
			title: title,
			creationDate: creationDate,
			completed: completed,
			completionDate: completionDate;
		}
		this.tasks = [...this.tasks, newTask];
	}

	completeTask(id: number) {
		let taskToUpdate: Task | undefined = undefined;
		const oriTaskId = this.tasks.findIndex(task => task.id === id);

		if (oriTaskId === -1) {
			console.warn(`Task with ID: ${oriTaskId} is not found.`)
			return undefined;
		}

		if (this.tasks[oriTaskId].completed) {
			console.warn(`Task with ID: ${oriTaskId} is already completed.`)
			return { ...this.tasks[oriTaskId] };
		}
		taskToUpdate = {
			...this.tasks[oriTaskId],
			completed: true,
			completionDate: Date.now()
		}
		this.tasks = [
			...this.tasks.slice(0, oriTaskId),
			taskToUpdate,
			...this.tasks.slice(oriTaskId + 1)
		]
		console.log(`${taskToUpdate.title} completed.`)
		return { ...taskToUpdate };
	}

	deleteTask(id: number) {
		let taskToDelete: Task | undefined = undefined;
		const taskId = this.tasks.findIndex(task => task.id === id);

		if (taskId === -1) {
			console.warn(`There is no task with id = ${id} in the current list`)
			return undefined;
		}
		taskToDelete = {
			...this.tasks[taskId]
		}
		this.tasks = [
			...this.tasks.slice(0, taskId),
			...this.tasks.slice(taskId + 1)
		]

		console.log(`${taskToDelete.title} deleted.`)
		return taskToDelete;
	}
}
