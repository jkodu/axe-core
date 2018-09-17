let ptag = node.closest('li');

if (ptag) {
  let nodes = ptag.querySelectorAll('a[href], [role=link]');
  for (var i = 0; i < nodes.length; i++) {
    let elem = nodes[i];
    if (elem !== node) {
      if (elem.innerText === node.innerText) {
        return false;
      }
    }
  }
}
return true;
