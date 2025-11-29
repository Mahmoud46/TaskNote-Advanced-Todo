import { useContext, useEffect, useState, type ReactNode } from "react";
import {
	LuFilePen,
	LuFileText,
	LuFileX,
	LuNotebook,
	LuPenLine,
	LuX,
} from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import type { TCustomCategory } from "../interfaces/Data.interface";
import { CustomCategoryIcon } from "../libs/icons";
import { CUSTOME_CATEGRIES } from "../constants/data";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

export default function UpdateNote(): ReactNode {
	const { id } = useParams();

	const { dataController, prevPath, navigate } = useContext(
		Context
	) as IContext;
	// Form
	const [noteTitle, setNoteTitle] = useState<string>("");
	const [noteCategory, setNoteCategory] = useState<TCustomCategory>("Work");
	const [noteContent, setNoteContent] = useState<string>("");

	useEffect(() => {
		if (dataController.notesDataController.includes(id as string)) {
			setNoteTitle(
				dataController.notesDataController.getNote(id as string).title
			);
			setNoteCategory(
				(dataController.notesDataController.getNote(id as string)
					.category as TCustomCategory) ?? "Work"
			);
			setNoteContent(
				dataController.notesDataController.getNote(id as string).content
			);
		}
	}, [id, dataController.notesDataController]);
	return (
		<div className="fixed z-30 top-0 h-full w-full flex items-center justify-center -left-0">
			{dataController.notesDataController.includes(id as string) && (
				<div className="glass p-2 rounded-2xl max-h-[90dvh] overflow-auto flex flex-col gap-2 sm:w-[80%] md:w-[70%] lg:w-[50%]">
					<div className="sticky top-0 z-40 flex w-full justify-between items-start">
						<h1 className="flex items-center gap-2 text-lg p-2">
							<LuFilePen className="text-xl" />
							<span className="">Update Note</span>
						</h1>
						<Link to={prevPath} className="glass p-1 rounded-full">
							<LuX />
						</Link>
					</div>

					<form
						className="p-2 flex flex-col gap-2"
						onSubmit={(e) => {
							e.preventDefault();
							dataController.updateNote({
								...dataController.notesDataController.getNote(id as string),
								title: `${
									noteTitle == "" ? `${noteContent.slice(0, 20)}...` : noteTitle
								}`,
								content: noteContent,
								updated_at: new Date().toISOString(),
								category: noteCategory,
							});
							navigate(prevPath);
						}}
					>
						<div className="flex gap-2">
							<div className="glass relative rounded-full text-sm flex-1">
								<LuFileText className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
								<input
									type="text"
									placeholder="Note Title"
									value={noteTitle}
									onChange={(e) => {
										setNoteTitle(e.target.value);
									}}
									className="w-full p-2 pl-8 outline-0"
								/>
							</div>
							<div className="glass relative rounded-full text-sm pr-2">
								<div className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base">
									<CustomCategoryIcon category={noteCategory} />
								</div>
								<select
									className="w-full p-2 pl-8 outline-0 cursor-pointer"
									value={noteCategory}
									onChange={(e) =>
										setNoteCategory(e.target.value as TCustomCategory)
									}
								>
									{CUSTOME_CATEGRIES.map((cat, i) => (
										<option
											key={i}
											className="bg-white text-gray-900 cursor-pointer"
										>
											{cat}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="w-full glass relative rounded-2xl text-sm">
							<LuNotebook
								className={"opacity-70 absolute left-2 top-2.5 text-base"}
							/>
							<textarea
								required
								value={noteContent}
								placeholder="Write your note here..."
								className="resize-none w-full p-2 outline-0 h-[200px] pl-8"
								onChange={(e) => setNoteContent(e.target.value)}
							></textarea>
						</div>
						<button className="flex items-center text-sm max-w-[2.25rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] flex-row-reverse cursor-pointer self-end">
							<div className="glass p-0.5 rounded-full">
								<div className="p-1.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
									<LuPenLine className="text-lg flex-none" />
								</div>
							</div>
							<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
								Update Note
							</span>
						</button>
					</form>
				</div>
			)}

			{!dataController.notesDataController.includes(id as string) && (
				<div className="glass rounded-2xl max-h-[500px] overflow-auto flex flex-col gap-2 sm:w-[50%] p-2">
					<div className="sticky top-0 z-40 flex w-full justify-end items-start">
						<Link to={prevPath} className="glass p-1 rounded-full">
							<LuX />
						</Link>
					</div>
					<div className="p-10 flex flex-col items-center gap-4">
						<LuFileX className="text-4xl" />
						<p className="text-center text-sm max-w-[400px]">
							The note you’re looking for doesn’t exist or may have been
							deleted.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
