var CSSReader = require("./CSSReader1");
function BlockMedia() {
    this.end = function (str) {
        var arr = str.split("{");
        this.query = arr[0];
        var cssReader = new CSSReader();
        var cssBlocksStr = str.slice(this.query.length, str.length - 1);
        return  cssReader.parse(cssBlocksStr, this);
    };
    this.isMatchEnd = function (str) {
        var countStartBracket = (str.match(/{/g) || []).length;
        var countEndBracket = (str.match(/}/g) || []).length;
        return countEndBracket === countStartBracket;
    }
}
BlockMedia.isMatchStart = function (str) {
    var length = str.length;
    if(length < 6){
        return false;
    }
    var strEnd = str.slice(-6);
    return strEnd === "@media";
};

module.exports = BlockMedia;
