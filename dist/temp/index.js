define(['./CSSReader', './ClassReader'], function (CSSReader,ClassReader) {
  'use strict';
  String.prototype.removeComment = function () {
    var indexStart = this.indexOf('/*');
    var indexEnd = this.indexOf('*/');
    if (indexStart !== -1 && indexEnd !== -1) {
      return this.replace(this.slice(indexStart, indexEnd + 2), '');
    }
    return this.toString();
  };
  window.process = function process() {
    var rawStr = $('#rawStr').val();
    var htmlStr = $('#htmlStr').val();
    var cssReader = new CSSReader();
    var classReader = new ClassReader();
    var nodes = cssReader.parse(rawStr);
    var usedClass = classReader.parse(htmlStr);
    var result = "";
    for (var i = 0; i < nodes.length; i++) {
      // var mixinStr = nodes[i].createMixin();
      // result = result + '\n        ' + mixinStr;

      //
      for (var j = 0; j < usedClass.length; j++) {
        if (nodes[i].query === "." + usedClass[j]) {
          var mixinStr = nodes[i].getMixinName();
          result = result + '\n@include ' + mixinStr + ';';
          break;
        }
      }
    }
    $('#processedStr').val(result);
  }
});
