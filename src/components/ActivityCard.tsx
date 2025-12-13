import {
	LuCalendarPlus,
	LuChevronDown,
	LuFolder,
	LuRocket,
} from "react-icons/lu";
import type { IActivity } from "../interfaces/Data.interface";
import { useState } from "react";
import { ActivityIcon } from "../libs/icons";
import { Link } from "react-router-dom";

export default function ActivityCard({ activity }: { activity: IActivity }) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<div
			className={`glass flex gap-2 items-start p-1 rounded-2xl transition-all duration-300 max-h-[51px] overflow-hidden flex-none ${
				isOpen ? "max-h-[1000px]" : ""
			}`}
		>
			<div className="rounded-full flex p-2 pt-3 text-lg">
				<ActivityIcon type={activity.type} action={activity.action} />
			</div>
			<div className="flex-1 flex flex-col items-start min-w-0">
				<div className="flex items-start w-full justify-between gap-2">
					<div className="flex flex-col flex-1 min-w-0">
						<p
							className={`overflow-hidden transition-all duration-300 break-words ${
								isOpen ? "line-clamp-none mb-2" : "line-clamp-1"
							}`}
						>
							{activity.title}
						</p>

						{/* Date Section */}
						<div className="flex items-center gap-2 shrink-0">
							<p className="flex gap-1 text-xs items-center shrink-0">
								<LuCalendarPlus className="text-sm" />
								<span>
									{new Date(activity.created_at).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</span>
							</p>
						</div>
					</div>

					{/* Chevron Button */}
					<div className="flex glass rounded-full p-0.5 mt-0.5 flex-none">
						<div
							className="p-2 text-sm cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900 rounded-full"
							onClick={() => setIsOpen((prev) => !prev)}
						>
							<LuChevronDown
								className={`transition-all duration-300 ${
									isOpen ? "rotate-180" : ""
								}`}
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2 mt-2 py-2 border-t border-gray-600 w-full text-sm pl-1">
					<p className="wrap-break-word">{activity.description}</p>

					{activity.reference_id && (
						<div className="glass w-fit p-0.5 rounded-full cursor-pointer flex group self-end">
							{activity.type == "folder" && (
								<Link
									to={`folders/${activity.reference_id}`}
									className="transition group-hover:bg-white group-hover:text-gray-900 p-1.5 rounded-full"
								>
									<LuFolder />
								</Link>
							)}

							{activity.type == "project" && (
								<Link
									to={`projects/${activity.reference_id}`}
									className="transition group-hover:bg-white group-hover:text-gray-900 p-1.5 rounded-full"
								>
									<LuRocket />
								</Link>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
