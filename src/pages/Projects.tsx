import { useContext, useState, type ReactNode } from "react";
import { Outlet, useLocation, type NavigateFunction } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { LuFilter, LuPlus, LuSearch } from "react-icons/lu";
import type { IProject, TProjectStatus } from "../interfaces/Data.interface";
import { PROJECT_STATUS } from "../constants/data";
import ProjectCard from "../components/ProjectCard";
import { GrCubes } from "react-icons/gr";

const EmptyProjects = ({
	projects,
	navigate,
	setPrevPath,
	locationPathname,
	folderID,
}: {
	projects: IProject[];
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	locationPathname: string;
	folderID?: string;
}): ReactNode => (
	<>
		{projects.length == 0 && (
			<div className="flex flex-col items-center gap-4 py-5 flex-1 justify-center">
				<GrCubes className="text-4xl" />
				<p className="text-sm max-w-[300px] text-center">
					There are currently no projects. Create one to begin.
				</p>

				<div
					onClick={() => {
						setPrevPath(locationPathname);
						navigate(
							`${locationPathname}/new-project${
								folderID ? `?folder_id=${folderID}` : ""
							}`
						);
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
	</>
);

const ProjectsControllers = ({
	searchTitle,
	navigate,
	setPrevPath,
	setSearchTitle,
	setProjectStatus,
	locationPathname,
	folderID,
}: {
	searchTitle: string;
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
	setProjectStatus: React.Dispatch<
		React.SetStateAction<TProjectStatus | "All">
	>;
	locationPathname: string;
	folderID?: string;
}) => (
	<div className="flex justify-end flex-wrap">
		<div className="glass relative rounded-full pr-2">
			<div className="absolute opacity-80 top-1/2 -translate-y-1/2 left-2">
				<LuSearch />
			</div>
			<input
				type="text"
				value={searchTitle}
				onChange={(e) => setSearchTitle(e.target.value)}
				placeholder="Search project with title..."
				className="outline-0 p-2 pl-8 text-sm max-w-[150px] lg:max-w-max"
			/>
		</div>
		<div className="glass relative rounded-full pr-2">
			<LuFilter className="absolute opacity-80 top-1/2 -translate-y-1/2 left-2" />
			<select
				className="cursor-pointer outline-0 p-2 pl-8 text-sm"
				onChange={(e) =>
					setProjectStatus(e.target.value as "All" | TProjectStatus)
				}
			>
				<option value="All" className="bg-white text-gray-900">
					All
				</option>
				{PROJECT_STATUS.map((st, i) => (
					<option value={st.title} key={i} className="bg-white text-gray-900">
						{st.value}
					</option>
				))}
			</select>
		</div>
		<div
			onClick={() => {
				setPrevPath(locationPathname);
				navigate(
					`${locationPathname}/new-project${
						folderID ? `?folder_id=${folderID}` : ""
					}`
				);
			}}
			className="glass p-0.5 cursor-pointer rounded-full group"
		>
			<div className="p-2 transition duration-300 rounded-full group-hover:bg-white group-hover:text-gray-900">
				<LuPlus className="text-lg" />
			</div>
		</div>
	</div>
);

const ProjectsList = ({ projects }: { projects: IProject[] }) => (
	<div className="grid-view">
		{projects.map((project, i) => (
			<ProjectCard project={project} key={i} />
		))}
	</div>
);

export const ProjectsHolderBody = ({
	projects,
	navigate,
	setPrevPath,
	folderID,
}: {
	projects: IProject[];
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	folderID?: string;
	projectID?: string;
}): ReactNode => {
	const [projectStatus, setProjectStatus] = useState<"All" | TProjectStatus>(
		"All"
	);
	const [searchTitle, setSearchTitle] = useState<string>("");
	const location = useLocation();
	return (
		<>
			{projects.length > 0 && (
				<>
					<ProjectsControllers
						searchTitle={searchTitle}
						navigate={navigate}
						setPrevPath={setPrevPath}
						setSearchTitle={setSearchTitle}
						setProjectStatus={setProjectStatus}
						locationPathname={location.pathname}
						folderID={folderID}
					/>
					<ProjectsList
						projects={projects.filter(
							(project) =>
								(projectStatus == "All"
									? project
									: project.status == projectStatus) &&
								(searchTitle.trim() == ""
									? project
									: project.title
											.toLowerCase()
											.includes(searchTitle.toLowerCase()))
						)}
					/>
				</>
			)}
			<EmptyProjects
				projects={projects}
				navigate={navigate}
				setPrevPath={setPrevPath}
				locationPathname={location.pathname}
				folderID={folderID}
			/>
		</>
	);
};

export default function Projects(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	return (
		<>
			<div className="w-full relative">
				<div className="flex flex-col gap-2 glass min-h-[90dvh] p-4 rounded-2xl w-full">
					<h1 className="text-2xl sm:text-4xl">Your Projects</h1>
					<ProjectsHolderBody
						projects={dataController.projectsDataController.projects}
						navigate={navigate}
						setPrevPath={setPrevPath}
					/>
				</div>

				<Outlet />
			</div>
		</>
	);
}
