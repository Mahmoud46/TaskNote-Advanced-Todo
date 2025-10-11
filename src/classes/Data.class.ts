import { nanoid } from "nanoid";
import type {
	IData,
	IFolder,
	INote,
	IProject,
	ITask,
} from "../interfaces/Data.interface";
import { Activities } from "./Activities";
import { Folders } from "./Folders.class";
import { Notes } from "./Notes.class";
import { Projects } from "./Projects.class";
import { Tasks } from "./Tasks.class";

export type TStat =
	| "Total folders"
	| "Total projects"
	| "Ongoing projects"
	| "Upcoming projects"
	| "Completed projects"
	| "Total tasks"
	| "Completed tasks"
	| "Overdue tasks"
	| "Total notes";

export type TTaskCat = "Ongoing" | "Completed" | "Overdue";
export type TProjectCat = "Ongoing" | "Completed" | "Upcoming";

export interface ITasksCatWithColor {
	category: TTaskCat;
	count: number;
	color: string;
}
export interface IProjectsCatWithColor {
	category: TProjectCat;
	count: number;
	color: string;
}
export interface IDailyActivity {
	date: string;
	amount: number;
}

export class Data {
	foldersDataController: Folders;
	projectsDataController: Projects;
	tasksDataController: Tasks;
	notesDataController: Notes;
	activitiesDataController: Activities;

	protected statsOverview: Record<TStat, number>;
	tasksStatusCategoryWithColor: ITasksCatWithColor[];
	projectsStatusCategoryWithColor: IProjectsCatWithColor[];

	setNotes: React.Dispatch<React.SetStateAction<INote[]>>;

	constructor() {
		this.foldersDataController = new Folders();
		this.projectsDataController = new Projects();
		this.tasksDataController = new Tasks();
		this.notesDataController = new Notes();
		this.activitiesDataController = new Activities();

		this.statsOverview = {
			"Total folders": 0,
			"Total projects": 0,
			"Ongoing projects": 0,
			"Upcoming projects": 0,
			"Completed projects": 0,
			"Total tasks": 0,
			"Completed tasks": 0,
			"Overdue tasks": 0,
			"Total notes": 0,
		};
		this.tasksStatusCategoryWithColor = [];
		this.projectsStatusCategoryWithColor = [];
		this.setNotes = () => {};
	}

	init(setNotes: React.Dispatch<React.SetStateAction<INote[]>>) {
		const data: IData = JSON.parse(
			(localStorage.getItem("data") ?? "{}") as string
		);

		this.foldersDataController.init(data.folders ?? []);
		this.projectsDataController.init(data.projects ?? []);
		this.tasksDataController.init(data.tasks ?? []);
		this.notesDataController.init(data.notes ?? []);
		this.activitiesDataController.init();

		this.statsOverview = this.getStatsOverview();
		this.tasksStatusCategoryWithColor = [
			{
				category: "Ongoing",
				count: this.tasksDataController.stats.ongoing.length,
				color: "#0088FE",
			},
			{
				category: "Completed",
				count: this.tasksDataController.stats.completed.length,
				color: "#00C49F",
			},
			{
				category: "Overdue",
				count: this.tasksDataController.stats.overdue.length,
				color: "#EF4444",
			},
		];
		this.projectsStatusCategoryWithColor = [
			{
				category: "Ongoing",
				count: this.projectsDataController.stats.ongoing.length,
				color: "#0088FE",
			},
			{
				category: "Upcoming",
				count: this.projectsDataController.stats.upcoming.length,
				color: "#FFBB28",
			},
			{
				category: "Completed",
				count: this.projectsDataController.stats.completed.length,
				color: "#00C49F",
			},
		];

		this.setNotes = setNotes;
	}

	protected getStatsOverview(): Record<TStat, number> {
		const statsOverview = {
			"Total folders": this.foldersDataController.folders.length,
			"Total projects": this.projectsDataController.projects.length,
			"Ongoing projects": this.projectsDataController.stats.ongoing.length,
			"Upcoming projects": this.projectsDataController.stats.upcoming.length,
			"Completed projects": this.projectsDataController.stats.completed.length,
			"Total tasks": this.tasksDataController.tasks.length,
			"Completed tasks": this.tasksDataController.stats.completed.length,
			"Overdue tasks": this.tasksDataController.stats.overdue.length,
			"Total notes": this.notesDataController.notes.length,
		};

		return statsOverview;
	}

	getStat(title: TStat) {
		return this.statsOverview[title];
	}

	// Creat
	createFolder(folder: IFolder) {
		this.foldersDataController.create(folder);

		this.updateData();

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "folder",
			action: "created",
			title: `Folder created: ${folder.title}`,
			description: `A ${
				folder.category?.toLowerCase() ?? "Work".toLowerCase()
			} folder with title ${folder.title} is successfully created`,
			reference_id: folder.folder_id,
			created_at: new Date().toISOString(),
		});

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	createProject(project: IProject) {
		this.projectsDataController.create(project);

		if (project.folder_id)
			// Add project to its folder
			this.foldersDataController.addProject(
				project.folder_id,
				project.project_id
			);

		this.updateData();

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "project",
			action: "created",
			title: `Project created: ${project.title}`,
			description: `A ${project.status.toLowerCase()} ${
				project.category?.toLowerCase() ?? "work"
			} project with title ${project.title} is successfully created ${
				project.folder_id
					? `and added to ${
							this.foldersDataController.getFolder(project.folder_id).title
					  } folder`
					: ""
			}, starts from ${new Date(project.start_date).toLocaleDateString(
				"en-US",
				{
					year: "numeric",
					month: "short",
					day: "numeric",
				}
			)}, due ${new Date(project.due_date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})}`,

			reference_id: project.project_id,
			created_at: new Date().toISOString(),
		});

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	createNote(note: INote) {
		this.notesDataController.create(note);
		if (note.folder_id)
			this.foldersDataController.addNote(note.folder_id, note.note_id);

		if (note.project_id)
			this.projectsDataController.addNote(note.project_id, note.note_id);

		this.updateData();

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "note",
			action: "created",
			title: `Note created: ${note.title}`,
			description: `A ${
				note.category?.toLowerCase() ?? "work"
			} note with title ${note.title} is successfully created ${
				note.folder_id
					? `and added to ${
							this.foldersDataController.getFolder(note.folder_id).title
					  } folder`
					: ""
			} ${
				note.project_id
					? `and added to ${
							this.projectsDataController.getProject(note.project_id).title
					  } project`
					: ""
			}`,

			created_at: new Date().toISOString(),
		});

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	createTask(task: ITask) {
		this.tasksDataController.create(task);
		if (task.folder_id)
			this.foldersDataController.addTask(task.folder_id, task.task_id);

		if (task.project_id)
			this.projectsDataController.addTask(task.project_id, task.task_id);

		this.updateData();

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "task",
			action: "created",
			title: `Task created: ${task.title}`,
			description: `A ${task.priority.toLowerCase()}-priority ${
				task.category?.toLowerCase() ?? "work"
			} task with title ${task.title} is successfully created ${
				task.folder_id
					? `and added to ${
							this.foldersDataController.getFolder(task.folder_id).title
					  } folder`
					: ""
			} ${
				task.project_id
					? `and added to ${
							this.projectsDataController.getProject(task.project_id).title
					  } project`
					: ""
			}, ends on ${new Date(task.due_date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})} at ${new Date(task.due_date).toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			})}`,

			created_at: new Date().toISOString(),
		});

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	// Update
	updateNote(note: INote) {
		this.notesDataController.update(note);

		this.updateData();

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "note",
			action: `${note.is_fav ? "favourited" : "updated"}`,
			title: `Note ${note.is_fav ? "favourited" : "updated"}: ${note.title}`,
			description: `A ${
				note.category?.toLowerCase() ?? "work"
			} note with title ${note.title} is successfully ${
				note.is_fav ? "favourited" : "updated"
			}.`,

			created_at: new Date().toISOString(),
		});

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	updateTask(task: ITask) {
		this.tasksDataController.update(task);

		this.updateData();

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "task",
			action: `${
				task.is_done ? "completed" : task.is_fav ? "favourited" : "updated"
			}`,
			title: `Task ${
				task.is_done ? "completed" : task.is_fav ? "favourited" : "updated"
			}: ${task.title}`,
			description: `A ${task.priority.toLowerCase()}-priority ${
				task.category?.toLowerCase() ?? "work"
			} task with title ${task.title} is successfully ${
				task.is_done ? "completed" : task.is_fav ? "favourited" : "updated"
			}, which ends on ${new Date(task.due_date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})} at ${new Date(task.due_date).toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			})}.`,

			created_at: new Date().toISOString(),
		});

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	updateFolder(folder: IFolder) {
		this.foldersDataController.update(folder);
		this.updateData();

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "folder",
			action: "updated",
			title: `Folder updated: ${folder.title}`,
			description: `A ${
				folder.category?.toLowerCase() ?? "Work".toLowerCase()
			} folder with title ${folder.title} is successfully updated`,
			reference_id: folder.folder_id,
			created_at: new Date().toISOString(),
		});

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	updateProject(project: IProject) {
		this.projectsDataController.update(project);

		this.updateData();

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "project",
			action: "updated",
			title: `Project updated: ${project.title}`,
			description: `A ${project.status.toLowerCase()} ${
				project.category?.toLowerCase() ?? "work"
			} project with title ${
				project.title
			} is successfully updated, which starts from ${new Date(
				project.start_date
			).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})}, due ${new Date(project.due_date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})}`,

			reference_id: project.project_id,
			created_at: new Date().toISOString(),
		});

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	// Delete
	deleteNote(noteID: string) {
		if (this.notesDataController.getNote(noteID).folder_id)
			// Delete note from a folder
			this.foldersDataController.deleteNote(
				this.notesDataController.getNote(noteID).folder_id as string,
				noteID
			);
		else if (this.notesDataController.getNote(noteID).project_id)
			// Delete note from a project
			this.projectsDataController.deleteNote(
				this.notesDataController.getNote(noteID).project_id as string,
				noteID
			);

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "note",
			action: "deleted",
			title: `Note deleted: ${this.notesDataController.getNote(noteID).title}`,
			description: `A ${
				this.notesDataController.getNote(noteID).category?.toLowerCase() ??
				"work"
			} note with title ${
				this.notesDataController.getNote(noteID).title
			} is successfully deleted${
				this.notesDataController.getNote(noteID).folder_id
					? `, and deleted from ${
							this.foldersDataController.getFolder(
								this.notesDataController.getNote(noteID).folder_id as string
							).title
					  } folder`
					: ""
			} ${
				this.notesDataController.getNote(noteID).project_id
					? `, and deleted from ${
							this.projectsDataController.getProject(
								this.notesDataController.getNote(noteID).project_id as string
							).title
					  } project`
					: ""
			}.`,

			created_at: new Date().toISOString(),
		});

		this.notesDataController.delete(noteID);

		this.updateData();

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	deleteTask(taskID: string) {
		if (this.tasksDataController.getTask(taskID).folder_id)
			// Delete task from a folder
			this.foldersDataController.deleteTask(
				this.tasksDataController.getTask(taskID).folder_id as string,
				taskID
			);

		if (this.tasksDataController.getTask(taskID).project_id)
			// Delete task from a project
			this.projectsDataController.deleteTask(
				this.tasksDataController.getTask(taskID).project_id as string,
				taskID
			);

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "task",
			action: "deleted",
			title: `Task deleted: ${this.tasksDataController.getTask(taskID).title}`,
			description: `A ${
				this.tasksDataController.getTask(taskID).category?.toLowerCase() ??
				"work"
			} task with title ${
				this.tasksDataController.getTask(taskID).title
			} is successfully deleted${
				this.tasksDataController.getTask(taskID).folder_id
					? `, and deleted from ${
							this.foldersDataController.getFolder(
								this.tasksDataController.getTask(taskID).folder_id as string
							).title
					  } folder`
					: ""
			} ${
				this.tasksDataController.getTask(taskID).project_id
					? `, and deleted from ${
							this.projectsDataController.getProject(
								this.tasksDataController.getTask(taskID).project_id as string
							).title
					  } project`
					: ""
			}`,

			created_at: new Date().toISOString(),
		});

		this.tasksDataController.delete(taskID);

		this.updateData();

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	deleteFolder(folderID: string) {
		// Delete projects, tasks, notes related to that folder
		for (const noteID of this.foldersDataController.getFolder(folderID).notes)
			this.notesDataController.delete(noteID);

		for (const taskID of this.foldersDataController.getFolder(folderID).tasks)
			this.tasksDataController.delete(taskID);

		for (const projectID of this.foldersDataController.getFolder(folderID)
			.projects)
			this.deleteProject(projectID);

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "folder",
			action: "deleted",
			title: `Folder deleted: ${
				this.foldersDataController.getFolder(folderID).title
			}`,
			description: `A ${
				this.foldersDataController
					.getFolder(folderID)
					.category?.toLowerCase() ?? "work"
			} folder with title ${
				this.foldersDataController.getFolder(folderID).title
			} is successfully deleted.`,

			created_at: new Date().toISOString(),
		});

		// Delete the folder
		this.foldersDataController.delete(folderID);

		this.updateData();
		// To bend the changing of data in UI
		this.setNotes([]);
	}

	deleteProject(projectID: string) {
		// Delete tasks, notes related to that project
		for (const noteID of this.projectsDataController.getProject(projectID)
			.notes)
			this.notesDataController.delete(noteID);

		for (const taskID of this.projectsDataController.getProject(projectID)
			.tasks)
			this.tasksDataController.delete(taskID);

		// Delete the project from the folder
		if (this.projectsDataController.getProject(projectID).folder_id)
			this.foldersDataController.deleteProject(
				this.projectsDataController.getProject(projectID).folder_id as string,
				projectID
			);

		// Make create as activity
		this.activitiesDataController.insert({
			activity_id: nanoid(),
			type: "project",
			action: "deleted",
			title: `Project deleted: ${
				this.projectsDataController.getProject(projectID).title
			}`,
			description: `A ${
				this.projectsDataController
					.getProject(projectID)
					.category?.toLowerCase() ?? "work"
			} project with title ${
				this.projectsDataController.getProject(projectID).title
			} is successfully deleted${
				this.projectsDataController.getProject(projectID).folder_id
					? `, and deleted from ${
							this.foldersDataController.getFolder(
								this.projectsDataController.getProject(projectID)
									.folder_id as string
							).title
					  } folder`
					: ""
			}`,

			created_at: new Date().toISOString(),
		});

		this.projectsDataController.delete(projectID);
		this.updateData();

		// To bend the changing of data in UI
		this.setNotes([]);
	}

	updateData(): void {
		this.statsOverview = this.getStatsOverview();

		this.tasksStatusCategoryWithColor = [
			{
				category: "Ongoing",
				count: this.tasksDataController.stats.ongoing.length,
				color: "#0088FE",
			},
			{
				category: "Completed",
				count: this.tasksDataController.stats.completed.length,
				color: "#00C49F",
			},
			{
				category: "Overdue",
				count: this.tasksDataController.stats.overdue.length,
				color: "#EF4444",
			},
		];

		this.projectsStatusCategoryWithColor = [
			{
				category: "Ongoing",
				count: this.projectsDataController.stats.ongoing.length,
				color: "#0088FE",
			},
			{
				category: "Upcoming",
				count: this.projectsDataController.stats.upcoming.length,
				color: "#FFBB28",
			},
			{
				category: "Completed",
				count: this.projectsDataController.stats.completed.length,
				color: "#00C49F",
			},
		];

		// Update local storage data
		const data: IData = {
			folders: this.foldersDataController.folders,
			projects: this.projectsDataController.projects,
			tasks: this.tasksDataController.tasks,
			notes: this.notesDataController.notes,
		};

		localStorage.setItem("data", JSON.stringify(data));
	}
}

export const dataController = new Data();
