import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { getProgressColor } from "../libs/utils";
export default function CircularProgressPieChart({
	progress,
}: {
	progress: number;
}) {
	const data = [
		{ name: "Completed", value: progress },
		{ name: "Remaining", value: 100 - progress },
	];

	const COLORS = [getProgressColor(progress), "#E0E0E000"];

	return (
		<div className="absolute bg-theme-foreground w-full h-full glass rounded-full">
			<p className="absolute left-[50%] top-[50%] -translate-[50%] text-center text-lg leading-4 opacity-70">
				<span className="text-4xl">{progress.toFixed(0)}</span>%
			</p>
			<ResponsiveContainer height={"100%"} width={"100%"}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius="90%"
						outerRadius={"100%"}
						paddingAngle={10}
						startAngle={90}
						endAngle={-270}
						stroke="none"
						cornerRadius={50}
					>
						{data.map((_, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index]} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
