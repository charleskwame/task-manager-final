import React from "react";
import { useState } from "react";
import Login from "./login";
import Register from "./Register";
import { Link } from "react-router";
import video from "../assets/carsetbackgroundvideo.mp4";

function Home() {
	return (
		<>
			<video
				playsInline={true}
				autoPlay={true}
				muted={true}
				loop={true}
				className="absolute left-0 top-0 w-full h-full object-cover -z-10"
			>
				<source src={video} type="video/mp4" />
			</video>
			{/* <div>
			</div> */}
			<div className="absolute -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-max top-1/2 left-1/2">
				<h1 className="px-10 text-3xl font-extrabold text-center lg:text-5xl text-violet-500 lg:px-0">
					CarSet – Luxury Car Rental Platform
				</h1>

				<div className="flex justify-center gap-5 mt-5">
					<button className="px-3 py-2 font-semibold transition-all duration-500 ease-in-out lg:px-5 border-1 border-violet-500 hover:bg-violet-200 hover:text-violet-500 text-white bg-violet-500 rounded-md">
						<Link to="/login">Log In</Link>
					</button>
					<button className="px-3 py-2 font-semibold transition-all duration-500 ease-in-out lg:px-5 border-1 border-violet-500 hover:bg-violet-200 hover:text-violet-500 text-white bg-violet-500 rounded-md">
						<Link to="/register">Register</Link>
					</button>
				</div>
			</div>
		</>
	);
}

export default Home;
