import * as cheerio from 'cheerio';
import { importStyle } from '../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { addListener as PolymerGesturesAddListener } from '@polymer/polymer/lib/utils/gestures';
import VaadinControlStateMixin from '../vaadin-control-state-mixin';
import VaadinThemableMixin from '../vaadin-themable-mixin';
import VaadinFormElementMixin from './vaadin-form-element-mixin';

import * as vaadinTextField from 'vaadin-text-field/vaadin-text-field.html';

const domModule = cheerio.load(vaadinTextField)('body');
importStyle(`<dom-module id="vaadin-text-field-default-theme" theme-for="vaadin-text-field">${domModule.find('dom-module[id="vaadin-text-field-default-theme"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-text-field"><template>${domModule.find('dom-module[id="vaadin-text-field"] template').html()}</template></dom-module>`);

@component(TextFieldElement.is)
class TextFieldElement extends VaadinControlStateMixin(VaadinFormElementMixin(VaadinThemableMixin(PolymerElement))) {
  static _uniqueId;

  static get is() {
    return 'vaadin-text-field';
  }
  static get properties() {
    return Object.assign({
      /**
       * Whether the value of the control can be automatically completed by the browser.
       * List of available options at:
       * https://developer.mozilla.org/en/docs/Web/HTML/Element/input#attr-autocomplete
       */
      autocomplete: {
        type: String
      },
      /**
       * This is a property supported by Safari that is used to control whether
       * autocorrection should be enabled when the user is entering/editing the text.
       * Possible values are:
       * on: Enable autocorrection.
       * off: Disable autocorrection.
       */
      autocorrect: {
        type: String
      },
      /**
       * Error to show when the input value is invalid.
       */
      errorMessage: {
        type: String,
        value: ''
      },
      /**
       * String used for the label element.
       */
      label: {
        type: String,
        value: ''
      },
      /**
       * Identifies a list of pre-defined options to suggest to the user.
       * The value must be the id of a <datalist> element in the same document.
       */
      list: {
        type: String
      },
      /**
       * Maximum number of characters (in Unicode code points) that the user can enter.
       */
      maxlength: {
        type: Number
      },
      /**
       * Minimum number of characters (in Unicode code points) that the user can enter.
       */
      minlength: {
        type: Number
      },
      /**
       * The name of the control, which is submitted with the form data.
       */
      name: {
        type: String
      },
      /**
       * A regular expression that the value is checked against.
       * The pattern must match the entire value, not just some subset.
       */
      pattern: {
        type: String
      },
      /**
       * A hint to the user of what can be entered in the control.
       */
      placeholder: {
        type: String
      },
      /**
       * This attribute indicates that the user cannot modify the value of the control.
       */
      readonly: {
        type: Boolean
      },
      /**
       * Specifies that the user must fill in a value.
       */
      required: {
        type: Boolean
      },
      /**
       * Message to show to the user when validation fails.
       */
      title: {
        type: String
      },
      /**
       * The initial value of the control.
       * It can be used for two-way data binding.
       */
      value: {
        type: String,
        value: '',
        observer: '_valueChanged',
        notify: true
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
      /**
       * A read-only property indicating whether this input has a non empty value.
       * It can be used for example in styling of the component.
       */
      hasValue: {
        type: Boolean,
        value: false,
        notify: true,
        readOnly: true,
        reflectToAttribute: true
      },
      /**
       * When set to true, user is prevented from typing a value that
       * conflicts with the given `pattern`.
       */
      preventInvalidInput: {
        type: Boolean
      },
      _labelId: {
        type: String
      },
      _errorId: {
        type: String
      }
    }, super.properties);
  }
  get focusElement() {
    return this.shadowRoot.querySelector('[part=value]');
  }
  _onInput(e) {
    if (this.preventInvalidInput) {
      const input = this.focusElement;
      if (input.value.length > 0 && !this.checkValidity()) {
        input.value = this.value || '';
      }
    }
  }
  _valueChanged(newVal, oldVal) {
    // setting initial value to empty string, skip validation
    if (newVal === '' && oldVal === undefined) {
      return;
    }
    if (this.invalid) {
      this.validate();
    }
    this._setHasValue(newVal !== '' && newVal != null);
  }
  /**
   * Returns true if `value` is valid.
   * `<iron-form>` uses this to check the validity or all its elements.
   *
   * @return {boolean} True if the value is valid.
   */
  validate() {
    return !(this.invalid = !this.checkValidity());
  }
  _getActiveErrorId(invalid, errorMessage, errorId) {
    return errorMessage && invalid ? errorId : undefined;
  }
  _getActiveLabelId(label, labelId) {
    return label ? labelId : undefined;
  }
  /**
   * Returns true if the current input value satisfies all constraints (if any)
   */
  checkValidity() {
    if (this.required || this.pattern || this.maxlength || this.minlength) {
      return this.focusElement.checkValidity();
    } else {
      return !this.invalid;
    }
  }
  ready() {
    super.ready();
    if (!(window['ShadyCSS'] && window['ShadyCSS'].nativeCss)) {
      this.updateStyles();
    }
    var uniqueId = TextFieldElement._uniqueId = 1 + TextFieldElement._uniqueId || 0;
    this._errorId = `${(this.constructor as any).is}-error-${uniqueId}`;
    this._labelId = `${(this.constructor as any).is}-label-${uniqueId}`;
  }
  attributeChangedCallback(prop, oldVal, newVal) {
    super.attributeChangedCallback(prop, oldVal, newVal);
    // Needed until Edge has CSS Custom Properties (present in Edge Preview)
    if (!(window['ShadyCSS'] && window['ShadyCSS'].nativeCss) &&
      /^(focused|focus-ring|invalid|disabled|placeholder|has-value)$/.test(prop)) {
      this.updateStyles();
    }
    // Safari has an issue with repainting shadow root element styles when a host attribute changes.
    // Need this workaround (toggle any inline css property on and off) until the issue gets fixed.
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari && this.root) {
      const WEBKIT_PROPERTY = '-webkit-backface-visibility';
      this.root.querySelectorAll('*').forEach(el => {
        el.style[WEBKIT_PROPERTY] = 'visible';
        el.style[WEBKIT_PROPERTY] = '';
      });
    }
  }
}

import './vaadin-password-field';

export { TextFieldElement }
