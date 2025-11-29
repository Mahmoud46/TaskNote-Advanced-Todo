import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import ActivityCard from "./ActivityCard";
import { LuHistory, LuListX } from "react-icons/lu";

export default function RecentActivites(): ReactNode {
	const { dataController } = useContext(Context) as IContext;
	return (
		<div className="glass p-2 rounded-2xl flex flex-col gap-2">
			{dataController.activitiesDataController.activities.length > 0 && (
				<>
					<div className="text-base font-semibold flex items-center gap-2">
						<LuHistory className="text-lg" />
						<p>Recent Activites</p>
					</div>
					<div className="flex flex-col gap-2 max-h-[400px] overflow-auto hide-scroll">
						{dataController.activitiesDataController.activities
							.slice(0, 5)
							.map((activity, i) => (
								<ActivityCard activity={activity} key={i} />
							))}
					</div>
				</>
			)}

			{dataController.activitiesDataController.activities.length == 0 && (
				<div className="flex items-center justify-center flex-col p-10 gap-2">
					<LuListX className="text-3xl" />
					<p className="text-xs text-center">
						Looks quiet here! Your activities will show up once you start
						engaging.
					</p>
				</div>
			)}
		</div>
	);
}
