const bodyParser = require("body-parser");
const compression = require('compression');
const crypto = require('crypto');
const express = require("express")
const helmet = require("helmet")
const request = require("request");
var router = require("./routes");

const environment = process.env.NODE_ENV || 3000;
var nonce = crypto.randomBytes(16).toString('base64');

function redirect(req, res, next){
	if(!process.env.PORT){
	  return next();
	}
	let host = req.headers.host;

	if (req.headers["x-forwarded-proto"] !== "https"){
		return res.redirect(301, "https://" + req.hostname + req.url);
	} else if(host.match(/^www\..*/i)){
		return res.redirect(301, "https://" + host.split(".")[1]);
	}
	next();
  };

  // App
const app = express()
app.use(compression({threshold:0}))
// template variables
app.use(function (req, res, next) {
  app.locals.nonce = nonce
  next();
});
app.use(helmet())
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(helmet.contentSecurityPolicy({
  directives: {
    formAction:["'self'"],
		defaultSrc:["'none'"],
		frameAncestors:["'none'"],
		baseUri:["'self'"],
    objectSrc:["'none'"],
    imgSrc: [
      "'self'",
      'data:',
      "www.google-analytics.com",
    ],
    styleSrc: [
      "'self'",
      "'sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z'", //Bootstrap CSS NOT WORKING
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
    ],
    scriptSrc:[
      "'self'",
      `'nonce-${nonce}'`,
      "'sha384-kvQSltvHvSg/3tzsKo6WscGmhSm10Tqg7f4Sn+okA4GdpCI/h8UjPpU/M4ea/z9V'", //Bootstrap native
      "'sha256-OVRJCRQtveHnLM73Xmgr8qo0XRUOMKA07R+uTKpq6SI='"  // Google Analytics Inline
    ],
    connectSrc:["https://www.google-analytics.com", "'self'"],
  }
}))

app.all("*", redirect);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router)
var server = app.listen(process.env.PORT || 3000, () => {
   console.log(`Google Rankings listening at ` + environment)
})

module.exports = server
