import TabIndexMixin from './tab-index-mixin';

const VaadinControlStateMixin = superClass =>
class _VaadinControlStateMixin extends TabIndexMixin(superClass) {
    addEventListener;
    autofocus;
    focused;
    _setFocused;
    disabled;
    setAttribute;
    removeAttribute;
    setProperties;
    _boundKeydownListener;
    _boundKeyupListener;
    _isShiftTabbing;
    _tabPressed;
    _previousTabIndex;
    tabindex;
    localName;
    tabIndex;

    static get template() {
      return super.template;
    }

    static get properties() {
      return Object.assign({
        /**
         * Specify that this control should have input focus when the page loads.
         */
        autofocus: {
          type: Boolean
        },
        /**
         * If true, the element currently has focus.
         */
        focused: {
          type: Boolean,
          value: false,
          notify: true,
          readOnly: true,
          observer: '_focusedChanged',
          reflectToAttribute: true
        },
        /**
         * Stores the previous value of tabindex attribute of the disabled element
         */
        _previousTabIndex: {
          type: Number
        },
        /**
         * If true, the user cannot interact with this element.
         */
        disabled: {
          type: Boolean,
          observer: '_disabledChanged',
          reflectToAttribute: true
        },
        _isShiftTabbing: Boolean,
      }, super.properties);
    }
    ready() {
      this.addEventListener('focusin', e => {
        if (e.composedPath()[0] === this) {
          this._focus(e);
        } else if (e.composedPath().indexOf(this.focusElement) !== -1 && !this.disabled) {
          this._setFocused(true);
        }
      });
      this.addEventListener('focusout', e => this._setFocused(false));
      // In super.ready() other 'focusin' and 'focusout' listeners might be
      // added, so we call it after our own ones to ensure they execute first.
      // Issue to watch out: when incorrect, <vaadin-combo-box> refocuses the
      // input field on iOS after “Done” is pressed.
      super.ready();
      this.addEventListener('keydown', e => {
        if (e.shiftKey && e.keyCode === 9) {
          // Flag is checked in _focus event handler.
          this._isShiftTabbing = true;
          HTMLElement.prototype.focus.apply(this);
          this._setFocused(false);
          // Event handling in IE is asynchronous and the flag is removed asynchronously as well
          setTimeout(() => this._isShiftTabbing = false, 0);
        }
      });
      if (this.autofocus && !this.focused && !this.disabled) {
        window.requestAnimationFrame(() => {
          this._focus(null);
          this._setFocused(true);
          this.setAttribute('focus-ring', '');
        });
      }
      this._boundKeydownListener = this._bodyKeydownListener.bind(this);
      this._boundKeyupListener = this._bodyKeyupListener.bind(this);
    }
    connectedCallback() {
      super.connectedCallback();
      document.body.addEventListener('keydown', this._boundKeydownListener, true);
      document.body.addEventListener('keyup', this._boundKeyupListener, true);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      document.body.removeEventListener('keydown', this._boundKeydownListener, true);
      document.body.removeEventListener('keyup', this._boundKeyupListener, true);
    }
    _focusedChanged(focused) {
      // focus-ring is true when the element was focused from the keyboard.
      // Focus Ring [A11ycasts]: https://youtu.be/ilj2P5-5CjI
      if (this.focused && this._tabPressed) {
        this.setAttribute('focus-ring', '');
      } else {
        this.removeAttribute('focus-ring');
      }
    }
    _bodyKeydownListener(e) {
      this._tabPressed = e.keyCode === 9;
    }
    _bodyKeyupListener() {
      this._tabPressed = false;
    }
    /**
     * Any element extending this mixin is required to implement this getter.
     * It returns the actual focusable element in the component.
     */
    get focusElement() {
      window.console.warn(`Please implement the 'focusElement' property in <${this.localName}>`);
      return this;
    }
    _focus(e) {
      if (this._isShiftTabbing) {
        return;
      }
      this.focusElement.focus();
      this._setFocused(true);
    }
    /**
     * Moving the focus from the host element causes firing of the blur event what leads to problems in IE.
     * @private
     */
    focus() {
      if (this.disabled) {
        return;
      }
      this.focusElement.focus();
      this._setFocused(true);
    }
    /**
     * Native bluring in the host element does nothing because it does not have the focus.
     * In chrome it works, but not in FF.
     * @private
     */
    blur() {
      this.focusElement.blur();
      this._setFocused(false);
    }
    _disabledChanged(disabled) {
      this.focusElement.disabled = disabled;
      if (disabled) {
        this.blur();
        this._previousTabIndex = this.tabindex;
        this.tabindex = -1;
        this.setAttribute('aria-disabled', 'true');
      } else {
        if (typeof this._previousTabIndex !== 'undefined') {
          this.tabindex = this._previousTabIndex;
        }
        this.removeAttribute('aria-disabled');
      }
    }
    _tabindexChanged(tabindex) {
      if (tabindex !== undefined) {
        this.focusElement.tabIndex = tabindex;
      }
      if (this.disabled && this.tabindex) {
        // If tabindex attribute was changed while checkbox was disabled
        if (this.tabindex !== -1) {
          this._previousTabIndex = this.tabindex;
        }
        this.tabindex = tabindex = undefined;
      }
      if (window['ShadyDOM']) {
        this.setProperties({tabIndex: tabindex, tabindex: tabindex});
      }
    }
};

export default VaadinControlStateMixin;
