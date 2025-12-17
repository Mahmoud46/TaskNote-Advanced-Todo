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
	LuCalendarPlus,
	LuCalendarSync,
	LuClipboardList,
	LuFileText,
	LuFolder,
	LuFolderX,
	LuPenLine,
	LuTrash,
} from "react-icons/lu";

import { CustomCategoryIcon } from "../libs/icons";
import { GrCubes } from "react-icons/gr";
import type { IFolder } from "../interfaces/Data.interface";
import {
	dateFormat,
	getTasksCategorizationWithColor,
	getTasksPriosWithColor,
} from "../libs/utils";
import type { Data } from "../classes/Data.class";
import TasksHolderBody from "../components/TasksHolderBody";
import { ProjectsHolderBody } from "./Projects";
import NotesHolderBody from "../components/NotesHolderBody";

const FolderPageHeader = ({
	dataController,
	folder,
	setPrevPath,
	navigate,
}: {
	dataController: Data;
	folder: IFolder;
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
}) => (
	<div className="flex gap-2 w-full flex-col">
		<div className="flex items-center self-end">
			<div
				onClick={() => {
					setPrevPath(location.pathname);
					navigate(`${location.pathname}/update/${folder.folder_id as string}`);
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
					dataController.deleteFolder(folder.folder_id as string);
					navigate("/folders");
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
		<div className="flex items-center gap-4">
			<div className="text-3xl relative p-2">
				<LuFolder />
				<div className="text-sm absolute right-0 bottom-0 bg-white p-1 text-gray-900 rounded-full">
					<CustomCategoryIcon category={folder.category ?? "Work"} />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-xl sm:text-3xl">{folder.title}</h1>
				<div className="flex gap-4 items-center">
					<p className="flex items-center gap-2 text-xs sm:text-sm">
						<LuCalendarPlus className="text-sm sm:text-base" />
						<span>{dateFormat(folder.created_at)}</span>
					</p>
					{folder.updated_at && (
						<p className="flex items-center gap-2 text-xs sm:text-sm">
							<LuCalendarSync className="text-sm sm:text-base" />
							<span>{dateFormat(folder.updated_at)}</span>
						</p>
					)}
				</div>
			</div>
		</div>
	</div>
);

const TabsSelectors = ({
	folder,
	tabSelector,
	setTabSelector,
}: {
	folder: IFolder;
	tabSelector: "Projects" | "Tasks" | "Notes";
	setTabSelector: React.Dispatch<
		React.SetStateAction<"Projects" | "Tasks" | "Notes">
	>;
}) => (
	<div className="flex items-center pl-0 md:pl-10 overflow-auto">
		<button
			className={`flex items-center gap-4 p-2 cursor-pointer transition-all duration-300 relative ${
				tabSelector == "Projects" ? "" : "opacity-80 hover:opacity-95"
			}`}
			onClick={() => setTabSelector("Projects")}
		>
			<span
				className={`bg-white h-0.5 left-0 bottom-0 absolute w-0 transition-all duration-300 ${
					tabSelector == "Projects" ? "w-full" : ""
				}`}
			></span>
			<div className="flex items-center gap-2">
				<GrCubes className="text-lg" />{" "}
				<span className="text-base font-semibold">Projects</span>
			</div>
			<p className="text-xs bg-white text-gray-900 aspect-square rounded-full flex flex-none justify-center items-center w-[23px] font-semibold">
				{folder.projects.length}
			</p>
		</button>
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
				{folder.tasks.length}
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
				{folder.notes.length}
			</p>
		</button>
	</div>
);

const Content = ({
	folder,
	tabSelector,
	dataController,
	setPrevPath,
	navigate,
}: {
	folder: IFolder;
	tabSelector: "Projects" | "Tasks" | "Notes";
	dataController: Data;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	navigate: NavigateFunction;
}) => (
	<div className="flex flex-col gap-2 w-full">
		{tabSelector == "Projects" && (
			<div className="flex flex-col gap-3 pl-0 md:pl-10">
				<ProjectsHolderBody
					projects={dataController.projectsDataController.projects.filter(
						(project) => folder.projects.includes(project.project_id)
					)}
					navigate={navigate}
					setPrevPath={setPrevPath}
					folderID={folder.folder_id}
				/>
			</div>
		)}
		{tabSelector == "Notes" && (
			<NotesHolderBody
				notes={dataController.notesDataController.notes.filter((note) =>
					folder.notes.includes(note.note_id)
				)}
				navigate={navigate}
				setPrevPath={setPrevPath}
				folderID={folder.folder_id}
			/>
		)}
		{tabSelector == "Tasks" && (
			<TasksHolderBody
				tasks={dataController.tasksDataController.tasks.filter((task) =>
					folder.tasks.includes(task.task_id)
				)}
				navigate={navigate}
				setPrevPath={setPrevPath}
				folderID={folder.folder_id}
				dataCat={getTasksCategorizationWithColor(
					dataController.tasksDataController.tasks.filter((task) =>
						folder.tasks.includes(task.task_id)
					)
				)}
				dataPrios={getTasksPriosWithColor(
					dataController.tasksDataController.tasks.filter((task) =>
						folder.tasks.includes(task.task_id)
					)
				)}
			/>
		)}
	</div>
);

export default function Folder(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	const [tabSelector, setTabSelector] = useState<
		"Projects" | "Tasks" | "Notes"
	>("Projects");
	const { folder_id } = useParams();
	return (
		<div className="w-full relative">
			<div className="flex flex-col gap-2 glass min-h-[85dvh] p-4 rounded-2xl w-full">
				{dataController.foldersDataController.includes(folder_id as string) && (
					<div className="flex flex-col gap-3">
						<FolderPageHeader
							dataController={dataController}
							folder={dataController.foldersDataController.getFolder(
								folder_id as string
							)}
							navigate={navigate}
							setPrevPath={setPrevPath}
						/>
						<TabsSelectors
							folder={dataController.foldersDataController.getFolder(
								folder_id as string
							)}
							tabSelector={tabSelector}
							setTabSelector={setTabSelector}
						/>
						<Content
							folder={dataController.foldersDataController.getFolder(
								folder_id as string
							)}
							tabSelector={tabSelector}
							dataController={dataController}
							navigate={navigate}
							setPrevPath={setPrevPath}
						/>
					</div>
				)}

				{!dataController.foldersDataController.includes(
					folder_id as string
				) && (
					<div className="flex flex-col items-center justify-center gap-4 min-h-[80dvh]">
						<LuFolderX className="text-4xl" />
						<p className="text-sm max-w-[400px] text-center">
							The folder you’re looking for doesn’t exist anymore. It may have
							been deleted or removed from your workspace.
						</p>
						<Link
							to={"/folders"}
							className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
						>
							<div className="glass p-0.5 rounded-full">
								<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
									<LuArrowLeft className="text-lg flex-none" />
								</div>
							</div>
							<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
								Back to folders
							</span>
						</Link>
					</div>
				)}
			</div>

			<Outlet />
		</div>
	);
}
