function ClassReader() {
  this.getClassFromStr = function (str) {
    var result = [];
    const classes = str.split(' ');
    for(var i = 0; i<classes.length;i++) {
      const c = classes[i];
      if(c && !c.match(/[{|}|@|(|)|=]/g)){
        result.push(c);
      }
    }
    return result;
  };
  this.isStartClass = function (str) {
    if(str.slice(-7) === "class=\"" || str.slice(-7) === "class='" || str.slice(-8) === "Class= \""){
      return true;
    }
    return false;
  };
  this.isEndClass = function (str, isStart) {
    str = str.slice(-1);
    if((str === "'" || str === "\"") && isStart){
      return true;
    }
    return false;
  };
  this.parse= function (str) {
    var i =0;
    var isStart = false;
    var tempStr ="";
    var result = [];
    while(i<str.length) {
      tempStr += str[i];
      if (this.isStartClass(tempStr)) {

        isStart = true;
        tempStr = "";
      }
      if (this.isEndClass(tempStr, isStart)) {
        tempStr = tempStr.slice(0, tempStr.length - 1);
        result = result.concat(this.getClassFromStr(tempStr));
        isStart = false;
        tempStr = "";
      }
      i++;
    }
    return result;
  }
}

module.exports = ClassReader;
