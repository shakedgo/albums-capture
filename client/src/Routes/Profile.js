import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Profile() {
	const { name } = useParams();
	const { user } = useContext(UserContext);
	return (
		<>
			<div>{name}</div>
			<div>{user}</div>
		</>
	);
}
