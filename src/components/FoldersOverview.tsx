import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	LuArrowRight,
	LuFolder,
	LuFolderPlus,
	LuFolderX,
} from "react-icons/lu";
import { CustomCategoryIcon } from "../libs/icons";
import { Link } from "react-router-dom";

export default function FoldersOverview(): ReactNode {
	const { dataController, setPrevPath, navigate } = useContext(
		Context
	) as IContext;
	return (
		<div className="w-full sm:w-fit flex flex-col gap-1 glass p-2 rounded-2xl">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold px-2">My Folders</h1>
				<div className="flex items-center justify-center flex-row-reverse">
					<Link
						to={"/folders"}
						className="text-xl glass p-0.5 rounded-full flex items-center justify-center gap-0.5 group cursor-pointer"
					>
						{dataController.foldersDataController.folders.length > 2 && (
							<p className="text-xs text-center pl-1">
								+{dataController.foldersDataController.folders.length - 2}
							</p>
						)}
						<div className="p-2 transition-full duration-300 group-hover:bg-white group-hover:text-gray-900 rounded-full group-hover:-rotate-45">
							<LuArrowRight />
						</div>
					</Link>

					<div
						onClick={() => {
							setPrevPath("/");
							navigate("/new-folder");
						}}
						className="text-xl p-0.5 glass rounded-full group cursor-pointer"
					>
						<div className="p-2 transition-full duration-300 group-hover:bg-white group-hover:text-gray-900 rounded-full">
							<LuFolderPlus />
						</div>
					</div>
				</div>
			</div>
			{dataController.foldersDataController.folders.length > 0 && (
				<>
					<div className="flex gap-2 items-center overflow-auto w-full sm:w-auto">
						{dataController.foldersDataController.folders
							.slice(0, 2)
							.map((folder, i) => (
								<div
									className="flex flex-col justify-between glass rounded-xl p-0.5 rounded-tr-3xl w-[180px] h-[128px]"
									key={i}
								>
									<div className="flex justify-end -translate-x-0.5 translate-y-0.5">
										<Link
											to={`/folders/${folder.folder_id}`}
											className="p-2 rounded-full glass w-fit cursor-pointer flex-none transition duration-300 hover:-rotate-45"
										>
											<LuArrowRight />
										</Link>
									</div>
									<div className="p-2 flex gap-2 items-center">
										<div className="text-xl px-1">
											{folder.category && (
												<CustomCategoryIcon category={folder.category} />
											)}
											{!folder.category && <LuFolder />}
										</div>
										<div className="">
											<h1 className="text-base line-clamp-1">{folder.title}</h1>
											<p className="text-xs">
												{new Date(folder.created_at).toLocaleDateString(
													"en-US",
													{
														year: "numeric",
														month: "short",
														day: "numeric",
													}
												)}
											</p>
										</div>
									</div>
								</div>
							))}
					</div>
				</>
			)}
			{dataController.foldersDataController.folders.length == 0 && (
				<div className="flex flex-col items-center gap-4 py-5">
					<LuFolderX className="text-4xl" />
					<p className="text-sm max-w-[300px] text-center">
						There are currently no folders. Create one to begin.
					</p>

					<div
						onClick={() => {
							setPrevPath("/");
							navigate("/new-folder");
						}}
						className="flex items-center text-sm max-w-[2.5rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] cursor-pointer"
					>
						<div className="glass p-0.5 rounded-full">
							<div className="p-2 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuFolderPlus className="text-lg flex-none" />
							</div>
						</div>
						<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
							Add Folder
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
