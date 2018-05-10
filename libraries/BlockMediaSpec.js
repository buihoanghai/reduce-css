describe("BlockMedia", function () {
    var BlockMedia = require('./BlockMedia');
    var blockMedia;
    beforeEach(function () {
        blockMedia = new BlockMedia();
    });
    describe("isMatchStart", function () {
        it("should match start correctly 1", function () {
            expect(BlockMedia.isMatchStart("@media")).toBe(true);
        });
        it("should match start correctly 2", function () {
            expect(BlockMedia.isMatchStart(" @media")).toBe(true);
        });
    });
    describe("isMatchEnd",function(){

        it("should match end correctly 1", function () {
            expect(blockMedia.isMatchEnd("screen and (min-width: 30em){ }")).toBe(true);
        });
        it("should match end correctly 2", function () {
            expect(blockMedia.isMatchEnd("screen and (min-width: 60em){ {} {} {} }")).toBe(true);
        });
        it("should match end correctly 3", function () {
            expect(blockMedia.isMatchEnd("screen and (min-width: 60em){ { }} }")).toBe(false);
        });
        it("should match end correctly 4", function () {
            expect(blockMedia.isMatchEnd("screen and (min-width: 60em){ { {{{}} }")).toBe(false);
        });
        it("should match end correctly 5", function () {
            expect(blockMedia.isMatchEnd(" ")).toBe(false);
        });
    })
    describe("end",function () {
        it("should parse correct structure 1", function () {
            var rawStr = "screen and (min-width: 30em) {\n" +
                "/*comment*/.aspect-ratio-ns { height: 0; position: relative; }\n" +
                " .aspect-ratio--16x9-ns { padding-bottom: 56.25%; } }";
           var nodes = blockMedia.end(rawStr);
           var child1 = nodes[1];
           expect(nodes.length).toBe(2);
           expect(child1.mediaQuery).toBe("@include breakpoint-ns()");

        });
    })

});
