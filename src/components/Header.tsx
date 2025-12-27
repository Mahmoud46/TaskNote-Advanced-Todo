import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import logo from "../assets/tasknote.svg";

export default function Header(): ReactNode {
	return (
		<div className="sticky top-0 p-2 z-50 sm:px-8 sm:py-4">
			<div className="glass rounded-full flex justify-between items-center p-1">
				<Link
					to={"/"}
					className="flex gap-2 p-2 cursor-pointer pl-4 items-center"
				>
					<img src={logo} alt="tasknote" className="h-5" />
					<p className="text-lg font-semibold poppins">
						<span className="font-light">Task</span>
						<span>Note</span>
					</p>
				</Link>

				<ThemeButton />
			</div>
		</div>
	);
}
