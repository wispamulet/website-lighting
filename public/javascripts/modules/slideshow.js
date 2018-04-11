let index = 0;

function slideshow(slides, dots) {
  if (slides.length === 0) {
    return;
  }

  slides.forEach((slide) => {
    slide.classList.remove('slide--show');
  });
  dots.forEach((dot) => {
    dot.classList.remove('dot--active');
  });

  index += 1;
  // console.log(index);
  if (index > slides.length) {
    index = 1;
  }
  slides[index - 1].classList.add('slide--show');
  dots[index - 1].classList.add('dot--active');
  setTimeout(slideshow, 3000, slides, dots);
}

export default slideshow;
