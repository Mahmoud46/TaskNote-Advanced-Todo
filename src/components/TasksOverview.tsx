import { useContext } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { LuClipboardPlus, LuArrowRight, LuClipboardX } from "react-icons/lu";
import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";

export default function TasksOverview() {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	return (
		<div className="flex-1 flex flex-col gap-1 glass p-2 rounded-2xl">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold px-2 flex items-center gap-2">Tasks</h1>
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
	);
}
