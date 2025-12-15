import { useContext, type ReactNode } from "react";
import { getProgressPercentageWithRespect2Date } from "../libs/utils";
import type { IProject } from "../interfaces/Data.interface";
import { PROJECT_STATUS_COLOR, PROJECT_STATUS_MAP } from "../constants/data";
import { CustomCategoryIcon } from "../libs/icons";
import {
	LuArrowRight,
	LuCalendarClock,
	LuCalendarPlus,
	LuClipboardList,
	LuFileText,
	LuPenLine,
	LuTrash,
} from "react-icons/lu";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { Link, useLocation } from "react-router-dom";
import { GrCubes } from "react-icons/gr";

export default function ProjectCard({
	project,
}: {
	project: IProject;
}): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	const location = useLocation();
	return (
		<div className="flex items-start glass rounded-xl p-0.5 rounded-tr-3xl w-full">
			<div className="p-2 flex gap-2 flex-col flex-1 flex-wrap">
				<p className={`${PROJECT_STATUS_COLOR[project.status]} text-xs pl-9`}>
					{PROJECT_STATUS_MAP[project.status]}
				</p>
				<div className="flex gap-2 items-center">
					<div className="relative rounded-full flex p-2">
						<GrCubes className="flex-none text-2xl" />
						<div className="text-xs absolute bg-white aspect-square text-gray-900 p-1 rounded-full right-0 bottom-0">
							{project.category && (
								<CustomCategoryIcon category={project.category} />
							)}
							{!project.category && <GrCubes />}
						</div>
					</div>
					<div className="flex flex-col w-full">
						<h1 className="text-base line-clamp-1">{project.title}</h1>
						<p
							className="text-sm line-clamp-1 opacity-80"
							dangerouslySetInnerHTML={{
								__html: project.html_description.slice(0, 100),
							}}
						></p>
					</div>
				</div>
				<div className="flex items-center gap-2 pl-9 -mt-1">
					<p className="text-xs flex items-center gap-1">
						<LuCalendarPlus className="text-sm" />
						<span>
							{new Date(project.start_date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</span>
					</p>
					{project.due_date && (
						<p className="text-xs flex items-center gap-1">
							<LuCalendarClock className="text-sm" />
							<span>
								{new Date(project.due_date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</span>
						</p>
					)}
				</div>
				<div className="pl-9">
					<div className="glass w-full h-1.5 rounded-full">
						<div
							className="bg-white h-full rounded-full"
							style={{
								width: `${getProgressPercentageWithRespect2Date(
									new Date(project.start_date),
									new Date(project.due_date),
									new Date()
								)}%`,
							}}
						></div>
					</div>
				</div>
				<div className="flex gap-2 items-center pl-9 mt-1">
					<p className="flex gap-1 items-center text-xs">
						<LuClipboardList className="text-sm" />
						<span>{project.tasks.length}</span>
					</p>
					<p className="flex gap-1 items-center text-xs">
						<LuFileText className="text-sm" />
						<span>{project.notes.length}</span>
					</p>
				</div>
			</div>
			<div className="flex flex-col-reverse flex-none glass w-fit self-start rounded-full -translate-x-0.5 translate-y-0.5 p-0.5">
				<div
					className="p-2 rounded-full w-fit cursor-pointer flex-none transition duration-300 hover:bg-white hover:text-gray-900"
					onClick={() => dataController.deleteProject(project.project_id)}
				>
					<LuTrash />
				</div>
				<div
					onClick={() => {
						setPrevPath(location.pathname);
						navigate(
							`${location.pathname}/update-project/${project.project_id}`
						);
					}}
					className="p-2 rounded-full w-fit cursor-pointer flex-none transition duration-300 hover:bg-white hover:text-gray-900"
				>
					<LuPenLine />
				</div>

				<Link
					to={`/projects/${project.project_id}`}
					className="p-2 rounded-full w-fit cursor-pointer flex-none transition duration-300 hover:-rotate-45 hover:bg-white hover:text-gray-900"
				>
					<LuArrowRight />
				</Link>
			</div>
		</div>
	);
}
