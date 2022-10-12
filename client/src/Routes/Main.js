import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
	return (
		<div>
			<h1>Main Page</h1>
			<Link to="/login">Login</Link>
			<br />
			<Link to="/register">Register</Link>
			<br />
			<Link to="/users">Users</Link>
		</div>
	);
}
