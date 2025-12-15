import { useContext, useState, type ReactNode } from "react";
import { Outlet, useLocation, type NavigateFunction } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	LuAlarmClock,
	LuCalendarDays,
	LuClipboardList,
	LuClipboardPlus,
	LuClipboardX,
	LuFlag,
	LuPlus,
	LuSearch,
	LuStar,
} from "react-icons/lu";
import type { ITask, TTaskPriority } from "../interfaces/Data.interface";
import TaskCard from "../components/TaskCard";
import OverviewPieChartContainer from "../components/OverviewPieChartContainer";
import { isInCurrentWeek, isToday } from "../libs/utils";

const EmptyTasks = ({
	tasks,
	navigate,
	setPrevPath,
	locationPathname,
	projectID,
	folderID,
}: {
	tasks: ITask[];
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	locationPathname: string;
	projectID?: string;
	folderID?: string;
}): ReactNode => (
	<>
		{tasks.length == 0 && (
			<div className="flex flex-col items-center gap-4 py-5 flex-1 justify-center">
				<LuClipboardX className="text-4xl" />
				<p className="text-sm max-w-[300px] text-center">
					There are currently no tasks. Create one to begin.
				</p>

				<div
					onClick={() => {
						setPrevPath(locationPathname);
						navigate(
							`${locationPathname}/new-task${
								folderID || projectID
									? `?${[
											folderID && `folder_id=${folderID}`,
											projectID && `project_id=${projectID}`,
									  ]
											.filter(Boolean)
											.join("&")}`
									: ""
							}`
						);
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
	</>
);

const TasksControllersAndSelectors = ({
	searchTitle,
	navigate,
	setPrevPath,
	setSearchTitle,
	setTaskPriority,
	tabSelector,
	setTabSelector,
	locationPathname,
	folderID,
	projectID,
}: {
	searchTitle: string;
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
	setTaskPriority: React.Dispatch<React.SetStateAction<TTaskPriority | "All">>;
	tabSelector: "Tasks" | "Favourite Tasks";
	setTabSelector: React.Dispatch<
		React.SetStateAction<"Tasks" | "Favourite Tasks">
	>;
	locationPathname: string;
	folderID?: string;
	projectID?: string;
}): ReactNode => (
	<div className="flex justify-between flex-wrap gap-4">
		<div className="flex items-center pl-0 md:pl-10">
			<button
				className={`flex items-center gap-2 p-2 cursor-pointer transition-all duration-300 relative ${
					tabSelector == "Tasks" ? "" : "opacity-80 hover:opacity-95"
				}`}
				onClick={() => setTabSelector("Tasks")}
			>
				<span
					className={`bg-white h-0.5 left-0 bottom-0 absolute w-0 transition-all duration-300 ${
						tabSelector == "Tasks" ? "w-full" : ""
					}`}
				></span>
				<LuClipboardList className="text-lg" />{" "}
				<span className="text-base font-semibold">All Tasks</span>
			</button>
			<button
				className={`flex items-center gap-2 p-2 cursor-pointer transition-all duration-300 relative ${
					tabSelector == "Favourite Tasks" ? "" : "opacity-80 hover:opacity-95"
				}`}
				onClick={() => setTabSelector("Favourite Tasks")}
			>
				<span
					className={`bg-white h-0.5 left-0 bottom-0 absolute w-0 transition-all duration-300 ${
						tabSelector == "Favourite Tasks" ? "w-full" : ""
					}`}
				></span>
				<LuStar className="text-lg" />{" "}
				<span className="text-base font-semibold">Favourite Tasks</span>
			</button>
		</div>
		<div className="flex justify-end flex-wrap">
			<div className="glass relative rounded-full pr-2">
				<div className="absolute opacity-80 top-1/2 -translate-y-1/2 left-2">
					<LuSearch />
				</div>
				<input
					type="text"
					value={searchTitle}
					onChange={(e) => setSearchTitle(e.target.value)}
					placeholder="Search task with title..."
					className="outline-0 p-2 pl-8 text-sm max-w-[150px] lg:max-w-max"
				/>
			</div>
			<div className="glass relative rounded-full pr-2">
				<LuFlag className="absolute opacity-80 top-1/2 -translate-y-1/2 left-2" />
				<select
					className="cursor-pointer outline-0 p-2 pl-8 text-sm"
					onChange={(e) =>
						setTaskPriority(e.target.value as "All" | TTaskPriority)
					}
				>
					<option value="All" className="bg-white text-gray-900">
						All
					</option>
					<option
						value={"Low"}
						className="bg-white text-gray-900 cursor-pointer"
					>
						Low
					</option>
					<option
						value={"Medium"}
						className="bg-white text-gray-900 cursor-pointer"
					>
						Medium
					</option>
					<option
						value={"High"}
						className="bg-white text-gray-900 cursor-pointer"
					>
						High
					</option>
				</select>
			</div>
			<div
				onClick={() => {
					setPrevPath(locationPathname);
					navigate(
						`${locationPathname}/new-task${
							folderID || projectID
								? `?${[
										folderID && `folder_id=${folderID}`,
										projectID && `project_id=${projectID}`,
								  ]
										.filter(Boolean)
										.join("&")}`
								: ""
						}`
					);
				}}
				className="glass p-0.5 cursor-pointer rounded-full group"
			>
				<div className="p-2 transition duration-300 rounded-full group-hover:bg-white group-hover:text-gray-900">
					<LuPlus className="text-lg" />
				</div>
			</div>
		</div>
	</div>
);

const TasksStats = ({ tasks }: { tasks: ITask[] }): ReactNode => (
	<div className="flex flex-col gap-2 min-w-[300px] max-w-[500px] lg:max-w-[400px] flex-1">
		<OverviewPieChartContainer customName="Tasks" />
		<div className="flex gap-2 w-full overflow-auto hide-scroll">
			<div className="flex items-center gap-4 glass p-1 rounded-2xl pr-3 flex-1">
				<LuAlarmClock className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Due today</p>
					<p className="font-medium">
						{tasks.filter((task) => isToday(task.due_date)).length}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-4 glass p-1 rounded-2xl pr-3 flex-1">
				<LuCalendarDays className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Current week</p>
					<p className="font-medium">
						{tasks.filter((task) => isInCurrentWeek(task.due_date)).length}
					</p>
				</div>
			</div>
		</div>
	</div>
);

const TasksList = ({ tasks }: { tasks: ITask[] }): ReactNode => (
	<div className="flex flex-col gap-2 max-h-[450px] overflow-auto">
		<h2 className="font-semibold">{tasks.length} Tasks found.</h2>
		{tasks.map((task, i) => (
			<TaskCard task={task} key={i} />
		))}
	</div>
);

export const TasksHolderBody = ({
	tasks,
	navigate,
	setPrevPath,
	folderID,
	projectID,
}: {
	tasks: ITask[];
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	folderID?: string;
	projectID?: string;
}): ReactNode => {
	const [taskPriority, setTaskPriority] = useState<"All" | TTaskPriority>(
		"All"
	);
	const [searchTitle, setSearchTitle] = useState<string>("");
	const [tabSelector, setTabSelector] = useState<"Tasks" | "Favourite Tasks">(
		"Tasks"
	);
	const location = useLocation();

	return (
		<>
			{tasks.length > 0 && (
				<>
					<TasksControllersAndSelectors
						searchTitle={searchTitle}
						navigate={navigate}
						setPrevPath={setPrevPath}
						setSearchTitle={setSearchTitle}
						setTaskPriority={setTaskPriority}
						tabSelector={tabSelector}
						setTabSelector={setTabSelector}
						locationPathname={location.pathname}
						folderID={folderID}
						projectID={projectID}
					/>
					<div className="flex w-full gap-2 flex-wrap items-start pl-0 md:pl-10">
						<TasksStats tasks={tasks} />
						<div className="flex-1 min-w-[300px]">
							{tabSelector == "Tasks" && (
								<TasksList
									tasks={tasks.filter(
										(task) =>
											(taskPriority == "All"
												? task
												: task.priority == taskPriority) &&
											(searchTitle.trim() == ""
												? task
												: task.title
														.toLowerCase()
														.includes(searchTitle.toLowerCase()))
									)}
								/>
							)}
							{tabSelector == "Favourite Tasks" && (
								<TasksList
									tasks={tasks.filter(
										(task) =>
											(taskPriority == "All"
												? task
												: task.priority == taskPriority) &&
											(searchTitle.trim() == ""
												? task
												: task.title
														.toLowerCase()
														.includes(searchTitle.toLowerCase())) &&
											task.is_fav
									)}
								/>
							)}
						</div>
					</div>
				</>
			)}
			<EmptyTasks
				tasks={tasks}
				navigate={navigate}
				setPrevPath={setPrevPath}
				locationPathname={location.pathname}
				folderID={folderID}
				projectID={projectID}
			/>
		</>
	);
};

export default function Tasks(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	return (
		<>
			<div className="w-full relative">
				<div className="flex flex-col gap-2 glass min-h-[85dvh] p-4 rounded-2xl w-full">
					<h1 className="text-2xl sm:text-4xl">Your Tasks</h1>
					<TasksHolderBody
						tasks={dataController.tasksDataController.tasks}
						navigate={navigate}
						setPrevPath={setPrevPath}
					/>
				</div>

				<Outlet />
			</div>
		</>
	);
}
