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

const allPathsFromTheTarget = (graph) => {
  let queue = new Queue();
  let numberOfVertices = graph.length - 1;
  queue.enqueue([0]);
  const tempArray = [[0]];
  const finalArray = [];

  while (!queue.isEmpty()) {
    const ele = queue.dequeue();
    if (ele[0] === 0 && ele[ele.length - 1] === numberOfVertices) {
      finalArray.push(ele);
    }
    tempArray.push([...ele]);

    if (ele.length > 0) {
      for (let u of graph[ele[[ele.length - 1]]]) {
        let temp = [...ele, u];
        queue.enqueue(temp);
      }
    }
  }
  return finalArray;
};

console.log(allPathsFromTheTarget([[1, 2], [3], [3], []]));
console.log(allPathsFromTheTarget([[4, 3, 1], [3, 2, 4], [3], [4], []]));

/**
 * Space Complexity - O(V * E)
 * Time Complexity - O(V * E)
 */
