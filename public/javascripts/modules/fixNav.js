function fixNav(topOfNav, heightOfNav) {
  // console.log(topOfNav, window.scrollY);
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = `${heightOfNav}px`;
    document.body.classList.add('nav-fixed');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('nav-fixed');
  }
}

export default fixNav;
