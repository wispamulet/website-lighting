function fixNav(topOfNav, topOfHeader, heightOfHeader) {
  if (window.innerWidth > 800) {
    if (window.scrollY >= topOfNav) {
      console.log('> 800');
      document.body.style.paddingTop = `${heightOfHeader}px`;
      document.body.classList.add('nav-fixed');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('nav-fixed');
    }
  } else if (window.innerWidth <= 800) {
    if (window.scrollY >= topOfHeader) {
      console.log('< 800');
      document.body.style.paddingTop = `${heightOfHeader}px`;
      document.body.classList.add('nav-fixed');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('nav-fixed');
    }
  }
}

export default fixNav;
