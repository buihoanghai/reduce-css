
// /*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */
//
// /* Document
//    ========================================================================== */
//
// /**
//  * 1. Correct the line height in all browsers.
//  * 2. Prevent adjustments of font size after orientation changes in
//  *    IE on Windows Phone and in iOS.
//  */
//
// html {
//     line-height: 1.15; /* 1 */
//     -ms-text-size-adjust: 100%; /* 2 */
//     -webkit-text-size-adjust: 100%; /* 2 */
// }
//


// /* Sections
//    ========================================================================== */
//
// /**
//  * Remove the margin in all browsers (opinionated).
//  */
//
// body {
//     margin: 0;
// }
//
// /**
//  * Add the correct display in IE 9-.
//  */
//


// article,
//     aside,
//     footer,
//     header,
//     nav,
//     section {
//     display: block;
// }
//


// /**
//  * Correct the font size and margin on `h1` elements within `section` and
//  * `article` contexts in Chrome, Firefox, and Safari.
//  */
//
// h1 {
//     font-size: 2em;
//     margin: 0.67em 0;
// }

// @media (--breakpoint-not-small) {
// .medium-and-larger-specific-style {
//         background-color: red;
//     }
// }
function CSSNode(query,attributes) {
    this.query = query;
    this.attributes= attributes;
}

CSSNode.paste = function(str) {
    var result = [];
    var arr = str.spit('{');
    var query = arr[0];
    var queryArr = query.split(',');
    var attributesRaw = arr[1].replace('}', '');
    var attributesArr = attributesRaw.split(';');
    var attributes = [];
    for (let i = 0; i < attributesArr.length; i++) {
        if (attributesArr[i]) {
            attributes.push(attributesArr[i]);
        }
    }
    for (let i = 0; i < queryArr.length; i++) {
        if (queryArr[i]) {
            result.push(new CSSNode(queryArr[i], attributes))
        }
    }
    return result;
};

function Attribute(name, value) {
    this.name = name;
    this.value = value;
}
Attribute.parse = function(str) {
    var attr = str.split(':');
    return new Attribute(attr[0], attr[1]);
};
