var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var searchSchema = new Schema({
	term: String,
	when: String
});

module.exports = mongoose.model("Search", searchSchema);