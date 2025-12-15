import { useContext, useState, type ReactNode } from "react";
import {
	LuCalendarClock,
	LuCalendarPlus,
	LuCheck,
	LuClock,
	LuLoader,
	LuNotebook,
	LuPlus,
	LuRocket,
	LuX,
} from "react-icons/lu";
import { Link, useSearchParams } from "react-router-dom";
import type {
	IProject,
	TCustomCategory,
	TProjectStatus,
} from "../interfaces/Data.interface";
import { CUSTOME_CATEGRIES, PROJECT_STATUS } from "../constants/data";
import { nanoid } from "nanoid";
import { CustomCategoryIcon } from "../libs/icons";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { extractLinks, replaceLinksInSentence } from "../libs/utils";

export default function NewProject(): ReactNode {
	const [searchParams] = useSearchParams();
	const folderID = searchParams.get("folder_id");

	const { dataController, prevPath, navigate } = useContext(
		Context
	) as IContext;
	// Form
	const [projectTitle, setProjectTitle] = useState<string>("");
	const [projectStatus, setProjectStatus] = useState<TProjectStatus>("Pending");
	const [projectDescription, setProjectDescription] = useState<string>("");
	const [projectStartDate, setProjectStartDate] = useState<string>("");
	const [projectDueDate, setProjectDueDate] = useState<string>("");
	const [projectCategory, setProjectCategory] =
		useState<TCustomCategory>("Work");

	return (
		<div className="fixed z-30 top-0 h-full w-full flex items-center justify-center -left-0">
			<div className="glass p-2 rounded-2xl max-h-[90dvh] overflow-auto flex flex-col gap-2 sm:w-[50%]">
				<div className="sticky top-0 z-40 flex w-full justify-between items-start">
					<h1 className="flex items-center gap-2 text-lg p-2">
						<LuRocket className="text-xl" />
						<span className="">New Project</span>
					</h1>
					<Link to={prevPath} className="glass p-1 rounded-full">
						<LuX />
					</Link>
				</div>

				<form
					className="p-2 flex flex-col gap-2"
					onSubmit={(e) => {
						e.preventDefault();
						const projectFormData: IProject = {
							...{},
							project_id: nanoid(),
							status: projectStatus,
							title: projectTitle,
							description: projectDescription,
							html_description: "",
							tasks: [],
							notes: [],
							created_at: new Date().toISOString(),
							start_date: projectStartDate,
							due_date: projectDueDate,
							category: projectCategory,
						};

						if (folderID) projectFormData.folder_id = folderID;
						if (projectDescription) {
							projectFormData.links = extractLinks(projectDescription);
							projectFormData.html_description = replaceLinksInSentence(
								projectFormData.description,
								projectFormData.links
							);
						}

						dataController.createProject(projectFormData);
						navigate(prevPath);
					}}
				>
					<div className="glass relative rounded-full text-sm flex-1">
						<LuRocket className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
						<input
							required
							type="text"
							placeholder="Project Title"
							value={projectTitle}
							onChange={(e) => {
								setProjectTitle(e.target.value);
							}}
							className="w-full p-2 pl-8 outline-0"
						/>
					</div>
					<div className="flex gap-2 flex-wrap">
						<div className="glass relative rounded-full text-sm pr-2">
							<div className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base">
								{projectStatus == "Completed" && <LuCheck />}
								{projectStatus == "Pending" && <LuClock />}
								{projectStatus == "In Progress" && <LuLoader />}
							</div>
							<select
								className="w-full p-2 pl-7 outline-0 cursor-pointer"
								value={projectStatus}
								onChange={(e) =>
									setProjectStatus(e.target.value as TProjectStatus)
								}
							>
								{PROJECT_STATUS.map((status, i) => (
									<option
										key={i}
										className="bg-white text-gray-900 cursor-pointer"
										value={status.title}
									>
										{status.value}
									</option>
								))}
							</select>
						</div>
						<div className="glass relative rounded-full text-sm">
							<LuCalendarPlus className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
							<input
								type="date"
								required
								value={projectStartDate}
								onChange={(e) => {
									setProjectStartDate(e.target.value);
								}}
								className="w-full p-2 pl-8 outline-0"
							/>
						</div>
						<div className="glass relative rounded-full text-sm">
							<LuCalendarClock className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
							<input
								type="date"
								required
								value={projectDueDate}
								onChange={(e) => {
									setProjectDueDate(e.target.value);
								}}
								className="w-full p-2 pl-8 outline-0"
							/>
						</div>
						<div className="glass relative rounded-full text-sm pr-2">
							<div className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base">
								<CustomCategoryIcon category={projectCategory} />
							</div>
							<select
								className="w-full p-2 pl-8 outline-0 cursor-pointer"
								value={projectCategory}
								onChange={(e) =>
									setProjectCategory(e.target.value as TCustomCategory)
								}
							>
								{CUSTOME_CATEGRIES.map((cat, i) => (
									<option
										key={i}
										className="bg-white text-gray-900 cursor-pointer"
									>
										{cat}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="w-full glass relative rounded-2xl text-sm">
						<LuNotebook
							className={"opacity-70 absolute left-2 top-2.5 text-base"}
						/>
						<textarea
							value={projectDescription}
							placeholder="Briefly describe the purpose and scope of this project. (Optional)"
							className="resize-none w-full p-2 outline-0 h-[200px] pl-8"
							onChange={(e) => setProjectDescription(e.target.value)}
						></textarea>
					</div>
					<button className="flex items-center text-sm max-w-[2.25rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] flex-row-reverse cursor-pointer self-end">
						<div className="glass p-0.5 rounded-full">
							<div className="p-1.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuPlus className="text-lg flex-none" />
							</div>
						</div>
						<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
							Add Project
						</span>
					</button>
				</form>
			</div>
		</div>
	);
}
