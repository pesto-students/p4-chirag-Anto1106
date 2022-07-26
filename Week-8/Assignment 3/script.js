class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(data) {
    if (data) {
      this.items.push(data);
    }
  }

  dequeue() {
    if (this.items.length > 0) {
      return this.items.shift();
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const levelOrderTraversal = (root) => {
  const result = [];
  let current = root;
  let queue = new Queue();
  queue.enqueue(current);

  while (!queue.isEmpty()) {
    const currentLevel = [];
    const currentQueueLength = queue.size();

    for (let i = 0; i < currentQueueLength; i++) {
      current = queue.dequeue();
      currentLevel.push(current.data);
      if (current.left && current.left.data !== null) {
        queue.enqueue(current.left);
      }
      if (current.right && current.right.data !== null) {
        queue.enqueue(current.right);
      }
    }
    result.push(currentLevel);
  }

  return result;
};

const addTree = (arr) => {
  return addToTree(arr, 0);
};

const addToTree = (arr, i) => {
  let curr = null;
  if (i < arr.length) {
    curr = new Node(arr[i]);
    curr.left = addToTree(arr, 2 * i + 1);
    curr.right = addToTree(arr, 2 * i + 2);
  }
  return curr;
};

let root1 = addTree([1]);
let root2 = addTree([3, 9, 20, null, null, 15, 7]);
let root3 = addTree([]);

console.log(levelOrderTraversal(root1));
console.log(levelOrderTraversal(root2));
console.log(levelOrderTraversal(root3));

/**
 * Time Complexity - O(n) (As we are traversing through each element)
 * Space Complexity - O(n) (As we are using new Queue)
 */
