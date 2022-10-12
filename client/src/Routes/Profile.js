import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
	const { name } = useParams();
	const [user, setUser] = useState();
	useEffect(() => {
		const user = async () => await axios.post("/verify"); // Server should verify that a user is logged in with cookie;
		user();
		setUser(user.data);
	}, []);

	// const { user } = useContext(UserContext);
	return (
		<>
			<div>{name}</div>
			<div>{user ? <div>{user.username}</div> : <div>Not logged</div>}</div>
		</>
	);
}
