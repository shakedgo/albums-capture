import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { Submit } from "./ServerCalls";

export default function Login() {
	const { user, setUser } = useContext(UserContext);

	return (
		<>
			<form
				onSubmit={async (e) => {
					let response = await Submit(e, "/login");
					if (response) setUser(response);
				}}
				id="registerForm"
			>
				<label htmlFor="username">Username:</label>
				<br />
				<input type="text" id="username" name="username" />
				<br />

				<label htmlFor="password">Password:</label>
				<br />
				<input type="password" id="password" name="password" />
				<br />
				<br />
			</form>

			<button className="btns" type="submit" value="Submit" form="registerForm">
				Submit
			</button>
			<br />
			<Link to="/profile/shaked">profile</Link>
			<br />
			{user}
		</>
	);
}
