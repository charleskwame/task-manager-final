import { Outlet, Link } from "react-router";

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
