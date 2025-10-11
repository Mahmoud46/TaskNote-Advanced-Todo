import { useContext, type ReactNode } from "react";

import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import type { TStat } from "../classes/Data.class";
import { StatIcon } from "../libs/icons";

export default function StatsOverview(): ReactNode {
	const { dataController } = useContext(Context) as IContext;
	const stats_titles: TStat[] = [
		"Total folders",
		"Total projects",
		"Ongoing projects",
		"Upcoming projects",
		"Completed projects",
		"Total tasks",
		"Completed tasks",
		"Overdue tasks",
		"Total notes",
	];

	return (
		<div className="w-full relative">
			<div className="flex gap-2 w-full overflow-auto hide-scroll">
				{stats_titles.map((title, i) => (
					<div
						className="flex flex-none items-center gap-4 glass p-1 rounded-2xl pr-3 w-[170px]"
						key={i}
					>
						<StatIcon title={title} className="ml-1 text-xl flex-none" />
						<div className="flex-1">
							<p className="text-xs opacity-70">{title}</p>
							<p className="font-medium">{dataController.getStat(title)}</p>
							{!title.includes("Total") && (
								<p className="text-xs">
									<span className="text-green-300">
										{title.includes("projects")
											? dataController.getStat("Total projects") > 0
												? (
														(dataController.getStat(title) /
															dataController.getStat("Total projects")) *
														100
												  ).toFixed(0)
												: 0
											: dataController.getStat("Total tasks") > 0
											? (
													(dataController.getStat(title) /
														dataController.getStat("Total tasks")) *
													100
											  ).toFixed(0)
											: 0}
										%
									</span>{" "}
									<span>
										{title.includes("projects") ? "of projects" : "of tasks"}
									</span>
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
