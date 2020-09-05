const config = require("./config")
const express = require("express");
const multer = require('multer');
const router = express.Router();
const request = require("request");
const upload = multer();

router.get("/", function(req, res){
  res.render("main")
})

router.post("/getRank", upload.none(), async (req, res) => {
  if(req.body.site === undefined || req.body.site === ""){
    return res.status(400).send("Site URL required")
  }
  if(req.body.key=== undefined || req.body.key === ""){
    return res.status(400).send("Keyword required")
  }

  function parseQuery(){
    str = ""
    for(const word of req.body.key.split(" ")){
      if(str.length > 0){
        str += "+"
      }
      str += word
    }
    return str
  }
  let query = parseQuery()
  var options = {
    method: 'GET',
    url: 'https://google-search3.p.rapidapi.com/api/v1/search/q=' + query + "&num=1000",
    headers: {
      'x-rapidapi-host': 'google-search3.p.rapidapi.com',
      'x-rapidapi-key': config.RAPIDapi,
      useQueryString: true
    }
  };

  request(options, async function (error, response, body) {
  	if (error) throw new Error(error)
    obj = JSON.parse(body)
    let pos = 0
    let link = ""
    async function getRank(){
      for(let i=0; i<obj.results.length; i++){
        if(obj.results[i].link.includes(req.body.site)){
          pos = i
          link = obj.results[i].link
          break
        }
      }
    }
    await getRank()
  	return res.status(200).send({pos:pos, link:link});
  });
});

//Site Map
// router.get('/sitemap.xml', (req, res) =>{
// 	res.set('Content-Type', 'text/xml')
// 	res.status(200).sendFile("sitemap.xml", {root: "./"});
// });

// Robots
router.get('/robots.txt', (req, res) =>{
	res.set('Content-Type', 'text/plain')
	res.status(200).sendFile("robots.txt", {root: "./"});
});

// 404
router.use((req, res, next) => {
    return res.status(404).render("404.pug")
});


module.exports = router;
