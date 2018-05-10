describe("BlockCSS", function () {
    var BlockComment = require('./BlockCSS');
    var blockComment;
    beforeEach(function () {
        blockComment = new BlockComment();
    });
    describe("isMatchStart", function () {
        it("should match start correctly 1", function () {
            expect(BlockComment.isMatchStart("a {")).toBe(true);
        });
        it("should match start correctly 2", function () {
            expect(BlockComment.isMatchStart("abc{")).toBe(true);
        });
        it("should match start correctly 3", function () {
            expect(BlockComment.isMatchStart("{")).toBe(false);
        });
        it("should match start correctly 4", function () {
            expect(BlockComment.isMatchStart("abc")).toBe(false);
        });
    });
    describe("isMatchEnd",function(){

        it("should match end correctly 1", function () {
            expect(blockComment.isMatchEnd("aa }")).toBe(true);
        });
        it("should match end correctly 2", function () {
            expect(blockComment.isMatchEnd("b}")).toBe(true);
        });
        it("should match end correctly 3", function () {
            expect(blockComment.isMatchEnd("}")).toBe(true);
        });
        it("should match end correctly 4", function () {
            expect(blockComment.isMatchEnd("b ")).toBe(false);
        });
    })
    describe("end",function () {
        it("should parse correct structure 1", function () {
           var nodes = blockComment.end("html { line-height: 1.15; /* 1 */ -ms-text-size-adjust: 100%; /* 2 */ -webkit-text-size-adjust: 100%; /* 2 */ }");
           expect(nodes.length).toBe(1);

        });
        it("should parse correct structure 2", function () {
            var media = { query: "@include breakpoint-ns()"};
            var comment = { comment: "Uncomment out the line below to help debug layout issues"};
            var nodes = blockComment.end("html { line-height: 1.15; /* 1 */ -ms-text-size-adjust: 100%; /* 2 */ -webkit-text-size-adjust: 100%; /* 2 */ }", media, comment);
            var child0 = nodes[0]
            expect(nodes[0].mediaQuery).toBe(media.query);
            expect(nodes[0].comment).toBe(comment.comment);

        });
    })

});
