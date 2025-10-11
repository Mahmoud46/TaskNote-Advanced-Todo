import type { IFolder } from "../interfaces/Data.interface";

export class Folders {
	folders: IFolder[];
	protected indexedFolders: Record<string, IFolder>;
	protected indexedIDs: Record<string, number>;

	constructor() {
		this.folders = [];
		this.indexedFolders = {};
		this.indexedIDs = {};
	}

	init(folders: IFolder[]) {
		this.folders = folders;
		this.indexedFolders = this.getIndexedFolders();
		this.indexedIDs = this.getIndexedIDs();
	}

	protected getIndexedFolders(): Record<string, IFolder> {
		const indexedFolders: Record<string, IFolder> = {};
		for (const folder of this.folders)
			indexedFolders[folder.folder_id] = folder;
		return indexedFolders;
	}

	protected getIndexedIDs(): Record<string, number> {
		const indexedIDs: Record<string, number> = {};
		for (let i = 0; i < this.folders.length; i++)
			indexedIDs[this.folders[i].folder_id] = i;
		return indexedIDs;
	}

	create(folder: IFolder) {
		const folders = [folder, ...this.folders];
		this.updateFoldersData(folders);
	}

	update(folder: IFolder): void {
		const notes = [...this.folders];
		notes[this.indexedIDs[folder.folder_id]] = folder;
		this.updateFoldersData(notes);
	}

	delete(folderID: string): void {
		const folders = [...this.folders].filter(
			(folder) => folder.folder_id != folderID
		);
		this.updateFoldersData(folders);
	}

	addProject(folderID: string, projectID: string) {
		const folders = [...this.folders];
		folders[this.indexedIDs[folderID]] = {
			...folders[this.indexedIDs[folderID]],
			projects: [
				projectID,
				...(folders[this.indexedIDs[folderID]].projects ?? []),
			],
		};

		this.updateFoldersData(folders);
	}

	addTask(folderID: string, taskID: string) {
		const folders = [...this.folders];
		folders[this.indexedIDs[folderID]] = {
			...folders[this.indexedIDs[folderID]],
			tasks: [taskID, ...(folders[this.indexedIDs[folderID]].tasks ?? [])],
		};

		this.updateFoldersData(folders);
	}

	addNote(folderID: string, noteID: string) {
		const folders = [...this.folders];
		folders[this.indexedIDs[folderID]] = {
			...folders[this.indexedIDs[folderID]],
			notes: [noteID, ...(folders[this.indexedIDs[folderID]].notes ?? [])],
		};

		this.updateFoldersData(folders);
	}

	deleteNote(folderID: string, noteID: string) {
		const folders = [...this.folders];
		folders[this.indexedIDs[folderID]] = {
			...folders[this.indexedIDs[folderID]],
			notes: folders[this.indexedIDs[folderID]].notes.filter(
				(note) => note != noteID
			),
		};

		this.updateFoldersData(folders);
	}

	deleteTask(folderID: string, taskID: string) {
		const folders = [...this.folders];
		folders[this.indexedIDs[folderID]] = {
			...folders[this.indexedIDs[folderID]],
			tasks: folders[this.indexedIDs[folderID]].tasks.filter(
				(task) => task != taskID
			),
		};

		this.updateFoldersData(folders);
	}

	deleteProject(folderID: string, projectID: string) {
		const folders = [...this.folders];
		folders[this.indexedIDs[folderID]] = {
			...folders[this.indexedIDs[folderID]],
			projects: folders[this.indexedIDs[folderID]].projects.filter(
				(project) => project != projectID
			),
		};

		this.updateFoldersData(folders);
	}

	protected updateFoldersData(folders: IFolder[]) {
		this.folders = folders;
		this.indexedFolders = this.getIndexedFolders();
		this.indexedIDs = this.getIndexedIDs();
	}

	includes(folderID: string): boolean {
		return folderID in this.indexedFolders;
	}

	getFolder(folderID: string): IFolder {
		return this.indexedFolders[folderID];
	}
}
