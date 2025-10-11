import { useEffect, useState, type ReactNode } from "react";
import { Context } from "./Context";
import type { IContext } from "../interfaces/Context.interface";

import { dataController } from "../classes/Data.class";
import type { INote } from "../interfaces/Data.interface";

export default function ContextProvider({ children }: { children: ReactNode }) {
	const [notes, setNotes] = useState<INote[]>([]);

	useEffect(() => {
		setNotes([]);
		dataController.init(setNotes);
	}, []);

	const contextValue: IContext = {
		notes,
		dataController,
	};
	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
