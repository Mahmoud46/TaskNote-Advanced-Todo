import { createContext } from "react";
import type { IContext } from "../interfaces/Context.interface";

export const Context = createContext<IContext | null>(null);
