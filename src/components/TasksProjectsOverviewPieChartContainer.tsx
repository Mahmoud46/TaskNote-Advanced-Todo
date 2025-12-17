import { useContext, useState } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { LuClipboardX, LuRocket } from "react-icons/lu";
import PieChartContainer from "./PieChartContainer";

type TItem = "Tasks" | "Projects";

export default function TasksProjectsOverviewPieChartContainer({
	customName,
}: {
	customName?: TItem;
}) {
	const { dataController } = useContext(Context) as IContext;
	const [itemName, setItemName] = useState<TItem>(customName ?? "Tasks");

	return (
		<div className="glass flex flex-col p-3 rounded-2xl gap-2 px-2 w-full sm:w-auto">
			{!customName && (
				<h1 className="text-left w-full font-semibold">
					<select
						value={itemName}
						onChange={(e) => setItemName(e.target.value as TItem)}
						className="cursor-pointer outline-0"
					>
						<option
							value="Tasks"
							className="bg-white text-gray-900 cursor-pointer"
						>
							Tasks
						</option>
						<option
							value="Projects"
							className="bg-white text-gray-900 cursor-pointer"
						>
							Projects
						</option>
					</select>{" "}
					Status
				</h1>
			)}

			{customName && (
				<h1 className="text-left w-full font-semibold">{customName} Status</h1>
			)}
			<>
				{((itemName == "Projects" &&
					dataController.projectsDataController.projects.length > 0) ||
					(itemName == "Tasks" &&
						dataController.tasksDataController.tasks.length > 0)) && (
					<PieChartContainer
						data={
							itemName == "Projects"
								? dataController.projectsStatusCategoryWithColor
								: dataController.tasksStatusCategoryWithColor
						}
					/>
				)}
			</>
			{((itemName == "Projects" &&
				dataController.projectsDataController.projects.length == 0) ||
				(itemName == "Tasks" &&
					dataController.tasksDataController.tasks.length == 0)) && (
				<>
					{itemName == "Projects" && (
						<div className="flex flex-col items-center gap-4 py-10">
							<LuRocket className="text-4xl" />
							<p className="text-sm max-w-[300px] text-center">
								There are currently no projects. Create one to begin.
							</p>
						</div>
					)}
					{itemName == "Tasks" && (
						<div className="flex flex-col items-center gap-4 py-10">
							<LuClipboardX className="text-4xl" />
							<p className="text-sm max-w-[300px] text-center">
								There are currently no tasks. Create one to begin.
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}
