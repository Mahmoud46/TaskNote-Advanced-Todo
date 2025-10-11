import type { ITask } from "../interfaces/Data.interface";

interface ITasksStats {
	overdue: string[];
	ongoing: string[];
	completed: string[];
}

export class Tasks {
	tasks: ITask[];
	protected indexedTasks: Record<string, ITask>;
	protected indexedIDs: Record<string, number>;
	stats: ITasksStats;

	constructor() {
		this.tasks = [];
		this.indexedTasks = {};
		this.indexedIDs = {};
		this.stats = { ongoing: [], overdue: [], completed: [] };
	}

	init(tasks: ITask[]) {
		this.tasks = tasks;
		this.indexedTasks = this.getIndexedTasks();
		this.indexedIDs = this.getIndexedIDs();
		this.stats = this.getStats();
	}

	protected getIndexedTasks(): Record<string, ITask> {
		const indexedTasks: Record<string, ITask> = {};
		for (const task of this.tasks) indexedTasks[task.task_id] = task;
		return indexedTasks;
	}

	protected getIndexedIDs(): Record<string, number> {
		const indexedIDs: Record<string, number> = {};

		for (let i = 0; i < this.tasks.length; i++)
			indexedIDs[this.tasks[i].task_id] = i;

		return indexedIDs;
	}

	protected getStats(): ITasksStats {
		const stats: ITasksStats = { ongoing: [], overdue: [], completed: [] };
		for (const task of this.tasks) {
			const now = new Date();
			const due = new Date(task.due_date);
			if (task.is_done) stats.completed.push(task.task_id);
			if (!task.is_done && due < now) stats.overdue.push(task.task_id);
			if (!task.is_done && due >= now) stats.ongoing.push(task.task_id);
		}
		return stats;
	}

	includes(taskID: string): boolean {
		return taskID in this.indexedTasks;
	}

	getTask(taskID: string): ITask {
		return this.indexedTasks[taskID];
	}

	create(task: ITask): void {
		const tasks = [task, ...this.tasks];
		this.updateTasksData(tasks);
	}

	update(task: ITask): void {
		const tasks = [...this.tasks];
		tasks[this.indexedIDs[task.task_id]] = { ...task };
		this.updateTasksData(tasks);
	}

	delete(taskID: string): void {
		const tasks = [...this.tasks].filter((task) => task.task_id != taskID);
		this.updateTasksData(tasks);
	}

	protected updateTasksData(tasks: ITask[]): void {
		this.tasks = tasks;
		this.stats = this.getStats();
		this.indexedTasks = this.getIndexedTasks();
		this.indexedIDs = this.getIndexedIDs();
	}

	protected sort(task: ITask[]) {
		const priorityOrder = { High: 3, Medium: 2, Low: 1 };
		return task.sort(
			(a, b) =>
				priorityOrder[b.priority ?? "Low"] - priorityOrder[a.priority ?? "Low"]
		);
	}
}
