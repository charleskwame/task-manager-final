/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { TaskContexts } from "../context/context";

function Login() {
	const { setIsAuthorized } = useContext(TaskContexts);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		userName: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleFormData = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (formData.userName && formData.password !== "") {
			try {
				const response = await axios.post("https://task-manager-server-ivory-five.vercel.app/login", {
					username: formData.userName,
					password: formData.password,
				});

				// storing user token and id
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("userId", response.data.userId);
				localStorage.setItem("username", response.data.username);

				// Set auth header
				axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

				toast.success("Log in success");
				setIsAuthorized(true);
				navigate("/dashboard");
			} catch (error) {
				setError(error.response?.data?.message || "Log in failed. Please try again.");
				toast.error("Check your username and password or Register if you don't have an account");
			} finally {
				setIsLoading(false);
			}
		} else {
			toast.error("Username or Password is empty");
		}
	};
	return (
		<>
			<Toaster />
			<div className="bg-[url(./assets/carsetbackground.jpg)] lg:bg-none bg-no-repeat bg-center h-screen">
				<div className="lg:gap-0 lg:px-0 lg:flex lg:items-center lg:flex-row absolute top-1/2 left-1/2 lg:left-0 -translate-x-1/2 lg:-translate-x-0 -translate-y-1/2 lg:-translate-y-0 lg:static lg:top-0 w-screen px-5 grid gap-5">
					<div className="lg:w-[60%] lg:h-screen lg:bg-[url(./assets/carsetbackground.jpg)] bg-no-repeat bg-cover">
						<h1 className="text-3xl text-center lg:text-5xl text-violet-500 font-bold  lg:relative lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
							Safe . Affordable . Luxury
						</h1>
						<p className="text-center font-semibold text-violet-300 lg:relative lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
							Delivered with a smile.
						</p>
					</div>
					<form
						className="border-1 border-violet-200 rounded-md lg:rounded-l-md lg:absolute lg:top-0 lg:right-0 flex flex-col px-3 py-3 lg:py-0 lg:px-5 place-content-center lg:w-[40%] lg:h-screen bg-[#f8f8ff] shadow-md gap-2"
						onSubmit={handleSubmit}
					>
						<h1 className="text-2xl font-bold text-violet-500">Welcome back (Log In)</h1>
						<label htmlFor="userName" className="block text-violet-500 font-medium text-sm">
							Username
						</label>
						<input
							type="text"
							name="userName"
							onChange={handleFormData}
							value={formData?.userName || ""}
							minLength={5}
							maxLength={30}
							className="w-full px-3 py-2 border border-violet-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-200 text-violet-500"
						/>
						<label htmlFor="password" className="block text-violet-500 font-medium text-sm">
							Password
						</label>
						<input
							type="text"
							name="password"
							onChange={handleFormData}
							value={formData?.password || ""}
							minLength={8}
							maxLength={30}
							className="w-full px-3 py-2 border border-violet-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-200 text-violet-500"
						/>
						<input
							type="submit"
							value={isLoading ? "Logging in..." : "Log in"}
							className="w-full bg-violet-500 text-white font-bold py-2 rounded-md hover:bg-violet-300 transition-all ease-in-out duration-500 cursor-pointer border-1 border-violet-500 hover:text-violet-500"
						/>
						<div className="grid gap-3">
							<p className="text-sm text-violet-500">Don't have an account?</p>
							<Link to="/register" className="w-fit">
								<button className=" bg-violet-300 text-violet-500 hover:text-white font-semibold hover:bg-violet-500 border-1 border-violet-500 transion-all ease-in-out duration-500 rounded-md px-6 py-2 cursor-pointer">
									Register
								</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
