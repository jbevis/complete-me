import Node from '../scripts/Node';
import fs from 'fs';
const text = "/usr/share/dict/words"

export default class Trie {
  constructor () {
    this.root = new Node()
    this.wordCount = 0
  }

  insert (word) {
    let currentNode = this.root;
    let letters = word.split('');

    letters.forEach(letter => {
      if (currentNode.children[letter]) {
        return currentNode = currentNode.children[letter]

      }
      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
    })
    currentNode.isWord = true;
    this.wordCount ++
  }

  count () {
    return this.wordCount;
  }

  findNode (string) {
    let currentNode = this.root;

    string.split('').forEach(letter => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
      }
    })
    return currentNode;
  }

  suggest (prefix, suggested) {
    let node = this.findNode(prefix);
    let suggestions = suggested || [];

    if (node.isWord) {
      suggestions.push(prefix)
    }

    Object.keys(node.children).forEach(key => {
      this.suggest(prefix + key, suggestions)
    })
    return suggestions
  }

  populate () {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n');

    dictionary.forEach(word => {
      this.insert(word)
    })
  }
}
