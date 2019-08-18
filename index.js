const _ = require('lodash');
var globule = require('globule');
const ClassReader = require("./libraries/ClassReader");
const CSSReader = require("./libraries/CSSReader");
var config;
const fs = require('fs');
var css = [];
let classDictionary = {};

function initConfig(c, d) {
    config = c ? c : {};
    classDictionary = d ? d : {};
}

function run() {
    return new Promise(resolve => {
        var paths = _.clone(config.paths);
        var deferedReadBaseCSS = readBaseCSS();
        var deferedReadUsedClass = readUsedClass();
        console.time("Reduce-CSS");
        Promise.all([deferedReadBaseCSS, deferedReadUsedClass]).then(() => {
            for (var i = 0; i < paths.length; i++) {
                createdUsedClass(css, paths[i].usedClass, paths[i].out, paths[i].unresolved);
                createdUsedCombineClass(paths[i].combineClass, paths[i].combine, paths[i].unresolved);
            }
            createMixin();
            createPropertyMixin();
			resolve();
            console.timeEnd("Reduce-CSS");
        });
    });
}

function readUsedClass() {
    let defered = new Promise((resolve, reject) => {
        let paths = config.paths;
        let deferedList = [];
        for (var i = 0; i < paths.length; i++) {
            deferedList.push(new Promise((resolve1, reject1) => {
                paths[i].usedClass = [];
                paths[i].combineClass = [];
                readUsedClassInFile(paths[i].path, paths[i], resolve1);
            }));
        }
        Promise.all(deferedList).then(() => {
            resolve();
        });
    });
    return defered;
}

function getFiles(path) {
    var files = [];
    if (typeof (path) === "Array") {
        _.each(path, item => {
            files.concat(globule.find(item));
        });
    } else {
        files = globule.find(path);
    }
    return files;
}

function readUsedClassInFile(path, p, resolve) {
    var filePaths = getFiles(path);
    let deferedList = [];
    const classReader = new ClassReader(config.startClass);
    _.each(filePaths, file => {
        deferedList.push(new Promise((resolve1, reject1) => {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) throw err;
                let parsedData = classReader.parse(data);
                p.usedClass = p.usedClass.concat(parsedData.classes);
                p.combineClass = p.combineClass.concat(parsedData.combineClass);
                resolve1();
            });
        }));

    });
    Promise.all(deferedList).then(() => {
        resolve();
    });
}

function readBaseCSS() {
    let defered = new Promise((resolve, reject) => {
        const filePaths = getFiles(config.baseCSS);
        let deferedList = [];
        _.each(filePaths, file => {
            deferedList.push(new Promise((resolve1, reject1) => {
                fs.readFile(file, 'utf8', function (err, data) {
                    const cssReader = new CSSReader();
                    var newNodes = cssReader.parse(data);
                    if (err) throw err;
                    css = css.concat(newNodes);
                    resolve1();
                });
            }));
        });
        Promise.all(deferedList).then(() => {
            resolve();
        });
    })
    return defered;
}

function createMixinExample(nodes) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
        let mixinStr = nodes[i].getMixinName();
        result = result + '\n@include ' + mixinStr + ';';
    }
    return result;
}

function createPropertyMixin() {
    let nodes = css;
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
        let mixinStr = nodes[i].createPropertyMixin();
        if (mixinStr)
            result = result + '\n' + mixinStr;
    }
    fs.writeFile(config.propertyMixin, result, function (err) {
        if (err) {
            return console.log(err, config.baseMixin);
        }
        console.log("Generate Mixin File", config.baseMixin);
    });
}

function createMixin() {
    let nodes = css;
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
        let mixinStr = nodes[i].createMixin();
        if (mixinStr)
            result = result + '\n' + mixinStr;
    }
    fs.writeFile(config.baseMixin, result, function (err) {
        if (err) {
            return console.log(err, config.baseMixin);
        }
        console.log("Generate Mixin File", config.baseMixin);
    });
}

function createdUsedCombineClass(combineClasses, out) {
    if (!combineClasses || !out) {
        return;
    }
    let result = "";
    combineClasses.forEach(combineClass => {
        if (classDictionary[combineClass]) {
            // console.log("Finded", combineClass);
            let temp = "";
            temp = "." + classDictionary[combineClass] + "{\n";
            let classes = combineClass.split(" ");
            classes.forEach(cl => {
                temp += "@include property-" + cl + ";\n";
            });
            temp += "}\n";
            result += temp;
        }
    });

    fs.writeFile(out, result, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Generate Used Class File", out);
    });
}

function createdUsedClass(nodes, usedClasses, out) {
    let result = "";
    var used = [];
    for (let i = 0; i < nodes.length; i++) {
        for (var j = 0; j < usedClasses.length; j++) {
            if (nodes[i].query === "." + usedClasses[j]) {
                var mixinStr = nodes[i].getMixinName();
                result = result + '@include ' + mixinStr + ';\n';
                used.push(usedClasses[i]);
                break;
            }
        }
    }

    fs.writeFile(out, result, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Generate Used Class File", out);
    });
    //Todo for who want to track unresolved class
    // var unresolvedClasses = _.filter(usedClasses, item => {
    // 	return used.indexOf(item) > -1
    // });
    // fs.writeFile(unresolved,unresolvedClasses.join('\n'), function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("Generate Unresolved Class File", unresolved);
    // });
}

var reduceCSS = {
    initConfig: initConfig,
    run: run,
    readBaseCSS: readBaseCSS,
    createMixinExample: createMixinExample,
    createMixin: createMixin
};
module.exports = reduceCSS;