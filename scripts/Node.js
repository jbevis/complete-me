export default class Node {
  constructor (data = null, isWord = false) {
    this.data = data;
    this.isWord = isWord;
    this.children = {};
    this.timesSelected = 0;
  }
}
