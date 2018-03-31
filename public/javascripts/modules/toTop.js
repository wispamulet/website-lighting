function toggleToTopBtn(topOfNav) {
  if (document.body.scrollTop > topOfNav || document.documentElement.scrollTop > topOfNav) {
    document.body.classList.remove('top--hide');
  } else {
    document.body.classList.add('top--hide');
  }
}

function toTop() {
  // console.log(this);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export { toggleToTopBtn, toTop };
