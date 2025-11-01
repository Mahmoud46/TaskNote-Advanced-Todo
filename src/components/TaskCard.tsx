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
import { Link } from "react-router-dom";

export default function TaskCard({ task }: { task: ITask }): ReactNode {
	const { dataController } = useContext(Context) as IContext;

	const [isDone, setIsDone] = useState<boolean>(task.is_done);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		setIsDone(task.is_done);
	}, [task]);

	return (
		<div
			className={`glass flex gap-2 items-start p-1 rounded-2xl transition-all duration-300 ease-in-out max-h-[51px] overflow-hidden flex-none ${
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
			<div className="flex-1 flex flex-col items-start">
				<div className="flex items-center gap-2 justify-between w-full">
					<div className="">
						<p
							className={`overflow-hidden transition-all duration-300 ${
								isOpen ? "max-h-40 mb-2" : "max-h-6"
							}`}
						>
							{task.title}
						</p>
						<div className="flex gap-2">
							<p className="flex gap-1 text-xs items-center">
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
								<p className="flex gap-1 text-xs items-center">
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
					<div className="flex glass rounded-full p-0.5 mt-0.5">
						<Link
							to={`update-task/${task.task_id}`}
							className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
						>
							<LuPenLine />
						</Link>
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
								className={`transition-all duration-300 ${
									isOpen ? "rotate-180" : ""
								}`}
							/>
						</div>
					</div>
				</div>

				<div className="mt-2 py-2 border-t border-gray-600 w-full text-sm pl-1 pr-2">
					<textarea readOnly className="w-full outline-0 h-fit resize-none">
						{task.description}
					</textarea>
				</div>
			</div>
		</div>
	);
}
