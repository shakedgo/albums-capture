import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Routes/Main";
import Profile from "./Routes/Profile";
import Login from "./Routes/Account/Login";
import Register from "./Routes/Account/Register";
import AlbumsSearch from "./Routes/AlbumsSearch";
import { UserContext } from "./UserContext";

export default function App() {
	const [user, setUser] = useState("default");

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="profile">
						<Route path=":name" element={<Profile />} />
					</Route>
					<Route path="login" element={<Login />}></Route>
					<Route path="register" element={<Register />}></Route>

					<Route path="albums" element={<AlbumsSearch />}></Route>
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
	);
}
