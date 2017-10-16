import * as cheerio from 'cheerio';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { addListener as PolymerGesturesAddListener } from '@polymer/polymer/lib/utils/gestures';
import '@polymer/iron-a11y-announcer/iron-a11y-announcer';
import './vaadin-combo-box-styles';
import '../vaadin-text-field';
import VaadinControlStateMixin from '../vaadin-control-state-mixin';
import VaadinThemableMixin from '../vaadin-themable-mixin';
import VaadinComboBoxMixin from './vaadin-combo-box-mixin';
import './vaadin-combo-box-dropdown-wrapper';

import './vaadin-combo-box-light';

import * as vaadinComboBox from 'vaadin-combo-box/vaadin-combo-box.html';

@component(ComboBoxElement.is)
class ComboBoxElement extends VaadinControlStateMixin(VaadinThemableMixin(VaadinComboBoxMixin(PolymerElement))) {
  static get template() {
    const domModule = cheerio.load(vaadinComboBox)('template');
    const html = domModule.html();
    return html;
  }
  static get is() {
    return 'vaadin-combo-box';
  }
  static get properties() {
    return Object.assign({
      /**
       * The label for this element.
       */
      label: {
        type: String,
        reflectToAttribute: true
      },
      /**
       * Set to true to disable the floating label.
       */
      noLabelFloat: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true to always float the label.
       */
      alwaysFloatLabel: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true to disable this input.
       */
      disabled: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true to prevent the user from entering invalid input.
       */
      preventInvalidInput: {
        type: Boolean
      },
      /**
       * Set this to specify the pattern allowed by `preventInvalidInput`.
       */
      allowedPattern: {
        type: String
      },
      /**
       * A pattern to validate the `input` with.
       */
      pattern: {
        type: String
      },
      /**
       * The error message to display when the input is invalid.
       */
      errorMessage: {
        type: String
      },
      autofocus: {
        type: Boolean
      },
      inputmode: {
        type: String
      },
      /**
       * A placeholder string in addition to the label. If this is set, the label will always float.
       */
      placeholder: {
        type: String,
        // need to set a default so _computeAlwaysFloatLabel is run
        value: ''
      },
      readonly: {
        type: Boolean,
        value: false
      },
      size: {
        type: Number
      }
    }, super.properties);
  }
  static get observers() {
    return ['_updateAriaExpanded(opened)'];
  }
  attributeChanged(name, type) {
    // Safari has an issue with repainting shadow root element styles when a host attribute changes.
    // Need this workaround (toggle any inline css property on and off) until the issue gets fixed.
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari && this.root) {
      Array.prototype.forEach.call(this.root.querySelectorAll('*'), el => {
        el.style['-webkit-backface-visibility'] = 'visible';
        el.style['-webkit-backface-visibility'] = '';
      });
    }
  }
  ready() {
    super.ready();
    this._bindableInput = this.$.input;
    this._nativeInput = this.$.input.focusElement;
    this._toggleElement = this.$.toggleButton;
    this._clearElement = this.$.clearButton;
    this._nativeInput.setAttribute('role', 'combobox');
    this._nativeInput.setAttribute('aria-autocomplete', 'list');
    this._updateAriaExpanded();
  }
  connectedCallback() {
    super.connectedCallback();
    this._preventInputBlur();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._restoreInputBlur();
  }
  _computeAlwaysFloatLabel(alwaysFloatLabel, placeholder) {
    return placeholder || alwaysFloatLabel;
  }
  _getPositionTarget() {
    return this.$.input;
  }
  _updateAriaExpanded() {
    if (this._nativeInput) {
      this._nativeInput.setAttribute('aria-expanded', this.opened);
      this._toggleElement.setAttribute('aria-expanded', this.opened);
    }
  }
  get inputElement() {
    return this.$.input;
  }
  /**
   * Focussable element used by vaadin-control-state-mixin
   */
  get focusElement() {
    // inputElement might not be defined on property changes before ready.
    return this.inputElement || this;
  }
}
