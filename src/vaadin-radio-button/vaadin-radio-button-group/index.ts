import * as cheerio from 'cheerio';
import { importStyle } from '../../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import * as PolymerGestures from '@polymer/polymer/lib/utils/gestures';
import VaadinControlStateMixin from '../../vaadin-control-state-mixin';
import VaadinThemableMixin from '../../vaadin-themable-mixin';

import * as vaadinRadioButtonGroup from 'vaadin-radio-button/vaadin-radio-button-group.html';

const domModule = cheerio.load(vaadinRadioButtonGroup)('body');
importStyle(`<dom-module id="vaadin-radio-button-group-default-theme" theme-for="vaadin-radio-button-group">${domModule.find('dom-module[id="vaadin-radio-button-group-default-theme"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-radio-button-group"><template>${domModule.find('dom-module[id="vaadin-radio-button-group"] template').html()}</template></dom-module>`);

@component(RadioButtonGroupElement.is)
class RadioButtonGroupElement extends VaadinThemableMixin(PolymerElement) {
  static get is() {
    return 'vaadin-radio-button-group';
  }
  static get properties() {
    return Object.assign({
      /**
       * The current disabled state of the radio button group. True if group and all internal radio buttons are disabled.
       */
      disabled: {
        type: Boolean,
        reflectToAttribute: true,
        observer: '_disabledChanged'
      },
      /**
       * The name of the control, which is submitted with the form data.
       */
      name: {
        type: String,
        reflectToAttribute: true
      },
      /**
       * The current required state of the radio button group. True if required.
       */
      required: {
        type: Boolean,
        reflectToAttribute: true,
        observer: '_requiredChanged'
      },
      /**
       * The value given to the data submitted with the radio button group's name to the server when the control is inside a form.
       */
      value: {
        type: String,
        notify: true,
        observer: '_valueChanged',
        reflectToAttribute: true
      },
      _checkedButton: {
        type: Object,
        observer: '_checkedButtonChanged'
      }
    }, super.properties);
  }
  ready() {
    super.ready();
    this._addActiveListeners();
    this._checkForInitialValue();
    this.addEventListener('change', e => {
      var radioButton = e.target;
      if (radioButton.checked) {
        this._setValueFromButton(radioButton);
      }
    });
    this.setAttribute('role', 'radiogroup');
  }
  _checkForInitialValue() {
    var checkedButton = this.querySelector('[checked]');
    if (checkedButton) {
      this._setValueFromButton(checkedButton);
    }
  }
  _requiredChanged(required) {
    this.setAttribute('aria-required', required);
  }
  _disabledChanged(disabled) {
    this.validate();
    this.setAttribute('aria-disabled', disabled);
    this._forEachButton(button => button.disabled = disabled);
  }
  _addActiveListeners() {
    this.addEventListener('keydown', e => {
      // if e.target is vaadin-radio-group then assign to checkedRadioButton currently checked radio button
      var checkedRadioButton = (e.target == this) ? this._checkedButton : e.target;
      if (this.disabled) {
        return;
      }
      // LEFT, UP - select previous radio button
      if (e.keyCode === 37 || e.keyCode === 38) {
        e.preventDefault();
        this._selectPreviousButton(checkedRadioButton);
      }
      // RIGHT, DOWN - select next radio button
      if (e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();
        this._selectNextButton(checkedRadioButton);
      }
    });
  }
  _selectButton(element) {
    element.focus();
    this._setValueFromButton(element);
  }
  _selectNextButton(element) {
    if (element.nextElementSibling) {
      this._selectButton(element.nextElementSibling);
    } else {
      this._selectButton(this.firstElementChild);
    }
  }
  _selectPreviousButton(element) {
    if (element.previousElementSibling) {
      this._selectButton(element.previousElementSibling);
    } else {
      this._selectButton(this.lastElementChild);
    }
  }
  _forEachButton(fn) {
    Array.from(this.children).filter(child => (child as any).localName === 'vaadin-radio-button').forEach(fn);
  }
  _setValueFromButton(button) {
    this._checkedButton = button;
    this.value = button.value;
  }
  _checkedButtonChanged(checkedButton) {
    this.validate();
    this._forEachButton(button => button.checked = button === checkedButton);
  }
  _valueChanged(value) {
    this.validate();
    var buttonWithValue = this.querySelector(`[value='${value}']`);
    if (!buttonWithValue) {
      return;
    }
    if (!this._checkedButton || this._checkedButton.value !== value) {
      buttonWithValue.setAttribute('checked', '');
    }
  }
  validate() {
    if (!this._checkedButton && this.required && !this.disabled) {
      this.setAttribute('invalid', '');
      return false;
    } else {
      this.removeAttribute('invalid');
      return true;
    }
  }
}
