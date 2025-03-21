Binary Search Tree implementation in JavaScript with common methods like insert, delete, search, traversals, and balance checks.

Methods:
```javascript
const tree = new Tree([array_of_numbers]);
tree.insert(value);
tree.deleteItem(value);
tree.find(value);
tree.levelOrder(callback);
tree.levelOrderRecursive(callback);
tree.inOrder(callback);
tree.preOrder(callback);
tree.postOrder(callback);
tree.height(node);
tree.depth(node);
tree.isBalanced();
tree.rebalance();
prettyPrint(tree.root);
