/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

// creating the context for global state managment
export const TaskContexts = createContext();

export const TaskContentsProvider = ({ children }) => {
	// setting up common states for tasks
	const [loadingData, setLoadingData] = useState(true);
	const [errorLoadingData, setErrorLoadingData] = useState(null);
	const [taskData, setTaskData] = useState([]);
	const [priority, setPriority] = useState(null);
	const [status, setStatus] = useState(null);
	const [isAuthorized, setIsAuthorized] = useState(false);

	// fetching tasks
	useEffect(() => {
		axios
			.get("https://6838c48a6561b8d882ae2c31.mockapi.io/api/v1/tasks")
			.then((response) => {
				setTaskData(response.data);
				setLoadingData(false);
			})
			.catch((err) => {
				setErrorLoadingData(err.message);
				setLoadingData(false);
			});
	}, []);

	if (loadingData)
		return (
			<div className="absolute -translate-x-1/2 -translate-y-1/2 loader top-1/2 left-1/2 bg-violet-500"></div>
		);
	if (errorLoadingData)
		return (
			<div className="absolute font-bold text-red-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
				Error! Unable to fetch data. Please try again later.
			</div>
		);

	// methods to change states of tasks to be updated
	const updatePriority = (newPriority) => {
		setPriority(newPriority);
	};

	const updateTaskStatus = (id) => {
		setTaskData(
			taskData.map((task) =>
				task.id === id
					? {
							...task,
							status: "Completed",
					  }
					: task,
			),
		);
	};

	const deleteTask = (id) => {
		setTaskData(taskData.filter((task) => task.id !== id));
	};

	const updateTaskDetails = (id, newDetails) => {
		setTaskData(taskData.map((task) => (task.id === id ? { ...task, ...newDetails } : task)));
	};

	const addNewTask = (newTask) => {
		setTaskData((prev) => [
			...prev,
			{
				...newTask,
				id: Math.round(Math.random() * Math.random()),
				createdAt: new Date().toISOString().match(/^\d{4}-\d{2}-\d{2}/)[0],
			},
		]);
	};

	return (
		<TaskContexts.Provider
			value={{
				taskData,
				setTaskData,
				priority,
				setPriority,
				updatePriority,
				status,
				setStatus,
				updateTaskStatus,
				deleteTask,
				updateTaskDetails,
				addNewTask,
				isAuthorized,
				setIsAuthorized,
			}}
		>
			{children}
		</TaskContexts.Provider>
	);
};
