String.prototype.removeComment = function () {
  let indexStart = this.indexOf('/*');
  let indexEnd = this.indexOf('*/');
  if (indexStart !== -1 && indexEnd !== -1) {
    return this.replace(this.slice(indexStart, indexEnd + 2), '');
  }
  return this.toString();
}
