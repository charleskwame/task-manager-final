import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import { TaskContentsProvider } from "./context/context";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./pages/Dashboard";
import "./pages/Register";
import "./pages/Layout";
import "./pages/Home";
import "./context/context";

function App() {
	return (
		<>
			<TaskContentsProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</Router>
			</TaskContentsProvider>
		</>
	);
}
export default App;
