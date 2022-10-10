const express = require("express");
const cors = require("cors");
const client = require("./data");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

app.get("/api", (_req, res) => {
	res.json({ username: "shakedgo" });
});

app.get("/users", (_req, res) => {
	client.query("SELECT * FROM users;", (err, response) => {
		if (err) throw err;
		res.status(200).json(response.rows);
	});
});

app.post("/login", (req, res) => {
	let username = req.body.vals[0];
	let password = req.body.vals[1];
	if (!format.test(String(username)) && !format.test(String(password))) {
		client.query(
			`SELECT * FROM users
			WHERE username='${String(username)}';`,
			async (err, response) => {
				if (err) throw err;

				const user = response.rows[0];
				if (user === null) res.send(JSON.stringify("Invalid username"));
				const isValidPass = await bcrypt.compare(String(password), user.password);
				if (isValidPass !== true) res.send(JSON.stringify("Invalid password"));
				// Create JWT
				const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
					expiresIn: "5m",
				});
				const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, {
					expiresIn: "1d",
				});
				// Saving refreshToken with current user
				const otherUsers = await client.query({
					rowMode: "array",
					text: `SELECT * FROM users WHERE username NOT LIKE '${String(username)}';`,
				});
				const currentUser = { ...user, refreshToken };
				res.send(JSON.stringify({ msg: "User-found", user_id: user.user_id }));
			}
		);
	} else {
		res.status(400).send({ message: "No SQLI m8!" });
	}
});

app.post("/register", async (req, res) => {
	let username = req.body.vals[0];
	let password = req.body.vals[1];
	if (!format.test(String(username)) && !format.test(String(password))) {
		const hashedPass = await bcrypt.hash(String(password), 10);
		client.query(
			`INSERT INTO users (username, password) VALUES ('${String(username)}', '${hashedPass}')`,
			(err, response) => {
				if (err) throw err;
				res.status(200).send("Register");
			}
		);
		console.log("User Created");
	} else {
		res.status(400).send({ message: "No SQLI m8!" });
	}
});

app.post("/albums", (req, res) => {
	let fetchRes;
	let albums;
	if (req.body.search !== undefined) {
		// Fetching albums by the req.body.search param - from spotify API.
		const options = {
			method: "GET",
			url: "https://spotify81.p.rapidapi.com/search/",
			params: {
				q: req.body.search,
				type: "albums",
				offset: "0",
				limit: "10",
				numberOfTopResults: "5",
			},
			headers: {
				"X-RapidAPI-Key": process.env.RAPIDAPI,
				"X-RapidAPI-Host": "spotify81.p.rapidapi.com",
			},
		};
		const a = async () => {
			await axios
				.request(options)
				.then(function (response) {
					fetchRes = response.data.albums.items;
				})
				.catch(function (error) {
					console.error(error);
				});
			// Making new object that contains only the data I want to pass to the client
			albums = fetchRes.map((album) => {
				return {
					id: album.data.uri.split(":")[2],
					name: album.data.name,
					image: album.data.coverArt.sources[2].url,
					imageH: album.data.coverArt.sources[2].height,
					imageW: album.data.coverArt.sources[2].width,
				};
			});
			console.log(albums);
			res.status(200).json(albums);
		};
		a();
	}
});

// This endpoint emulates a response from the API, in order to save requests to the API.
app.post("/albums-test", (req, res) => {
	let search = req.body.search;
	let albums = [
		{
			id: "id_" + search,
			name: search,
			image: "src_" + search,
			imageH: 200,
			imageW: 200,
		},
	];
	console.log(albums);
	res.status(200).json(albums);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
