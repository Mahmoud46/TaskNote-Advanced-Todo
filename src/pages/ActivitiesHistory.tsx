import { useContext, type ReactNode } from "react";
import ActivityCard from "../components/ActivityCard";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { LuListX } from "react-icons/lu";
import { activitiesDataCategorization } from "../libs/utils";

export default function ActivitiesHistory(): ReactNode {
	const { dataController } = useContext(Context) as IContext;

	return (
		<div className="w-full relative">
			<div className="flex flex-col gap-2 glass min-h-dvh p-4 rounded-2xl w-full">
				<h1 className="text-2xl sm:text-4xl sticky top-20 bg-[#121212]/80 lg:bg-[#121212]/0 z-10">
					Activities History
				</h1>
				{dataController.activitiesDataController.activities.length > 0 && (
					<div className="flex justify-center">
						<div className="flex flex-col gap-2 max-w-[500px] w-full">
							{activitiesDataCategorization(
								dataController.activitiesDataController.activities
							).map((period, i) => (
								<div className="flex flex-col gap-2 w-full" key={i}>
									<h2 className="text-base font-semibold">{period.category}</h2>
									{period.activities.map((activity, i) => (
										<ActivityCard activity={activity} key={i} />
									))}
								</div>
							))}
						</div>
					</div>
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
		</div>
	);
}
