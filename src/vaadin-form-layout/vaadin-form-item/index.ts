import * as cheerio from 'cheerio';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import VaadinThemableMixin from '../../vaadin-themable-mixin';

import * as vaadinFormItem from 'vaadin-form-layout/vaadin-form-item.html';

@component(FormItemElement.is)
class FormItemElement extends VaadinThemableMixin(PolymerElement) {
  static get template() {
    const domModule = cheerio.load(vaadinFormItem)('template');
    const html = domModule.html();
    return html;
  }
  static get is() {
    return 'vaadin-form-item';
  }
  static get properties() {
    return {
    };
  }
  _onLabelClick(e) {
    // No `Array.prototype.find` in MSIE, using `filter` instead :-(
    const firstContentElementChild = Array.prototype.filter.call(
        this.$.contentSlot.assignedNodes(),
        (e) => e.nodeType === Node.ELEMENT_NODE
    )[0];
    if (firstContentElementChild) {
      firstContentElementChild.focus();
      firstContentElementChild.click();
    }
  }
}
