function Attribute(name, value) {
    this.name = name.removeComment().trim();
    this.value = value.trim();
}
Attribute.parse = function (str) {
    var attr = str.split(':');
    if (attr.length === 2) {
        return new Attribute(attr[0], attr[1]);
    } else {
        return;
    }
};

module.exports = Attribute;