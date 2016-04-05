var express    = require("express"),
	bodyParser = require("body-parser"),
	PORT       = process.env.PORT || 3000,
	getIP      = require('ipware')().get_ip,
	app        = express();



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/", function (req, res) {
	// var ip = getIP(req).clientIP;
	var ip = req.headers['x-forwarded-for'] || 
     	req.connection.remoteAddress || 
     	req.socket.remoteAddress ||
     	req.connection.socket.remoteAddress;
	
    var info = {
         'ip-address': ip,
         'language': req.headers["accept-language"].split(',')[0],
         'software': req.headers['user-agent'].split(') ')[0].split(' (')[1]
    };

    res.send(info);
});

// more ip and header info used in this app can be found at:
// http://stackoverflow.com/questions/19266329/node-js-get-clients-ip
// http://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node/26310355#26310355





app.listen(PORT, function (req, res) {
	console.log("Server is listening!!!");
});