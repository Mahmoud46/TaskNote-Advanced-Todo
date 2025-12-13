import { useContext, useState, type ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	LuArrowRight,
	LuCalendarPlus,
	LuCalendarSync,
	LuClipboard,
	LuFileText,
	LuFolder,
	LuFolderPlus,
	LuFolderX,
	LuPenLine,
	LuPlus,
	LuRocket,
	LuSearch,
	LuTrash,
} from "react-icons/lu";
import { CustomCategoryIcon } from "../libs/icons";

export default function Folders(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	const [searchTitle, setSearchTitle] = useState<string>("");
	return (
		<>
			<div className="w-full relative">
				<div className="flex flex-col gap-2 glass min-h-dvh p-4 rounded-2xl w-full">
					<h1 className="text-2xl sm:text-4xl">Your Folders</h1>
					{dataController.foldersDataController.folders.length > 0 && (
						<>
							<div className="flex justify-end">
								<div className="glass relative rounded-full pr-2">
									<div className="absolute opacity-80 top-1/2 -translate-y-1/2 left-2">
										<LuSearch />
									</div>
									<input
										type="text"
										value={searchTitle}
										onChange={(e) => setSearchTitle(e.target.value)}
										placeholder="Search folder with title..."
										className="outline-0 p-2 pl-8 text-sm"
									/>
								</div>

								<div
									onClick={() => {
										setPrevPath("/folders");
										navigate(`/folders/new-folder`);
									}}
									className="glass p-0.5 cursor-pointer rounded-full group"
								>
									<div className="p-2 transition duration-300 rounded-full group-hover:bg-white group-hover:text-gray-900">
										<LuPlus className="text-lg" />
									</div>
								</div>
							</div>
							<div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
								{dataController.foldersDataController.folders
									.filter((folder) =>
										searchTitle.trim() == ""
											? folder
											: folder.title
													.toLowerCase()
													.includes(searchTitle.toLowerCase())
									)
									.map((folder, i) => (
										<div
											key={i}
											className="flex flex-col justify-between glass rounded-xl p-0.5 rounded-tr-3xl h-[150px]"
										>
											<div className="flex glass w-fit self-end rounded-full -translate-x-0.5 translate-y-0.5 p-0.5">
												<div
													onClick={() => {
														setPrevPath("/folders");
														navigate(
															`/folders/update-folder/${folder.folder_id}`
														);
													}}
													className="p-2 rounded-full w-fit cursor-pointer flex-none transition duration-300 hover:bg-white hover:text-gray-900"
												>
													<LuPenLine />
												</div>

												<div
													className="p-2 rounded-full w-fit cursor-pointer flex-none transition duration-300 hover:bg-white hover:text-gray-900"
													onClick={() =>
														dataController.deleteFolder(folder.folder_id)
													}
												>
													<LuTrash />
												</div>

												<Link
													to={folder.folder_id}
													className="p-2 rounded-full w-fit cursor-pointer flex-none transition duration-300 hover:-rotate-45 hover:bg-white hover:text-gray-900"
												>
													<LuArrowRight />
												</Link>
											</div>
											<div className="p-2 flex gap-2 flex-col">
												<div className="flex gap-2 items-center">
													<div className="text-xl px-1">
														{folder.category && (
															<CustomCategoryIcon category={folder.category} />
														)}
														{!folder.category && <LuFolder />}
													</div>
													<div className="">
														<h1 className="text-base line-clamp-1">
															{folder.title}
														</h1>
														<div className="flex items-center gap-2">
															{!folder.updated_at && (
																<p className="text-xs flex items-center gap-1">
																	<LuCalendarPlus className="text-sm" />
																	<span>
																		{new Date(
																			folder.created_at
																		).toLocaleDateString("en-US", {
																			year: "numeric",
																			month: "short",
																			day: "numeric",
																		})}
																	</span>
																</p>
															)}
															{folder.updated_at && (
																<p className="text-xs flex items-center gap-1">
																	<LuCalendarSync className="text-sm" />
																	<span>
																		{new Date(
																			folder.updated_at
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
												<div className="flex gap-2 items-center pl-9 mt-1">
													<p className="flex gap-1 items-center text-xs">
														<LuRocket className="text-sm" />
														<span>{folder.projects.length}</span>
													</p>
													<p className="flex gap-1 items-center text-xs">
														<LuClipboard className="text-sm" />
														<span>{folder.tasks.length}</span>
													</p>
													<p className="flex gap-1 items-center text-xs">
														<LuFileText className="text-sm" />
														<span>{folder.notes.length}</span>
													</p>
												</div>
											</div>
										</div>
									))}
							</div>
						</>
					)}
					{dataController.foldersDataController.folders.length == 0 && (
						<div className="flex flex-col items-center gap-4 py-5 flex-1 justify-center">
							<LuFolderX className="text-4xl" />
							<p className="text-sm max-w-[300px] text-center">
								There are currently no folders. Create one to begin.
							</p>

							<div
								onClick={() => {
									setPrevPath("/folders");
									navigate("/folders/new-folder");
								}}
								className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
							>
								<div className="glass p-0.5 rounded-full">
									<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
										<LuFolderPlus className="text-lg flex-none" />
									</div>
								</div>
								<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
									Add Folder
								</span>
							</div>
						</div>
					)}
				</div>

				<Outlet />
			</div>
		</>
	);
}
