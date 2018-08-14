// Deprecated code, use 'lang' variable in view engine instead
function getSiblings(elem, query) {
  const others = elem.parentElement.querySelectorAll(query);
  const result = [...others].filter(other => other !== elem);
  return result;
}

function changeLanguage() {
  this.classList.add('language--active');
  const siblings = getSiblings(this, 'a');
  siblings.forEach(sibling => {
    sibling.classList.remove('language--active');
  });
}

export default changeLanguage;
