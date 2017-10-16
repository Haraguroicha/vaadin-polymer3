import * as cheerio from 'cheerio';
import { importStyle } from '../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { Templatize as PolymerTemplatize } from '@polymer/polymer/lib/utils/templatize';

import './vaadin-dialog-overlay';

import * as vaadindDalog from 'vaadin-dialog/vaadin-dialog.html';

const domModule = cheerio.load(vaadindDalog)('body');
importStyle(`<dom-module id="vaadin-dialog-overlay-default-theme" theme-for="vaadin-dialog-overlay">${domModule.find('dom-module[id="vaadin-dialog-overlay-default-theme"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-dialog"><template>${domModule.find('dom-module[id="vaadin-dialog"] template').html()}</template></dom-module>`);

@component(VaadinDialog.is)
class VaadinDialog extends PolymerElement {
  $:any;
  _instance;
  _contentTemplate;
  opened;
  noCloseOnOutsideClick;
  noCloseOnEsc;

  static get is() {
    return 'vaadin-dialog';
  }
  static get properties() {
    return {
      /**
       * True if the overlay is currently displayed.
       */
      opened: {
        type: Boolean,
        value: false,
        notify: true
      },
      /**
       * Set to true to disable closing dialog on outside click
       */
      noCloseOnOutsideClick: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true to disable closing dialog on Escape press
       */
      noCloseOnEsc: {
        type: Boolean,
        value: false
      },
      _contentTemplate: Object
    };
  }
  static get observers() {
    return ['_openedChanged(opened)'];
  }
  ready() {
    super.ready();
    this.$.overlay.setAttribute('role', 'dialog');
    this.$.overlay.addEventListener('vaadin-overlay-outside-click', this._handleOutsideClick.bind(this));
    this.$.overlay.addEventListener('vaadin-overlay-escape-press', this._handleEscPress.bind(this));
  }
  _openedChanged(opened) {
    if (opened && !this._instance) {
      this._contentTemplate = (this as PolymerElement).querySelector('template');
      const Templatizer = PolymerTemplatize.templatize(this._contentTemplate, this, {
        instanceProps: {
          detail: true,
          target: true
        },
        forwardHostProp: function(prop, value) {
          if (this._instance) {
            this._instance.forwardHostProp(prop, value);
          }
        }
      });
      this._instance = new Templatizer({});
      this.$.overlay.content = this._instance.root;
    }
    this.$.overlay.opened = opened;
  }
  _onOverlayOpened(e) {
    if (e.detail.value === false) {
      this.opened = false;
    }
  }
  /**
   * Close the dialog if `noCloseOnOutsideClick` isn't set to true
   */
  _handleOutsideClick(e) {
    if (this.noCloseOnOutsideClick) {
      e.preventDefault();
    }
  }
  /**
   * Close the dialog if `noCloseOnEsc` isn't set to true
   */
  _handleEscPress(e) {
    if (this.noCloseOnEsc) {
      e.preventDefault();
    }
  }
}
