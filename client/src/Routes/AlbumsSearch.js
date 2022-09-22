import React, { useEffect, useState } from "react";
const axios = require("axios");

export default function AlbumsSearch() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchRes, setSearchRes] = useState([]);

	useEffect(() => {
		const search = async () =>
			// await axios.post("/albums", { search: searchTerm }).then((res) => setSearchRes(res.data));
			await axios.post("/albums-test", { search: searchTerm }).then((res) => setSearchRes(res.data));
		if (searchTerm !== undefined) {
			const timeoutId = setTimeout(() => {
				if (searchTerm) {
					search();
				}
			}, 300);

			return () => clearTimeout(timeoutId);
		}
	}, [searchTerm]);
	console.log(searchRes);

	return (
		<>
			{searchRes !== undefined ? (
				<>
					<input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
					<div>
						{searchRes.map((item) => (
							<img
								key={item.id}
								src={item.image}
								height={item.imageH}
								width={item.imageW}
								alt={item.name}
							/>
						))}
					</div>
				</>
			) : (
				<input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			)}
		</>
	);
}
