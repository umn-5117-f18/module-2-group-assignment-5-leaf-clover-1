export const resumeParser = {
  resumeTree(obj, level) {
    if (typeof obj == 'object' && obj !== null) {
      let tmpResult = '';
      for (var k in obj) {
        tmpResult += this.makeElement(level, k) + this.resumeTree(obj[k],
          level + 1);
      }
      return tmpResult;
    } else {
      return this.makeElement(level, obj);
    }
  },

  resumeTreeList(obj, level) {
    if (typeof obj == 'object' && obj !== null) {
      let tmpResult = [];
      for (var k in obj) {
        tmpResult.push(this.makeElement(level, k))
        let subSections = this.resumeTreeList(obj[k], level + 1);
        for (var x in subSections) {
          tmpResult.push(subSections[x]);
        }
      }
      return tmpResult;
    } else {
      return [this.makeElement(level, obj)]
    }
  },

  makeElement(level, text) {
    return '<div class="resume-section resume-section-' + level + '">' + text + '</div>';
  },
}
