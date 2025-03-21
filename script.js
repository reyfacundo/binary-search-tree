class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class Tree {
    #sort(array) {
        const arrayCopy = [...array];
        const removeDuplicates = arrayCopy.filter(
            (item, index) => arrayCopy.indexOf(item) == index
        );
        const sortedArray = removeDuplicates.sort((a, b) => a - b);
        return sortedArray;
    }
    #buildTree(array) {
        if (array.length === 0) return null;
        const mid = Math.floor((array.length - 1) / 2);
        const node = new Node(array[mid]);
        const left = this.#buildTree(array.slice(0, mid));
        node.left = left;
        const right = this.#buildTree(array.slice(mid + 1));
        node.right = right;
        return node;
    }
    constructor(arr) {
        const sortedArr = this.#sort(arr);
        this.root = this.#buildTree(sortedArr);
    }
    insert(value) {
        let root = this.root;
        if (root === null) {
            this.root = new Node(value);
            return;
        }
        let previous;
        while (root !== null) {
            previous = root;

            root = value < root.data ? root.left : root.right;

            if (value === previous.data) return "Existing value";
        }
        const newLeaf = new Node(value);
        if (value > previous.data) previous.right = newLeaf;
        else previous.left = newLeaf;
    }
    deleteItem(value, root = this.root, previousNode = this.root) {
        if (root === null) {
            return root;
        }
        if (value > root.data) {
            this.deleteItem(value, root.right, root);
        } else if (value < root.data) {
            this.deleteItem(value, root.left, root);
        } else {
            console.log(previousNode.data, "prev");
            if (root.left === null && root.right === null) {
                if (previousNode.right.data === root.data)
                    previousNode.right = null;
                else previousNode.left = null;
            }
            if (
                (root.left === null && root.right !== null) ||
                (root.right === null && root.left !== null)
            ) {
                if (root.right !== null) {
                    root.data = root.right.data;
                    root.right = null;
                } else if (root.left !== null) {
                    root.data = root.left.data;
                    root.left = null;
                }
            }
            if (root.left !== null && root.right !== null) {
                let inorder = root.right;
                while (inorder.left !== null) {
                    inorder = inorder.left;
                }
                root.data = inorder.data;
                this.deleteItem(inorder.data, root.right);
            }
            return root;
        }
    }
    find(value) {
        let root = this.root;
        console.log(root)
        while (root.data !== value) {
            // if(root.data > value) root = root.left
            // else root = root.right
            root = value < root.data ? root.left : root.right;
        }
        return root;
    }
    levelOrder(callback) {
        if (!callback) throw new Error("No callback passed");
        const queue = [this.root];
        while (queue.length != 0) {
            if (queue[0].right != null) queue.push(queue[0].right);
            if (queue[0].left != null) queue.push(queue[0].left);
            callback(queue[0]);
            queue.shift();
        }
    }
    levelOrderRecursive(callback, queue = [this.root]) {
        if (!callback) throw new Error("No callback passed");
        const queueCopy = queue;
        if (queueCopy.length != 0) {
            if (queueCopy[0].right != null) queueCopy.push(queueCopy[0].right);
            if (queueCopy[0].left != null) queueCopy.push(queueCopy[0].left);
            callback(queue[0]);
            queue.shift();
            this.levelOrderRecursive(callback, queueCopy);
        }
    }
    inOrder(callback, node = this.root) {
        if (!callback) throw new Error("No callback passed");
        if (node === null) return;
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }
    preOrder(callback, node = this.root) {
        if (!callback) throw new Error("No callback passed");
        if (node === null) return;
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }
    postOrder(callback, node = this.root) {
        if (!callback) throw new Error("No callback passed");
        if (node === null) return;
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }
    height(node) {
        if (typeof node !== "object") node = this.find(node);
        if (node === null) return -1;
        if (node.left === null && node.right === null) return 0;
        let leftHeight = this.height(node.left) + 1;
        let rightHeight = this.height(node.right) + 1;
        return Math.max(leftHeight, rightHeight);
    }
    depth(node) {
        let nodeFind = this.find(node);
        let root = this.root;
        let edges = 0;
        while (root.data !== nodeFind.data) {
            root = nodeFind.data < root.data ? root.left : root.right;
            edges += 1;
        }
        return edges;
    }
    isBalanced(node = this.root){
        if (node === null) return true;
        if (node.left === null && node.right === null) return true

            const balancedLeft = this.isBalanced(node.left);
            if(balancedLeft === false) return false
            const balancedRight = this.isBalanced(node.right);
            if(balancedRight === false) return false
            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);

        if (
            Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight) <= 1 || leftHeight === rightHeight
        ) return true
        return false
    }
    rebalance(node = this.root){

        let arr = []
        this.inOrder((node)=>{
            arr.push(node.data)
        })
        return arr
    }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const test = new Tree([1,2,3,4,5,6,7,8,9])
console.dir(prettyPrint(test.root))