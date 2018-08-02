/* global Skype */

// let imageSize = 24;

// if (window.innerWidth < 800) {
//   imageSize = 20;
// }

function skype() {
  console.log('skype start');
  Skype.ui({
    name: 'chat',
    element: 'SkypeButton_Call_live:newsunshine06_1',
    participants: ['live:newsunshine06'],
    imageSize: 24,
  });
}

export default skype;
