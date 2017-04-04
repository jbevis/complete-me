import Node from '../scripts/Node'

export default class Trie {
  constructor () {
    this.root = new Node()
    this.wordCount = 0
  }

  insert (word) {
    let currentNode = this.root;
    let letters = word.split('');
    let accumLetters = '';

    letters.forEach(letter => {
      if (currentNode.children[letter]) {
        accumLetters = accumLetters + letter;
        return currentNode = currentNode.children[letter]

      }
      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
      accumLetters = accumLetters + letter;
      currentNode.address = accumLetters;
    })
    currentNode.isWord = true;
    this.wordCount ++
  }

  count () {
    //should keep count of words in Trie
    //after word has been inserted, counter increments
    return this.wordCount;
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

  // suggest (prefix, suggested) {
  //
  //   let suggestedNode = this.findNode(prefix);
  //   var suggestions = suggested || [];
  //
  //   if (suggestedNode.isWord) {
  //     suggestions.push(suggestedNode.address)
  //   }
  //
  //   if (!suggestedNode.isWord) {
  //     let nextKeys = Object.keys(suggestedNode.children)
  //     let nextSuggestion = nextKeys.reduce((accu, key) => {
  //       accu = prefix.concat(key);
  //       return accu;
  //     }, '')
  //
  //     this.suggest(nextSuggestion, suggestions);
  //   }
  //   return suggestions
  // }

  suggest (prefix) {
    let node = this.findNode(prefix);
    let suggestions = []

    const filterKeys = (node) => {
      if (node.isWord) {
        suggestions.push(node.address)
      }

      Object.keys(node.children).forEach(key => {
        console.log(node.children[key])
        filterKeys(node.children[key])
      })
    }
    filterKeys(node)
    return suggestions
  }
}
