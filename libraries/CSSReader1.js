var BlockComment = require("./BlockComment");
var BlockCSS = require("./BlockCSS");
function CSSReader() {
    var currentStr = "";
    var result = [];
    var currentFactory, currentComment;
    this.parse = function (str, media) {
        var length = str.length;
        var index = 0;
        while (index < length) {
            var strIndex = str[index];
            currentStr = currentStr + strIndex;
            var output = this.process(media);
            if(output){
                result = result.concat(output);
            }
            index++;
        }
        return result;

    };
    this.process = function (media) {
        if (currentFactory) {
            if (currentFactory.isMatchEnd(currentStr)) {
                var result = currentFactory.end(currentStr, media || {}, currentComment || {});
                currentFactory = undefined;
                currentStr = "";
                if(result){
                    return result;
                }
                return;
            }
            return;
        }
        if(BlockComment.isMatchStart(currentStr)){
            currentComment = currentFactory = new BlockComment();
            currentStr = "";
            return;
        }

        if(BlockCSS.isMatchStart(currentStr)){
            currentFactory = new BlockCSS();
            currentStr = "";
            return;
        }
    };
}

//Comment area inside start "/*" end "*/"
//Block media inside start "media {" end "}" but not is end of "}" of block CSS
//Block CSS start "{" end "}"



module.exports = CSSReader;
