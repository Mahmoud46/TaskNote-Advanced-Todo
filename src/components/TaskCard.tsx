import { useContext, useEffect, useState, type ReactNode } from "react";

import {
	LuAlarmClock,
	LuCalendarClock,
	LuCheck,
	LuCheckCheck,
	LuChevronDown,
	LuPenLine,
	LuStar,
	LuStarOff,
	LuTrash,
} from "react-icons/lu";
import type { ITask } from "../interfaces/Data.interface";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { useLocation, type NavigateFunction } from "react-router-dom";
import type { Data } from "../classes/Data.class";

const CardControllers = ({
	pathname,
	task,
	dataController,
	setPrevPath,
	navigate,
	setIsOpen,
	isOpen,
}: {
	pathname: string;
	task: ITask;
	dataController: Data;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	navigate: NavigateFunction;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
}): ReactNode => (
	<>
		<div
			onClick={() => {
				setPrevPath(pathname);
				navigate(
					`${pathname == "/" ? "" : pathname}/update-task/${task.task_id}`
				);
			}}
			className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
		>
			<LuPenLine />
		</div>
		<div
			className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
			onClick={() => dataController.deleteTask(task.task_id)}
		>
			<LuTrash />
		</div>
		<div
			className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
			onClick={() =>
				dataController.updateTask({ ...task, is_fav: !task.is_fav })
			}
		>
			{task.is_fav && <LuStarOff />}
			{!task.is_fav && <LuStar />}
		</div>
		<div
			className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<LuChevronDown
				className={`transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
			/>
		</div>
	</>
);

export default function TaskCard({ task }: { task: ITask }): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;

	const [isDone, setIsDone] = useState<boolean>(task.is_done);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const location = useLocation();

	useEffect(() => {
		setIsDone(task.is_done);
	}, [task]);

	return (
		<div
			className={`${
				dataController.tasksDataController.stats.overdue.includes(task.task_id)
					? "bg-red-500/10 border border-red-500/30 backdrop-blur-md"
					: "glass"
			} flex gap-2 items-start p-1 rounded-2xl transition-all duration-300 ease-in-out max-h-[51px] overflow-hidden flex-none ${
				isOpen ? "max-h-[1000px]" : ""
			}`}
		>
			<div className="rounded-full flex pt-1">
				<input
					type="checkbox"
					checked={isDone}
					className="cursor-pointer peer hidden"
					onChange={(e) => {
						setIsDone(e.target.checked);
						dataController.updateTask({
							...task,
							is_done: e.target.checked,
							updated_at: new Date().toISOString(),
						});
					}}
					id={`task-check-${task.task_id}`}
				/>
				<label
					htmlFor={`task-check-${task.task_id}`}
					className={`cursor-pointer p-2 glass flex-none rounded-full`}
				>
					{isDone && <LuCheckCheck className="text-green-300" />}
					{!isDone && (
						<LuCheck className="opacity-80 transition-all hover:opacity-100" />
					)}
				</label>
			</div>
			<div className="flex-1 min-w-[230px] flex flex-col items-start">
				<div className="flex items-start gap-2 justify-between w-full">
					{/* Left column */}
					<div className="flex flex-col flex-1 min-w-0">
						{/* Task Title */}
						<p
							className={`overflow-hidden transition-all duration-300 wrap-break-word ${
								isOpen ? "line-clamp-none" : "line-clamp-1"
							}`}
						>
							{task.title}
						</p>

						{/* Due Dates */}
						<div className="flex gap-2 shrink-0">
							<p className="flex gap-1 text-xs items-center shrink-0">
								<LuCalendarClock className="text-sm" />
								<span>
									{new Date(task.due_date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</span>
							</p>

							{task.due_date.split("T").length > 1 && (
								<p className="flex gap-1 text-xs items-center shrink-0">
									<LuAlarmClock className="text-sm" />
									<span>
										{new Date(task.due_date).toLocaleTimeString("en-US", {
											hour: "numeric",
											minute: "2-digit",
											hour12: true,
										})}
									</span>
								</p>
							)}
						</div>
					</div>

					{/* Right actions */}
					<div className="flex glass rounded-full p-0.5 mt-0.5 flex-none">
						<CardControllers
							pathname={location.pathname}
							task={task}
							dataController={dataController}
							setPrevPath={setPrevPath}
							navigate={navigate}
							setIsOpen={setIsOpen}
							isOpen={isOpen}
						/>
					</div>
				</div>

				<div
					className="mt-2 py-2 border-t border-gray-600 w-full text-sm pl-1 pr-2 wrap-break-word whitespace-pre-wrap description"
					dangerouslySetInnerHTML={{
						__html: task.html_description ?? task.description,
					}}
				></div>
			</div>
		</div>
	);
}
