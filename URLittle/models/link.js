var mongoose = require("mongoose"),
	Schema   = mongoose.Schema;

var LinkSchema = new Schema({
	id: {
		type: String,
		unique: true
	},
	url: String
});

module.exports = mongoose.model("Links", LinkSchema);