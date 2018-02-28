define(["module", './Attribute'], function (module, Attribute) {
    "use strict";

    function CSSNode(query, attributes, mediaQuery, comment) {
        this.query = query.removeComment().trim();
        this.attributes = attributes;
        if (mediaQuery) {
            mediaQuery = mediaQuery.replace("screen and (min-width: 30em) and (max-width: 60em)", "screen and (min-width: 30em) and (max-width: 64em)").replace("screen and (min-width: 60em)", "screen and (min-width: 64em)");
        }
        this.mediaQuery = (mediaQuery || "").trim();
        this.comment = (comment || "").trim();
        // @mixin breakpoint-down($point) {
        //     @media ('max-width': $point) {
        //         @content;
        //         }
        //     }
        this.createMixin = function () {
            var nameMixin = this.getMixinName();
            var mediaQuery = this.mediaQuery;
            var attributes = this.attributes;
            var result = "@mixin " + nameMixin + "{";
            if (mediaQuery) {
                result = result + " @media " + mediaQuery + "{";
            }
            result = "" + result + this.query + "{";
            for (var i = 0; i < attributes.length; i++) {
                var attribute = attributes[i];

                result = "" + result + attribute.name + ":" + attribute.value + ";";
            }
            result = result + '}';
            if (mediaQuery) {
                result = result + '}';
            }
            result = result + '}';
            return result;
        };
        this.getMixinName = function () {
            return "tachyon-" + this.query.replace(/[&\/\\#,+()$~%.'":*?<>{} =\[\]]/g, '');
        };
    }

    CSSNode.parse = function (str, mediaQuery, comment) {
        var result = [];
        var arr = str.split('{');
        var query = arr[0];
        var queryArr = query.split(',');
        var attributesRaw = arr[1].replace('}', '');
        var attributesArr = attributesRaw.split(';');
        var attributes = [];
        for (var i = 0; i < attributesArr.length; i++) {
            var attr = Attribute.parse(attributesArr[i]);
            if (attr) {
                attributes.push(attr);
            }
        }
        for (var _i = 0; _i < queryArr.length; _i++) {
            if (queryArr[_i]) {
                result.push(new CSSNode(queryArr[_i], attributes, mediaQuery, comment));
            }
        }
        return result;
    };

    module.exports = CSSNode;
});