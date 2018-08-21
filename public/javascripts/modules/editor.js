const E = require('wangeditor');

function createEditor() {
  const btnConfirm = document.querySelector('#news-editor-confirm');
  const btnClear = document.querySelector('#news-editor-clear');
  const btnJSON = document.querySelector('#news-editor-json');
  const html = document.querySelector('#news-editor-html');
  const txt = document.querySelector('#news-editor-txt');

  const editor = new E('#news-editor');
  editor.create();
  console.log('Create editor!');

  btnConfirm.addEventListener('click', () => {
    // alert(editor.txt.html());
    html.value = editor.txt.html();
    txt.value = editor.txt.text();
  });
  btnClear.addEventListener('click', () => {
    editor.txt.clear();
  });
  btnJSON.addEventListener('click', () => {
    const json = editor.txt.getJSON();
    const jsonStr = JSON.stringify(json);
    html.value = jsonStr;
  });
}

export default createEditor;
