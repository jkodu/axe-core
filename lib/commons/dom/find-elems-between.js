/* global dom */

// Element.matches(selector) checks if the element matches the given selector.
// Also check for prefixed versions with different names; in IE11 this is
// necessary.
const matchesName =
  'matches' in HTMLElement.prototype ? 'matches' :
  'msMatchesSelector' in HTMLElement.prototype ? 'msMatchesSelector' :
  'webkitMatchesSelector' in HTMLElement.prototype ? 'webkitMatchesSelector' :
  'matches';

function elementMatches (el, selector) {
  return el[matchesName](selector);
}

/*
 * This function finds all nodes from starting node to the end
 * of the context element, and returns them.
 */
function getAllNextNodes (fromNode, container) {
  if (!fromNode || fromNode === container) {
    return [];
  }
  let nodes = [];
  for (let n = fromNode.nextSibling; n; n = n.nextSibling) {
    if (n.nodeType !== 1) {
      continue;
    }
    nodes.push(n);
  }
  if (fromNode.parentNode === container) {
      return nodes;
  } else {
    return nodes.concat(getAllNextNodes(fromNode.parentNode, container));
  }
}

/*
 * This function finds all nodes from starting node to the start
 * of the context element, and returns them.
 */
function getAllPrevNodes (fromNode, container) {
  if (!fromNode || fromNode === container) {
    return [];
  }
  let nodes = [];
  for (let n = fromNode.previousSibling; n; n = n.previousSibling) {
    if (n.nodeType !== 1) {
      continue;
    }
    nodes.push(n);
  }
  if (fromNode.parentNode === container) {
      return nodes;
  } else {
    return nodes.concat(getAllPrevNodes(fromNode.parentNode, container));
  }
}
/*
 * This function checks if an element contains the matching CSS qurey element
 */
function containsMatch(elemContainer, cssQuery) {
  let header = null;
  header = elemContainer.querySelector(cssQuery);
  if (header) {
    return true;
  }
  return false;
}

/*
 * This function finds the starting element and returns
 * an array containg:
 * 1: The element
 * 2: Ansestor node or same element
 * 3: All elements after the starting element. (Even elements from item 2)
 */
function findStartingElement (node, cssQuery) {
  let header = [null];
  for (let n = node.previousSibling; n; n = n.previousSibling) {
    if (n.nodeType !== 1) {
      continue;
    }
    if (elementMatches(n, cssQuery)) {
      header = [n, n];
    } else if (containsMatch(n, cssQuery)) {
      // querySelectorAll get all nodes in order of the DOM
      // So the last item in the array should be the element we are looking for
      // https://www.w3.org/TR/selectors-api/#queryselectorall
      let array = n.querySelectorAll(cssQuery);
      let element = array[array.length - 1];
      let extraNodes = getAllNextNodes(element, n);
      return [element, n, extraNodes];
    }

    if (header[0]) {
      header.push(getAllNextNodes(header[0], header[1]));
      return header;
    }
  }
  if (node.parentElement === null) {
    return [null, null, []];
  }
  return findStartingElement(node.parentElement, cssQuery);
}

/*
 * This function finds the ending element and returns
 * an array containg:
 * 1: The element
 * 2: Ansestor node or same element
 * 3: All elements before the ending element. (Even elements from item 2)
 */
function findEndingElement (node, cssQuery) {
  let header = [null];
  for (let n = node.nextSibling; n; n = n.nextSibling) {
    if (n.nodeType !== 1) {
      continue;
    }
    if (elementMatches(n, cssQuery)) {
      header = [n, n];
    } else if (containsMatch(n, cssQuery)) {
      // querySelectorAll get all nodes in order of the DOM
      // So the last item in the array should be the element we are looking for
      // https://www.w3.org/TR/selectors-api/#queryselectorall
      let array = n.querySelectorAll(cssQuery);
      let element = array[0];
      let extraNodes = getAllPrevNodes(element, n);
      return [element, n, extraNodes];
    }
    if (header[0]) {
      header.push(getAllPrevNodes(header[0], header[1]));
      return header;
    }
  }
  if (node.parentElement === null) {
    return [null, null, []];
  }
  return findEndingElement(node.parentElement, cssQuery);
}

/*
 * This function tests if an element is an child of an element.
 */
function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node !== null) {
         if (node === parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}

/**
 * Find elements before and after an given node.
 * @method findElmsInBetween
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} Node inside the before and after search.
 * @param {String} CSS selector matching the starting and end node.
 * @return {Object{Nodes, StartNode, EndNode}}
 */
 
dom.findElmsInBetween = function (node, cssQuery) {
  let prevAnsestorNode, nextAnsestorNode, searchBefore, searchAfter, allNodes = [];
  searchBefore = findStartingElement(node, cssQuery);

  prevAnsestorNode = searchBefore[1];
  allNodes = allNodes.concat(searchBefore[2]);
  searchAfter = findEndingElement(node, cssQuery);
  nextAnsestorNode = searchAfter[1];

  for (let n = prevAnsestorNode; n; n = n.nextSibling) {
    if (n.nodeType !== 1 || n === node || n === prevAnsestorNode) {
      continue;
    }
    if (nextAnsestorNode && (isDescendant(n, nextAnsestorNode) || n === nextAnsestorNode)) {
      break;
    }
    allNodes.push(n);
  }

  allNodes = allNodes.concat(searchAfter[2]);
  // window.console.log('return', node ,{'nodes': allNodes, 'startNode': searchBefore[0],'endNode': searchAfter[0]});
  return {'nodes': allNodes, 'startNode': searchBefore[0],'endNode': searchAfter[0]};
};

