import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts";
import type { IContext } from "../interfaces/Context.interface";
import { LuListX } from "react-icons/lu";

export default function DailyActivityLineChart(): ReactNode {
	const { dataController } = useContext(Context) as IContext;

	return (
		<>
			<div className="absolute flex p-2 pb-0 bg-theme-foreground w-full h-full rounded-xl glass">
				<div className="flex-1 flex flex-col gap-2 px-2">
					<h2 className="text-base font-semibold ">Daily Activity</h2>

					<div className="flex-1">
						{dataController.activitiesDataController.activities.length > 0 && (
							<ResponsiveContainer height={"100%"} width={"100%"}>
								<LineChart
									data={dataController.activitiesDataController.getActivityGraphData()}
								>
									<CartesianGrid
										strokeOpacity={"20%"}
										strokeDasharray={"3 3"}
									/>
									<XAxis
										dataKey={"date"}
										tick={{ fontSize: 10 }}
										angle={-45}
										textAnchor="end"
										height={50}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: "#1e293b70",
											border: "1px solid #1e293b50",
											color: "#f8fafc",
											borderRadius: "10px",
										}}
										wrapperStyle={{
											borderRadius: "12px",
										}}
										labelStyle={{
											color: "#ffffff",
											fontWeight: "bold",
										}}
										formatter={(value) => {
											return [`${value}`, "Items"]; // [value, label]
										}}
										labelFormatter={(label) =>
											`Date: ${new Date(label).toLocaleDateString("en-US", {
												month: "short", // "Sep"
												day: "numeric", // "8"
												year: "numeric", // "2025"
											})}`
										}
									/>
									<Line
										type={"monotone"}
										dataKey={"count"}
										stroke="#ffffff"
										strokeWidth={"2px"}
									/>
								</LineChart>
							</ResponsiveContainer>
						)}
						{dataController.activitiesDataController.activities.length == 0 && (
							<div className="flex items-center justify-center flex-col p-10 gap-2">
								<LuListX className="text-4xl" />
								<p className="text-sm text-center">
									Looks quiet here! Your activities will show up once you start
									engaging.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
