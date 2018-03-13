import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import toggle from './modules/toggle';
import slideshow from './modules/slideshow';
import { gallery, initPhotoSwipeFromDOM } from './modules/photoswipe';

$('header button[aria-expanded]').on('click', toggle);
$$('header a[aria-expanded]').forEach((btn) => {
  btn.on('click', toggle);
});

slideshow();

// gallery.init();
initPhotoSwipeFromDOM('.projects-gallery');
