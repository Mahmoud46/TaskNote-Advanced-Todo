import type { Data } from "../classes/Data.class";
import type { INote } from "./Data.interface";

export interface IContext {
	notes: INote[];
	dataController: Data;
}
