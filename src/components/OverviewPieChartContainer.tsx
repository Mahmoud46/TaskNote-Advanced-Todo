import { useContext, useState } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import OverviewPieChart from "./OverviewPieChart";
import { LuClipboardX, LuRocket } from "react-icons/lu";

type TItem = "Tasks" | "Projects";

export default function OverviewPieChartContainer({
	customName,
}: {
	customName?: TItem;
}) {
	const { dataController } = useContext(Context) as IContext;
	const [itemName, setItemName] = useState<TItem>(customName ?? "Tasks");

	return (
		<div className="glass flex flex-col p-2 rounded-2xl gap-2 px-2">
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
					<>
						<p className="text-sm max-w-[300px]">
							A total of{" "}
							{itemName == "Tasks" ? (
								<span className="text-green-300">
									{dataController.getStat("Total tasks") == 0
										? 0
										: (
												(dataController.getStat("Completed tasks") /
													dataController.getStat("Total tasks")) *
												100
										  ).toFixed(0) ?? "_"}
									%
								</span>
							) : (
								<span className="text-green-300">
									{dataController.getStat("Total projects") == 0
										? 0
										: (
												(dataController.getStat("Completed projects") /
													dataController.getStat("Total projects")) *
												100
										  ).toFixed(0) ?? "_"}
									%
								</span>
							)}{" "}
							of {itemName.toLowerCase()} have been successfully completed
						</p>
						<div className="flex items-center gap-4 w-full">
							<div className="relative flex-1 max-w-[200px] aspect-[1/1]">
								<OverviewPieChart itemName={itemName} />
							</div>
							<div className="flex gap-2 items-start flex-col">
								{(itemName == "Projects"
									? dataController.projectsStatusCategoryWithColor
									: dataController.tasksStatusCategoryWithColor
								).map((item, i) => (
									<div key={i} className="flex gap-2 flex-none items-center">
										<span
											style={{ backgroundColor: `${item.color}` }}
											className="w-[10px] h-[10px] rounded-full"
										></span>
										<p className="text-sm opacity-70">
											{item.category}{" "}
											<span>
												{(
													(item.count /
														(itemName == "Projects"
															? dataController.getStat("Total projects")
															: dataController.getStat("Total tasks"))) *
													100
												).toFixed(0) ?? "_"}
												%
											</span>
										</p>
									</div>
								))}
							</div>
						</div>
					</>
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
