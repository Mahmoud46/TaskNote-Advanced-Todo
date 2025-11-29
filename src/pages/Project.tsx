import { useContext, type ReactNode } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	LuArrowLeft,
	LuCalendarClock,
	LuCalendarPlus,
	LuClipboardList,
	LuClipboardPlus,
	LuClipboardX,
	LuFilePlus,
	LuFileText,
	LuFileX,
	LuNotebook,
	LuPenLine,
	LuRocket,
	LuTrash,
} from "react-icons/lu";

import NoteCard from "../components/NoteCard";
import TaskCard from "../components/TaskCard";
import { CustomCategoryIcon, Icon } from "../libs/icons";
import CircularProgressPieChart from "../components/CircularProgressPieChart";
import {
	getPlatformName,
	getProgressPercentageWithRespect2Date,
} from "../libs/utils";
import { PROJECT_STATUS_COLOR, PROJECT_STATUS_MAP } from "../constants/data";

export default function Project(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	const { project_id } = useParams();

	const location = useLocation();

	return (
		<div className="w-full relative">
			<div className="flex flex-col gap-2 glass min-h-[85dvh] p-4 rounded-2xl w-full">
				{dataController.projectsDataController.includes(
					project_id as string
				) && (
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2 w-full justify-between">
							<div className="flex items-center gap-4">
								<div className="text-2xl">
									<CustomCategoryIcon
										category={
											dataController.projectsDataController.getProject(
												project_id as string
											).category ?? "Work"
										}
									/>
								</div>
								<div className="">
									<p
										className={`${
											PROJECT_STATUS_COLOR[
												dataController.projectsDataController.getProject(
													project_id as string
												).status
											]
										} text-xs`}
									>
										{
											PROJECT_STATUS_MAP[
												dataController.projectsDataController.getProject(
													project_id as string
												).status
											]
										}
									</p>

									<h1 className="text-2xl mb-1">
										{
											dataController.projectsDataController.getProject(
												project_id as string
											).title
										}
									</h1>
									<div className="flex gap-4 items-center">
										<p className="flex items-center gap-2 text-sm">
											<LuCalendarPlus className="text-base" />
											<span>
												{new Date(
													dataController.projectsDataController.getProject(
														project_id as string
													).start_date
												).toLocaleDateString("en-US", {
													year: "numeric",
													month: "short",
													day: "numeric",
												})}
											</span>
										</p>
										<p className="flex items-center gap-2 text-sm">
											<LuCalendarClock className="text-base" />
											<span>
												{new Date(
													dataController.projectsDataController.getProject(
														project_id as string
													).due_date
												).toLocaleDateString("en-US", {
													year: "numeric",
													month: "short",
													day: "numeric",
												})}
											</span>
										</p>
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<div
									onClick={() => {
										setPrevPath(location.pathname);
										navigate(
											`${location.pathname}/update/${project_id as string}`
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
										dataController.deleteProject(project_id as string);
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

						<div className="flex items-start gap-2">
							<div className="flex flex-col gap-2 glass p-2 rounded-2xl w-[300px]">
								{dataController.projectsDataController.getProject(
									project_id as string
								).description != "" && (
									<div className="glass p-2 rounded-2xl flex flex-col gap-1">
										<p className="text-xs flex gap-1 items-center opacity-80">
											<LuNotebook className="text-sm" />
											<span>Description</span>
										</p>
										<p
											className="w-full text-sm pl-5 overflow-auto wrap-break-word description"
											dangerouslySetInnerHTML={{
												__html:
													dataController.projectsDataController.getProject(
														project_id as string
													).html_description,
											}}
										></p>

										{dataController.projectsDataController.getProject(
											project_id as string
										).links &&
											(
												dataController.projectsDataController.getProject(
													project_id as string
												).links as []
											).length > 0 && (
												<div className="flex justify-end mt-2 items-center gap-1">
													{(
														dataController.projectsDataController.getProject(
															project_id as string
														).links as string[]
													).map((link, i) => (
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
								<div className="w-full h-[280px] relative">
									<CircularProgressPieChart
										progress={getProgressPercentageWithRespect2Date(
											new Date(
												dataController.projectsDataController.getProject(
													project_id as string
												).start_date
											),
											new Date(
												dataController.projectsDataController.getProject(
													project_id as string
												).due_date
											),
											new Date()
										)}
									/>
								</div>
								<div className="flex items-center justify-end gap-2 w-full">
									<div className="flex flex-1 items-center gap-4 glass p-1 rounded-2xl pr-3">
										<LuClipboardList className="ml-1 text-xl flex-none" />
										<div className="flex-1">
											<p className="text-xs opacity-70">Total tasks</p>
											<p className="font-medium">
												{dataController.projectsDataController.getProject(
													project_id as string
												).tasks?.length ?? 0}
											</p>
										</div>
									</div>
									<div className="flex flex-1 items-center gap-4 glass p-1 rounded-2xl pr-3">
										<LuFileText className="ml-1 text-xl flex-none" />
										<div className="flex-1">
											<p className="text-xs opacity-70">Total notes</p>
											<p className="font-medium">
												{dataController.projectsDataController.getProject(
													project_id as string
												).notes?.length ?? 0}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-2 flex-1 glass p-2 rounded-2xl">
								{(
									dataController.projectsDataController.getProject(
										project_id as string
									).tasks ?? []
								).length > 0 && (
									<>
										<div className="flex items-center justify-between">
											<h2 className="flex items-center text-lg gap-2">
												<LuClipboardList className="text-xl" />{" "}
												<span>Tasks</span>
											</h2>
											<div
												onClick={() => {
													setPrevPath(location.pathname);
													navigate(
														`${location.pathname}/new-task?project_id=${
															project_id as string
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
										<div className="flex flex-col gap-2 max-h-[400px] overflow-auto hide-scroll">
											{(
												dataController.projectsDataController.getProject(
													project_id as string
												).tasks ?? []
											).map((taskID, i) => (
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

								{(
									dataController.projectsDataController.getProject(
										project_id as string
									).tasks ?? []
								).length == 0 && (
									<div className="flex flex-col items-center gap-4 py-5">
										<LuClipboardX className="text-4xl" />
										<p className="text-sm max-w-[250px] text-center">
											There are currently no tasks. Create one to begin.
										</p>

										<div
											onClick={() => {
												setPrevPath(location.pathname);
												navigate(
													`${location.pathname}/new-task?project_id=${
														project_id as string
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
								{dataController.projectsDataController.getProject(
									project_id as string
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
														`${location.pathname}/new-note?project_id=${
															project_id as string
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
										<div className="flex flex-col gap-2 max-h-[400px] hide-scroll overflow-auto">
											{dataController.projectsDataController
												.getProject(project_id as string)
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
								{dataController.projectsDataController.getProject(
									project_id as string
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
													`${location.pathname}/new-note?project_id=${
														project_id as string
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
