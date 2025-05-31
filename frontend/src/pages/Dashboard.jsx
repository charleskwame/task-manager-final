/* eslint-disable no-unused-vars */
import { useState, useContext, useRef, useEffect } from "react";
import { TaskContexts } from "../context/context";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

function Dashboard() {
	const { taskData, updateTaskStatus, deleteTask, updateTaskDetails, addNewTask } =
		useContext(TaskContexts);

	const [filterCategory, setFilterCategory] = useState("all");
	const [filtered, setFiltered] = useState(false);
	const [filteredByCategory, setFilteredByCategory] = useState(false);
	const [filterPriority, setFilterPriority] = useState("all");
	const editDialogRef = useRef(null);
	const [isTaskBeingEdited, setIsTaskBeingEdited] = useState(false);
	const [editedTask, setEditedTask] = useState(null);
	const [currentEditedTask, setCurrentEditedTask] = useState({});
	const addNewTaskDialogRef = useRef(null);
	const [addNewTaskDialog, setAddNewTaskDialog] = useState(false);
	const [newTask, setNewTask] = useState({
		task: "",
		name: "",
		category: "",
		priority: "",
		status: "Pending",
		dueDate: "",
	});
	const [disableEditAndDeleteButtons, setDisableEditAndDeleteButtons] = useState({});
	const navigate = useNavigate();

	// filtering tasks by category
	const filteredTask =
		filterCategory === "all" && filterPriority === "all"
			? taskData
			: taskData.filter((task) => {
					if (filterCategory !== "all" && filterPriority !== "all") {
						return task.category === filterCategory && task.priority === filterPriority;
					} else if (filterPriority !== "all") {
						return task.priority === filterPriority;
					} else if (task.category !== "all") {
						return task.category === filterCategory;
					} else {
						return true;
					}
			  });

	// editing task
	const handleEditedTaskDetails = (e) => {
		const { name, value } = e.target;
		setEditedTask((prev) => ({ ...prev, [name]: value }));
	};

	// saving edited task
	const saveNewEditedTask = (e) => {
		e.preventDefault();
		updateTaskDetails(editedTask.id, editedTask);
		setIsTaskBeingEdited(false);
		toast.success("Task Edited Successfully");
	};

	// creating new task object
	const handleNewTaskDetails = (e) => {
		const { name, value } = e.target;
		setNewTask((prev) => ({ ...prev, [name]: value }));
	};

	// adding new task to the list
	const handleAddNewTask = (e) => {
		e.preventDefault();
		addNewTask(newTask);
		setNewTask({ task: "", name: "", category: "", priority: "", status: "Pending", dueDate: "" });
		setAddNewTaskDialog(false);
		toast.success("New Task Added Successfully");
	};

	// opening and closing dialog to edit
	const openEditDialog = () => editDialogRef.current.showModal();
	const closeEditDialog = () => editDialogRef.current.close();
	// opening and closing dialog to add new
	const openAddNewTaskDialogBox = () => addNewTaskDialogRef.current.showModal();
	const closeAddNewTaskDialogBox = () => addNewTaskDialogRef.current.close();

	useEffect(() => {
		if (isTaskBeingEdited && editedTask) {
			openEditDialog();
		}
	}, [isTaskBeingEdited, editedTask]);

	useEffect(() => {
		if (addNewTaskDialog) {
			openAddNewTaskDialogBox();
		}
	}, [addNewTaskDialog]);

	// watching and updating state of add new task if the escape key is pressed to prevent removal from dom tree
	useEffect(() => {
		const escKeyPressed = (e) => {
			if (e.key === "Escape") {
				addNewTaskDialogRef.current.close();
				setAddNewTaskDialog(false);
			}
		};
		window.addEventListener("keydown", escKeyPressed);
		return () => window.removeEventListener("keydown", escKeyPressed);
	});

	const logOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		localStorage.removeItem("userId");
		navigate("/register");
	};

	return (
		<div className="text-sm">
			<div>
				<Toaster />
			</div>
			{/* displaying modal when editing */}
			{isTaskBeingEdited && currentEditedTask ? (
				<dialog
					ref={editDialogRef}
					className="absolute w-[90%] p-2 lg:w-1/2 lg:p-5 -translate-x-1/2 -translate-y-1/2 rounded-md border-1 border-violet-200 top-1/2 left-1/2"
				>
					<form onSubmit={saveNewEditedTask} className="grid w-full gap-4 text-gray-800">
						<div className="flex flex-col gap-2">
							<label htmlFor="task">Edit Task Title</label>
							<input
								type="text"
								name="task"
								value={editedTask?.task || ""}
								onChange={handleEditedTaskDetails}
								className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
							/>
						</div>
						<div className="flex gap-4">
							<div className="flex flex-col flex-1 gap-2">
								<label htmlFor="name">Edit Name</label>
								<input
									type="text"
									name="name"
									value={editedTask?.name || ""}
									onChange={handleEditedTaskDetails}
									className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
								/>
							</div>
							<div className="flex flex-col flex-1 gap-2">
								<label htmlFor="category">Edit Category</label>
								<select
									name="category"
									value={editedTask?.category || ""}
									onChange={handleEditedTaskDetails}
									className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
								>
									<option value="Onboarding">Onboarding</option>
									<option value="Maintenance">Maintenance</option>
									<option value="Verifying rental">Verifying Rental</option>
								</select>
							</div>
						</div>
						<div className="flex gap-4">
							<div className="flex flex-col flex-1 gap-2">
								<label htmlFor="priority">Edit Priority</label>
								<select
									name="priority"
									id=""
									onChange={handleEditedTaskDetails}
									className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
								>
									<option value="Low">Low Priority</option>
									<option value="Medium">Medium Priority</option>
									<option value="High">High Priority</option>
								</select>
							</div>
							<div className="flex flex-col flex-1 gap-2">
								<label htmlFor="status">Edit Status</label>
								<select
									name="status"
									id=""
									onChange={handleEditedTaskDetails}
									className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
								>
									<option value="Pending">Pending</option>
									<option value="Completed">Completed</option>
								</select>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="dueDate">Edit Due Date</label>
							<input
								type="text"
								name="dueDate"
								value={editedTask?.dueDate || ""}
								onChange={handleEditedTaskDetails}
								className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
							/>
						</div>
						<button
							type="submit"
							className="px-4 py-2 mt-2 mb-4 font-semibold text-white transition-all duration-300 rounded-md bg-violet-500 hover:bg-white hover:text-violet-500 border-1 border-violet-500"
						>
							Save Changes
						</button>
					</form>
					<button
						onClick={() => {
							setIsTaskBeingEdited(false);
							closeEditDialog();
						}}
						className="px-5 py-2 font-medium text-red-500 duration-500 ease-in-out border-red-200 rounded-md border-1 hover:bg-red-500 hover:text-white transtion-all"
					>
						Close
					</button>
				</dialog>
			) : null}
			{/* displaying modal when adding new dialog */}
			{addNewTaskDialog ? (
				<dialog
					className="absolute w-[90%] p-2 lg:w-1/2 lg:p-5 -translate-x-1/2 -translate-y-1/2 rounded-md border-1 border-violet-200 top-1/2 left-1/2"
					ref={addNewTaskDialogRef}
				>
					<form onSubmit={handleAddNewTask} className="grid w-full gap-4 text-gray-800">
						<div className="flex flex-col gap-2">
							<label htmlFor="task">Task Title</label>
							<input
								type="text"
								name="task"
								value={newTask.task}
								onChange={handleNewTaskDetails}
								required={true}
								className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
								placeholder="Task Title"
							/>
						</div>
						<div className="flex gap-4">
							<div className="flex flex-col flex-1 gap-2">
								<label htmlFor="name">Client name</label>
								<input
									type="text"
									name="name"
									value={newTask.name}
									onChange={handleNewTaskDetails}
									required={true}
									placeholder="Kwame"
									className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
								/>
							</div>
							<div className="flex flex-col flex-1 gap-2">
								<label htmlFor="category">Category</label>
								<select
									required={true}
									name="category"
									value={newTask.category}
									onChange={handleNewTaskDetails}
									className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
								>
									<option value="">Not Set</option>
									<option value="Onboarding">Onboarding</option>
									<option value="Maintenance">Maintenance</option>
									<option value="Verifying rental">Verifying Rental</option>
								</select>
							</div>
						</div>
						<div className="flex gap-4">
							<div className="flex flex-col flex-1 gap-2">
								<label htmlFor="priority">Priority</label>
								<select
									required={true}
									name="priority"
									id=""
									onChange={handleNewTaskDetails}
									className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
								>
									<option value="">Not Set</option>
									<option value="Low">Low Priority</option>
									<option value="Medium">Medium Priority</option>
									<option value="High">High Priority</option>
								</select>
							</div>
							<div className="flex flex-col flex-1 gap-2">
								<label htmlFor="status">Status</label>
								<select
									required={true}
									name="status"
									id=""
									onChange={handleNewTaskDetails}
									className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
								>
									<option value="">Not Set</option>
									<option value="Pending">Pending</option>
									<option value="Completed">Completed</option>
								</select>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="dueDate">Due Date</label>
							<input
								type="text"
								name="dueDate"
								value={newTask.dueDate}
								onChange={handleNewTaskDetails}
								required={true}
								placeholder="yyyy-mm-dd"
								className="flex-1 px-2 py-2 rounded-md border-1 grow border-violet-200 text-violet-500"
							/>
						</div>

						<button
							type="submit"
							className="px-4 py-2 mt-2 font-semibold text-white transition-all duration-300 rounded-md bg-violet-500 hover:bg-white hover:text-violet-500 border-1 border-violet-500"
						>
							Save New Task
						</button>
					</form>
					<button
						onClick={() => {
							setAddNewTaskDialog(false);
							closeAddNewTaskDialogBox();
						}}
						className="px-4 py-2 mt-4 font-medium text-red-500 transition-all duration-300 border-red-200 rounded-md border-1 hover:bg-red-500 hover:text-white"
					>
						Close
					</button>
				</dialog>
			) : null}
			<div className="sticky top-0 flex items-center justify-between py-2 bg-white px-1.5 border-1 border-violet-200">
				<h1 className="font-bold lg:text-xl text-violet-500">CarSet – Luxury Car Rental Platform</h1>
				<div className="flex items-center gap-5">
					<button
						className="px-2 py-1 font-semibold text-white transition-all duration-500 ease-in-out rounded-md cursor-pointer lg:px-4 lg:py-2 border-1 bg-violet-500 hover:text-violet-500 hover:bg-white"
						onClick={() => {
							setAddNewTaskDialog(true);
						}}
					>
						Add New
					</button>

					<button
						className="px-2 py-1 font-semibold text-white transition-all duration-500 ease-in-out rounded-md cursor-pointer lg:px-4 lg:py-2 border-1 bg-red-500 hover:text-red-500 hover:bg-white"
						onClick={() => {
							logOut();
						}}
					>
						Log Out
					</button>
				</div>
			</div>
			<div className="flex flex-col items-center gap-2 py-4 font-medium lg:gap-4 lg:flex-row lg:justify-center text-violet-500">
				{/* category filter */}
				<label htmlFor="categories">Filter By:</label>
				<div className="flex items-center gap-2 lg:gap-4">
					<select
						name="categories"
						id=""
						onChange={(e) => {
							setFilterCategory(e.target.value), setFiltered(true), setFilteredByCategory(true);
						}}
						className="px-4 py-1 rounded-md shadow-sm border-1"
					>
						<option value="all">All Categories</option>
						<option value="Onboarding">Onboarding</option>
						<option value="Maintenance">Maintenance</option>
						<option value="Verifying rental">Verifying Rental</option>
					</select>
					{/* priority filter */}
					<p>-or-</p>
					<select
						name="priority"
						id=""
						onChange={(e) => {
							setFilterPriority(e.target.value), setFiltered(true);
						}}
						className="px-4 py-1 rounded-md shadow-sm border-1"
					>
						<option value="all">All Priorities</option>
						<option value="Low">Low Priority</option>
						<option value="Medium">Medium Priority</option>
						<option value="High">High Priority</option>
					</select>
				</div>
			</div>
			<ul className={filteredTask.length === 0 ? null : "grid lg:grid-cols-3 gap-1.5 px-1.5"}>
				{filtered ? (
					filteredTask.length === 0 ? (
						<h1 className="block text-lg font-bold text-center text-violet-500">
							No Tasks Match The Selected Filters
						</h1>
					) : (
						filteredTask.map((task) => {
							return (
								<li
									className={
										task.status === "Completed"
											? `line-through border-1 shadow-sm rounded-md border-gray-200 bg-gray-200 p-3 text-sm grid gap-2 text-gray-500`
											: `decoration-0 border-1 shadow-sm rounded-md border-violet-200 p-3 text-sm grid gap-2`
									}
								>
									<h1 className="font-bold text-violet-500">Title: {task.task}</h1>
									<div className="flex justify-between">
										<div className="grid justify-between font-semibold text-gray-800">
											<h3 className="">Customer: {task.name}</h3>
											<h3>Priority: {task.priority}</h3>
											<h4>Date created: {task.createdAt}</h4>
										</div>
										<div className="grid justify-between font-semibold text-gray-800">
											<h3 className="">Category: {task.category}</h3>
											<h3>Status: {task.status}</h3>
											<h3>Date due: {task.dueDate}</h3>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<button
											disabled={!!disableEditAndDeleteButtons[task.id] || task.status === "Completed"}
											className={
												disableEditAndDeleteButtons[task.id] || task.status === "Completed"
													? "px-3 py-1 text-gray-500 duration-500 ease-in-out border-gray-200 rounded-md border-1"
													: "px-3 py-1 text-white duration-500 ease-in-out bg-green-500 border-green-200 rounded-md cursor-pointer border-1 hover:bg-white hover:text-green-500 transtion-all"
											}
											onClick={() => {
												updateTaskStatus(task.id);
												setDisableEditAndDeleteButtons((prev) => ({
													...prev,
													[task.id]: true,
												}));
												toast.success("Task Completed Successfully");
											}}
										>
											Mark Complete
										</button>
										<button
											disabled={!!disableEditAndDeleteButtons[task.id] || task.status === "Completed"}
											className={
												disableEditAndDeleteButtons[task.id] || task.status === "Completed"
													? "px-3 py-1 text-gray-500 duration-500 ease-in-out border-gray-200 rounded-md border-1"
													: "px-3 py-1 text-white duration-500 ease-in-out bg-yellow-500 border-yellow-200 rounded-md cursor-pointer border-1 hover:bg-white hover:text-yellow-500 transtion-all"
											}
											onClick={() => {
												setIsTaskBeingEdited(true);
												setCurrentEditedTask(true);
												setEditedTask({ ...task });
												// openEditDialog();
											}}
										>
											Edit Task
										</button>
										<button
											disabled={!!disableEditAndDeleteButtons[task.id] || task.status === "Completed"}
											className={
												disableEditAndDeleteButtons[task.id] || task.status === "Completed"
													? "px-3 py-1 text-gray-500 duration-500 ease-in-out border-gray-200 rounded-md border-1"
													: "px-3 py-1 text-white duration-500 ease-in-out bg-red-500 border-red-200 rounded-md cursor-pointer border-1 hover:bg-white hover:text-red-500 transtion-all"
											}
											onClick={() => {
												deleteTask(task.id);
												toast.success("Task Deleted Successfully");
											}}
										>
											Delete Task
										</button>
									</div>
								</li>
							);
						})
					)
				) : (
					taskData.map((task) => {
						return (
							<li
								className={
									task.status === "Completed"
										? `line-through border-1 shadow-sm rounded-md border-gray-200 bg-gray-200 p-3 text-sm grid gap-2 text-gray-500`
										: `decoration-0 border-1 shadow-sm rounded-md border-violet-200 p-3 text-sm grid gap-2`
								}
							>
								<h1 className="font-bold text-violet-500">Title: {task.task}</h1>
								<div className="flex justify-between">
									<div className="grid justify-between font-semibold text-gray-800">
										<h3 className="">Customer: {task.name}</h3>
										<h3>Priority: {task.priority}</h3>
										<h4>Date created: {task.createdAt}</h4>
									</div>
									<div className="grid justify-between font-semibold text-gray-800">
										<h3 className="">Category: {task.category}</h3>
										<h3>Status: {task.status}</h3>
										<h3>Date due: {task.dueDate}</h3>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<button
										disabled={!!disableEditAndDeleteButtons[task.id] || task.status === "Completed"}
										className={
											disableEditAndDeleteButtons[task.id] || task.status === "Completed"
												? "px-3 py-1 text-gray-500 duration-500 ease-in-out border-gray-200 rounded-md border-1"
												: "px-3 py-1 text-white duration-500 ease-in-out bg-green-500 border-green-200 rounded-md cursor-pointer border-1 hover:bg-white hover:text-green-500 transtion-all"
										}
										onClick={() => {
											updateTaskStatus(task.id);
											setDisableEditAndDeleteButtons((prev) => ({
												...prev,
												[task.id]: true,
											}));
											toast.success("Task Completed Successfully");
										}}
									>
										Mark Complete
									</button>
									<button
										disabled={!!disableEditAndDeleteButtons[task.id] || task.status === "Completed"}
										className={
											disableEditAndDeleteButtons[task.id] || task.status === "Completed"
												? "px-3 py-1 text-gray-500 duration-500 ease-in-out border-gray-200 rounded-md border-1"
												: "px-3 py-1 text-white duration-500 ease-in-out bg-yellow-500 border-yellow-200 rounded-md cursor-pointer border-1 hover:bg-white hover:text-yellow-500 transtion-all"
										}
										onClick={() => {
											setIsTaskBeingEdited(true);
											setCurrentEditedTask(true);
											setEditedTask({ ...task });
											// openEditDialog();
										}}
									>
										Edit Task
									</button>
									<button
										disabled={!!disableEditAndDeleteButtons[task.id] || task.status === "Completed"}
										className={
											disableEditAndDeleteButtons[task.id] || task.status === "Completed"
												? "px-3 py-1 text-gray-500 duration-500 ease-in-out border-gray-200 rounded-md border-1"
												: "px-3 py-1 text-white duration-500 ease-in-out bg-red-500 border-red-200 rounded-md cursor-pointer border-1 hover:bg-white hover:text-red-500 transtion-all"
										}
										onClick={() => {
											deleteTask(task.id);
											toast.success("Task Deleted Successfully");
										}}
									>
										Delete Task
									</button>
								</div>
							</li>
						);
					})
				)}
			</ul>
		</div>
	);
}

export default Dashboard;
