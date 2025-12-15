import { useContext, type ReactNode } from "react";
import {
	LuArrowRight,
	LuCalendarClock,
	LuCalendarPlus,
	LuPlus,
	LuRocket,
} from "react-icons/lu";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import type { IProject } from "../interfaces/Data.interface";
import { Link } from "react-router-dom";
import CircularProgressPieChart from "./CircularProgressPieChart";
import { getProgressPercentageWithRespect2Date } from "../libs/utils";

const ProjectOverviewCard = ({ project }: { project: IProject }) => (
	<div className="glass p-2 rounded-xl rounded-tr-3xl flex items-start gap-2">
		<div className="h-[45px] aspect-square relative">
			<CircularProgressPieChart
				labelStylingClassName="text-xs font-semibold"
				putPercentageSign={false}
				progress={getProgressPercentageWithRespect2Date(
					new Date(project.start_date),
					new Date(project.due_date),
					new Date()
				)}
			/>
		</div>
		<div className="flex items-start flex-1 gap-2">
			<div className="flex-1">
				<p>{project.title}</p>
				<div className="flex flex-wrap items-center gap-2">
					<p className="text-xs flex gap-1 items-center">
						<LuCalendarPlus className="text-sm" />
						<span>
							{new Date(project.start_date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</span>
					</p>
					<p className="text-xs flex gap-1 items-center">
						<LuCalendarClock className="text-sm" />
						<span>
							{new Date(project.due_date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</span>
					</p>
				</div>
			</div>
			<Link
				to={`projects/${project.project_id}`}
				className="p-2 rounded-full glass w-fit cursor-pointer flex-none translate-x-1 -translate-y-1 transition duration-300 hover:-rotate-45"
			>
				<LuArrowRight />
			</Link>
		</div>
	</div>
);

export default function ProjectsOverview(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;

	return (
		<div className="flex-1 flex flex-col gap-2 glass p-2 rounded-2xl">
			<div className="flex items-center justify-between">
				<h1 className="font-semibold px-2">Recent Projects</h1>
				<div className="flex items-center justify-center">
					<div
						onClick={() => {
							setPrevPath("/");
							navigate("/new-project");
						}}
						className="text-xl p-0.5 glass rounded-full group cursor-pointer"
					>
						<div className="p-2 transition-full duration-300 group-hover:bg-white group-hover:text-gray-900 rounded-full">
							<LuPlus />
						</div>
					</div>
					<Link
						to={"/projects"}
						className="text-xl glass p-0.5 rounded-full flex items-center justify-center gap-0.5 group cursor-pointer"
					>
						{dataController.projectsDataController.projects.length > 2 && (
							<p className="text-xs text-center pl-1">
								+{dataController.projectsDataController.projects.length - 2}
							</p>
						)}
						<div className="p-2 transition-full duration-300 group-hover:bg-white group-hover:text-gray-900 rounded-full group-hover:-rotate-45">
							<LuArrowRight />
						</div>
					</Link>
				</div>
			</div>
			{dataController.projectsDataController.projects.length > 0 && (
				<div className="flex gap-2">
					<div className="flex-1 flex flex-col gap-2">
						{dataController.projectsDataController.projects
							.slice(0, 2)
							.map((project, i) => (
								<ProjectOverviewCard project={project} key={i} />
							))}
					</div>
				</div>
			)}
			{dataController.projectsDataController.projects.length == 0 && (
				<div className="flex flex-col items-center gap-4 py-5">
					<LuRocket className="text-4xl" />
					<p className="text-sm max-w-[300px] text-center">
						There are currently no projects. Create one to begin.
					</p>

					<div
						onClick={() => {
							setPrevPath("/");
							navigate("/new-project");
						}}
						className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
					>
						<div className="glass p-0.5 rounded-full">
							<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuPlus className="text-lg flex-none" />
							</div>
						</div>
						<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
							Add Project
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
