import {
	LuCalendarPlus,
	LuCalendarSync,
	LuChevronDown,
	LuFileText,
	LuPenLine,
	LuStar,
	LuStarOff,
	LuTrash,
} from "react-icons/lu";
import type { INote } from "../interfaces/Data.interface";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { CustomCategoryIcon } from "../libs/icons";
import { useLocation, type NavigateFunction } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import type { Data } from "../classes/Data.class";

const CardControllers = ({
	pathname,
	note,
	dataController,
	setPrevPath,
	navigate,
	setIsOpen,
	isOpen,
}: {
	pathname: string;
	note: INote;
	dataController: Data;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	navigate: NavigateFunction;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
}): ReactNode => (
	<>
		<div
			onClick={() => {
				setPrevPath(pathname);
				navigate(
					`${pathname == "/" ? "" : pathname}/update-note/${note.note_id}`
				);
			}}
			className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
		>
			<LuPenLine />
		</div>
		<div
			className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
			onClick={() => dataController.deleteNote(note.note_id)}
		>
			<LuTrash />
		</div>
		<div
			className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
			onClick={() =>
				dataController.updateNote({ ...note, is_fav: !note.is_fav })
			}
		>
			{note.is_fav && <LuStarOff />}
			{!note.is_fav && <LuStar />}
		</div>
		<div
			className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<LuChevronDown
				className={`transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
			/>
		</div>
	</>
);

export default function NoteCard({ note }: { note: INote }) {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [content, setContent] = useState<string>("");
	const location = useLocation();

	useEffect(() => {
		setContent(note.content);
	}, [note]);

	return (
		<div
			className={`glass flex gap-2 items-start p-1 rounded-2xl transition-all duration-300 max-h-[51px] overflow-hidden flex-none ${
				isOpen ? "max-h-[1000px]" : ""
			}`}
		>
			<div className="rounded-full flex p-2 pt-3 text-lg">
				{note.category && <CustomCategoryIcon category={note.category} />}
				{!note.category && <LuFileText />}
			</div>
			<div className="w-full min-w-[220px] flex flex-col items-start">
				<div className="flex items-start w-full justify-between gap-2">
					<div className="flex flex-col flex-1 min-w-0">
						<p
							className={`overflow-hidden transition-all duration-300 break-words ${
								isOpen ? "line-clamp-none" : "line-clamp-1"
							}`}
						>
							{note.title}
						</p>
						<div className="flex items-center gap-2 shrink-0">
							<p className="flex gap-1 text-xs items-center shrink-0">
								<LuCalendarPlus className="text-sm" />
								<span>
									{new Date(note.created_at).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</span>
							</p>

							{note.updated_at && (
								<p className="flex gap-1 text-xs items-center shrink-0">
									<LuCalendarSync className="text-sm" />
									<span>
										{new Date(note.updated_at).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
								</p>
							)}
						</div>
					</div>

					{/* Right actions */}
					<div className="flex glass rounded-full p-0.5 mt-0.5 flex-none">
						<CardControllers
							pathname={location.pathname}
							note={note}
							dataController={dataController}
							setPrevPath={setPrevPath}
							navigate={navigate}
							setIsOpen={setIsOpen}
							isOpen={isOpen}
						/>
					</div>
				</div>

				<div className="mt-2 py-2 border-t border-gray-600 w-full text-sm pl-1">
					<textarea
						readOnly
						className="w-full outline-0 h-fit resize-none"
						value={content}
						ref={(el) => {
							if (el) {
								el.style.height = "auto";
								el.style.height = el.scrollHeight + "px";
							}
						}}
					></textarea>
				</div>
			</div>
		</div>
	);
}
