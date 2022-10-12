// import React, { useContext } from "react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { UserContext } from "../UserContext";
import axios from "axios";

export default function Profile() {
	const { name } = useParams();
	const [user, setUser] = useState();
	useEffect(() => {
		const user = async () => await axios.post("/verify"); // should check the cookie and send the right user that is logged in
		user();
		console.log(user.data);
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
