import * as cheerio from 'cheerio';
import { importStyle } from '../../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { mixinBehaviors as PolymerMixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import * as PolymerCaseMap from '@polymer/polymer/lib/utils/case-map';
import { IronA11yKeysBehavior as PolymerIronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior';
import VaadinThemableMixin from '../../vaadin-themable-mixin';
import VaadinComboBoxMixin from '../vaadin-combo-box-mixin';
import '../vaadin-combo-box-dropdown-wrapper';
import '../vaadin-combo-box-styles';

import * as vaadinComboBoxLight from 'vaadin-combo-box/vaadin-combo-box-light.html';

importStyle(cheerio.load(vaadinComboBoxLight)('body').html());

@component(ComboBoxLightElement.is)
class ComboBoxLightElement extends VaadinThemableMixin(VaadinComboBoxMixin(PolymerMixinBehaviors(PolymerIronA11yKeysBehavior, PolymerElement))) {
  static get is() {
    return 'vaadin-combo-box-light';
  }
  static get properties() {
    return Object.assign({
      /**
       * Name of the two-way data-bindable property representing the
       * value of the custom input field.
       */
      attrForValue: {
        type: String,
        value: 'value'
      },
      /**
       * Number of pixels used as the vertical offset in positioning of
       * the dropdown.
       */
      overlayVerticalOffset: {
        type: Number,
        value: 0
      },
      inputElement: {
        type: Element,
        readOnly: true
      }
    }, super.properties);
  }
  ready() {
    super.ready();
    this._toggleElement = this.querySelector('.toggle-button');
    this._clearElement = this.querySelector('.clear-button');
  }
  get focused() {
    return this.getRootNode().activeElement === this.inputElement;
  }
  connectedCallback() {
    super.connectedCallback();
    const cssSelector = 'vaadin-text-field,iron-input,paper-input,.paper-input-input,.input';
    this._setInputElement(this.querySelector(cssSelector));
    this._revertInputValue();
    this.listen(this.inputElement, 'input', '_inputValueChanged');
    this._preventInputBlur();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.unlisten(this.inputElement, 'input', '_inputValueChanged');
    this._restoreInputBlur();
  }
  get _propertyForValue() {
    return PolymerCaseMap.dashToCamelCase(this.attrForValue);
  }
  get _inputElementValue() {
    return this.inputElement && this.inputElement[this._propertyForValue];
  }
  set _inputElementValue(value) {
    if (this.inputElement) {
      this.inputElement[this._propertyForValue] = value;
    }
  }
}
