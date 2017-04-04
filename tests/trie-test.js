import { expect } from 'chai';
import Trie from '../scripts/Trie'
require ('locus');

describe('Trie', () => {
  let completion = new Trie ();

  it('should be an instance of a class', () => {

    expect(completion).to.be.instanceOf(Trie);
  })

  it('should have a root node', () => {

    expect(completion.root.data).to.equal(null);
    expect(completion.root.children).to.deep.equal({})
  })

  it('should be able to insert a new word into the tree', () => {
    completion.insert('art');
    // eval(locus)
    expect(completion.root.children.a.data).to.deep.equal('a')
    expect(completion.root.children.a.children.r.data).to.deep.equal('r')
  })

  it('should be able to append new nodes to existing words', () => {
    // completion.insert('art');
    expect(completion.root.children.a.children.r.children.t.children).to.deep.equal({})

    completion.insert('arts');
    expect(completion.root.children.a.children.r.children.t.children.s.data).to.deep.equal('s')
  })

  it('should be able to confirm if words have been added', () => {
    // completion.insert('art');
    expect(completion.root.children.a.children.r.children.t.isWord).to.deep.equal(true)

    // completion.insert('arts');
    expect(completion.root.children.a.children.r.children.t.children.s.isWord).to.deep.equal(true)
  })

  it('should be able to find specific nodes', () => {
    // completion.insert('art');
    let foundNode = completion.findNode('ar');

    expect(foundNode).to.equal(completion.root.children.a.children.r.address)
  })

  it('should count the number of words in the trie', () => {
    expect(completion.wordCount).to.equal(2);

    completion.insert('pizza');

    expect(completion.wordCount).to.equal(3);
  })
})
