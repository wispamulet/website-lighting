import '../stylus/style.styl';

import { $, $$ } from './modules/bling';
import toggle from './modules/toggle';
import slideshow from './modules/slideshow';
import initPhotoSwipeFromDOM from './modules/photoswipe';
import makeMap from './modules/map';
import { rbToggle, toTop } from './modules/toTop';
import { queryOpen, queryClose } from './modules/query';
import skype from './modules/skype';
import setDimension from './modules/about-video';
import fixNav from './modules/fixNav';

// toggle navbar button
if (window.innerWidth < 800) {
  $('header button[aria-expanded]').on('click', toggle);
  $$('header span[aria-expanded]').forEach((btn) => {
    btn.on('click', toggle);
  });
}

// fix navbar
const topOfNav = $('.nav').offsetTop; // offset top of navbar
const topOfHeader = $('header').offsetTop; // offset top of header
const heightOfHeader = $('header').offsetHeight; // height of header

window.on('scroll', () => {
  fixNav(topOfNav, topOfHeader, heightOfHeader);
});

// window.on('scroll', () => {
//   fixNavMobile(topOfNav);
// });

// slideshow
slideshow($$('.slideshow .slide'), $$('.slideshow .dots .dot'));

// photoswipe
initPhotoSwipeFromDOM('.project-gallery');
initPhotoSwipeFromDOM('.product-gallery');
initPhotoSwipeFromDOM('.intro__product-gallery');

// contact page google map
makeMap($('#map'));

// scroll to top button
window.on('scroll', () => {
  rbToggle(topOfNav);
});

$('#toTop').on('click', toTop);

// toggle query display
$$('.query__btn').forEach((btn) => {
  btn.on('click', () => {
    queryOpen($('.query-wrapper'), $('.query-overlay'));
  });
});

$('.query-overlay').on('click', () => {
  queryClose($('.query-wrapper'), $('.query-overlay'));
});

$('.query__remove').on('click', () => {
  queryClose($('.query-wrapper'), $('.query-overlay'));
});

// run skype
skype();

// set video's width and height on about-us page
setDimension($('.about__video iframe'));

// toggle support page button
$$('button[aria-controls="support-list"]').on('click', toggle);
