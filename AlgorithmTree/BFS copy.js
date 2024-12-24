class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Insert method to add nodes to the binary tree
    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // BFS method for tree traversal
    BFS() {
        let currentNode = this.root;
        const queue = [];
        const results = [];

        if (!currentNode) return results;

        queue.push(currentNode);

        while (queue.length) {
            currentNode = queue.shift();
            results.push(currentNode.value);

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }

        return results;
    }
}

// Instantiate the tree and insert values
const myTree = new BinaryTree();
myTree.insert(47);
myTree.insert(21);
myTree.insert(76);
myTree.insert(18);
myTree.insert(27);
myTree.insert(52);
myTree.insert(82);

// Perform BFS and display the result in the HTML
const results = myTree.BFS();
const resultContainer = document.getElementById("result-container");
resultContainer.innerHTML = `<p>BFS Traversal: ${results.join(", ")}</p>`;
