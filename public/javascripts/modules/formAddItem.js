function addItem(element, html, css) {
  if (!element) return;

  const div = document.createElement('div');
  div.classList.add(css);
  div.innerHTML = html;

  element.parentNode.insertBefore(div, element);
}

function addSpecification(element) {
  const div = document.createElement('div');
  div.classList.add('form-specification');

  div.innerHTML = `
    <button class="form__remove" onclick="this.parentElement.remove()"> &times; </button>
    <label for="model_no">Model No.</label>
    <input id="model_no" type="text" name="model_no">
    <label for="power">Power (W)</label>
    <input id="power" type="text" name="power">
    <label for="base_type">Base Type</label>
    <input id="base_type" type="text" name="base_type">
    <label for="lumen">Lumens (LM)</label>
    <input id="lumen" type="text" name="lumen">
    <label for="dim_width">Width (in)</label>
    <input id="dim_width" type="text" name="dim_width">
    <label for="dim_height">Height (in)</label>
    <input id="dim_height" type="text" name="dim_height">
    <label for="dim_depth">Depth (in)</label>
    <input id="dim_depth" type="text" name="dim_depth">
    <label for="ctn_size_width">CTN Width (in)</label>
    <input id="ctn_size_width" type="text" name="ctn_size_width">
    <label for="ctn_size_height">CTN Height (in)</label>
    <input id="ctn_size_height" type="text" name="ctn_size_height">
    <label for="ctn_size_depth">CTN Depth (in)</label>
    <input id="ctn_size_depth" type="text" name="ctn_size_depth">
    <label for="ctn_quantity">CTN Quantity (pcs)</label>
    <input id="ctn_quantity" type="text" name="ctn_quantity">
    <label for="ctn_weight">CTN Weight (lbs)</label>
    <input id="ctn_weight" type="text" name="ctn_weight">
  `;

  element.parentNode.insertBefore(div, element);
}

function addBulletPoint(element) {
  const div = document.createElement('div');
  div.classList.add('form-bullet-point');

  div.innerHTML = `
    <button class="form__remove" onclick="this.parentElement.remove()"> &times; </button>
    <label for="bullet_point">Description</label>
    <input type="text" name="bullet_points">
  `;

  element.parentNode.insertBefore(div, element);
}

function addPhoto(element) {
  const div = document.createElement('div');
  div.classList.add('form-photo');

  div.innerHTML = `
    <button class="form__remove" onclick="this.parentElement.remove()"> &times; </button>
    <label for="photo">Photo</label>
    <input type="file" name="photos" accept="image/gif, image/png, image/jpeg">
    <label for="description">Description</label>
    <input type="text" name="descriptions">
  `;

  element.parentNode.insertBefore(div, element);
}

export { addItem, addSpecification, addBulletPoint, addPhoto };
