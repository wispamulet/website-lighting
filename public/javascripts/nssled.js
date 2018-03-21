import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import toggle from './modules/toggle';
import slideshow from './modules/slideshow';
import initPhotoSwipeFromDOM from './modules/photoswipe';
import makeMap from './modules/map';
import { scrollFunction, toTop } from './modules/toTop';

// navbar toggle button
$('header button[aria-expanded]').on('click', toggle);
$$('header span[aria-expanded]').forEach((btn) => {
  btn.on('click', toggle);
});

// slideshow
slideshow($$('.slideshow .slide'), $$('.slideshow .dots .dot'));

// photoswipe
initPhotoSwipeFromDOM('.projects-gallery');
initPhotoSwipeFromDOM('.product-gallery');

// contact page google map
makeMap($('#map'));

// scroll to top button
window.onscroll = function () {
  scrollFunction($('#toTop'));
};
$('#toTop').on('click', toTop);
