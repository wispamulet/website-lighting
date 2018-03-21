function scrollFunction(element) {
  // console.log('123');
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    element.classList.remove('top--hide');
  } else {
    element.classList.add('top--hide');
  }
}

function toTop() {
  // console.log(this);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export { scrollFunction, toTop };
