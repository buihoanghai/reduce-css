var CSSReader = require('/CSSReader');
function process() {
    var rawStr = $('#rawStr').val();
    var cssReader = new CSSReader();
    var nodes = cssReader.parse(rawStr);
    var result = "";
    for(var i = 0; i < nodes.length; i++) {
        var mixinStr = nodes[i].createMixin();
        result = `${result}
        ${mixinStr}`;
    }
    $('#processedStr').val(result);
}