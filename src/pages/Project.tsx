import { useContext, useState, type ReactNode } from "react";
import {
	Link,
	Outlet,
	useParams,
	type NavigateFunction,
} from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	LuArrowLeft,
	LuCalendarClock,
	LuCalendarPlus,
	LuClipboardList,
	LuFileText,
	LuPenLine,
	LuRocket,
	LuTrash,
} from "react-icons/lu";
import { Icon } from "../libs/icons";
import CircularProgressPieChart from "../components/CircularProgressPieChart";
import {
	dateFormat,
	getPlatformName,
	getProgressPercentageWithRespect2Date,
	getTasksCategorizationWithColor,
	getTasksPriosWithColor,
} from "../libs/utils";
import { PROJECT_STATUS_COLOR, PROJECT_STATUS_MAP } from "../constants/data";
import type { IProject } from "../interfaces/Data.interface";
import type { Data } from "../classes/Data.class";
import TasksHolderBody from "../components/TasksHolderBody";
import NotesHolderBody from "../components/NotesHolderBody";

const ProjectPageHeader = ({
	dataController,
	project,
	setPrevPath,
	navigate,
}: {
	dataController: Data;
	project: IProject;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	navigate: NavigateFunction;
}): ReactNode => (
	<div className="flex items-start gap-2 w-full justify-between flex-wrap flex-col-reverse">
		<div className="flex flex-1 min-w-[300px] items-start gap-4">
			<div className="h-[90px] aspect-square relative">
				<CircularProgressPieChart
					labelStylingClassName="text-base sm:text-xl"
					progress={getProgressPercentageWithRespect2Date(
						new Date(project.start_date),
						new Date(project.due_date),
						new Date()
					)}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<p className={`${PROJECT_STATUS_COLOR[project.status]} text-xs`}>
					{PROJECT_STATUS_MAP[project.status]}
				</p>

				<h1 className="text-2xl mb-1">{project.title}</h1>
				{/* Date */}
				<div className="flex gap-4 items-center">
					<p className="flex items-center gap-2 text-xs sm:text-sm">
						<LuCalendarPlus className="text-sm sm:text-base flex-none" />
						<span>{dateFormat(project.start_date)}</span>
					</p>
					<p className="flex items-center gap-2 text-xs sm:text-sm">
						<LuCalendarClock className="text-sm sm:text-base flex-none" />
						<span>{dateFormat(project.due_date)}</span>
					</p>
				</div>
				{project.description != "" && (
					<div className="rounded-2xl flex flex-col opacity-90 gap-0.5 mt-1">
						<p
							className="w-full text-sm overflow-auto wrap-break-word description whitespace-pre-wrap"
							dangerouslySetInnerHTML={{
								__html: project.html_description,
							}}
						></p>

						{project.links && (project.links as []).length > 0 && (
							<div className="flex w-fit items-center gap-1">
								{(project.links as string[]).map((link, i) => (
									<a
										href={link}
										key={i}
										className="flex items-center gap-1 text-xs glass p-1 rounded-full px-2"
										target="_blank"
									>
										<Icon
											content={getPlatformName(link).toLowerCase()}
											className="text-sm"
										/>
										<p>{getPlatformName(link)}</p>
									</a>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
		<div className="flex items-center justify-end w-full">
			<div
				onClick={() => {
					setPrevPath(location.pathname);
					navigate(
						`${location.pathname}/update/${project.project_id as string}`
					);
				}}
				className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
			>
				<div className="glass p-0.5 rounded-full">
					<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
						<LuPenLine className="text-lg flex-none" />
					</div>
				</div>
				<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
					Edit
				</span>
			</div>
			<div
				className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
				onClick={() => {
					dataController.deleteProject(project.project_id as string);
					navigate("/projects");
				}}
			>
				<div className="glass p-0.5 rounded-full">
					<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
						<LuTrash className="text-lg flex-none" />
					</div>
				</div>
				<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
					Delete
				</span>
			</div>
		</div>
	</div>
);

const TabsSelectors = ({
	project,
	tabSelector,
	setTabSelector,
}: {
	project: IProject;
	tabSelector: "Tasks" | "Notes";
	setTabSelector: React.Dispatch<React.SetStateAction<"Tasks" | "Notes">>;
}): ReactNode => (
	<div className="flex items-center pl-0 md:pl-10 overflow-auto">
		<button
			className={`flex items-center gap-4 p-2 cursor-pointer transition-all duration-300 relative ${
				tabSelector == "Tasks" ? "" : "opacity-80 hover:opacity-95"
			}`}
			onClick={() => setTabSelector("Tasks")}
		>
			<span
				className={`bg-white h-0.5 left-0 bottom-0 absolute w-0 transition-all duration-300 ${
					tabSelector == "Tasks" ? "w-full" : ""
				}`}
			></span>
			<div className="flex items-center gap-2">
				<LuClipboardList className="text-lg" />{" "}
				<span className="text-base font-semibold">Tasks</span>
			</div>
			<p className="text-xs bg-white text-gray-900 aspect-square rounded-full flex flex-none justify-center items-center w-[23px] font-semibold">
				{project.tasks.length}
			</p>
		</button>
		<button
			className={`flex items-center gap-4 p-2 cursor-pointer transition-all duration-300 relative ${
				tabSelector == "Notes" ? "" : "opacity-80 hover:opacity-95"
			}`}
			onClick={() => setTabSelector("Notes")}
		>
			<span
				className={`bg-white h-0.5 left-0 bottom-0 absolute w-0 transition-all duration-300 ${
					tabSelector == "Notes" ? "w-full" : ""
				}`}
			></span>
			<div className="flex items-center gap-2">
				<LuFileText className="text-lg" />{" "}
				<span className="text-base font-semibold">Notes</span>
			</div>
			<p className="text-xs bg-white text-gray-900 aspect-square rounded-full flex flex-none justify-center items-center w-[23px] font-semibold">
				{project.notes.length}
			</p>
		</button>
	</div>
);

const Content = ({
	project,
	tabSelector,
	dataController,
	setPrevPath,
	navigate,
}: {
	project: IProject;
	tabSelector: "Tasks" | "Notes";
	dataController: Data;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	navigate: NavigateFunction;
}) => (
	<div className="flex flex-col gap-2 w-full">
		{tabSelector == "Notes" && (
			<NotesHolderBody
				notes={dataController.notesDataController.notes.filter((note) =>
					project.notes.includes(note.note_id)
				)}
				navigate={navigate}
				setPrevPath={setPrevPath}
				projectID={project.project_id}
			/>
		)}
		{tabSelector == "Tasks" && (
			<TasksHolderBody
				tasks={dataController.tasksDataController.tasks.filter((task) =>
					project.tasks.includes(task.task_id)
				)}
				navigate={navigate}
				setPrevPath={setPrevPath}
				projectID={project.project_id}
				dataCat={getTasksCategorizationWithColor(
					dataController.tasksDataController.tasks.filter((task) =>
						project.tasks.includes(task.task_id)
					)
				)}
				dataPrios={getTasksPriosWithColor(
					dataController.tasksDataController.tasks.filter((task) =>
						project.tasks.includes(task.task_id)
					)
				)}
			/>
		)}
	</div>
);

export default function Project(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	const [tabSelector, setTabSelector] = useState<"Tasks" | "Notes">("Tasks");
	const { project_id } = useParams();

	return (
		<div className="w-full relative">
			<div className="flex flex-col gap-2 glass min-h-[85dvh] p-4 rounded-2xl w-full">
				{dataController.projectsDataController.includes(
					project_id as string
				) && (
					<div className="flex flex-col gap-3">
						{/* Header */}
						<ProjectPageHeader
							dataController={dataController}
							project={dataController.projectsDataController.getProject(
								project_id as string
							)}
							setPrevPath={setPrevPath}
							navigate={navigate}
						/>
						<TabsSelectors
							project={dataController.projectsDataController.getProject(
								project_id as string
							)}
							tabSelector={tabSelector}
							setTabSelector={setTabSelector}
						/>
						<Content
							project={dataController.projectsDataController.getProject(
								project_id as string
							)}
							tabSelector={tabSelector}
							dataController={dataController}
							setPrevPath={setPrevPath}
							navigate={navigate}
						/>
					</div>
				)}

				{!dataController.projectsDataController.includes(
					project_id as string
				) && (
					<div className="flex flex-col items-center justify-center gap-4 min-h-[80dvh]">
						<LuRocket className="text-4xl" />
						<p className="text-sm max-w-[400px] text-center">
							The project you’re looking for doesn’t exist anymore. It may have
							been deleted or removed from your workspace.
						</p>
						<Link
							to={"/projects"}
							className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
						>
							<div className="glass p-0.5 rounded-full">
								<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
									<LuArrowLeft className="text-lg flex-none" />
								</div>
							</div>
							<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
								Back to projects
							</span>
						</Link>
					</div>
				)}
			</div>

			<Outlet />
		</div>
	);
}
