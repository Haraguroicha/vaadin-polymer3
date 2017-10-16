import * as cheerio from 'cheerio';

import '@polymer/iron-iconset-svg/iron-iconset-svg';

import * as vaadinIcons from 'vaadin-icons/vaadin-icons.html';

const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');
$_documentContainer.innerHTML = cheerio.load(vaadinIcons)('body').html();
document.head.appendChild($_documentContainer);
