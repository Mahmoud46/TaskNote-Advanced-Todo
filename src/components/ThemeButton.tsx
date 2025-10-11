import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { toggleTheme } from "../libs/utils";

export default function ThemeButton() {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
		JSON.parse(localStorage.getItem("is_dark") as string) ?? true
	);

	useEffect(() => {
		if (!isDarkTheme) document.documentElement.classList.add("light");
	}, [isDarkTheme]);

	return (
		<div
			onClick={() => {
				toggleTheme();
				setIsDarkTheme((prev) => !prev);
			}}
			className="glass p-0.5 rounded-full cursor-pointer flex items-center relative"
		>
			<span
				className={`bg-white w-9.5 h-9.5 rounded-full left-0.5 absolute transition duration-300 ${
					isDarkTheme ? "translate-0" : "translate-x-8.5"
				}`}
			></span>
			<div
				className={`p-2.5 opacity-70 z-10 transition duration-300 ${
					isDarkTheme ? "opacity-100 text-gray-900" : ""
				}`}
			>
				<LuMoon
					className={`transition duration-300 ${
						isDarkTheme ? "text-lg" : "text-sm"
					}`}
				/>
			</div>
			<div
				className={`p-2.5 opacity-70 z-10 transition duration-300 ${
					isDarkTheme ? "" : "opacity-100 text-gray-900"
				}`}
			>
				<LuSun className={`${isDarkTheme ? "text-sm" : "text-lg"}`} />
			</div>
		</div>
	);
}
