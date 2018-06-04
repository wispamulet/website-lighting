function fixNav(bottomOfNav, topOfNav, nav, topofHeader, header) {
  if (window.innerWidth > 800) {
    if (window.scrollY >= bottomOfNav) {
      // console.log('> 800');
      // document.body.style.paddingTop = `${heightOfHeader}px`;
      document.body.style.paddingTop = `${nav.offsetHeight}px`;
      document.body.classList.add('nav-fixed');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('nav-fixed');
    }
  } else if (window.innerWidth <= 800) {
    if (window.scrollY >= topofHeader) {
      // console.log('< 800');
      document.body.style.paddingTop = `${header.offsetHeight}px`;
      document.body.classList.add('nav-fixed');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('nav-fixed');
    }
  }
}

export default fixNav;
