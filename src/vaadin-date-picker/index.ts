import * as cheerio from 'cheerio';
import { importStyle } from '../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import * as PolymerRenderStatus from '@polymer/polymer/lib/utils/render-status';
import { component } from 'polymer3-decorators';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import '@polymer/iron-dropdown/iron-dropdown';
import '@polymer/iron-media-query/iron-media-query';
import VaadinThemableMixin from '../vaadin-themable-mixin';
import './vaadin-date-picker-overlay';
import VaadinDatePickerMixin from './vaadin-date-picker-mixin';
import './vaadin-date-picker-helper';
import '../vaadin-text-field';
import './vaadin-date-picker-styles';

import * as vaadinDatePicker from 'vaadin-date-picker/vaadin-date-picker.html';

class DatePickerElement extends VaadinThemableMixin(VaadinDatePickerMixin(PolymerGestureEventListeners(PolymerElement))) {
  static get template() {
    const domModule = cheerio.load(vaadinDatePicker)('template');
    const html = domModule.html();
    return html;
  }
  static get is() {
    return 'vaadin-date-picker';
  }
  static get properties() {
    return {
      /**
       * Set to true to disable this element.
       */
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * The error message to display when the input is invalid.
       */
      errorMessage: String,
      /**
       * A placeholder string in addition to the label. If this is set, the label will always float.
       */
      placeholder: String,
      /**
       * Set to true to make this element read-only.
       */
      readonly: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * This property is set to true when the control value invalid.
       */
      invalid: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        value: false
      },
      _userInputValue: String
    };
  }
  static get observers() {
    return [
      '_userInputValueChanged(_userInputValue)'
    ];
  }
  ready() {
    super.ready();
    // In order to have synchronized invalid property, we need to use the same validate logic.
    PolymerRenderStatus.afterNextRender(this, () => this._inputElement.validate = () => {});
  }
  _clear(e) {
    e.stopPropagation();
    this.value = '';
    this.close();
  }
  _toggle(e) {
    e.stopPropagation();
    this[this.$.dropdown.opened ? 'close' : 'open']();
  }
  _input() {
    return this.$.input;
  }
  set _inputValue(value) {
    this._inputElement.value = value;
  }
  get _inputValue() {
    return this._inputElement.value;
  }
  _getAriaExpanded(opened) {
    return Boolean(opened).toString();
  }
}
