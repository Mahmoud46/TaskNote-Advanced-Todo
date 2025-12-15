import type { IActivity } from "../interfaces/Data.interface";

export const toggleTheme = (): void => {
	const root = document.documentElement;
	root.classList.toggle("light");

	localStorage.setItem(
		"is_dark",
		JSON.stringify(!root.classList.contains("light"))
	);
};

export function getProgressPercentageWithRespect2Date(
	startDate: Date,
	endDate: Date,
	currentDate: Date
): number {
	const start = startDate.getTime();
	const end = endDate.getTime();
	const current = currentDate.getTime();

	if (current <= start) return 0; // before start
	if (current >= end) return 100; // after end

	return ((current - start) / (end - start)) * 100;
}

export function isToday(isoDate: string) {
	const date = new Date(isoDate);
	const now = new Date();

	return (
		date.getFullYear() === now.getFullYear() &&
		date.getMonth() === now.getMonth() &&
		date.getDate() === now.getDate()
	);
}

export function isInCurrentWeek(isoDate: string) {
	const date = new Date(isoDate);
	const now = new Date();

	// Start of the week (Monday)
	const day = now.getDay(); // 0=Sun, 1=Mon, ...
	const diffToMonday = (day === 0 ? -6 : 1) - day;
	const startOfWeek = new Date(now);
	startOfWeek.setDate(now.getDate() + diffToMonday);
	startOfWeek.setHours(0, 0, 0, 0);

	// End of the week (Sunday)
	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6);
	endOfWeek.setHours(23, 59, 59, 999);

	return date >= startOfWeek && date <= endOfWeek;
}

export function getProgressColor(progress: number): string {
	if (progress < 25) return "#f87171"; // red
	if (progress < 50) return "#fb923c"; // orange
	if (progress < 75) return "#60a5fa"; // blue
	return "#4ade80"; // green
}

export function extractLinks(text: string): string[] {
	return text.match(/https?:\/\/[^\s]+/g) || [];
}

export function replaceLinksInSentence(
	sentence: string,
	links: string[]
): string {
	let text: string = sentence;
	for (const link of links)
		text = text.replace(
			link,
			`<a href="${link}" target="_blank">${getPlatformName(link)}</a>`
		);
	return text;
}

export function getPlatformName(url: string) {
	if (url.includes("udemy")) return "Udemy";
	else if (url.includes("coursera")) return "Coursera";
	else if (url.includes("youtube")) return "YouTube";
	else if (url.includes("linkedin")) return "LinkedIn";
	else if (url.includes("tiktok")) return "TikTok";
	else if (url.includes("instagram")) return "Instagram";
	else if (url.includes("facebook")) return "Facebook";
	else if (url.includes("x.com") || url.includes("twitter"))
		return "Twitter / X";
	else if (url.includes("vercel")) return "Vercel";
	else return "Website";
}

const getDateCategory = (date: Date): string => {
	const now = new Date();

	const startOfToday = new Date(now);
	startOfToday.setHours(0, 0, 0, 0);

	const startOfYesterday = new Date(startOfToday);
	startOfYesterday.setDate(startOfToday.getDate() - 1);

	const startOfWeek = new Date(startOfToday);
	startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());

	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	if (date >= startOfToday) return "Today";
	if (date >= startOfYesterday) return "Yesterday";
	if (date >= startOfWeek) return "This Week";
	if (date >= startOfMonth) return "This Month";

	return date.toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
	});
};

export function activitiesDataCategorization(activities: IActivity[]): {
	category: string;
	activities: IActivity[];
}[] {
	const map = new Map<string, IActivity[]>();

	for (const activity of activities) {
		const category = getDateCategory(new Date(activity.created_at));

		if (!map.has(category)) {
			map.set(category, []);
		}

		map.get(category)!.push(activity);
	}

	return Array.from(map.entries()).map(([category, activities]) => ({
		category,
		activities: activities.sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		),
	}));
}

export const dateFormat = (date: string): string =>
	new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
