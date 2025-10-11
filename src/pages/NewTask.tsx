import { useContext, useState, type ReactNode } from "react";
import {
	LuAlarmClock,
	LuCalendarCheck,
	LuCalendarClock,
	LuClipboard,
	LuClipboardPlus,
	LuFlag,
	LuNotebook,
	LuPlus,
	LuX,
} from "react-icons/lu";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type {
	ITask,
	TCustomCategory,
	TTaskPriority,
} from "../interfaces/Data.interface";
import { CustomCategoryIcon } from "../libs/icons";
import { CUSTOME_CATEGRIES } from "../constants/data";
import { nanoid } from "nanoid";
import type { IContext } from "../interfaces/Context.interface";
import { Context } from "../context/Context";

export default function NewTask(): ReactNode {
	const [searchParams] = useSearchParams();
	const folderID = searchParams.get("folder_id");
	const projectID = searchParams.get("project_id");

	const { dataController } = useContext(Context) as IContext;
	const today = new Date().toISOString().split("T")[0];
	// Form
	const [taskTitle, setTaskTitle] = useState<string>("");
	const [taskPriority, setTaskPriority] = useState<TTaskPriority>("Low");
	const [taskDueDate, setTaskDueDate] = useState<string>("");
	const [taskDueTime, setTaskDueTime] = useState<string>("");
	const [taskCategory, setTaskCategory] = useState<TCustomCategory>("Work");
	const [taskDescription, setTaskDescription] = useState<string>("");

	const navigate = useNavigate();
	return (
		<div className="fixed z-30 top-0 h-full w-full flex items-center justify-center -left-0">
			<div className="glass p-2 rounded-2xl max-h-[500px] overflow-auto flex flex-col gap-2 sm:w-[50%]">
				<div className="sticky top-0 z-40 flex w-full justify-between items-start">
					<h1 className="flex items-center gap-2 text-lg p-2">
						<LuClipboardPlus className="text-xl" />
						<span className="">New Task</span>
					</h1>
					<Link
						to={`${location.pathname.includes("tasks") ? "/tasks" : "/"}`}
						className="glass p-1 rounded-full"
					>
						<LuX />
					</Link>
				</div>

				<form
					className="p-2 flex flex-col gap-2"
					onSubmit={(e) => {
						e.preventDefault();
						const taskFormData: ITask = {
							task_id: nanoid(),
							title: taskTitle,
							description: taskDescription,
							due_date: `${taskDueDate}${
								taskDueTime != "" ? `T${taskDueTime}:00` : ""
							}`,
							is_done: false,
							priority: taskPriority,
							created_at: new Date().toISOString(),
							category: taskCategory,
							is_fav: false,
						};

						if (folderID) taskFormData.folder_id = folderID;
						if (projectID) taskFormData.project_id = projectID;

						dataController.createTask(taskFormData);
						navigate(`${location.pathname.includes("tasks") ? "/tasks" : "/"}`);
					}}
				>
					<div className="glass relative rounded-full text-sm">
						<LuClipboard className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
						<input
							type="text"
							required
							placeholder="Task Title"
							value={taskTitle}
							onChange={(e) => {
								setTaskTitle(e.target.value);
							}}
							className="w-full p-2 pl-8 outline-0"
						/>
					</div>

					<div className="flex gap-2">
						<div className="glass relative rounded-full text-sm pr-2">
							<LuFlag className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
							<select
								value={taskPriority}
								onChange={(e) =>
									setTaskPriority(e.target.value as TTaskPriority)
								}
								className="w-full p-2 pl-7 outline-0 cursor-pointer"
							>
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
						<div className="flex items-center">
							<div className="glass relative rounded-full text-sm">
								<LuCalendarClock className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
								<input
									type="date"
									required
									value={taskDueDate}
									onChange={(e) => {
										setTaskDueDate(e.target.value);
									}}
									className="w-full p-2 pl-8 outline-0"
								/>
							</div>
							{taskDueDate != today && (
								<div
									className="glass p-0.5 rounded-full cursor-pointer group"
									onClick={() => setTaskDueDate(today)}
								>
									<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
										<LuCalendarCheck className="text-lg" />
									</div>
								</div>
							)}
						</div>
						<div className="glass relative rounded-full text-sm">
							<LuAlarmClock className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
							<input
								type="time"
								value={taskDueTime}
								onChange={(e) => {
									setTaskDueTime(e.target.value);
								}}
								className="w-full p-2 pl-8 outline-0"
							/>
						</div>
						<div className="glass relative rounded-full text-sm pr-2">
							<div className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base">
								<CustomCategoryIcon category={taskCategory} />
							</div>
							<select
								className="w-full p-2 pl-8 outline-0 cursor-pointer"
								value={taskCategory}
								onChange={(e) =>
									setTaskCategory(e.target.value as TCustomCategory)
								}
							>
								{CUSTOME_CATEGRIES.map((cat, i) => (
									<option
										key={i}
										className="bg-white text-gray-900 cursor-pointer"
									>
										{cat}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="w-full glass relative rounded-2xl text-sm">
						<LuNotebook
							className={"opacity-70 absolute left-2 top-2.5 text-base"}
						/>
						<textarea
							value={taskDescription}
							placeholder="Add a clear, detailed description to help you understand this task at a glance. (Optional)"
							className="resize-none w-full p-2 outline-0 h-[200px] pl-8"
							onChange={(e) => setTaskDescription(e.target.value)}
						></textarea>
					</div>
					<button className="flex items-center text-sm max-w-[2.25rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] flex-row-reverse cursor-pointer self-end">
						<div className="glass p-0.5 rounded-full">
							<div className="p-1.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuPlus className="text-lg flex-none" />
							</div>
						</div>
						<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
							Add Task
						</span>
					</button>
				</form>
			</div>
		</div>
	);
}
