import {
	LuBriefcase,
	LuGraduationCap,
	LuLaptop,
	LuFolderKanban,
	LuCamera,
	LuHouse,
	LuWrench,
	LuCar,
	LuWallet,
	LuFileText,
	LuClipboardList,
	LuHeartPulse,
	LuDumbbell,
	LuBrain,
	LuPlane,
	LuShoppingCart,
	LuPackage,
	LuUtensils,
	LuUsers,
	LuUser,
	LuHandshake,
	LuCalendar,
	LuGlobe,
	LuBookOpen,
	LuPaintbrush,
	LuGamepad2,
	LuMusic,
	LuDog,
	LuLightbulb,
	LuTarget,
	LuTriangleAlert,
	LuAsterisk,
	LuFolders,
	LuLoader,
	LuClipboardCheck,
	LuClipboard,
	LuAlarmClock,
	LuClock,
	LuCheck,
	LuClipboardPlus,
	LuBell,
	LuClipboardPen,
	LuClipboardMinus,
	LuFilePlus,
	LuFilePen,
	LuFileX,
	LuPlus,
	LuPenLine,
	LuTrash,
	LuFolderPlus,
	LuFolderPen,
	LuFolderX,
	LuCheckCheck,
	LuStar,
} from "react-icons/lu";

import type {
	TActivityAction,
	TActivityType,
	TCustomCategory,
} from "../interfaces/Data.interface";
import type { ReactNode } from "react";
import type { TStat } from "../classes/Data.class";
import {
	SiFacebook,
	SiGithub,
	SiInstagram,
	SiLinkedin,
	SiUdemy,
	SiVercel,
	SiYoutube,
} from "react-icons/si";
import { GrCubes } from "react-icons/gr";

export function CustomCategoryIcon({
	category,
}: {
	category: TCustomCategory;
}): ReactNode {
	switch (category) {
		case "Work":
			return <LuBriefcase />;
		case "Career Development":
			return <LuGraduationCap />;
		case "Study":
			return <LuGraduationCap />;
		case "Learning & Research":
			return <LuBookOpen />;
		case "Projects":
			return <LuFolderKanban />;
		case "Technology":
			return <LuLaptop />;
		case "Content Creation":
			return <LuCamera />;
		case "Home":
		case "Household":
			return <LuHouse />;
		case "Maintenance":
			return <LuWrench />;
		case "Car / Property":
			return <LuCar />;
		case "Finance":
			return <LuWallet />;
		case "Legal":
			return <LuFileText />;
		case "Admin & Paperwork":
			return <LuClipboardList />;
		case "Health":
			return <LuHeartPulse />;
		case "Fitness":
			return <LuDumbbell />;
		case "Self-Care":
		case "Mental Wellness":
			return <LuBrain />;
		case "Travel":
			return <LuPlane />;
		case "Shopping":
			return <LuShoppingCart />;
		case "Errands":
			return <LuPackage />;
		case "Food & Cooking":
			return <LuUtensils />;
		case "Family":
		case "Social":
			return <LuUsers />;
		case "Friends":
			return <LuUser />;
		case "Relationships":
			return <LuHandshake />;
		case "Events & Appointments":
			return <LuCalendar />;
		case "Volunteering":
		case "Community":
			return <LuGlobe />;
		case "Spirituality":
			return <LuBookOpen />;
		case "Hobbies":
		case "Creativity":
			return <LuPaintbrush />;
		case "Entertainment":
			return <LuGamepad2 />;
		case "Media":
			return <LuMusic />;
		case "Pets":
			return <LuDog />;
		case "Ideas & Notes":
			return <LuLightbulb />;
		case "Goals & Vision":
			return <LuTarget />;
		case "Emergency":
			return <LuTriangleAlert />;
		case "Miscellaneous":
			return <LuAsterisk />;
	}
}

export function StatIcon({
	title,
	className = "",
}: {
	title: TStat;
	className?: string;
}) {
	switch (title) {
		case "Total folders":
			return <LuFolders className={className} />;
		case "Total projects":
			return <GrCubes className={className} />;
		case "Ongoing projects":
			return <LuLoader className={className} />;
		case "Upcoming projects":
			return <LuClock className={className} />;
		case "Completed projects":
			return <LuCheck className={className} />;
		case "Total tasks":
			return <LuClipboardList className={className} />;
		case "Completed tasks":
			return <LuClipboardCheck className={className} />;
		case "Overdue tasks":
			return <LuAlarmClock className={className} />;
		case "Total notes":
			return <LuFileText className={className} />;
		default:
			return <LuClipboard className={className} />; // fallback
	}
}

export function ActivityIcon({
	action,
	type,
}: {
	action: TActivityAction;
	type: TActivityType;
}): ReactNode {
	switch (`${action}-${type}`) {
		// Task
		case "created-task":
			return <LuClipboardPlus />;
		case "updated-task":
			return <LuClipboardPen />;
		case "deleted-task":
			return <LuClipboardMinus />;
		case "completed-task":
			return <LuClipboardCheck />;
		case "favourited-task":
			return <LuStar />;

		// Note
		case "created-note":
			return <LuFilePlus />;
		case "updated-note":
			return <LuFilePen />;
		case "deleted-note":
			return <LuFileX />;
		case "favourited-note":
			return <LuStar />;

		// Project
		case "created-project":
			return <LuPlus />;
		case "updated-project":
			return <LuPenLine />;
		case "deleted-project":
			return <LuTrash />;
		case "completed-project":
			return <LuCheckCheck />;

		// folder
		case "created-folder":
			return <LuFolderPlus />;
		case "updated-folder":
			return <LuFolderPen />;
		case "deleted-folder":
			return <LuFolderX />;

		default:
			return <LuBell />;
	}
}

export const Icon = ({
	content,
	className = "",
}: {
	content: string;
	className?: string;
}): ReactNode => {
	switch (content) {
		case "udemy":
			return <SiUdemy className={className} />;
		case "linkedin":
			return <SiLinkedin className={className} />;
		case "facebook":
			return <SiFacebook className={className} />;
		case "youtube":
			return <SiYoutube className={className} />;
		case "instagram":
			return <SiInstagram className={className} />;
		case "vercel":
			return <SiVercel className={className} />;
		case "github":
			return <SiGithub className={className} />;

		default:
			return <LuGlobe className={className} />;
	}
};
