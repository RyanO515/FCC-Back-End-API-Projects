var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;


var UploadSchema = new Schema({
	name: String,
	size: Number, 
	date: String,
	file: String
});

module.exports = mongoose.model("Upload", UploadSchema);