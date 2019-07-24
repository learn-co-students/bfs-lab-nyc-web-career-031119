function bfs(rootNode, vertices, edges){
  rootNode.distance = 0;
  let queue = [rootNode];
  let discovered = [rootNode];
  while(queue.length > 0) {
    console.log("queue: ", queue)
    let firstNode = queue.shift();
    let adjacentVerts = findAdjacent(firstNode.name, vertices, edges).filter(vert => {
      let discoveredNames = discovered.map(place => {
        return place.name
      })
      return !discoveredNames.includes(vert.name);
    });
    discovered = discovered.concat(adjacentVerts)
    console.log("adjv:", adjacentVerts)
    markDistanceAndPredecessor(firstNode, adjacentVerts);
    queue = queue.concat(adjacentVerts)
  }
  return discovered;
}

function findAdjacent(rootNode, vertices, edges) {
  let edgeList = edges.filter(ed => {
    return ed.includes(rootNode)
  });

  edgeList = edgeList.map(ed => {
    if (ed[0] === rootNode) {
      return ed[1];
    } else {
      return ed[0];
    }
  })

  let vertList = vertices.filter(vert => {
    return edgeList.includes(vert.name)
  })
  return vertList;
}

function markDistanceAndPredecessor(rootNode, adjNodes) {
  let newNodes = adjNodes.forEach(node => {
    node.distance = rootNode.distance + 1;
    node.predecessor = rootNode;
  })

  return newNodes;
}
