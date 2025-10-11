import { useContext, type ReactNode } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import type { IContext } from "../interfaces/Context.interface";
import { Context } from "../context/Context";

export default function HorizontalBarChart(): ReactNode {
	const { dataController } = useContext(Context) as IContext;
	return (
		<div className="w-full h-64">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={dataController.notesDataController.notesCategoriesCount.slice(
						0,
						6
					)}
					layout="vertical" // makes it horizontal
				>
					<CartesianGrid
						strokeOpacity={"20%"}
						strokeDasharray={"3 3"}
						horizontal={false}
					/>
					<XAxis type="number" tick={{ fontSize: 10 }} />
					<YAxis
						dataKey="category"
						type="category"
						tick={{ fontSize: 10, fill: "#fff" }}
						angle={45}
						textAnchor="end"
						width={50}
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
							return [`${value} notes`, "Notes"]; // [value, label]
						}}
						labelFormatter={(label) => `${label}`}
					/>
					<Bar dataKey="count" fill="#ffffff" radius={[0, 6, 6, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
