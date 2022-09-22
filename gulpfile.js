const gulp = require("gulp");
const clean = require("gulp-clean");
const { exec } = require("child_process");

// Removes previous dist
gulp.task("clean", () => {
	return gulp.src("./dist", { allowEmpty: true }).pipe(clean());
});
// Build all
gulp.task("build", gulp.series("clean"));

// Heroku copy client files
gulp.task("heroku-copy-client", () => {
	return gulp.src(["./client/build/**/*"]).pipe(gulp.dest("./deploy/client"));
});

// Heroku copy server files
gulp.task("heroku-copy-server", () => {
	return gulp
		.src(["./server/package.json", "./server/package-lock.json", "./Procfile", "./server/server.js"])
		.pipe(gulp.dest("./deploy"));
});

// Heroku clean files
gulp.task("heroku-clean", () => {
	return gulp.src(["./deploy"], { allowEmpty: true }).pipe(clean());
});

// Heroku deploy
gulp.task("deploy", gulp.series("build", "heroku-copy-client", "heroku-copy-server"));
