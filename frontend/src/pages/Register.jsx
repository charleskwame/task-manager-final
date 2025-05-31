/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { TaskContexts } from "../context/context";
import { useContext } from "react";

function Register() {
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

		// checking if the form is not empty
		if (formData.userName && formData.password !== "") {
			setError("");
			setIsLoading(true);
			try {
				// creating a post request to the node js server
				const response = await axios.post(
					"https://task-manager-server-ivory-five.vercel.app/register",
					{
						username: formData.userName,
						password: formData.password,
					},
				);

				// storing data in localStorage
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("userId", response.data.userId);
				localStorage.setItem("username", response.data.username);

				// Set authentication header for jwt token
				axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

				// notifying the user of a successful registration
				toast.success("Registration Success");
				navigate("/login");
			} catch (error) {
				// notifying user of an error
				setError(error.response?.data?.message || "Registration failed. Please try again.");
				toast.error("Registration Failed. Please try again");
			} finally {
				setIsLoading(false);
			}
		} else {
			// notifying the user of empty fields
			toast.error("Username or Password not set!");
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
						className="border-1 border-violet-200 rounded-md lg:rounded-l-md lg:absolute lg:top-0 lg:right-0 flex flex-col px-3 py-3 lg:py-0 lg:px-5 place-content-center lg:w-[40%] lg:h-screen bg-white shadow-md gap-2"
						onSubmit={handleSubmit}
					>
						<h1 className="text-2xl font-bold text-violet-500">Register a new user</h1>
						<label htmlFor="userName" className="block text-violet-500 font-medium text-sm">
							Username
						</label>
						<input
							type="text"
							name="userName"
							value={formData?.userName || ""}
							onChange={handleFormData}
							minLength={5}
							maxLength={30}
							className="w-full px-3 py-2 border border-violet-200 rounded focus:outline-none focus:ring-2 focus:ring-violet-200 text-violet-500"
						/>
						<label htmlFor="password" className="block text-violet-500 font-medium text-sm">
							Password
						</label>
						<input
							type="text"
							name="password"
							value={formData?.password || ""}
							onChange={handleFormData}
							minLength={8}
							maxLength={30}
							className="w-full px-3 py-2 border border-violet-200 rounded focus:outline-none focus:ring-2 focus:ring-violet-200 text-violet-500"
						/>
						<input
							type="submit"
							value={isLoading ? "Registering..." : "Register"}
							className="w-full bg-violet-500 text-white font-bold py-2 rounded-md hover:bg-violet-300 transition-all ease-in-out duration-500 cursor-pointer border-1 border-violet-500"
						/>
						<div className="grid gap-3">
							<p className="text-sm text-violet-500">Already registed?</p>
							<Link to="/login" className="w-fit">
								<button className=" bg-violet-300 text-white font-semibold hover:bg-violet-500 border-1 border-violet-500 transion-all ease-in-out duration-500 rounded-md px-6 py-2 cursor-pointer">
									Log In
								</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Register;
