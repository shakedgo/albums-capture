const { Client } = require("pg");
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;
const client = new Client({
	connectionString: DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = client;
client.connect();

async function initDb() {
	await client.query(
		`CREATE TABLE IF NOT EXISTS users(
          user_id SERIAL PRIMARY KEY,
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          saved_albums INTEGER[]
      );`
	);
	console.log("Created 'users' Table");

	await client.query(
		`CREATE TABLE IF NOT EXISTS albums(
          album_id INTEGER NOT NULL PRIMARY KEY,
          name TEXT NOT NULL,
          artist TEXT NOT NULL
      );`
	);
	console.log("Created 'albums' Table");

	await client.query(
		`CREATE TABLE IF NOT EXISTS comments(
          comment_id SERIAL PRIMARY KEY,
          comment_text TEXT NOT NULL,
          user_id INTEGER NOT NULL,
          album_id INTEGER NOT NULL,
          CONSTRAINT FK_user_id FOREIGN KEY(user_id)
          REFERENCES users(user_id), 
          CONSTRAINT FK_album_id FOREIGN KEY(album_id)
          REFERENCES albums(album_id)
      );`
	);
	console.log("Created 'comments' Table");

	console.log("");
	console.log("Database Created");
}

initDb();
