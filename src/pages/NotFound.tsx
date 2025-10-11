import type { ReactNode } from "react";
import { LuHeartCrack, LuHouse } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function NotFound(): ReactNode {
	return (
		<div className="w-full relative">
			<div className="flex flex-col gap-2 glass min-h-[85dvh] p-4 rounded-2xl w-full">
				<div className="flex flex-col items-center justify-center gap-4 min-h-[80dvh]">
					<LuHeartCrack className="text-4xl" />
					<p className="text-sm max-w-[400px] text-center">
						We couldn’t find the page you’re looking for. Try checking the link
						or return home.
					</p>
					<Link
						to={"/"}
						className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
					>
						<div className="glass p-0.5 rounded-full">
							<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuHouse className="text-lg flex-none" />
							</div>
						</div>
						<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
							Back home
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
