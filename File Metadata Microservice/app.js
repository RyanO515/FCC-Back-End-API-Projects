var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Upload    = require("./models/uploads"),
    PORT       = process.env.PORT || 3000,
    app        = express();

mongoose.connect(process.env.DATABASEURL, function (err) {
	if (err) console.log(err);
	else console.log("connected to the db");
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var multer = require("multer");

// stores files in memory
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
// uploading file from index.ejs form "file"
var uploadFile = upload.single('file');

app.get("/", function (req, res) {
	res.render("index");
});

app.post('/uploads', function (req, res) {
	uploadFile(req, res, function (err) {

		if (err) console.log(err);

		// make file document for db
		var fileInfo = {
			name: req.file.originalname,
			size: req.file.size,
			date: new Date().toLocaleString(),
			file: req.file.filename
		}
		
		// create and save new upload to db
		var upload = new Upload(fileInfo);
	
		upload.save(function (err, file) {
			if (err) console.log(err);
		
			// everything went fine
			// no need to find, just send immediately to user
			else {
				console.log("added file to database!");
				res.send(fileInfo);
			}
		});
	});
});



app.listen(PORT, function () {
	console.log("Server listening on " + PORT);
});