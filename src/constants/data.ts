import type { IconType } from "react-icons";
import type {
	TCustomCategory,
	TProjectStatus,
	TTaskPriority,
} from "../interfaces/Data.interface";
import {
	LuClipboardList,
	LuFiles,
	LuFolders,
	LuHouse,
	LuRocket,
} from "react-icons/lu";

export const PAGES_MENU_PATHS: {
	title: string;
	icon: IconType;
	path: string;
}[] = [
	{ title: "Home", icon: LuHouse, path: "/" },
	{ title: "Folders", icon: LuFolders, path: "/folders" },
	{ title: "Projects", icon: LuRocket, path: "/projects" },
	{ title: "Tasks", icon: LuClipboardList, path: "/tasks" },
	{ title: "Notes", icon: LuFiles, path: "/notes" },
];

export const PROJECT_STATUS_COLOR: Record<TProjectStatus, string> = {
	Completed: "text-green-300",
	"In Progress": "text-blue-300",
	Pending: "text-yellow-300",
};

export const PRIORITY_MAP: Record<TTaskPriority, number> = {
	High: 1,
	Medium: 2,
	Low: 3,
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
