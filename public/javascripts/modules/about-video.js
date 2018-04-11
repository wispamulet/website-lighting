function setDimension(element) {
  if (!element) return;

  const parent = element.parentElement;
  const p = 315 / 560; // default height and width
  element.width = parent.offsetWidth * 0.9;
  element.height = element.width * p;
}

export default setDimension;
