import { expect } from 'chai';
import Trie from '../scripts/Trie'
require ('locus');

describe('Testing Trie class', () => {

  it('should be an instance of a class', () => {
    let completion = new Trie ();

    expect(completion).to.be.instanceOf(Trie);
  })

  it('should have a root node', () => {
    let completion = new Trie ();

    expect(completion.root.data).to.equal(null);
    expect(completion.root.children).to.deep.equal({})
  })
})

describe('Testing Trie insert method', () => {

  it('should be able to insert a new word into the tree', () => {
    let completion = new Trie ();

    completion.insert('art');
    expect(completion.root.children.a.data).to.deep.equal('a')
    expect(completion.root.children.a.children.r.data).to.deep.equal('r')
  })

  it('should be able to append new nodes to existing words', () => {
    let completion = new Trie ();

    completion.insert('art');
    expect(completion.root.children.a.children.r.children.t.children).to.deep.equal({})

    completion.insert('arts');
    expect(completion.root.children.a.children.r.children.t.children.s.data).to.deep.equal('s')
  })

  it('should be able to confirm if words have been added', () => {
    let completion = new Trie ();

    completion.insert('art');
    expect(completion.root.children.a.children.r.children.t.isWord).to.deep.equal(true)

    completion.insert('arts');
    expect(completion.root.children.a.children.r.children.t.children.s.isWord).to.deep.equal(true)
  })
})

describe('Testing Trie count method', () => {

  it('should be able to count the number of words in the trie', () => {
    let completion = new Trie ();

    completion.insert('cool');
    completion.insert('beans');
    completion.insert('banana');
    completion.insert('sandwiches');

    expect(completion.count()).to.equal(4)
  })

  it('should not count words as duplicates', () => {
    let completion = new Trie ();

    completion.insert('cool');
    completion.insert('cool');
    completion.insert('beans');

    expect(completion.count()).to.equal(2)
  })

  it('should be able to populate a dictionary', () => {
    let completion = new Trie ();

    completion.populate();

    expect(completion.count()).to.equal(234371);
  })
})

describe('Testing Trie find method', () => {

  it('should be able to find a specific node', () => {
    let completion = new Trie ();
    let word1 = 'bean';
    let location = completion.root;
    const locateNodes = (string) => {
      string.split('').forEach(letter => {
        expect(location.children[letter].data).to.equal(letter)
        location = location.children[letter]
      })
    }

    completion.insert(word1);
    locateNodes(word1);
  })
});

describe('Testing Trie suggest method', () => {

  it('should be able to suggest words', () => {
    let completion = new Trie ();

    completion.insert('pizza');

    let suggestion = completion.suggest('piz');

    expect(suggestion).to.deep.equal(['pizza']);
  })

  it('should be able to suggest words that start with the same prefix', () => {
    let completion = new Trie ();

    completion.insert('ape');
    completion.insert('apes');
    completion.insert('apex');
    completion.insert('aperture');

    let suggestion = completion.suggest('ape');

    expect(suggestion).to.deep.equal(['ape', 'apes', 'apex', 'aperture']);
  })


  it('should be able to suggest from the new dictionary', () => {
    let completion = new Trie ();

    completion.populate();
    let pizzaSuggestions = completion.suggest('piz')

    expect(pizzaSuggestions).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
  })
})

describe('Testing Trie select method', () => {

  it('should be able to remember user selections', () => {
    let completion = new Trie ();

    completion.populate();
    let pizzaSuggestions = completion.suggest('piz');

    expect(pizzaSuggestions).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);

    completion.selectWord('piz', 'pizzeria');
    let newSuggestions = completion.suggest('piz')

    expect(newSuggestions).to.deep.equal(["pizzeria", "pize", "pizza", "pizzicato", "pizzle"]);
  })

  it('should be able to sort many selected words', () => {
    let completion = new Trie ();

    completion.populate();
    let pizzaSuggestions = completion.suggest('piz');

    expect(pizzaSuggestions).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);

    completion.selectWord('piz', 'pizzeria');
    completion.selectWord('piz', 'pizzeria');
    completion.selectWord('piz', 'pizzeria');
    completion.selectWord('piz', 'pizzle');
    completion.selectWord('piz', 'pizzle');
    completion.selectWord('piz', 'pizzicato');
    let newSuggestions = completion.suggest('piz')

    expect(newSuggestions).to.deep.equal(["pizzeria", "pizzle", "pizzicato", "pize", "pizza"]);
  })

  it('should be able to sort new set of selected words', () => {
    let completion = new Trie ();

    completion.populate();
    let bananSuggestions = completion.suggest('banan');

    expect(bananSuggestions).to.deep.equal(["banana", "bananaland", "bananalander",
      "banande", "bananist", 'bananivorous']);

    completion.selectWord('banan', 'bananivorous');
    completion.selectWord('banan', 'bananivorous');
    completion.selectWord('banan', 'bananivorous');
    completion.selectWord('banan', 'banana');
    completion.selectWord('banan', 'banana');
    completion.selectWord('banan', 'bananist');
    let newSuggestions = completion.suggest('banan')

    expect(newSuggestions).to.deep.equal(['bananivorous', 'banana', 'bananist',
      "bananaland", "bananalander", "banande"]);
  })
})
