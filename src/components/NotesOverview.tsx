import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { LuFilePlus, LuArrowRight, LuFileX } from "react-icons/lu";
import { Link } from "react-router-dom";
import NoteCard from "./NoteCard";

export default function NotessOverview(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	return (
		<div className="flex-1 flex flex-col gap-1 glass p-2 rounded-2xl">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold px-2 flex items-center gap-2">
					Recent Notes
				</h1>
				{dataController.notesDataController.notes.length > 0 && (
					<div className="flex items-center">
						<div
							onClick={() => {
								setPrevPath("/");
								navigate("/new-note");
							}}
							className="glass p-0.5 rounded-full flex-none group cursor-pointer"
						>
							<div className="p-2 text-lg transition duration-300 group-hover:bg-white group-hover:text-gray-900 rounded-full">
								<LuFilePlus />
							</div>
						</div>
						<Link
							to={"/notes"}
							className="glass p-0.5 rounded-full flex-none group cursor-pointer"
						>
							<div className="p-2 text-lg transition duration-300 group-hover:bg-white group-hover:text-gray-900 group-hover:-rotate-45 rounded-full">
								<LuArrowRight />
							</div>
						</Link>
					</div>
				)}
			</div>
			{dataController.notesDataController.notes.length > 0 && (
				<div className="overflow-auto hide-scroll flex flex-col gap-2">
					{dataController.notesDataController.notes
						.slice(0, 3)
						.map((note, i) => (
							<NoteCard note={note} key={i} />
						))}
				</div>
			)}
			{dataController.notesDataController.notes.length == 0 && (
				<div className="flex flex-col items-center gap-4 py-5">
					<LuFileX className="text-4xl" />
					<p className="text-sm max-w-[300px] text-center">
						There are currently no notes. Create one to begin.
					</p>

					<div
						onClick={() => {
							setPrevPath("/");
							navigate("/new-note");
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
	);
}
