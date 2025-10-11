import { type ReactNode } from "react";
import { LuListTodo } from "react-icons/lu";
import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";

export default function Header(): ReactNode {
	return (
		<div className="sticky top-0 p-2 z-50 sm:px-8 sm:py-4">
			<div className="glass rounded-full flex justify-between items-center p-1">
				<Link
					to={"/"}
					className="flex gap-2 p-2 cursor-pointer pl-4 items-center"
				>
					<LuListTodo className="text-2xl" />
					<p className="text-lg">TaskNote</p>
				</Link>

				<ThemeButton />
			</div>
		</div>
	);
}
