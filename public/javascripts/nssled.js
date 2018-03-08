import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import toggle from './modules/toggle';
import { links, changeLanguage } from './modules/changeLanguage';

$('header button[aria-expanded]').on('click', toggle);
$$('header a[aria-expanded]').forEach((btn) => {
  btn.on('click', toggle);
});

// const links = $$('.language a');
console.log(links);
links.forEach((link) => {
  link.on('click', changeLanguage);
});
