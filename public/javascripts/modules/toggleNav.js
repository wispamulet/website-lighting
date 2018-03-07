import { $ } from './bling';

const navButton = $('header button[aria-expanded]');

function toggleNav() {
  const expanded = navButton.getAttribute('aria-expanded') === 'true' || false;
  navButton.setAttribute('aria-expanded', !expanded);
}

export { navButton, toggleNav };
