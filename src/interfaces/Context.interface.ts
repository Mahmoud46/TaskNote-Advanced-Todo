import type { NavigateFunction } from "react-router-dom";
import type { Data } from "../classes/Data.class";
import type { INote } from "./Data.interface";

export interface IContext {
	notes: INote[];
	dataController: Data;
	prevPath: string;
	setPrevPath: React.Dispatch<React.SetStateAction<string>>;
	navigate: NavigateFunction;
}
