import * as cheerio from 'cheerio';
import { importStyle } from '../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import * as PolymerGestures from '@polymer/polymer/lib/utils/gestures';
import VaadinControlStateMixin from '../vaadin-control-state-mixin';
import VaadinThemableMixin from '../vaadin-themable-mixin';

import './vaadin-radio-button-group';

import * as vaadinRadioButton from 'vaadin-radio-button/vaadin-radio-button.html';

const domModule = cheerio.load(vaadinRadioButton)('body');
importStyle(`<dom-module id="vaadin-radio-button-default-theme" theme-for="vaadin-radio-button">${domModule.find('dom-module[id="vaadin-radio-button-default-theme"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-radio-button"><template>${domModule.find('dom-module[id="vaadin-radio-button"] template').html()}</template></dom-module>`);

@component(RadioButtonElement.is)
class RadioButtonElement extends VaadinControlStateMixin(VaadinThemableMixin(PolymerGestureEventListeners(PolymerElement))) {
  static get is() {
    return 'vaadin-radio-button';
  }
  static get properties() {
    return Object.assign({
      /**
       * True if the radio button is checked.
       */
      checked: {
        type: Boolean,
        value: false,
        notify: true,
        observer: '_checkedChanged',
        reflectToAttribute: true
      },
      /**
       * The name of the control, which is submitted with the form data.
       */
      name: {
        type: String
      },
      /**
       * The value passed to `<vaadin-radio-group>` and submitted as form data.
       */
      value: {
        type: String,
        reflectToAttribute: true
      }
    }, super.properties);
  }
  ready() {
    super.ready();
    this.setAttribute('role', 'radio');
    this._addActiveListeners();
  }
  _checkedChanged(checked) {
    this.setAttribute('aria-checked', checked);
    if (checked && !this.value) {
      this.value = 'on';
    } else if (!checked && this.value == 'on') {
      this.value = undefined;
    }
    this.dispatchEvent(new CustomEvent('change', {bubbles: true}));
  }
  _addActiveListeners() {
    // DOWN
    this._addEventListenerToNode(this, 'down', (e) => {
      if (!this.disabled) {
        this.setAttribute('active', '');
      }
    });
    // UP
    this._addEventListenerToNode(this, 'up', (e) => {
      this.removeAttribute('active');
      if (!this.checked && !this.disabled) {
        this.checked = true;
      }
    });
    // KEYDOWN
    this.addEventListener('keydown', e => {
      if (!this.disabled && e.keyCode === 32) {
        e.preventDefault();
        this.setAttribute('active', '');
      }
    });
    // KEYUP
    this.addEventListener('keyup', e => {
      if (!this.disabled && e.keyCode === 32) {
        e.preventDefault();
        this.setAttribute('checked', '');
        this.removeAttribute('active');
      }
    });
  }
  get focusElement() {
    return this.$.label;
  }
  _preventDefault(e) {
    e.preventDefault();
  }
}
