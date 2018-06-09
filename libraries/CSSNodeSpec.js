describe("CSSNode", function () {
  var CSSNode = require('./CSSNode');
  describe("parse", function () {
    it("should return correct structure 1", function () {
      var origin = "html { line-height: 1.15; /* 1 */ -ms-text-size-adjust: 100%; /* 2 */ -webkit-text-size-adjust: 100%; /* 2 */ }";
      var nodes = CSSNode.parse(origin);
      var child0 = nodes[0];
      expect(nodes.length).toBe(1);
      expect(child0.query).toBe("html");
      expect(child0.attributes.length).toBe(3);
      expect(child0.attributes[1].name).toBe("-ms-text-size-adjust");
      expect(child0.attributes[0].value).toBe("1.15");
    });
    it("should return correct structure 2", function () {
      var origin = "figcaption, figure, main {/* 1 */ display: block; }";
      var nodes = CSSNode.parse(origin);
      var child0 = nodes[0];
      var child1 = nodes[1];
      var child2 = nodes[2];
      expect(nodes.length).toBe(3);
      expect(child1.query).toBe("figure");
      expect(child2.attributes.length).toBe(1);
      expect(child2.attributes[0].name).toBe("display");
      expect(child1.attributes[0].value).toBe("block");
    });
    it("should return correct structure 3", function () {
      var origin = "sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }";
      var nodes = CSSNode.parse(origin);
      var child0 = nodes[0];
      var child1 = nodes[1];
      expect(nodes.length).toBe(2);
      expect(child1.query).toBe("sup");
      expect(child0.attributes.length).toBe(4);
      expect(child1.attributes[1].name).toBe("line-height");
      expect(child0.attributes[3].value).toBe("baseline");
    });
      it("should return correct structure 4", function () {
          var origin = "sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }";
          var nodes = CSSNode.parse(origin, "screen and (min-width: 30em)", "Uncomment out the line below to help debug layout issues");
          var expMedia = "@include breakpoint-ns()";
          var expComment = "Uncomment out the line below to help debug layout issues";
          var child0 = nodes[0];
          expect(child0.mediaQuery).toBe(expMedia);
          expect(child0.comment).toBe(expComment);
      });
   
  });
  
});
