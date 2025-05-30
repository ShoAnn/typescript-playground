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
}

// const t1: Task = { id: 1, title: 'shopping', completed: false, completionDate: 0 };
// const t2: Task = { id: 2, title: 'run', completed: false, completionDate: 0 };
// const t3: Task = { id: 3, title: 'water plants', completed: false, completionDate: 0 };
//
// let tdl: Task[] = [t1, t2, t3];
//
// console.log(tdl);
//
// const newTdl = tdl.map(task => {
// 	if (task.title === "shopping") {
// 		const completedTask = completeTask(task);
// 		return completedTask;
// 	}
// 	return task;
// })
//
// console.log(`tdl = `);
// console.log(tdl);
// console.log(`newtdl = `);
// console.log(newTdl);
// // // end to do list using interface
