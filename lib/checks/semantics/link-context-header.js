function compareLinks(a,b) {
  return (a.innerText === b.innerText && a.href !== b.href);
}
let nodesToCheck = axe.commons.dom.findElmsInBetween(node, 'h1,h2,h3,h4,h5,h6,h7,h8,h9');

for (var x = 0; x < nodesToCheck.nodes.length; x++) {
  let testElem = document.createElement('div');
  testElem.appendChild(nodesToCheck.nodes[x].cloneNode(true));
  let nodes = testElem.querySelectorAll('a[href], [role=link]');
  for (var i = 0; i < nodes.length; i++) {
    let elem = nodes[i];
    if (elem !== node) {
      if (compareLinks(elem, node)) {
        return false;
      }
    }
  }
}

if (nodesToCheck.startNode) {
  let nodes = nodesToCheck.startNode.querySelectorAll('a[href], [role=link]');
  for (var i = 0; i < nodes.length; i++) {
    let elem = nodes[i];
    if (elem !== node) {
      if (compareLinks(elem, node)) {
        return false;
      }
    }
  }
}

return true;
