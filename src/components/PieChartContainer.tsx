import type { TTaskCat, TProjectCat } from "../classes/Data.class";
import { sumNums } from "../libs/utils";
import { useEffect, useState } from "react";
import PieChart from "./PieChart";
import type { TTaskPriority } from "../interfaces/Data.interface";

export interface TasksProjectsCatWithColorStats {
	category: TTaskCat | TProjectCat | TTaskPriority;
	count: number;
	color: string;
}

export default function PieChartContainer({
	data,
}: {
	data: TasksProjectsCatWithColorStats[];
}) {
	const [completedItem, setCompletedItem] =
		useState<TasksProjectsCatWithColorStats | null>(null);

	useEffect(() => {
		for (const item of data)
			if (item.category == "Completed") setCompletedItem(item);
	}, [data]);
	return (
		<div>
			{!JSON.stringify(data).includes("Low") ? (
				<p className="text-sm max-w-[300px]">
					A total of{" "}
					{JSON.stringify(data).includes("Upcoming") ? (
						<span className="text-green-300">
							{sumNums(...data.map((i) => i.count)) == 0
								? 0
								: (
										((completedItem?.count ?? 0) /
											sumNums(...data.map((i) => i.count))) *
										100
								  ).toFixed(0) ?? "_"}
							%
						</span>
					) : (
						<span className="text-green-300">
							{sumNums(...data.map((i) => i.count)) == 0
								? 0
								: (
										((completedItem?.count ?? 0) /
											sumNums(...data.map((i) => i.count))) *
										100
								  ).toFixed(0) ?? "_"}
							%
						</span>
					)}{" "}
					of {JSON.stringify(data).includes("Upcoming") ? "projects" : "tasks"}{" "}
					have been successfully completed
				</p>
			) : (
				<p className="text-sm max-w-[300px]">
					A total of{" "}
					<span className="text-green-300">
						{sumNums(...data.map((i) => i.count)) == 0
							? 0
							: (
									((data[0].count ?? 0) /
										sumNums(...data.map((i) => i.count))) *
									100
							  ).toFixed(0) ?? "_"}
						%
					</span>{" "}
					of tasks have a low priority, while{" "}
					<span className="text-green-300">
						{sumNums(...data.map((i) => i.count)) == 0
							? 0
							: (
									((data[1].count ?? 0) /
										sumNums(...data.map((i) => i.count))) *
									100
							  ).toFixed(0) ?? "_"}
						%
					</span>{" "}
					of tasks have a medium priority, and{" "}
					<span className="text-green-300">
						{sumNums(...data.map((i) => i.count)) == 0
							? 0
							: (
									((data[2].count ?? 0) /
										sumNums(...data.map((i) => i.count))) *
									100
							  ).toFixed(0) ?? "_"}
						%
					</span>{" "}
					of tasks have a high priority
				</p>
			)}
			<div className="flex items-center gap-4 w-full">
				<div className="relative flex-1 max-w-[200px] aspect-[1/1]">
					<PieChart data={data} />
				</div>
				<div className="flex gap-2 items-start flex-col">
					{data.map((item, i) => (
						<div key={i} className="flex gap-2 flex-none items-center">
							<span
								style={{ backgroundColor: `${item.color}` }}
								className="w-[10px] h-[10px] rounded-full"
							></span>
							<p className="text-sm opacity-70">
								{item.category}{" "}
								<span>
									{(
										(item.count / sumNums(...data.map((i) => i.count))) *
										100
									).toFixed(0) ?? "_"}
									%
								</span>
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
