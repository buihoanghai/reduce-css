function BlockComment() {
    this.start = function () {

    };
    this.end = function (str) {
        this.comment = str.replace('*/', '');
    };
    this.isMatchEnd = function (str) {
        if(str === "*/"){
            return true;
        }
        var strEnd = str.slice(-2);
        return strEnd === "*/";
    };
}
BlockComment.isMatchStart = function (str) {
    if(str === "/*"){
        return true;
    }
    var strEnd = str.slice(-2);
    return strEnd === "/*";
};

module.exports = BlockComment;
