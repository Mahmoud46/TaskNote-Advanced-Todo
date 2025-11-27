import { useContext, type ReactNode } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	LuArrowLeft,
	LuCalendarPlus,
	LuCalendarSync,
	LuClipboardList,
	LuClipboardPlus,
	LuClipboardX,
	LuFilePlus,
	LuFileText,
	LuFileX,
	LuFolderX,
	LuPenLine,
	LuPlus,
	LuRocket,
	LuTrash,
} from "react-icons/lu";
import ProjectCard from "../components/ProjectCard";
import NoteCard from "../components/NoteCard";
import TaskCard from "../components/TaskCard";
import { CustomCategoryIcon } from "../libs/icons";

export default function Folder(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	const { folder_id } = useParams();
	const location = useLocation();
	return (
		<div className="w-full relative">
			<div className="flex flex-col gap-2 glass min-h-[85dvh] p-4 rounded-2xl w-full">
				{dataController.foldersDataController.includes(folder_id as string) && (
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2 w-full justify-between">
							<div className="flex items-center gap-4">
								<div className="text-2xl">
									<CustomCategoryIcon
										category={
											dataController.foldersDataController.getFolder(
												folder_id as string
											).category ?? "Work"
										}
									/>
								</div>
								<div className="">
									<h1 className="text-2xl">
										{
											dataController.foldersDataController.getFolder(
												folder_id as string
											).title
										}
									</h1>
									<div className="flex gap-4 items-center">
										<p className="flex items-center gap-2 text-sm">
											<LuCalendarPlus className="text-base" />
											<span>
												{new Date(
													dataController.foldersDataController.getFolder(
														folder_id as string
													).created_at
												).toLocaleDateString("en-US", {
													year: "numeric",
													month: "short",
													day: "numeric",
												})}
											</span>
										</p>
										{dataController.foldersDataController.getFolder(
											folder_id as string
										).updated_at && (
											<p className="flex items-center gap-2 text-sm">
												<LuCalendarSync className="text-base" />
												<span>
													{new Date(
														dataController.foldersDataController.getFolder(
															folder_id as string
														).updated_at as string
													).toLocaleDateString("en-US", {
														year: "numeric",
														month: "short",
														day: "numeric",
													})}
												</span>
											</p>
										)}
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<div
									onClick={() => {
										setPrevPath(location.pathname);
										navigate(
											`${location.pathname}/update/${folder_id as string}`
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
										dataController.deleteFolder(folder_id as string);
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
						</div>

						<div className="flex items-center justify-end gap-2">
							<div className="flex flex-none items-center gap-4 glass p-1 rounded-2xl pr-3 w-[150px]">
								<LuRocket className="ml-1 text-xl flex-none" />
								<div className="flex-1">
									<p className="text-xs opacity-70">Total projects</p>
									<p className="font-medium">
										{dataController.foldersDataController.getFolder(
											folder_id as string
										).projects?.length ?? 0}
									</p>
								</div>
							</div>
							<div className="flex flex-none items-center gap-4 glass p-1 rounded-2xl pr-3 w-[150px]">
								<LuClipboardList className="ml-1 text-xl flex-none" />
								<div className="flex-1">
									<p className="text-xs opacity-70">Total tasks</p>
									<p className="font-medium">
										{dataController.foldersDataController.getFolder(
											folder_id as string
										).tasks?.length ?? 0}
									</p>
								</div>
							</div>
							<div className="flex flex-none items-center gap-4 glass p-1 rounded-2xl pr-3 w-[150px]">
								<LuFileText className="ml-1 text-xl flex-none" />
								<div className="flex-1">
									<p className="text-xs opacity-70">Total notes</p>
									<p className="font-medium">
										{dataController.foldersDataController.getFolder(
											folder_id as string
										).notes?.length ?? 0}
									</p>
								</div>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<div className="flex flex-col gap-2 glass p-2 rounded-2xl w-[300px]">
								{dataController.foldersDataController.getFolder(
									folder_id as string
								).projects.length > 0 && (
									<>
										<div className="flex items-center justify-between">
											<h2 className="flex items-center text-lg gap-2">
												<LuRocket className="text-xl" /> <span>Projects</span>
											</h2>
											<div
												onClick={() => {
													setPrevPath(location.pathname);
													navigate(
														`${location.pathname}/new-project?folder_id=${
															folder_id as string
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
										<div className="flex flex-col gap-2 max-h-[400px] hide-scroll overflow-auto">
											{dataController.foldersDataController
												.getFolder(folder_id as string)
												.projects.map((projectID, i) => (
													<ProjectCard
														project={dataController.projectsDataController.getProject(
															projectID
														)}
														key={i}
													/>
												))}
										</div>
									</>
								)}
								{dataController.foldersDataController.getFolder(
									folder_id as string
								).projects.length == 0 && (
									<div className="flex flex-col items-center gap-4 py-5">
										<LuRocket className="text-4xl" />
										<p className="text-sm max-w-[250px] text-center">
											There are currently no projects. Create one to begin.
										</p>

										<div
											onClick={() => {
												setPrevPath(location.pathname);
												navigate(
													`${location.pathname}/new-project?folder_id=${
														folder_id as string
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
							</div>
							<div className="flex flex-col gap-2 flex-1 glass p-2 rounded-2xl">
								{dataController.foldersDataController.getFolder(
									folder_id as string
								).tasks.length > 0 && (
									<>
										<div className="flex items-center justify-between">
											<h2 className="flex items-center text-lg gap-2">
												<LuClipboardList className="text-xl" />{" "}
												<span>Task</span>
											</h2>
											<div
												onClick={() => {
													setPrevPath(location.pathname);
													navigate(
														`${location.pathname}/new-task?folder_id=${
															folder_id as string
														}`
													);
												}}
												className="glass p-0.5 cursor-pointer rounded-full group"
											>
												<div className="p-2 transition duration-300 rounded-full group-hover:bg-white group-hover:text-gray-900">
													<LuClipboardPlus className="text-lg" />
												</div>
											</div>
										</div>
										<div className="flex flex-col gap-2 max-h-[400px] hide-scroll">
											{dataController.foldersDataController
												.getFolder(folder_id as string)
												.tasks.map((taskID, i) => (
													<TaskCard
														task={dataController.tasksDataController.getTask(
															taskID
														)}
														key={i}
													/>
												))}
										</div>
									</>
								)}

								{dataController.foldersDataController.getFolder(
									folder_id as string
								).tasks.length == 0 && (
									<div className="flex flex-col items-center gap-4 py-5">
										<LuClipboardX className="text-4xl" />
										<p className="text-sm max-w-[250px] text-center">
											There are currently no tasks. Create one to begin.
										</p>

										<div
											onClick={() => {
												setPrevPath(location.pathname);
												navigate(
													`${location.pathname}/new-task?folder_id=${
														folder_id as string
													}`
												);
											}}
											className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
										>
											<div className="glass p-0.5 rounded-full">
												<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
													<LuClipboardPlus className="text-lg flex-none" />
												</div>
											</div>
											<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
												Add Task
											</span>
										</div>
									</div>
								)}
							</div>
							<div className="flex flex-col gap-2 flex-1 glass p-2 rounded-2xl">
								{dataController.foldersDataController.getFolder(
									folder_id as string
								).notes.length > 0 && (
									<>
										<div className="flex items-center justify-between">
											<h2 className="flex items-center text-lg gap-2">
												<LuFileText className="text-xl" /> <span>Notes</span>
											</h2>
											<div
												onClick={() => {
													setPrevPath(location.pathname);
													navigate(
														`${location.pathname}/new-note?folder_id=${
															folder_id as string
														}`
													);
												}}
												className="glass p-0.5 cursor-pointer rounded-full group"
											>
												<div className="p-2 transition duration-300 rounded-full group-hover:bg-white group-hover:text-gray-900">
													<LuFilePlus className="text-lg" />
												</div>
											</div>
										</div>
										<div className="flex flex-col gap-2 max-h-[400px] hide-scroll">
											{dataController.foldersDataController
												.getFolder(folder_id as string)
												.notes.map((noteID, i) => (
													<NoteCard
														note={dataController.notesDataController.getNote(
															noteID
														)}
														key={i}
													/>
												))}
										</div>
									</>
								)}
								{dataController.foldersDataController.getFolder(
									folder_id as string
								).notes.length == 0 && (
									<div className="flex flex-col items-center gap-4 py-5">
										<LuFileX className="text-4xl" />
										<p className="text-sm max-w-[250px] text-center">
											There are currently no notes. Create one to begin.
										</p>

										<div
											onClick={() => {
												setPrevPath(location.pathname);
												navigate(
													`${location.pathname}/new-note?folder_id=${
														folder_id as string
													}`
												);
											}}
											className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
										>
											<div className="glass p-0.5 rounded-full">
												<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
													<LuFilePlus className="text-lg flex-none" />
												</div>
											</div>
											<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
												Add Note
											</span>
										</div>
									</div>
								)}
							</div>
						</div>
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
