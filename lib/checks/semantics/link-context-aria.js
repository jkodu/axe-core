let label = node.getAttribute('aria-label');
let labelledby = node.getAttribute('aria-labelledby');
let describedby = node.getAttribute('aria-describedby');
if (label || labelledby || describedby) {
  return true;
}
return false;
