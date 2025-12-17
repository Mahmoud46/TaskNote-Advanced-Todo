import { type ReactNode, useContext } from "react";
import { Outlet } from "react-router-dom";
import NotesHolderBody from "../components/NotesHolderBody";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

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
