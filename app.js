const bodyParser = require("body-parser");
const compression = require('compression');
const express = require("express")
const helmet = require("helmet")
const request = require("request");
var router = require("./routes");

const port = process.env.NODE_ENV || 3000;

function redirect(req, res, next){
	if(!process.env.PORT){
	  return next();
	}
	let host = req.headers.host;

	if (req.headers["x-forwarded-proto"] !== "https"){
		return res.redirect(301, "https://" + req.hostname + req.url);
	} else if(!host.match(/^www\..*/i)){
		return res.redirect(301, "https://www." + host + req.url);
	}
	next();
  };

  // App
const app = express()
app.use(compression({threshold:0}))
app.use(helmet())
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(helmet.contentSecurityPolicy({
  directives: {
    formAction:["'self'"],
		defaultSrc:["'self'"],
		frameAncestors:["'none'"],
		baseUri:["'self'"],
    objectSrc:["'none'"],
    imgSrc: [
      "'self'",
      'data:'
    ],
    styleSrc: [
      "'self'",
      "'sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z'", //Bootstrap CSS NOT WORKING
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    ],
    scriptSrc:[
      "'self'",
      "'sha384-kvQSltvHvSg/3tzsKo6WscGmhSm10Tqg7f4Sn+okA4GdpCI/h8UjPpU/M4ea/z9V'" //Bootstrap native
    ],
  }
}))

app.all("*", redirect);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router)
var server = app.listen(port, () => {
   console.log(`Google Rankings listening at ` + port)
})

module.exports = server
