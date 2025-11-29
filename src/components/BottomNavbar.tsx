import type { ReactNode } from "react";
import { PAGES_MENU_PATHS } from "../constants/data";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavbar(): ReactNode {
	const location = useLocation();
	return (
		<div className="sticky top-dvh flex md:hidden justify-center items-center bottom-0 w-full z-50 p-2">
			<div className="glass flex p-2 rounded-full w-fit justify-center">
				{PAGES_MENU_PATHS.map((link, i) => (
					<Link
						to={link.path}
						className={`p-2.5 rounded-full ${
							location.pathname == link.path
								? "bg-white text-gray-900"
								: "opacity-80 group-hover:opacity-100"
						} transition duration-300`}
						key={i}
					>
						<link.icon className="text-lg" />
					</Link>
				))}
			</div>
		</div>
	);
}
