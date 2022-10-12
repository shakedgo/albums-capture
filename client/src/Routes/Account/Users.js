import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
	const [users, setUsers] = useState();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const res = await axios.get("/users", {
					signal: controller.signal,
				});
				console.log(res.data);
				if (isMounted) setUsers(res.data);
			} catch (err) {}
		};
		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<>
			<h1>Users</h1>
			{users ? (
				<ul>
					{users.map((user, i) => (
						<li key={i}>{user?.username}</li>
					))}
				</ul>
			) : (
				<p>No users to display</p>
			)}
		</>
	);
}
