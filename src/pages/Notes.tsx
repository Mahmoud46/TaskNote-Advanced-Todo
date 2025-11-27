import { useContext, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	LuFilePlus,
	LuFileText,
	LuFileX,
	LuFolder,
	LuPlus,
	LuSearch,
	LuStar,
} from "react-icons/lu";
import { CustomCategoryIcon } from "../libs/icons";
import type { TCustomCategory } from "../interfaces/Data.interface";
import { CUSTOME_CATEGRIES } from "../constants/data";
import NoteCard from "../components/NoteCard";
import HorizontalBarChart from "../components/HorizontalBarChart";

export default function Notes(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	const [catStatus, setCatStatus] = useState<"All" | TCustomCategory>("All");
	const [searchTitle, setSearchTitle] = useState<string>("");
	return (
		<>
			<div className="w-full relative">
				<div className="flex flex-col gap-2 glass min-h-[85dvh] p-4 rounded-2xl w-full">
					<h1 className="text-4xl">My Notes</h1>
					{dataController.notesDataController.notes.length > 0 && (
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
										placeholder="Search note with title..."
										className="outline-0 p-2 pl-8 text-sm"
									/>
								</div>
								<div className="glass relative rounded-full pr-2">
									<div className="absolute opacity-80 top-1/2 -translate-y-1/2 left-2">
										{catStatus != "All" && (
											<CustomCategoryIcon category={catStatus} />
										)}
										{catStatus == "All" && <LuFolder />}
									</div>
									<select
										value={catStatus}
										className="cursor-pointer outline-0 p-2 pl-8 text-sm"
										onChange={(e) =>
											setCatStatus(e.target.value as "All" | TCustomCategory)
										}
									>
										<option value="All" className="bg-white text-gray-900">
											All
										</option>
										{CUSTOME_CATEGRIES.map((cat, i) => (
											<option
												value={cat}
												key={i}
												className="bg-white text-gray-900"
											>
												{cat}
											</option>
										))}
									</select>
								</div>
								<div
									onClick={() => {
										setPrevPath("/notes");
										navigate("/notes/new-note");
									}}
									className="glass p-0.5 cursor-pointer rounded-full group"
								>
									<div className="p-2 transition duration-300 rounded-full group-hover:bg-white group-hover:text-gray-900">
										<LuPlus className="text-lg" />
									</div>
								</div>
							</div>
							<div className="flex w-full gap-2">
								<div className="w-[300px]">
									<div className="glass p-2 rounded-2xl flex flex-col gap-2">
										<p className="px-2 font-semibold">Notes categories</p>
										<HorizontalBarChart />
										<div className="flex flex-wrap gap-2">
											{dataController.notesDataController.notesCategoriesCount
												.slice(0, 6)
												.map((item, i) => (
													<div
														className="flex items-center gap-2 glass p-1 rounded-2xl pr-3 flex-1 max-w-[150px] cursor-pointer group"
														key={i}
														onClick={() => setCatStatus(item.category)}
													>
														<div
															className={`p-2 rounded-full text-xl flex-none transition duration-300 group-hover:bg-white group-hover:text-gray-900 ${
																catStatus == item.category
																	? "bg-white text-gray-900"
																	: ""
															}`}
														>
															<CustomCategoryIcon category={item.category} />
														</div>
														<div className="flex-1">
															<p className="text-xs opacity-70 line-clamp-1">
																{item.category}
															</p>
															<p className="font-medium">{item.count}</p>
														</div>
													</div>
												))}
										</div>
									</div>
								</div>
								<div className="flex gap-2 flex-1 items-start">
									<div className="flex flex-col gap-2 flex-1 glass p-2 rounded-2xl">
										<h2 className="flex gap-2 items-center">
											{catStatus != "All" && (
												<div className="text-lg">
													<CustomCategoryIcon category={catStatus} />
												</div>
											)}
											{catStatus == "All" && <LuFileText className="text-xl" />}{" "}
											<span className="text-lg">{catStatus} Notes</span>
										</h2>
										<div className="flex flex-col max-w-[500px] gap-2 max-h-[450px] overflow-auto hide-scroll">
											{dataController.notesDataController.notes
												.filter(
													(note) =>
														(catStatus === "All" ||
															note.category == catStatus) &&
														(searchTitle.trim() === "" ||
															note.title
																.toLowerCase()
																.includes(searchTitle.toLowerCase()))
												)
												.map((note, i) => (
													<NoteCard note={note} key={i} />
												))}
										</div>
									</div>
									<div className="flex flex-col gap-2 flex-1 glass p-2 rounded-2xl">
										<h2 className="flex gap-2 items-center">
											<LuStar className="text-xl" />{" "}
											<span className="text-lg">Favourite Notes</span>
										</h2>
										<div className="flex flex-col max-w-[500px] gap-2 max-h-[450px] overflow-auto hide-scroll">
											{dataController.notesDataController.notes
												.filter(
													(note) =>
														(catStatus == "All"
															? note
															: note.category == catStatus) &&
														(searchTitle.trim() == ""
															? note
															: note.title
																	.toLowerCase()
																	.includes(searchTitle.toLowerCase())) &&
														note.is_fav
												)
												.map((note, i) => (
													<NoteCard note={note} key={i} />
												))}
										</div>
									</div>
								</div>
							</div>
						</>
					)}
					{dataController.notesDataController.notes.length == 0 && (
						<div className="flex flex-col items-center gap-4 py-5 flex-1 justify-center">
							<LuFileX className="text-4xl" />
							<p className="text-sm max-w-[300px] text-center">
								There are currently no notes. Create one to begin.
							</p>

							<div
								onClick={() => {
									setPrevPath("/notes");
									navigate("/notes/new-note");
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

				<Outlet />
			</div>
		</>
	);
}
