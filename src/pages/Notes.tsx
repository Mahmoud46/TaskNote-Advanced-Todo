import { useContext, useState, type ReactNode } from "react";
import { Outlet, useLocation, type NavigateFunction } from "react-router-dom";
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
import type { INote, TCustomCategory } from "../interfaces/Data.interface";
import { CUSTOME_CATEGRIES } from "../constants/data";
import NoteCard from "../components/NoteCard";

const EmptyNotes = ({
	notes,
	navigate,
	setPrevPath,
	locationPathname,
	folderID,
	projectID,
}: {
	notes: INote[];
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	locationPathname: string;
	folderID?: string;
	projectID?: string;
}): ReactNode => (
	<>
		{notes.length == 0 && (
			<div className="flex flex-col items-center gap-4 py-5 flex-1 justify-center">
				<LuFileX className="text-4xl" />
				<p className="text-sm max-w-[300px] text-center">
					There are currently no notes. Create one to begin.
				</p>

				<div
					onClick={() => {
						setPrevPath(locationPathname);
						navigate(
							`${locationPathname}/new-note${
								folderID || projectID
									? `?${[
											folderID && `folder_id=${folderID}`,
											projectID && `project_id=${projectID}`,
									  ]
											.filter(Boolean)
											.join("&")}`
									: ""
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
	</>
);

const NotesControllersAndSelectors = ({
	catStatus,
	searchTitle,
	navigate,
	setPrevPath,
	setSearchTitle,
	setCatStatus,
	tabSelector,
	setTabSelector,
	locationPathname,
	folderID,
	projectID,
}: {
	catStatus: "All" | TCustomCategory;
	searchTitle: string;
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
	setCatStatus: React.Dispatch<React.SetStateAction<TCustomCategory | "All">>;
	tabSelector: "Notes" | "Favourite Notes";
	setTabSelector: React.Dispatch<
		React.SetStateAction<"Notes" | "Favourite Notes">
	>;
	locationPathname: string;
	folderID?: string;
	projectID?: string;
}) => (
	<div className="flex justify-between flex-wrap gap-4">
		<div className="flex items-center pl-0 md:pl-10">
			<button
				className={`flex items-center gap-2 p-2 cursor-pointer transition-all duration-300 relative ${
					tabSelector == "Notes" ? "" : "opacity-80 hover:opacity-95"
				}`}
				onClick={() => setTabSelector("Notes")}
			>
				<span
					className={`bg-white h-0.5 left-0 bottom-0 absolute w-0 transition-all duration-300 ${
						tabSelector == "Notes" ? "w-full" : ""
					}`}
				></span>
				<LuFileText className="text-lg" />{" "}
				<span className="text-base font-semibold">All Notes</span>
			</button>
			<button
				className={`flex items-center gap-2 p-2 cursor-pointer transition-all duration-300 relative ${
					tabSelector == "Favourite Notes" ? "" : "opacity-80 hover:opacity-95"
				}`}
				onClick={() => setTabSelector("Favourite Notes")}
			>
				<span
					className={`bg-white h-0.5 left-0 bottom-0 absolute w-0 transition-all duration-300 ${
						tabSelector == "Favourite Notes" ? "w-full" : ""
					}`}
				></span>
				<LuStar className="text-lg" />{" "}
				<span className="text-base font-semibold">Favourite Notes</span>
			</button>
		</div>
		<div className="flex justify-end flex-wrap">
			<div className="glass relative rounded-full pr-2">
				<div className="absolute opacity-80 top-1/2 -translate-y-1/2 left-2">
					<LuSearch />
				</div>
				<input
					type="text"
					value={searchTitle}
					onChange={(e) => setSearchTitle(e.target.value)}
					placeholder="Search note with title..."
					className="outline-0 p-2 pl-8 text-sm max-w-[150px] lg:max-w-max w-full"
				/>
			</div>
			<div className="glass relative rounded-full pr-2">
				<div className="absolute opacity-80 top-1/2 -translate-y-1/2 left-2">
					{catStatus != "All" && <CustomCategoryIcon category={catStatus} />}
					{catStatus == "All" && <LuFolder />}
				</div>
				<select
					value={catStatus}
					className="cursor-pointer outline-0 p-2 pl-8 text-sm max-w-[100px] lg:max-w-max w-full"
					onChange={(e) =>
						setCatStatus(e.target.value as "All" | TCustomCategory)
					}
				>
					<option value="All" className="bg-white text-gray-900">
						All
					</option>
					{CUSTOME_CATEGRIES.map((cat, i) => (
						<option value={cat} key={i} className="bg-white text-gray-900">
							{cat}
						</option>
					))}
				</select>
			</div>
			<div
				onClick={() => {
					setPrevPath(locationPathname);
					navigate(
						`${locationPathname}/new-note${
							folderID || projectID
								? `?${[
										folderID && `folder_id=${folderID}`,
										projectID && `project_id=${projectID}`,
								  ]
										.filter(Boolean)
										.join("&")}`
								: ""
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
	</div>
);

const NotesList = ({ notes }: { notes: INote[] }): ReactNode => (
	<div className="flex flex-col gap-2 max-h-[450px] overflow-auto">
		<h2 className="font-semibold">{notes.length} Notes found.</h2>
		{notes.map((note, i) => (
			<NoteCard note={note} key={i} />
		))}
	</div>
);

export const NotesHolderBody = ({
	notes,
	navigate,
	setPrevPath,
	projectID,
	folderID,
}: {
	notes: INote[];
	navigate: NavigateFunction;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	projectID?: string;
	folderID?: string;
}): ReactNode => {
	const [catStatus, setCatStatus] = useState<"All" | TCustomCategory>("All");
	const [searchTitle, setSearchTitle] = useState<string>("");
	const [tabSelector, setTabSelector] = useState<"Notes" | "Favourite Notes">(
		"Notes"
	);
	const location = useLocation();
	return (
		<>
			{notes.length > 0 && (
				<>
					{/* Controllers */}
					<NotesControllersAndSelectors
						catStatus={catStatus}
						searchTitle={searchTitle}
						navigate={navigate}
						setPrevPath={setPrevPath}
						setSearchTitle={setSearchTitle}
						setCatStatus={setCatStatus}
						tabSelector={tabSelector}
						setTabSelector={setTabSelector}
						locationPathname={location.pathname}
						projectID={projectID}
						folderID={folderID}
					/>

					<div className="flex justify-center">
						<div className="flex w-full gap-2 items-start flex-wrap max-w-[700px]">
							{tabSelector == "Notes" && (
								<NotesList
									notes={notes.filter(
										(note) =>
											(catStatus === "All" || note.category == catStatus) &&
											(searchTitle.trim() === "" ||
												note.title
													.toLowerCase()
													.includes(searchTitle.toLowerCase()))
									)}
								/>
							)}
							{tabSelector == "Favourite Notes" && (
								<NotesList
									notes={notes.filter(
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
									)}
								/>
							)}
						</div>
					</div>
				</>
			)}
			<EmptyNotes
				notes={notes}
				setPrevPath={setPrevPath}
				navigate={navigate}
				locationPathname={location.pathname}
				projectID={projectID}
				folderID={folderID}
			/>
		</>
	);
};

export default function Notes(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	return (
		<>
			<div className="w-full relative">
				<div className="flex flex-col gap-2 glass min-h-[90dvh] p-4 rounded-2xl w-full">
					<h1 className="text-2xl sm:text-4xl">Your Notes</h1>
					<NotesHolderBody
						notes={dataController.notesDataController.notes}
						setPrevPath={setPrevPath}
						navigate={navigate}
					/>
				</div>

				<Outlet />
			</div>
		</>
	);
}
