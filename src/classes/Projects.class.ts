import type { IProject } from "../interfaces/Data.interface";

interface IProjectStats {
	ongoing: string[];
	upcoming: string[];
	completed: string[];
}

export class Projects {
	projects: IProject[];
	protected indexedProjects: Record<string, IProject>;
	protected indexedIDs: Record<string, number>;
	stats: IProjectStats;

	constructor() {
		this.projects = [];
		this.indexedProjects = {};
		this.indexedIDs = {};
		this.stats = { ongoing: [], upcoming: [], completed: [] };
	}

	init(projects: IProject[]) {
		this.projects = projects;
		this.stats = this.getStats();
		this.indexedProjects = this.getIndexedProjects();
		this.indexedIDs = this.getIndexedIDs();
	}

	protected getIndexedProjects(): Record<string, IProject> {
		const indexedProjects: Record<string, IProject> = {};
		for (const project of this.projects)
			indexedProjects[project.project_id] = project;
		return indexedProjects;
	}

	protected getIndexedIDs(): Record<string, number> {
		const indexedIDs: Record<string, number> = {};

		for (let i = 0; i < this.projects.length; i++)
			indexedIDs[this.projects[i].project_id] = i;

		return indexedIDs;
	}

	protected getStats(): IProjectStats {
		const stats: IProjectStats = { ongoing: [], upcoming: [], completed: [] };
		for (const project of this.projects) {
			if (project.status == "In Progress")
				stats.ongoing.push(project.project_id);
			else if (project.status == "Pending")
				stats.upcoming.push(project.project_id);
			else if (project.status == "Completed")
				stats.completed.push(project.project_id);
		}
		return stats;
	}

	includes(projectID: string): boolean {
		return projectID in this.indexedProjects;
	}

	getProject(projectID: string): IProject {
		return this.indexedProjects[projectID];
	}

	create(project: IProject) {
		const projects = [project, ...this.projects];
		this.updateProjectsData(projects);
	}

	update(project: IProject): void {
		const projects = [...this.projects];
		projects[this.indexedIDs[project.project_id]] = { ...project };
		this.updateProjectsData(projects);
	}

	delete(projectID: string): void {
		const projects = [...this.projects].filter(
			(project) => project.project_id != projectID
		);
		this.updateProjectsData(projects);
	}

	addTask(projectID: string, taskID: string) {
		const projects = [...this.projects];
		projects[this.indexedIDs[projectID]] = {
			...projects[this.indexedIDs[projectID]],
			tasks: [taskID, ...(projects[this.indexedIDs[projectID]].tasks ?? [])],
		};

		this.updateProjectsData(projects);
	}

	addNote(projectID: string, noteID: string) {
		const projects = [...this.projects];
		projects[this.indexedIDs[projectID]] = {
			...projects[this.indexedIDs[projectID]],
			notes: [noteID, ...(projects[this.indexedIDs[projectID]].notes ?? [])],
		};

		this.updateProjectsData(projects);
	}

	deleteNote(projectID: string, noteID: string) {
		const projects = [...this.projects];
		projects[this.indexedIDs[projectID]] = {
			...projects[this.indexedIDs[projectID]],
			notes: projects[this.indexedIDs[projectID]].notes.filter(
				(note) => note != noteID
			),
		};

		this.updateProjectsData(projects);
	}

	deleteTask(projectID: string, taskID: string) {
		const projects = [...this.projects];

		projects[this.indexedIDs[projectID]] = {
			...projects[this.indexedIDs[projectID]],
			tasks: projects[this.indexedIDs[projectID]].tasks.filter(
				(task) => task != taskID
			),
		};

		this.updateProjectsData(projects);
	}

	protected updateProjectsData(projects: IProject[]) {
		this.projects = projects;
		this.stats = this.getStats();
		this.indexedProjects = this.getIndexedProjects();
		this.indexedIDs = this.getIndexedIDs();
	}
}
