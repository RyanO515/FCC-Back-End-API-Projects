var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Links = require("./models/link"),
	ejs = require("ejs"),
	app = express();
	
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


mongoose.connect(process.env.DATABASE_URL, function (err) {
	if (err) console.log(err);
	else console.log("connected to database" + process.env.DATABASE_URL);
});

app.get("/", function (req, res) {
	res.render("index");
});

app.get("/new/:url", function (req, res) {
	var url = req.params.url;
	var id = Math.floor(Math.random() * 10000) + "1";

	var link = new Links({
		url: url,
		id: id
	});

	link.save(function (err) {
		if (err) console.log(err);
	});

	var jsonLink = {
		"original_url": "http://" + url,
		"short_url": "https://urlittle.herokuapp.com/short/ened/" + id
	};
	
	res.send(jsonLink);
});

app.get("/short/ened/:id", function (req, res) {

	console.log(req.params.id);
	Links.find({
		id: req.params.id
	}, function (err, link) {

		if (err) console.log(err);

		else {
			console.log(req.params.id);
			console.log(link);
			var getLink = link;
			var goToUrl = getLink[0].url;

			res.redirect("http://" + goToUrl);
		}
	});
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server running!");
});


