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
import {
  addSpecification,
  addBulletPoint,
  addPhoto,
  addIes,
  addIst,
} from './modules/formAddItem';
import createEditor from './modules/editor';
import getNews from './modules/getNews';

// toggle navbar button
if (window.innerWidth < 800) {
  $('header button[aria-expanded]').on('click', toggle);
  $$('header span[aria-expanded]').forEach(btn => {
    btn.on('click', toggle);
  });
}

// fix navbar
const nav = $('.nav');
const topOfNav = nav.offsetTop;
const bottomOfNav = nav.offsetTop + nav.offsetHeight;
const header = $('header');
const topOfHeader = header.offsetTop;

window.on('scroll', () => {
  fixNav(bottomOfNav, topOfNav, nav, topOfHeader, header);
});

// scroll to top button
window.on('scroll', () => {
  rbToggle(topOfNav);
});

$('#toTop').on('click', toTop);

// window.on('scroll', () => {
//   fixNavMobile(topOfNav);
// });

// slideshow
slideshow($$('.slideshow .slide'), $$('.slideshow .dots .dot'));

// photoswipe
initPhotoSwipeFromDOM('.single-gallery');
initPhotoSwipeFromDOM('.project-gallery');
// initPhotoSwipeFromDOM('.product-gallery');
initPhotoSwipeFromDOM('.intro__company-gallery');
initPhotoSwipeFromDOM('.intro__product-gallery');
initPhotoSwipeFromDOM('.certificate-gallery');

// contact page google map
makeMap($('#map'), $('#map-2'));

// toggle query display
$$('.query__btn').forEach(btn => {
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

// form add specification
if ($('#add-specification')) {
  $('#add-specification').on('click', function() {
    addSpecification(this);
  });
}
// form add bullet point
if ($('#add-bullet-point')) {
  $('#add-bullet-point').on('click', function() {
    addBulletPoint(this);
  });
}
// form add photo
if ($('#add-photo')) {
  $('#add-photo').on('click', function() {
    addPhoto(this);
  });
}
// form add IES
if ($('#add-ies')) {
  $('#add-ies').on('click', function() {
    addIes(this);
  });
}
// form add IST
if ($('#add-ist')) {
  $('#add-ist').on('click', function() {
    addIst(this);
  });
}

// Editor
if ($('#news-editor')) {
  createEditor();
}

// get news article on new page
if ($('#news__article')) {
  getNews();
}
