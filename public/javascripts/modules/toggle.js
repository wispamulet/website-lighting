function toggle() {
  if (window.innerWidth > 800) {
    return;
  }

  const expanded = this.getAttribute('aria-expanded') === 'true' || false;
  this.setAttribute('aria-expanded', !expanded);
  // console.log('click');
}

export default toggle;
