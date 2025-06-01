import React from "react";
import { Link } from "react-router";

function NotFound() {
	return (
		<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-bold flex flex-col items-center gap-4">
			<p className="text-2xl text-violet-500">Page Not Found (Destination Url Does Not Exist)</p>
			<Link to="/login" className="w-fit">
				<button className=" bg-violet-300 text-violet-500 hover:text-white font-semibold hover:bg-violet-500 border-1 border-violet-500 transion-all ease-in-out duration-500 rounded-md px-3 py-2 cursor-pointer">
					Back To Log In
				</button>
			</Link>
		</div>
	);
}

export default NotFound;
