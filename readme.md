##Complete Me

###Synopsis

This project is part of the Turing School of Software and Design's Front-end Engineering program for mod 2. I was tasked with creating a prefix trie data structure that could be populated with a dictionary file.

All files are written in ES6, testing was done for classes as well as individual methods on the Trie file. Trie is capable of returning all possible words within a dictionary given a starting prefix. It can also keep track of selected words and prioritize those ahead of other options.

###Code Example:

```
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
```
