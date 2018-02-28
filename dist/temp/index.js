define(['./CSSReader'], function (CSSReader) {
    'use strict';
    String.prototype.removeComment = function () {
        var indexStart = this.indexOf('/*');
        var indexEnd = this.indexOf('*/');
        if (indexStart !== -1 && indexEnd !== -1) {
            return this.replace(this.slice(indexStart, indexEnd + 2), '');
        }
        return this.toString();
    };
    window.process =function process() {
        var rawStr = $('#rawStr').val();
        var cssReader = new CSSReader();
        var nodes = cssReader.parse(rawStr);
        var result = "";
        for (var i = 0; i < nodes.length; i++) {
            var mixinStr = nodes[i].createMixin();
            result = result + '\n        ' + mixinStr;
            // var mixinStr = nodes[i].getMixinName();
            // result = result + '\n@include ' + mixinStr +';';
        }
        $('#processedStr').val(result);
    }
});