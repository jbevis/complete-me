import Node from '../scripts/Node'

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
    currentNode.address = word
    this.wordCount ++
  }

  count () {
    //should keep count of words in Trie
    //after word has been inserted, counter increments
    return this.wordCount
  }

  findNode (string) {
    let currentNode = this.root;

    string.split('').forEach(letter => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
      }
    })

    if (currentNode.address === string) {
      return currentNode;
    }
  }
}
