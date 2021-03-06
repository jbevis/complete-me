import Node from '../scripts/Node';
import fs from 'fs';
const text = "/usr/share/dict/words"

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
  }

  count () {
    let currentNode = this.root;

    const filterKeys = (currentNode) => {
      let counter = 0;

      if (currentNode.isWord) {
        counter++
      }

      if (!currentNode.children) {
        return counter;

      } else {
        Object.keys(currentNode.children).forEach(key => {
          counter += filterKeys(currentNode.children[key])
        })
      }
      return counter
    }

    return filterKeys(currentNode)
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
    var suggestionCount = suggested || [];

    if (node.isWord) {
      suggestionCount.push({word: prefix, preference: node.timesSelected})
    }

    Object.keys(node.children).forEach(key => {
      this.suggest(prefix + key, suggestionCount)
    })

    suggestionCount.sort((a, b) => {
      return b.preference - a.preference
    })

    let suggestions = suggestionCount.map (obj => {
      return obj['word']
    })

    return suggestions
  }

  populate () {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n');

    dictionary.forEach(word => {
      this.insert(word.toLowerCase())
    })
  }

  selectWord (prefix, selection) {
    let suggested = this.suggest(prefix);
    let selectedWord = suggested.find(word => {
      return word === selection
    })

    let foundNode = this.findNode(selectedWord)

    foundNode.timesSelected++;
  }
}
