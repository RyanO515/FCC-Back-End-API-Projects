var 	express = require("express"),
		app     = express(),
		PORT    = process.env.PORT || 3000,
		bodyParser = require("body-parser"),
		moment  = require("moment");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get("/:date", function (req, res) {
	var date = req.params.date,
		  ut = null,
		  nt = null;

	console.log(date);

	if (typeof +date === 'number' && +date > 0) {
		ut = +date;
		nt = unixToNormalTime(ut);

		console.log("first if statement");

		res.json({
			"unix": ut,
			"natural": nt
		});
	} 

	if (typeof date === 'string' && moment(date, "MMMM D, YYYY").isValid()) {
		ut = normalTimeToUnix(date);
		nt = unixToNormalTime(ut);

		console.log("second if statement");

		res.json({
			"unix": ut,
			"natural": nt
		});
	}

	res.send("Your url timestamp was not formatted correctly, please verify and try again.");



	function normalTimeToUnix (date) {
		return moment(date, "MMMM D, YYYY").format("X"); // Unix timestamp
	}

	function unixToNormalTime (date) {
		return moment.unix(date).format("MMMM D, YYYY");
	}
});


app.listen(PORT, function (req, res) {
	console.log("Timestamp server has started!");
});






