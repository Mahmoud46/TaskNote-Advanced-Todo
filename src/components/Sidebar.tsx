import { useState, type ReactNode } from "react";

import {
	LuClipboardPlus,
	LuFilePlus,
	LuFolderPlus,
	LuPlus,
	LuX,
} from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { PAGES_MENU_PATHS } from "../constants/data";

export default function Sidebar(): ReactNode {
	const location = useLocation();
	const [isAddOptionsOpen, setIsAddOptionsOpen] = useState<boolean>(false);
	return (
		<aside
			className={`fixed left-0 h-[100dvh] flex-col p-4 pl-8 gap-4 z-50 hidden md:flex `}
		>
			<ul className="w-fit overflow-hidden">
				<li
					className="flex items-center group text-sm transition duration-300 cursor-pointer rounded-xl w-fit"
					onClick={() => setIsAddOptionsOpen((prev) => !prev)}
				>
					<div className="glass p-0.5 rounded-full cursor-pointer">
						<div className="p-2.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
							{!isAddOptionsOpen && <LuPlus className="text-lg" />}
							{isAddOptionsOpen && <LuX className="text-lg" />}
						</div>
					</div>
				</li>
				<li className="w-fit">
					<ul className=" flex flex-col">
						<li
							className={`flex items-center group text-sm transition duration-300 cursor-pointer rounded-xl w-fit ${
								isAddOptionsOpen
									? "opacity-100"
									: "opacity-0 pointer-events-none"
							}`}
						>
							<Link
								to={"new-folder"}
								className="glass p-0.5 rounded-full cursor-pointer"
							>
								<div className="p-2.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
									<LuFolderPlus className="text-lg" />
								</div>
							</Link>
							{isAddOptionsOpen && (
								<p className="glass p-3 py-2 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none">
									New Folder
								</p>
							)}
						</li>
						<li
							className={`flex items-center group text-sm transition duration-300 cursor-pointer rounded-xl w-fit ${
								isAddOptionsOpen
									? "-translate-y-0 opacity-100"
									: "-translate-y-6 opacity-0 pointer-events-none"
							}`}
						>
							<Link
								to={"new-task"}
								className="glass p-0.5 rounded-full cursor-pointer"
							>
								<div className="p-2.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
									<LuClipboardPlus className="text-lg" />
								</div>
							</Link>
							{isAddOptionsOpen && (
								<p className="glass p-3 py-2 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none">
									New Task
								</p>
							)}
						</li>
						<li
							className={`flex items-center group text-sm transition duration-300 cursor-pointer rounded-xl w-fit ${
								isAddOptionsOpen
									? "-translate-y-0 opacity-100"
									: "-translate-y-12 opacity-0 pointer-events-none"
							}`}
						>
							<Link
								to={"new-note"}
								className="glass p-0.5 rounded-full cursor-pointer"
							>
								<div className="relative p-2.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
									<LuFilePlus className="text-lg" />
								</div>
							</Link>
							{isAddOptionsOpen && (
								<p className="glass p-3 py-2 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none">
									New Note
								</p>
							)}
						</li>
					</ul>
				</li>
			</ul>
			<ul
				className={`transition-all duration-300 ${
					isAddOptionsOpen ? "-translate-y-0" : "-translate-y-30"
				}`}
			>
				{PAGES_MENU_PATHS.map((pagePath, i) => (
					<li
						key={i}
						className="flex items-center group text-sm transition duration-300 cursor-pointer rounded-xl w-fit"
					>
						<Link
							to={pagePath.path}
							className="glass p-0.5 rounded-full cursor-pointer"
						>
							<div
								className={`p-2.5 rounded-full ${
									location.pathname == pagePath.path
										? "bg-white text-gray-900"
										: "opacity-80 group-hover:opacity-100"
								} transition duration-300`}
							>
								<pagePath.icon className="text-lg" />
							</div>
						</Link>
						<p className="glass p-3 py-2 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none">
							{pagePath.title}
						</p>
					</li>
				))}
			</ul>
		</aside>
	);
}
