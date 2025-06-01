var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ToDoList = /** @class */ (function () {
    function ToDoList(tasks) {
        if (tasks) {
            this.tasks = tasks;
        }
        else {
            this.tasks = [];
        }
    }
    ToDoList.prototype.addTask = function (taskTitle) {
        var newTask = {
            id: this.tasks.length + 1,
            title: taskTitle,
            completed: false,
            creationDate: Date.now(),
            completionDate: 0
        };
        this.tasks.push(newTask);
    };
    ToDoList.prototype.completeTask = function (id) {
        this.tasks = this.tasks.map(function (task) {
            if (id === task.id) {
                return __assign(__assign({}, task), { completed: true, completionDate: Date.now() });
            }
            return task;
        });
        console.log(this.tasks);
    };
    return ToDoList;
}());
var list = new ToDoList();
list.addTask("shopping");
list.addTask("walk");
list.addTask("water plants");
list.completeTask(1);
console.log(list);
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
