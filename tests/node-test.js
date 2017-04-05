import { expect } from 'chai';
import Node from '../scripts/Node'

describe('Testing Node class', () => {
  let nodeA = new Node('A');

  it('should be an instance of Node', () => {

    expect(nodeA).to.be.instanceOf(Node);
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

  it('should have a property of timesSelected that defaults to 0', () => {

    expect(nodeA.timesSelected).to.equal(0);
  })
})
