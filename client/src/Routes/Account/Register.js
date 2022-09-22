import React from "react";
import { Submit } from "./ServerCalls";

export default function Register() {
	return (
		<>
			<form onSubmit={(e) => Submit(e, "/register")} id="registerForm">
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
		</>
	);
}
