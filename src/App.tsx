import type { ReactNode } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import NewNote from "./pages/NewNote";
import NewProject from "./pages/NewProject";
import NewFolder from "./pages/NewFolder";
import UpdateNote from "./pages/UpdateNote";
import UpdateTask from "./pages/UpdateTask";
import Folders from "./pages/Folders";
import UpdateFolder from "./pages/UpdateFolder";
import Projects from "./pages/Projects";
import UpdateProject from "./pages/UpdateProject";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Folder from "./pages/Folder";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

export default function App(): ReactNode {
	return (
		<>
			<Header />
			<Sidebar />
			<section className={`flex pb-4 pr-8 pl-[100px] text-white`}>
				<div className="flex w-full">
					<Routes>
						<Route path="/" element={<Home />}>
							<Route path="new-task" element={<NewTask />} />
							<Route path="new-note" element={<NewNote />} />
							<Route path="new-project" element={<NewProject />} />
							<Route path="new-folder" element={<NewFolder />} />
							<Route path="update-note/:id" element={<UpdateNote />} />
							<Route path="update-task/:id" element={<UpdateTask />} />
						</Route>
						<Route path="/folders/" element={<Folders />}>
							<Route path="new-folder" element={<NewFolder />} />
							<Route path="update-folder/:id" element={<UpdateFolder />} />
						</Route>
						<Route path="/projects/" element={<Projects />}>
							<Route path="new-project" element={<NewProject />} />
							<Route path="update-project/:id" element={<UpdateProject />} />
						</Route>
						<Route path="/tasks/" element={<Tasks />}>
							<Route path="new-task" element={<NewTask />} />
							<Route path="update-task/:id" element={<UpdateTask />} />
						</Route>
						<Route path="/notes/" element={<Notes />}>
							<Route path="new-note" element={<NewNote />} />
							<Route path="update-note/:id" element={<UpdateNote />} />
						</Route>

						<Route path="/folders/:folder_id" element={<Folder />}>
							<Route path="update/:id" element={<UpdateFolder />} />
							<Route path="new-project" element={<NewProject />} />
							<Route path="update-project/:id" element={<UpdateProject />} />
							<Route path="new-task" element={<NewTask />} />
							<Route path="update-task/:id" element={<UpdateTask />} />
							<Route path="new-note" element={<NewNote />} />
							<Route path="update-note/:id" element={<UpdateNote />} />
						</Route>

						<Route path="/projects/:project_id" element={<Project />}>
							<Route path="update/:id" element={<UpdateProject />} />
							<Route path="new-task" element={<NewTask />} />
							<Route path="update-task/:id" element={<UpdateTask />} />
							<Route path="new-note" element={<NewNote />} />
							<Route path="update-note/:id" element={<UpdateNote />} />
						</Route>

						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</section>
		</>
	);
}
