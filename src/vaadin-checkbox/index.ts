import * as cheerio from 'cheerio';
import { importStyle } from '../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { addListener as PolymerGesturesAddListener } from '@polymer/polymer/lib/utils/gestures';
import VaadinControlStateMixin from '../vaadin-control-state-mixin';
import VaadinThemableMixin from '../vaadin-themable-mixin';

import * as vaadinCheckbox from 'vaadin-checkbox/vaadin-checkbox.html';

const domModule = cheerio.load(vaadinCheckbox)('body');
importStyle(`<dom-module id="vaadin-checkbox-default-theme" theme-for="vaadin-checkbox">${domModule.find('dom-module[id="vaadin-checkbox-default-theme"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-checkbox"><template>${domModule.find('dom-module[id="vaadin-checkbox"] template').html()}</template></dom-module>`);

@component(CheckboxElement.is)
class CheckboxElement extends VaadinControlStateMixin(VaadinThemableMixin(PolymerGestureEventListeners(PolymerElement))) {
  static get is() {
    return 'vaadin-checkbox';
  }
  static get properties() {
    return Object.assign({
      /**
       * True if the checkbox is checked.
       */
      checked: {
        type: Boolean,
        value: false,
        notify: true,
        observer: '_checkedChanged',
        reflectToAttribute: true
      },
      /**
       * Indeterminate state of the checkbox when it's neither checked nor unchecked, but undetermined.
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes
       */
      indeterminate: {
        type: Boolean,
        notify: true,
        observer: '_indeterminateChanged',
        reflectToAttribute: true
      },
      /**
       * The name of the control, which is submitted with the form data.
       */
      name: {
        type: String
      },
      /**
       * The value given to the data submitted with the checkbox's name to the server when the control is inside a form.
       */
      value: {
        type: String,
        value: 'on'
      }
    }, super.properties);
  }
  ready() {
    super.ready();
    this.setAttribute('role', 'checkbox');
    this.addEventListener('click', this._handleClick.bind(this));
    this._addActiveListeners();
  }
  _checkedChanged(checked) {
    if (this.indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.setAttribute('aria-checked', checked);
    }
  }
  _indeterminateChanged(indeterminate) {
    if (indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.setAttribute('aria-checked', this.checked);
    }
  }
  _addActiveListeners() {
    // DOWN
    this._addEventListenerToNode(this, 'down', (e) => {
      if (!this.disabled) {
        this.setAttribute('active', '');
      }
    });
    // UP
    this._addEventListenerToNode(this, 'up', () => this.removeAttribute('active'));
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
        this._toggleChecked();
        this.removeAttribute('active');
        if (this.indeterminate) {
          this.indeterminate = false;
        }
      }
    });
  }
  get focusElement() {
    return this.$.label;
  }
  _handleClick(e) {
    if (!this.disabled && !this.indeterminate) {
      if (e.composedPath()[0] !== this.$.nativeCheckbox) {
        e.preventDefault();
        this._toggleChecked();
      }
    }
  }
  _toggleChecked() {
    this.checked = !this.checked;
  }
}
