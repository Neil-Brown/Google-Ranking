const express = require("express");
const router = express.Router();
var request = require("request");

router.get("/", function(req, res){
  res.render("main")
})
console.log("foo")
router.get("/gerRank", async function(req, res) {
  console.log(req.query)
  function parseQuery(){
    r = req.query.query.split(" ")
    str = ""
    for(const word of req.query.query.split(" ")){
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
      'x-rapidapi-key': 'b334b61db6mshdf86d5299a401ccp169a1cjsnf1ec6cecfd8b',
      useQueryString: true
    }
  };

  request(options, async function (error, response, body) {
  	if (error) throw new Error(error);
    obj = JSON.parse(body)
    let pos = "not in top 100"
    async function getRank(){
      console.log(obj.results[0])
      for(let i=0; i<obj.results.length; i++){
        console.log("i " + i)
        console.log(obj.results[i].link)
        if(obj.results[i].link.includes(req.query.website)){
          pos = i
          break
        }
      }
    }
    await getRank()
  	return res.status(200).send(`${req.query.website} is ranked ${pos} on Google for ${req.query.query}`);
  });
});


module.exports = router;
