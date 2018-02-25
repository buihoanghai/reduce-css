describe("CSSReader", function () {
    var CSSReader = require('./CSSReader');
    var cssReader;
    beforeEach(function(){
        cssReader = new CSSReader();
    })
    describe("parse", function () {
        it("should not loop infinitely", function () {
            spyOn(cssReader, "process");
            var rawStr = "/*abc*/";
            cssReader.parse(rawStr);
            expect(cssReader.process).toHaveBeenCalledTimes(rawStr.length);
        });
        it("should return correct structure 1", function () {
            var rawStr = "/*comment*/sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }";
            var nodes = cssReader.parse(rawStr);
            var child0 = nodes[0];
            var expectedComment = "comment";
            expect(nodes.length).toBe(2);
            expect(child0.comment).toBe(expectedComment);
        });
        it("should return correct structure 2", function () {
            var rawStr = "@media screen and (min-width: 30em) {/*comment*/sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; } }";
            var nodes = cssReader.parse(rawStr);
            var child0 = nodes[0];
            var expectedComment = "comment";
            var expectedMediaQuery = "screen and (min-width: 30em)";
            expect(nodes.length).toBe(2);
            expect(child0.comment).toBe(expectedComment);
            expect(child0.mediaQuery).toBe(expectedMediaQuery);
        });

    });

});
