export interface IData {
	folders: IFolder[];
	projects: IProject[];
	notes: INote[];
	tasks: ITask[];
}

export interface IFolder {
	folder_id: string;
	title: string;
	projects: string[]; // Projects IDs
	notes: string[];
	tasks: string[];
	created_at: string;
	updated_at?: string;
	category?: TCustomCategory;
}

export interface IProject {
	project_id: string;
	folder_id?: string;
	status: TProjectStatus;
	title: string;
	description: string;
	html_description:string
	tasks: string[]; // Tasks IDs
	notes: string[]; // Notes IDs
	links?: string[];
	start_date: string;
	due_date: string;
	created_at: string;
	updated_at?: string;
	category?: TCustomCategory;
}

export interface INote {
	project_id?: string;
	folder_id?: string;

	note_id: string;
	title: string;
	content: string;

	created_at: string;
	updated_at?: string;
	category?: TCustomCategory;

	is_fav: boolean;
}

export interface ITask {
	project_id?: string;
	folder_id?: string;

	task_id: string;
	title: string;
	description: string;

	due_date: string; // Deadline (ISO format)
	is_done: boolean; // Status of the task
	priority: TTaskPriority;

	created_at: string;
	updated_at?: string;
	category?: TCustomCategory;

	is_fav: boolean;
}

export interface IActivity {
	activity_id: string; // Unique ID for the activity
	type: TActivityType; // Type of activity
	title: string; // Short description or title of the activity
	description?: string; // Optional detailed description
	reference_id?: string; // ID of the related task/project/note/folder
	action: TActivityAction; // Performed action
	created_at: string; // ISO timestamp when activity occurred
}

export type TActivityType = "task" | "project" | "note" | "folder";
export type TActivityAction =
	| "created"
	| "updated"
	| "deleted"
	| "completed"
	| "favourited";
export type TProjectStatus = "Pending" | "In Progress" | "Completed";
export type TTaskPriority = "Low" | "Medium" | "High";
export type TCustomCategory =
	| "Work"
	| "Career Development"
	| "Study"
	| "Learning & Research"
	| "Projects"
	| "Technology"
	| "Content Creation"
	| "Home"
	| "Household"
	| "Maintenance"
	| "Car / Property"
	| "Finance"
	| "Legal"
	| "Admin & Paperwork"
	| "Health"
	| "Fitness"
	| "Self-Care"
	| "Mental Wellness"
	| "Travel"
	| "Shopping"
	| "Errands"
	| "Food & Cooking"
	| "Family"
	| "Friends"
	| "Relationships"
	| "Social"
	| "Events & Appointments"
	| "Volunteering"
	| "Community"
	| "Spirituality"
	| "Hobbies"
	| "Creativity"
	| "Entertainment"
	| "Media"
	| "Pets"
	| "Ideas & Notes"
	| "Goals & Vision"
	| "Emergency"
	| "Miscellaneous";
