import Node from '../scripts/Node'

export default class Trie {
  constructor () {
    this.root = new Node()
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
  }

  count () {

  }

  findNode (string) {
    let currentNode = this.root;

    //enter a string
    //drill through the Trie
    //find address of node === string

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
