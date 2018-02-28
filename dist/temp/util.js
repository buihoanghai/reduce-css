define([], function () {
  'use strict';

  String.prototype.removeComment = function () {
    var indexStart = this.indexOf('/*');
    var indexEnd = this.indexOf('*/');
    if (indexStart !== -1 && indexEnd !== -1) {
      return this.replace(this.slice(indexStart, indexEnd + 2), '');
    }
    return this.toString();
  };
});