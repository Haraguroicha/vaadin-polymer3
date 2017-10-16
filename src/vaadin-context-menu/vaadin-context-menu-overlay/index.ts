import * as cheerio from 'cheerio';
import { OverlayElement as VaadinOverlayElement } from '../../vaadin-overlay';
import { component } from 'polymer3-decorators';

@component(VaadinContextMenuOverlayElement.is)
class VaadinContextMenuOverlayElement extends VaadinOverlayElement {
  static get template() {
    const t = cheerio.load(`<div>${super.template.innerHTML}</div>`)('body');
    t.find('style')[0].childNodes[0].data += `
    /* context menu position fix */
    [part="overlay"] {
      position: absolute;
      top: 2px;
      left: 5px;
    }`;
    return t.html();
  }
  static get is() {
    return 'vaadin-context-menu-overlay';
  }
}
