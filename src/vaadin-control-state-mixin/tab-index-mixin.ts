interface IVaadinTabIndexMixin {
    connectedCallback();
    disconnectedCallback();
    ready();
}

const VaadinTabIndexMixin = superClass =>
class _VaadinTabIndexMixin extends superClass implements IVaadinTabIndexMixin {
    connectedCallback() { super.connectedCallback(); }
    disconnectedCallback() { super.disconnectedCallback(); }
    ready() { super.ready(); }

    static get template() {
      return super.template;
    }

    static get properties() {
      var properties = {
        /**
         * Internal property needed to listen to `tabindex` attribute changes.
         *
         * For changing the tabindex of this component use the native `tabIndex` propety.
         * @private
         */
        tabindex: {
          type: Number,
          value: 0,
          reflectToAttribute: true,
          observer: '_tabindexChanged'
        }
      };
      if (window['ShadyDOM']) {
        // ShadyDOM browsers need the `tabIndex` in order to notify when the user changes it programatically.
        properties['tabIndex'] = properties.tabindex;
      }
      return properties;
    }
  };

export default VaadinTabIndexMixin;
