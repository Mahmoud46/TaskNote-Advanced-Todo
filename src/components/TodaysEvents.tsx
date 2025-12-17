import { useContext, useEffect, useState, type ReactNode } from "react";
import { LuCalendarDays, LuListX } from "react-icons/lu";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import type { ITask } from "../interfaces/Data.interface";
import { isToday } from "../libs/utils";
import TaskCard from "./TaskCard";

export default function TodaysEvents(): ReactNode {
	const { dataController } = useContext(Context) as IContext;
	const [todaysEvents, setTodaysEvents] = useState<ITask[]>([]);
	useEffect(() => {
		setTodaysEvents(
			dataController.tasksDataController.tasks.filter((task) =>
				isToday(task.due_date)
			)
		);
	}, [dataController.tasksDataController.tasks]);
	return (
		<div className="glass p-2 rounded-2xl flex flex-col gap-2 w-full">
			{todaysEvents.length > 0 && (
				<>
					<div className="flex justify-between items-center">
						<div className="text-base font-semibold flex items-center gap-2">
							<LuCalendarDays className="text-lg" />
							<p>Today's Events</p>
						</div>
					</div>
					<div className="flex flex-col gap-2 max-h-[400px] overflow-auto hide-scroll">
						{todaysEvents.map((event, i) => (
							<TaskCard task={event} key={i} />
						))}
					</div>
				</>
			)}

			{todaysEvents.length == 0 && (
				<div className="flex items-center justify-center flex-col p-10 gap-2">
					<LuListX className="text-3xl" />
					<p className="text-xs text-center">
						Looks like today is free! Your events will appear here once you add
						them.
					</p>
				</div>
			)}
		</div>
	);
}
