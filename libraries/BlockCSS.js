var CSSNode = require("./CSSNode");
function BlockCSS(){
    this.end = function (str, media, comment) {
        var query = BlockCSS.query;
        BlockCSS.query = "";
        return CSSNode.parse(query + str, media ? media.query : undefined, comment ? comment.comment : undefined);
    };
    this.isMatchEnd = function (str) {
        var length = str.length;
        var strEnd = str[length - 1];
        return strEnd === "}";
    };
}
BlockCSS.isMatchStart = function (str) {
    var length = str.length;
    if(length < 2){
        return false;
    }
    BlockCSS.query = str;
    var strEnd = str[length - 1];
    return strEnd === "{";
};

module.exports = BlockCSS;
