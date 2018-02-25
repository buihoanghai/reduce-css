describe("BlockComment", function () {
    var BlockComment = require('./BlockComment');
    describe("isMatchStart", function () {
        it("should match start correctly 1", function () {
            expect(BlockComment.isMatchStart("/*")).toBe(true);
        });
        it("should match start correctly 2", function () {
            expect(BlockComment.isMatchStart(" /*")).toBe(true);
        });
        it("should match start correctly 3", function () {
            expect(BlockComment.isMatchStart("*")).toBe(false);
        });
        it("should match start correctly 4", function () {
            expect(BlockComment.isMatchStart("a/")).toBe(false);
        });
    });
    describe("isMatchEnd",function(){
        var blockComment;
        beforeEach(function () {
           blockComment = new BlockComment();
        });
        it("should match end correctly 1", function () {
            expect(blockComment.isMatchEnd("*/")).toBe(true);
        });
        it("should match end correctly 2", function () {
            expect(blockComment.isMatchEnd(" */")).toBe(true);
        });
        it("should match end correctly 3", function () {
            expect(blockComment.isMatchEnd(" /")).toBe(false);
        });
        it("should match end correctly 4", function () {
            expect(blockComment.isMatchEnd(" *")).toBe(false);
        });
    })

});
