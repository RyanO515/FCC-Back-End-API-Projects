var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	PORT = process.env.PORT || 3000,
	Bing = require("node-bing-api")({
		accKey: process.env.API_KEY
	}),
	
	Search = require("./models/searches"),
	app = express();



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASEURL, function (err) {
	if (err) console.log(err);
	else console.log("connected to database" + process.env.DATABASEURL);
});


app.get("/", function (req, res) {
	res.render("index");
});	

app.get("/prev", function (req, res) {
	Search.find({}, null, {
		"limit": 10,
		"sort": {
			"when": -1
		}
	}, function (err, searches) {
		if (err) return console.log(err);
		else {
			console.log(searches);
			
			res.send(searches.map(function(arg) {
				return {
					term: arg.term,
					when: arg.when
				}
			}));
		}
	});
});

app.get("/:search", function (req, res) {

	var search = req.params.search;
	var size = req.query.offset || 10;
	var offset = req.query.offset || 0;
	var date = new Date().toLocaleString();
	if (search !== "favicon.ico") {

		Search.create({
			"term": search,
			"when": date
		}, function (err, search) {
			if (err) console.log(err);

			else {
				console.log(search);
				console.log("saved to the database");
			}
		});
	}

	Bing.images(search, {top: size, skip: offset}, function (err, thing, body) {
		if (err) console.log("Not working...");
		else {
			var results = body.d.results;
			
			res.send(results.map(listResults));
			// res.send(results.map(listResults));
		}
	});

	function listResults (bing) {
		var bingObject = {
			"url": bing.MediaUrl,
			"snippet": bing.Title,
			"thumbnail": bing.Thumbnail.MediaUrl,
			"context": bing.SourceUrl 
		}
		return bingObject;
	}

}); 



app.listen(PORT, function (req, res) {
	console.log("Server is running on " + PORT);
});