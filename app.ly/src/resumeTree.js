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

  resumeTreeList(obj, level, makeElements, maxLevel) {
    if (typeof obj == 'object' && obj !== null) {
      let tmpResult = [];
      for (var k in obj) {
        if (makeElements) {
          tmpResult.push(this.makeElement(level, k));
        } else {
          tmpResult.push([k, level]);
        }
        if (maxLevel && level < maxLevel) {
          let subSections = this.resumeTreeList(obj[k], level + 1, makeElements, maxLevel);
          for (var x in subSections) {
            tmpResult.push(subSections[x]);
          }
        }
      }
      return tmpResult;
    } else {
      if (makeElements) {
        return [this.makeElement(level, obj)];
      } else {
        return [[obj, level]];
      }
    }
  },

  makeElement(level, text) {
    return '<div class="resume-section resume-section-' + level + '">' + text + '</div>';
  },
}
