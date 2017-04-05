import { expect } from 'chai';
import Trie from '../scripts/Trie'
require ('locus');

describe('Trie', () => {

  it('should be an instance of a class', () => {
    let completion = new Trie ();

    expect(completion).to.be.instanceOf(Trie);
  })

  it('should have a root node', () => {
    let completion = new Trie ();

    expect(completion.root.data).to.equal(null);
    expect(completion.root.children).to.deep.equal({})
  })

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

  it('should be able to find specific nodes', () => {
    let completion = new Trie ();

    completion.insert('art');
    completion.insert('pizza')
    let foundNode = completion.findNode('ar');
    let foundNode2 = completion.findNode('piz')

    expect(foundNode.address).to.equal(completion.root.children.a.children.r.address)
    expect(foundNode2.address).to.equal(completion.root.children.p.children.i.children.z.address)
  })

  it('should count the number of words in the trie', () => {
    let completion = new Trie ();

    expect(completion.wordCount).to.equal(0);
    completion.insert('pizza');
    completion.insert('art');
    expect(completion.wordCount).to.equal(2);
  })

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

  it('should be able to populate a dictionary', () => {
    let completion = new Trie ();

    completion.populate();

    expect(completion.count()).to.equal(235886);
  })

  it('should be able to suggest from the new dictionary', () => {
    let completion = new Trie ();

    completion.populate();
    let pizzaSuggestions = completion.suggest('piz')

    expect(pizzaSuggestions).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
  })

  it.only('should be able to remember user selections', () => {
    let completion = new Trie ();

    completion.populate();
    let pizzaSuggestions = completion.suggest('piz');

    expect(pizzaSuggestions).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);

    completion.selectWord('piz', 'pizzeria');
    let newSuggestions = completion.suggest('piz')

    expect(newSuggestions).to.deep.equal(["pizzeria", "pize", "pizza", "pizzicato", "pizzle"]);
  })

  it.only('should be able to sort many selected words', () => {
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
})
