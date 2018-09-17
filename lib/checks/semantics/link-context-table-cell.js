function testLinkText(link, container) {
  let nodes = container.querySelectorAll('a[href], [role=link]');
  for (var i = 0; i < nodes.length; i++) {
    let elem = nodes[i];
    if (elem !== link) {
      if (elem.innerText === link.innerText) {
        return false;
      }
    }
  }
  return true;
}

let tdTag = node.closest('td');
let thTag = node.closest('th');
// let table = null;
/*if (table) {
  thTag = table.querySelectorAll('th');
}*/

if (tdTag) {
  if (!testLinkText(node, tdTag)) {
    return false;
  }
}
if (thTag){
  //for (var i = 0; i < thTag.length; i++) {
    if (!testLinkText(node, thTag)) {
      return false;
    }
  //}
}
return true;
