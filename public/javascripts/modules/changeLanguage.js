import { $, $$ } from './bling';

const links = $$('.language a');

function changeLanguage() {
  // console.log(this);
  this.classList.add('language--active');
  const otherLinks = this.parentElement.querySelectorAll('.language--inactive');
  console.log(otherLinks);
  this.classList.remove('language--inactive');
  otherLinks.forEach((link) => {
    link.classList.remove('language--active');
  });
}

export { links, changeLanguage };
