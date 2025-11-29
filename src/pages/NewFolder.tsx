import { useContext, useState, type ReactNode } from "react";
import { LuFolder, LuFolderPlus, LuPlus, LuX } from "react-icons/lu";
import { Link } from "react-router-dom";
import type { TCustomCategory } from "../interfaces/Data.interface";
import { CUSTOME_CATEGRIES } from "../constants/data";
import { nanoid } from "nanoid";
import { CustomCategoryIcon } from "../libs/icons";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

export default function NewFolder(): ReactNode {
	const { dataController, prevPath, navigate } = useContext(
		Context
	) as IContext;

	// Form
	const [folderTitle, setFolderTitle] = useState<string>("");
	const [folderCategory, setFolderCategory] = useState<TCustomCategory>("Work");

	return (
		<div className="fixed z-30 top-0 h-full w-full flex items-center justify-center -left-0">
			<div className="glass p-2 rounded-2xl max-h-[500px] overflow-auto flex flex-col gap-2 w-[85%] md:w-[70%] lg:w-[50%]">
				<div className="sticky top-0 z-40 flex w-full justify-between items-start">
					<h1 className="flex items-center gap-2 text-lg p-2">
						<LuFolderPlus className="text-xl" />
						<span className="">New Folder</span>
					</h1>
					<Link to={prevPath} className="glass p-1 rounded-full">
						<LuX />
					</Link>
				</div>

				<form
					className="p-2 flex flex-col gap-2"
					onSubmit={(e) => {
						e.preventDefault();
						dataController.createFolder({
							folder_id: nanoid(),
							title: folderTitle,
							projects: [],
							notes: [],
							tasks: [],
							created_at: new Date().toISOString(),
							category: folderCategory,
						});

						navigate(prevPath);
					}}
				>
					<div className="flex gap-2">
						<div className="glass relative rounded-full text-sm flex-1">
							<LuFolder className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
							<input
								required
								type="text"
								placeholder="Folder Title"
								value={folderTitle}
								onChange={(e) => {
									setFolderTitle(e.target.value);
								}}
								className="w-full p-2 pl-8 outline-0"
							/>
						</div>
						<div className="glass relative rounded-full text-sm pr-2">
							<div className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base">
								<CustomCategoryIcon category={folderCategory} />
							</div>
							<select
								className="w-full p-2 pl-8 outline-0 cursor-pointer"
								value={folderCategory}
								onChange={(e) =>
									setFolderCategory(e.target.value as TCustomCategory)
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

					<button className="flex items-center text-sm max-w-[2.25rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] flex-row-reverse cursor-pointer self-end">
						<div className="glass p-0.5 rounded-full">
							<div className="p-1.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuPlus className="text-lg flex-none" />
							</div>
						</div>
						<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
							Add Folder
						</span>
					</button>
				</form>
			</div>
		</div>
	);
}
