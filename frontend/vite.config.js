import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
// 	plugins: [react(), tailwindcss()],
// });

export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		rollupOptions: {
			// Ensure all necessary files are included
			input: {
				main: "index.html",
				// Add other entry points if needed
				register: "./src/pages/Register.jsx",
				login: "./src/pages/Login.jsx",
				dashboard: "./src/pages/Dashboard.jsx",
				context: "./src/context/context.jsx",
			},
		},
	},
});
