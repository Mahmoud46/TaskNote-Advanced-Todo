import { useEffect, useState, type ReactNode } from "react";
import { LuCalendar, LuLoaderCircle } from "react-icons/lu";
import { WEEK_DAYS } from "../constants/data";

export default function NowDateTime(): ReactNode {
	const [timeNowAMPM, setTimeNowAMPM] = useState<string>();

	const [dateNow, setDateNow] = useState<string>("");
	const [dayNumberInMonth, setDayNumberInMonth] = useState<number>(0);
	const [dayName, setDayName] = useState<string>("");

	useEffect(() => {
		const timeInterval = setInterval(() => {
			const now = new Date();

			setTimeNowAMPM(
				now.toLocaleTimeString("en-US", {
					hour: "numeric",
					minute: "2-digit",
					hour12: true,
				})
			);
			setDateNow(
				now.toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})
			);
			setDayNumberInMonth(now.getDate());
			setDayName(WEEK_DAYS[now.getDay()]);
		}, 3000);
		return () => clearInterval(timeInterval);
	});
	return (
		<>
			{!(dayNumberInMonth == 0) && (
				<div className="flex-none flex gap-4 items-center glass glass rounded-2xl p-2 overflow-hidden">
					<div className="relative">
						<LuCalendar className="text-6xl" strokeWidth={1} />
						<span className="absolute top-1/2 left-1/2 -translate-1/2 mt-2 text-xl">
							{dayNumberInMonth}
						</span>
					</div>
					<div className="">
						<p className="text-sm opacity-70">{dayName}</p>
						<p className="text-3xl font-light">{timeNowAMPM}</p>
						<p className="opacity-80 text-base">{dateNow}</p>
					</div>
				</div>
			)}
			{dayNumberInMonth == 0 && (
				<div className="flex gap-4 items-center justify-center glass glass rounded-2xl p-10 py-6 overflow-hidden">
					<LuLoaderCircle
						className="text-5xl animate-spin [animation-duration:1s]"
						strokeWidth={1}
					/>
				</div>
			)}
		</>
	);
}
