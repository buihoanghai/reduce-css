const _ = require('lodash');
var globule = require('globule');
const ClassReader = require("./libraries/ClassReader");
const CSSReader = require("./libraries/CSSReader");
var config;
const fs = require('fs');
var css = [];
function initConfig(c){
  config = c;
}
function run() {
  var paths = _.clone(config.paths);
  readBaseCSS();
  readUsedClass();
  setTimeout(function () {
    for (var i = 0; i < paths.length; i++) {
      createdUsedClass( css , paths[i].usedClass, paths[i].out);
    }
  }, 10000);
}
function readUsedClass() {
  const paths = config.paths;
  for (var i = 0; i < paths.length; i++) {
    paths[i].usedClass = [];
    readUsedClassInFile(paths[i].path, paths[i]);
  }
}
function readUsedClassInFile(path, p) {
  var filePaths = globule.find(path);
  filePaths.forEach(file => {
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) throw err;
        const classReader = new ClassReader();
        p.usedClass = p.usedClass.concat(classReader.parse(data));
      });
  });
}
function readBaseCSS(){
  const cssReader = new CSSReader();
  const baseCSS = config.baseCSS;
  for(let i = 0; i < baseCSS.length; i++){
    const filename = baseCSS[i];
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) throw err;
      css = css.concat(cssReader.parse(data));
    });
  }
  setTimeout(function () {
    createMixin();
  },10000);
}
function createMixinExample(nodes){
  let result = "";
  for (let i = 0; i < nodes.length; i++) {
    let mixinStr = nodes[i].getMixinName();
    result = result + '\n@include ' + mixinStr + ';';
  }
  return result;
}
function createMixin(){
  let nodes = css;
  let result = "";
  for (let i = 0; i < nodes.length; i++) {
    let mixinStr = nodes[i].createMixin();
    if(mixinStr)
      result = result + '\n' + mixinStr;
  }
  fs.writeFile(config.baseMixin, result, function(err) {
    if(err) {
      return console.log(err, config.baseMixin);
    }
    console.log("The file was saved!");
  });
}
function createdUsedClass(nodes, usedClasses, out) {
  let result = "";
  for (let i = 0; i < nodes.length; i++) {
    for (var j = 0; j < usedClasses.length; j++) {
      if (nodes[i].query === "." + usedClasses[j]) {
        var mixinStr = nodes[i].getMixinName();
        result = result + '\n@include ' + mixinStr + ';';
        break;
      }
    }
  }
  fs.writeFile(out, result, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!", result);
  });
}
var reduceCSS = {
  initConfig: initConfig,
  run: run,
  readBaseCSS: readBaseCSS,
  createMixinExample: createMixinExample,
  createMixin: createMixin
};
module.exports = reduceCSS;