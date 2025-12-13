import NowDateTime from "../components/DateTime";
import StatsOverview from "../components/StatsOverview";

import ProjectsOverview from "../components/ProjectsOverview";
import FoldersOverview from "../components/FoldersOverview";

import OverviewPieChartContainer from "../components/OverviewPieChartContainer";
import DailyActivityLineChart from "../components/DailyActivityLineChart";

import { Outlet } from "react-router-dom";
import RecentActivites from "../components/RecentActivites";
import NotesOverview from "../components/NotesOverview";
import TasksOverview from "../components/TasksOverview";

export default function Home() {
	return (
		<>
			<div className="gap-2 rounded-2xl flex flex-col w-full lg:pr-[310px] xl:pr-[360px] relative">
				<div className="flex glass p-2 flex-col w-full gap-2 rounded-2xl">
					<StatsOverview />
					<div className="flex gap-2 flex-wrap items-start">
						<NotesOverview />
						<TasksOverview />
					</div>

					<div className="flex gap-2 flex-wrap">
						<div className="flex-1 relative min-h-[250px] min-w-[250px]">
							<DailyActivityLineChart />
						</div>
						<OverviewPieChartContainer />
					</div>
					<div className="flex items-start gap-2 flex-wrap">
						<FoldersOverview />
						<ProjectsOverview />
					</div>
				</div>

				<div className="glass w-[300px] xl:w-[350px] fixed right-8 p-2 rounded-2xl hidden lg:flex flex-col gap-2 max-h-[550px] overflow-auto hide-scroll">
					<NowDateTime />
					{/* <div className="glass h-[200px] flex-none rounded-2xl p-2">
						Calendar
					</div> */}
					<RecentActivites />
				</div>

				<Outlet />
			</div>
		</>
	);
}
