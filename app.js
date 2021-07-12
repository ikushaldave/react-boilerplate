var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// if (process.env.NODE_ENV === "development") {
//   const webpack = require("webpack");
//   var webpackConfig = require("./webpack.config");
//   const compiler = webpack();

//   app.use(require("webpack-hot-middleware")(compiler));

// 	app.use(
// 		require("webpack-dev-middleware")(compiler, {
// 			publicPath: webpackConfig.output.publicPath,
// 		})
// 	);
// }

if (process.env.NODE_ENV === "development") {
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config");
	var compiler = webpack(webpackConfig);
	app.use(
		require("webpack-dev-middleware")(compiler, {
			publicPath: webpackConfig.output.publicPath,
		})
		);
		app.use(require("webpack-hot-middleware")(compiler));
}

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
