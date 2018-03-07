import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import { navButton, toggleNav } from './modules/toggleNav';

navButton.on('click', toggleNav);
