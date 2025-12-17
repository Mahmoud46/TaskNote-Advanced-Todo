import { useContext, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import TasksHolderBody from "../components/TasksHolderBody";
import { getTasksPriosWithColor } from "../libs/utils";

export default function Tasks(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	return (
		<>
			<div className="w-full relative">
				<div className="flex flex-col gap-2 glass min-h-[85dvh] p-4 rounded-2xl w-full">
					<h1 className="text-2xl sm:text-4xl">Your Tasks</h1>
					<TasksHolderBody
						tasks={dataController.tasksDataController.tasks}
						navigate={navigate}
						setPrevPath={setPrevPath}
						dataCat={dataController.tasksStatusCategoryWithColor}
						dataPrios={getTasksPriosWithColor(
							dataController.tasksDataController.tasks
						)}
					/>
				</div>

				<Outlet />
			</div>
		</>
	);
}
