import * as cheerio from 'cheerio';
import { importStyle } from '../../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import VaadinThemableMixin from '../../vaadin-themable-mixin';

import * as vaadinComboBoxItem from 'vaadin-combo-box/vaadin-combo-box-item.html';

importStyle(cheerio.load(vaadinComboBoxItem)('body').html());

@component(ComboBoxItemElement.is)
class ComboBoxItemElement extends VaadinThemableMixin(PolymerElement) {
  static get is() {
    return 'vaadin-combo-box-item';
  }
  static get properties() {
    return {
      /**
       * The index of the item
       */
      index: Number,
      /**
       * The item to render
       * @type {(String|Object)}
       */
      item: Object,
      /**
       * The text label corresponding to the item
       */
      label: String,
      /**
       * True when item is selected
       */
      selected: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * True when item is focused
       */
      focused: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * The template instance corresponding to the item
       */
      _itemTemplateInstance: Object
    };
  }
  static get observers() {
    return [
      '_updateTemplateInstanceVariable("index", index, _itemTemplateInstance)',
      '_updateTemplateInstanceVariable("item", item, _itemTemplateInstance)',
      '_updateTemplateInstanceVariable("selected", selected, _itemTemplateInstance)',
      '_updateTemplateInstanceVariable("focused", focused, _itemTemplateInstance)'
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this._itemTemplateInstance) {
      // 2.0 has __dataHost. Might want to consider assigning combobox reference directly to item.
      const overlay = this.getRootNode().host; // equivalent of `this.domHost` from legacy API
      const dropdown = overlay.__dataHost;
      const comboBoxOverlay = dropdown.getRootNode().host;
      const comboBox = comboBoxOverlay.getRootNode().host;
      comboBox._ensureTemplatized();
      if (comboBox._TemplateClass) {
        this._itemTemplateInstance = new comboBox._TemplateClass({});
        this.root.removeChild(this.$.content);
        this.root.appendChild(this._itemTemplateInstance.root);
      }
    }
  }
  _updateTemplateInstanceVariable(variable, value, _itemTemplateInstance) {
    if (variable === undefined || value === undefined || _itemTemplateInstance === undefined) {
      return;
    }
    _itemTemplateInstance[variable] = value;
  }
}
