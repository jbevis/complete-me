import { expect } from 'chai';
import Node from '../scripts/Node'

describe('Testing Node class', () => {
  let node = new Node('a');

  it('should be an instance of Node', () => {

    expect(node).to.be.instanceOf(Node);
  })

  it('should have a data attribute', () => {

    expect(node.data).to.equal('a');
  })

  it('should have an attribute of isWord that defaults to false', () => {

    expect(node.isWord).to.equal(false);
  })

  it('should have a children attribute', () => {

    expect(node.children).to.deep.equal({});
  })

  it('should have a property of timesSelected that defaults to 0', () => {

    expect(node.timesSelected).to.equal(0);
  })
})
