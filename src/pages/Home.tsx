import { useContext } from "react";
import NowDateTime from "../components/DateTime";
import StatsOverview from "../components/StatsOverview";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

import ProjectsOverview from "../components/ProjectsOverview";
import FoldersOverview from "../components/FoldersOverview";

import TaskCard from "../components/TaskCard";
import NoteCard from "../components/NoteCard";
import OverviewPieChartContainer from "../components/OverviewPieChartContainer";
import DailyActivityLineChart from "../components/DailyActivityLineChart";
import {
	LuArrowRight,
	LuClipboardPlus,
	LuClipboardX,
	LuFilePlus,
	LuFileX,
} from "react-icons/lu";
import { Link, Outlet } from "react-router-dom";
import RecentActivites from "../components/RecentActivites";

export default function Home() {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	return (
		<>
			<div className="gap-2 rounded-2xl flex flex-col w-full lg:pr-[310px] xl:pr-[360px] relative">
				<div className="flex glass p-2 flex-col w-full gap-2 rounded-2xl">
					<StatsOverview />
					<div className="flex gap-2 flex-wrap items-start">
						<div className="flex-1 flex flex-col gap-1 glass p-2 rounded-2xl">
							<div className="flex justify-between items-center">
								<h1 className="font-semibold px-2 flex items-center gap-2">
									My Notes
								</h1>
								{dataController.notesDataController.notes.length > 0 && (
									<div className="flex items-center">
										<div
											onClick={() => {
												setPrevPath("/");
												navigate("/new-note");
											}}
											className="glass p-0.5 rounded-full flex-none group cursor-pointer"
										>
											<div className="p-2 text-lg transition duration-300 group-hover:bg-white group-hover:text-gray-900 rounded-full">
												<LuFilePlus />
											</div>
										</div>
										<Link
											to={"/notes"}
											className="glass p-0.5 rounded-full flex-none group cursor-pointer"
										>
											<div className="p-2 text-lg transition duration-300 group-hover:bg-white group-hover:text-gray-900 group-hover:-rotate-45 rounded-full">
												<LuArrowRight />
											</div>
										</Link>
									</div>
								)}
							</div>
							{dataController.notesDataController.notes.length > 0 && (
								<div className="overflow-auto hide-scroll flex flex-col gap-2">
									{dataController.notesDataController.notes
										.slice(0, 3)
										.map((note, i) => (
											<NoteCard note={note} key={i} />
										))}
								</div>
							)}
							{dataController.notesDataController.notes.length == 0 && (
								<div className="flex flex-col items-center gap-4 py-5">
									<LuFileX className="text-4xl" />
									<p className="text-sm max-w-[300px] text-center">
										There are currently no notes. Create one to begin.
									</p>

									<div
										onClick={() => {
											setPrevPath("/");
											navigate("/new-note");
										}}
										className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
									>
										<div className="glass p-0.5 rounded-full">
											<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
												<LuFilePlus className="text-lg flex-none" />
											</div>
										</div>
										<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
											Add Note
										</span>
									</div>
								</div>
							)}
						</div>
						<div className="flex-1 flex flex-col gap-1 glass p-2 rounded-2xl">
							<div className="flex justify-between items-center">
								<h1 className="font-semibold px-2 flex items-center gap-2">
									My Tasks
								</h1>
								{dataController.tasksDataController.tasks.length > 0 && (
									<div className="flex">
										<div
											onClick={() => {
												setPrevPath("/");
												navigate("/new-task");
											}}
											className="glass p-0.5 rounded-full flex-none group cursor-pointer"
										>
											<div className="p-2 text-lg transition duration-300 group-hover:bg-white group-hover:text-gray-900 rounded-full">
												<LuClipboardPlus />
											</div>
										</div>

										<Link
											to={"/tasks"}
											className="glass p-0.5 rounded-full flex-none group cursor-pointer"
										>
											<div className="p-2 text-lg transition duration-300 group-hover:bg-white group-hover:text-gray-900 group-hover:-rotate-45 rounded-full">
												<LuArrowRight />
											</div>
										</Link>
									</div>
								)}
							</div>
							{dataController.tasksDataController.tasks.length > 0 && (
								<div className="overflow-auto hide-scroll flex flex-col gap-2">
									{dataController.tasksDataController.tasks
										.slice(0, 3)
										.map((task, i) => (
											<TaskCard task={task} key={i} />
										))}
								</div>
							)}
							{dataController.tasksDataController.tasks.length == 0 && (
								<div className="flex flex-col items-center gap-4 py-5">
									<LuClipboardX className="text-4xl" />
									<p className="text-sm max-w-[300px] text-center">
										There are currently no tasks. Create one to begin.
									</p>

									<div
										onClick={() => {
											setPrevPath("/");
											navigate("/new-task");
										}}
										className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
									>
										<div className="glass p-0.5 rounded-full">
											<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
												<LuClipboardPlus className="text-lg flex-none" />
											</div>
										</div>
										<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
											Add Task
										</span>
									</div>
								</div>
							)}
						</div>
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
