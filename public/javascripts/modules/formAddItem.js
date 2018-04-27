function formAddItem(element) {
  const div = document.createElement('div');

  div.classList.add('form-specification');
  div.innerHTML = `
    <label for="model_no">Model No.</label>
    <input id="model_no" type="text" name="model_no">
    <label for="power">Power</label>
    <input id="power" type="text" name="power">
    <label for="base_type">Base Type</label>
    <input id="base_type" type="text" name="base_type">
    <label for="lumen">Lumens</label>
    <input id="lumen" type="text" name="lumen">
    <label for="dim">Dimensions</label>
    <input id="dim" type="text" name="dim">
    <label for="ctn_size">CTN Size</label>
    <input id="ctn_size" type="text" name="ctn_size">
    <label for="ctn_quantity">CTN Quantity</label>
    <input id="ctn_quantity" type="text" name="ctn_quantity">
    <label for="ctn_weight">CTN Weight</label>
    <input id="ctn_weight" type="text" name="ctn_weight">
  `;

  element.parentNode.insertBefore(div, element);
}

export default formAddItem;
