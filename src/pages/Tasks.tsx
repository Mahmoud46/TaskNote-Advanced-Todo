import { useContext, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
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
import type { TTaskPriority } from "../interfaces/Data.interface";
import TaskCard from "../components/TaskCard";
import OverviewPieChartContainer from "../components/OverviewPieChartContainer";
import { isInCurrentWeek, isToday } from "../libs/utils";

export default function Tasks(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	const [taskPriority, setTaskPriority] = useState<"All" | TTaskPriority>(
		"All"
	);
	const [searchTitle, setSearchTitle] = useState<string>("");
	return (
		<>
			<div className="w-full relative">
				<div className="flex flex-col gap-2 glass min-h-[85dvh] p-4 rounded-2xl w-full">
					<h1 className="text-4xl">My Tasks</h1>
					{dataController.tasksDataController.tasks.length > 0 && (
						<>
							<div className="flex justify-end">
								<div className="glass relative rounded-full pr-2">
									<div className="absolute opacity-80 top-1/2 -translate-y-1/2 left-2">
										<LuSearch />
									</div>
									<input
										type="text"
										value={searchTitle}
										onChange={(e) => setSearchTitle(e.target.value)}
										placeholder="Search task with title..."
										className="outline-0 p-2 pl-8 text-sm"
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
										setPrevPath("/tasks");
										navigate("/tasks/new-task");
									}}
									className="glass p-0.5 cursor-pointer rounded-full group"
								>
									<div className="p-2 transition duration-300 rounded-full group-hover:bg-white group-hover:text-gray-900">
										<LuPlus className="text-lg" />
									</div>
								</div>
							</div>
							<div className="flex w-full gap-2">
								<div className="flex flex-col gap-2 w-[300px]">
									<OverviewPieChartContainer customName="Tasks" />
									<div className="flex gap-2 w-full overflow-auto hide-scroll">
										<div className="flex items-center gap-4 glass p-1 rounded-2xl pr-3 flex-1">
											<LuAlarmClock className="ml-1 text-xl flex-none" />
											<div className="flex-1">
												<p className="text-xs opacity-70">Due today</p>
												<p className="font-medium">
													{
														dataController.tasksDataController.tasks.filter(
															(task) => isToday(task.due_date)
														).length
													}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-4 glass p-1 rounded-2xl pr-3 flex-1">
											<LuCalendarDays className="ml-1 text-xl flex-none" />
											<div className="flex-1">
												<p className="text-xs opacity-70">Current week</p>
												<p className="font-medium">
													{
														dataController.tasksDataController.tasks.filter(
															(task) => isInCurrentWeek(task.due_date)
														).length
													}
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="flex gap-2 flex-1 items-start">
									<div className="flex flex-col gap-2 flex-1 glass p-2 rounded-2xl">
										<h2 className="flex gap-2 items-center">
											<LuClipboardList className="text-xl" />{" "}
											<span className="text-lg">
												{taskPriority != "All"
													? `${taskPriority}-priority`
													: taskPriority}{" "}
												Tasks
											</span>
										</h2>
										<div className="flex flex-col max-w-[500px] gap-2 max-h-[450px] overflow-auto hide-scroll">
											{dataController.tasksDataController.tasks
												.filter(
													(task) =>
														(taskPriority == "All"
															? task
															: task.priority == taskPriority) &&
														(searchTitle.trim() == ""
															? task
															: task.title
																	.toLowerCase()
																	.includes(searchTitle.toLowerCase()))
												)
												.map((task, i) => (
													<TaskCard task={task} key={i} />
												))}
										</div>
									</div>
									<div className="flex flex-col gap-2 flex-1 glass p-2 rounded-2xl">
										<h2 className="flex gap-2 items-center">
											<LuStar className="text-xl" />{" "}
											<span className="text-lg">Favourite Tasks</span>
										</h2>
										<div className="flex flex-col max-w-[500px] gap-2 max-h-[450px] overflow-auto hide-scroll">
											{dataController.tasksDataController.tasks
												.filter(
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
												)
												.map((task, i) => (
													<TaskCard task={task} key={i} />
												))}
										</div>
									</div>
								</div>
							</div>
						</>
					)}
					{dataController.tasksDataController.tasks.length == 0 && (
						<div className="flex flex-col items-center gap-4 py-5 flex-1 justify-center">
							<LuClipboardX className="text-4xl" />
							<p className="text-sm max-w-[300px] text-center">
								There are currently no tasks. Create one to begin.
							</p>

							<div
								onClick={() => {
									setPrevPath("/tasks");
									navigate("/tasks/new-task");
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

				<Outlet />
			</div>
		</>
	);
}
