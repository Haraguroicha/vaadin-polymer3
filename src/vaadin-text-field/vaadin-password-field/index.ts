import * as cheerio from 'cheerio';
import { importStyle } from '../../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { addListener as PolymerGesturesAddListener } from '@polymer/polymer/lib/utils/gestures';
import VaadinControlStateMixin from '../../vaadin-control-state-mixin';
import VaadinThemableMixin from '../../vaadin-themable-mixin';
import { DomModule } from '@polymer/polymer/lib/elements/dom-module';

import * as vaadinPasswordField from 'vaadin-text-field/vaadin-password-field.html';

import './vaadin-password-field-icons.scss';

const domModule = cheerio.load(vaadinPasswordField)('body');
importStyle(`<dom-module id="vaadin-password-field-default-theme" theme-for="vaadin-password-field">${domModule.find('dom-module[id="vaadin-password-field-default-theme"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-password-field-template"><template>${domModule.find('dom-module[id="vaadin-password-field-template"] template').html()}</template></dom-module>`);

import { TextFieldElement as VaadinTextFieldElement } from '../../vaadin-text-field';

@component(PasswordFieldElement.is)
class PasswordFieldElement extends VaadinTextFieldElement {
  static memoizedTemplate:any;

  static get is() {
    return 'vaadin-password-field';
  }
  static get properties() {
    return Object.assign({
      /**
       * Set to true to hide the eye icon which toggles the password visibility.
       */
      revealButtonHidden: {
        type: Boolean,
        value: false
      },
      /**
       * True if the password is visible ([type=text]).
       */
      passwordVisible: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_passwordVisibleChange',
        readOnly: true
      }
    }, super.properties);
  }
  static get template() {
    const modules = DomModule.prototype.modules;
    if (!this.memoizedTemplate) {
      // Clone the superclass template
      this.memoizedTemplate = super.template.cloneNode(true);
      // Retrieve this element's dom-module template
      const thisTemplate = DomModule.import(this.is + '-template', 'template');
      const revealButton = thisTemplate.content.querySelector('[part="reveal-button"]');
      const styles = thisTemplate.content.querySelector('style');
      // Append reveal-button and styles to the text-field template
      const inputField = this.memoizedTemplate.content.querySelector('[part="input-field"]');
      inputField.appendChild(revealButton);
      this.memoizedTemplate.content.appendChild(styles);
    }
    return this.memoizedTemplate;
  }
  ready() {
    super.ready();
    this.focusElement.type = 'password';
    this.focusElement.autocapitalize = 'off';
    this.addEventListener('blur', () => {
      this._setPasswordVisible(false);
    });
  }
  _togglePasswordVisibility() {
    this._setPasswordVisible(!this.passwordVisible);
  }
  _passwordVisibleChange(passwordVisible) {
    this.focusElement.type = passwordVisible ? 'text' : 'password';
  }
}
