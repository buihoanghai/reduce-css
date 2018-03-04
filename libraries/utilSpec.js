describe("util", function () {
  require('./util');
  describe("String", function () {
    describe("removeComment", function () {
      it("should remove comment area 1", function () {
        var origin = "line-height: 1.15; /* 1 */";
        var expected = "line-height: 1.15; ";
        var result = origin.removeComment();
        expect(result).toBe(expected);
      });
      it("should remove comment area 2", function () {
        var origin = "line-/* 1 */height: 1.15; ";
        var expected = "line-height: 1.15; ";
        var result = origin.removeComment();
        expect(result).toBe(expected);
      });
      it("should remove comment area 3", function () {
        var origin = "/* 1 */line-height: 1.15; ";
        var expected = "line-height: 1.15; ";
        var result = origin.removeComment();
        expect(result).toBe(expected);
      });
    })
   
  });
  
});
