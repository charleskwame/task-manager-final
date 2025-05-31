/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// import express from "";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// import cors from "cors";

// Create an Express application
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");

// Middleware setup
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// In-memory array to act as a mock database for users
const users = [];

// Registration endpoint
app.post("/register", async (req, res) => {
	// removing the last user from the array to allow for multiple user registrations
	// not ideal but a temporary solution for the demonstration
	// users.pop();
	// trying to register the user
	try {
		const { username, password } = req.body;

		// Checking if the username already exists in the users array
		const existingUser = users.find((user) => user.username === username);
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hashing the user's password for secure storage
		const hashedPassword = await bcrypt.hash(password, 10);

		// Creating a new user object
		const user = {
			// Generating a simple unique ID using the date
			id: Date.now().toString(),
			username,
			password: hashedPassword,
		};
		// Adding the new user to the users array
		users.push(user);

		// Generating a JWT token for the new user
		const token = jwt.sign(
			// Payload to be sent for storage
			{ userId: user.id, username: user.username },
			// Secret key from environment variables
			process.env.JWT_SECRET,
			// Token expiration time
			{ expiresIn: "15m" },
		);

		// Respond with the token and user info
		res.status(201).json({
			token,
			userId: user.id,
			username: user.username,
		});
	} catch (error) {
		// Handle errors during registration
		res.status(500).json({ message: "Registration failed" });
	}
});

// log in endpoint
app.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Checking if the username already exists in the users array
		const existingUser = users.find((user) => user.username === username);
		if (!existingUser) {
			return res.status(400).json({ message: "No registered user found" });
		}

		// checking if password is correct
		const existingPassword = await bcrypt.compare(password, existingUser.password);
		if (!existingPassword) {
			return res.status(400).json({ message: "Check your username and password" });
		}

		// Generating a JWT token for the new user
		const token = jwt.sign(
			// Payload to be sent for storage
			{ userId: existingUser.id, username: existingUser.username },
			// Secret key from environment variables
			process.env.JWT_SECRET,
			// Token expiration time
			{ expiresIn: "15m" },
		);

		// Respond with the token and user info
		res.status(201).json({
			token,
			userId: existingUser.id,
			username: existingUser.username,
			message: "Log in successful",
		});
	} catch (error) {
		// Handle errors during registration
		res.status(500).json({ message: "log in failed" });
	}
});

// Starting the server and listen on the specified port
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

app.use("/", (req, res) => {
	res.send("Server is running");
});
