import { useEffect, useState, type ReactNode } from "react";
import { Context } from "./Context";
import type { IContext } from "../interfaces/Context.interface";

import { dataController } from "../classes/Data.class";
import type { INote } from "../interfaces/Data.interface";
import { useNavigate } from "react-router-dom";

export default function ContextProvider({ children }: { children: ReactNode }) {
	const [notes, setNotes] = useState<INote[]>([]);
	const [prevPath, setPrevPath] = useState<string>("/");
	const navigate = useNavigate();

	useEffect(() => {
		setNotes([]);
		dataController.init(setNotes);
	}, []);

	const contextValue: IContext = {
		notes,
		dataController,
		navigate,
		prevPath,
		setPrevPath,
	};
	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
