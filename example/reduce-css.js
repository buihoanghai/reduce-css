//const reduceCSS = require("reduce-css-hai-bui"); Use in your project
const reduceCSS = require("../index");
const config = require("./reduce-css-config");
let dictionary = {
	"top-0 right-0 absolute-l w24r-l pl3-l mt3 mt0-l": "a"
};
reduceCSS.initConfig(config, dictionary);
reduceCSS.run();
