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

function fixNavMobile(topOfNav) {
  if (window.innerWidth > 800) {
    return;
  }
  console.log(window.scrollY, topOfNav);
  if (window.scrollY >= topOfNav * 2) {
    // console.log('hello');
    document.body.classList.remove('nav-fixed');
  } else {}
}

export { fixNav, fixNavMobile };
