import type {
	TCustomCategory,
	TProjectStatus,
} from "../interfaces/Data.interface";

export const PROJECT_STATUS_COLOR: Record<TProjectStatus, string> = {
	Completed: "text-green-300",
	"In Progress": "text-blue-300",
	Pending: "text-yellow-300",
};

export const PROJECT_STATUS: { title: TProjectStatus; value: string }[] = [
	{ title: "Completed", value: "Completed" },
	{ title: "Pending", value: "Upcoming" },
	{ title: "In Progress", value: "Ongoing" },
];

export const PROJECT_STATUS_MAP: Record<TProjectStatus, string> = {
	Completed: "Completed",
	Pending: "Upcoming",
	"In Progress": "Ongoing",
};

export const CUSTOME_CATEGRIES: TCustomCategory[] = [
	"Work",
	"Career Development",
	"Study",
	"Learning & Research",
	"Projects",
	"Technology",
	"Content Creation",
	"Home",
	"Household",
	"Maintenance",
	"Car / Property",
	"Finance",
	"Legal",
	"Admin & Paperwork",
	"Health",
	"Fitness",
	"Self-Care",
	"Mental Wellness",
	"Travel",
	"Shopping",
	"Errands",
	"Food & Cooking",
	"Family",
	"Friends",
	"Relationships",
	"Social",
	"Events & Appointments",
	"Volunteering",
	"Community",
	"Spirituality",
	"Hobbies",
	"Creativity",
	"Entertainment",
	"Media",
	"Pets",
	"Ideas & Notes",
	"Goals & Vision",
	"Emergency",
	"Miscellaneous",
];

export const WEEK_DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
