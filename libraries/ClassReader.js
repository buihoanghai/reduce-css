function ClassReader(startClasses) {
	this.startClasses = startClasses || [];
	this.getClassFromStr = function (str) {
		var result = [];
		const classes = str.split(' ');
		for (var i = 0; i < classes.length; i++) {
			const c = classes[i];
			if (c && !c.match(/[{|}|@|(|)|=]/g)) {
				result.push(c);
			}
		}
		return result;
	};
	this.isStartClass = function (str) {
		let arr = ["class=\"", "class='", "Class= \"", "Class = \"", "className= \"", "className=\""];
		arr = arr.concat(this.startClasses);
		for (var i = 0; i < arr.length; i++) {
			const item = arr[i];
			if (str.slice(-item.length) === item) {
				return true;
			}
		}
		return false;
	};
	this.isEndClass = function (str, isStart) {
		str = str.slice(-1);
		if ((str === "'" || str === "\"") && isStart) {
			return true;
		}
		return false;
	};
	this.parse = function (str) {
		var i = 0;
		var isStart = false;
		var tempStr = "";
		var result = {
			classes: [],
			combineClass: []
		};
		while (i < str.length) {
			tempStr += str[i];
			if (this.isStartClass(tempStr)) {

				isStart = true;
				tempStr = "";
			}
			if (this.isEndClass(tempStr, isStart)) {
				tempStr = tempStr.slice(0, tempStr.length - 1);
				let classes = this.getClassFromStr(tempStr);
				if(classes.length > 1){
					result.combineClass.push(classes.join(' '));
				}
				result.classes = result.classes.concat(classes);
				isStart = false;
				tempStr = "";
			}
			i++;
		}
		return result;
	}
}

module.exports = ClassReader;
