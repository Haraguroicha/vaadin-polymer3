const VaadinFormElementMixin = superClass =>
class _VaadinFormElementMixin extends superClass {
  static get properties() {
    return {
      /**
       * Fired when the element is added to an `iron-form`.
       *
       * @event iron-form-element-register
       */
      /**
       * Fired when the element is removed from an `iron-form`.
       *
       * @event iron-form-element-unregister
       */
      /**
       * The form that the element is registered to.
       */
      _parentForm: {
        type: Object
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent('iron-form-element-register'), {bubbles: true});
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._parentForm) {
      var ev = new CustomEvent('iron-form-element-unregister');
      (ev as any).detail = {target: this};
      this.dispatchEvent(ev, {bubbles: true});
    }
  }
}
export default VaadinFormElementMixin;
