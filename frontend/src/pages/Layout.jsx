import { Outlet, Link } from "react-router";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";

import React from "react";

function Layout() {
	return (
		<>
			{/* rendering routes */}
			<Outlet />
		</>
	);
}

export default Layout;
