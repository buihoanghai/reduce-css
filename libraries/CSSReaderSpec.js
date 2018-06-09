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
            var expectedMediaQuery = "@include breakpoint-ns()";
            expect(nodes.length).toBe(2);
            expect(child0.comment).toBe(expectedComment);
            expect(child0.mediaQuery).toBe(expectedMediaQuery);
        });
        it("should return correct structure 3", function () {
            var rawStr =  "/*! TACHYONS v4.9.0 | http://tachyons.io */\n" +
                "/*\n" +
                " *\n" +
                " *      ________            ______\n" +
                " *      ___  __/_____ _________  /______  ______________________\n" +
                " *      __  /  _  __ `/  ___/_  __ \\_  / / /  __ \\_  __ \\_  ___/\n" +
                " *      _  /   / /_/ // /__ _  / / /  /_/ // /_/ /  / / /(__  )\n" +
                " *      /_/    \\__,_/ \\___/ /_/ /_/_\\__, / \\____//_/ /_//____/\n" +
                " *                                 /____/\n" +
                " *\n" +
                " *    TABLE OF CONTENTS\n" +
                " *\n" +
                " *    1. External Library Includes\n" +
                " *       - Normalize.css | http://normalize.css.github.io\n" +
                " *    2. Tachyons Modules\n" +
                " *    3. Variables\n" +
                " *       - Media Queries\n" +
                " *       - Colors\n" +
                " *    4. Debugging\n" +
                " *       - Debug all\n" +
                " *       - Debug children\n" +
                " *\n" +
                " */\n" +
                "/* External Library Includes */\n" +
                "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n" +
                "/* Document\n" +
                "   ========================================================================== */\n" +
                "/**\n" +
                " * 1. Correct the line height in all browsers.\n" +
                " * 2. Prevent adjustments of font size after orientation changes in\n" +
                " *    IE on Windows Phone and in iOS.\n" +
                " */\n" +
                "html { line-height: 1.15; /* 1 */ -ms-text-size-adjust: 100%; /* 2 */ -webkit-text-size-adjust: 100%; /* 2 */ }\n" +
                "/* Sections\n" +
                "   ========================================================================== */\n" +
                "/**\n" +
                " * Remove the margin in all browsers (opinionated).\n" +
                " */\n" +
                "body { margin: 0; }\n" +
                "/**\n" +
                " * Add the correct display in IE 9-.\n" +
                " */\n" +
                "article, aside, footer, header, nav, section { display: block; }\n" +
                "/**\n" +
                " * Correct the font size and margin on `h1` elements within `section` and\n" +
                " * `article` contexts in Chrome, Firefox, and Safari.\n" +
                " */\n" +
                "h1 { font-size: 2em; margin: .67em 0; }\n" +
                "/* Grouping content\n" +
                "   ========================================================================== */\n" +
                "/**\n" +
                " * Add the correct display in IE 9-.\n" +
                " * 1. Add the correct display in IE.\n" +
                " */\n" +
                "figcaption, figure, main {/* 1 */ display: block; }";
            var nodes = cssReader.parse(rawStr);
            expect(nodes.length).toBe(12);
        });
        it("should return correct structure 4", function () {
            var rawStr = ".left-05 { left: .5rem; }\n" +
                "\n" +
                "@media screen and (min-width: 60em) {\n" +
                "    .top-05-l{ top:.5rem;}\n" +
                "    .top-08-l{top: .8rem;}\n" +
                "    .top-nav-100vh-l { top: -100vh;}\n" +
                "}";
            var nodes = cssReader.parse(rawStr);
            expect(nodes.length).toBe(4);
        });
            it("should return correct structure 5", function () {
          var origin = "/*\n"+
   "LINKS\n"+
   "Docs: http://tachyons.io/docs/elements/links/\n"+
"*/\n"+
".link { text-decoration: none; transition: color .15s ease-in; }\n"+
".link:link, .link:visited { transition: color .15s ease-in; }\n"+
".link:hover { transition: color .15s ease-in; }\n"+
".link:active { transition: color .15s ease-in; }\n"+
".link:focus { transition: color .15s ease-in; outline: 1px dotted currentColor; }\n";
          var nodes = cssReader.parse(origin);
          var child0 = nodes[0];
          expect(nodes.length).toBe(6);
          expect(child0.query).toBe(".link");
      });

    });

});
