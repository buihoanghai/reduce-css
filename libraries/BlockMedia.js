var CSSReader = require("./CSSReader1");
function BlockMedia() {
    this.end = function (str) {
        var arr = str.split("{");
        this.query = arr[0];
        var cssReader = new CSSReader();
        var cssBlocksStr = str.slice(this.query.length + 1, str.length - 1);
        return  cssReader.parse(cssBlocksStr, this);
    };
    this.isMatchEnd = function (str) {
        var countStartBracket = (str.match(/{/g) || []).length;
        var countEndBracket = (str.match(/}/g) || []).length;
        if(countEndBracket === countStartBracket && countEndBracket > 0){
            return true;
        }
        return false;
    }
}
BlockMedia.isMatchStart = function (str) {
    var length = str.length;
    if(length < 6){
        return false;
    }
    var strEnd = str.slice(-6);
    if(strEnd === "@media"){
        return true;
    }
    return false;
};

module.exports = BlockMedia;
