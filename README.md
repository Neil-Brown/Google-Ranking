# Google-Ranking

Google ranking is and SEO website that will calculate your site's ranking on Google by keyword

## Installation

visit: https://google-ranker.herokuapp.com/

Or

Clone this repository.
Create an FREE account at https://rapidapi.com/ and receive your secret key.
Create a config.js file in the root directory (this file is already specified in the .gitignore file)
Add the following to the config.js file
```
var config = {
  RAPIDapi: "YOUR SECRET KEY"
}
module.exports = config
```


## Usage

Enter your sites URL into the textbox.
Choose at least one keyword
Hit the button

Goole-Ranking uses Google's Rapidapi.com to bring back the top 1000 results for searching for your chosen keywords. It finds your sites position within these results and displays the position

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
