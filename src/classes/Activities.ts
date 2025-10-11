import type { IActivity } from "../interfaces/Data.interface";

interface IActivitiesData {
	activities: IActivity[];
}

export class Activities {
	activities: IActivity[];
	protected dateIndexedActivitesCount: Record<string, number>;

	constructor() {
		this.activities = [];
		this.dateIndexedActivitesCount = {};
	}

	init() {
		const activitiesData: IActivitiesData = JSON.parse(
			(localStorage.getItem("activities") ?? "{}") as string
		);

		this.activities = activitiesData.activities ?? [];
		this.dateIndexedActivitesCount = this.getDateIndexedActivitesCount();
	}

	insert(activity: IActivity) {
		const activities: IActivity[] = [activity, ...this.activities];
		this.updateData(activities);
	}

	protected getDateIndexedActivitesCount(): Record<string, number> {
		const dateIndexedActivitesCount: Record<string, number> = {};
		for (const activity of this.activities)
			dateIndexedActivitesCount[activity.created_at.split("T")[0]] =
				(dateIndexedActivitesCount[activity.created_at.split("T")[0]] || 0) + 1;

		return dateIndexedActivitesCount;
	}

	protected increment(date: string) {
		this.dateIndexedActivitesCount[date] =
			(this.dateIndexedActivitesCount[date] || 0) + 1;
	}

	getActivityGraphData(): { date: string; count: number }[] {
		return Object.entries(this.dateIndexedActivitesCount)
			.map(([date, count]) => ({
				date,
				count,
			}))
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	}

	protected updateData(activities: IActivity[]) {
		this.activities = activities;
		this.increment(this.activities[0].created_at.split("T")[0]);
		this.dateIndexedActivitesCount = this.getDateIndexedActivitesCount();

		const activitiesData: IActivitiesData = {
			activities: this.activities,
		};
		localStorage.setItem("activities", JSON.stringify(activitiesData));
	}
}
