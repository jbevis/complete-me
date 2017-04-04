import { expect } from 'chai';
import Node from '../scripts/Node'

describe('Node', () => {
  let nodeA = new Node('A');

  it('should be an instance of Node', () => {
    let node = new Node ();

    expect(node).to.be.instanceOf(Node);
  })

  it('should have a data attribute', () => {

    expect(nodeA.data).to.equal('A');
  })

  it('should have an attribute of isWord that defaults to false', () => {

    expect(nodeA.isWord).to.equal(false);
  })

  it('should have a children attribute', () => {

    expect(nodeA.children).to.deep.equal({});
  })
})
