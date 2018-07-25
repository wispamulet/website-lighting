function rbToggle(topOfNav) {
  if (
    document.body.scrollTop > topOfNav ||
    document.documentElement.scrollTop > topOfNav
  ) {
    document.body.classList.remove('rb--hide');
  } else {
    document.body.classList.add('rb--hide');
  }
}

function toTop() {
  // document.body.scrollTop = 0;
  // document.documentElement.scrollTop = 0;
  window.scroll({ top: 0, left: 0, behavior: 'smooth' }); // smooth scroll
}

export { rbToggle, toTop };
