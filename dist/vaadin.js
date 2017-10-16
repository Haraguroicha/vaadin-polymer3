module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("polymer3-decorators");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/polymer-element");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const importStyle = (html) => {
    const _html = document.createElement('div');
    _html.setAttribute('style', 'display: none;');
    _html.innerHTML = html;
    document.head.appendChild(_html);
};
exports.importStyle = importStyle;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dom_module_1 = __webpack_require__(14);
const VaadinThemableMixin = superClass => class _VaadinThemableMixin extends superClass {
    static get template() {
        const modules = dom_module_1.DomModule.prototype.modules;
        if (super.template && !this.hasOwnProperty('_memoizedThemableMixinTemplate')) {
            this._memoizedThemableMixinTemplate = super.template.cloneNode(true);
            let hasThemes = false;
            const defaultModuleName = this.is + '-default-theme';
            Object.keys(modules).forEach(moduleName => {
                if (moduleName !== defaultModuleName) {
                    const themeFor = modules[moduleName].getAttribute('theme-for');
                    if (themeFor) {
                        themeFor.split(' ').forEach(themeForToken => {
                            if (new RegExp('^' + themeForToken.split('*').join('.*') + '$').test(this.is)) {
                                hasThemes = true;
                                this._includeStyle(moduleName);
                            }
                        });
                    }
                }
            });
            if (!hasThemes && modules[defaultModuleName]) {
                // No theme modules found, include the default module if it exists
                this._includeStyle(defaultModuleName);
            }
        }
        return this._memoizedThemableMixinTemplate;
    }
    /** @private */
    static _includeStyle(moduleName) {
        const styleEl = document.createElement('style');
        styleEl.setAttribute('include', moduleName);
        this._memoizedThemableMixinTemplate.content.appendChild(styleEl);
    }
};
exports.default = VaadinThemableMixin;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tab_index_mixin_1 = __webpack_require__(23);
const VaadinControlStateMixin = superClass => class _VaadinControlStateMixin extends tab_index_mixin_1.default(superClass) {
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
            }
            else if (e.composedPath().indexOf(this.focusElement) !== -1 && !this.disabled) {
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
        }
        else {
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
        }
        else {
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
            this.setProperties({ tabIndex: tabindex, tabindex: tabindex });
        }
    }
};
exports.default = VaadinControlStateMixin;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/mixins/gesture-event-listeners");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/utils/templatize");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@polymer/iron-resizable-behavior/iron-resizable-behavior");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/legacy/class");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/utils/gestures");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const vaadin_control_state_mixin_1 = __webpack_require__(5);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadin_form_element_mixin_1 = __webpack_require__(29);
const vaadinTextField = __webpack_require__(30);
const domModule = cheerio.load(vaadinTextField)('body');
utils_1.importStyle(`<dom-module id="vaadin-text-field-default-theme" theme-for="vaadin-text-field">${domModule.find('dom-module[id="vaadin-text-field-default-theme"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-text-field"><template>${domModule.find('dom-module[id="vaadin-text-field"] template').html()}</template></dom-module>`);
let TextFieldElement = TextFieldElement_1 = class TextFieldElement extends vaadin_control_state_mixin_1.default(vaadin_form_element_mixin_1.default(vaadin_themable_mixin_1.default(polymer_element_1.Element))) {
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
        }
        else {
            return !this.invalid;
        }
    }
    ready() {
        super.ready();
        if (!(window['ShadyCSS'] && window['ShadyCSS'].nativeCss)) {
            this.updateStyles();
        }
        var uniqueId = TextFieldElement_1._uniqueId = 1 + TextFieldElement_1._uniqueId || 0;
        this._errorId = `${this.constructor.is}-error-${uniqueId}`;
        this._labelId = `${this.constructor.is}-label-${uniqueId}`;
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
};
TextFieldElement = TextFieldElement_1 = __decorate([
    polymer3_decorators_1.component(TextFieldElement_1.is)
], TextFieldElement);
exports.TextFieldElement = TextFieldElement;
__webpack_require__(31);
var TextFieldElement_1;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/utils/async");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const flattened_nodes_observer_1 = __webpack_require__(20);
const PolymerAsync = __webpack_require__(12);
const templatize_1 = __webpack_require__(7);
const PolymerSettings = __webpack_require__(40);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadinOverlay = __webpack_require__(41);
const domModule = cheerio.load(vaadinOverlay)('body');
utils_1.importStyle(`<dom-module id="vaadin-overlay-default-theme" theme-for="vaadin-overlay">${domModule.find('dom-module[id="vaadin-overlay-default-theme"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-overlay"><template>${domModule.find('dom-module[id="vaadin-overlay"] template').html()}</template></dom-module>`);
let OverlayElement = OverlayElement_1 = class OverlayElement extends vaadin_themable_mixin_1.default(polymer_element_1.Element) {
    constructor() {
        super();
        this._boundMouseDownListener = this._mouseDownListener.bind(this);
        this._boundMouseUpListener = this._mouseUpListener.bind(this);
        this._boundOutsideClickListener = this._outsideClickListener.bind(this);
        this._boundKeydownListener = this._keydownListener.bind(this);
        this._observer = new flattened_nodes_observer_1.FlattenedNodesObserver(this, info => {
            this._setTemplateFromNodes(info.addedNodes);
        });
        // Listener for preventing closing of the paper-dialog and all components extending `iron-overlay-behavior`.
        this._boundIronOverlayCanceledListener = e => {
            e.preventDefault();
            window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
        };
    }
    static get is() {
        return 'vaadin-overlay';
    }
    static get properties() {
        return {
            opened: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true
            },
            template: {
                type: Object,
                notify: true
            },
            content: {
                type: Object,
                notify: true
            },
            withBackdrop: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            /**
             * When true move focus to the first focusable element in the overlay,
             * or to the overlay if there are no focusable elements.
             */
            focusTrap: {
                type: Boolean,
                value: false
            },
            _focusedElement: {
                type: Object
            },
            _mouseDownInside: {
                type: Boolean
            },
            _mouseUpInside: {
                type: Boolean
            },
            _instance: {
                type: Object
            },
            _boundIronOverlayCanceledListener: {
                type: Object
            }
        };
    }
    static get observers() {
        return ['_openedChanged(opened)', '_templateChanged(template)', '_contentChanged(content)'];
    }
    ready() {
        super.ready();
        this._observer.flush();
        // Need to add dummy click listeners to this and the backdrop or else
        // the document click event listener (_outsideClickListener) may never
        // get invoked on iOS Safari (reproducible in <vaadin-dialog>
        // and <vaadin-context-menu>).
        this.addEventListener('click', () => { });
        this.$.backdrop.addEventListener('click', () => { });
    }
    _setTemplateFromNodes(nodes) {
        this.template = nodes.filter(node => node.localName && node.localName === 'template')[0] || this.template;
    }
    /**
     * @event vaadin-overlay-close
     * fired before the `vaadin-overlay` will be closed. If canceled the closing of the overlay is canceled as well.
     */
    close(sourceEvent) {
        var evt = new CustomEvent('vaadin-overlay-close', { bubbles: true, cancelable: true, detail: { sourceEvent: sourceEvent } });
        this.dispatchEvent(evt);
        if (!evt.defaultPrevented) {
            this.opened = false;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.parentNode === document.body) {
            window.addEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        // Removing the event listener in case `iron-overlay-canceled` was not fired.
        // In Shady DOM the overlay can be reattached asynchronously so we need to check that the overlay is not currently attached to body.
        if (window['ShadyDOM'] && window['ShadyDOM'].inUse) {
            if (this.parentNode !== document.body) {
                window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
            }
        }
        else {
            if (!this.parentNode) {
                window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
            }
        }
    }
    _mouseDownListener(event) {
        this._mouseDownInside = event.composedPath().indexOf(this.$.overlay) >= 0;
    }
    _mouseUpListener(event) {
        this._mouseUpInside = event.composedPath().indexOf(this.$.overlay) >= 0;
    }
    /**
     * We need to listen on 'click' / 'tap' event and capture it and close the overlay before
     * propagating the event to the listener in the button. Otherwise, if the clicked button would call
     * open(), this would happen: https://www.youtube.com/watch?v=Z86V_ICUCD4
     *
     * @event vaadin-overlay-outside-click
     * fired before the `vaadin-overlay` will be closed on outside click. If canceled the closing of the overlay is canceled as well.
     */
    _outsideClickListener(event) {
        if (event.composedPath().indexOf(this.$.overlay) !== -1 ||
            this._mouseDownInside || this._mouseUpInside) {
            this._mouseDownInside = false;
            this._mouseUpInside = false;
            return;
        }
        const evt = new CustomEvent('vaadin-overlay-outside-click', { bubbles: true, cancelable: true, detail: { sourceEvent: event } });
        this.dispatchEvent(evt);
        if (this.opened && !evt.defaultPrevented) {
            this.close(event);
        }
    }
    /**
     * @event vaadin-overlay-escape-press
     * fired before the `vaadin-overlay` will be closed on ESC button press. If canceled the closing of the overlay is canceled as well.
     */
    _keydownListener(event) {
        // TAB
        if (event.keyCode === 9 && this.focusTrap) {
            const focusableElements = this._getFocusableElements();
            const focusedElementIndex = focusableElements.indexOf(this._focusedElement);
            // Cycle to the next button
            if (!event.shiftKey) {
                this._setFocus(focusedElementIndex, 1);
                // Cycle to the prev button
            }
            else {
                this._setFocus(focusedElementIndex, -1);
            }
            event.preventDefault();
            // ESC
        }
        else if (event.keyCode === 27) {
            const evt = new CustomEvent('vaadin-overlay-escape-press', { bubbles: true, cancelable: true, detail: { sourceEvent: event } });
            this.dispatchEvent(evt);
            if (this.opened && !evt.defaultPrevented) {
                this.close(event);
            }
        }
    }
    /**
     * @event vaadin-overlay-open
     * fired after the `vaadin-overlay` is opened.
     */
    _openedChanged(opened) {
        if (opened) {
            this._placeholder = document.createComment('vaadin-overlay-placeholder');
            this.parentNode.insertBefore(this._placeholder, this);
            document.body.appendChild(this);
            document.addEventListener('mousedown', this._boundMouseDownListener);
            document.addEventListener('mouseup', this._boundMouseUpListener);
            document.addEventListener('click', this._boundOutsideClickListener, true);
            document.addEventListener('keydown', this._boundKeydownListener);
            // Set body pointer-events to 'none' to disable mouse interactions with
            // other document nodes (combo-box is "modal")
            this._previousDocumentPointerEvents = document.body.style.pointerEvents;
            document.body.style.pointerEvents = 'none';
            PolymerAsync.idlePeriod.run(() => {
                // Focus
                //  - the overlay content by default
                //  - or the first focusable element if focusTrap is true
                this._setFocus(-1, 1);
                const evt = new CustomEvent('vaadin-overlay-open', { bubbles: true });
                this.dispatchEvent(evt);
            });
        }
        else if (this._placeholder) {
            document.removeEventListener('mousedown', this._boundMouseDownListener);
            document.removeEventListener('mouseup', this._boundMouseUpListener);
            document.removeEventListener('click', this._boundOutsideClickListener, true);
            document.removeEventListener('keydown', this._boundKeydownListener);
            this._placeholder.parentNode.insertBefore(this, this._placeholder);
            this._processPendingMutationObserversFor(document.body);
            this._placeholder.parentNode.removeChild(this._placeholder);
            document.body.style.pointerEvents = this._previousDocumentPointerEvents;
        }
    }
    _templateChanged(template) {
        const Templatizer = templatize_1.Templatize.templatize(template, this, {
            forwardHostProp: function (prop, value) {
                if (this._instance) {
                    this._instance.forwardHostProp(prop, value);
                }
            }
        });
        this._instance = new Templatizer({});
        this.content = this._instance.root;
    }
    _contentChanged(content) {
        this.$.content.appendChild(content);
    }
    _setFocus(index, increment) {
        if (!this.focusTrap) {
            return;
        }
        const focusableElements = this._getFocusableElements();
        // search for visible elements and select the next possible match
        for (let i = 0; i < focusableElements.length; i++) {
            index = index + increment;
            // rollover to first item
            if (index === focusableElements.length) {
                index = 0;
                // go to last item
            }
            else if (index === -1) {
                index = focusableElements.length - 1;
            }
            // determine if element is visible
            const el = focusableElements[index];
            if (this._isVisible(el)) {
                this._focusedElement = el;
                return el.focus();
            }
        }
        // fallback if there are no focusable elements
        this._focusedElement = this.$.overlay;
        this.$.overlay.focus();
    }
    // borrowed from jqeury $(elem).is(':visible') implementation
    _isVisible(elem) {
        return elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length;
    }
    _getFocusableElements() {
        // collect all focusable elements
        const focusableElements = Array.from(this.$.content.querySelectorAll('[tabindex], button, input, select, textarea, object, iframe, label, a[href], area[href]')).filter((el) => {
            return el.getAttribute('tabindex') !== '-1';
        });
        // sort focusable elements according to tabindex
        return focusableElements.sort((_a, _b) => {
            const a = parseInt(_a.getAttribute('tabindex') || '') || 0;
            const b = parseInt(_b.getAttribute('tabindex') || '') || 0;
            if (a === b) {
                return 0;
            }
            else if (a === 0) {
                return 1;
            }
            else if (b === 0) {
                return -1;
            }
            else if (a < b) {
                return -1;
            }
            else if (a > b) {
                return 1;
            }
            return 0;
        });
    }
    _processPendingMutationObserversFor(node) {
        if (window['CustomElements'] && !PolymerSettings.useNativeCustomElements) {
            window['CustomElements'].takeRecords(node);
        }
    }
};
OverlayElement = OverlayElement_1 = __decorate([
    polymer3_decorators_1.component(OverlayElement_1.is),
    __metadata("design:paramtypes", [])
], OverlayElement);
exports.OverlayElement = OverlayElement;
var OverlayElement_1;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/elements/dom-module");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("@polymer/iron-a11y-announcer/iron-a11y-announcer");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const vaadinComboBoxStyles = __webpack_require__(28);
const styles = cheerio.load(vaadinComboBoxStyles);
utils_1.importStyle(`<style>${styles('head style').html()}</style>`);
utils_1.importStyle(styles('body').html());


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const polymer_fn_1 = __webpack_require__(34);
const templatize_1 = __webpack_require__(7);
const iron_a11y_announcer_1 = __webpack_require__(15);
const iron_a11y_keys_behavior_1 = __webpack_require__(18);
const PolymerAsync = __webpack_require__(12);
const VaadinComboBoxMixinElement = subclass => class _VaadinComboBoxMixinElement extends subclass {
    static get properties() {
        return {
            /**
             * True if the dropdown is open, false otherwise.
             */
            opened: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true,
                observer: '_openedChanged'
            },
            /**
             * Set to true to disable this element.
             */
            disabled: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            /**
             * When present, it specifies that the element field is read-only.
             */
            readonly: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            /**
             * A full set of items to filter the visible options from.
             * The items can be of either `String` or `Object` type.
             */
            items: {
                type: Array
            },
            /**
             * If `true`, the user can input a value that is not present in the items list.
             * `value` property will be set to the input value in this case.
             * Also, when `value` is set programmatically, the input value will be set
             * to reflect that value.
             */
            allowCustomValue: {
                type: Boolean,
                value: false
            },
            /**
             * A subset of items, filtered based on the user input. Filtered items
             * can be assigned directly to omit the internal filtering functionality.
             * The items can be of either `String` or `Object` type.
             */
            filteredItems: {
                type: Array
            },
            /**
             * The `String` value for the selected item of the combo box. Provides
             * the value for `iron-form`.
             *
             * When there’s no item selected, the value is an empty string.
             *
             * Use `selectedItem` property to get the raw selected item from
             * the `items` array.
             */
            value: {
                type: String,
                observer: '_valueChanged',
                notify: true,
                value: ''
            },
            /**
             * Used to detect user value changes and fire `change` events.
             */
            _lastCommittedValue: String,
            /**
             * A read-only property indicating whether this combo box has a value
             * selected or not. It can be used for example in styling of the component.
             */
            hasValue: {
                type: Boolean,
                value: false,
                readOnly: true,
                reflectToAttribute: true
            },
            /*
              * When set to `true`, "loading" attibute is added to host and the overlay element.
              */
            loading: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            _focusedIndex: {
                type: Number,
                value: -1
            },
            /**
             * Filtering string the user has typed into the input field.
             */
            filter: {
                type: String,
                value: '',
                notify: true
            },
            /**
             * The selected item from the `items` array.
             */
            selectedItem: {
                type: Object,
                notify: true
            },
            /**
             * Path for label of the item. If `items` is an array of objects, the
             * `itemLabelPath` is used to fetch the displayed string label for each
             * item.
             *
             * The item label is also used for matching items when processing user
             * input, i.e., for filtering and selecting items.
             *
             * When using item templates, the property is still needed because it is used
             * for filtering, and for displaying the selected item value in the input box.
             */
            itemLabelPath: {
                type: String,
                value: 'label'
            },
            /**
             * Path for the value of the item. If `items` is an array of objects, the
             * `itemValuePath:` is used to fetch the string value for the selected
             * item.
             *
             * The item value is used in the `value` property of the combo box,
             * to provide the form value.
             */
            itemValuePath: {
                type: String,
                value: 'value'
            },
            /**
             * Set to true to mark the input as required.
             */
            required: {
                type: Boolean,
                value: false
            },
            /**
             * The name of this element.
             */
            name: {
                type: String
            },
            /**
             * Set to true if the value is invalid.
             */
            invalid: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true,
                value: false
            },
            _toggleElement: Object,
            _clearElement: Object,
            _inputElementValue: String,
            _closeOnBlurIsPrevented: Boolean,
            _previousDocumentPointerEvents: String
        };
    }
    static get observers() {
        return [
            '_filterChanged(filter, itemValuePath, itemLabelPath)',
            '_itemsChanged(items.*, itemValuePath, itemLabelPath)',
            '_filteredItemsChanged(filteredItems.*, itemValuePath, itemLabelPath)',
            '_loadingChanged(loading)',
            '_selectedItemChanged(selectedItem)',
            '_toggleElementChanged(_toggleElement)'
        ];
    }
    ready() {
        super.ready();
        this.addEventListener('focusout', e => {
            if (!this._closeOnBlurIsPrevented) {
                this.close();
            }
        });
        this._lastCommittedValue = this.value;
        iron_a11y_announcer_1.IronA11yAnnouncer.requestAvailability();
        // 2.0 does not support 'overlay.selection-changed' syntax in listeners
        this.$.overlay.addEventListener('selection-changed', this._overlaySelectedItemChanged.bind(this));
        this.addEventListener('vaadin-combo-box-dropdown-closed', this._onClosed.bind(this));
        this.addEventListener('vaadin-combo-box-dropdown-opened', this._onOpened.bind(this));
        this.addEventListener('keydown', this._onKeyDown.bind(this));
        this.addEventListener('click', this._onClick.bind(this));
        this.$.overlay.addEventListener('vaadin-overlay-touch-start', this._onOverlayTouchStart.bind(this));
    }
    /**
     * Opens the dropdown list.
     */
    open() {
        // Prevent _open() being called when input is disabled or read-only
        if (!this.disabled && !this.readonly) {
            this.opened = true;
        }
    }
    /**
     * Closes the dropdown list.
     */
    close() {
        this.opened = false;
    }
    _openedChanged(value, old) {
        // Prevent _close() being called when opened is set to its default value (false).
        if (old === undefined) {
            return;
        }
        if (this.opened) {
            // For touch devices, we don't want to popup virtual keyboard on touch devices unless input
            // is explicitly focused by the user.
            if (!this.$.overlay.touchDevice) {
                // Check to see if there is a focused property and if it's already true.
                if (!this.focused) {
                    this.focus();
                }
            }
        }
    }
    _onOverlayTouchStart(event) {
        // On touch devices, blur the input on touch start inside the overlay, in order to hide
        // the virtual keyboard. But don't close the overlay on this blur.
        this._closeOnBlurIsPrevented = true;
        this.inputElement.blur();
        this._closeOnBlurIsPrevented = false;
    }
    _onClick(e) {
        this._closeOnBlurIsPrevented = true;
        const path = e.composedPath();
        if (path.indexOf(this._clearElement) !== -1) {
            this._clear();
        }
        else if (path.indexOf(this.inputElement) !== -1) {
            if (path.indexOf(this._toggleElement) > -1 && this.opened) {
                this.close();
            }
            else {
                this.open();
            }
        }
        this._closeOnBlurIsPrevented = false;
    }
    /**
     * Keyboard navigation
     */
    _onKeyDown(e) {
        if (this._isEventKey(e, 'down')) {
            this._closeOnBlurIsPrevented = true;
            this._onArrowDown();
            this._closeOnBlurIsPrevented = false;
            // prevent caret from moving
            e.preventDefault();
        }
        else if (this._isEventKey(e, 'up')) {
            this._closeOnBlurIsPrevented = true;
            this._onArrowUp();
            this._closeOnBlurIsPrevented = false;
            // prevent caret from moving
            e.preventDefault();
        }
        else if (this._isEventKey(e, 'enter')) {
            this._onEnter(e);
        }
        else if (this._isEventKey(e, 'esc')) {
            this._onEscape(e);
        }
    }
    _isEventKey(e, k) {
        return iron_a11y_keys_behavior_1.IronA11yKeysBehavior.keyboardEventMatchesKeys(e, k);
    }
    _getItemLabel(item) {
        return this.$.overlay.getItemLabel(item);
    }
    _getItemValue(item) {
        let value = item ? this.get(this.itemValuePath, item) : undefined;
        if (value === undefined) {
            value = item ? item.toString() : '';
        }
        return value;
    }
    _onArrowDown() {
        if (this.opened) {
            if (this.$.overlay._items) {
                this._focusedIndex = Math.min(this.$.overlay._items.length - 1, this._focusedIndex + 1);
                this._prefillFocusedItemLabel();
            }
        }
        else {
            this.open();
        }
    }
    _onArrowUp() {
        if (this.opened) {
            if (this._focusedIndex > -1) {
                this._focusedIndex = Math.max(0, this._focusedIndex - 1);
            }
            else {
                if (this.$.overlay._items) {
                    this._focusedIndex = this.$.overlay._items.length - 1;
                }
            }
            this._prefillFocusedItemLabel();
        }
        else {
            this.open();
        }
    }
    _prefillFocusedItemLabel() {
        if (this._focusedIndex > -1) {
            // Reset the input value asyncronously to prevent partial value changes
            // announce. Makes OSX VoiceOver to announce the complete value instead.
            this._inputElementValue = '';
            // 1ms delay needed for OSX VoiceOver to realise input value was reset
            setTimeout(() => {
                this._inputElementValue = this._getItemLabel(this.$.overlay._focusedItem);
                this._markAllSelectionRange();
            }, 1);
        }
    }
    _setSelectionRange(start, end) {
        // vaadin-text-field does not implement setSelectionRange, hence we need the native input
        const input = this._nativeInput || this.inputElement;
        // Setting selection range focuses and/or moves the caret in some browsers,
        // and there's no need to modify the selection range if the input isn't focused anyway.
        // This affects Safari. When the overlay is open, and then hiting tab, browser should focus
        // the next focusable element instead of the combo-box itself.
        // Checking the focused property here is enough instead of checking the activeElement.
        if (this.focused && input && input.setSelectionRange) {
            try {
                input.setSelectionRange(start, end);
            }
            catch (ignore) {
                // IE11 randomly fails when running tests in Sauce.
            }
        }
    }
    _markAllSelectionRange() {
        if (this._inputElementValue !== undefined) {
            this._setSelectionRange(0, this._inputElementValue.length);
        }
    }
    _clearSelectionRange() {
        if (this._inputElementValue !== undefined) {
            const pos = this._inputElementValue ? this._inputElementValue.length : 0;
            this._setSelectionRange(pos, pos);
        }
    }
    _onEnter(e) {
        // should close on enter when custom values are allowed, input field is cleared, or when an existing
        // item is focused with keyboard.
        if (this.opened && (this.allowCustomValue || this._inputElementValue === '' || this._focusedIndex > -1)) {
            this.close();
            // Do not submit the surrounding form.
            e.preventDefault();
        }
    }
    _onEscape(e) {
        if (this.opened) {
            this._stopPropagation(e);
            if (this._focusedIndex > -1) {
                this._focusedIndex = -1;
                this._revertInputValue();
            }
            else {
                this.cancel();
            }
        }
    }
    _toggleElementChanged(toggleElement) {
        if (toggleElement) {
            // Don't blur the input on toggle mousedown
            toggleElement.addEventListener('mousedown', e => e.preventDefault());
        }
    }
    /**
     * Clears the current value.
     */
    _clear() {
        this.selectedItem = null;
        if (this.allowCustomValue) {
            this.value = '';
        }
        if (this.opened) {
            this.close();
        }
        else {
            this._detectAndDispatchChange();
        }
    }
    /**
     * Reverts back to original value.
     */
    cancel() {
        this._revertInputValueToValue();
        // In the next _detectAndDispatchChange() call, the change detection should not pass
        this._lastCommittedValue = this.value;
        this.close();
    }
    _onOpened() {
        // Pre P2 iron-list used a debouncer to render. Now that we syncronously render items,
        // we need to flush the DOM to make sure it doesn't get flushed in the middle of _render call
        // because that will cause problems to say the least.
        polymer_fn_1.Polymer.flush && polymer_fn_1.Polymer.flush();
        this.$.overlay.hidden = !this._hasItems(this.$.overlay._items) && !this.loading;
        // With iron-list v1.3.9, calling `notifyResize()` no longer renders
        // the items synchonously. It is required to have the items rendered
        // before we update the overlay and the list positions and sizes.
        this.$.overlay.ensureItemsRendered();
        // Ensure metrics are up-to-date
        this.$.overlay.updateViewportBoundaries();
        PolymerAsync.microTask.run(() => this.$.overlay.adjustScrollPosition());
        setTimeout(() => this.$.overlay.$.dropdown.notifyResize(), 1);
        // _detectAndDispatchChange() should not consider value changes done before opening
        this._lastCommittedValue = this.value;
    }
    _onClosed() {
        // Happens when the overlay is closed by clicking outside
        if (this.opened) {
            this.close();
        }
        if (this.$.overlay._items && this._focusedIndex > -1) {
            const focusedItem = this.$.overlay._items[this._focusedIndex];
            if (this.selectedItem !== focusedItem) {
                this.selectedItem = focusedItem;
            }
            // make sure input field is updated in case value doesn't change (i.e. FOO -> foo)
            this._inputElementValue = this._getItemLabel(this.selectedItem);
        }
        else if (this._inputElementValue === '' || this._inputElementValue === undefined) {
            this._clear();
        }
        else {
            if (this.allowCustomValue) {
                const e = new CustomEvent('custom-value-set', { detail: this._inputElementValue, composed: true, cancelable: true, bubbles: true });
                this.dispatchEvent(e);
                if (!e.defaultPrevented) {
                    const customValue = this._inputElementValue;
                    this.selectedItem = null;
                    this.value = customValue;
                }
            }
            else {
                this._inputElementValue = this._getItemLabel(this.selectedItem);
            }
        }
        this._detectAndDispatchChange();
        this._clearSelectionRange();
        this.filter = '';
    }
    /**
     *  Filtering and items handling
     */
    _inputValueChanged(e) {
        // Handle only input events from our inputElement.
        if (e.composedPath().indexOf(this.inputElement) !== -1) {
            this._inputElementValue = this.inputElement.value;
            this._filterFromInput(this); //
        }
    }
    _filterFromInput(e) {
        if (!this.opened) {
            this.open();
        }
        if (this.filter === this._inputElementValue) {
            // Filter and input value might get out of sync, while keyboard navigating for example.
            // Afterwards, input value might be changed to the same value as used in filtering.
            // In situation like these, we need to make sure all the filter changes handlers are run.
            this._filterChanged(this.filter, this.itemValuePath, this.itemLabelPath);
        }
        else {
            this.filter = this._inputElementValue;
        }
    }
    _filterChanged(filter, itemValuePath, itemLabelPath) {
        if (filter === undefined || itemValuePath === undefined || itemLabelPath === undefined) {
            return;
        }
        if (this.items) {
            this.filteredItems = this._filterItems(this.items, filter);
        }
        else {
            // With certain use cases (e. g., external filtering), `items` are
            // undefined. Filtering is unnecessary per se, but the filteredItems
            // observer should still be invoked to update focused item.
            this._filteredItemsChanged({ path: 'filteredItems' }, itemValuePath, itemLabelPath);
        }
    }
    _loadingChanged(loading) {
        if (loading) {
            this._focusedIndex = -1;
        }
    }
    _revertInputValue() {
        if (this.filter !== '') {
            this._inputElementValue = this.filter;
        }
        else {
            this._revertInputValueToValue();
        }
        this._clearSelectionRange();
    }
    _revertInputValueToValue() {
        if (this.allowCustomValue && !this.selectedItem) {
            this._inputElementValue = this.value;
        }
        else {
            this._inputElementValue = this._getItemLabel(this.selectedItem);
        }
    }
    _selectedItemChanged(selectedItem) {
        if (!this.filteredItems) {
            return;
        }
        if (selectedItem === null || selectedItem === undefined) {
            if (!this.allowCustomValue) {
                this.value = '';
            }
            this._setHasValue(this.value !== '');
            this._inputElementValue = this.value;
        }
        else {
            const value = this._getItemValue(selectedItem);
            if (this.value !== value) {
                this.value = value;
            }
            this._setHasValue(true);
            this._inputElementValue = this._getItemLabel(selectedItem);
            // Could not be defined in 1.x because ready is called after all prop-setters
            if (this.inputElement) {
                this.inputElement.value = this._inputElementValue;
            }
        }
        this.$.overlay._selectedItem = selectedItem;
        this._focusedIndex = this.filteredItems.indexOf(selectedItem);
    }
    _valueChanged(value) {
        if (this._isValidValue(value)) {
            let item;
            if (this._getItemValue(this.selectedItem) !== value) {
                const valueIndex = this._indexOfValue(value, this.filteredItems);
                this.selectedItem = valueIndex >= 0 ? this.filteredItems[valueIndex] : null;
            }
            else {
                item = this.selectedItem;
            }
            if (!item && this.allowCustomValue) {
                this._inputElementValue = value;
            }
            this._setHasValue(this.value !== '');
        }
        else {
            this.selectedItem = null;
        }
        // In the next _detectAndDispatchChange() call, the change detection should pass
        this._lastCommittedValue = undefined;
    }
    _detectAndDispatchChange() {
        if (this.value !== this._lastCommittedValue) {
            this.dispatchEvent(new CustomEvent('change', { composed: true, bubbles: true }));
            this._lastCommittedValue = this.value;
        }
    }
    _itemsChanged(e, itemValuePath, itemLabelPath) {
        if (e === undefined || itemValuePath === undefined || itemLabelPath === undefined) {
            return;
        }
        if (e.path === 'items' || e.path === 'items.splices') {
            this.filteredItems = this.items ? this.items.slice(0) : this.items;
            const valueIndex = this._indexOfValue(this.value, this.items);
            this._focusedIndex = valueIndex;
            const item = valueIndex > -1 && this.items[valueIndex];
            if (item) {
                this.selectedItem = item;
            }
        }
    }
    _filteredItemsChanged(e, itemValuePath, itemLabelPath) {
        if (e === undefined || itemValuePath === undefined || itemLabelPath === undefined) {
            return;
        }
        if (e.path === 'filteredItems' || e.path === 'filteredItems.splices') {
            this._setOverlayItems(this.filteredItems);
            this._focusedIndex = this.opened ?
                this.$.overlay.indexOfLabel(this.filter) :
                this._indexOfValue(this.value, this.filteredItems);
            // async needed to reposition correctly after filtering
            // (especially when aligned on top of input)
            setTimeout(() => {
                this.$.overlay.$.dropdown.notifyResize();
            }, 1);
        }
    }
    _filterItems(arr, filter) {
        if (!arr) {
            return arr;
        }
        return arr.filter(item => {
            filter = filter ? filter.toString().toLowerCase() : '';
            // Check if item contains input value.
            return this._getItemLabel(item).toString().toLowerCase().indexOf(filter) > -1;
        });
    }
    _setOverlayItems(items) {
        this.$.overlay.set('_items', items);
        this.$.overlay.hidden = !this._hasItems(items);
        this.$.overlay.$.dropdown.notifyResize();
    }
    _hasItems(array) {
        return array && array.length;
    }
    _indexOfValue(value, items) {
        if (items && this._isValidValue(value)) {
            for (let i = 0; i < items.length; i++) {
                if (this._getItemValue(items[i]) === value) {
                    return i;
                }
            }
        }
        return -1;
    }
    /**
     * Checks if the value is supported as an item value in this control.
     *
     * @return {boolean}
     */
    _isValidValue(value) {
        return value !== undefined && value !== null;
    }
    _overlaySelectedItemChanged(e) {
        if (this.selectedItem !== e.detail.item) {
            this.selectedItem = e.detail.item;
        }
        if (this.opened) {
            this.close();
        }
        // stop this private event from leaking outside.
        e.stopPropagation();
    }
    /**
     * Returns true if `value` is valid, and sets the `invalid` flag appropriatelly.
     *
     * @return {boolean} True if the value is valid and sets the `invalid` flag appropriatelly
     */
    validate(value) {
        return !(this.invalid = !this.checkValidity(value));
    }
    /**
     * Returns true if the current input value satisfies all constraints (if any)
     *
     * You can override the `checkValidity` method for custom validations.
     */
    checkValidity(value) {
        if (this._bindableInput.validate) {
            return this._bindableInput.validate();
        }
    }
    get _instanceProps() {
        return {
            item: true,
            index: true,
            selected: true,
            focused: true
        };
    }
    _ensureTemplatized() {
        if (!this._TemplateClass) {
            const tpl = super.querySelector('template');
            if (tpl) {
                this._TemplateClass = templatize_1.Templatize.templatize(tpl, this, {
                    instanceProps: this._instanceProps,
                    forwardHostProp: function (prop, value) {
                        const items = this.$.overlay._selector.querySelectorAll('vaadin-combo-box-item');
                        console.log('ensure', this.$.overlay, this.$.overlay._selector);
                        Array.prototype.forEach.call(items, item => {
                            if (item._itemTemplateInstance) {
                                item._itemTemplateInstance.set(prop, value);
                                item._itemTemplateInstance.notifyPath(prop, value, true);
                            }
                        });
                    }
                });
            }
        }
    }
    _preventInputBlur() {
        if (this._toggleElement) {
            this._toggleElement.addEventListener('click', this._preventDefault);
        }
        if (this._clearElement) {
            this._clearElement.addEventListener('click', this._preventDefault);
        }
    }
    _restoreInputBlur() {
        if (this._toggleElement) {
            this._toggleElement.removeEventListener('click', this._preventDefault);
        }
        if (this._clearElement) {
            this._clearElement.removeEventListener('click', this._preventDefault);
        }
    }
    _preventDefault(e) {
        e.preventDefault();
    }
    _stopPropagation(e) {
        e.stopPropagation();
    }
};
exports.default = VaadinComboBoxMixinElement;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(8);
__webpack_require__(37);
__webpack_require__(39);
const vaadinComboBoxDropdownWrapper = __webpack_require__(43);
let ComboBoxOverlayElement = ComboBoxOverlayElement_1 = class ComboBoxOverlayElement extends polymer_element_1.Element {
    static get template() {
        const domModule = cheerio.load(vaadinComboBoxDropdownWrapper)('template');
        const html = domModule.html();
        return html;
    }
    static get is() {
        return 'vaadin-combo-box-dropdown-wrapper';
    }
    static get properties() {
        return {
            /**
             * True if the device supports touch events.
             */
            touchDevice: {
                type: Boolean,
                reflectToAttribute: true,
                value: () => {
                    try {
                        document.createEvent('TouchEvent');
                        return true;
                    }
                    catch (e) {
                        return false;
                    }
                }
            },
            opened: Boolean,
            /*
              * `true` when new items are being loaded.
              */
            loading: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_setOverlayHeight'
            },
            /**
             * Vertical offset for the overlay position.
             */
            verticalOffset: {
                type: Number,
                value: 0
            },
            _selectedItem: {
                type: Object
            },
            _items: {
                type: Object
            },
            _focusedIndex: {
                type: Number,
                notify: true,
                value: -1,
                observer: '_focusedIndexChanged'
            },
            _focusedItem: {
                type: String,
                computed: '_getFocusedItem(_focusedIndex)'
            },
            _itemLabelPath: {
                type: String,
                value: 'label'
            },
            _itemValuePath: {
                type: String,
                value: 'value'
            },
            _selector: Object
        };
    }
    static get observers() {
        return ['_selectorChanged(_selector)', '_loadingChanged(loading)'];
    }
    ready() {
        super.ready();
        // IE11: when scrolling with mouse, the focus goes to the scroller.
        // This causes the overlay closing due to defocusing the input field.
        // Prevent focusing the scroller by setting `unselectable="on"`.
        if (/Trident/.test(navigator.userAgent)) {
            this._scroller.setAttribute('unselectable', 'on');
        }
        this.$.dropdown.$.overlay.addEventListener('touchstart', sourceEvent => {
            const evt = new CustomEvent('vaadin-overlay-touch-start', { detail: { sourceEvent: sourceEvent } });
            this.dispatchEvent(evt);
        });
        // Prevent blurring the input when clicking inside the overlay.
        this.$.dropdown.$.overlay.addEventListener('mousedown', e => e.preventDefault());
    }
    _templateChanged(e) {
        this._selector = this.$.dropdown.$.overlay.$.content.querySelector('#selector');
        this._scroller = this.$.dropdown.$.overlay.$.content.querySelector('#scroller');
    }
    _loadingChanged(loading) {
        if (loading) {
            this.$.dropdown.$.overlay.setAttribute('loading', '');
        }
        else {
            this.$.dropdown.$.overlay.removeAttribute('loading');
        }
    }
    _selectorChanged(selector) {
        this._patchWheelOverScrolling();
    }
    _setOverlayHeight() {
        if (!this.positionTarget || !this._selector) {
            return;
        }
        const targetRect = this.positionTarget.getBoundingClientRect();
        this._scroller.style.maxHeight = (window['ShadyCSS'] ?
            window['ShadyCSS'].getComputedStyleValue(this, '--vaadin-combo-box-overlay-max-height') :
            getComputedStyle(this).getPropertyValue('--vaadin-combo-box-overlay-max-height')) || '65vh';
        // overlay max height is restrained by the #scroller max height which is set to 65vh in CSS.
        this.$.dropdown.$.overlay.style.maxHeight = this._maxOverlayHeight(targetRect);
        // we need to set height for iron-list to make its `firstVisibleIndex` work correctly.
        this._selector.style.maxHeight = this._maxOverlayHeight(targetRect);
        this.updateViewportBoundaries();
    }
    _maxOverlayHeight(targetRect) {
        const margin = 8;
        const minHeight = 116; // Height of two items in combo-box
        const bottom = Math.min(window.innerHeight, document.body.scrollHeight - document.body.scrollTop);
        if (this.$.dropdown.alignedAbove) {
            return Math.max(targetRect.top - margin + Math.min(document.body.scrollTop, 0), minHeight) + 'px';
        }
        else {
            return Math.max(bottom - targetRect.bottom - margin, minHeight) + 'px';
        }
    }
    _getFocusedItem(focusedIndex) {
        if (focusedIndex >= 0) {
            return this._items[focusedIndex];
        }
    }
    _isItemSelected(item, selectedItem) {
        return item === selectedItem;
    }
    _onItemClick(e) {
        if (e.detail && e.detail.sourceEvent && e.detail.sourceEvent.stopPropagation) {
            this._stopPropagation(e.detail.sourceEvent);
        }
        this.dispatchEvent(new CustomEvent('selection-changed', { detail: { item: e.model.item } }));
    }
    /**
     * Gets the index of the item with the provided label.
     * @return {Number}
     */
    indexOfLabel(label) {
        if (this._items && label) {
            for (let i = 0; i < this._items.length; i++) {
                if (this.getItemLabel(this._items[i]).toString().toLowerCase() ===
                    label.toString().toLowerCase()) {
                    return i;
                }
            }
        }
        return -1;
    }
    /**
     * Gets the label string for the item based on the `_itemLabelPath`.
     * @return {String}
     */
    getItemLabel(item) {
        let label = item ? this.get(this._itemLabelPath, item) : undefined;
        if (label === undefined) {
            label = item ? item.toString() : '';
        }
        return label;
    }
    _isItemFocused(focusedIndex, itemIndex) {
        return focusedIndex == itemIndex;
    }
    _getAriaSelected(focusedIndex, itemIndex) {
        return this._isItemFocused(focusedIndex, itemIndex).toString();
    }
    _getAriaRole(itemIndex) {
        return itemIndex !== undefined ? 'option' : false;
    }
    _focusedIndexChanged(index) {
        if (index >= 0) {
            this._scrollIntoView(index);
        }
    }
    _scrollIntoView(index) {
        const visibleItemsCount = this._visibleItemsCount();
        if (visibleItemsCount === undefined) {
            // Scroller is not visible. Moving is unnecessary.
            return;
        }
        let targetIndex = index;
        if (index > this._selector.lastVisibleIndex - 1) {
            // Index is below the bottom, scrolling down. Make the item appear at the bottom.
            targetIndex = index - visibleItemsCount + 1;
        }
        else if (index > this._selector.firstVisibleIndex) {
            // The item is already visible, scrolling is unnecessary per se. But we need to trigger iron-list to set
            // the correct scrollTop on the scrollTarget. Scrolling to firstVisibleIndex.
            targetIndex = this._selector.firstVisibleIndex;
        }
        this._selector.scrollToIndex(Math.max(0, targetIndex));
        // Sometimes the item is partly below the bottom edge, detect and adjust.
        const pidx = this._selector._getPhysicalIndex(index), physicalItem = this._selector._physicalItems[pidx];
        if (!physicalItem) {
            return;
        }
        const physicalItemRect = physicalItem.getBoundingClientRect(), scrollerRect = this._scroller.getBoundingClientRect(), scrollTopAdjust = physicalItemRect.bottom - scrollerRect.bottom + this._viewportTotalPaddingBottom;
        if (scrollTopAdjust > 0) {
            this._scroller.scrollTop += scrollTopAdjust;
        }
    }
    ensureItemsRendered() {
        this._selector._render();
    }
    adjustScrollPosition() {
        if (this._items) {
            this._scrollIntoView(this._focusedIndex);
        }
    }
    /**
     * We want to prevent the kinetic scrolling energy from being transferred from the overlay contents over to the parent.
     * Further improvement ideas: after the contents have been scrolled to the top or bottom and scrolling has stopped, it could allow
     * scrolling the parent similarily to touch scrolling.
     */
    _patchWheelOverScrolling() {
        const selector = this._selector;
        selector.addEventListener('wheel', e => {
            const scroller = selector._scroller || selector.scrollTarget;
            const scrolledToTop = scroller.scrollTop === 0;
            const scrolledToBottom = (scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight) <= 1;
            if (scrolledToTop && e.deltaY < 0) {
                e.preventDefault();
            }
            else if (scrolledToBottom && e.deltaY > 0) {
                e.preventDefault();
            }
        });
    }
    updateViewportBoundaries() {
        this._cachedViewportTotalPaddingBottom = undefined;
        this._selector.updateViewportBoundaries();
    }
    get _viewportTotalPaddingBottom() {
        if (this._cachedViewportTotalPaddingBottom === undefined) {
            const itemsStyle = window.getComputedStyle(this._selector.$.items);
            this._cachedViewportTotalPaddingBottom = [
                itemsStyle.paddingBottom,
                itemsStyle.borderBottomWidth
            ].map(v => {
                return parseInt(v || '', 10);
            }).reduce((sum, v) => {
                return sum + v;
            });
        }
        return this._cachedViewportTotalPaddingBottom;
    }
    _visibleItemsCount() {
        if (!this._selector) {
            return;
        }
        // Ensure items are rendered
        this._selector.flushDebouncer('_debounceTemplate');
        // Ensure items are positioned
        this._selector.scrollToIndex(this._selector.firstVisibleIndex);
        // Ensure viewport boundaries are up-to-date
        this.updateViewportBoundaries();
        return this._selector.lastVisibleIndex - this._selector.firstVisibleIndex + 1;
    }
    _selectItem(item) {
        item = (typeof item === 'number') ? this._items[item] : item;
        if (this._selector.selectedItem !== item) {
            this._selector.selectItem(item);
        }
    }
    _preventDefault(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    _stopPropagation(e) {
        e.stopPropagation();
    }
};
ComboBoxOverlayElement = ComboBoxOverlayElement_1 = __decorate([
    polymer3_decorators_1.component(ComboBoxOverlayElement_1.is)
], ComboBoxOverlayElement);
var ComboBoxOverlayElement_1;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/utils/flattened-nodes-observer");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(22);
__webpack_require__(25);
__webpack_require__(27);
__webpack_require__(48);
//import './vaadin-date-picker';    // not yet
__webpack_require__(55);
__webpack_require__(58);
//import './vaadin-grid';           // not yet
__webpack_require__(63);
__webpack_require__(66);
__webpack_require__(69);
__webpack_require__(73);
__webpack_require__(11);
//import './vaadin-upload';         // not yet
__webpack_require__(75);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const gesture_event_listeners_1 = __webpack_require__(6);
const PolymerGestures = __webpack_require__(10);
const vaadin_control_state_mixin_1 = __webpack_require__(5);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadinButton = __webpack_require__(24);
const domModule = cheerio.load(vaadinButton)('body');
utils_1.importStyle(`<dom-module id="vaadin-button-default-theme" theme-for="vaadin-button">${domModule.find('dom-module[id="vaadin-button-default-theme"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-button"><template>${domModule.find('dom-module[id="vaadin-button"] template').html()}</template></dom-module>`);
let ButtonElement = ButtonElement_1 = class ButtonElement extends vaadin_control_state_mixin_1.default(vaadin_themable_mixin_1.default(gesture_event_listeners_1.GestureEventListeners(polymer_element_1.Element))) {
    static get is() {
        return 'vaadin-button';
    }
    ready() {
        super.ready();
        // Leaving default role in the native button, makes navigation announcement
        // being different when using focus navigation (tab) versus using normal
        // navigation (arrows). The first way announces the label on a button
        // since the focus is moved programmatically, and the second on a group.
        this.setAttribute('role', 'button');
        this.$.button.setAttribute('role', 'presentation');
        this._addActiveListeners();
    }
    _addActiveListeners() {
        PolymerGestures.addListener(this, 'down', () => !this.disabled && this.setAttribute('active', ''));
        PolymerGestures.addListener(this, 'up', () => this.removeAttribute('active'));
        this.addEventListener('keydown', e => !this.disabled && [13, 32].indexOf(e.keyCode) >= 0 && this.setAttribute('active', ''));
        this.addEventListener('keyup', () => this.removeAttribute('active'));
    }
    get focusElement() {
        return this.$.button;
    }
};
ButtonElement = ButtonElement_1 = __decorate([
    polymer3_decorators_1.component(ButtonElement_1.is)
], ButtonElement);
var ButtonElement_1;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VaadinTabIndexMixin = superClass => class _VaadinTabIndexMixin extends superClass {
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
exports.default = VaadinTabIndexMixin;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n<link rel=\"import\" href=\"../vaadin-control-state-mixin/vaadin-control-state-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-button-default-theme\">\n  <template>\n    <style>\n      /* TODO: Implement default theme. */\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-button\">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        outline: none;\n      }\n\n      [part=\"button\"] {\n        width: 100%;\n        height: 100%;\n        margin: 0; /* (normalize.css) Remove the margin in Firefox and Safari. */\n        overflow: visible; /* (normalize.css) Show the overflow in IE. */\n      }\n    </style>\n    <button id=\"button\" type=\"button\" part=\"button\">\n      <slot></slot>\n    </button>\n  </template>\n  <script>\n    if (!Polymer.Element) {\n      throw new Error(`Unexpected Polymer version ${Polymer.version} is used, expected v2.0.0 or later.`);\n    }\n\n    {\n      /**\n       * `<vaadin-button>` is a Polymer 2 element providing an accessible and customizable button.\n       *\n       * ```html\n       * <vaadin-button>\n       * </vaadin-button>\n       * ```\n       *\n       * ### Styling\n       *\n       * The following shadow DOM parts are exposed for styling:\n       *\n       * Part name | Description\n       * ----------------|----------------\n       * `button` | The internal `<button>` element\n       *\n       * The following attributes are exposed for styling:\n       *\n       * Attribute | Description\n       * --------- | -----------\n       * `active` | Set when the button is pressed down, either with mouse, touch or the keyboard.\n       * `disabled` | Set when the button is disabled.\n       * `focus-ring` | Set when the button is focused using the keyboard.\n       * `focused` | Set when the button is focused.\n       *\n       * @memberof Vaadin\n       * @mixes Vaadin.ControlStateMixin\n       * @mixes Vaadin.ThemableMixin\n       * @demo demo/index.html\n       */\n      class ButtonElement extends Vaadin.ControlStateMixin(Vaadin.ThemableMixin(Polymer.Element)) {\n        static get is() {\n          return 'vaadin-button';\n        }\n\n        ready() {\n          super.ready();\n\n          // Leaving default role in the native button, makes navigation announcement\n          // being different when using focus navigation (tab) versus using normal\n          // navigation (arrows). The first way announces the label on a button\n          // since the focus is moved programmatically, and the second on a group.\n          this.setAttribute('role', 'button');\n          this.$.button.setAttribute('role', 'presentation');\n\n          this._addActiveListeners();\n        }\n\n        _addActiveListeners() {\n          this._addEventListenerToNode(this, 'down', () => !this.disabled && this.setAttribute('active', ''));\n          this._addEventListenerToNode(this, 'up', () => this.removeAttribute('active'));\n          this.addEventListener('keydown', e => !this.disabled && [13, 32].indexOf(e.keyCode) >= 0 && this.setAttribute('active', ''));\n          this.addEventListener('keyup', () => this.removeAttribute('active'));\n        }\n\n        get focusElement() {\n          return this.$.button;\n        }\n      }\n\n      customElements.define(ButtonElement.is, ButtonElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.ButtonElement = ButtonElement;\n    }\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const gesture_event_listeners_1 = __webpack_require__(6);
const vaadin_control_state_mixin_1 = __webpack_require__(5);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadinCheckbox = __webpack_require__(26);
const domModule = cheerio.load(vaadinCheckbox)('body');
utils_1.importStyle(`<dom-module id="vaadin-checkbox-default-theme" theme-for="vaadin-checkbox">${domModule.find('dom-module[id="vaadin-checkbox-default-theme"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-checkbox"><template>${domModule.find('dom-module[id="vaadin-checkbox"] template').html()}</template></dom-module>`);
let CheckboxElement = CheckboxElement_1 = class CheckboxElement extends vaadin_control_state_mixin_1.default(vaadin_themable_mixin_1.default(gesture_event_listeners_1.GestureEventListeners(polymer_element_1.Element))) {
    static get is() {
        return 'vaadin-checkbox';
    }
    static get properties() {
        return Object.assign({
            /**
             * True if the checkbox is checked.
             */
            checked: {
                type: Boolean,
                value: false,
                notify: true,
                observer: '_checkedChanged',
                reflectToAttribute: true
            },
            /**
             * Indeterminate state of the checkbox when it's neither checked nor unchecked, but undetermined.
             * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes
             */
            indeterminate: {
                type: Boolean,
                notify: true,
                observer: '_indeterminateChanged',
                reflectToAttribute: true
            },
            /**
             * The name of the control, which is submitted with the form data.
             */
            name: {
                type: String
            },
            /**
             * The value given to the data submitted with the checkbox's name to the server when the control is inside a form.
             */
            value: {
                type: String,
                value: 'on'
            }
        }, super.properties);
    }
    ready() {
        super.ready();
        this.setAttribute('role', 'checkbox');
        this.addEventListener('click', this._handleClick.bind(this));
        this._addActiveListeners();
    }
    _checkedChanged(checked) {
        if (this.indeterminate) {
            this.setAttribute('aria-checked', 'mixed');
        }
        else {
            this.setAttribute('aria-checked', checked);
        }
    }
    _indeterminateChanged(indeterminate) {
        if (indeterminate) {
            this.setAttribute('aria-checked', 'mixed');
        }
        else {
            this.setAttribute('aria-checked', this.checked);
        }
    }
    _addActiveListeners() {
        // DOWN
        this._addEventListenerToNode(this, 'down', (e) => {
            if (!this.disabled) {
                this.setAttribute('active', '');
            }
        });
        // UP
        this._addEventListenerToNode(this, 'up', () => this.removeAttribute('active'));
        // KEYDOWN
        this.addEventListener('keydown', e => {
            if (!this.disabled && e.keyCode === 32) {
                e.preventDefault();
                this.setAttribute('active', '');
            }
        });
        // KEYUP
        this.addEventListener('keyup', e => {
            if (!this.disabled && e.keyCode === 32) {
                e.preventDefault();
                this._toggleChecked();
                this.removeAttribute('active');
                if (this.indeterminate) {
                    this.indeterminate = false;
                }
            }
        });
    }
    get focusElement() {
        return this.$.label;
    }
    _handleClick(e) {
        if (!this.disabled && !this.indeterminate) {
            if (e.composedPath()[0] !== this.$.nativeCheckbox) {
                e.preventDefault();
                this._toggleChecked();
            }
        }
    }
    _toggleChecked() {
        this.checked = !this.checked;
    }
};
CheckboxElement = CheckboxElement_1 = __decorate([
    polymer3_decorators_1.component(CheckboxElement_1.is)
], CheckboxElement);
var CheckboxElement_1;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n<link rel=\"import\" href=\"../vaadin-control-state-mixin/vaadin-control-state-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-checkbox-default-theme\" theme-for=\"vaadin-checkbox\">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        outline: none;\n      }\n\n      [part=\"wrapper\"] {\n        display: inline-flex;\n        align-items: center;\n        outline: none;\n      }\n\n      :host([focus-ring]) {\n        box-shadow: 0 0 2px 2px Highlight;\n      }\n\n      [part=\"native-checkbox\"] {\n        outline: 0;\n        margin-right: 0;\n      }\n\n      [part=\"label\"] {\n        padding: 0 5px;\n        outline: none;\n      }\n\n      :host([disabled]) [part=\"label\"] {\n        opacity: 0.5;\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-checkbox\">\n  <template>\n    <style>\n      :host([disabled]) {\n        -webkit-tap-highlight-color: transparent;\n      }\n    </style>\n\n    <label part=\"wrapper\" id=\"label\">\n      <input id=\"nativeCheckbox\" type=\"checkbox\" part=\"native-checkbox\" checked=\"{{checked::change}}\" disabled$=\"[[disabled]]\" indeterminate=\"{{indeterminate::change}}\" role=\"presentation\" tabindex=\"-1\">\n\n      <span part=\"checkbox\"></span>\n\n      <span part=\"label\">\n        <slot></slot>\n      </span>\n    </label>\n\n  </template>\n  <script>\n    if (!Polymer.Element) {\n      throw new Error(`Unexpected Polymer version ${Polymer.version} is used, expected v2.0.0 or later.`);\n    }\n\n    {\n      /**\n       * `<vaadin-checkbox>` is a Polymer 2 element for customized checkboxes.\n       *\n       * ```html\n       * <vaadin-checkbox>\n       *   Make my profile visible\n       * </vaadin-checkbox>\n       * ```\n       *\n       * ### Styling\n       *\n       * The following shadow DOM parts are exposed for styling:\n       *\n       * Part name         | Description\n       * ------------------|----------------\n       * `wrapper`         | The `<label>` element which wraps the checkbox and [part=\"label\"]\n       * `native-checkbox` | The `<input type=\"checkbox\">` element\n       * `checkbox`        | The `<span>` element for a custom graphical check\n       * `label`           | The `<span>` element for slotted text/HTML label\n       *\n       * The following attributes are exposed for styling:\n       *\n       * Attribute    | Description\n       * -------------|------------\n       * `active`     | Set when the checkbox is pressed down, either with mouse, touch or the keyboard.\n       * `disabled`   | Set when the checkbox is disabled.\n       * `focus-ring` | Set when the checkbox is focused using the keyboard.\n       * `focused`    | Set when the checkbox is focused.\n       *\n       * @memberof Vaadin\n       * @mixes Vaadin.ControlStateMixin\n       * @mixes Vaadin.ThemableMixin\n       * @demo demo/index.html\n       */\n      class CheckboxElement extends Vaadin.ControlStateMixin(Vaadin.ThemableMixin(Polymer.Element)) {\n        static get is() {\n          return 'vaadin-checkbox';\n        }\n\n        static get properties() {\n          return {\n            /**\n             * True if the checkbox is checked.\n             */\n            checked: {\n              type: Boolean,\n              value: false,\n              notify: true,\n              observer: '_checkedChanged',\n              reflectToAttribute: true\n            },\n\n            /**\n             * Indeterminate state of the checkbox when it's neither checked nor unchecked, but undetermined.\n             * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes\n             */\n            indeterminate: {\n              type: Boolean,\n              notify: true,\n              observer: '_indeterminateChanged',\n              reflectToAttribute: true\n            },\n\n            /**\n             * The name of the control, which is submitted with the form data.\n             */\n            name: {\n              type: String\n            },\n\n            /**\n             * The value given to the data submitted with the checkbox's name to the server when the control is inside a form.\n             */\n            value: {\n              type: String,\n              value: 'on'\n            }\n          };\n        }\n\n        ready() {\n          super.ready();\n\n          this.setAttribute('role', 'checkbox');\n\n          this.addEventListener('click', this._handleClick.bind(this));\n\n          this._addActiveListeners();\n        }\n\n        _checkedChanged(checked) {\n          if (this.indeterminate) {\n            this.setAttribute('aria-checked', 'mixed');\n          } else {\n            this.setAttribute('aria-checked', checked);\n          }\n        }\n\n        _indeterminateChanged(indeterminate) {\n          if (indeterminate) {\n            this.setAttribute('aria-checked', 'mixed');\n          } else {\n            this.setAttribute('aria-checked', this.checked);\n          }\n        }\n\n        _addActiveListeners() {\n          // DOWN\n          this._addEventListenerToNode(this, 'down', (e) => {\n            if (!this.disabled) {\n              this.setAttribute('active', '');\n            }\n          });\n\n          // UP\n          this._addEventListenerToNode(this, 'up', () => this.removeAttribute('active'));\n\n          // KEYDOWN\n          this.addEventListener('keydown', e => {\n            if (!this.disabled && e.keyCode === 32) {\n              e.preventDefault();\n              this.setAttribute('active', '');\n            }\n          });\n\n          // KEYUP\n          this.addEventListener('keyup', e => {\n            if (!this.disabled && e.keyCode === 32) {\n              e.preventDefault();\n              this._toggleChecked();\n              this.removeAttribute('active');\n\n              if (this.indeterminate) {\n                this.indeterminate = false;\n              }\n            }\n          });\n        }\n\n        get focusElement() {\n          return this.$.label;\n        }\n\n        _handleClick(e) {\n          if (!this.disabled && !this.indeterminate) {\n            if (e.composedPath()[0] !== this.$.nativeCheckbox) {\n              e.preventDefault();\n              this._toggleChecked();\n            }\n          }\n        }\n\n        _toggleChecked() {\n          this.checked = !this.checked;\n        }\n      }\n\n      customElements.define(CheckboxElement.is, CheckboxElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.CheckboxElement = CheckboxElement;\n    }\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(11);
const vaadin_control_state_mixin_1 = __webpack_require__(5);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadin_combo_box_mixin_1 = __webpack_require__(17);
__webpack_require__(19);
__webpack_require__(44);
const vaadinComboBox = __webpack_require__(47);
let ComboBoxElement = ComboBoxElement_1 = class ComboBoxElement extends vaadin_control_state_mixin_1.default(vaadin_themable_mixin_1.default(vaadin_combo_box_mixin_1.default(polymer_element_1.Element))) {
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
};
ComboBoxElement = ComboBoxElement_1 = __decorate([
    polymer3_decorators_1.component(ComboBoxElement_1.is)
], ComboBoxElement);
var ComboBoxElement_1;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n\n<style>\n  @font-face {\n    font-family: 'vaadin-combo-box-icons';\n    src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAVQAAsAAAAABQQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFgGNtYXAAAAFoAAAAVAAAAFQXVtKIZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAIwAAACMKHtqRmhlYWQAAAJQAAAANgAAADYNCaOoaGhlYQAAAogAAAAkAAAAJAbtA8dobXR4AAACrAAAABgAAAAYDgACAGxvY2EAAALEAAAADgAAAA4AbgBAbWF4cAAAAtQAAAAgAAAAIAAIAA5uYW1lAAAC9AAAAjoAAAI6mZTisnBvc3QAAAUwAAAAIAAAACAAAwAAAAMDVQGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QEDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkB//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQErAUAC1QIVAAIAAAEXNwEr1dUCFdXVAAAAAAEA1QCVAysC6wALAAABJwcnBxcHFzcXNycDKzzv7zzv7zzv7zzvAq887+887+887+887wABAAAAAQAAKGR/418PPPUACwQAAAAAANVgL+AAAAAA1WAv4AAAAAADKwLrAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAMrAAEAAAAAAAAAAAAAAAAAAAAGBAAAAAAAAAAAAAAAAgAAAAQAASsEAADVAAAAAAAKABQAHgAsAEYAAAABAAAABgAMAAEAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEAFgAAAAEAAAAAAAIABwDnAAEAAAAAAAMAFgBjAAEAAAAAAAQAFgD8AAEAAAAAAAUACwBCAAEAAAAAAAYAFgClAAEAAAAAAAoAGgE+AAMAAQQJAAEALAAWAAMAAQQJAAIADgDuAAMAAQQJAAMALAB5AAMAAQQJAAQALAESAAMAAQQJAAUAFgBNAAMAAQQJAAYALAC7AAMAAQQJAAoANAFYdmFhZGluLWNvbWJvLWJveC1pY29ucwB2AGEAYQBkAGkAbgAtAGMAbwBtAGIAbwAtAGIAbwB4AC0AaQBjAG8AbgBzVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwdmFhZGluLWNvbWJvLWJveC1pY29ucwB2AGEAYQBkAGkAbgAtAGMAbwBtAGIAbwAtAGIAbwB4AC0AaQBjAG8AbgBzdmFhZGluLWNvbWJvLWJveC1pY29ucwB2AGEAYQBkAGkAbgAtAGMAbwBtAGIAbwAtAGIAbwB4AC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQBydmFhZGluLWNvbWJvLWJveC1pY29ucwB2AGEAYQBkAGkAbgAtAGMAbwBtAGIAbwAtAGIAbwB4AC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format('woff');\n    font-weight: normal;\n    font-style: normal;\n  }\n</style>\n\n</head><body><dom-module id=\"vaadin-combo-box-default-theme\" theme-for=\"vaadin-combo-box vaadin-combo-box-light\">\n  <template>\n    <style>\n      [part=\"clear-button\"],\n      [part=\"toggle-button\"] {\n        cursor: pointer;\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-combo-box-item-default-theme\" theme-for=\"vaadin-combo-box-item\">\n  <template>\n    <style>\n      :host {\n        cursor: pointer;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        padding: 5px 10px;\n      }\n\n      :host(:not([touch-device]):hover),\n      :host([focused]) {\n        background: #eee;\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-combo-box-overlay-default-theme\">\n  <template>\n    <style>\n      /* This is here to avoid a themable mixin warning */\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VaadinFormElementMixin = superClass => class _VaadinFormElementMixin extends superClass {
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
        this.dispatchEvent(new CustomEvent('iron-form-element-register'), { bubbles: true });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._parentForm) {
            var ev = new CustomEvent('iron-form-element-unregister');
            ev.detail = { target: this };
            this.dispatchEvent(ev, { bubbles: true });
        }
    }
};
exports.default = VaadinFormElementMixin;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n<link rel=\"import\" href=\"../vaadin-control-state-mixin/vaadin-control-state-mixin.html\">\n<link rel=\"import\" href=\"vaadin-form-element-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-text-field-default-theme\" theme-for=\"vaadin-text-field\">\n  <template>\n    <style>\n      [part=\"label\"] {\n        font-size: 0.875em;\n        font-weight: 600;\n        margin-bottom: 0.25em;\n      }\n\n      [part=\"input-field\"] {\n        border: 1px solid rgba(0, 0, 0, 0.3);\n        background-color: #fff;\n        padding: 0.25em;\n      }\n\n      :host([focused]) [part=\"input-field\"] {\n        box-shadow: 0 0 2px 2px Highlight;\n      }\n\n      :host([invalid]) [part=\"input-field\"] {\n        border-color: red;\n      }\n\n      :host([disabled]) {\n        opacity: 0.5;\n      }\n\n      [part=\"value\"] {\n        border: 0;\n        background: transparent;\n        padding: 0;\n        margin: 0;\n        font: inherit;\n        outline: none;\n        box-shadow: none;\n      }\n\n      [part=\"error-message\"] {\n        font-size: 0.875em;\n        margin-top: 0.25em;\n        color: red;\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-text-field\">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        width: 175px;\n        outline: none;\n      }\n\n      .vaadin-text-field-container {\n        display: flex;\n        flex-direction: column;\n        position: relative;\n      }\n\n      [part=\"label\"]:empty {\n        display: none;\n      }\n\n      [part=\"input-field\"] {\n        display: flex;\n        align-items: center;\n      }\n\n      [part=\"value\"] {\n        width: 100%;\n        box-sizing: border-box;\n        flex: 1;\n        min-width: 0;\n      }\n\n      [part=\"value\"]::-ms-clear {\n        display: none;\n      }\n\n    </style>\n\n    <div class=\"vaadin-text-field-container\">\n\n      <label part=\"label\" on-click=\"focus\" id=\"[[_labelId]]\">[[label]]</label>\n\n      <div part=\"input-field\">\n\n        <slot name=\"prefix\"></slot>\n\n        <input part=\"value\" autocomplete$=\"[[autocomplete]]\" autocorrect$=\"[[autocorrect]]\" autofocus$=\"[[autofocus]]\" disabled$=\"[[disabled]]\" list=\"[[list]]\" maxlength$=\"[[maxlength]]\" minlength$=\"[[minlength]]\" pattern=\"[[pattern]]\" placeholder=\"[[placeholder]]\" readonly$=\"[[readonly]]\" aria-readonly$=\"[[readonly]]\" required$=\"[[required]]\" aria-required$=\"[[required]]\" value=\"{{value::input}}\" title=\"[[title]]\" on-blur=\"validate\" on-input=\"_onInput\" aria-describedby$=\"[[_getActiveErrorId(invalid, errorMessage, _errorId)]]\" aria-labelledby$=\"[[_getActiveLabelId(label, _labelId)]]\" aria-invalid$=\"[[invalid]]\">\n\n        <slot name=\"suffix\"></slot>\n\n      </div>\n\n      <div id=\"[[_errorId]]\" aria-live=\"assertive\" part=\"error-message\" hidden$=\"[[!_getActiveErrorId(invalid, errorMessage, _errorId)]]\">[[errorMessage]]</div>\n\n    </div>\n\n  </template>\n\n  <script>\n    (function() {\n      /**\n       * `<vaadin-text-field>` is a Polymer 2 element for text field control in forms.\n       *\n       * ```html\n       * <vaadin-text-field label=\"First Name\">\n       * </vaadin-text-field>\n       * ```\n       *\n       * ### Styling\n       *\n       * [Generic styling/theming documentation](https://cdn.vaadin.com/vaadin-valo-theme/0.3.1/demo/customization.html)\n       *\n       * The following shadow DOM parts are available for styling:\n       *\n       * Part name | Description\n       * ----------------|----------------\n       * `label` | The label element\n       * `value` | The input element\n       * `error-message` | The error message element\n       * `input-field` | The element that wraps prefix, value and suffix\n       *\n       * The following state attributes are available for styling:\n       *\n       * Attribute    | Description | Part name\n       * -------------|-------------|------------\n       * `disabled` | Set to a disabled text field | :host\n       * `has-value` | Set when the element has a value | :host\n       * `invalid` | Set when the element is invalid | :host\n       * `focused` | Set when the element is focused | :host\n       * `focus-ring` | Set when the element is keyboard focused | :host\n       *\n       * @memberof Vaadin\n       * @mixes Vaadin.ControlStateMixin\n       * @mixes Vaadin.FormElementMixin\n       * @mixes Vaadin.ThemableMixin\n       * @demo demo/index.html\n       */\n      class TextFieldElement extends Vaadin.ControlStateMixin(Vaadin.FormElementMixin(Vaadin.ThemableMixin(Polymer.Element))) {\n        static get is() {\n          return 'vaadin-text-field';\n        }\n\n        static get properties() {\n          return {\n            /**\n             * Whether the value of the control can be automatically completed by the browser.\n             * List of available options at:\n             * https://developer.mozilla.org/en/docs/Web/HTML/Element/input#attr-autocomplete\n             */\n            autocomplete: {\n              type: String\n            },\n\n            /**\n             * This is a property supported by Safari that is used to control whether\n             * autocorrection should be enabled when the user is entering/editing the text.\n             * Possible values are:\n             * on: Enable autocorrection.\n             * off: Disable autocorrection.\n             */\n            autocorrect: {\n              type: String\n            },\n\n            /**\n             * Error to show when the input value is invalid.\n             */\n            errorMessage: {\n              type: String,\n              value: ''\n            },\n\n            /**\n             * String used for the label element.\n             */\n            label: {\n              type: String,\n              value: ''\n            },\n\n            /**\n             * Identifies a list of pre-defined options to suggest to the user.\n             * The value must be the id of a <datalist> element in the same document.\n             */\n            list: {\n              type: String\n            },\n\n            /**\n             * Maximum number of characters (in Unicode code points) that the user can enter.\n             */\n            maxlength: {\n              type: Number\n            },\n\n            /**\n             * Minimum number of characters (in Unicode code points) that the user can enter.\n             */\n            minlength: {\n              type: Number\n            },\n\n            /**\n             * The name of the control, which is submitted with the form data.\n             */\n            name: {\n              type: String\n            },\n\n            /**\n             * A regular expression that the value is checked against.\n             * The pattern must match the entire value, not just some subset.\n             */\n            pattern: {\n              type: String\n            },\n\n            /**\n             * A hint to the user of what can be entered in the control.\n             */\n            placeholder: {\n              type: String\n            },\n\n            /**\n             * This attribute indicates that the user cannot modify the value of the control.\n             */\n            readonly: {\n              type: Boolean\n            },\n\n            /**\n             * Specifies that the user must fill in a value.\n             */\n            required: {\n              type: Boolean\n            },\n\n            /**\n             * Message to show to the user when validation fails.\n             */\n            title: {\n              type: String\n            },\n\n            /**\n             * The initial value of the control.\n             * It can be used for two-way data binding.\n             */\n            value: {\n              type: String,\n              value: '',\n              observer: '_valueChanged',\n              notify: true\n            },\n\n            /**\n             * This property is set to true when the control value is invalid.\n             */\n            invalid: {\n              type: Boolean,\n              reflectToAttribute: true,\n              notify: true,\n              value: false\n            },\n\n            /**\n             * A read-only property indicating whether this input has a non empty value.\n             * It can be used for example in styling of the component.\n             */\n            hasValue: {\n              type: Boolean,\n              value: false,\n              notify: true,\n              readOnly: true,\n              reflectToAttribute: true\n            },\n\n            /**\n             * When set to true, user is prevented from typing a value that\n             * conflicts with the given `pattern`.\n             */\n            preventInvalidInput: {\n              type: Boolean\n            },\n\n            _labelId: {\n              type: String\n            },\n\n            _errorId: {\n              type: String\n            }\n          };\n        }\n\n        get focusElement() {\n          return this.root.querySelector('[part=value]');\n        }\n\n        _onInput(e) {\n          if (this.preventInvalidInput) {\n            const input = this.focusElement;\n            if (input.value.length > 0 && !this.checkValidity()) {\n              input.value = this.value || '';\n            }\n          }\n        }\n\n        _valueChanged(newVal, oldVal) {\n          // setting initial value to empty string, skip validation\n          if (newVal === '' && oldVal === undefined) {\n            return;\n          }\n          if (this.invalid) {\n            this.validate();\n          }\n          this._setHasValue(newVal !== '' && newVal != null);\n        }\n\n        /**\n         * Returns true if `value` is valid.\n         * `<iron-form>` uses this to check the validity or all its elements.\n         *\n         * @return {boolean} True if the value is valid.\n         */\n        validate() {\n          return !(this.invalid = !this.checkValidity());\n        }\n\n        _getActiveErrorId(invalid, errorMessage, errorId) {\n          return errorMessage && invalid ? errorId : undefined;\n        }\n\n        _getActiveLabelId(label, labelId) {\n          return label ? labelId : undefined;\n        }\n\n        /**\n         * Returns true if the current input value satisfies all constraints (if any)\n         */\n        checkValidity() {\n          if (this.required || this.pattern || this.maxlength || this.minlength) {\n            return this.focusElement.checkValidity();\n          } else {\n            return !this.invalid;\n          }\n        }\n\n        ready() {\n          super.ready();\n          if (!(window.ShadyCSS && window.ShadyCSS.nativeCss)) {\n            this.updateStyles();\n          }\n\n          var uniqueId = TextFieldElement._uniqueId = 1 + TextFieldElement._uniqueId || 0;\n          this._errorId = `${this.constructor.is}-error-${uniqueId}`;\n          this._labelId = `${this.constructor.is}-label-${uniqueId}`;\n        }\n\n        attributeChangedCallback(prop, oldVal, newVal) {\n          super.attributeChangedCallback(prop, oldVal, newVal);\n          // Needed until Edge has CSS Custom Properties (present in Edge Preview)\n          if (!(window.ShadyCSS && window.ShadyCSS.nativeCss) &&\n            /^(focused|focus-ring|invalid|disabled|placeholder|has-value)$/.test(prop)) {\n            this.updateStyles();\n          }\n\n          // Safari has an issue with repainting shadow root element styles when a host attribute changes.\n          // Need this workaround (toggle any inline css property on and off) until the issue gets fixed.\n          const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);\n          if (isSafari && this.root) {\n            const WEBKIT_PROPERTY = '-webkit-backface-visibility';\n            this.root.querySelectorAll('*').forEach(el => {\n              el.style[WEBKIT_PROPERTY] = 'visible';\n              el.style[WEBKIT_PROPERTY] = '';\n            });\n          }\n        }\n      }\n\n      customElements.define(TextFieldElement.is, TextFieldElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.TextFieldElement = TextFieldElement;\n    })();\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer3_decorators_1 = __webpack_require__(1);
const dom_module_1 = __webpack_require__(14);
const vaadinPasswordField = __webpack_require__(32);
__webpack_require__(33);
const domModule = cheerio.load(vaadinPasswordField)('body');
utils_1.importStyle(`<dom-module id="vaadin-password-field-default-theme" theme-for="vaadin-password-field">${domModule.find('dom-module[id="vaadin-password-field-default-theme"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-password-field-template"><template>${domModule.find('dom-module[id="vaadin-password-field-template"] template').html()}</template></dom-module>`);
const vaadin_text_field_1 = __webpack_require__(11);
let PasswordFieldElement = PasswordFieldElement_1 = class PasswordFieldElement extends vaadin_text_field_1.TextFieldElement {
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
        const modules = dom_module_1.DomModule.prototype.modules;
        if (!this.memoizedTemplate) {
            // Clone the superclass template
            this.memoizedTemplate = super.template.cloneNode(true);
            // Retrieve this element's dom-module template
            const thisTemplate = dom_module_1.DomModule.import(this.is + '-template', 'template');
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
};
PasswordFieldElement = PasswordFieldElement_1 = __decorate([
    polymer3_decorators_1.component(PasswordFieldElement_1.is)
], PasswordFieldElement);
var PasswordFieldElement_1;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"vaadin-text-field.html\">\n\n<style>\n  @font-face {\n    font-family: 'vaadin-password-field-icons';\n    src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAYMAAsAAAAABcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFgGNtYXAAAAFoAAAAVAAAAFQXVtKIZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAfwAAAH8yBLEP2hlYWQAAAPAAAAANgAAADYN+RfTaGhlYQAAA/gAAAAkAAAAJAfCA8dobXR4AAAEHAAAABgAAAAYDgAAAGxvY2EAAAQ0AAAADgAAAA4BJgCSbWF4cAAABEQAAAAgAAAAIAAMAFpuYW1lAAAEZAAAAYYAAAGGmUoJ+3Bvc3QAAAXsAAAAIAAAACAAAwAAAAMDVQGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QEDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkB//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAwAAAHoEAALGABQAJABFAAABIg4CMTAeAjMyPgIxMC4CIwc+ATEwBhUUFjEHMCY1NDYTIi4CJz4BNw4BFRQeAjMyPgI1NCYnHgEXDgMjAgChyHAnN3rAiYjFfjsncMihrRg7IA1GExmnY5ZqQg8PWGAFCChGXTU1XUYoCAVgWA8RRW2ZZALGZnpmUmJSUGBQaHxoYA8FRSIhJQ0rIiYz/lQvQkYVInswEygYNV1GKChGXTUYKBMrgCIVRkIvAAAABQAA/8AEAAPAABoAJgA6AEcAVwAAAQceARcOAyMiJicHHgEzMj4CMTAuAicHNCYnATIWMzI+AhMBLgEjIg4CMTAeAhcHFTMBNQEuASc+ATcOARUUFhc3BzAmNTQ2MT4BMTAGFQYWAzo0UlMPEUVtmWQiNR0zJ1QsiMV+OxEsTTw6AgT+zA8dDjVdRijT/ucnXjWhyHAnGTNQN9MtA9P9AE1ZFA9YYAUILSY6QBMZGDsgBAsCczMrcyIWQ0AtCAQzDgtQYFAzS1ckeQ4bCv7TBihGXQH7/uYKEGZ6Zic5RBzNLQPTLf0tIVoYInswEygYNWMihgwrISc5DwVHJiIlAAEAAAAAAADkyo21Xw889QALBAAAAAAA1W1pqwAAAADVbWmrAAD/wAQAA8AAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAYEAAAAAAAAAAAAAAACAAAABAAAAAQAAAAAAAAAAAoAFAAeAH4A/gAAAAEAAAAGAFgABQAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA) format('woff');\n    font-weight: normal;\n    font-style: normal;\n  }\n</style>\n\n</head><body><dom-module id=\"vaadin-password-field-default-theme\">\n  <template>\n    <style>\n      [part=\"reveal-button\"] {\n        font-family: 'vaadin-password-field-icons';\n        cursor: pointer;\n      }\n\n      [part=\"reveal-button\"]::before {\n        content: \"\\e900\";\n      }\n\n      :host([password-visible]) [part=\"reveal-button\"]::before {\n        content: \"\\e901\";\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-password-field-template\">\n  <template>\n    <style>\n      /* Hide the native eye icon for IE/Edge */\n      ::-ms-reveal {\n        display: none;\n      }\n    </style>\n\n    <div part=\"reveal-button\" on-mousedown=\"_preventDefault\" on-click=\"_togglePasswordVisibility\" hidden$=\"[[revealButtonHidden]]\">\n    </div>\n  </template>\n  <script>\n    (function() {\n      let memoizedTemplate;\n\n      /**\n       * `<vaadin-password-field>` is a Polymer 2 element for password field control in forms.\n       *\n       * ```html\n       * <vaadin-password-field label=\"Password\">\n       * </vaadin-password-field>\n       * ```\n       *\n       * ### Styling\n       *\n       * [Generic styling/theming documentation](https://cdn.vaadin.com/vaadin-valo-theme/0.3.1/demo/customization.html)\n       *\n       * See vaadin-text-field.html for the styling documentation\n       *\n       * In addition to vaadin-text-field parts, here's the list of vaadin-password-field specific parts\n       *\n       * Part name       | Description\n       * ----------------|----------------------------------------------------\n       * `reveal-button` | The eye icon which toggles the password visibility\n       *\n       * In addition to vaadin-text-field state attributes, here's the list of vaadin-password-field specific attributes\n       *\n       * Attribute    | Description | Part name\n       * -------------|-------------|------------\n       * `password-visible` | Set when the password is visible | :host\n       *\n       * @memberof Vaadin\n       * @extends Vaadin.TextFieldElement\n       * @demo demo/password.html\n       */\n      class PasswordFieldElement extends Vaadin.TextFieldElement {\n        static get is() {\n          return 'vaadin-password-field';\n        }\n\n        static get properties() {\n          return {\n            /**\n             * Set to true to hide the eye icon which toggles the password visibility.\n             */\n            revealButtonHidden: {\n              type: Boolean,\n              value: false\n            },\n\n            /**\n             * True if the password is visible ([type=text]).\n             */\n            passwordVisible: {\n              type: Boolean,\n              value: false,\n              reflectToAttribute: true,\n              observer: '_passwordVisibleChange',\n              readOnly: true\n            }\n          };\n        }\n\n        static get template() {\n          if (!memoizedTemplate) {\n            // Clone the superclass template\n            memoizedTemplate = super.template.cloneNode(true);\n\n            // Retrieve this element's dom-module template\n            const thisTemplate = Polymer.DomModule.import(this.is + '-template', 'template');\n            const revealButton = thisTemplate.content.querySelector('[part=\"reveal-button\"]');\n            const styles = thisTemplate.content.querySelector('style');\n\n            // Append reveal-button and styles to the text-field template\n            const inputField = memoizedTemplate.content.querySelector('[part=\"input-field\"]');\n            inputField.appendChild(revealButton);\n            memoizedTemplate.content.appendChild(styles);\n          }\n\n          return memoizedTemplate;\n        }\n\n        ready() {\n          super.ready();\n          this.focusElement.type = 'password';\n          this.focusElement.autocapitalize = 'off';\n\n          this.addEventListener('blur', () => {\n            this._setPasswordVisible(false);\n          });\n        }\n\n        _preventDefault(e) {\n          e.preventDefault();\n        }\n\n        _togglePasswordVisibility() {\n          this._setPasswordVisible(!this.passwordVisible);\n        }\n\n        _passwordVisibleChange(passwordVisible) {\n          this.focusElement.type = passwordVisible ? 'text' : 'password';\n        }\n      }\n\n      customElements.define(PasswordFieldElement.is, PasswordFieldElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.PasswordFieldElement = PasswordFieldElement;\n    })();\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/legacy/polymer-fn");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/utils/debounce");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("@polymer/iron-list/iron-list");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadinComboBoxItem = __webpack_require__(38);
utils_1.importStyle(cheerio.load(vaadinComboBoxItem)('body').html());
let ComboBoxItemElement = ComboBoxItemElement_1 = class ComboBoxItemElement extends vaadin_themable_mixin_1.default(polymer_element_1.Element) {
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
};
ComboBoxItemElement = ComboBoxItemElement_1 = __decorate([
    polymer3_decorators_1.component(ComboBoxItemElement_1.is)
], ComboBoxItemElement);
var ComboBoxItemElement_1;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-combo-box-item\">\n  <template>\n    <style>\n      :host {\n        display: block;\n      }\n\n      :host([hidden]) {\n         display: none;\n      }\n    </style>\n    <span id=\"content\">[[label]]</span>\n  </template>\n</dom-module>\n\n<script>\n  {\n    /**\n     * The default element used for items in the vaadin-combobox.\n     *\n     * ### Styling\n     *\n     * The following state attributes are exposed for styling:\n     *\n     * Attribute    | Description | Part name\n     * -------------|-------------|------------\n     * `selected` | Set when the item is selected | :host\n     * `focused` | Set when the item is focused | :host\n     *\n     * @memberof Vaadin\n     * @mixes Vaadin.ThemableMixin\n     */\n    class ComboBoxItemElement extends Vaadin.ThemableMixin(Polymer.Element) {\n      static get is() {\n        return 'vaadin-combo-box-item';\n      }\n\n      static get properties() {\n        return {\n          /**\n           * The index of the item\n           */\n          index: Number,\n\n          /**\n           * The item to render\n           * @type {(String|Object)}\n           */\n          item: Object,\n\n          /**\n           * The text label corresponding to the item\n           */\n          label: String,\n\n          /**\n           * True when item is selected\n           */\n          selected: {\n            type: Boolean,\n            value: false,\n            reflectToAttribute: true\n          },\n\n          /**\n           * True when item is focused\n           */\n          focused: {\n            type: Boolean,\n            value: false,\n            reflectToAttribute: true\n          },\n\n          /**\n           * The template instance corresponding to the item\n           */\n          _itemTemplateInstance: Object\n        };\n      }\n\n      static get observers() {\n        return [\n          '_updateTemplateInstanceVariable(\"index\", index, _itemTemplateInstance)',\n          '_updateTemplateInstanceVariable(\"item\", item, _itemTemplateInstance)',\n          '_updateTemplateInstanceVariable(\"selected\", selected, _itemTemplateInstance)',\n          '_updateTemplateInstanceVariable(\"focused\", focused, _itemTemplateInstance)'\n        ];\n      }\n\n      connectedCallback() {\n        super.connectedCallback();\n\n        if (!this._itemTemplateInstance) {\n          // 2.0 has __dataHost. Might want to consider assigning combobox reference directly to item.\n          const overlay = this.getRootNode().host; // equivalent of `this.domHost` from legacy API\n          const dropdown = overlay.__dataHost;\n          const comboBoxOverlay = dropdown.getRootNode().host;\n          const comboBox = comboBoxOverlay.getRootNode().host;\n          comboBox._ensureTemplatized();\n          if (comboBox._TemplateClass) {\n            this._itemTemplateInstance = new comboBox._TemplateClass({});\n            this.root.removeChild(this.$.content);\n            this.root.appendChild(this._itemTemplateInstance.root);\n          }\n        }\n      }\n\n      _updateTemplateInstanceVariable(variable, value, _itemTemplateInstance) {\n        if (variable === undefined || value === undefined || _itemTemplateInstance === undefined) {\n          return;\n        }\n        _itemTemplateInstance[variable] = value;\n      }\n    }\n\n    customElements.define(ComboBoxItemElement.is, ComboBoxItemElement);\n\n    /**\n     * @namespace Vaadin\n     */\n    window.Vaadin = window.Vaadin || {};\n    Vaadin.ComboBoxItemElement = ComboBoxItemElement;\n  }\n</script>\n</body></html>";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const class_1 = __webpack_require__(9);
const iron_resizable_behavior_1 = __webpack_require__(8);
const vaadin_overlay_1 = __webpack_require__(13);
const vaadinComboBoxDropdown = __webpack_require__(42);
let VaadinComboBoxOverlay = VaadinComboBoxOverlay_1 = class VaadinComboBoxOverlay extends vaadin_overlay_1.OverlayElement {
    static get is() {
        return 'vaadin-combo-box-overlay';
    }
};
VaadinComboBoxOverlay = VaadinComboBoxOverlay_1 = __decorate([
    polymer3_decorators_1.component(VaadinComboBoxOverlay_1.is)
], VaadinComboBoxOverlay);
let DropdownElement = DropdownElement_1 = class DropdownElement extends class_1.mixinBehaviors(iron_resizable_behavior_1.IronResizableBehavior, polymer_element_1.Element) {
    constructor() {
        super();
        this._boundSetPosition = this._setPosition.bind(this);
    }
    static get template() {
        const domModule = cheerio.load(vaadinComboBoxDropdown)('template');
        const html = domModule.html();
        return html;
    }
    static get is() {
        return 'vaadin-combo-box-dropdown';
    }
    static get properties() {
        return {
            opened: {
                type: Boolean,
                notify: true
            },
            template: {
                type: Object,
                notify: true
            },
            /**
             * True if the device supports touch events.
             */
            touchDevice: {
                type: Boolean,
                reflectToAttribute: true,
                value: () => {
                    try {
                        document.createEvent('TouchEvent');
                        return true;
                    }
                    catch (e) {
                        return false;
                    }
                }
            },
            /**
             * The element to position/align the dropdown by.
             */
            positionTarget: {
                type: Object
            },
            /**
             * Vertical offset for the overlay position.
             */
            verticalOffset: {
                type: Number,
                value: 0
            },
            /**
             * If `true`, overlay is aligned above the `positionTarget`
             */
            alignedAbove: {
                type: Boolean,
                value: false
            }
        };
    }
    static get observers() {
        return ['_openedChanged(opened)'];
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('iron-resize', this._boundSetPosition);
    }
    ready() {
        super.ready();
        // Preventing the default modal behaviour of the overlay on input clicking
        this.$.overlay.addEventListener('vaadin-overlay-outside-click', e => {
            e.preventDefault();
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('iron-resize', this._boundSetPosition);
        // Making sure the overlay is closed and removed from DOM after detaching the dropdown.
        this.opened = false;
    }
    notifyResize() {
        super.notifyResize();
        if (this.positionTarget && this.opened) {
            this._setPosition(this); //
            // Schedule another position update (to cover virtual keyboard opening for example)
            requestAnimationFrame(this._setPosition.bind(this));
        }
    }
    /**
     * Fired after the `vaadin-combo-box-dropdown` opens.
     *
     * @event vaadin-combo-box-dropdown-opened
     */
    /**
     * Fired after the `vaadin-combo-box-dropdown` closes.
     *
     * @event vaadin-combo-box-dropdown-closed
     */
    _openedChanged(opened) {
        if (opened) {
            this.$.overlay.style.position = this._isPositionFixed(this.positionTarget) ? 'fixed' : 'absolute';
            this._setPosition(this); //
            window.addEventListener('scroll', this._boundSetPosition, true);
            document.addEventListener('click', this._outsideClickListener.bind(this), true);
            this.dispatchEvent(new CustomEvent('vaadin-combo-box-dropdown-opened', { bubbles: true, composed: true }));
        }
        else {
            window.removeEventListener('scroll', this._boundSetPosition, true);
            document.removeEventListener('click', this._outsideClickListener.bind(this), true);
            this.dispatchEvent(new CustomEvent('vaadin-combo-box-dropdown-closed', { bubbles: true, composed: true }));
        }
    }
    // We need to listen on 'click' event and capture it and close the overlay before
    // propagating the event to the listener in the button. Otherwise, if the clicked button would call
    // open(), this would happen: https://www.youtube.com/watch?v=Z86V_ICUCD4
    _outsideClickListener(event) {
        const eventPath = event.composedPath();
        if (eventPath.indexOf(this.positionTarget) < 0 && eventPath.indexOf(this.$.overlay) < 0) {
            this.opened = false;
        }
    }
    _isPositionFixed(element) {
        const offsetParent = this._getOffsetParent(element);
        return window.getComputedStyle(element).position === 'fixed' ||
            (offsetParent && this._isPositionFixed(offsetParent));
    }
    _getOffsetParent(element) {
        if (element.assignedSlot) {
            return element.assignedSlot.parentElement;
        }
        else if (element.parentElement) {
            return element.offsetParent;
        }
        const parent = element.parentNode;
        if (parent && parent.nodeType === 11 && parent.host) {
            return parent.host; // parent is #shadowRoot
        }
    }
    _verticalOffset(overlayRect, targetRect) {
        if (this.alignedAbove) {
            return -overlayRect.height;
        }
        else {
            return targetRect.height + this.verticalOffset;
        }
    }
    _shouldAlignAbove() {
        const spaceBelow = (window.innerHeight -
            this.positionTarget.getBoundingClientRect().bottom -
            Math.min(document.body.scrollTop, 0)) / window.innerHeight;
        return spaceBelow < 0.30;
    }
    _setPosition(e) {
        if (e && e.target) {
            const target = e.target === document ? document.body : e.target;
            const parent = this.$.overlay.parentElement;
            if (!(target.contains(this.$.overlay) || target.contains(this.positionTarget)) || parent !== document.body) {
                return;
            }
        }
        const targetRect = this.positionTarget.getBoundingClientRect();
        this.alignedAbove = this._shouldAlignAbove();
        const overlayRect = this.$.overlay.getBoundingClientRect();
        this._translateX = targetRect.left - overlayRect.left + (this._translateX || 0);
        this._translateY = targetRect.top - overlayRect.top + (this._translateY || 0) +
            this._verticalOffset(overlayRect, targetRect);
        const _devicePixelRatio = window.devicePixelRatio || 1;
        this._translateX = Math.round(this._translateX * _devicePixelRatio) / _devicePixelRatio;
        this._translateY = Math.round(this._translateY * _devicePixelRatio) / _devicePixelRatio;
        this.$.overlay.style.transform = `translate3d(${this._translateX}px, ${this._translateY}px, 0)`;
        this.$.overlay.style.width = this.positionTarget.clientWidth + 'px';
        this.$.overlay.style.justifyContent = this.alignedAbove ? 'flex-end' : 'flex-start';
        // TODO: fire only when position actually changes changes
        this.dispatchEvent(new CustomEvent('position-changed'));
    }
};
DropdownElement = DropdownElement_1 = __decorate([
    polymer3_decorators_1.component(DropdownElement_1.is),
    __metadata("design:paramtypes", [])
], DropdownElement);
var VaadinComboBoxOverlay_1, DropdownElement_1;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/utils/settings");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../polymer/lib/utils/templatize.html\">\n<link rel=\"import\" href=\"../polymer/lib/utils/flattened-nodes-observer.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-overlay-default-theme\">\n  <template>\n    <style>\n      :host {\n        /* Make nice gaps inside viewport */\n        top: 8px;\n        right: 8px;\n        left: 8px;\n        bottom: 8px;\n      }\n\n      [part=\"overlay\"] {\n        background: #fff;\n        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-overlay\">\n  <template>\n    <style>\n      :host {\n        z-index: 200;\n        position: fixed;\n\n        /*\n          Despite of what the names say, <vaadin-overlay> is just a container\n          for position/sizing/alignment. The actual overlay is the overlay part.\n        */\n\n        /*\n          Default position constraints: the entire viewport. Note: themes can\n          override this to introduce gaps between the overlay and the viewport.\n        */\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n\n        /* Use flexbox alignment for the overlay part. */\n        display: flex;\n        flex-direction: column; /* makes dropdowns sizing easier */\n        /* Align to center by default. */\n        align-items: center;\n        justify-content: center;\n\n        /* Allow centering when max-width/max-height applies. */\n        margin: auto;\n\n        /* The host is not clickable, only the overlay part is. */\n        pointer-events: none;\n\n        /* Remove tap highlight on touch devices. */\n        -webkit-tap-highlight-color: transparent;\n      }\n\n      :host(:not([opened])) {\n        display: none !important;\n      }\n\n      [part=\"overlay\"] {\n        -webkit-overflow-scrolling: touch;\n        overflow: auto;\n        pointer-events: auto;\n        max-width: 100%; /* prevents overflowing the host in MSIE 11 */\n        -webkit-tap-highlight-color: initial; /* reenable tap highlight inside */\n      }\n\n      [part=\"backdrop\"] {\n        z-index: -1;\n        content: \"\";\n        background: rgba(0, 0, 0, 0.5);\n        position: fixed;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        right: 0;\n        pointer-events: auto;\n      }\n    </style>\n\n    <div id=\"backdrop\" part=\"backdrop\" hidden$=\"{{!withBackdrop}}\">\n\n    </div>\n    <div part=\"overlay\" id=\"overlay\">\n      <div part=\"content\" id=\"content\">\n        <slot id=\"slot\"></slot>\n      </div>\n    </div>\n  </template>\n</dom-module>\n\n<script>\n  if (!Polymer.Element) {\n    throw new Error(`Unexpected Polymer version ${Polymer.version} is used, expected v2.0.0 or later.`);\n  }\n\n  {\n    /**\n     * `<vaadin-overlay>` is a Polymer 2 element for creating overlays.\n     * @memberof Vaadin\n     * @mixes Vaadin.ThemableMixin\n     * @demo demo/index.html\n     */\n    class OverlayElement extends Vaadin.ThemableMixin(Polymer.Element) {\n      static get is() {\n        return 'vaadin-overlay';\n      }\n\n      static get properties() {\n        return {\n          opened: {\n            type: Boolean,\n            notify: true,\n            reflectToAttribute: true\n          },\n\n          template: {\n            type: Object,\n            notify: true\n          },\n\n          content: {\n            type: Object,\n            notify: true\n          },\n\n          withBackdrop: {\n            type: Boolean,\n            value: false,\n            reflectToAttribute: true\n          },\n\n\n          /**\n           * When true move focus to the first focusable element in the overlay,\n           * or to the overlay if there are no focusable elements.\n           */\n          focusTrap: {\n            type: Boolean,\n            value: false\n          },\n\n          _focusedElement: {\n            type: Object\n          },\n\n          _mouseDownInside: {\n            type: Boolean\n          },\n\n          _mouseUpInside: {\n            type: Boolean\n          },\n\n          _instance: {\n            type: Object\n          },\n\n          _boundIronOverlayCanceledListener: {\n            type: Object\n          }\n        };\n      }\n\n      static get observers() {\n        return ['_openedChanged(opened)', '_templateChanged(template)', '_contentChanged(content)'];\n      }\n\n      constructor() {\n        super();\n        this._boundMouseDownListener = this._mouseDownListener.bind(this);\n        this._boundMouseUpListener = this._mouseUpListener.bind(this);\n        this._boundOutsideClickListener = this._outsideClickListener.bind(this);\n        this._boundKeydownListener = this._keydownListener.bind(this);\n\n        this._observer = new Polymer.FlattenedNodesObserver(this, info => {\n          this._setTemplateFromNodes(info.addedNodes);\n        });\n\n        // Listener for preventing closing of the paper-dialog and all components extending `iron-overlay-behavior`.\n        this._boundIronOverlayCanceledListener = e => {\n          e.preventDefault();\n          window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);\n        };\n      }\n\n      ready() {\n        super.ready();\n\n        this._observer.flush();\n\n        // Need to add dummy click listeners to this and the backdrop or else\n        // the document click event listener (_outsideClickListener) may never\n        // get invoked on iOS Safari (reproducable in <vaadin-dialog> \n        // and <vaadin-context-menu>).\n        this.addEventListener('click', () => {});\n        this.$.backdrop.addEventListener('click', () => {});\n      }\n\n      _setTemplateFromNodes(nodes) {\n        this.template = nodes.filter(node => node.localName && node.localName === 'template')[0] || this.template;\n      }\n\n      /**\n       * @event vaadin-overlay-close\n       * fired before the `vaadin-overlay` will be closed. If canceled the closing of the overlay is canceled as well.\n       */\n      close(sourceEvent) {\n        var evt = new CustomEvent('vaadin-overlay-close', {bubbles: true, cancelable: true, detail: {sourceEvent: sourceEvent}});\n        this.dispatchEvent(evt);\n        if (!evt.defaultPrevented) {\n          this.opened = false;\n        }\n      }\n\n      connectedCallback() {\n        super.connectedCallback();\n\n        if (this.parentNode === document.body) {\n          window.addEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);\n        }\n      }\n\n      disconnectedCallback() {\n        super.disconnectedCallback();\n\n        // Removing the event listener in case `iron-overlay-canceled` was not fired.\n        // In Shady DOM the overlay can be reattached asynchronously so we need to check that the overlay is not currently attached to body.\n        if (window.ShadyDOM && window.ShadyDOM.inUse) {\n          if (this.parentNode !== document.body) {\n            window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);\n          }\n        } else {\n          if (!this.parentNode) {\n            window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);\n          }\n        }\n      }\n\n      _mouseDownListener(event) {\n        this._mouseDownInside = event.composedPath().indexOf(this.$.overlay) >= 0;\n      }\n\n      _mouseUpListener(event) {\n        this._mouseUpInside = event.composedPath().indexOf(this.$.overlay) >= 0;\n      }\n\n      /**\n       * We need to listen on 'click' / 'tap' event and capture it and close the overlay before\n       * propagating the event to the listener in the button. Otherwise, if the clicked button would call\n       * open(), this would happen: https://www.youtube.com/watch?v=Z86V_ICUCD4\n       *\n       * @event vaadin-overlay-outside-click\n       * fired before the `vaadin-overlay` will be closed on outside click. If canceled the closing of the overlay is canceled as well.\n       */\n      _outsideClickListener(event) {\n        if (event.composedPath().indexOf(this.$.overlay) !== -1 ||\n            this._mouseDownInside || this._mouseUpInside) {\n          this._mouseDownInside = false;\n          this._mouseUpInside = false;\n          return;\n        }\n\n        const evt = new CustomEvent('vaadin-overlay-outside-click', {bubbles: true, cancelable: true, detail: {sourceEvent: event}});\n        this.dispatchEvent(evt);\n\n        if (this.opened && !evt.defaultPrevented) {\n          this.close(event);\n        }\n      }\n\n      /**\n       * @event vaadin-overlay-escape-press\n       * fired before the `vaadin-overlay` will be closed on ESC button press. If canceled the closing of the overlay is canceled as well.\n       */\n      _keydownListener(event) {\n        // TAB\n        if (event.keyCode === 9 && this.focusTrap) {\n          const focusableElements = this._getFocusableElements();\n          const focusedElementIndex = focusableElements.indexOf(this._focusedElement);\n\n          // Cycle to the next button\n          if (!event.shiftKey) {\n            this._setFocus(focusedElementIndex, 1);\n\n          // Cycle to the prev button\n          } else {\n            this._setFocus(focusedElementIndex, -1);\n          }\n\n          event.preventDefault();\n\n        // ESC\n        } else if (event.keyCode === 27) {\n          const evt = new CustomEvent('vaadin-overlay-escape-press', {bubbles: true, cancelable: true, detail: {sourceEvent: event}});\n          this.dispatchEvent(evt);\n\n          if (this.opened && !evt.defaultPrevented) {\n            this.close(event);\n          }\n        }\n      }\n\n      /**\n       * @event vaadin-overlay-open\n       * fired after the `vaadin-overlay` is opened.\n       */\n      _openedChanged(opened) {\n        if (opened) {\n          this._placeholder = document.createComment('vaadin-overlay-placeholder');\n          this.parentNode.insertBefore(this._placeholder, this);\n          document.body.appendChild(this);\n\n          document.addEventListener('mousedown', this._boundMouseDownListener);\n          document.addEventListener('mouseup', this._boundMouseUpListener);\n          document.addEventListener('click', this._boundOutsideClickListener, true);\n          document.addEventListener('keydown', this._boundKeydownListener);\n\n          // Set body pointer-events to 'none' to disable mouse interactions with\n          // other document nodes (combo-box is \"modal\")\n          this._previousDocumentPointerEvents = document.body.style.pointerEvents;\n          document.body.style.pointerEvents = 'none';\n\n          Polymer.Async.idlePeriod.run(() => {\n            // Focus\n            //  - the overlay content by default\n            //  - or the first focusable element if focusTrap is true\n            this._setFocus(-1, 1);\n\n            const evt = new CustomEvent('vaadin-overlay-open', {bubbles: true});\n            this.dispatchEvent(evt);\n          });\n\n        } else if (this._placeholder) {\n          document.removeEventListener('mousedown', this._boundMouseDownListener);\n          document.removeEventListener('mouseup', this._boundMouseUpListener);\n          document.removeEventListener('click', this._boundOutsideClickListener, true);\n          document.removeEventListener('keydown', this._boundKeydownListener);\n\n          this._placeholder.parentNode.insertBefore(this, this._placeholder);\n          this._processPendingMutationObserversFor(document.body);\n          this._placeholder.parentNode.removeChild(this._placeholder);\n\n          document.body.style.pointerEvents = this._previousDocumentPointerEvents;\n        }\n      }\n\n      _templateChanged(template) {\n        const Templatizer = Polymer.Templatize.templatize(template, this, {\n          forwardHostProp: function(prop, value) {\n            if (this._instance) {\n              this._instance.forwardHostProp(prop, value);\n            }\n          }\n        });\n\n        this._instance = new Templatizer({});\n        this.content = this._instance.root;\n      }\n\n      _contentChanged(content) {\n        this.$.content.appendChild(content);\n      }\n\n      _setFocus(index, increment) {\n        if (!this.focusTrap) {\n          return;\n        }\n\n        const focusableElements = this._getFocusableElements();\n\n        // search for visible elements and select the next possible match\n        for (let i = 0; i < focusableElements.length; i++) {\n          index = index + increment;\n\n          // rollover to first item\n          if (index === focusableElements.length) {\n            index = 0;\n\n          // go to last item\n          } else if (index === -1) {\n            index = focusableElements.length - 1;\n          }\n\n          // determine if element is visible\n          const el = focusableElements[index];\n          if (this._isVisible(el)) {\n            this._focusedElement = el;\n            return el.focus();\n          }\n        }\n\n        // fallback if there are no focusable elements\n        this._focusedElement = this.$.overlay;\n        this.$.overlay.focus();\n      }\n\n      // borrowed from jqeury $(elem).is(':visible') implementation\n      _isVisible(elem) {\n        return elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length;\n      }\n\n      _getFocusableElements() {\n        // collect all focusable elements\n        const focusableElements = Array.from(this.$.content.querySelectorAll(\n          '[tabindex], button, input, select, textarea, object, iframe, label, a[href], area[href]'\n        )).filter((el) => {\n          return el.getAttribute('tabindex') !== '-1';\n        });\n\n        // sort focusable elements according to tabindex\n        return focusableElements.sort((a, b) => {\n          a = parseInt(a.getAttribute('tabindex')) || 0;\n          b = parseInt(b.getAttribute('tabindex')) || 0;\n          if (a === b) {\n            return 0;\n          } else if (a === 0) {\n            return 1;\n          } else if (b === 0) {\n            return -1;\n          } else if (a < b) {\n            return -1;\n          } else if (a > b) {\n            return 1;\n          }\n        });\n      }\n\n      _processPendingMutationObserversFor(node) {\n        if (window.CustomElements && !Polymer.Settings.useNativeCustomElements) {\n          CustomElements.takeRecords(node);\n        }\n      }\n    }\n\n    customElements.define(OverlayElement.is, OverlayElement);\n\n    /**\n     * @namespace Vaadin\n     */\n    window.Vaadin = window.Vaadin || {};\n    Vaadin.OverlayElement = OverlayElement;\n  }\n</script>\n</body></html>";

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../vaadin-overlay/vaadin-overlay.html\">\n<link rel=\"import\" href=\"../iron-resizable-behavior/iron-resizable-behavior.html\">\n\n</head><body><dom-module id=\"vaadin-combo-box-dropdown\">\n  <template>\n    <style>\n      :host {\n        display: block;\n      }\n\n      :host > #overlay {\n        display: none;\n      }\n    </style>\n    <vaadin-combo-box-overlay id=\"overlay\" opened=\"[[opened]]\" template=\"{{template}}\" style=\"align-items: stretch; margin: 0;\">\n      <slot></slot>\n    </vaadin-combo-box-overlay>\n  </template>\n</dom-module>\n\n<script>\n  {\n    /**\n     * The overlay element.\n     *\n     * ### Styling\n     *\n     * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/vaadin-overlay.html)\n     * for `<vaadin-combo-box-overlay>` parts.\n     *\n     * @memberof Vaadin\n     */\n    class VaadinComboBoxOverlay extends Vaadin.OverlayElement {\n      static get is() {\n        return 'vaadin-combo-box-overlay';\n      }\n    }\n\n    customElements.define(VaadinComboBoxOverlay.is, VaadinComboBoxOverlay);\n\n    /**\n     * Element for internal use only.\n     *\n     * @memberof Vaadin\n     */\n    class DropdownElement extends Polymer.mixinBehaviors(Polymer.IronResizableBehavior, Polymer.Element) {\n      static get is() {\n        return 'vaadin-combo-box-dropdown';\n      }\n\n      static get properties() {\n        return {\n          opened: {\n            type: Boolean,\n            notify: true\n          },\n\n          template: {\n            type: Object,\n            notify: true\n          },\n\n          /**\n           * True if the device supports touch events.\n           */\n          touchDevice: {\n            type: Boolean,\n            reflectToAttribute: true,\n            value: () => {\n              try {\n                document.createEvent('TouchEvent');\n                return true;\n              } catch (e) {\n                return false;\n              }\n            }\n          },\n\n          /**\n           * The element to position/align the dropdown by.\n           */\n          positionTarget: {\n            type: Object\n          },\n\n          /**\n           * Vertical offset for the overlay position.\n           */\n          verticalOffset: {\n            type: Number,\n            value: 0\n          },\n\n          /**\n           * If `true`, overlay is aligned above the `positionTarget`\n           */\n          alignedAbove: {\n            type: Boolean,\n            value: false\n          }\n        };\n      }\n\n      static get observers() {\n        return ['_openedChanged(opened)'];\n      }\n\n      constructor() {\n        super();\n        this._boundSetPosition = this._setPosition.bind(this);\n      }\n\n      connectedCallback() {\n        super.connectedCallback();\n        this.addEventListener('iron-resize', this._boundSetPosition);\n      }\n\n      ready() {\n        super.ready();\n\n        // Preventing the default modal behaviour of the overlay on input clicking\n        this.$.overlay.addEventListener('vaadin-overlay-outside-click', e => {\n          e.preventDefault();\n        });\n      }\n\n      disconnectedCallback() {\n        super.disconnectedCallback();\n        this.removeEventListener('iron-resize', this._boundSetPosition);\n\n        // Making sure the overlay is closed and removed from DOM after detaching the dropdown.\n        this.opened = false;\n      }\n\n      notifyResize() {\n        super.notifyResize();\n\n        if (this.positionTarget && this.opened) {\n          this._setPosition();\n          // Schedule another position update (to cover virtual keyboard opening for example)\n          requestAnimationFrame(this._setPosition.bind(this));\n        }\n      }\n\n      /**\n       * Fired after the `vaadin-combo-box-dropdown` opens.\n       *\n       * @event vaadin-combo-box-dropdown-opened\n       */\n      /**\n       * Fired after the `vaadin-combo-box-dropdown` closes.\n       *\n       * @event vaadin-combo-box-dropdown-closed\n       */\n\n      _openedChanged(opened) {\n        if (opened) {\n          this.$.overlay.style.position = this._isPositionFixed(this.positionTarget) ? 'fixed' : 'absolute';\n          this._setPosition();\n\n          window.addEventListener('scroll', this._boundSetPosition, true);\n          document.addEventListener('click', this._outsideClickListener.bind(this), true);\n          this.dispatchEvent(new CustomEvent('vaadin-combo-box-dropdown-opened', {bubbles: true, composed: true}));\n        } else {\n          window.removeEventListener('scroll', this._boundSetPosition, true);\n          document.removeEventListener('click', this._outsideClickListener.bind(this), true);\n          this.dispatchEvent(new CustomEvent('vaadin-combo-box-dropdown-closed', {bubbles: true, composed: true}));\n        }\n      }\n\n\n      // We need to listen on 'click' event and capture it and close the overlay before\n      // propagating the event to the listener in the button. Otherwise, if the clicked button would call\n      // open(), this would happen: https://www.youtube.com/watch?v=Z86V_ICUCD4\n      _outsideClickListener(event) {\n        const eventPath = event.composedPath();\n        if (eventPath.indexOf(this.positionTarget) < 0 && eventPath.indexOf(this.$.overlay) < 0) {\n          this.opened = false;\n        }\n      }\n\n      _isPositionFixed(element) {\n        const offsetParent = this._getOffsetParent(element);\n\n        return window.getComputedStyle(element).position === 'fixed' ||\n          (offsetParent && this._isPositionFixed(offsetParent));\n      }\n\n      _getOffsetParent(element) {\n        if (element.assignedSlot) {\n          return element.assignedSlot.parentElement;\n        } else if (element.parentElement) {\n          return element.offsetParent;\n        }\n\n        const parent = element.parentNode;\n\n        if (parent && parent.nodeType === 11 && parent.host) {\n          return parent.host; // parent is #shadowRoot\n        }\n      }\n\n      _verticalOffset(overlayRect, targetRect) {\n        if (this.alignedAbove) {\n          return -overlayRect.height;\n        } else {\n          return targetRect.height + this.verticalOffset;\n        }\n      }\n\n      _shouldAlignAbove() {\n        const spaceBelow = (\n          window.innerHeight -\n          this.positionTarget.getBoundingClientRect().bottom -\n          Math.min(document.body.scrollTop, 0)\n        ) / window.innerHeight;\n\n        return spaceBelow < 0.30;\n      }\n\n      _setPosition(e) {\n        if (e && e.target) {\n          const target = e.target === document ? document.body : e.target;\n          const parent = this.$.overlay.parentElement;\n          if (!(target.contains(this.$.overlay) || target.contains(this.positionTarget)) || parent !== document.body) {\n            return;\n          }\n        }\n\n        const targetRect = this.positionTarget.getBoundingClientRect();\n        this.alignedAbove = this._shouldAlignAbove();\n\n        const overlayRect = this.$.overlay.getBoundingClientRect();\n        this._translateX = targetRect.left - overlayRect.left + (this._translateX || 0);\n        this._translateY = targetRect.top - overlayRect.top + (this._translateY || 0) +\n          this._verticalOffset(overlayRect, targetRect);\n\n        const _devicePixelRatio = window.devicePixelRatio || 1;\n        this._translateX = Math.round(this._translateX * _devicePixelRatio) / _devicePixelRatio;\n        this._translateY = Math.round(this._translateY * _devicePixelRatio) / _devicePixelRatio;\n        this.$.overlay.style.transform = `translate3d(${this._translateX}px, ${this._translateY}px, 0)`;\n\n        this.$.overlay.style.width = this.positionTarget.clientWidth + 'px';\n        this.$.overlay.style.justifyContent = this.alignedAbove ? 'flex-end' : 'flex-start';\n\n        // TODO: fire only when position actually changes changes\n        this.dispatchEvent(new CustomEvent('position-changed'));\n      }\n    }\n\n    customElements.define(DropdownElement.is, DropdownElement);\n\n    /**\n     * @namespace Vaadin\n     */\n    window.Vaadin = window.Vaadin || {};\n    Vaadin.DropdownElement = DropdownElement;\n  }\n</script>\n</body></html>";

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../polymer/lib/utils/debounce.html\">\n<link rel=\"import\" href=\"../iron-list/iron-list.html\">\n<link rel=\"import\" href=\"../iron-resizable-behavior/iron-resizable-behavior.html\">\n<link rel=\"import\" href=\"vaadin-combo-box-item.html\">\n<link rel=\"import\" href=\"vaadin-combo-box-dropdown.html\">\n\n</head><body><dom-module id=\"vaadin-combo-box-dropdown-wrapper\">\n  <template>\n    <vaadin-combo-box-dropdown id=\"dropdown\" opened=\"{{opened}}\" position-target=\"[[positionTarget]]\" vertical-offset=\"[[verticalOffset]]\" on-template-changed=\"_templateChanged\" on-position-changed=\"_setOverlayHeight\">\n      <template>\n        <style>\n          :host([opened][loading]) {\n            display: block !important;\n            height: 58px;\n          }\n\n          #scroller {\n            overflow: auto;\n\n            /* Fixes item background from getting on top of scrollbars on Safari */\n            transform: translate3d(0, 0, 0);\n\n            /* Enable momentum scrolling on iOS (iron-list v1.2+ no longer does it for us) */\n            -webkit-overflow-scrolling: touch;\n          }\n\n          #selector {\n            --iron-list-items-container: {\n              border-top: 8px solid transparent;\n              border-bottom: 8px solid transparent;\n            };\n          }\n        </style>\n        <div id=\"scroller\" on-click=\"_stopPropagation\" hidden$=\"[[loading]]\">\n          <iron-list id=\"selector\" role=\"listbox\" items=\"[[_items]]\" scroll-target=\"[[_scroller]]\">\n            <template>\n              <vaadin-combo-box-item on-click=\"_onItemClick\" index=\"[[index]]\" item=\"[[item]]\" label=\"[[getItemLabel(item)]]\" selected=\"[[_isItemSelected(item, _selectedItem)]]\" role$=\"[[_getAriaRole(index)]]\" aria-selected$=\"[[_getAriaSelected(_focusedIndex,index)]]\" focused=\"[[_isItemFocused(_focusedIndex,index)]]\" touch-device$=\"[[touchDevice]]\">\n              </vaadin-combo-box-item>\n            </template>\n          </iron-list>\n        </div>\n      </template>\n    </vaadin-combo-box-dropdown>\n  </template>\n</dom-module>\n\n<script>\n  {\n    /**\n     * Element for internal use only.\n     *\n     * @memberof Vaadin\n     */\n    class ComboBoxOverlayElement extends Polymer.Element {\n      static get is() {\n        return 'vaadin-combo-box-dropdown-wrapper';\n      }\n\n      static get properties() {\n        return {\n          /**\n           * True if the device supports touch events.\n           */\n          touchDevice: {\n            type: Boolean,\n            reflectToAttribute: true,\n            value: () => {\n              try {\n                document.createEvent('TouchEvent');\n                return true;\n              } catch (e) {\n                return false;\n              }\n            }\n          },\n\n          opened: Boolean,\n\n          /*\n           * `true` when new items are being loaded.\n           */\n          loading: {\n            type: Boolean,\n            value: false,\n            reflectToAttribute: true,\n            observer: '_setOverlayHeight'\n          },\n\n          /**\n           * Vertical offset for the overlay position.\n           */\n          verticalOffset: {\n            type: Number,\n            value: 0\n          },\n\n          _selectedItem: {\n            type: Object\n          },\n\n          _items: {\n            type: Object\n          },\n\n          _focusedIndex: {\n            type: Number,\n            notify: true,\n            value: -1,\n            observer: '_focusedIndexChanged'\n          },\n\n          _focusedItem: {\n            type: String,\n            computed: '_getFocusedItem(_focusedIndex)'\n          },\n\n          _itemLabelPath: {\n            type: String,\n            value: 'label'\n          },\n\n          _itemValuePath: {\n            type: String,\n            value: 'value'\n          },\n\n          _selector: Object\n        };\n      }\n\n      static get observers() {\n        return ['_selectorChanged(_selector)', '_loadingChanged(loading)'];\n      }\n\n      ready() {\n        super.ready();\n        // IE11: when scrolling with mouse, the focus goes to the scroller.\n        // This causes the overlay closing due to defocusing the input field.\n        // Prevent focusing the scroller by setting `unselectable=\"on\"`.\n        if (/Trident/.test(navigator.userAgent)) {\n          this._scroller.setAttribute('unselectable', 'on');\n        }\n\n        this.$.dropdown.$.overlay.addEventListener('touchstart', sourceEvent => {\n          const evt = new CustomEvent('vaadin-overlay-touch-start', {detail: {sourceEvent: sourceEvent}});\n          this.dispatchEvent(evt);\n        });\n\n        // Prevent blurring the input when clicking inside the overlay.\n        this.$.dropdown.$.overlay.addEventListener('mousedown', e => e.preventDefault());\n      }\n\n      _templateChanged(e) {\n        this._selector = this.$.dropdown.$.overlay.$.content.querySelector('#selector');\n        this._scroller = this.$.dropdown.$.overlay.$.content.querySelector('#scroller');\n      }\n\n      _loadingChanged(loading) {\n        if (loading) {\n          this.$.dropdown.$.overlay.setAttribute('loading', '');\n        } else {\n          this.$.dropdown.$.overlay.removeAttribute('loading');\n        }\n      }\n\n      _selectorChanged(selector) {\n        this._patchWheelOverScrolling();\n      }\n\n      _setOverlayHeight() {\n        if (!this.positionTarget || !this._selector) {\n          return;\n        }\n\n        const targetRect = this.positionTarget.getBoundingClientRect();\n\n        this._scroller.style.maxHeight = (window.ShadyCSS ?\n          window.ShadyCSS.getComputedStyleValue(this, '--vaadin-combo-box-overlay-max-height') :\n          getComputedStyle(this).getPropertyValue('--vaadin-combo-box-overlay-max-height')) || '65vh';\n\n        // overlay max height is restrained by the #scroller max height which is set to 65vh in CSS.\n        this.$.dropdown.$.overlay.style.maxHeight = this._maxOverlayHeight(targetRect);\n\n        // we need to set height for iron-list to make its `firstVisibleIndex` work correctly.\n        this._selector.style.maxHeight = this._maxOverlayHeight(targetRect);\n\n        this.updateViewportBoundaries();\n      }\n\n      _maxOverlayHeight(targetRect) {\n        const margin = 8;\n        const minHeight = 116; // Height of two items in combo-box\n        const bottom = Math.min(window.innerHeight, document.body.scrollHeight - document.body.scrollTop);\n\n        if (this.$.dropdown.alignedAbove) {\n          return Math.max(targetRect.top - margin + Math.min(document.body.scrollTop, 0), minHeight) + 'px';\n        } else {\n          return Math.max(bottom - targetRect.bottom - margin, minHeight) + 'px';\n        }\n      }\n\n      _getFocusedItem(focusedIndex) {\n        if (focusedIndex >= 0) {\n          return this._items[focusedIndex];\n        }\n      }\n\n      _isItemSelected(item, selectedItem) {\n        return item === selectedItem;\n      }\n\n      _onItemClick(e) {\n        if (e.detail && e.detail.sourceEvent && e.detail.sourceEvent.stopPropagation) {\n          this._stopPropagation(e.detail.sourceEvent);\n        }\n\n        this.dispatchEvent(new CustomEvent('selection-changed', {detail: {item: e.model.item}}));\n      }\n\n      /**\n       * Gets the index of the item with the provided label.\n       * @return {Number}\n       */\n      indexOfLabel(label) {\n        if (this._items && label) {\n          for (let i = 0; i < this._items.length; i++) {\n            if (this.getItemLabel(this._items[i]).toString().toLowerCase() ===\n              label.toString().toLowerCase()) {\n              return i;\n            }\n          }\n        }\n\n        return -1;\n      }\n\n      /**\n       * Gets the label string for the item based on the `_itemLabelPath`.\n       * @return {String}\n       */\n      getItemLabel(item) {\n        let label = item ? this.get(this._itemLabelPath, item) : undefined;\n        if (label === undefined) {\n          label = item ? item.toString() : '';\n        }\n        return label;\n      }\n\n      _isItemFocused(focusedIndex, itemIndex) {\n        return focusedIndex == itemIndex;\n      }\n\n      _getAriaSelected(focusedIndex, itemIndex) {\n        return this._isItemFocused(focusedIndex, itemIndex).toString();\n      }\n\n      _getAriaRole(itemIndex) {\n        return itemIndex !== undefined ? 'option' : false;\n      }\n\n      _focusedIndexChanged(index) {\n        if (index >= 0) {\n          this._scrollIntoView(index);\n        }\n      }\n\n      _scrollIntoView(index) {\n        const visibleItemsCount = this._visibleItemsCount();\n        if (visibleItemsCount === undefined) {\n          // Scroller is not visible. Moving is unnecessary.\n          return;\n        }\n\n        let targetIndex = index;\n\n        if (index > this._selector.lastVisibleIndex - 1) {\n          // Index is below the bottom, scrolling down. Make the item appear at the bottom.\n          targetIndex = index - visibleItemsCount + 1;\n        } else if (index > this._selector.firstVisibleIndex) {\n          // The item is already visible, scrolling is unnecessary per se. But we need to trigger iron-list to set\n          // the correct scrollTop on the scrollTarget. Scrolling to firstVisibleIndex.\n          targetIndex = this._selector.firstVisibleIndex;\n        }\n        this._selector.scrollToIndex(Math.max(0, targetIndex));\n\n        // Sometimes the item is partly below the bottom edge, detect and adjust.\n        const pidx = this._selector._getPhysicalIndex(index),\n          physicalItem = this._selector._physicalItems[pidx];\n        if (!physicalItem) {\n          return;\n        }\n        const physicalItemRect = physicalItem.getBoundingClientRect(),\n          scrollerRect = this._scroller.getBoundingClientRect(),\n          scrollTopAdjust = physicalItemRect.bottom - scrollerRect.bottom + this._viewportTotalPaddingBottom;\n        if (scrollTopAdjust > 0) {\n          this._scroller.scrollTop += scrollTopAdjust;\n        }\n      }\n\n      ensureItemsRendered() {\n        this._selector._render();\n      }\n\n      adjustScrollPosition() {\n        if (this._items) {\n          this._scrollIntoView(this._focusedIndex);\n        }\n      }\n\n      /**\n       * We want to prevent the kinetic scrolling energy from being transferred from the overlay contents over to the parent.\n       * Further improvement ideas: after the contents have been scrolled to the top or bottom and scrolling has stopped, it could allow\n       * scrolling the parent similarily to touch scrolling.\n       */\n      _patchWheelOverScrolling() {\n        const selector = this._selector;\n        selector.addEventListener('wheel', e => {\n          const scroller = selector._scroller || selector.scrollTarget;\n          const scrolledToTop = scroller.scrollTop === 0;\n          const scrolledToBottom = (scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight) <= 1;\n\n          if (scrolledToTop && e.deltaY < 0) {\n            e.preventDefault();\n          } else if (scrolledToBottom && e.deltaY > 0) {\n            e.preventDefault();\n          }\n        });\n      }\n\n      updateViewportBoundaries() {\n        this._cachedViewportTotalPaddingBottom = undefined;\n        this._selector.updateViewportBoundaries();\n      }\n\n      get _viewportTotalPaddingBottom() {\n        if (this._cachedViewportTotalPaddingBottom === undefined) {\n          const itemsStyle = window.getComputedStyle(this._selector.$.items);\n          this._cachedViewportTotalPaddingBottom = [\n            itemsStyle.paddingBottom,\n            itemsStyle.borderBottomWidth\n          ].map(v => {\n            return parseInt(v, 10);\n          }).reduce((sum, v) => {\n            return sum + v;\n          });\n        }\n\n        return this._cachedViewportTotalPaddingBottom;\n      }\n\n      _visibleItemsCount() {\n        if (!this._selector) {\n          return;\n        }\n\n        // Ensure items are rendered\n        this._selector.flushDebouncer('_debounceTemplate');\n        // Ensure items are positioned\n        this._selector.scrollToIndex(this._selector.firstVisibleIndex);\n        // Ensure viewport boundaries are up-to-date\n        this.updateViewportBoundaries();\n        return this._selector.lastVisibleIndex - this._selector.firstVisibleIndex + 1;\n      }\n\n      _selectItem(item) {\n        item = (typeof item === 'number') ? this._items[item] : item;\n        if (this._selector.selectedItem !== item) {\n          this._selector.selectItem(item);\n        }\n      }\n\n      _preventDefault(e) {\n        if (e.cancelable) {\n          e.preventDefault();\n        }\n      }\n\n      _stopPropagation(e) {\n        e.stopPropagation();\n      }\n    }\n\n    customElements.define(ComboBoxOverlayElement.is, ComboBoxOverlayElement);\n\n    /**\n     * @namespace Vaadin\n     */\n    window.Vaadin = window.Vaadin || {};\n    Vaadin.ComboBoxOverlayElement = ComboBoxOverlayElement;\n  }\n</script>\n</body></html>";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const class_1 = __webpack_require__(9);
const PolymerCaseMap = __webpack_require__(45);
const iron_a11y_keys_behavior_1 = __webpack_require__(18);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadin_combo_box_mixin_1 = __webpack_require__(17);
__webpack_require__(19);
__webpack_require__(16);
const vaadinComboBoxLight = __webpack_require__(46);
utils_1.importStyle(cheerio.load(vaadinComboBoxLight)('body').html());
let ComboBoxLightElement = ComboBoxLightElement_1 = class ComboBoxLightElement extends vaadin_themable_mixin_1.default(vaadin_combo_box_mixin_1.default(class_1.mixinBehaviors(iron_a11y_keys_behavior_1.IronA11yKeysBehavior, polymer_element_1.Element))) {
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
};
ComboBoxLightElement = ComboBoxLightElement_1 = __decorate([
    polymer3_decorators_1.component(ComboBoxLightElement_1.is)
], ComboBoxLightElement);
var ComboBoxLightElement_1;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/utils/case-map");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../iron-a11y-keys-behavior/iron-a11y-keys-behavior.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n<link rel=\"import\" href=\"vaadin-combo-box-mixin.html\">\n<link rel=\"import\" href=\"vaadin-combo-box-dropdown-wrapper.html\">\n<link rel=\"import\" href=\"vaadin-combo-box-styles.html\">\n\n</head><body><dom-module id=\"vaadin-combo-box-light\">\n  <template>\n\n    <slot></slot>\n\n    <vaadin-combo-box-dropdown-wrapper id=\"overlay\" opened=\"[[opened]]\" position-target=\"[[inputElement]]\" _focused-index=\"[[_focusedIndex]]\" _item-label-path=\"[[itemLabelPath]]\" loading=\"[[loading]]\" vertical-offset=\"[[overlayVerticalOffset]]\">\n    </vaadin-combo-box-dropdown-wrapper>\n  </template>\n</dom-module>\n\n<script>\n  {\n    /**\n     * `<vaadin-combo-box-light>` is a customizable version of the `<vaadin-combo-box>` providing\n     * only the dropdown functionality and leaving the input field definition to the user.\n     *\n     * The element has the same API as `<vaadin-combo-box>`.\n     *\n     * To create a custom input field, you need to add a child element which has a two-way\n     * data-bindable property representing the input value. The property name is expected\n     * to be `value` by default. See the example below for a simplest possible example\n     * using a `<vaadin-text-field>` element.\n     *\n     * ```html\n     * <vaadin-combo-box-light>\n     *   <vaadin-text-field>\n     *   </vaadin-text-field>\n     * </vaadin-combo-box-light>\n     * ```\n     *\n     * If you are using other custom input fields like `<iron-input>`, you\n     * need to define the name of the bindable property with the `attrForValue` attribute.\n     *\n     * ```html\n     * <vaadin-combo-box-light attr-for-value=\"bind-value\">\n     *   <iron-input>\n     *     <input>\n     *   </iron-input>\n     * </vaadin-combo-box-light>\n     * ```\n     *\n     * In the next example you can see how to create a custom input field based\n     * on a `<paper-input>` decorated with a custom `<iron-icon>` and\n     * two `<paper-button>`s to act as the clear and toggle controls.\n     *\n     * ```html\n     * <vaadin-combo-box-light>\n     *   <paper-input label=\"Elements\" class=\"input\">\n     *     <iron-icon icon=\"toll\" prefix></iron-icon>\n     *     <paper-button slot=\"suffix\" class=\"clear-button\">Clear</paper-button>\n     *     <paper-button slot=\"suffix\" class=\"toggle-button\">Toggle</paper-button>\n     *   </paper-input>\n     * </vaadin-combo-box-light>\n     * ```\n     * @memberof Vaadin\n     * @mixes Vaadin.ComboBoxMixin\n     * @mixes Vaadin.ThemableMixin\n     */\n    class ComboBoxLightElement extends Vaadin.ThemableMixin(Vaadin.ComboBoxMixin(Polymer.mixinBehaviors(\n      [Polymer.IronA11yKeysBehavior], Polymer.Element\n    ))) {\n\n      static get is() {\n        return 'vaadin-combo-box-light';\n      }\n\n      static get properties() {\n        return {\n          /**\n           * Name of the two-way data-bindable property representing the\n           * value of the custom input field.\n           */\n          attrForValue: {\n            type: String,\n            value: 'value'\n          },\n\n          /**\n           * Number of pixels used as the vertical offset in positioning of\n           * the dropdown.\n           */\n          overlayVerticalOffset: {\n            type: Number,\n            value: 0\n          },\n\n          inputElement: {\n            type: Element,\n            readOnly: true\n          }\n        };\n      }\n\n      ready() {\n        super.ready();\n        this._toggleElement = this.querySelector('.toggle-button');\n        this._clearElement = this.querySelector('.clear-button');\n      }\n\n      get focused() {\n        return this.getRootNode().activeElement === this.inputElement;\n      }\n\n      connectedCallback() {\n        super.connectedCallback();\n        const cssSelector = 'vaadin-text-field,iron-input,paper-input,.paper-input-input,.input';\n        this._setInputElement(this.querySelector(cssSelector));\n        this._revertInputValue();\n        this.listen(this.inputElement, 'input', '_inputValueChanged');\n        this._preventInputBlur();\n      }\n\n      disconnectedCallback() {\n        super.disconnectedCallback();\n        this.unlisten(this.inputElement, 'input', '_inputValueChanged');\n        this._restoreInputBlur();\n      }\n\n      get _propertyForValue() {\n        return Polymer.CaseMap.dashToCamelCase(this.attrForValue);\n      }\n\n      get _inputElementValue() {\n        return this.inputElement && this.inputElement[this._propertyForValue];\n      }\n\n      set _inputElementValue(value) {\n        if (this.inputElement) {\n          this.inputElement[this._propertyForValue] = value;\n        }\n      }\n    }\n\n    customElements.define(ComboBoxLightElement.is, ComboBoxLightElement);\n\n    /**\n     * @namespace Vaadin\n     */\n    window.Vaadin = window.Vaadin || {};\n    Vaadin.ComboBoxLightElement = ComboBoxLightElement;\n  }\n</script>\n</body></html>";

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../iron-a11y-announcer/iron-a11y-announcer.html\">\n<link rel=\"import\" href=\"../vaadin-text-field/vaadin-text-field.html\">\n<link rel=\"import\" href=\"../vaadin-control-state-mixin/vaadin-control-state-mixin.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n<link rel=\"import\" href=\"vaadin-combo-box-mixin.html\">\n<link rel=\"import\" href=\"vaadin-combo-box-dropdown-wrapper.html\">\n<link rel=\"import\" href=\"vaadin-combo-box-styles.html\">\n\n</head><body><dom-module id=\"vaadin-combo-box\">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n      }\n\n      :host([opened]) {\n        pointer-events: auto;\n      }\n\n      [part=\"text-field\"] {\n        min-width: 100%;\n      }\n\n      [part=\"clear-button\"],\n      [part=\"toggle-button\"] {\n        font-family: 'vaadin-combo-box-icons';\n      }\n\n      [part=\"clear-button\"]::before {\n        content: \"\\e901\";\n      }\n\n      [part=\"toggle-button\"]::before {\n        content: \"\\e900\";\n      }\n\n      :host([disabled]) [part=\"clear-button\"],\n      :host([readonly]) [part=\"clear-button\"],\n      :host(:not([has-value])) [part=\"clear-button\"] {\n        display: none;\n      }\n    </style>\n\n    <vaadin-text-field part=\"text-field\" id=\"input\" allowed-pattern=\"[[allowedPattern]]\" prevent-invalid-input=\"[[preventInvalidInput]]\" value=\"{{_inputElementValue}}\" autocomplete=\"off\" invalid=\"[[invalid]]\" label=\"[[label]]\" name=\"[[name]]\" placeholder=\"[[placeholder]]\" required=\"[[required]]\" disabled=\"[[disabled]]\" readonly=\"[[readonly]]\" error-message=\"[[errorMessage]]\" autocapitalize=\"none\" autofocus=\"[[autofocus]]\" inputmode=\"[[inputmode]]\" on-change=\"_stopPropagation\" on-input=\"_inputValueChanged\">\n      <slot name=\"prefix\" slot=\"prefix\"></slot>\n\n      <div part=\"clear-button\" id=\"clearButton\" slot=\"suffix\" role=\"button\" aria-label=\"Clear\"></div>\n      <div part=\"toggle-button\" id=\"toggleButton\" slot=\"suffix\" role=\"button\" aria-label=\"Toggle\" class=\"rotate-on-open\"></div>\n\n    </vaadin-text-field>\n\n    <vaadin-combo-box-dropdown-wrapper id=\"overlay\" opened=\"[[opened]]\" position-target=\"[[_getPositionTarget()]]\" _focused-index=\"[[_focusedIndex]]\" _item-label-path=\"[[itemLabelPath]]\" loading=\"[[loading]]\">\n    </vaadin-combo-box-dropdown-wrapper>\n  </template>\n</dom-module>\n\n  <script>\n    {\n      /**\n       * `<vaadin-combo-box>` is a combo box element combining a dropdown list with an\n       * input field for filtering the list of items. If you want to replace the default\n       * input field with a custom implementation, you should use the\n       * [`<vaadin-combo-box-light>`](#/elements/vaadin-combo-box-light) element.\n       *\n       * Items in the dropdown list must be provided as a list of `String` values.\n       * Defining the items is done using the `items` property, which can be assigned\n       * with data-binding, using an attribute or directly with the JavaScript property.\n       *\n       * ```html\n       * <vaadin-combo-box\n       *     label=\"Fruit\"\n       *     items=\"[[data]]\">\n       * </vaadin-combo-box>\n       * ```\n       *\n       * ```js\n       * combobox.items = ['apple', 'orange', 'banana'];\n       * ```\n       *\n       * When the selected `value` is changed, a `value-changed` event is triggered.\n       *\n       * This element can be used within an `iron-form`.\n       *\n       * ### Item Template\n       *\n       * `<vaadin-combo-box>` supports using custom item template provided in the light\n       * DOM:\n       *\n       * ```html\n       * <vaadin-combo-box items='[{\"label\": \"Hydrogen\", \"value\": \"H\"}]'>\n       *   <template>\n       *     [[index]]: [[item.label]] <b>[[item.value]</b>\n       *   </template>\n       * </vaadin-combo-box>\n       * ```\n       *\n       * The following properties are available for item template bindings:\n       *\n       * Property name | Type | Description\n       * --------------|------|------------\n       * `index`| Number | Index of the item in the `items` array\n       * `item` | String or Object | The item reference\n       * `selected` | Boolean | True when item is selected\n       * `focused` | Boolean | True when item is focused\n       *\n       * ### Styling\n       *\n       * [Generic styling/theming documentation](https://cdn.vaadin.com/vaadin-valo-theme/0.3.1/demo/customization.html)\n       *\n       * The following custom properties are available for styling:\n       *\n       * Custom property | Description | Default\n       * ----------------|-------------|-------------\n       * `--vaadin-combo-box-overlay-max-height` | Property that determines the max height of overlay | `65vh`\n       *\n       * The following shadow DOM parts are available for styling:\n       *\n       * Part name | Description\n       * ----------------|----------------\n       * `text-field` | The text field\n       * `clear-button` | The clear button\n       * `toggle-button` | The toggle button\n       *\n       * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/vaadin-overlay.html)\n       * for `<vaadin-combo-box-overlay>` parts.\n       *\n       * See [`<vaadin-text-field>` documentation](https://vaadin.com/elements/vaadin-text-field/html-api/elements/Vaadin.TextFieldElement)\n       * for the text field parts.\n       *\n       * The following state attributes are available for styling:\n       *\n       * Attribute    | Description | Part name\n       * -------------|-------------|------------\n       * `opened` | Set when the combo box dropdown is open | :host\n       * `disabled` | Set to a disabled combo box | :host\n       * `readonly` | Set to a read only combo box | :host\n       * `has-value` | Set when the element has a value | :host\n       * `invalid` | Set when the element is invalid | :host\n       * `focused` | Set when the element is focused | :host\n       * `focus-ring` | Set when the element is keyboard focused | :host\n       * `loading` | Set when new items are expected | :host\n       *\n       * @memberof Vaadin\n       * @mixes Vaadin.ComboBoxMixin\n       * @mixes Vaadin.ThemableMixin\n       * @demo demo/index.html\n       */\n      class ComboBoxElement extends Vaadin.ControlStateMixin(Vaadin.ThemableMixin(Vaadin.ComboBoxMixin(Polymer.Element))) {\n\n        static get is() {\n          return 'vaadin-combo-box';\n        }\n\n        static get properties() {\n          return {\n            /**\n             * The label for this element.\n             */\n            label: {\n              type: String,\n              reflectToAttribute: true\n            },\n\n            /**\n             * Set to true to disable the floating label.\n             */\n            noLabelFloat: {\n              type: Boolean,\n              value: false\n            },\n\n            /**\n             * Set to true to always float the label.\n             */\n            alwaysFloatLabel: {\n              type: Boolean,\n              value: false\n            },\n\n            /**\n             * Set to true to disable this input.\n             */\n            disabled: {\n              type: Boolean,\n              value: false\n            },\n\n            /**\n             * Set to true to prevent the user from entering invalid input.\n             */\n            preventInvalidInput: {\n              type: Boolean\n            },\n\n            /**\n             * Set this to specify the pattern allowed by `preventInvalidInput`.\n             */\n            allowedPattern: {\n              type: String\n            },\n\n            /**\n             * A pattern to validate the `input` with.\n             */\n            pattern: {\n              type: String\n            },\n\n            /**\n             * The error message to display when the input is invalid.\n             */\n            errorMessage: {\n              type: String\n            },\n\n            autofocus: {\n              type: Boolean\n            },\n\n            inputmode: {\n              type: String\n            },\n\n            /**\n             * A placeholder string in addition to the label. If this is set, the label will always float.\n             */\n            placeholder: {\n              type: String,\n              // need to set a default so _computeAlwaysFloatLabel is run\n              value: ''\n            },\n\n            readonly: {\n              type: Boolean,\n              value: false\n            },\n\n            size: {\n              type: Number\n            }\n          };\n        }\n\n        static get observers() {\n          return ['_updateAriaExpanded(opened)'];\n        }\n\n        attributeChanged(name, type) {\n          // Safari has an issue with repainting shadow root element styles when a host attribute changes.\n          // Need this workaround (toggle any inline css property on and off) until the issue gets fixed.\n          const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);\n          if (isSafari && this.root) {\n            Array.prototype.forEach.call(this.root.querySelectorAll('*'), el => {\n              el.style['-webkit-backface-visibility'] = 'visible';\n              el.style['-webkit-backface-visibility'] = '';\n            });\n          }\n        }\n\n        ready() {\n          super.ready();\n\n          this._bindableInput = this.$.input;\n          this._nativeInput = this.$.input.focusElement;\n          this._toggleElement = this.$.toggleButton;\n          this._clearElement = this.$.clearButton;\n\n          this._nativeInput.setAttribute('role', 'combobox');\n          this._nativeInput.setAttribute('aria-autocomplete', 'list');\n          this._updateAriaExpanded();\n        }\n\n        connectedCallback() {\n          super.connectedCallback();\n          this._preventInputBlur();\n        }\n\n        disconnectedCallback() {\n          super.disconnectedCallback();\n          this._restoreInputBlur();\n        }\n\n        _computeAlwaysFloatLabel(alwaysFloatLabel, placeholder) {\n          return placeholder || alwaysFloatLabel;\n        }\n\n        _getPositionTarget() {\n          return this.$.input;\n        }\n\n        _updateAriaExpanded() {\n          if (this._nativeInput) {\n            this._nativeInput.setAttribute('aria-expanded', this.opened);\n            this._toggleElement.setAttribute('aria-expanded', this.opened);\n          }\n        }\n\n        get inputElement() {\n          return this.$.input;\n        }\n\n        /**\n         * Focussable element used by vaadin-control-state-mixin\n         */\n        get focusElement() {\n          // inputElement might not be defined on property changes before ready.\n          return this.inputElement || this;\n        }\n      }\n\n      customElements.define(ComboBoxElement.is, ComboBoxElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.ComboBoxElement = ComboBoxElement;\n    }\n  </script>\n\n</body></html>";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const gesture_event_listeners_1 = __webpack_require__(6);
const PolymerGestures = __webpack_require__(10);
const PolymerAsync = __webpack_require__(12);
const templatize_1 = __webpack_require__(7);
__webpack_require__(49);
__webpack_require__(50);
__webpack_require__(53);
const vaadinContextMenu = __webpack_require__(54);
const domModule = cheerio.load(vaadinContextMenu)('body');
utils_1.importStyle(`<dom-module id="vaadin-context-menu-overlay-styles" theme-for="vaadin-context-menu-overlay">${domModule.find('dom-module[id="vaadin-context-menu-overlay-styles"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-context-menu"><template>${domModule.find('dom-module[id="vaadin-context-menu"] template').html()}</template></dom-module>`);
let ContextMenuElement = ContextMenuElement_1 = class ContextMenuElement extends gesture_event_listeners_1.GestureEventListeners(polymer_element_1.Element) {
    constructor() {
        super();
        this._boundOpen = this.open.bind(this);
        this._boundClose = this.close.bind(this);
    }
    static get is() {
        return 'vaadin-context-menu';
    }
    static get properties() {
        return {
            /**
             * CSS selector that can be used to target any child element
             * of the context menu to listen for `openOn` events.
             */
            selector: {
                type: String
            },
            /**
             * True if the overlay is currently displayed.
             */
            opened: {
                type: Boolean,
                value: false,
                notify: true,
                readOnly: true
            },
            /**
             * Event name to listen for opening the context menu.
             */
            openOn: {
                type: String,
                value: 'vaadin-contextmenu'
            },
            /**
             * The target element that's listened to for context menu opening events.
             * By default the vaadin-context-menu listens to the target's `vaadin-contextmenu`
             * events.
             * @type {HTMLElement}
             * @default self
             */
            listenOn: {
                type: Object,
                value: function () {
                    return this;
                }
            },
            /**
             * Event name to listen for closing the context menu.
             */
            closeOn: {
                type: String,
                value: 'click',
                observer: '_closeOnChanged'
            },
            _context: Object,
            _contentTemplate: Object,
            _boundClose: Object,
            _boundOpen: Object,
            _templateClass: Object
        };
    }
    static get observers() {
        return [
            '_openedChanged(opened)',
            '_contextChanged(_context, _instance)',
            '_targetOrOpenOnChanged(listenOn, openOn)'
        ];
    }
    ready() {
        super.ready();
        this.$.overlay.addEventListener('contextmenu', e => {
            this.close();
            this._preventDefault(e);
        });
    }
    _onOverlayOpened(e) {
        if (e.detail.value === true) {
            // wait for a microtask before focusing the child element
            // to allow overlay to position itself correctly first.
            // Otherwise, the browser window will jump scroll.
            PolymerAsync.microTask.run(() => {
                const child = this.$.overlay.root.querySelector('#content :not(style):not(slot)');
                if (child) {
                    child.focus();
                }
            });
        }
        else if (e.detail.value === false) {
            this._setOpened(false);
        }
    }
    _targetOrOpenOnChanged(listenOn, openOn) {
        if (this._oldListenOn && this._oldOpenOn) {
            this._unlisten(this._oldListenOn, this._oldOpenOn, this._boundOpen);
            this._oldListenOn.style.webkitTouchCallout = '';
            this._oldListenOn.style.webkitUserSelect = '';
            this._oldListenOn = null;
            this._oldOpenOn = null;
        }
        if (listenOn && openOn) {
            this._listen(listenOn, openOn, this._boundOpen);
            // note: these styles don't seem to work in Firefox on iOS.
            listenOn.style.webkitTouchCallout = 'none';
            listenOn.style.webkitUserSelect = 'none';
            this._oldListenOn = listenOn;
            this._oldOpenOn = openOn;
        }
    }
    _closeOnChanged(closeOn, oldCloseOn) {
        // Listen on this.$.overlay.root to workaround issue on
        //  ShadyDOM polyfill: https://github.com/webcomponents/shadydom/issues/159
        // Outside click event from overlay
        const evtOverlay = 'vaadin-overlay-outside-click';
        if (oldCloseOn) {
            this._unlisten(this.$.overlay, oldCloseOn, this._boundClose);
            this._unlisten(this.$.overlay.root, oldCloseOn, this._boundClose);
        }
        if (closeOn) {
            this._listen(this.$.overlay, closeOn, this._boundClose);
            this._listen(this.$.overlay.root, closeOn, this._boundClose);
            this._unlisten(this.$.overlay, evtOverlay, this._preventDefault);
        }
        else {
            this._listen(this.$.overlay, evtOverlay, this._preventDefault);
        }
    }
    _preventDefault(e) {
        e.preventDefault();
    }
    _openedChanged(opened) {
        if (opened && !this._instance) {
            this._contentTemplate = this.querySelector('template');
            const Templatizer = templatize_1.Templatize.templatize(this._contentTemplate, this, {
                instanceProps: {
                    detail: true,
                    target: true
                },
                forwardHostProp: function (prop, value) {
                    if (this._instance) {
                        this._instance.forwardHostProp(prop, value);
                    }
                }
            });
            this._instance = new Templatizer({});
            this.$.overlay.content = this._instance.root;
        }
        this.$.overlay.opened = opened;
    }
    _contextChanged(context, instance) {
        if (context === undefined || instance === undefined) {
            return;
        }
        instance.detail = context.detail;
        instance.target = context.target;
    }
    /**
     * Closes the overlay.
     */
    close() {
        this._setOpened(false);
    }
    _contextTarget(e) {
        if (this.selector) {
            const targets = this.listenOn.querySelectorAll(this.selector);
            return Array.prototype.filter.call(targets, el => {
                return e.composedPath().indexOf(el) > -1;
            })[0];
        }
        else {
            return e.target;
        }
    }
    /**
     * Opens the overlay.
     * @param {Event} e used as the context for the menu. Overlay coordinates are taken from this event.
     */
    open(e) {
        if (e && !this.opened) {
            this._context = {
                detail: e.detail,
                target: this._contextTarget(e)
            };
            if (this._context.target) {
                this._preventDefault(e);
                e.stopPropagation();
                this.$.overlay.opened = true;
                this.$.overlay.style.left = this._getEventCoordinate(e, 'x') + 'px';
                const top = this._getEventCoordinate(e, 'y');
                this.$.overlay.style.top = top + 'px';
                this._setOpened(true);
            }
        }
    }
    _getEventCoordinate(event, coord) {
        if (event.detail instanceof Object) {
            if (event.detail[coord]) {
                // Polymer gesture events, get coordinate from detail
                return event.detail[coord];
            }
            else if (event.detail.sourceEvent) {
                // Unwrap detailed event
                return this._getEventCoordinate(event.detail.sourceEvent, coord);
            }
        }
        else {
            // Native mouse or touch event
            const prop = 'client' + coord.toUpperCase();
            return event.changedTouches ? event.changedTouches[0][prop] : event[prop];
        }
    }
    _listen(node, evType, handler) {
        if (PolymerGestures.gestures[evType]) {
            PolymerGestures.addListener(node, evType, handler);
        }
        else {
            node.addEventListener(evType, handler);
        }
    }
    _unlisten(node, evType, handler) {
        if (PolymerGestures.gestures[evType]) {
            PolymerGestures.removeListener(node, evType, handler);
        }
        else {
            node.removeEventListener(evType, handler);
        }
    }
};
ContextMenuElement = ContextMenuElement_1 = __decorate([
    polymer3_decorators_1.component(ContextMenuElement_1.is),
    __metadata("design:paramtypes", [])
], ContextMenuElement);
var ContextMenuElement_1;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PolymerGestures = __webpack_require__(10);
(function () {
    PolymerGestures.register({
        name: 'vaadin-contextmenu',
        deps: ['touchstart', 'touchmove', 'touchend', 'contextmenu'],
        flow: {
            start: ['touchstart', 'contextmenu'],
            end: ['contextmenu']
        },
        emits: ['vaadin-contextmenu'],
        info: {
            sourceEvent: null,
            _ios: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream']
        },
        reset: function () {
            this.info.sourceEvent = null;
            this._cancelTimer();
            this.info.touchJob = null;
            this.info.touchStartCoords = null;
        },
        _cancelTimer: function () {
            if (this._timerId) {
                clearTimeout(this._timerId);
                delete this._fired;
            }
        },
        touchstart: function (e) {
            this._cancelTimer();
            this.info.sourceEvent = e;
            this.info.touchStartCoords = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            };
            // After timeout event is already retargeted to the parent element in case there is one.
            // So we are assinging the target synchronously on event dispatched.
            const t = e.composedPath()[0] || e.target;
            this._timerId = setTimeout(() => {
                const ct = e.changedTouches[0];
                if (!e.shiftKey) {
                    if (this.info._ios) {
                        this._fired = true;
                        this.fire(t, ct.clientX, ct.clientY);
                    }
                    // needed to prevent any 'tap' gesture events from firing
                    // which could potentially cancel/close the overlay.
                    PolymerGestures.prevent('tap');
                }
            }, 500); // default setting for Android and iOS.
        },
        touchmove: function (e) {
            const moveThreshold = 15;
            const touchStartCoords = this.info.touchStartCoords;
            if (Math.abs(touchStartCoords.x - e.changedTouches[0].clientX) > moveThreshold ||
                Math.abs(touchStartCoords.y - e.changedTouches[0].clientY) > moveThreshold) {
                this._cancelTimer();
            }
        },
        touchend: function (e) {
            if (this._fired) {
                e.preventDefault();
            }
            this._cancelTimer();
        },
        contextmenu: function (e) {
            if (!e.shiftKey) {
                this.info.sourceEvent = e;
                this.fire(e.target, e.clientX, e.clientY);
                PolymerGestures.prevent('tap');
            }
        },
        fire: function (target, x, y) {
            PolymerGestures._fire(target, 'vaadin-contextmenu', {
                x: x,
                y: y,
                sourceEvent: this.info.sourceEvent
            });
        }
    });
})();


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
__webpack_require__(51);
const vaadinDeviceDector = __webpack_require__(52);
let DeviceDetector = DeviceDetector_1 = class DeviceDetector extends polymer_element_1.Element {
    static get template() {
        const domModule = cheerio.load(vaadinDeviceDector)('template');
        const html = domModule.html();
        return html;
    }
    static get is() {
        return 'vaadin-device-detector';
    }
    static get properties() {
        return {
            /*
             * `true`, when running in a phone.
             */
            phone: {
                type: Boolean,
                computed: '_phone(wide, touch)',
                notify: true
            },
            /*
             * `true`, when running in a touch device.
             * @default false
             */
            touch: {
                type: Boolean,
                notify: true,
                value: () => this._touch()
            },
            /*
             * `true`, when running in a tablet/desktop device.
             */
            wide: {
                type: Boolean,
                notify: true
            }
        };
    }
    static _touch() {
        try {
            document.createEvent('TouchEvent');
            return true;
        }
        catch (err) {
            return false;
        }
    }
    _phone(wide, touch) {
        return !wide && touch;
    }
};
DeviceDetector = DeviceDetector_1 = __decorate([
    polymer3_decorators_1.component(DeviceDetector_1.is)
], DeviceDetector);
var DeviceDetector_1;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("@polymer/iron-media-query/iron-media-query");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../iron-media-query/iron-media-query.html\">\n\n</head><body><dom-module id=\"vaadin-device-detector\">\n  <template>\n    <iron-media-query query=\"min-device-width: 750px\" query-matches=\"{{wide}}\"></iron-media-query>\n  </template>\n  <script>\n    {\n      /**\n       * Element for internal use only.\n       *\n       * @memberof Vaadin\n       */\n      class DeviceDetector extends Polymer.Element {\n\n        static get is() {\n          return 'vaadin-device-detector';\n        }\n\n        static get properties() {\n          return {\n            /*\n             * `true`, when running in a phone.\n             */\n            phone: {\n              type: Boolean,\n              computed: '_phone(wide, touch)',\n              notify: true\n            },\n\n            /*\n             * `true`, when running in a touch device.\n             * @default false\n             */\n            touch: {\n              type: Boolean,\n              notify: true,\n              value: () => this._touch()\n            },\n\n            /*\n             * `true`, when running in a tablet/desktop device.\n             */\n            wide: {\n              type: Boolean,\n              notify: true\n            }\n          };\n        }\n\n        static _touch() {\n          try {\n            document.createEvent('TouchEvent');\n            return true;\n          } catch (err) {\n            return false;\n          }\n        }\n\n        _phone(wide, touch) {\n          return !wide && touch;\n        }\n      }\n\n      customElements.define(DeviceDetector.is, DeviceDetector);\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.DeviceDetector = DeviceDetector;\n    }\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const vaadin_overlay_1 = __webpack_require__(13);
const polymer3_decorators_1 = __webpack_require__(1);
let VaadinContextMenuOverlayElement = VaadinContextMenuOverlayElement_1 = class VaadinContextMenuOverlayElement extends vaadin_overlay_1.OverlayElement {
    static get template() {
        const t = cheerio.load(`<div>${super.template.innerHTML}</div>`)('body');
        t.find('style')[0].childNodes[0].data += `
    /* context menu position fix */
    [part="overlay"] {
      position: absolute;
      top: 2px;
      left: 5px;
    }`;
        return t.html();
    }
    static get is() {
        return 'vaadin-context-menu-overlay';
    }
};
VaadinContextMenuOverlayElement = VaadinContextMenuOverlayElement_1 = __decorate([
    polymer3_decorators_1.component(VaadinContextMenuOverlayElement_1.is)
], VaadinContextMenuOverlayElement);
var VaadinContextMenuOverlayElement_1;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../polymer/lib/mixins/gesture-event-listeners.html\">\n<link rel=\"import\" href=\"../vaadin-overlay/vaadin-overlay.html\">\n<link rel=\"import\" href=\"vaadin-contextmenu-event.html\">\n<link rel=\"import\" href=\"vaadin-device-detector.html\">\n\n</head><body><dom-module id=\"vaadin-context-menu-overlay-styles\" theme-for=\"vaadin-context-menu-overlay\">\n  <template>\n    <style>\n      :host {\n        align-items: flex-start;\n        justify-content: flex-start;\n      }\n\n      :host([phone]) {\n        top: 0 !important;\n        right: 0 !important;\n        bottom: 0 !important;\n        left: 0 !important;\n        padding: 24px;\n        align-items: stretch;\n        justify-content: flex-end;\n      }\n\n      :host([phone]) [part=\"content\"] {\n        /* Ideally should be 100vh but iOS phone addr-bar covers view port */\n        max-height: 80vh;\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-context-menu-overlay\">\n  <script>\n    {\n      /**\n       * The overlay element.\n       *\n       * ### Styling\n       *\n       * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/vaadin-overlay.html)\n       * for `<vaadin-context-menu-overlay>` parts.\n       *\n       * @memberof Vaadin\n       */\n      class VaadinContextMenuOverlayElement extends Vaadin.OverlayElement {\n        static get is() {\n          return 'vaadin-context-menu-overlay';\n        }\n      }\n\n      customElements.define(VaadinContextMenuOverlayElement.is, VaadinContextMenuOverlayElement);\n    }\n  </script>\n</dom-module>\n\n<dom-module id=\"vaadin-context-menu\">\n  <template>\n    <style>\n      :host {\n        display: block;\n      }\n    </style>\n\n    <slot id=\"slot\"></slot>\n\n    <vaadin-device-detector phone=\"{{_phone}}\"></vaadin-device-detector>\n\n    <vaadin-context-menu-overlay id=\"overlay\" on-opened-changed=\"_onOverlayOpened\" with-backdrop=\"[[_phone]]\" phone$=\"[[_phone]]\">\n    </vaadin-context-menu-overlay>\n  </template>\n  <script>\n    {\n      /**\n       * ```html\n       * <vaadin-context-menu>\n       *   <template>\n       *     <paper-listbox>\n       *       <paper-item>First menu item</paper-item>\n       *       <paper-item>Second menu item</paper-item>\n       *     </paper-listbox>\n       *   </template>\n       * </vaadin-context-menu>\n       * ```\n       *\n       * ### “vaadin-contextmenu” Gesture Event\n       *\n       * `vaadin-contextmenu` is a gesture event (a custom event fired by Polymer),\n       * which is dispatched after either `contextmenu` and long touch events.\n       * This enables support for both mouse and touch environments in a uniform way.\n       *\n       * `<vaadin-context-menu>` opens the menu overlay on the `vaadin-contextmenu`\n       * event by default.\n       *\n       * ### Menu Listener\n       *\n       * By default, the `<vaadin-context-menu>` element listens for the menu opening\n       * event on itself. In order to have a context menu on your content, wrap\n       * your content with the `<vaadin-context-menu>` element, and add a template\n       * element with a menu. Example:\n       *\n       * ```html\n       * <vaadin-context-menu>\n       *   <template>\n       *     <paper-listbox>\n       *       <paper-item>First menu item</paper-item>\n       *       <paper-item>Second menu item</paper-item>\n       *     </paper-listbox>\n       *   </template>\n       *\n       *   <p>This paragraph has the context menu provided in the above template.</p>\n       *   <p>Another paragraph with the context menu.</p>\n       * </vaadin-context-menu>\n       * ```\n       *\n       * In case if you do not want to wrap the page content, you can listen for\n       * events on an element outside the `<vaadin-context-menu>` by setting the\n       * `listenOn` property:\n       *\n       * ```html\n       * <vaadin-context-menu id=\"customListener\">\n       *   <template>\n       *     <paper-listbox>\n       *       ...\n       *     </paper-listbox>\n       *   </template>\n       * </vaadin-context-menu>\n       *\n       * <div id=\"menuListener\">The element that listens for the context menu.</div>\n       *\n       * &lt;script&gt;\n       *   const contextMenu = document.querySelector('vaadin-context-menu#customListener');\n       *   contextMenu.listenOn = document.querySelector('#menuListener');\n       * &lt;/script&gt;\n       * ```\n       *\n       * ### Filtering Menu Targets\n       *\n       * By default, the listener element and all its descendants open the context\n       * menu. You can filter the menu targets to a smaller set of elements inside\n       * the listener element by setting the `selector` property.\n       *\n       * In the following example, only the elements matching `.has-menu` will open the context menu:\n       *\n       * ```html\n       * <vaadin-context-menu selector=\".has-menu\">\n       *   <template>\n       *     <paper-listbox>\n       *       ...\n       *     </paper-listbox>\n       *   </template>\n       *\n       *   <p class=\"has-menu\">This paragraph opens the context menu</p>\n       *   <p>This paragraph does not open the context menu</p>\n       * </vaadin-context-menu>\n       * ```\n       *\n       * ### Menu Context\n       *\n       * You can bind to the following properties in the menu template:\n       *\n       * - `target` is the menu opening event target, which is the element that\n       * the user has called the context menu for\n       * - `detail` is the menu opening event detail\n       *\n       * In the following example, the menu item text is composed with the contents\n       * of the element that opened the menu:\n       *\n       * ```html\n       * <vaadin-context-menu selector=\"li\">\n       *   <template>\n       *     <paper-listbox>\n       *       <paper-item>The menu target: [[target.textContent]]</paper-item>\n       *     </paper-listbox>\n       *   </template>\n       *\n       *   <ul>\n       *     <li>Foo</li>\n       *     <li>Bar</li>\n       *     <li>Baz</li>\n       *   </ul>\n       * </vaadin-context-menu>\n       * ```\n       *\n       * ### Styling\n       *\n       * [Generic styling/theming documentation](https://cdn.vaadin.com/vaadin-valo-theme/0.3.1/demo/customization.html)\n       *\n       * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/vaadin-overlay.html)\n       * for `<vaadin-context-menu-overlay>` parts.\n       *\n       * @memberof Vaadin\n       * @mixes Polymer.GestureEventListeners\n       * @demo demo/index.html\n       */\n      class ContextMenuElement extends Polymer.GestureEventListeners(Polymer.Element) {\n\n        static get is() {\n          return 'vaadin-context-menu';\n        }\n\n        static get properties() {\n          return {\n\n            /**\n             * CSS selector that can be used to target any child element\n             * of the context menu to listen for `openOn` events.\n             */\n            selector: {\n              type: String\n            },\n\n            /**\n             * True if the overlay is currently displayed.\n             */\n            opened: {\n              type: Boolean,\n              value: false,\n              notify: true,\n              readOnly: true\n            },\n\n            /**\n             * Event name to listen for opening the context menu.\n             */\n            openOn: {\n              type: String,\n              value: 'vaadin-contextmenu'\n            },\n\n            /**\n             * The target element that's listened to for context menu opening events.\n             * By default the vaadin-context-menu listens to the target's `vaadin-contextmenu`\n             * events.\n             * @type {HTMLElement}\n             * @default self\n             */\n            listenOn: {\n              type: Object,\n              value: function() {\n                return this;\n              }\n            },\n\n            /**\n             * Event name to listen for closing the context menu.\n             */\n            closeOn: {\n              type: String,\n              value: 'click',\n              observer: '_closeOnChanged'\n            },\n\n            _context: Object,\n\n            _contentTemplate: Object,\n\n            _boundClose: Object,\n\n            _boundOpen: Object,\n\n            _templateClass: Object\n          };\n        }\n\n        static get observers() {\n          return [\n            '_openedChanged(opened)',\n            '_contextChanged(_context, _instance)',\n            '_targetOrOpenOnChanged(listenOn, openOn)'\n          ];\n        }\n\n        constructor() {\n          super();\n          this._boundOpen = this.open.bind(this);\n          this._boundClose = this.close.bind(this);\n        }\n\n        ready() {\n          super.ready();\n\n          this.$.overlay.addEventListener('contextmenu', e => {\n            this.close();\n            this._preventDefault(e);\n          });\n        }\n\n        _onOverlayOpened(e) {\n          if (e.detail.value === true) {\n            // wait for a microtask before focusing the child element\n            // to allow overlay to position itself correctly first.\n            // Otherwise, the browser window will jump scroll.\n            Polymer.Async.microTask.run(() => {\n              const child = this.$.overlay.root.querySelector('#content :not(style):not(slot)');\n              if (child) {\n                child.focus();\n              }\n            });\n\n          } else if (e.detail.value === false) {\n            this._setOpened(false);\n          }\n        }\n\n        _targetOrOpenOnChanged(listenOn, openOn) {\n          if (this._oldListenOn && this._oldOpenOn) {\n            this._unlisten(this._oldListenOn, this._oldOpenOn, this._boundOpen);\n\n            this._oldListenOn.style.webkitTouchCallout = '';\n            this._oldListenOn.style.webkitUserSelect = '';\n\n            this._oldListenOn = null;\n            this._oldOpenOn = null;\n          }\n\n          if (listenOn && openOn) {\n            this._listen(listenOn, openOn, this._boundOpen);\n\n            // note: these styles don't seem to work in Firefox on iOS.\n            listenOn.style.webkitTouchCallout = 'none';\n            listenOn.style.webkitUserSelect = 'none';\n\n            this._oldListenOn = listenOn;\n            this._oldOpenOn = openOn;\n          }\n        }\n\n        _closeOnChanged(closeOn, oldCloseOn) {\n          // Listen on this.$.overlay.root to workaround issue on\n          //  ShadyDOM polyfill: https://github.com/webcomponents/shadydom/issues/159\n\n          // Outside click event from overlay\n          const evtOverlay = 'vaadin-overlay-outside-click';\n\n          if (oldCloseOn) {\n            this._unlisten(this.$.overlay, oldCloseOn, this._boundClose);\n            this._unlisten(this.$.overlay.root, oldCloseOn, this._boundClose);\n          }\n          if (closeOn) {\n            this._listen(this.$.overlay, closeOn, this._boundClose);\n            this._listen(this.$.overlay.root, closeOn, this._boundClose);\n            this._unlisten(this.$.overlay, evtOverlay, this._preventDefault);\n          } else {\n            this._listen(this.$.overlay, evtOverlay, this._preventDefault);\n          }\n        }\n\n        _preventDefault(e) {\n          e.preventDefault();\n        }\n\n        _openedChanged(opened) {\n          if (opened && !this._instance) {\n            this._contentTemplate = this.querySelector('template');\n\n            const Templatizer = Polymer.Templatize.templatize(this._contentTemplate, this, {\n              instanceProps: {\n                detail: true,\n                target: true\n              },\n              forwardHostProp: function(prop, value) {\n                if (this._instance) {\n                  this._instance.forwardHostProp(prop, value);\n                }\n              }\n            });\n\n            this._instance = new Templatizer({});\n            this.$.overlay.content = this._instance.root;\n          }\n\n          this.$.overlay.opened = opened;\n        }\n\n        _contextChanged(context, instance) {\n          if (context === undefined || instance === undefined) {\n            return;\n          }\n          instance.detail = context.detail;\n          instance.target = context.target;\n        }\n\n        /**\n         * Closes the overlay.\n         */\n        close() {\n          this._setOpened(false);\n        }\n\n        _contextTarget(e) {\n          if (this.selector) {\n            const targets = this.listenOn.querySelectorAll(this.selector);\n\n            return Array.prototype.filter.call(targets, el => {\n              return e.composedPath().indexOf(el) > -1;\n            })[0];\n          } else {\n            return e.target;\n          }\n        }\n\n        /**\n         * Opens the overlay.\n         * @param {Event} e used as the context for the menu. Overlay coordinates are taken from this event.\n         */\n        open(e) {\n          if (e && !this.opened) {\n            this._context = {\n              detail: e.detail,\n              target: this._contextTarget(e)\n            };\n\n            if (this._context.target) {\n              this._preventDefault(e);\n              e.stopPropagation();\n\n              this.$.overlay.opened = true;\n\n              this.$.overlay.style.left = this._getEventCoordinate(e, 'x') + 'px';\n              const top = this._getEventCoordinate(e, 'y');\n              this.$.overlay.style.top = top + 'px';\n\n              this._setOpened(true);\n            }\n          }\n        }\n\n        _getEventCoordinate(event, coord) {\n          if (event.detail instanceof Object) {\n            if (event.detail[coord]) {\n              // Polymer gesture events, get coordinate from detail\n              return event.detail[coord];\n            } else if (event.detail.sourceEvent) {\n              // Unwrap detailed event\n              return this._getEventCoordinate(event.detail.sourceEvent, coord);\n            }\n          } else {\n            // Native mouse or touch event\n            const prop = 'client' + coord.toUpperCase();\n            return event.changedTouches ? event.changedTouches[0][prop] : event[prop];\n          }\n        }\n\n        _listen(node, evType, handler) {\n          if (Polymer.Gestures.gestures[evType]) {\n            Polymer.Gestures.addListener(node, evType, handler);\n          } else {\n            node.addEventListener(evType, handler);\n          }\n        }\n\n        _unlisten(node, evType, handler) {\n          if (Polymer.Gestures.gestures[evType]) {\n            Polymer.Gestures.removeListener(node, evType, handler);\n          } else {\n            node.removeEventListener(evType, handler);\n          }\n        }\n      }\n\n      customElements.define(ContextMenuElement.is, ContextMenuElement);\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.ContextMenuElement = ContextMenuElement;\n    }\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const templatize_1 = __webpack_require__(7);
__webpack_require__(56);
const vaadindDalog = __webpack_require__(57);
const domModule = cheerio.load(vaadindDalog)('body');
utils_1.importStyle(`<dom-module id="vaadin-dialog-overlay-default-theme" theme-for="vaadin-dialog-overlay">${domModule.find('dom-module[id="vaadin-dialog-overlay-default-theme"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-dialog"><template>${domModule.find('dom-module[id="vaadin-dialog"] template').html()}</template></dom-module>`);
let VaadinDialog = VaadinDialog_1 = class VaadinDialog extends polymer_element_1.Element {
    static get is() {
        return 'vaadin-dialog';
    }
    static get properties() {
        return {
            /**
             * True if the overlay is currently displayed.
             */
            opened: {
                type: Boolean,
                value: false,
                notify: true
            },
            /**
             * Set to true to disable closing dialog on outside click
             */
            noCloseOnOutsideClick: {
                type: Boolean,
                value: false
            },
            /**
             * Set to true to disable closing dialog on Escape press
             */
            noCloseOnEsc: {
                type: Boolean,
                value: false
            },
            _contentTemplate: Object
        };
    }
    static get observers() {
        return ['_openedChanged(opened)'];
    }
    ready() {
        super.ready();
        this.$.overlay.setAttribute('role', 'dialog');
        this.$.overlay.addEventListener('vaadin-overlay-outside-click', this._handleOutsideClick.bind(this));
        this.$.overlay.addEventListener('vaadin-overlay-escape-press', this._handleEscPress.bind(this));
    }
    _openedChanged(opened) {
        if (opened && !this._instance) {
            this._contentTemplate = this.querySelector('template');
            const Templatizer = templatize_1.Templatize.templatize(this._contentTemplate, this, {
                instanceProps: {
                    detail: true,
                    target: true
                },
                forwardHostProp: function (prop, value) {
                    if (this._instance) {
                        this._instance.forwardHostProp(prop, value);
                    }
                }
            });
            this._instance = new Templatizer({});
            this.$.overlay.content = this._instance.root;
        }
        this.$.overlay.opened = opened;
    }
    _onOverlayOpened(e) {
        if (e.detail.value === false) {
            this.opened = false;
        }
    }
    /**
     * Close the dialog if `noCloseOnOutsideClick` isn't set to true
     */
    _handleOutsideClick(e) {
        if (this.noCloseOnOutsideClick) {
            e.preventDefault();
        }
    }
    /**
     * Close the dialog if `noCloseOnEsc` isn't set to true
     */
    _handleEscPress(e) {
        if (this.noCloseOnEsc) {
            e.preventDefault();
        }
    }
};
VaadinDialog = VaadinDialog_1 = __decorate([
    polymer3_decorators_1.component(VaadinDialog_1.is)
], VaadinDialog);
var VaadinDialog_1;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vaadin_overlay_1 = __webpack_require__(13);
const polymer3_decorators_1 = __webpack_require__(1);
let VaadinDialogOverlay = VaadinDialogOverlay_1 = class VaadinDialogOverlay extends vaadin_overlay_1.OverlayElement {
    static get is() {
        return 'vaadin-dialog-overlay';
    }
};
VaadinDialogOverlay = VaadinDialogOverlay_1 = __decorate([
    polymer3_decorators_1.component(VaadinDialogOverlay_1.is)
], VaadinDialogOverlay);
var VaadinDialogOverlay_1;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../vaadin-overlay/vaadin-overlay.html\">\n\n</head><body><dom-module id=\"vaadin-dialog-overlay-default-theme\" theme-for=\"vaadin-dialog-overlay\">\n  <template>\n    <style>\n      [part=\"content\"] {\n        padding: 5px;\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-dialog\">\n  <template>\n    <style>\n      :host {\n        display: block;\n      }\n    </style>\n\n    <vaadin-dialog-overlay id=\"overlay\" on-opened-changed=\"_onOverlayOpened\" with-backdrop=\"\" focus-trap=\"\">\n    </vaadin-dialog-overlay>\n  </template>\n  <script>\n    {\n\n      /**\n       * The overlay element.\n       *\n       * ### Styling\n       *\n       * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/vaadin-overlay.html)\n       * for `<vaadin-dialog-overlay>` parts.\n       *\n       * @memberof Vaadin\n       */\n      class VaadinDialogOverlay extends Vaadin.OverlayElement {\n        static get is() {\n          return 'vaadin-dialog-overlay';\n        }\n      }\n\n      customElements.define(VaadinDialogOverlay.is, VaadinDialogOverlay);\n\n\n      /**\n       * `<vaadin-dialog>` is a Polymer 2 element for customised modal dialogs.\n       *\n       * ```html\n       * <vaadin-dialog opened>\n       *   <template>\n       *     Sample dialog\n       *   </template>\n       * </vaadin-dialog>\n       * ```\n       *\n       * ### Styling\n       *\n       * [Generic styling/theming documentation](https://cdn.vaadin.com/vaadin-valo-theme/0.3.1/demo/customization.html)\n       *\n       * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/vaadin-overlay.html)\n       * for `<vaadin-dialog-overlay>` parts.\n       *\n       * @memberof Vaadin\n       * @demo demo/index.html\n       */\n      class VaadinDialog extends Polymer.Element {\n        static get is() {\n          return 'vaadin-dialog';\n        }\n\n        static get properties() {\n          return {\n            /**\n             * True if the overlay is currently displayed.\n             */\n            opened: {\n              type: Boolean,\n              value: false,\n              notify: true\n            },\n\n            /**\n             * Set to true to disable closing dialog on outside click\n             */\n            noCloseOnOutsideClick: {\n              type: Boolean,\n              value: false\n            },\n\n            /**\n             * Set to true to disable closing dialog on Escape press\n             */\n            noCloseOnEsc: {\n              type: Boolean,\n              value: false\n            },\n\n            _contentTemplate: Object\n          };\n        }\n\n        static get observers() {\n          return ['_openedChanged(opened)'];\n        }\n\n        ready() {\n          super.ready();\n          this.$.overlay.setAttribute('role', 'dialog');\n          this.$.overlay.addEventListener('vaadin-overlay-outside-click', this._handleOutsideClick.bind(this));\n          this.$.overlay.addEventListener('vaadin-overlay-escape-press', this._handleEscPress.bind(this));\n        }\n\n        _openedChanged(opened) {\n          if (opened && !this._instance) {\n            this._contentTemplate = this.querySelector('template');\n            const Templatizer = Polymer.Templatize.templatize(this._contentTemplate, this, {\n              instanceProps: {\n                detail: true,\n                target: true\n              },\n              forwardHostProp: function(prop, value) {\n                if (this._instance) {\n                  this._instance.forwardHostProp(prop, value);\n                }\n              }\n            });\n            this._instance = new Templatizer({});\n            this.$.overlay.content = this._instance.root;\n          }\n          this.$.overlay.opened = opened;\n        }\n\n        _onOverlayOpened(e) {\n          if (e.detail.value === false) {\n            this.opened = false;\n          }\n        }\n\n        /**\n         * Close the dialog if `noCloseOnOutsideClick` isn't set to true\n         */\n        _handleOutsideClick(e) {\n          if (this.noCloseOnOutsideClick) {\n            e.preventDefault();\n          }\n        }\n\n        /**\n         * Close the dialog if `noCloseOnEsc` isn't set to true\n         */\n        _handleEscPress(e) {\n          if (this.noCloseOnEsc) {\n            e.preventDefault();\n          }\n        }\n      }\n\n      customElements.define(VaadinDialog.is, VaadinDialog);\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.VaadinDialog = VaadinDialog;\n    }\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const class_1 = __webpack_require__(9);
const iron_resizable_behavior_1 = __webpack_require__(8);
const PolymerRenderStatus = __webpack_require__(59);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadinFormLayout = __webpack_require__(60);
__webpack_require__(61);
let FormLayoutElement = FormLayoutElement_1 = class FormLayoutElement extends vaadin_themable_mixin_1.default(class_1.mixinBehaviors(iron_resizable_behavior_1.IronResizableBehavior, polymer_element_1.Element)) {
    static get template() {
        const domModule = cheerio.load(vaadinFormLayout)('template');
        const html = domModule.html();
        return html;
    }
    static get is() {
        return 'vaadin-form-layout';
    }
    static get properties() {
        return {
            /**
             * @typedef ResponsiveStep
             * @type {object}
             * @property {string} minWidth - The threshold value for this step in CSS length units.
             * @property {number} columns - Number of columns. Only natural numbers are valid.
             * @property {string} labelsPosition - Labels position option, valid values: `"aside"` (default), `"top"`.
             */
            /**
             * Allows specifying a responsive behavior with the number of columns
             * and the label position depending on the layout width.
             *
             * Format: array of objects, each object defines one responsive step
             * with `minWidth` CSS length, `columns` number, and optional
             * `labelsPosition` string of `"aside"` or `"top"`. At least one item is required.
             *
             * #### Examples
             *
             * <dl>
             *   <dt>`[{columns: 1}]`</dt>
             *   <dd>
             *     <p>The layout is always a single column, labels aside.
             *   </dd>
             *
             *   <dt><pre><code>[
             *   {minWidth: 0, columns: 1},
             *   {minWidth: '40em', columns: 2}
             * ]</code></pre></dt>
             *   <dd>
             *     <p>Sets two responsive steps:
             *     <ol>
             *       <li>When the layout width is < 40em, one column, labels aside.
             *       <li>Width >= 40em, two columns, labels aside.
             *     </ol>
             *   </dd>
             *
             *   <dt><pre><code>[
             *   {minWidth: 0, columns: 1, labelsPosition: 'top'},
             *   {minWidth: '20em', columns: 1},
             *   {minWidth: '40em', columns: 2}
             * ]</code></pre></dt>
             *   <dd>
             *     <p>Default value. Three responsive steps:
             *     <ol>
             *       <li>Width < 20em, one column, labels on top.
             *       <li>20em <= width < 40em, one column, labels aside.
             *       <li>Width >= 40em, two columns, labels aside.
             *     </ol>
             *   </dd>
             * </dl>
             *
             * @type {ResponsiveStep[]}
             */
            responsiveSteps: {
                type: Array,
                value: function () {
                    return [
                        { minWidth: 0, columns: 1, labelsPosition: 'top' },
                        { minWidth: '20em', columns: 1 },
                        { minWidth: '40em', columns: 2 }
                    ];
                },
                observer: '_responsiveStepsChanged'
            },
            /**
             * Current number of columns in the layout
             */
            _columnCount: {
                type: Number
            },
            /**
             * Indicates that labels are on top
             */
            _labelsOnTop: {
                type: Boolean
            }
        };
    }
    static get observers() {
        return [
            '_invokeUpdateStyles(_columnCount, _labelsOnTop)'
        ];
    }
    ready() {
        // Here we create and attach a style element that we use for validating
        // CSS values in `responsiveSteps`. We can’t add this to the `<template>`,
        // because Polymer will throw it away. We need to create this before
        // `super.ready()`, because `super.ready()` invokes property observers,
        // and the observer for `responsiveSteps` does CSS value validation.
        this._styleElement = document.createElement('style');
        this.root.appendChild(this._styleElement);
        // Ensure there is a child text node in the style element
        this._styleElement.textContent = ' ';
        if (window['ShadyDOM']) {
            // With ShadyDOM, setting textContent attaches text content nodes
            // asynchronously, but we need it right away.
            window['ShadyDOM'].flush();
        }
        super.ready();
        this.addEventListener('iron-resize', this._selectResponsiveStep);
    }
    connectedCallback() {
        super.connectedCallback();
        PolymerRenderStatus.beforeNextRender(this, this._selectResponsiveStep);
        PolymerRenderStatus.beforeNextRender(this, this.updateStyles);
    }
    _naturalNumberOrOne(n) {
        if (typeof n === 'number' && n >= 1 && n < Infinity)
            return Math.floor(n);
        return 1;
    }
    _isValidCSSLength(value) {
        // Let us choose a CSS property for validating CSS <length> values:
        // - `border-spacing` accepts `<length> | inherit`, it’s the best! But
        //   it does not disallow invalid values at all in MSIE :-(
        // - `letter-spacing` and `word-spacing` accept
        //   `<length> | normal | inherit`, and disallows everything else, like
        //   `<percentage>`, `auto` and such, good enough.
        // - `word-spacing` is used since its shorter.
        // Disallow known keywords allowed as the `word-spacing` value
        if (value === 'inherit' || value === 'normal')
            return false;
        // Use the value in a stylesheet and check the parsed value. Invalid
        // input value results in empty parsed value.
        this._styleElement.firstChild.nodeValue = `#styleElement { word-spacing: ${value}; }`;
        if (!this._styleElement.sheet) {
            // Stylesheet is not ready, probably not attached to the document yet.
            return true;
        }
        return this._styleElement.sheet.cssRules[0].style.getPropertyValue('word-spacing') !== '';
    }
    _responsiveStepsChanged(responsiveSteps, oldResponsiveSteps) {
        try {
            if (!Array.isArray(responsiveSteps)) {
                throw new Error('Invalid "responsiveSteps" type, an Array is required.');
            }
            if (responsiveSteps.length < 1) {
                throw new Error('Invalid empty "responsiveSteps" array, at least one item is required.');
            }
            responsiveSteps.forEach(step => {
                if (this._naturalNumberOrOne(step.columns) !== step.columns) {
                    throw new Error(`Invalid 'columns' value of ${step.columns}, a natural number is required.`);
                }
                if (step.minWidth !== undefined && !this._isValidCSSLength(step.minWidth)) {
                    throw new Error(`Invalid 'minWidth' value of ${step.minWidth}, a valid CSS length required.`);
                }
                if (step.labelsPosition !== undefined && ['aside', 'top'].indexOf(step.labelsPosition) === -1) {
                    throw new Error(`Invalid 'labelsPosition' value of ${step.labelsPosition}, 'aside' or 'top' string is required.`);
                }
            });
        }
        catch (e) {
            if (oldResponsiveSteps && oldResponsiveSteps !== responsiveSteps) {
                console.warn(`${e.message} Using previously set 'responsiveSteps' instead.`);
                this.responsiveSteps = oldResponsiveSteps;
            }
            else {
                console.warn(`${e.message} Using default 'responsiveSteps' instead.`);
                this.responsiveSteps = [
                    { minWidth: 0, columns: 1, labelsPosition: 'top' },
                    { minWidth: '20em', columns: 1 },
                    { minWidth: '40em', columns: 2 }
                ];
            }
        }
        this._selectResponsiveStep();
    }
    _selectResponsiveStep() {
        // Iterate through responsiveSteps and choose the step
        let selectedStep;
        const tmpStyleProp = 'background-position';
        this.responsiveSteps.forEach(step => {
            // Convert minWidth to px units for comparison
            this.$.layout.style.setProperty(tmpStyleProp, step.minWidth);
            const stepMinWidthPx = parseFloat(getComputedStyle(this.$.layout).getPropertyValue(tmpStyleProp));
            // Compare step min-width with the host width, select the passed step
            if (stepMinWidthPx <= this.offsetWidth) {
                selectedStep = step;
            }
        });
        this.$.layout.style.removeProperty(tmpStyleProp);
        // Sometimes converting units is not possible, e.g, when element is
        // not connected. Then the `selectedStep` stays `undefined`.
        if (selectedStep) {
            // Apply the chosen responsive step’s properties
            this._columnCount = selectedStep.columns;
            this._labelsOnTop = selectedStep.labelsPosition === 'top';
        }
    }
    _invokeUpdateStyles() {
        this.updateStyles();
    }
    /**
     * Set custom CSS property values and update the layout.
     */
    updateStyles(...args) {
        super.updateStyles(...args);
        /*
          The item width formula:
              itemWidth = colspan / columnCount * 100% - columnGap
          We have to subtract columnGap, because the column gap space is taken
          by item margins of 1/2 * gap on both sides
        */
        const columnGap = window['ShadyCSS']
            ? window['ShadyCSS'].getComputedStyleValue(this, '--vaadin-form-layout-column-gap')
            : getComputedStyle(this).getPropertyValue('--vaadin-form-layout-column-gap');
        Array.from(this.children).forEach(child => {
            let colspan = this._naturalNumberOrOne(parseFloat(child.getAttribute('colspan')));
            // Never span further than the number of columns
            colspan = Math.min(colspan, this._columnCount);
            const childRatio = colspan / this._columnCount;
            // Note: using 99.999% for 100% fixes rounding errors in MS Edge,
            // otherwise the items might wrap, resizing is wobbly
            child.style.width = `calc(${childRatio * 99.999}% - ${columnGap})`;
            if (child.localName === 'vaadin-form-item') {
                if (this._labelsOnTop) {
                    child.setAttribute('label-position', 'top');
                }
                else {
                    child.removeAttribute('label-position');
                }
            }
        });
    }
};
FormLayoutElement = FormLayoutElement_1 = __decorate([
    polymer3_decorators_1.component(FormLayoutElement_1.is)
], FormLayoutElement);
var FormLayoutElement_1;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("@polymer/polymer/lib/utils/render-status");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../iron-resizable-behavior/iron-resizable-behavior.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-form-layout\">\n  <template>\n    <style>\n      :host {\n        display: block;\n\n        /* CSS API for host */\n        --vaadin-form-layout-column-gap: 2em; /* (default) */\n      }\n\n      #layout {\n        display: flex;\n\n        align-items: baseline; /* default `stretch` is not appropriate */\n\n        flex-wrap: wrap; /* the items should wrap */\n\n        /*\n          To implement the column gap, horizontal margins for the items is used,\n          see slotted elements style below. We need to compensate item margins\n          in the wrapper, so that the are no gaps around the layout itself.\n        */\n        margin-left: calc(-0.5 * var(--vaadin-form-layout-column-gap));\n        margin-right: calc(-0.5 * var(--vaadin-form-layout-column-gap));\n      }\n\n      #layout ::slotted(*) {\n        /* Items should neigher grow nor shrink. */\n        flex-grow: 0;\n        flex-shrink: 0;\n\n        /* Margins make gaps between the columns */\n        margin-left: calc(0.5 * var(--vaadin-form-layout-column-gap));\n        margin-right: calc(0.5 * var(--vaadin-form-layout-column-gap));\n      }\n\n      #layout ::slotted(br) {\n        /*\n          Line break element wraps the following item on a new line. Makes\n          a block with zero height, stretched to fill all the available width\n          of layout, so that the next sibling item is wrapped for sure.\n        */\n        display: block;\n        content: '';\n        flex: 1 1 100%;\n        width: 9999px; /* for Firefox :-( */\n      }\n    </style>\n    <div id=\"layout\">\n      <slot id=\"slot\"></slot>\n    </div>\n  </template>\n\n  <script>\n    (function() {\n      /**\n       * `<vaadin-form-layout>` is a Polymer 2 element providing configurable responsive\n       * layout for form elements.\n       *\n       * ```html\n       * <vaadin-form-layout>\n       *\n       *   <vaadin-form-item>\n       *     <label slot=\"label\">First Name</label>\n       *     <input class=\"full-width\" value=\"Jane\">\n       *   </vaadin-form-item>\n       *\n       *   <vaadin-form-item>\n       *     <label slot=\"label\">Last Name</label>\n       *     <input class=\"full-width\" value=\"Doe\">\n       *   </vaadin-form-item>\n       *\n       *   <vaadin-form-item>\n       *     <label slot=\"label\">Email</label>\n       *     <input class=\"full-width\" value=\"jane.doe@example.com\">\n       *   </vaadin-form-item>\n       *\n       * </vaadin-form-layout>\n       * ```\n       *\n       * It supports any child elements as layout items.\n       *\n       * By default, it makes a layout of two columns if the element width is equal or\n       * wider than 40em, and a single column layout otherwise.\n       *\n       * The number of columns and the responsive behavior are customizable with\n       * the `responsiveSteps` property.\n       *\n       * ### Spanning Items on Multiple Columns\n       *\n       * You can use `colspan` attribute on the items.\n       * In the example below, the first text field spans on two columns:\n       *\n       * ```html\n       * <vaadin-form-layout>\n       *\n       *   <vaadin-form-item colspan=\"2\">\n       *     <label slot=\"label\">Address</label>\n       *     <input class=\"full-width\">\n       *   </vaadin-form-item>\n       *\n       *   <vaadin-form-item>\n       *     <label slot=\"label\">First Name</label>\n       *     <input class=\"full-width\" value=\"Jane\">\n       *   </vaadin-form-item>\n       *\n       *   <vaadin-form-item>\n       *     <label slot=\"label\">Last Name</label>\n       *     <input class=\"full-width\" value=\"Doe\">\n       *   </vaadin-form-item>\n       *\n       * </vaadin-form-layout>\n       * ```\n       *\n       * ### Explicit New Row\n       *\n       * Use the `<br>` line break element to wrap the items on a new row:\n       *\n       * ```html\n       * <vaadin-form-layout>\n       *\n       *   <vaadin-form-item>\n       *     <label slot=\"label\">Email</label>\n       *     <input class=\"full-width\">\n       *   </vaadin-form-item>\n       *\n       *   <br>\n       *\n       *   <vaadin-form-item>\n       *     <label slot=\"label\">Confirm Email</label>\n       *     <input class=\"full-width\">\n       *   </vaadin-form-item>\n       *\n       * </vaadin-form-layout>\n       * ```\n       *\n       * ### CSS Properties Reference\n       *\n       * The following custom CSS properties are available on the `<vaadin-form-layout>`\n       * element:\n       *\n       * Custom CSS property | Description | Default\n       * ---|---|---\n       * `--vaadin-form-layout-column-gap` | Length of the gap between columns | `2em`\n       *\n       * @memberof Vaadin\n       * @mixes Vaadin.ThemableMixin\n       * @demo demo/index.html\n       */\n      class FormLayoutElement extends\n          Vaadin.ThemableMixin(\n              Polymer.mixinBehaviors(\n                  [Polymer.IronResizableBehavior],\n                  Polymer.Element\n              )\n          ) {\n        static get is() {\n          return 'vaadin-form-layout';\n        }\n\n        static get properties() {\n          return {\n            /**\n             * @typedef ResponsiveStep\n             * @type {object}\n             * @property {string} minWidth - The threshold value for this step in CSS length units.\n             * @property {number} columns - Number of columns. Only natural numbers are valid.\n             * @property {string} labelsPosition - Labels position option, valid values: `\"aside\"` (default), `\"top\"`.\n             */\n\n            /**\n             * Allows specifying a responsive behavior with the number of columns\n             * and the label position depending on the layout width.\n             *\n             * Format: array of objects, each object defines one responsive step\n             * with `minWidth` CSS length, `columns` number, and optional\n             * `labelsPosition` string of `\"aside\"` or `\"top\"`. At least one item is required.\n             *\n             * #### Examples\n             *\n             * <dl>\n             *   <dt>`[{columns: 1}]`</dt>\n             *   <dd>\n             *     <p>The layout is always a single column, labels aside.\n             *   </dd>\n             *\n             *   <dt><pre><code>[\n             *   {minWidth: 0, columns: 1},\n             *   {minWidth: '40em', columns: 2}\n             * ]</code></pre></dt>\n             *   <dd>\n             *     <p>Sets two responsive steps:\n             *     <ol>\n             *       <li>When the layout width is < 40em, one column, labels aside.\n             *       <li>Width >= 40em, two columns, labels aside.\n             *     </ol>\n             *   </dd>\n             *\n             *   <dt><pre><code>[\n             *   {minWidth: 0, columns: 1, labelsPosition: 'top'},\n             *   {minWidth: '20em', columns: 1},\n             *   {minWidth: '40em', columns: 2}\n             * ]</code></pre></dt>\n             *   <dd>\n             *     <p>Default value. Three responsive steps:\n             *     <ol>\n             *       <li>Width < 20em, one column, labels on top.\n             *       <li>20em <= width < 40em, one column, labels aside.\n             *       <li>Width >= 40em, two columns, labels aside.\n             *     </ol>\n             *   </dd>\n             * </dl>\n             *\n             * @type {ResponsiveStep[]}\n             */\n            responsiveSteps: {\n              type: Array,\n              value: function() {\n                return [\n                  {minWidth: 0, columns: 1, labelsPosition: 'top'},\n                  {minWidth: '20em', columns: 1},\n                  {minWidth: '40em', columns: 2}\n                ];\n              },\n              observer: '_responsiveStepsChanged'\n            },\n\n            /**\n             * Current number of columns in the layout\n             */\n            _columnCount: {\n              type: Number\n            },\n\n            /**\n             * Indicates that labels are on top\n             */\n            _labelsOnTop: {\n              type: Boolean\n            }\n          };\n        }\n\n        static get observers() {\n          return [\n            '_invokeUpdateStyles(_columnCount, _labelsOnTop)'\n          ];\n        }\n\n        ready() {\n          // Here we create and attach a style element that we use for validating\n          // CSS values in `responsiveSteps`. We can’t add this to the `<template>`,\n          // because Polymer will throw it away. We need to create this before\n          // `super.ready()`, because `super.ready()` invokes property observers,\n          // and the observer for `responsiveSteps` does CSS value validation.\n          this._styleElement = document.createElement('style');\n          this.root.appendChild(this._styleElement);\n          // Ensure there is a child text node in the style element\n          this._styleElement.textContent = ' ';\n          if (window.ShadyDOM) {\n            // With ShadyDOM, setting textContent attaches text content nodes\n            // asynchronously, but we need it right away.\n            window.ShadyDOM.flush();\n          }\n\n          super.ready();\n\n          this.addEventListener('iron-resize', this._selectResponsiveStep);\n        }\n\n        connectedCallback() {\n          super.connectedCallback();\n\n          Polymer.RenderStatus.beforeNextRender(this, this._selectResponsiveStep);\n          Polymer.RenderStatus.beforeNextRender(this, this.updateStyles);\n        }\n\n        _naturalNumberOrOne(n) {\n          if (typeof n === 'number' && n >= 1 && n < Infinity) return Math.floor(n);\n          return 1;\n        }\n\n        _isValidCSSLength(value) {\n          // Let us choose a CSS property for validating CSS <length> values:\n          // - `border-spacing` accepts `<length> | inherit`, it’s the best! But\n          //   it does not disallow invalid values at all in MSIE :-(\n          // - `letter-spacing` and `word-spacing` accept\n          //   `<length> | normal | inherit`, and disallows everything else, like\n          //   `<percentage>`, `auto` and such, good enough.\n          // - `word-spacing` is used since its shorter.\n\n          // Disallow known keywords allowed as the `word-spacing` value\n          if (value === 'inherit' || value === 'normal') return false;\n\n          // Use the value in a stylesheet and check the parsed value. Invalid\n          // input value results in empty parsed value.\n          this._styleElement.firstChild.nodeValue = `#styleElement { word-spacing: ${value}; }`;\n\n          if (!this._styleElement.sheet) {\n            // Stylesheet is not ready, probably not attached to the document yet.\n            return true;\n          }\n\n          return this._styleElement.sheet.cssRules[0].style.getPropertyValue('word-spacing') !== '';\n        }\n\n        _responsiveStepsChanged(responsiveSteps, oldResponsiveSteps) {\n          try {\n            if (!Array.isArray(responsiveSteps)) {\n              throw new Error('Invalid \"responsiveSteps\" type, an Array is required.');\n            }\n\n            if (responsiveSteps.length < 1) {\n              throw new Error('Invalid empty \"responsiveSteps\" array, at least one item is required.');\n            }\n\n            responsiveSteps.forEach(step => {\n              if (this._naturalNumberOrOne(step.columns) !== step.columns) {\n                throw new Error(`Invalid 'columns' value of ${step.columns}, a natural number is required.`);\n              }\n\n              if (step.minWidth !== undefined && !this._isValidCSSLength(step.minWidth)) {\n                throw new Error(`Invalid 'minWidth' value of ${step.minWidth}, a valid CSS length required.`);\n              }\n\n              if (step.labelsPosition !== undefined && ['aside', 'top'].indexOf(step.labelsPosition) === -1) {\n                throw new Error(`Invalid 'labelsPosition' value of ${step.labelsPosition}, 'aside' or 'top' string is required.`);\n              }\n            });\n          } catch(e) {\n            if (oldResponsiveSteps && oldResponsiveSteps !== responsiveSteps) {\n              console.warn(`${e.message} Using previously set 'responsiveSteps' instead.`);\n              this.responsiveSteps = oldResponsiveSteps;\n            } else {\n              console.warn(`${e.message} Using default 'responsiveSteps' instead.`);\n              this.responsiveSteps = [\n                {minWidth: 0, columns: 1, labelsPosition: 'top'},\n                {minWidth: '20em', columns: 1},\n                {minWidth: '40em', columns: 2}\n              ];\n            }\n          }\n\n          this._selectResponsiveStep();\n        }\n\n        _selectResponsiveStep() {\n          // Iterate through responsiveSteps and choose the step\n          let selectedStep;\n          const tmpStyleProp = 'background-position';\n          this.responsiveSteps.forEach(step => {\n            // Convert minWidth to px units for comparison\n            this.$.layout.style.setProperty(tmpStyleProp, step.minWidth);\n            const stepMinWidthPx = parseFloat(getComputedStyle(this.$.layout).getPropertyValue(tmpStyleProp));\n\n            // Compare step min-width with the host width, select the passed step\n            if (stepMinWidthPx <= this.offsetWidth) {\n              selectedStep = step;\n            }\n          });\n          this.$.layout.style.removeProperty(tmpStyleProp);\n\n          // Sometimes converting units is not possible, e.g, when element is\n          // not connected. Then the `selectedStep` stays `undefined`.\n          if (selectedStep) {\n            // Apply the chosen responsive step’s properties\n            this._columnCount = selectedStep.columns;\n            this._labelsOnTop = selectedStep.labelsPosition === 'top';\n          }\n        }\n\n        _invokeUpdateStyles() {\n          this.updateStyles();\n        }\n\n        /**\n         * Set custom CSS property values and update the layout.\n         */\n        updateStyles(...args) {\n          super.updateStyles(...args);\n\n          /*\n            The item width formula:\n\n                itemWidth = colspan / columnCount * 100% - columnGap\n\n            We have to subtract columnGap, because the column gap space is taken\n            by item margins of 1/2 * gap on both sides\n          */\n\n          const columnGap = window.ShadyCSS\n            ? window.ShadyCSS.getComputedStyleValue(this, '--vaadin-form-layout-column-gap')\n            : getComputedStyle(this).getPropertyValue('--vaadin-form-layout-column-gap');\n\n          Array.from(this.children).forEach(child => {\n            let colspan = this._naturalNumberOrOne(parseFloat(child.getAttribute('colspan')));\n\n            // Never span further than the number of columns\n            colspan = Math.min(colspan, this._columnCount);\n\n            const childRatio = colspan / this._columnCount;\n\n            // Note: using 99.999% for 100% fixes rounding errors in MS Edge,\n            // otherwise the items might wrap, resizing is wobbly\n            child.style.width = `calc(${childRatio * 99.999}% - ${columnGap})`;\n\n            if (child.localName === 'vaadin-form-item') {\n              if (this._labelsOnTop) {\n                child.setAttribute('label-position', 'top');\n              } else {\n                child.removeAttribute('label-position');\n              }\n            }\n          });\n        }\n      }\n\n      customElements.define(FormLayoutElement.is, FormLayoutElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.FormLayoutElement = FormLayoutElement;\n    })();\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadinFormItem = __webpack_require__(62);
let FormItemElement = FormItemElement_1 = class FormItemElement extends vaadin_themable_mixin_1.default(polymer_element_1.Element) {
    static get template() {
        const domModule = cheerio.load(vaadinFormItem)('template');
        const html = domModule.html();
        return html;
    }
    static get is() {
        return 'vaadin-form-item';
    }
    static get properties() {
        return {};
    }
    _onLabelClick(e) {
        // No `Array.prototype.find` in MSIE, using `filter` instead :-(
        const firstContentElementChild = Array.prototype.filter.call(this.$.contentSlot.assignedNodes(), (e) => e.nodeType === Node.ELEMENT_NODE)[0];
        if (firstContentElementChild) {
            firstContentElementChild.focus();
            firstContentElementChild.click();
        }
    }
};
FormItemElement = FormItemElement_1 = __decorate([
    polymer3_decorators_1.component(FormItemElement_1.is)
], FormItemElement);
var FormItemElement_1;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-form-item\">\n  <template>\n    <style>\n      :host {\n        display: inline-flex;\n        flex-direction: row;\n        align-items: baseline;\n\n        /* CSS API for host */\n        --vaadin-form-item-label-width: 8em;\n        --vaadin-form-item-label-gap: 1em;\n        --vaadin-form-item-row-gap: 1em;\n\n        margin: calc(0.5 * var(--vaadin-form-item-row-gap)) 0;\n      }\n\n      :host([label-position=\"top\"]) {\n        flex-direction: column;\n        align-items: stretch;\n      }\n\n      #label {\n        width: var(--vaadin-form-item-label-width);\n        flex: 0 0 auto;\n      }\n\n      :host([label-position=\"top\"]) #label {\n        width: auto;\n      }\n\n      #gap {\n        width: var(--vaadin-form-item-label-gap);\n        flex: 0 0 auto;\n      }\n\n      #content {\n        flex: 1 1 auto;\n      }\n\n      #content ::slotted(.full-width) {\n        box-sizing: border-box;\n        width: 100%;\n        min-width: 0;\n      }\n    </style>\n    <div id=\"label\" part=\"label\" on-click=\"_onLabelClick\">\n      <slot name=\"label\" id=\"labelSlot\"></slot>\n    </div>\n    <div id=\"gap\"></div>\n    <div id=\"content\">\n      <slot id=\"contentSlot\"></slot>\n    </div>\n  </template>\n\n  <script>\n    (function() {\n      /**\n       * `<vaadin-form-item>` is a Polymer 2 element providing labelled form item wrapper\n       * for using inside `<vaadin-form-layout>`.\n       *\n       * `<vaadin-form-item>` accepts any number of children as the input content,\n       * and also has a separate named `label` slot:\n       *\n       * ```html\n       * <vaadin-form-item>\n       *   <label slot=\"label\">Label aside</label>\n       *   <input>\n       * </vaadin-form-item>\n       * ```\n       *\n       * Any content can be used. For instance, you can have multiple input elements\n       * with surrounding text. The label can be an element of any type:\n       *\n       * ```html\n       * <vaadin-form-item>\n       *   <span slot=\"label\">Date of Birth</span>\n       *   <input placeholder=\"YYYY\" size=\"4\"> -\n       *   <input placeholder=\"MM\" size=\"2\"> -\n       *   <input placeholder=\"DD\" size=\"2\"><br>\n       *   <em>Example: 1900-01-01</em>\n       * </vaadin-form-item>\n       * ```\n       *\n       * The label is optional and can be omitted:\n       *\n       * ```html\n       * <vaadin-form-item>\n       *   <input type=\"checkbox\"> Subscribe to our Newsletter\n       * </vaadin-form-item>\n       * ```\n       *\n       * By default, the `label` slot content is displayed aside of the input content.\n       * When `label-position=\"top\"` is set, the `label` slot content is displayed on top:\n       *\n       * ```html\n       * <vaadin-form-item label-position=\"top\">\n       *   <label slot=\"label\">Label on top</label>\n       *   <input>\n       * </vaadin-form-item>\n       * ```\n       *\n       * **Note:** Normally, `<vaadin-form-item>` is used as a child of\n       * a `<vaadin-form-layout>` element. Setting `label-position` is unnecessary,\n       * because the `label-position` attribute is triggered automatically by the parent\n       * `<vaadin-form-layout>`, depending on its width and responsive behavior.\n       *\n       * ### Input Width\n       *\n       * By default, `<vaadin-form-item>` does not manipulate the width of the slotted\n       * input elements. Optionally you can stretch the child input element to fill\n       * the available width for the input content by adding the `full-width` class:\n       *\n       * ```html\n       * <vaadin-form-item>\n       *   <label slot=\"label\">Label</label>\n       *   <input class=\"full-width\">\n       * </vaadin-form-item>\n       * ```\n       *\n       * ### Styling\n       *\n       * The `label-position` host attribute can be used to target the label on top state:\n       *\n       * <pre><code>\n       * &lt;dom-module id=\"my-form-item-theme\" theme-for=\"vaadin-form-item\"&gt;\n       *   &lt;template&gt;\n       *     &lt;style&gt;\n       *       :host {\n       *         /&#42; default state styles, label aside &#42;/\n       *       }\n       *\n       *       :host([label-position=\"top\"]) {\n       *         /&#42; label on top state styles &#42;/\n       *       }\n       *     &lt;/style&gt;\n       *   &lt;/template&gt;\n       * &lt;/dom-module&gt;\n       * </code></pre>\n       *\n       * The following shadow DOM parts are available for styling:\n       *\n       * Part name | Description\n       * ---|---\n       * label | The label slot container\n       *\n       * ### Custom CSS Properties Reference\n       *\n       * The following custom CSS properties are available on the `<vaadin-form-item>`\n       * element:\n       *\n       * Custom CSS property | Description | Default\n       * ---|---|---\n       * `--vaadin-form-item-label-width` | Width of the label column when the labels are aside | `8em`\n       * `--vaadin-form-item-label-gap` | Length of the gap between the label column and the input column when the labels are aside | `1em`\n       * `--vaadin-form-item-row-gap` | Height of the gap between the form item elements | `1em`\n       *\n       * @memberof Vaadin\n       * @mixes Vaadin.ThemableMixin\n       * @demo demo/index.html\n       */\n      class FormItemElement extends Vaadin.ThemableMixin(Polymer.Element) {\n        static get is() {\n          return 'vaadin-form-item';\n        }\n\n        static get properties() {\n          return {\n          };\n        }\n\n        _onLabelClick(e) {\n          // No `Array.prototype.find` in MSIE, using `filter` instead :-(\n          const firstContentElementChild = Array.prototype.filter.call(\n              this.$.contentSlot.assignedNodes(),\n              (e) => e.nodeType === Node.ELEMENT_NODE\n          )[0];\n          if (firstContentElementChild) {\n            firstContentElementChild.focus();\n            firstContentElementChild.click();\n          }\n        }\n      }\n\n      customElements.define(FormItemElement.is, FormItemElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.FormItemElement = FormItemElement;\n    })();\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
__webpack_require__(64);
const vaadinIcons = __webpack_require__(65);
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');
$_documentContainer.innerHTML = cheerio.load(vaadinIcons)('body').html();
document.head.appendChild($_documentContainer);


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("@polymer/iron-iconset-svg/iron-iconset-svg");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = "<!--\n @license\n Copyright (c) 2015-2017 Vaadin Ltd.\n This program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n --><html><head><link rel=\"import\" href=\"../iron-icon/iron-icon.html\">\n <link rel=\"import\" href=\"../iron-iconset-svg/iron-iconset-svg.html\">\n\n <!--\n `vaadin-icons` is a set of 600+ icons which can be used together with Polymer's [`iron-icon`](https://elements.polymer-project.org/elements/iron-icon) component.\n\n To use the `vaadin-icons` iconset, import the specific `vaadin-icons.html`, and\n specify the icon as `vaadin:<icon>`. For example, to use a cart icon, you would\n use:\n ```html\n<link rel=\"import\" href=\"/components/vaadin-icons/vaadin-icons.html\">\n<iron-icon icon=\"vaadin:cart\"></iron-icon>\n ```\n\n For the complete list of available icons, see https://vaadin.com/icons\n @pseudoElement vaadin-icons\n @demo demo/\n -->\n</head><body><iron-iconset-svg name=\"vaadin\" size=\"16\">\n<svg><defs>\n<g id=\"abacus\"><path d=\"M0 0v16h16v-16h-16zM14 2v3h-0.1c-0.2-0.6-0.8-1-1.4-1s-1.2 0.4-1.4 1h-3.2c-0.2-0.6-0.7-1-1.4-1s-1.2 0.4-1.4 1h-0.2c-0.2-0.6-0.7-1-1.4-1s-1.2 0.4-1.4 1h-0.1v-3h12zM13.9 10c-0.2-0.6-0.8-1-1.4-1s-1.2 0.4-1.4 1h-0.2c-0.2-0.6-0.8-1-1.4-1s-1.2 0.4-1.4 1h-3.2c-0.2-0.6-0.7-1-1.4-1s-1.2 0.4-1.4 1h-0.1v-4h0.1c0.2 0.6 0.8 1 1.4 1s1.2-0.4 1.4-1h0.2c0.2 0.6 0.8 1 1.4 1s1.2-0.4 1.4-1h3.2c0.2 0.6 0.8 1 1.4 1s1.2-0.4 1.4-1h0.1l-0.1 4zM2 14v-3h0.1c0.2 0.6 0.8 1 1.4 1s1.2-0.4 1.4-1h3.2c0.2 0.6 0.8 1 1.4 1s1.2-0.4 1.4-1h0.2c0.2 0.6 0.8 1 1.4 1s1.2-0.4 1.4-1h0.1v3h-12z\"/></g>\n<g id=\"absolute-position\"><path d=\"M0 0v16h16v-16h-16zM15 15h-14v-6h3v1l3-2-3-2v1h-3v-6h6v3h-1l2 3 2-3h-1v-3h6v14z\"/></g>\n<g id=\"academy-cap\"><path d=\"M15.090 12.79c0.235-0.185 0.385-0.469 0.385-0.789 0-0.358-0.188-0.672-0.471-0.849l-0.004-5.822-1 0.67v5.15c-0.283 0.18-0.468 0.492-0.468 0.847 0 0.316 0.147 0.598 0.376 0.782l-0.378 0.502c-0.323 0.41-0.521 0.931-0.53 1.498l-0 1.222h0.81c0.002 0 0.004 0 0.005 0 0.411 0 0.757-0.282 0.853-0.664l0.331-1.336v2h1v-1.21c-0.009-0.569-0.207-1.090-0.534-1.505z\"/><path d=\"M8 0l-8 4 8 5 8-5-8-4z\"/><path d=\"M8 10l-5-3.33v1.71c0 0.91 2.94 3.62 5 3.62s5-2.71 5-3.62v-1.71z\"/></g>\n<g id=\"accessibility\"><path d=\"M10.4 10h-0.5c0.1 0.3 0.1 0.7 0.1 1 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-2.1 1.6-3.8 3.7-4l-0.2-1c-2.6 0.4-4.5 2.4-4.5 5 0 2.8 2.2 5 5 5 2.4 0 4.4-1.7 4.9-3.9l-0.5-2.1z\"/><path d=\"M13.1 13l-1.1-5h-4.1l-0.2-1h3.3v-1h-3.5l-0.6-2.5c0.9-0.1 1.6-0.8 1.6-1.7 0-1-0.8-1.8-1.8-1.8s-1.7 0.8-1.7 1.8c0 0.6 0.3 1.2 0.8 1.5l1.3 5.7h4.1l1.2 5h2.6v-1h-1.9z\"/></g>\n<g id=\"accordion-menu\"><path d=\"M0 4v8h16v-8h-16zM15 11h-14v-4h14v4z\"/><path d=\"M0 0h16v3h-16v-3z\"/><path d=\"M0 13h16v3h-16v-3z\"/></g>\n<g id=\"add-dock\"><path d=\"M0 11v5h16v-5h-16zM12 15h-3v-3h3v3z\"/><path d=\"M12 7v-2c0-5-8-5-8-5s5 0 5 5v2h-2l3.5 3 3.5-3h-2z\"/></g>\n<g id=\"adjust\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM2 8c0-3.3 2.7-6 6-6v12c-3.3 0-6-2.7-6-6z\"/></g>\n<g id=\"adobe-flash\"><path d=\"M0 0v16h16v-16h-16zM13 4.4c-3 0-3.3 2.6-3.3 2.6h1.3v2h-2.4c-1.8 5.8-5.6 5-5.6 5v-2.5c0 0 2.5 0.6 3.9-4 1.8-6.1 6.1-5.5 6.1-5.5v2.4z\"/></g>\n<g id=\"airplane\"><path d=\"M12.3 6.5c0.5-0.5 0.9-0.8 1.2-1.1 1.6-1.6 3.2-4.1 2.2-5.1s-3.4 0.6-5 2.2c-0.3 0.3-0.6 0.7-1.1 1.2l-7-3.2c-0.7-0.3-1.5-0.2-2 0.3l-0.6 0.5 6.6 5.7c-1.3 1.6-2.7 3.1-3.4 4l-1.1-0.6c-0.5-0.3-1.2-0.3-1.6 0.2l-0.3 0.3 2.8 2.1 2 2.8 0.3-0.3c0.4-0.4 0.5-1.1 0.2-1.6l-0.5-1.1c0.9-0.7 2.4-2.1 4-3.4l5.7 6.6 0.5-0.5c0.5-0.5 0.6-1.3 0.3-2l-3.2-7z\"/></g>\n<g id=\"alarm\"><path d=\"M8 5h-1v5h4v-1l-2.93 0.070-0.070-4.070z\"/><path d=\"M5.46 0.87c-0.387-0.522-1-0.856-1.692-0.856-0.41 0-0.793 0.118-1.117 0.321l-0.991 0.765c-0.41 0.384-0.666 0.929-0.666 1.534 0 0.496 0.172 0.951 0.459 1.31z\"/><path d=\"M14.34 1.1l-1-0.77c-0.315-0.198-0.698-0.316-1.108-0.316-0.692 0-1.305 0.334-1.688 0.85l3.996 3.076c0.287-0.356 0.46-0.813 0.46-1.312 0-0.602-0.253-1.145-0.659-1.528z\"/><path d=\"M12.87 14c1.308-1.268 2.122-3.038 2.13-4.998-0.028-3.856-3.145-6.973-6.997-7.002-3.857 0.028-6.975 3.145-7.003 6.997 0.008 1.965 0.822 3.735 2.128 5.001l-0.938 0.942c-0.075 0.102-0.12 0.231-0.12 0.37 0 0.348 0.282 0.63 0.63 0.63 0.139 0 0.268-0.045 0.372-0.122l0.998-0.999c1.092 0.758 2.446 1.211 3.905 1.211s2.813-0.453 3.928-1.226l0.977 1.015c0.102 0.075 0.231 0.12 0.37 0.12 0.348 0 0.63-0.282 0.63-0.63 0-0.139-0.045-0.268-0.122-0.372zM2.87 9c0.028-2.822 2.308-5.102 5.127-5.13 2.825 0.028 5.105 2.308 5.133 5.127-0.028 2.825-2.308 5.105-5.127 5.133-2.825-0.028-5.105-2.308-5.133-5.127z\"/></g>\n<g id=\"align-center\"><path d=\"M5 0h6v3h-6v-3z\"/><path d=\"M1 4h14v3h-14v-3z\"/><path d=\"M3 8h10v3h-10v-3z\"/><path d=\"M0 12h16v3h-16v-3z\"/></g>\n<g id=\"align-justify\"><path d=\"M0 0h16v3h-16v-3z\"/><path d=\"M0 4h16v3h-16v-3z\"/><path d=\"M0 12h16v3h-16v-3z\"/><path d=\"M0 8h16v3h-16v-3z\"/></g>\n<g id=\"align-left\"><path d=\"M0 0h11v3h-11v-3z\"/><path d=\"M0 4h15v3h-15v-3z\"/><path d=\"M0 8h13v3h-13v-3z\"/><path d=\"M0 12h16v3h-16v-3z\"/></g>\n<g id=\"align-right\"><path d=\"M5 0h11v3h-11v-3z\"/><path d=\"M1 4h15v3h-15v-3z\"/><path d=\"M3 8h13v3h-13v-3z\"/><path d=\"M0 12h16v3h-16v-3z\"/></g>\n<g id=\"alt-a\"><path d=\"M14 7v-1h-1v-1h-1v1h-0.5v1h0.5v3.56c0 1 0.56 1.44 2 1.44v-1c-0.055 0.012-0.119 0.019-0.185 0.019-0.359 0-0.669-0.21-0.813-0.514l-0.002-3.505h1z\"/><path d=\"M9 3h1v9h-1v-9z\"/><path d=\"M3 12l0.57-2h2.82l0.61 2h1l-2.27-8h-1.46l-2.27 8h1zM5 5.1l1.11 3.9h-2.22z\"/></g>\n<g id=\"alt\"><path d=\"M3.89 9h2.22l-1.11-3.9-1.11 3.9z\"/><path d=\"M0 0v16h16v-16h-16zM7 12l-0.61-2h-2.78l-0.61 2h-1l2.27-8h1.46l2.27 8h-1zM10 12h-1v-9h1v9zM14 7h-1v3.5s0 0.5 1 0.5v1c-1 0-2-0.44-2-1.44v-3.56h-0.5v-1h0.5v-1h1v1h1v1z\"/></g>\n<g id=\"ambulance\"><path d=\"M6.18 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M14 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M5 6h-1v1h-1v1h1v1h1v-1h1v-1h-1v-1z\"/><path d=\"M15.76 8.64l-3-4.53c-0.455-0.673-1.215-1.11-2.078-1.11-0.008 0-0.015 0-0.023 0l-2.659-0v-1c0-0.552-0.448-1-1-1s-1 0.448-1 1v1h-4.5c-0.828 0-1.5 0.672-1.5 1.5v8.5h1.37c0.474-1.135 1.546-1.931 2.812-2 1.278 0.072 2.345 0.868 2.81 1.978l2.188 0.021c0.474-1.135 1.546-1.931 2.812-2 1.303 0.003 2.405 0.827 2.822 1.979l1.187 0.021v-3.57c-0.001-0.294-0.090-0.568-0.243-0.795zM6.92 8.12c-0.266 1.117-1.255 1.935-2.435 1.935-1.381 0-2.5-1.119-2.5-2.5 0-1.18 0.818-2.17 1.918-2.432 0.195-0.049 0.399-0.075 0.609-0.075 1.37 0 2.48 1.11 2.48 2.48 0 0.21-0.026 0.414-0.075 0.609zM10 8v-3h0.85c0.003-0 0.006-0 0.009-0 0.777 0 1.461 0.394 1.866 0.992l1.325 2.008z\"/></g>\n<g id=\"anchor\"><path d=\"M13 9v2c0 0-0.8 1.7-4 1.9v-6.9h2.2c0.2 0.3 0.5 0.5 0.8 0.5 0.6 0 1-0.4 1-1s-0.4-1-1-1c-0.4 0-0.7 0.2-0.8 0.5h-2.2v-1.3c0.6-0.3 1-1 1-1.7 0-1.1-0.9-2-2-2s-2 0.9-2 2c0 0.7 0.4 1.4 1 1.7v1.3h-2.2c-0.1-0.3-0.4-0.5-0.8-0.5-0.6 0-1 0.4-1 1s0.4 1 1 1c0.4 0 0.7-0.2 0.8-0.5h2.2v7c-3.3-0.3-4-2-4-2v-2h-3c0 0 2.8 7 8 7 5 0 8-7 8-7h-3zM8 1c0.6 0 1 0.4 1 1s-0.4 1-1 1-1-0.4-1-1 0.4-1 1-1z\"/></g>\n<g id=\"angle-double-down\"><path d=\"M3 2v2l5 5 5-5v-2l-5 5z\"/><path d=\"M3 7v2l5 5 5-5v-2l-5 5z\"/></g>\n<g id=\"angle-double-left\"><path d=\"M14 3h-2l-5 5 5 5h2l-5-5z\"/><path d=\"M9 3h-2l-5 5 5 5h2l-5-5z\"/></g>\n<g id=\"angle-double-right\"><path d=\"M2 13h2l5-5-5-5h-2l5 5z\"/><path d=\"M7 13h2l5-5-5-5h-2l5 5z\"/></g>\n<g id=\"angle-double-up\"><path d=\"M13 14v-2l-5-5-5 5v2l5-5z\"/><path d=\"M13 9v-2l-5-5-5 5v2l5-5z\"/></g>\n<g id=\"angle-down\"><path d=\"M13 4v2l-5 5-5-5v-2l5 5z\"/></g>\n<g id=\"angle-left\"><path d=\"M12 13h-2l-5-5 5-5h2l-5 5z\"/></g>\n<g id=\"angle-right\"><path d=\"M4 13h2l5-5-5-5h-2l5 5z\"/></g>\n<g id=\"angle-up\"><path d=\"M3 12v-2l5-5 5 5v2l-5-5z\"/></g>\n<g id=\"archive\"><path d=\"M0 1h16v3h-16v-3z\"/><path d=\"M1 5v11h14v-11h-14zM11 9h-6v-2h6v2z\"/></g>\n<g id=\"archives\"><path d=\"M11 2h-6v4h6v-4zM9 4h-2v-1h2v1z\"/><path d=\"M3 0v16h2v-1h6v1h2v-16h-10zM12 14h-8v-6h8v6zM12 7h-8v-6h8v6z\"/><path d=\"M11 9h-6v4h6v-4zM9 11h-2v-1h2v1z\"/></g>\n<g id=\"area-select\"><path d=\"M7.9 7.9l2.1 7.5 1.7-2.6 3.2 3.2 1.1-1.1-3.3-3.2 2.7-1.6z\"/><path d=\"M8 12h-7v-9h12v5.4l1 0.2v-6.6h-14v11h8.2z\"/></g>\n<g id=\"arrow-backward\"><path d=\"M0 7.9l6-4.9v3c0 0 1.1 0 2 0 8 0 8 8 8 8s-1-4-7.8-4c-1.1 0-1.8 0-2.2 0v2.9l-6-5z\"/></g>\n<g id=\"arrow-circle-down-o\"><path d=\"M1 8c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7-7-3.1-7-7zM0 8c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8-8 3.6-8 8v0z\"/><path d=\"M9 9.6l1.8-1.8 1.4 1.4-4.2 4.2-4.2-4.2 1.4-1.4 1.8 1.8v-6.6h2v6.6z\"/></g>\n<g id=\"arrow-circle-down\"><path d=\"M0 8c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8c-4.4 0-8 3.6-8 8zM9 9.6l1.8-1.8 1.4 1.4-4.2 4.2-4.2-4.2 1.4-1.4 1.8 1.8v-6.6h2v6.6z\"/></g>\n<g id=\"arrow-circle-left-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M6.4 9l1.8 1.8-1.4 1.4-4.2-4.2 4.2-4.2 1.4 1.4-1.8 1.8h6.6v2h-6.6z\"/></g>\n<g id=\"arrow-circle-left\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.4 9l1.8 1.8-1.4 1.4-4.2-4.2 4.2-4.2 1.4 1.4-1.8 1.8h6.6v2h-6.6z\"/></g>\n<g id=\"arrow-circle-right-o\"><path d=\"M8 15c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM8 16c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8v0z\"/><path d=\"M9.6 7l-1.8-1.8 1.4-1.4 4.2 4.2-4.2 4.2-1.4-1.4 1.8-1.8h-6.6v-2h6.6z\"/></g>\n<g id=\"arrow-circle-right\"><path d=\"M8 16c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zM9.6 7l-1.8-1.8 1.4-1.4 4.2 4.2-4.2 4.2-1.4-1.4 1.8-1.8h-6.6v-2h6.6z\"/></g>\n<g id=\"arrow-circle-up-o\"><path d=\"M15 8c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 7 3.1 7 7zM16 8c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 4.4 3.6 8 8 8s8-3.6 8-8v0z\"/><path d=\"M7 6.4l-1.8 1.8-1.4-1.4 4.2-4.2 4.2 4.2-1.4 1.4-1.8-1.8v6.6h-2v-6.6z\"/></g>\n<g id=\"arrow-circle-up\"><path d=\"M16 8c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zM7 6.4l-1.8 1.8-1.4-1.4 4.2-4.2 4.2 4.2-1.4 1.4-1.8-1.8v6.6h-2v-6.6z\"/></g>\n<g id=\"arrow-down\"><path d=\"M12.5 8.6l-3.5 3.6v-12.2h-2v12.2l-3.5-3.6-1.4 1.5 5.9 5.9 5.9-5.9z\"/></g>\n<g id=\"arrow-forward\"><path d=\"M16 7.9l-6-4.9v3c-0.5 0-1.1 0-2 0-8 0-8 8-8 8s1-4 7.8-4c1.1 0 1.8 0 2.2 0v2.9l6-5z\"/></g>\n<g id=\"arrow-left\"><path d=\"M7.4 12.5l-3.6-3.5h12.2v-2h-12.2l3.6-3.5-1.5-1.4-5.9 5.9 5.9 5.9z\"/></g>\n<g id=\"arrow-long-down\"><path d=\"M7 1h2v11h2l-3 3-3-3h2z\"/></g>\n<g id=\"arrow-long-left\"><path d=\"M15 7v2h-11v2l-3-3 3-3v2z\"/></g>\n<g id=\"arrow-right\"><path d=\"M8.6 3.5l3.5 3.5h-12.1v2h12.1l-3.5 3.5 1.4 1.4 6-5.9-6-5.9z\"/></g>\n<g id=\"arrow-up\"><path d=\"M3.4 7.4l3.6-3.6v12.2h2v-12.2l3.5 3.6 1.4-1.5-5.9-5.9-6 5.9z\"/></g>\n<g id=\"arrows-cross\"><path d=\"M15 5v-4h-4l1.3 1.3-4.3 4.3-4.3-4.3 1.3-1.3h-4v4l1.3-1.3 4.3 4.3-4.3 4.3-1.3-1.3v4h4l-1.3-1.3 4.3-4.3 4.3 4.3-1.3 1.3h4v-4l-1.3 1.3-4.3-4.3 4.3-4.3z\"/></g>\n<g id=\"arrows-long-h\"><path d=\"M16 8l-3-3v2h-10v-2l-3 3 3 3v-2h10v2z\"/></g>\n<g id=\"arrows-long-right\"><path d=\"M1 9v-2h11v-2l3 3-3 3v-2z\"/></g>\n<g id=\"arrows-long-up\"><path d=\"M9 15h-2v-11h-2l3-3 3 3h-2z\"/></g>\n<g id=\"arrows-long-v\"><path d=\"M9 3h2l-3-3-3 3h2v10h-2l3 3 3-3h-2z\"/></g>\n<g id=\"arrows\"><path d=\"M16 8l-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z\"/></g>\n<g id=\"asterisk\"><path d=\"M15.9 5.7l-2-3.4-3.9 2.2v-4.5h-4v4.5l-4-2.2-2 3.4 3.9 2.3-3.9 2.3 2 3.4 4-2.2v4.5h4v-4.5l3.9 2.2 2-3.4-4-2.3z\"/></g>\n<g id=\"at\"><path d=\"M7.5 12.2c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2c0.1 2.3-1.9 4.2-4.2 4.2zM7.5 5.2c-1.5 0-2.7 1.3-2.7 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8-1.4-2.8-2.9-2.8z\"/><path d=\"M8 16c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8c0 1.5-0.4 3-1.2 4.2-0.3 0.5-1.1 1.2-2.3 1.2-0.8 0-1.3-0.3-1.6-0.6-0.7-0.7-0.6-1.8-0.6-1.9v-6.9h1.5v7c0 0.2 0 0.6 0.2 0.8 0 0 0.2 0.2 0.5 0.2 0.7 0 1.1-0.5 1.1-0.5 0.6-1 1-2.2 1-3.4 0-3.6-2.9-6.5-6.5-6.5s-6.6 2.8-6.6 6.4 2.9 6.5 6.5 6.5c0.7 0 1.3-0.1 1.9-0.3l0.4 1.4c-0.7 0.3-1.5 0.4-2.3 0.4z\"/></g>\n<g id=\"automation\"><path d=\"M14 12c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M11.7 16v0c-0.8 0-1.6-0.2-2.3-0.7l-6.2-3.3c-0.5-0.4-0.9-0.6-1.3-1-1.2-1.2-1.9-2.9-1.9-4.6s0.7-3.3 1.9-4.5c1.2-1.2 2.8-1.9 4.5-1.9s3.3 0.7 4.6 1.9c0.4 0.4 0.6 0.7 1 1.2l3.5 6.4c1 1.7 0.7 3.8-0.7 5.2-0.9 0.9-1.9 1.3-3.1 1.3zM6.4 1c-1.4 0-2.8 0.6-3.8 1.6s-1.6 2.4-1.6 3.8c0 1.5 0.6 2.8 1.6 3.8 0.3 0.3 0.6 0.5 1.1 0.8l6.3 3.4c0.6 0.4 1.2 0.5 1.8 0.5v0c0.9 0 1.7-0.3 2.3-1 1.1-1.1 1.3-2.7 0.5-4l-3.5-6.4c-0.3-0.4-0.5-0.7-0.8-1-1.1-0.9-2.4-1.5-3.9-1.5z\"/><path d=\"M11 7v-1l-1.4-0.5c-0.1-0.2-0.1-0.3-0.2-0.5l0.6-1.3-0.7-0.7-1.3 0.6c-0.2-0.1-0.3-0.1-0.5-0.2l-0.5-1.4h-1l-0.5 1.4c-0.2 0.1-0.3 0.1-0.5 0.2l-1.3-0.6-0.7 0.7 0.6 1.3c-0.1 0.2-0.1 0.3-0.2 0.5l-1.4 0.5v1l1.4 0.5c0.1 0.2 0.1 0.3 0.2 0.5l-0.6 1.3 0.7 0.7 1.3-0.6c0.2 0.1 0.3 0.2 0.5 0.2l0.5 1.4h1l0.5-1.4c0.2-0.1 0.3-0.1 0.5-0.2l1.3 0.6 0.7-0.7-0.6-1.3c0.1-0.2 0.2-0.3 0.2-0.5l1.4-0.5zM6.5 8c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5z\"/></g>\n<g id=\"backspace-a\"><path d=\"M5 12l-5-4 5-4v2h11v4h-11v2z\"/></g>\n<g id=\"backspace\"><path d=\"M0 2v12h16v-12h-16zM13 9h-7v2l-3-3 3-3v2h7v2z\"/></g>\n<g id=\"backwards\"><path d=\"M16 15v-14l-8 7z\"/><path d=\"M8 15v-14l-8 7z\"/></g>\n<g id=\"ban\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8 2c1.3 0 2.5 0.4 3.5 1.1l-8.4 8.4c-0.7-1-1.1-2.2-1.1-3.5 0-3.3 2.7-6 6-6zM8 14c-1.3 0-2.5-0.4-3.5-1.1l8.4-8.4c0.7 1 1.1 2.2 1.1 3.5 0 3.3-2.7 6-6 6z\"/></g>\n<g id=\"bar-chart-h\"><path d=\"M1 15v-15h-1v16h16v-1h-15z\"/><path d=\"M2 8h4v6h-4v-6z\"/><path d=\"M7 2h4v12h-4v-12z\"/><path d=\"M12 6h4v8h-4v-8z\"/></g>\n<g id=\"bar-chart-v\"><path d=\"M1 15v-15h-1v16h16v-1h-15z\"/><path d=\"M8 0v4h-6v-4h6z\"/><path d=\"M14 5v4h-12v-4h12z\"/><path d=\"M10 10v4h-8v-4h8z\"/></g>\n<g id=\"bar-chart\"><path d=\"M0 15h15v1h-15v-1z\"/><path d=\"M0 11h3v3h-3v-3z\"/><path d=\"M4 9h3v5h-3v-5z\"/><path d=\"M8 5h3v9h-3v-9z\"/><path d=\"M12 0h3v14h-3v-14z\"/></g>\n<g id=\"barcode\"><path d=\"M0 3h1v10h-1v-10z\"/><path d=\"M8 3h2v10h-2v-10z\"/><path d=\"M11 3h1v10h-1v-10z\"/><path d=\"M13 3h1v10h-1v-10z\"/><path d=\"M15 3h1v10h-1v-10z\"/><path d=\"M2 3h3v10h-3v-10z\"/><path d=\"M6 3h1v10h-1v-10z\"/></g>\n<g id=\"bed\"><path d=\"M4.28 7h2.72l-1.15-1.68c-0.542-0.725-1.36-1.216-2.295-1.319l-0.555-0.001v1.54c-0.011 0.063-0.018 0.136-0.018 0.211 0 0.69 0.56 1.25 1.25 1.25 0.017 0 0.034-0 0.050-0.001z\"/><path d=\"M13 7v-0.28c0-0.003 0-0.007 0-0.010 0-0.934-0.749-1.693-1.678-1.71l-4.692-0c0.5 0.62 1.37 2 1.37 2h5z\"/><path d=\"M15 5.1c-0.552 0-1 0.448-1 1v1.9h-12v-4c0-0.552-0.448-1-1-1s-1 0.448-1 1v9h2v-2h12v2h2v-6.9c0-0.552-0.448-1-1-1z\"/></g>\n<g id=\"bell-o\"><path d=\"M12.7 11.4c-0.5-0.2-0.7-0.7-0.7-1.2v-5.2c0 0 0-2.4-3-2.9v-1.1c0 0 0.1-1-1-1s-1 1-1 1v1.1c-3 0.5-3 2.9-3 2.9v5.2c0 0.5-0.3 1-0.7 1.2l-1.3 0.6v2h4c0 0-0.1 2 2 2s2-2 2-2h4v-2l-1.3-0.6zM13 13h-10v-0.4l0.7-0.4c0.8-0.3 1.3-1.1 1.3-2v-5.2c0-0.1 0-1.6 2.2-1.9l0.8-0.2 0.8 0.1c2 0.4 2.2 1.7 2.2 2v5.2c0 0.9 0.5 1.7 1.3 2.1l0.7 0.4v0.3z\"/></g>\n<g id=\"bell-slash-o\"><path d=\"M15.2 0l-3.6 3.6c-0.4-0.6-1.2-1.3-2.6-1.5v-1.1c0 0 0.1-1-1-1s-1 1-1 1v1.1c-3 0.5-3 2.9-3 2.9v5.2c0 0.5-0.3 1-0.7 1.2l-1.3 0.6v1.3l-2 2v0.7h0.7l15.3-15.4v-0.6h-0.8zM5 10.3c0-0.1 0-0.1 0 0v-5.3c0-0.1 0.1-1.6 2.2-1.9l0.8-0.2 0.8 0.1c1.2 0.2 1.8 0.8 2 1.3l-5.8 6z\"/><path d=\"M12 10.2v-4.6l-1 1v3.5c0 0.9 0.5 1.7 1.3 2.1l0.7 0.4v0.4h-8.3l-1 1h2.4c0 0-0.1 2 2 2s2-2 2-2h3.9v-2l-1.3-0.6c-0.4-0.3-0.7-0.7-0.7-1.2z\"/></g>\n<g id=\"bell-slash\"><path d=\"M15.2 0l-3.6 3.6c-0.5-0.6-1.2-1.3-2.6-1.5v-1.1c0 0 0.1-1-1-1s-1 1-1 1v1.1c-2.8 0.5-3 2.9-3 2.9v5.2c0 0.5-0.3 1-0.7 1.2l-1.3 0.6v1h0.3l-2.3 2.3v0.7h0.7l15.3-15.4v-0.6h-0.8zM6 4.8v4.5l-1 1v-5.3c0 0 0-0.8 0.7-1.4 0.7-0.7 1.3-0.6 1.3-0.6s-1 0.7-1 1.8z\"/><path d=\"M8 16c2.1 0 2-2 2-2h-4c0 0-0.1 2 2 2z\"/><path d=\"M12 10.2v-4.6l-6 6-0.3 0.4-1 1h9.3v-1l-1.3-0.6c-0.4-0.3-0.7-0.7-0.7-1.2z\"/></g>\n<g id=\"bell\"><path d=\"M6 14h4c0 0 0.1 2-2 2s-2-2-2-2z\"/><path d=\"M12.7 11.4c-0.5-0.2-0.7-0.7-0.7-1.2v-5.2c0 0-0.2-2.4-3-2.9v-1.1c0 0 0.1-1-1-1s-1 1-1 1v1.1c-2.8 0.5-3 2.9-3 2.9v5.2c0 0.5-0.3 1-0.7 1.2l-1.3 0.6v1h12v-1l-1.3-0.6zM6 4.8v7.2h-2c0.8 0 1-1 1-1v-6c0 0 0-0.8 0.7-1.4 0.7-0.7 1.3-0.6 1.3-0.6s-1 0.7-1 1.8z\"/></g>\n<g id=\"boat\"><path d=\"M1.5 9.6c1.1 0.7 2.5 1.9 2.5 3.3 0 0.4 0 0.7 0 1.1 0 0 0.1 0 0.1 0s0.9 0 2-1c1 1 2 1 2 1s1 0 2-1c1 1 1.9 1 1.9 1s0.1 0 0.1 0c0-0.3 0-0.7 0-1.1 0-1.4 1.4-2.6 2.5-3.3 0.6-0.4 0.5-1.2-0.2-1.4l-1.4-0.4v-3.8h-1v-1h-3v-2h-2v2h-3v1h-1v3.8l-1.3 0.4c-0.8 0.2-0.8 1-0.2 1.4zM4 5h1v-1h6v1h1v2.5l-3.3-1c-0.5-0.1-1-0.1-1.5 0l-3.2 1v-2.5z\"/><path d=\"M14 14c-1 1-2 1-2 1s-1 0-2-1c-1 1-2 1-2 1s-1 0-2-1c-1 1-2 1-2 1s-1 0-2-1c-1 1-2 1-2 1v1h16v-1c0 0-1 0-2-1z\"/></g>\n<g id=\"bold\"><path d=\"M11 7.5c0 0 2-0.8 2-3.6 0-4.1-5.1-3.9-7-3.9h-4v16h4c3.7 0 8 0 8-4.4 0-3.8-3-4.1-3-4.1zM9 4.4c0 1.8-1.5 1.6-3 1.6v-3c1.8 0 3 0.1 3 1.4zM6 13v-4c1.8 0 4-0.3 4 2.2 0 1.9-2.5 1.8-4 1.8z\"/></g>\n<g id=\"bolt\"><path d=\"M7.99 0l-7.010 9.38 6.020-0.42-4.96 7.040 12.96-10-7.010 0.47 7.010-6.47h-7.010z\"/></g>\n<g id=\"bomb\"><path d=\"M12 1h1v1h-1v-1z\"/><path d=\"M12 5h1v1h-1v-1z\"/><path d=\"M14 3h1v1h-1v-1z\"/><path d=\"M10 3h1v1h-1v-1z\"/><path d=\"M14.6 2.1l0.7-0.7-0.7-0.7-1.4 1.4 0.7 0.7z\"/><path d=\"M13.9 4.2l-0.7 0.7 1.4 1.4 0.7-0.7-0.7-0.7z\"/><path d=\"M11.1 2.8l0.7-0.7-1.4-1.4-0.7 0.7 0.7 0.7z\"/><path d=\"M10.4 6.4l2-2-0.7-0.7-2 2-0.7-0.7-0.7 0.8c-0.8-0.5-1.8-0.8-2.8-0.8-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5c0-1-0.3-1.9-0.7-2.8l0.7-0.7-0.6-0.6zM6 7.2c-2 0-3.4 1.8-3.4 2.8h-1c0-2 2.4-3.8 4.4-3.8v1z\"/></g>\n<g id=\"book-dollar\"><path d=\"M12.9 2.5c-1.6-1.2-1.4-2.5-1.4-2.5h-9.5v12.5c0 1.9 2.1 3.5 4 3.5h8v-13c0 0-0.8-0.2-1.1-0.5zM7 6.3c-0.9-0.3-2.3-0.8-2.3-1.9 0.1-0.8 1.3-1.4 1.3-1.6v-0.8h1v0.7c1 0.1 1.8 0.4 1.9 0.4l-0.3 0.9c0 0-0.7-0.3-1.5-0.3-0.7 0-1.1 0.3-1.2 0.8 0 0.3 0.5 0.6 1.3 0.9 1.5 0.5 1.9 1.1 1.9 1.9 0 0.7-0.1 1.6-2.1 1.8v0.9h-1v-0.8c0-0.1-1.4-0.5-1.5-0.5l0.5-0.9c0 0 1.1 0.5 2 0.4s1.3-0.6 1.3-1c0.1-0.3-0.4-0.6-1.3-0.9zM13 15h-7c-1 0-1.8-0.6-2-1.3-0.1-0.3 0-0.7 0.4-0.7h6.6v-10.3c1 0.6 2 1.1 2 1.3v11z\"/></g>\n<g id=\"book-percent\"><path d=\"M12.6 2.5c-1.6-1.2-1.6-2.5-1.6-2.5h-9v12.5c0 1.9 1.6 3.5 3.5 3.5h8.5v-13c0 0-1-0.2-1.4-0.5zM5.5 3.2c0.8 0 1.5 0.7 1.5 1.6s-0.7 1.4-1.5 1.4-1.5-0.6-1.5-1.4 0.7-1.6 1.5-1.6zM9 3h1l-5 7h-1l5-7zM10 8.5c0 0.8-0.7 1.5-1.5 1.5s-1.5-0.7-1.5-1.5 0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5zM13 15h-7.5c-1 0-1.8-0.6-2-1.3-0.1-0.4 0-0.7 0.4-0.7h7.1v-10.3c0 0.6 1 1.1 2 1.3v11z\"/><path d=\"M9 8.5c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5z\"/><path d=\"M6 4.8c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5z\"/></g>\n<g id=\"book\"><path d=\"M12.6 2.5c-1.6-1.2-1.6-2.5-1.6-2.5h-9v12.5c0 1.9 1.6 3.5 3.5 3.5h8.5v-13c0 0-1-0.2-1.4-0.5zM4 2h5v2h-5v-2zM13 15h-7.5c-1 0-1.8-0.6-2-1.3-0.1-0.4 0-0.7 0.4-0.7h7.1v-10.3c0.4 0.6 1.2 1.1 2 1.3v11z\"/></g>\n<g id=\"bookmark-o\"><path d=\"M3 0v16l5-5 5 5v-16h-10zM12 13.7l-4-3.9-4 3.9v-10.7h8v10.7zM12 2h-8v-1h8v1z\"/></g>\n<g id=\"bookmark\"><path d=\"M3 0v0 1h10l0.1-1z\"/><path d=\"M3 2h10v14l-5-5-5 5z\"/></g>\n<g id=\"briefcase\"><path d=\"M11 3v-2h-6v2h-5v12h16v-12h-5zM10 3h-4v-1h4v1z\"/></g>\n<g id=\"browser\"><path d=\"M15 1v-1h-15v15h1v1h15v-15h-1zM3 1h9v1h-9v-1zM1 1h1v1h-1v-1zM1 3h13v11h-13v-11z\"/></g>\n<g id=\"bug-o\"><path d=\"M13 8v-1c1.216-1.124 1.981-2.721 2-4.497 0-0.28-0.224-0.503-0.5-0.503s-0.5 0.224-0.5 0.5c-0.018 1.112-0.431 2.125-1.105 2.906-0.876 0.978-2.15 1.594-3.569 1.594-0.020 0-0.040-0-0.059-0l-2.537 0c-0.022 0-0.049 0.001-0.075 0.001-1.414 0-2.684-0.612-3.561-1.586-0.669-0.781-1.079-1.793-1.094-2.901-0-0.279-0.224-0.503-0.5-0.503s-0.5 0.224-0.5 0.5c0.022 1.776 0.786 3.368 1.996 4.486l0.004 1.004c-3 0.060-3 1.42-3 3.47 0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5c0-1.72 0-2.4 2-2.47 0.031 1.11 0.245 2.161 0.612 3.136-0.383 0.006-0.696 0.176-0.942 0.414-0.445 0.624-0.711 1.402-0.711 2.242 0 0.2 0.015 0.397 0.044 0.589l-0.003 0.118c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-0.14c-0.022-0.144-0.035-0.311-0.035-0.48 0-0.587 0.154-1.139 0.424-1.616 0.165-0.152 0.401-0.257 0.66-0.264 0.681 1.007 1.714 1.731 2.92 1.994l0.031-0.994h2v1c1.237-0.269 2.271-0.993 2.939-1.983 0.013-0.017 0.016-0.017 0.019-0.017 0.254 0 0.486 0.095 0.663 0.251 0.262 0.462 0.418 1.015 0.418 1.605 0 0.178-0.014 0.352-0.041 0.522l0.002 0.121c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-0.14c0.025-0.165 0.039-0.356 0.039-0.551 0-0.839-0.266-1.616-0.717-2.251-0.238-0.226-0.551-0.396-0.9-0.466 0.336-0.917 0.55-1.975 0.578-3.080 2-0.012 2 0.708 2 2.458 0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5c0-2.030 0-3.39-3-3.47zM6 13.5c-0.44-0.253-0.805-0.589-1.083-0.989l-0.247-0.411-0.15-0.39c-0.302-0.802-0.49-1.73-0.52-2.697l-0-0.013v-1.65c0.578 0.326 1.254 0.556 1.973 0.647l0.027 5.573zM9 13h-2v-1h2v1zM9 11h-2v-1h2v1zM9 9h-2v-1h2v1zM12 9c-0.030 0.98-0.218 1.908-0.54 2.77l-0.13 0.33-0.24 0.4c-0.285 0.411-0.65 0.747-1.074 0.992l-0.016-5.492c0.743-0.081 1.421-0.297 2.029-0.624l-0.029 1.624z\"/><path d=\"M8 6.2c1.433-0.018 2.767-0.429 3.903-1.129 0.046-0.036 0.098-0.126 0.098-0.229 0-0.008-0-0.016-0.001-0.023-0.066-1.142-0.781-2.103-1.781-2.522-0.137-0.050-0.219-0.16-0.219-0.29 0-0.002 0-0.005 0-0.008v-1.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v1.2c0 0.166-0.134 0.3-0.3 0.3 0 0 0 0 0 0h-1.4c-0.166 0-0.3-0.134-0.3-0.3v-1.2c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v1.5c-0.006 0.125-0.086 0.229-0.198 0.269-1.026 0.43-1.744 1.4-1.802 2.544-0.001 0.014-0.001 0.021-0.001 0.029 0 0.102 0.051 0.193 0.13 0.247 0.959 0.703 2.161 1.125 3.462 1.125 0.144 0 0.287-0.005 0.428-0.015zM10 3c0.552 0 1 0.448 1 1s-0.448 1-1 1c-0.552 0-1-0.448-1-1s0.448-1 1-1zM6 3c0.552 0 1 0.448 1 1s-0.448 1-1 1c-0.552 0-1-0.448-1-1s0.448-1 1-1z\"/></g>\n<g id=\"bug\"><path d=\"M8 6.2c1.433-0.018 2.767-0.429 3.903-1.129 0.046-0.036 0.098-0.126 0.098-0.229 0-0.008-0-0.016-0.001-0.023-0.066-1.142-0.781-2.103-1.781-2.522-0.137-0.050-0.219-0.16-0.219-0.29 0-0.002 0-0.005 0-0.008v-1.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v1.2c0 0.166-0.134 0.3-0.3 0.3 0 0 0 0 0 0h-1.4c-0.166 0-0.3-0.134-0.3-0.3v-1.2c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v1.5c-0.006 0.125-0.086 0.229-0.198 0.269-1.026 0.43-1.744 1.4-1.802 2.544-0.001 0.014-0.001 0.021-0.001 0.029 0 0.102 0.051 0.193 0.13 0.247 0.959 0.703 2.161 1.125 3.462 1.125 0.144 0 0.287-0.005 0.428-0.015zM10 3c0.552 0 1 0.448 1 1s-0.448 1-1 1c-0.552 0-1-0.448-1-1s0.448-1 1-1zM6 3c0.552 0 1 0.448 1 1s-0.448 1-1 1c-0.552 0-1-0.448-1-1s0.448-1 1-1z\"/><path d=\"M13 8v-1c1.216-1.124 1.981-2.721 2-4.497 0-0.28-0.224-0.503-0.5-0.503s-0.5 0.224-0.5 0.5c-0.018 1.112-0.431 2.125-1.105 2.906-0.876 0.978-2.15 1.594-3.569 1.594-0.020 0-0.040-0-0.059-0l-2.537 0c-0.022 0-0.049 0.001-0.075 0.001-1.414 0-2.684-0.612-3.561-1.586-0.669-0.781-1.079-1.793-1.094-2.901-0-0.279-0.224-0.503-0.5-0.503s-0.5 0.224-0.5 0.5c0.022 1.776 0.786 3.368 1.996 4.486l0.004 1.004c-3 0.060-3 1.42-3 3.47 0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5c0-1.72 0-2.4 2-2.47 0.031 1.11 0.245 2.161 0.612 3.136-0.383 0.006-0.696 0.176-0.942 0.414-0.445 0.624-0.711 1.402-0.711 2.242 0 0.2 0.015 0.397 0.044 0.589l-0.003 0.118c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-0.14c-0.022-0.144-0.035-0.311-0.035-0.48 0-0.587 0.154-1.139 0.424-1.616 0.165-0.152 0.401-0.257 0.66-0.264 0.588 1.095 1.667 1.859 2.934 1.998l0.017-0.998h2v1c1.284-0.141 2.364-0.905 2.94-1.98 0.012-0.020 0.015-0.020 0.018-0.020 0.254 0 0.486 0.095 0.663 0.251 0.262 0.462 0.418 1.015 0.418 1.605 0 0.178-0.014 0.352-0.041 0.522l0.002 0.121c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-0.14c0.025-0.165 0.039-0.356 0.039-0.551 0-0.839-0.266-1.616-0.717-2.251-0.238-0.226-0.551-0.396-0.9-0.466 0.336-0.917 0.55-1.975 0.578-3.080 2-0.012 2 0.708 2 2.458 0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5c0-2.030 0-3.39-3-3.47zM9 13h-2v-1h2v1zM9 11h-2v-1h2v1zM9 9h-2v-1h2v1z\"/></g>\n<g id=\"building-o\"><path d=\"M2 0v16h12v-16h-12zM13 15h-4v-3h-2v3h-4v-14h10v14z\"/><path d=\"M4 9h2v2h-2v-2z\"/><path d=\"M7 9h2v2h-2v-2z\"/><path d=\"M10 9h2v2h-2v-2z\"/><path d=\"M4 6h2v2h-2v-2z\"/><path d=\"M7 6h2v2h-2v-2z\"/><path d=\"M10 6h2v2h-2v-2z\"/><path d=\"M4 3h2v2h-2v-2z\"/><path d=\"M7 3h2v2h-2v-2z\"/><path d=\"M10 3h2v2h-2v-2z\"/></g>\n<g id=\"building\"><path d=\"M3 0v16h4v-3h2v3h4v-16h-10zM6 12h-2v-2h2v2zM6 9h-2v-2h2v2zM6 6h-2v-2h2v2zM6 3h-2v-2h2v2zM9 12h-2v-2h2v2zM9 9h-2v-2h2v2zM9 6h-2v-2h2v2zM9 3h-2v-2h2v2zM12 12h-2v-2h2v2zM12 9h-2v-2h2v2zM12 6h-2v-2h2v2zM12 3h-2v-2h2v2z\"/></g>\n<g id=\"bullets\"><path d=\"M0 2.5v0c0 0.8 0.7 1.5 1.5 1.5v0c0.8 0 1.5-0.7 1.5-1.5v0c0-0.8-0.7-1.5-1.5-1.5v0c-0.8 0-1.5 0.7-1.5 1.5z\"/><path d=\"M0 7.5v0c0 0.8 0.7 1.5 1.5 1.5v0c0.8 0 1.5-0.7 1.5-1.5v0c0-0.8-0.7-1.5-1.5-1.5v0c-0.8 0-1.5 0.7-1.5 1.5z\"/><path d=\"M0 12.5v0c0 0.8 0.7 1.5 1.5 1.5v0c0.8 0 1.5-0.7 1.5-1.5v0c0-0.8-0.7-1.5-1.5-1.5v0c-0.8 0-1.5 0.7-1.5 1.5z\"/><path d=\"M5 1h11v3h-11v-3z\"/><path d=\"M5 6h11v3h-11v-3z\"/><path d=\"M5 11h11v3h-11v-3z\"/></g>\n<g id=\"bullseye\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8 14.9c-3.8 0-6.9-3.1-6.9-6.9s3.1-6.9 6.9-6.9 6.9 3.1 6.9 6.9-3.1 6.9-6.9 6.9z\"/><path d=\"M8 2.3c-3.2 0-5.7 2.5-5.7 5.7s2.6 5.7 5.7 5.7 5.7-2.6 5.7-5.7-2.5-5.7-5.7-5.7zM8 12.6c-2.5 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6c0 2.5-2.1 4.6-4.6 4.6z\"/><path d=\"M8 4.6c-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4c1.9 0 3.4-1.5 3.4-3.4s-1.5-3.4-3.4-3.4z\"/></g>\n<g id=\"buss\"><path d=\"M14.67 4h-0.67v-2c0-1.105-0.895-2-2-2h-8c-1.105 0-2 0.895-2 2v2h-0.68c-0 0-0 0-0 0-0.177 0-0.32 0.143-0.32 0.32 0 0.004 0 0.007 0 0.011l-0 2.339c-0 0.003-0 0.006-0 0.010 0 0.177 0.143 0.32 0.32 0.32 0 0 0 0 0 0h0.68v6c0 0.55 0 1 1 1v1.5c0 0.276 0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5v-1.5h4v1.5c0 0.276 0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5v-1.5c1 0 1-0.45 1-1v-6h0.67c0.182 0 0.33-0.148 0.33-0.33s-0.148-0.33-0.33-0.33c-0.182 0-0.33 0.148-0.33 0.33s0.148 0.33 0.33 0.33c0.182 0 0.33-0.148 0.33-0.33v-2.34c0-0.182-0.148-0.33-0.33-0.33 0 0 0 0 0 0zM6 1h4v1h-4v-1zM4 12c-0.552 0-1-0.448-1-1s0.448-1 1-1c0.552 0 1 0.448 1 1s-0.448 1-1 1zM3 8v-5h10v5h-10zM12 12c-0.552 0-1-0.448-1-1s0.448-1 1-1c0.552 0 1 0.448 1 1s-0.448 1-1 1z\"/></g>\n<g id=\"button\"><path d=\"M15.7 5.3l-1-1c-0.2-0.2-0.4-0.3-0.7-0.3h-13c-0.6 0-1 0.4-1 1v5c0 0.3 0.1 0.6 0.3 0.7l1 1c0.2 0.2 0.4 0.3 0.7 0.3h13c0.6 0 1-0.4 1-1v-5c0-0.3-0.1-0.5-0.3-0.7zM14 10h-13v-5h13v5z\"/></g>\n<g id=\"calc-book\"><path d=\"M11.9 0c-1.3 0-2 0.4-2.4 0.8-0.4-0.4-1.1-0.8-2.5-0.8-3.4 0-4 2-4 2v0 0 4h-3v10h7v-4.6l1.5-0.2c0 0 0.2-0.3 0.3 0.7h1.3c0.1-1 0.4-0.7 0.4-0.7l5.5 0.7v-9.8c0 0-0.6-2.1-4.1-2.1zM1 7h5v2h-5v-2zM6 10v1h-1v-1h1zM4 10v1h-1v-1h1zM2 15h-1v-1h1v1zM2 13h-1v-1h1v1zM2 11h-1v-1h1v1zM4 15h-1v-1h1v1zM4 13h-1v-1h1v1zM6 15h-1v-1h1v1zM6 13h-1v-1h1v1zM9 9.5c-0.9-0.1-1.3-0.3-2-0.3v-3.2h-3v-3.9c0-0.4 0.8-1.5 3-1.5 1.8 0 1.9 0.8 1.9 1 0 0 0 0 0 0v7.9zM15 9.9c-1-0.4-1.1-0.7-2.5-0.7-0.1 0-0.2 0-0.2 0-1 0-1.3 0.2-2.3 0.4v-7.6c0 0 0-0.1 0-0.1s0-0.1 0-0.1c0-0.2 0.2-1.1 1.9-1.1 2.3 0 3.1 0.9 3.1 1.4v7.8z\"/></g>\n<g id=\"calc\"><path d=\"M9 3h6v2h-6v-2z\"/><path d=\"M9 11h6v2h-6v-2z\"/><path d=\"M5 1h-2v2h-2v2h2v2h2v-2h2v-2h-2z\"/><path d=\"M7 10.4l-1.4-1.4-1.6 1.6-1.6-1.6-1.4 1.4 1.6 1.6-1.6 1.6 1.4 1.4 1.6-1.6 1.6 1.6 1.4-1.4-1.6-1.6z\"/><path d=\"M13 14.5c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M13 9.5c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/></g>\n<g id=\"calendar-briefcase\"><path d=\"M3 0h1v3h-1v-3z\"/><path d=\"M11 0h1v3h-1v-3z\"/><path d=\"M13 1v3h-3v-3h-5v3h-3v-3h-2v14h5v-1h-4v-8h13v3h1v-8z\"/><path d=\"M13 10v-2h-4v2h-3v6h10v-6h-3zM10 9h2v1h-2v-1z\"/></g>\n<g id=\"calendar-clock\"><path d=\"M3 0h1v3h-1v-3z\"/><path d=\"M11 0h1v3h-1v-3z\"/><path d=\"M6.6 14h-5.6v-8h13v0.6c0.4 0.2 0.7 0.4 1 0.7v-6.3h-2v3h-3v-3h-5v3h-3v-3h-2v14h7.3c-0.3-0.3-0.5-0.6-0.7-1z\"/><path d=\"M14 12h-3v-3h1v2h2z\"/><path d=\"M11.5 8c1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5zM11.5 7c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5v0z\"/></g>\n<g id=\"calendar-envelope\"><path d=\"M3 0h1v2h-1v-2z\"/><path d=\"M9 0h1v2h-1v-2z\"/><path d=\"M13 7v-6h-2v2h-3v-2h-3v2h-3v-2h-2v12h4v3h12v-9h-3zM4 12h-3v-7h11v2h-8v5zM5 10.2l2.6 1.5-2.6 2.6v-4.1zM5.7 15l2.8-2.8 1.5 0.9 1.5-0.8 2.8 2.8h-8.6zM15 14.3l-2.6-2.6 2.6-1.4v4zM15 9.2l-5 2.7-5-2.9v-1h10v1.2zM15.4 9.6v0 0 0z\"/></g>\n<g id=\"calendar-o\"><path d=\"M14 1v3h-3v-3h-6v3h-3v-3h-2v15h16v-15h-2zM15 15h-14v-9h14v9z\"/><path d=\"M3 0h1v3h-1v-3z\"/><path d=\"M12 0h1v3h-1v-3z\"/></g>\n<g id=\"calendar-user\"><path d=\"M3 0h1v3h-1v-3z\"/><path d=\"M11 0h1v3h-1v-3z\"/><path d=\"M9 14.1c0-0.1 0-0.1 0 0l-8-0.1v-8h13v1.2c0.4 0.1 0.7 0.3 1 0.6v-6.8h-2v3h-3v-3h-5v3h-3v-3h-2v14h9v-0.9z\"/><path d=\"M15 10c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M13.9 12h-1.8c-1.1 0-2.1 0.9-2.1 2.1v1.9h6v-1.9c0-1.2-0.9-2.1-2.1-2.1z\"/></g>\n<g id=\"calendar\"><path d=\"M14 1v3h-3v-3h-6v3h-3v-3h-2v15h16v-15h-2zM3 15h-2v-2h2v2zM3 12h-2v-2h2v2zM3 9h-2v-2h2v2zM6 15h-2v-2h2v2zM6 12h-2v-2h2v2zM6 9h-2v-2h2v2zM9 15h-2v-2h2v2zM9 12h-2v-2h2v2zM9 9h-2v-2h2v2zM12 15h-2v-2h2v2zM12 12h-2v-2h2v2zM12 9h-2v-2h2v2zM15 15h-2v-2h2v2zM15 12h-2v-2h2v2zM15 9h-2v-2h2v2z\"/><path d=\"M3 0h1v3h-1v-3z\"/><path d=\"M12 0h1v3h-1v-3z\"/></g>\n<g id=\"camera\"><path d=\"M11 9c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z\"/><path d=\"M11 4v-3h-6v3h-5v9h5c0.8 0.6 1.9 1 3 1s2.2-0.4 3-1h5v-9h-5zM6 2h4v2h-4v-2zM8 13c-2.2 0-4-1.8-4-4s1.8-4 4-4c2.2 0 4 1.8 4 4s-1.8 4-4 4zM15 6h-2v-1h2v1z\"/></g>\n<g id=\"car\"><path d=\"M15 6.1l-1.4-2.9c-0.4-0.7-1.1-1.2-1.9-1.2h-7.4c-0.8 0-1.5 0.5-1.9 1.2l-1.4 2.9c-0.6 0.1-1 0.6-1 1.1v3.5c0 0.6 0.4 1.1 1 1.2v2c0 0.6 0.5 1.1 1.1 1.1h0.9c0.5 0 1-0.5 1-1.1v-1.9h8v1.9c0 0.6 0.5 1.1 1.1 1.1h0.9c0.6 0 1.1-0.5 1.1-1.1v-2c0.6-0.1 1-0.6 1-1.2v-3.5c-0.1-0.5-0.5-1-1.1-1.1zM4 8.4c0 0.3-0.3 0.6-0.6 0.6h-1.8c-0.3 0-0.6-0.3-0.6-0.6v-0.8c0-0.3 0.3-0.6 0.6-0.6h1.8c0.3 0 0.6 0.3 0.6 0.6v0.8zM10 11h-4v-1h4v1zM2.1 6l1.2-2.4c0.2-0.4 0.6-0.6 1-0.6h7.4c0.4 0 0.8 0.2 1 0.6l1.2 2.4h-11.8zM15 8.4c0 0.3-0.3 0.6-0.6 0.6h-1.8c-0.3 0-0.6-0.3-0.6-0.6v-0.8c0-0.3 0.3-0.6 0.6-0.6h1.8c0.3 0 0.6 0.3 0.6 0.6v0.8z\"/></g>\n<g id=\"caret-down\"><path d=\"M3 4h10l-5 7z\"/></g>\n<g id=\"caret-left\"><path d=\"M11 3v10l-7-5z\"/></g>\n<g id=\"caret-right\"><path d=\"M5 13v-10l7 5z\"/></g>\n<g id=\"caret-square-down-o\"><path d=\"M15 1h-14v14h14v-14zM14 14h-12v-12h12v12z\"/><path d=\"M4 6h8l-4 5z\"/></g>\n<g id=\"caret-square-left-o\"><path d=\"M15 1h-14v14h14v-14zM14 14h-12v-12h12v12z\"/><path d=\"M10 4v8l-5-4z\"/></g>\n<g id=\"caret-square-right-o\"><path d=\"M15 1h-14v14h14v-14zM14 14h-12v-12h12v12z\"/><path d=\"M5.9 12v-8l5 4z\"/></g>\n<g id=\"caret-square-up-o\"><path d=\"M15 1h-14v14h14v-14zM14 14h-12v-12h12v12z\"/><path d=\"M12 10h-8l4-5z\"/></g>\n<g id=\"caret-up\"><path d=\"M13 12h-10l5-7z\"/></g>\n<g id=\"cart-o\"><path d=\"M14 13.1v-1.1h-9.4l0.6-1.1 9.2-0.9 1.6-6h-12.3l-0.7-3h-3v1h2.2l2.1 8.4-1.3 2.6v1.5c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5-0.7-1.5-1.5-1.5h7.5v1.5c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5c0-0.7-0.4-1.2-1-1.4zM4 5h10.7l-1.1 4-8.4 0.9-1.2-4.9z\"/></g>\n<g id=\"cart\"><path d=\"M14 13.1v-1.1h-9.4l0.6-1.1 9.2-0.9 1.6-6h-12.3l-0.7-3h-3v1h2.2l2.1 8.4-1.3 2.6v1.5c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5-0.7-1.5-1.5-1.5h7.5v1.5c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5c0-0.7-0.4-1.2-1-1.4z\"/></g>\n<g id=\"cash\"><path d=\"M16 14h-14v-1h13v-7h1v8z\"/><path d=\"M13 4v7h-12v-7h12zM14 3h-14v9h14v-9z\"/><path d=\"M3 6h-1v3h1v1h4c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5h-4v1z\"/><path d=\"M11 6v-1h-4c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5h4v-1h1v-3h-1z\"/></g>\n<g id=\"chart-3d\"><path d=\"M12 4v-2l-4-2-4 2v1l-4 2v5l12 6 4-2v-8zM4 10.88l-3-1.5v-3.3l3 1.53v3.27zM4 6.49l-2.34-1.2 2.34-1.17v2.37zM8 12.88l-3-1.5v-8.31l3 1.54v8.27zM5.66 2.29l2.34-1.17 2.34 1.17-2.34 1.2zM12 14.88l-3-1.5v-6.31l3 1.54v6.27zM12 7.49l-2.34-1.2 2.34-1.17 2.34 1.17z\"/></g>\n<g id=\"chart-grid\"><path d=\"M0 9v7h16v-7h-16zM5 15h-4v-1h4v1zM5 13h-4v-1h4v1zM5 11h-4v-1h4v1zM10 15h-4v-1h4v1zM10 13h-4v-1h4v1zM10 11h-4v-1h4v1zM15 15h-4v-1h4v1zM15 13h-4v-1h4v1zM15 11h-4v-1h4v1z\"/><path d=\"M16 8h-16v-8h1v7h15v1z\"/><path d=\"M15 1.57l-5.020 2.86-3.96-1.98-4.020 1.61v1.080l3.98-1.59 4.040 2.020 4.98-2.85v-1.15z\"/></g>\n<g id=\"chart-line\"><path d=\"M0 16h16v-16h-1v2.6l-4 3.4v-6h-1v6.4l-4-0.9v-5.5h-1v5.7l-4 2.9v-8.6h-1zM5 14h-4v-1.7l4-2.9v4.6zM10 14h-4v-5.3l0.1-0.1 3.9 0.9v4.5zM15 14h-4v-4.3h0.1l3.9-3.2v7.5z\"/></g>\n<g id=\"chart-timeline\"><path d=\"M16 13v-1h-15v-12h-1v13h5v2h-5v1h16v-1h-5v-2h5z\"/><path d=\"M9 7l-3-3-4 4v3h14v-11l-7 7z\"/></g>\n<g id=\"chart\"><path d=\"M0 15h16v1h-16v-1z\"/><path d=\"M0 0h1v16h-1v-16z\"/><path d=\"M9 8l-2.9-3-4.1 4v5h14v-13.1z\"/></g>\n<g id=\"chat\"><path d=\"M14 14.2c0 0 0 0 0 0 0-0.6 2-1.8 2-3.1 0-1.5-1.4-2.7-3.1-3.2 0.7-0.8 1.1-1.7 1.1-2.8 0-2.8-2.9-5.1-6.6-5.1-3.5 0-7.4 2.1-7.4 5.1 0 2.1 1.6 3.6 2.3 4.2-0.1 1.2-0.6 1.7-0.6 1.7l-1.2 1h1.5c1.6 0 2.9-0.5 3.7-1.1 0 0.1 0 0.1 0 0.2 0 2 2.2 3.6 5 3.6 0.2 0 0.4 0 0.6 0 0.4 0.5 1.7 1.4 3.4 1.4 0.1-0.1-0.7-0.5-0.7-1.9zM7.4 1c3.1 0 5.6 1.9 5.6 4.1s-2.6 4.1-5.8 4.1c-0.2 0-0.6 0-0.8 0h-0.3l-0.1 0.2c-0.3 0.4-1.5 1.2-3.1 1.5 0.1-0.4 0.1-1 0.1-1.8v-0.3c-1-0.8-2.1-2.2-2.1-3.6 0-2.2 3.2-4.2 6.5-4.2z\"/></g>\n<g id=\"check-circle-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M7.1 11.7l-4.2-4.1 1.4-1.4 2.8 2.7 4.9-4.9 1.4 1.4z\"/></g>\n<g id=\"check-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7.1 11.7l-4.2-4.1 1.4-1.4 2.7 2.7 5-4.9 1.4 1.4-6.3 6.3z\"/></g>\n<g id=\"check-square-o\"><path d=\"M14 6.2v7.8h-12v-12h10.5l1-1h-12.5v14h14v-9.8z\"/><path d=\"M7.9 10.9l-4.2-4.2 1.5-1.4 2.7 2.8 6.7-6.7 1.4 1.4z\"/></g>\n<g id=\"check-square\"><path d=\"M13 0.9l-1 1.1h-12v14h14v-10.5l1.7-2-2.7-2.6zM6.5 11.7l-4.2-4.2 1.4-1.4 2.7 2.7 6.6-6.6 1.4 1.4-7.9 8.1z\"/></g>\n<g id=\"check\"><path d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"/></g>\n<g id=\"chevron-circle-down-o\"><path d=\"M13 6.6l-5 5-5-5 1.4-1.4 3.6 3.6 3.6-3.6z\"/><path d=\"M1 8c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7-7-3.1-7-7zM0 8c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8-8 3.6-8 8v0z\"/></g>\n<g id=\"chevron-circle-down\"><path d=\"M0 8c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8-8 3.6-8 8zM11.6 5.2l1.4 1.4-5 5-5-5 1.4-1.4 3.6 3.6 3.6-3.6z\"/></g>\n<g id=\"chevron-circle-left-o\"><path d=\"M9.4 13l-5-5 5-5 1.4 1.4-3.6 3.6 3.6 3.6z\"/><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/></g>\n<g id=\"chevron-circle-left\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM10.8 11.6l-1.4 1.4-5-5 5-5 1.4 1.4-3.6 3.6 3.6 3.6z\"/></g>\n<g id=\"chevron-circle-right-o\"><path d=\"M6.6 13l5-5-5-5-1.4 1.4 3.6 3.6-3.6 3.6z\"/><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/></g>\n<g id=\"chevron-circle-right\"><path d=\"M8 16c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zM5.2 4.4l1.4-1.4 5 5-5 5-1.4-1.4 3.6-3.6-3.6-3.6z\"/></g>\n<g id=\"chevron-circle-up-o\"><path d=\"M3 9.4l5-5 5 5-1.4 1.4-3.6-3.6-3.6 3.6z\"/><path d=\"M15 8c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 7 3.1 7 7zM16 8c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8v0z\"/></g>\n<g id=\"chevron-circle-up\"><path d=\"M16 8c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zM4.4 10.8l-1.4-1.4 5-5 5 5-1.4 1.4-3.6-3.6-3.6 3.6z\"/></g>\n<g id=\"chevron-down-small\"><path d=\"M8 12l-6.32-6.32 1.67-1.68 4.65 4.65 4.65-4.65 1.67 1.68-6.32 6.32z\"/></g>\n<g id=\"chevron-down\"><path d=\"M8 13.1l-8-8 2.1-2.2 5.9 5.9 5.9-5.9 2.1 2.2z\"/></g>\n<g id=\"chevron-left-small\"><path d=\"M4 8l6.32-6.32 1.68 1.67-4.65 4.65 4.65 4.65-1.68 1.67-6.32-6.32z\"/></g>\n<g id=\"chevron-left\"><path d=\"M2.9 8l8-8 2.2 2.1-5.9 5.9 5.9 5.9-2.2 2.1z\"/></g>\n<g id=\"chevron-right-small\"><path d=\"M12 8l-6.32-6.32-1.68 1.67 4.65 4.65-4.65 4.65 1.68 1.67 6.32-6.32z\"/></g>\n<g id=\"chevron-right\"><path d=\"M13.1 8l-8 8-2.2-2.1 5.9-5.9-5.9-5.9 2.2-2.1z\"/></g>\n<g id=\"chevron-up-small\"><path d=\"M8 4l-6.32 6.32 1.67 1.68 4.65-4.65 4.65 4.65 1.67-1.68-6.32-6.32z\"/></g>\n<g id=\"chevron-up\"><path d=\"M8 2.9l8 8-2.1 2.2-5.9-5.9-5.9 5.9-2.1-2.2z\"/></g>\n<g id=\"child\"><path d=\"M10 5c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M12.79 10.32l-2.6-2.63c-0.421-0.426-1.004-0.69-1.65-0.69h-1.070c-0 0-0 0-0.001 0-0.648 0-1.235 0.264-1.659 0.69l-2.6 2.63c-0.216 0.129-0.358 0.362-0.358 0.628 0 0.403 0.327 0.73 0.73 0.73 0.266 0 0.499-0.142 0.626-0.355l1.792-1.793v6.47h1.5v-4h1v4h1.5v-6.47l1.75 1.8c0.135 0.175 0.344 0.287 0.58 0.287 0.403 0 0.73-0.327 0.73-0.73 0-0.228-0.105-0.432-0.269-0.566z\"/></g>\n<g id=\"circle-thin\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/></g>\n<g id=\"circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z\"/></g>\n<g id=\"clipboard-check\"><path d=\"M11 1v-1h-6v1h-2v1h-1v14h12v-1h1v-14h-4zM6 1h4v2h-4v-2zM13 15h-10v-12h2v1h6v-1h2v12z\"/><path d=\"M7.39 12.47l-3-2.73 1.35-1.48 1.58 1.44 2.87-2.9 1.42 1.4-4.22 4.27z\"/></g>\n<g id=\"clipboard-cross\"><path d=\"M11 1v-1h-6v1h-2v1h-1v14h12v-1h1v-14h-4zM6 1h4v2h-4v-2zM13 15h-10v-12h2v1h6v-1h2v12z\"/><path d=\"M11 8h-2v-2h-2v2h-2v2h2v2h2v-2h2z\"/></g>\n<g id=\"clipboard-heart\"><path d=\"M9.5 7c0 0 0 0 0 0-0.6 0-1.1 0.6-1.5 1-0.4-0.4-0.9-1-1.5-1 0 0 0 0 0 0-1.5 0-2.1 1.9-1 2.9l2.5 2.1 2.5-2.1c1.1-1 0.5-2.9-1-2.9z\"/><path d=\"M11 1v-1h-6v1h-2v1h-1v14h12v-1h1v-14h-4zM6 1h4v2h-4v-2zM13 15h-10v-12h2v1h6v-1h2v12z\"/></g>\n<g id=\"clipboard-pulse\"><path d=\"M11 1v-1h-6v1h-2v1h-1v14h12v-1h1v-14h-4zM6 1h4v2h-4v-2zM13 15h-10v-12h2v1h6v-1h2v12z\"/><path d=\"M9.3 13c0 0 0 0 0 0-0.2 0-0.3-0.1-0.4-0.3l-0.8-4.8-0.7 3.1c0 0.1-0.1 0.2-0.3 0.3-0.1 0-0.3 0-0.4-0.1l-1-1.3h-1.3c-0.2 0-0.4-0.2-0.4-0.4s0.2-0.4 0.4-0.4h1.6c0.1 0 0.2 0.1 0.3 0.1l0.6 0.8 0.9-4.3c0-0.2 0.2-0.3 0.4-0.3 0 0 0 0 0 0 0.2 0 0.3 0.2 0.3 0.4l0.9 5.3 0.6-1.7c0.1-0.1 0.2-0.2 0.3-0.2h1.3c0.2 0 0.4 0.2 0.4 0.4s-0.2 0.4-0.4 0.4h-1l-1 2.9c0 0-0.2 0.1-0.3 0.1z\"/></g>\n<g id=\"clipboard-text\"><path d=\"M4 6h8v1h-8v-1z\"/><path d=\"M4 8h8v1h-8v-1z\"/><path d=\"M4 10h5v1h-5v-1z\"/><path d=\"M11 1v-1h-6v1h-2v1h-1v14h12v-1h1v-14h-4zM6 1h4v2h-4v-2zM13 15h-10v-12h2v1h6v-1h2v12z\"/></g>\n<g id=\"clipboard-user\"><path d=\"M11 1v-1h-6v1h-2v1h-1v14h12v-1h1v-14h-4zM6 1h4v2h-4v-2zM13 15h-10v-12h2v1h6v-1h2v12z\"/><path d=\"M8 6c-2.5 0-1.3 3.2-1.3 3.2 0.3 0.4 0.7 0.4 0.7 0.6 0 0.3-0.3 0.3-0.6 0.4-0.5 0.1-0.9-0.1-1.4 0.8-0.3 0.4-0.4 2-0.4 2h6c0 0-0.1-1.6-0.4-2-0.4-0.8-0.9-0.7-1.4-0.8-0.3 0-0.6-0.1-0.6-0.4s0.3-0.2 0.6-0.6c0.1 0 1.3-3.2-1.2-3.2z\"/></g>\n<g id=\"clipboard\"><path d=\"M11 1v-1h-6v1h-2v1h-1v14h12v-1h1v-14h-4zM6 1h4v2h-4v-2zM13 15h-10v-12h2v1h6v-1h2v12z\"/></g>\n<g id=\"clock\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z\"/><path d=\"M8 3h-1v6h5v-1h-4z\"/></g>\n<g id=\"close-big\"><path d=\"M16 0l-1 0.010-7 6.99-7-6.99-1-0.010v1l7 7-7 7v1h1l7-7 7 7h1v-1l-7-7 7-7v-1z\"/></g>\n<g id=\"close-circle-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M12.2 10.8l-2.8-2.8 2.8-2.8-1.4-1.4-2.8 2.8-2.8-2.8-1.4 1.4 2.8 2.8-2.8 2.8 1.4 1.4 2.8-2.8 2.8 2.8z\"/></g>\n<g id=\"close-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM12.2 10.8l-1.4 1.4-2.8-2.8-2.8 2.8-1.4-1.4 2.8-2.8-2.8-2.8 1.4-1.4 2.8 2.8 2.8-2.8 1.4 1.4-2.8 2.8 2.8 2.8z\"/></g>\n<g id=\"close-small\"><path d=\"M12.96 4.46l-1.42-1.42-3.54 3.55-3.54-3.55-1.42 1.42 3.55 3.54-3.55 3.54 1.42 1.42 3.54-3.55 3.54 3.55 1.42-1.42-3.55-3.54 3.55-3.54z\"/></g>\n<g id=\"close\"><path d=\"M15.1 3.1l-2.2-2.2-4.9 5-4.9-5-2.2 2.2 5 4.9-5 4.9 2.2 2.2 4.9-5 4.9 5 2.2-2.2-5-4.9z\"/></g>\n<g id=\"cloud-download-o\"><path d=\"M14.1 9.8c0-0.2 0-0.4 0-0.6 0-2.4-1.9-4.3-4.2-4.3-0.3 0.1-0.6 0.1-0.9 0.1v-3h-2v2.4c-0.4-0.3-0.9-0.4-1.3-0.4-1.6 0-2.9 1.3-2.9 2.9 0 0.3 0.1 0.6 0.2 0.9-1.6 0.2-3 1.8-3 3.6 0 1.9 1.5 3.6 3.3 3.6h10.3c1.4 0 2.4-1.5 2.4-2.7s-0.8-2.3-1.9-2.5zM13.6 14h-10.3c-1.2 0-2.3-1.3-2.3-2.6s1.1-2.6 2.3-2.6c0.1 0 0.3 0 0.4 0l1.4 0.2-0.9-1c-0.2-0.3-0.4-0.7-0.4-1.2 0-1 0.8-1.8 1.8-1.8 0.5 0 1 0.2 1.3 0.6v2.4h-1.9l3 4 3-4h-2v-1.9c0.3-0.1 0.6-0.1 0.9-0.1 1.8 0 3.2 1.5 3.2 3.3 0 0.3 0 0.6-0.1 0.9l-0.2 0.6 0.8 0.1c0.7 0 1.4 0.7 1.4 1.5 0 0.7-0.6 1.6-1.4 1.6z\"/></g>\n<g id=\"cloud-download\"><path d=\"M14 10c0 0-0.1 0-0.1 0 0-0.3 0.1-0.6 0.1-1 0-2.2-1.8-4-4-4v-4h-4v3.1c-0.2-0.1-0.3-0.1-0.5-0.1-1.4 0-2.5 1.1-2.5 2.5 0 0.6 0.2 1.1 0.6 1.6-0.2-0.1-0.4-0.1-0.6-0.1-1.7 0-3 1.3-3 3s1.3 3 3 3h11c1.1 0 2-0.9 2-2s-0.9-2-2-2zM8 11.4l-2.9-3.4h1.9v-6h2v6h1.9l-2.9 3.4z\"/></g>\n<g id=\"cloud-o\"><path d=\"M14.1 8.9c0-0.2 0-0.4 0-0.6 0-2.4-1.9-4.3-4.2-4.3-0.6 0-1.2 0.1-1.8 0.4-0.5-0.7-1.5-1.2-2.4-1.2-1.6 0-2.9 1.2-2.9 2.8 0 0.3 0.1 0.6 0.2 0.9-1.6 0.2-3 1.8-3 3.5 0 1.9 1.5 3.6 3.3 3.6h10.3c1.4 0 2.4-1.4 2.4-2.6s-0.8-2.2-1.9-2.5zM13.6 13h-10.3c-1.2 0-2.3-1.2-2.3-2.5s1.1-2.5 2.3-2.5c0.1 0 0.3 0 0.4 0l1.3 0.3-0.8-1.2c-0.2-0.3-0.4-0.7-0.4-1.1 0-1 0.8-1.8 1.8-1.8 0.8 0 1.5 0.5 1.7 1.2l0.3 0.6 0.5-0.3c0.5-0.3 1.1-0.5 1.8-0.5 1.8 0 3.2 1.5 3.2 3.3 0 0.3 0 0.6-0.1 0.9l-0.2 0.6h0.8c0.7 0 1.4 0.7 1.4 1.5 0 0.6-0.6 1.5-1.4 1.5z\"/></g>\n<g id=\"cloud-upload-o\"><path d=\"M14.1 10.9c0-0.2 0-0.4 0-0.6 0-2.4-1.9-4.3-4.2-4.3-0.3 0-0.6 0-0.9 0.1v-2.1h2l-3-4-3 4h2v1.5c-0.4-0.2-0.9-0.3-1.3-0.3-1.6 0-2.9 1.2-2.9 2.8 0 0.3 0.1 0.6 0.2 0.9-1.6 0.2-3 1.8-3 3.5 0 1.9 1.5 3.6 3.3 3.6h10.3c1.4 0 2.4-1.4 2.4-2.6s-0.8-2.2-1.9-2.5zM13.6 15h-10.3c-1.2 0-2.3-1.2-2.3-2.5s1.1-2.5 2.3-2.5c0.1 0 0.3 0 0.4 0l1.3 0.3-0.8-1.2c-0.2-0.3-0.4-0.7-0.4-1.1 0-1 0.8-1.8 1.8-1.8 0.5 0 1 0.2 1.3 0.6v3.2h2v-2.8c0.3-0.1 0.6-0.1 0.9-0.1 1.8 0 3.2 1.5 3.2 3.3 0 0.3 0 0.6-0.1 0.9l-0.2 0.6h0.8c0.7 0 1.4 0.7 1.4 1.5 0.1 0.7-0.5 1.6-1.3 1.6z\"/></g>\n<g id=\"cloud-upload\"><path d=\"M14 10c0 0-0.1 0-0.1 0 0-0.3 0.1-0.6 0.1-1 0-1.6-1-3-2.4-3.6l-3.6-4.4-2.5 3c-1.4 0-2.5 1.1-2.5 2.5 0 0.6 0.2 1.1 0.6 1.6-0.2-0.1-0.4-0.1-0.6-0.1-1.7 0-3 1.3-3 3s1.3 3 3 3h11c1.1 0 2-0.9 2-2s-0.9-2-2-2zM9 6v6h-2v-6h-1.9l2.9-3.4 2.9 3.4h-1.9z\"/></g>\n<g id=\"cloud\"><path d=\"M14 13c1.1 0 2-0.9 2-2s-0.9-2-2-2c0 0-0.1 0-0.1 0 0-0.3 0.1-0.6 0.1-1 0-2.2-1.8-4-4-4-0.8 0-1.5 0.2-2.2 0.6-0.3-0.9-1.2-1.6-2.3-1.6-1.4 0-2.5 1.1-2.5 2.5 0 0.6 0.2 1.1 0.6 1.6-0.2-0.1-0.4-0.1-0.6-0.1-1.7 0-3 1.3-3 3s1.3 3 3 3h11z\"/></g>\n<g id=\"cluster\"><path d=\"M14 12c-0.372 0.011-0.716 0.121-1.008 0.305l-2.212-2.155c0.434-0.547 0.708-1.239 0.74-1.993l1.57-0.157c0.225 0.556 0.76 0.941 1.385 0.941 0.823 0 1.49-0.667 1.49-1.49s-0.667-1.49-1.49-1.49c-0.749 0-1.368 0.552-1.474 1.271l-1.591 0.128c-0.224-1.136-0.973-2.060-1.978-2.521l0.308-0.839h0.26c1.099-0.008 1.986-0.9 1.986-2 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.742 0.404 1.39 1.004 1.735l-0.27 0.855c-0.227-0.054-0.487-0.084-0.754-0.084-0.83 0-1.59 0.296-2.181 0.789l-2.994-3.004c0.141-0.224 0.225-0.497 0.225-0.79 0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5c0 0.823 0.663 1.492 1.484 1.5 0.281-0.001 0.544-0.079 0.767-0.214l2.993 3.004c-0.474 0.588-0.76 1.344-0.76 2.168 0 0.015 0 0.030 0 0.045-0 0.058-0 0.108-0 0.158l-0.66 0.11c-0.313-0.72-1.019-1.214-1.839-1.214-1.105 0-2 0.895-2 2s0.895 2 2 2c1.105 0 2-0.895 2-2 0-0.020-0-0.039-0.001-0.059l0.63-0.097c0.242 0.843 0.768 1.538 1.466 1.992l-0.556 1.188c-0.161-0.049-0.347-0.078-0.539-0.080-0.006-0-0.012-0-0.017-0-1.105 0-2 0.895-2 2s0.895 2 2 2c1.105 0 2-0.895 2-2 0-0.64-0.301-1.211-0.769-1.577l0.566-1.153c0.364 0.146 0.787 0.231 1.229 0.231 0.847 0 1.621-0.311 2.216-0.824l2.176 2.124c-0.25 0.33-0.4 0.748-0.4 1.2 0 1.105 0.895 2 2 2s2-0.895 2-2c0-1.105-0.895-2-2-2 0 0 0 0 0 0zM5 15c-0.552 0-1-0.448-1-1s0.448-1 1-1c0.552 0 1 0.448 1 1s-0.448 1-1 1zM8 10.5c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5z\"/></g>\n<g id=\"code\"><path d=\"M5.2 14l4.5-12h1.1l-4.5 12z\"/><path d=\"M11.1 13h1.2l3.7-5-3.7-5h-1.3l3.8 5z\"/><path d=\"M4.9 13h-1.2l-3.7-5 3.7-5h1.3l-3.8 5z\"/></g>\n<g id=\"coffee\"><path d=\"M14 13l-4 1h-6l-4-1v-1h14z\"/><path d=\"M14.7 3h-1.7v-1h-12v5c0 1.5 0.8 2.8 2 3.4v0.6h8v-0.6c0.9-0.5 1.6-1.4 1.9-2.4 0 0 0.1 0 0.1 0 2.3 0 2.9-2 3-3.5 0.1-0.8-0.5-1.5-1.3-1.5zM13 7v-3h1.7c0.1 0 0.2 0.1 0.2 0.1s0.1 0.1 0.1 0.3c-0.2 2.6-1.6 2.6-2 2.6z\"/></g>\n<g id=\"cog-o\"><path d=\"M15.2 6l-1.1-0.2c-0.1-0.2-0.1-0.4-0.2-0.6l0.6-0.9 0.5-0.7-2.6-2.6-0.7 0.5-0.9 0.6c-0.2-0.1-0.4-0.1-0.6-0.2l-0.2-1.1-0.2-0.8h-3.6l-0.2 0.8-0.2 1.1c-0.2 0.1-0.4 0.1-0.6 0.2l-0.9-0.6-0.7-0.4-2.5 2.5 0.5 0.7 0.6 0.9c-0.2 0.2-0.2 0.4-0.3 0.6l-1.1 0.2-0.8 0.2v3.6l0.8 0.2 1.1 0.2c0.1 0.2 0.1 0.4 0.2 0.6l-0.6 0.9-0.5 0.7 2.6 2.6 0.7-0.5 0.9-0.6c0.2 0.1 0.4 0.1 0.6 0.2l0.2 1.1 0.2 0.8h3.6l0.2-0.8 0.2-1.1c0.2-0.1 0.4-0.1 0.6-0.2l0.9 0.6 0.7 0.5 2.6-2.6-0.5-0.7-0.6-0.9c0.1-0.2 0.2-0.4 0.2-0.6l1.1-0.2 0.8-0.2v-3.6l-0.8-0.2zM15 9l-1.7 0.3c-0.1 0.5-0.3 1-0.6 1.5l0.9 1.4-1.4 1.4-1.4-0.9c-0.5 0.3-1 0.5-1.5 0.6l-0.3 1.7h-2l-0.3-1.7c-0.5-0.1-1-0.3-1.5-0.6l-1.4 0.9-1.4-1.4 0.9-1.4c-0.3-0.5-0.5-1-0.6-1.5l-1.7-0.3v-2l1.7-0.3c0.1-0.5 0.3-1 0.6-1.5l-1-1.4 1.4-1.4 1.4 0.9c0.5-0.3 1-0.5 1.5-0.6l0.4-1.7h2l0.3 1.7c0.5 0.1 1 0.3 1.5 0.6l1.4-0.9 1.4 1.4-0.9 1.4c0.3 0.5 0.5 1 0.6 1.5l1.7 0.3v2z\"/><path d=\"M8 4.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5zM8 10.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5z\"/></g>\n<g id=\"cog\"><path d=\"M16 9v-2l-1.7-0.6c-0.2-0.6-0.4-1.2-0.7-1.8l0.8-1.6-1.4-1.4-1.6 0.8c-0.5-0.3-1.1-0.6-1.8-0.7l-0.6-1.7h-2l-0.6 1.7c-0.6 0.2-1.2 0.4-1.7 0.7l-1.6-0.8-1.5 1.5 0.8 1.6c-0.3 0.5-0.5 1.1-0.7 1.7l-1.7 0.6v2l1.7 0.6c0.2 0.6 0.4 1.2 0.7 1.8l-0.8 1.6 1.4 1.4 1.6-0.8c0.5 0.3 1.1 0.6 1.8 0.7l0.6 1.7h2l0.6-1.7c0.6-0.2 1.2-0.4 1.8-0.7l1.6 0.8 1.4-1.4-0.8-1.6c0.3-0.5 0.6-1.1 0.7-1.8l1.7-0.6zM8 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z\"/><path d=\"M10.6 7.9c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5z\"/></g>\n<g id=\"cogs\"><path d=\"M12 7v-2l-1.2-0.4c-0.1-0.3-0.2-0.7-0.4-1l0.6-1.2-1.5-1.3-1.1 0.5c-0.3-0.2-0.6-0.3-1-0.4l-0.4-1.2h-2l-0.4 1.2c-0.3 0.1-0.7 0.2-1 0.4l-1.1-0.5-1.4 1.4 0.6 1.2c-0.2 0.3-0.3 0.6-0.4 1l-1.3 0.3v2l1.2 0.4c0.1 0.3 0.2 0.7 0.4 1l-0.5 1.1 1.4 1.4 1.2-0.6c0.3 0.2 0.6 0.3 1 0.4l0.3 1.3h2l0.4-1.2c0.3-0.1 0.7-0.2 1-0.4l1.2 0.6 1.4-1.4-0.6-1.2c0.2-0.3 0.3-0.6 0.4-1l1.2-0.4zM3 6c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.7-1.3 3-3 3s-3-1.3-3-3z\"/><path d=\"M7.5 6c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z\"/><path d=\"M16 3v-1h-0.6c0-0.2-0.1-0.4-0.2-0.5l0.4-0.4-0.7-0.7-0.4 0.4c-0.2-0.1-0.3-0.2-0.5-0.2v-0.6h-1v0.6c-0.2 0-0.4 0.1-0.5 0.2l-0.4-0.4-0.7 0.7 0.4 0.4c-0.1 0.2-0.2 0.3-0.2 0.5h-0.6v1h0.6c0 0.2 0.1 0.4 0.2 0.5l-0.4 0.4 0.7 0.7 0.4-0.4c0.2 0.1 0.3 0.2 0.5 0.2v0.6h1v-0.6c0.2 0 0.4-0.1 0.5-0.2l0.4 0.4 0.7-0.7-0.4-0.4c0.1-0.2 0.2-0.3 0.2-0.5h0.6zM13.5 3.5c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1z\"/><path d=\"M15.4 11.8c-0.1-0.3-0.2-0.6-0.4-0.9l0.3-0.6-0.7-0.7-0.5 0.4c-0.3-0.2-0.6-0.3-0.9-0.4l-0.2-0.6h-1l-0.2 0.6c-0.3 0.1-0.6 0.2-0.9 0.4l-0.6-0.3-0.7 0.7 0.3 0.6c-0.2 0.3-0.3 0.6-0.4 0.9l-0.5 0.1v1l0.6 0.2c0.1 0.3 0.2 0.6 0.4 0.9l-0.3 0.6 0.7 0.7 0.6-0.3c0.3 0.2 0.6 0.3 0.9 0.4l0.1 0.5h1l0.2-0.6c0.3-0.1 0.6-0.2 0.9-0.4l0.6 0.3 0.7-0.7-0.4-0.5c0.2-0.3 0.3-0.6 0.4-0.9l0.6-0.2v-1l-0.6-0.2zM12.5 14c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5z\"/></g>\n<g id=\"coin-piles\"><path d=\"M10.5 0c-3.040 0-5.5 0.88-5.5 2 0 0 0 0 0 0v2c-3 0.1-5 0.94-5 2 0 0 0 0 0 0v2s0 0 0 0v2s0 0 0 0v2c0 1.090 2.46 2 5.5 2 0.020 0 0.043 0 0.067 0 0.732 0 1.45-0.055 2.153-0.16 0.698 1.305 2.094 2.158 3.69 2.158 2.017 0 3.715-1.363 4.224-3.217 0.209-0.199 0.344-0.442 0.367-0.717l0-2.064v-8c0-1.12-2.46-2-5.5-2zM5.5 5c2.5 0 4.5 0.45 4.5 1s-2 1-4.5 1-4.5-0.45-4.5-1 2-1 4.5-1zM5.5 13c-2.71 0-4.25-0.71-4.5-1v-0.8c1.199 0.512 2.595 0.809 4.060 0.809 0.155 0 0.309-0.003 0.462-0.010 0.508-0.001 1.030-0.030 1.544-0.085-0.043 0.371 0.022 0.712 0.123 1.037-0.452 0.021-0.967 0.051-1.488 0.051-0.070 0-0.141-0.001-0.211-0.002zM7.070 10.91c-0.467 0.057-1.008 0.090-1.556 0.090-0.005 0-0.010 0-0.014 0-2.709 0-4.249-0.71-4.499-1v-0.84c1.223 0.535 2.649 0.846 4.147 0.846 0.124 0 0.248-0.002 0.371-0.006 0.632-0.001 1.271-0.044 1.897-0.128-0.197 0.306-0.291 0.654-0.342 1.015zM5.5 9c-2.71 0-4.25-0.71-4.5-1v-0.9c1.223 0.535 2.649 0.846 4.147 0.846 0.124 0 0.248-0.002 0.371-0.006 0.088 0.004 0.212 0.006 0.337 0.006 1.498 0 2.923-0.311 4.214-0.872l-0.068 0.366c-0.777 0.265-1.432 0.717-1.935 1.304-0.752 0.165-1.611 0.256-2.491 0.256-0.026 0-0.052-0-0.077-0zM11.41 15c-1.883 0-3.41-1.527-3.41-3.41s1.527-3.41 3.41-3.41c1.883 0 3.41 1.527 3.41 3.41s-1.527 3.41-3.41 3.41zM15 8c-0.175 0.167-0.385 0.3-0.617 0.386-0.288-0.244-0.6-0.46-0.938-0.634 0.575-0.153 1.101-0.352 1.593-0.61l-0.038 0.858zM15 6c-0.24 0.31-1.61 0.94-4 1v-1c0.003 0 0.007 0 0.011 0 1.443 0 2.814-0.305 4.053-0.855l-0.064 0.855zM15 4c-0.25 0.33-1.79 1-4.5 1h-0.23c-1.213-0.63-2.648-1-4.169-1-0.014 0-0.029 0-0.043 0l-0.058-0v-0.9c1.223 0.535 2.649 0.846 4.147 0.846 0.124 0 0.248-0.002 0.371-0.006 0.088 0.004 0.212 0.006 0.337 0.006 1.498 0 2.923-0.311 4.214-0.872l-0.068 0.926zM10.5 3c-2.5 0-4.5-0.45-4.5-1s2-1 4.5-1 4.5 0.45 4.5 1-2 1-4.5 1z\"/><path d=\"M10.5 11h0.5v3h1v-5h-0.5l-1 2z\"/></g>\n<g id=\"coins\"><path d=\"M11.5 0c-2.485 0-4.5 2.015-4.5 4.5 0.004 0.261 0.029 0.513 0.074 0.758-0.479-0.176-1.025-0.261-1.591-0.261-3.043 0-5.51 2.467-5.51 5.51s2.467 5.51 5.51 5.51c3.043 0 5.51-2.467 5.51-5.51 0-0.566-0.085-1.112-0.244-1.626 0.23 0.077 0.484 0.099 0.742 0.099 2.48 0 4.49-2.010 4.49-4.49 0-2.477-2.005-4.485-4.481-4.49zM10 10.5c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5c0-2.485 2.015-4.5 4.5-4.5 2.483 0.006 4.494 2.017 4.5 4.499zM12.5 7h-2v-0.5h0.5v-3h-0.5l1-1.5h0.5v4.5h0.5v0.5z\"/><path d=\"M5.63 8c0.033-0.003 0.072-0.005 0.111-0.005 0.696 0 1.26 0.564 1.26 1.26 0 0.016-0 0.031-0.001 0.047 0 1.698-1.86 2.698-1.86 2.698h1.37v-0.5h0.49v1.5h-3v-1s2-1.27 2-2.33c0-0.37 0-0.67-0.42-0.67-0.69 0-0.65 1-0.65 1h-0.93s-0.23-2 1.63-2z\"/></g>\n<g id=\"combobox\"><path d=\"M15 4h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6c0-0.6-0.4-1-1-1zM10 11h-9v-6h9v6zM13 8.4l-2-1.4h4l-2 1.4z\"/><path d=\"M2 6h1v4h-1v-4z\"/></g>\n<g id=\"comment-ellipsis-o\"><path d=\"M3 11.2c0 0.1 0 0.1 0 0 0 0.1 0 0.1 0 0 0 0 0 0 0 0z\"/><path d=\"M8.3 1c-4.4 0-8.3 2.6-8.3 5.6 0 2 1.1 3.7 3 4.7 0 0 0 0 0 0s0 0.1 0 0.1c-0.1 1.3-0.9 1.7-0.9 1.7l-1.8 0.9h2c2.5 0 4.3-1.1 5.1-1.9 0.3 0 0.6 0 0.8 0 4.3 0 7.8-2.5 7.8-5.6s-3.4-5.5-7.7-5.5zM8.2 11.1c-0.3 0-0.7 0-0.9 0h-0.2l-0.2 0.2c-0.5 0.5-1.6 1.4-3.3 1.7 0.3-0.5 0.5-1.1 0.5-2v-0.3l-0.3-0.1c-1.8-0.9-2.8-2.3-2.8-4 0-2.4 3.5-4.6 7.3-4.6 3.7 0 6.7 2 6.7 4.6 0 2.4-3.1 4.5-6.8 4.5z\"/><path d=\"M6 7c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M9 7c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M12 7c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/></g>\n<g id=\"comment-ellipsis\"><path d=\"M8 1c-4.4 0-8 2.5-8 5.5 0 2 2 3.8 4 4.8 0 0 0 0 0 0 0 2.1-2 2.8-2 2.8 2.8 0 4.4-1.3 5.1-2.1 0.3 0 0.6 0 0.9 0 4.4 0 8-2.5 8-5.5s-3.6-5.5-8-5.5zM5 8c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1zM8 8c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1zM11 8c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1z\"/></g>\n<g id=\"comment-o\"><path d=\"M3 11.2c0 0.1 0 0.1 0 0 0 0.1 0 0.1 0 0 0 0 0 0 0 0z\"/><path d=\"M8.3 1c-4.4 0-8.3 2.6-8.3 5.6 0 2 1.1 3.7 3 4.7 0 0 0 0 0 0s0 0.1 0 0.1c-0.1 1.3-0.9 1.7-0.9 1.7l-1.8 0.9h2c2.5 0 4.3-1.1 5.1-1.9 0.3 0 0.5 0 0.8 0 4.3 0 7.8-2.5 7.8-5.6s-3.4-5.5-7.7-5.5zM8.2 11.1c-0.3 0-0.7 0-0.9 0h-0.3l-0.2 0.2c-0.5 0.5-1.6 1.4-3.3 1.7 0.3-0.5 0.5-1.1 0.5-2v-0.3l-0.3-0.1c-1.8-0.9-2.7-2.3-2.7-4 0-2.4 3.5-4.6 7.3-4.6 3.7 0 6.7 2 6.7 4.6 0 2.4-3.1 4.5-6.8 4.5z\"/></g>\n<g id=\"comment\"><path d=\"M8 1c-4.4 0-8 2.5-8 5.5 0 2 2 3.8 4 4.8 0 0 0 0 0 0 0 2.1-2 2.8-2 2.8 2.8 0 4.4-1.3 5.1-2.1 0.3 0 0.6 0 0.9 0 4.4 0 8-2.5 8-5.5s-3.6-5.5-8-5.5z\"/></g>\n<g id=\"comments-o\"><path d=\"M14.2 14c0.6-0.5 1.8-1.6 1.8-3.2 0-1.4-1.2-2.6-2.8-3.3 0.5-0.6 0.8-1.5 0.8-2.4 0-2.8-2.9-5.1-6.6-5.1-3.5 0-7.4 2.1-7.4 5.1 0 2.1 1.6 3.6 2.3 4.2-0.1 1.2-0.6 1.7-0.6 1.7l-1.2 1h1.5c1.2 0 2.2-0.3 3-0.7 0.3 1.9 2.5 3.4 5.3 3.4 0.1 0 0.3 0 0.5 0 0.6 0.5 1.8 1.3 3.5 1.3h1.4l-1.1-0.9c0 0-0.3-0.3-0.4-1.1zM10.3 13.7c-2.3 0-4.3-1.3-4.3-2.8 0-0.1 0-0.1 0-0.2 0.2-0.2 0.4-0.3 0.5-0.5 0.2 0 0.5 0 0.7 0 2.1 0 4-0.7 5.2-1.9 1.5 0.5 2.6 1.5 2.6 2.5s-0.9 2-1.7 2.5l-0.3 0.2v0.3c0 0.5 0.2 0.8 0.3 1.1-1-0.2-1.7-0.7-1.9-1l-0.1-0.2h-0.2c-0.3 0-0.6 0-0.8 0zM7.4 1c3.1 0 5.6 1.9 5.6 4.1s-2.6 4.1-5.8 4.1c-0.2 0-0.6 0-0.8 0h-0.3l-0.1 0.2c-0.3 0.4-1.5 1.2-3.1 1.5 0.1-0.4 0.1-1 0.1-1.8v-0.3c-1-0.8-2.1-2.2-2.1-3.6 0-2.2 3.2-4.2 6.5-4.2z\"/></g>\n<g id=\"comments\"><path d=\"M16 11.1c0-1.5-1.5-2.8-3.2-3.3-1.3 1.5-3.9 2.4-6.4 2.4-0.1 0-0.3 0-0.4 0 0 0 0 0-0.1 0-0.1 0.3-0.1 0.5-0.1 0.8 0 2 2.2 3.6 5 3.6 0.2 0 0.4 0 0.6 0 0.4 0.5 1.7 1.4 3.4 1.4 0 0-0.8-0.4-0.8-1.8 0 0 0 0 0 0 0-0.6 2-1.8 2-3.1z\"/><path d=\"M13 4.6c0-2.5-2.8-4.6-6.4-4.6s-6.6 2.1-6.6 4.6c0 1.7 2 3.2 3 4 0 0 0 0 0 0 0 1.8-1.4 2.4-1.4 2.4 2.3 0 3.6-1.1 4.2-1.8 0.2 0 0.5 0 0.8 0 3.5 0.1 6.4-2 6.4-4.6z\"/></g>\n<g id=\"compile\"><path d=\"M1 12h4v4h-4v-4z\"/><path d=\"M6 12h4v4h-4v-4z\"/><path d=\"M11 12h4v4h-4v-4z\"/><path d=\"M1 7h4v4h-4v-4z\"/><path d=\"M1 2h4v4h-4v-4z\"/><path d=\"M6 7h4v4h-4v-4z\"/><path d=\"M7 1h4v4h-4v-4z\"/><path d=\"M11 7h4v4h-4v-4z\"/><path d=\"M13 0h3v3h-3v-3z\"/></g>\n<g id=\"compress-square\"><path d=\"M12 0h-12v12l1-1v-10h10z\"/><path d=\"M4 16h12v-12l-1 1v10h-10z\"/><path d=\"M7 9h-5l1.8 1.8-3.8 3.8 1.4 1.4 3.8-3.8 1.8 1.8z\"/><path d=\"M16 1.4l-1.4-1.4-3.8 3.8-1.8-1.8v5h5l-1.8-1.8z\"/></g>\n<g id=\"compress\"><path d=\"M5.3 9.3l-5 5 1.4 1.4 5-5 1.3 1.3v-4h-4z\"/><path d=\"M15.7 1.7l-1.4-1.4-4 4-1.3-1.3v4h4l-1.3-1.3z\"/></g>\n<g id=\"connect-o\"><path d=\"M12.5 9c-1 0-1.8 0.4-2.4 1l-3.2-1.7c0.1-0.3 0.1-0.5 0.1-0.8 0-0.2 0-0.3 0-0.4l2.9-1.3c0.6 0.7 1.5 1.2 2.6 1.2 1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5c0 0.2 0 0.3 0 0.4l-2.9 1.3c-0.6-0.7-1.5-1.2-2.6-1.2-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5c1 0 1.8-0.4 2.4-1l3.1 1.7c0 0.3 0 0.5 0 0.8 0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zM12.5 1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5c0-1.4 1.1-2.5 2.5-2.5zM3.5 10c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5zM12.5 15c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5z\"/></g>\n<g id=\"connect\"><path d=\"M12 10c-0.8 0-1.4 0.3-2 0.8l-3.2-1.8c0.1-0.3 0.2-0.7 0.2-1s-0.1-0.7-0.2-1l3.2-1.8c0.6 0.5 1.2 0.8 2 0.8 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 0.2 0 0.3 0 0.5l-3.5 1.9c-0.4-0.2-0.9-0.4-1.5-0.4-1.6 0-3 1.3-3 3v0c0 1.6 1.4 3 3 3 0.6 0 1.1-0.2 1.5-0.4l3.5 1.9c0 0.2 0 0.3 0 0.5 0 1.7 1.3 3 3 3s3-1.3 3-3-1.3-3-3-3z\"/></g>\n<g id=\"controller\"><path d=\"M5.951 0.249l0.981-0.195 0.195 0.981-0.981 0.195-0.195-0.981z\"/><path d=\"M8.877 14.966l0.981-0.195 0.195 0.981-0.981 0.195-0.195-0.981z\"/><path d=\"M0.055 9.071l0.981-0.195 0.195 0.981-0.981 0.195-0.195-0.981z\"/><path d=\"M14.773 6.145l0.981-0.195 0.195 0.981-0.981 0.195-0.195-0.981z\"/><path d=\"M11.471 1.897l0.556-0.831 0.831 0.556-0.556 0.831-0.831-0.556z\"/><path d=\"M3.139 14.441l0.56-0.83 0.83 0.56-0.56 0.83-0.83-0.56z\"/><path d=\"M1.069 3.989l0.56-0.83 0.83 0.56-0.56 0.83-0.83-0.56z\"/><path d=\"M13.547 12.299l0.556-0.831 0.831 0.556-0.556 0.831-0.831-0.556z\"/><path d=\"M8.875 1.039l0.195-0.981 0.981 0.195-0.195 0.981-0.981-0.195z\"/><path d=\"M5.953 15.745l0.195-0.981 0.981 0.195-0.195 0.981-0.981-0.195z\"/><path d=\"M0.061 6.931l0.195-0.981 0.981 0.195-0.195 0.981-0.981-0.195z\"/><path d=\"M14.767 9.854l0.195-0.981 0.981 0.195-0.195 0.981-0.981-0.195z\"/><path d=\"M3.139 1.628l0.831-0.556 0.556 0.831-0.831 0.556-0.556-0.831z\"/><path d=\"M11.477 14.101l0.831-0.556 0.556 0.831-0.831 0.556-0.556-0.831z\"/><path d=\"M1.071 12.033l0.831-0.556 0.556 0.831-0.831 0.556-0.556-0.831z\"/><path d=\"M13.539 3.63l0.83-0.56 0.56 0.83-0.83 0.56-0.56-0.83z\"/><path d=\"M14 8c-0.003-1.895-0.884-3.583-2.258-4.681l-3.322 4.991-0.84-0.59 3.32-5c-0.836-0.47-1.836-0.747-2.9-0.747-3.314 0-6 2.686-6 6s2.686 6 6 6c3.304 0 5.984-2.671 6-5.971z\"/></g>\n<g id=\"copy-o\"><path d=\"M13 3h-3l-3-3h-7v13h6v3h10v-10l-3-3zM7 1l2 2h-2v-2zM1 12v-11h5v3h3v8h-8zM15 15h-8v-2h3v-9h2v3h3v8zM13 6v-2l2 2h-2z\"/></g>\n<g id=\"copy\"><path d=\"M6 0v3h3z\"/><path d=\"M9 4h-4v-4h-5v12h9z\"/><path d=\"M13 4v3h3z\"/><path d=\"M12 4h-2v9h-3v3h9v-8h-4z\"/></g>\n<g id=\"copyright\"><path d=\"M8 1.5c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M9.9 10.3c-0.5 0.4-1.2 0.7-1.9 0.7-1.7 0-3-1.3-3-3s1.3-3 3-3c0.8 0 1.6 0.3 2.1 0.9l1.1-1.1c-0.8-0.8-2-1.3-3.2-1.3-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5c1.1 0 2-0.4 2.8-1l-0.9-1.2z\"/></g>\n<g id=\"corner-lower-left\"><path d=\"M16 16l-16-16v16z\"/></g>\n<g id=\"corner-lower-right\"><path d=\"M16 16h-16l16-16z\"/></g>\n<g id=\"corner-upper-left\"><path d=\"M0 16l16-16h-16z\"/></g>\n<g id=\"corner-upper-right\"><path d=\"M16 16l-16-16h16z\"/></g>\n<g id=\"credit-card\"><path d=\"M0 2v12h16v-12h-16zM15 13h-14v-5h14v5zM15 5h-14v-2h14v2z\"/><path d=\"M10 11h3v1h-3v-1z\"/><path d=\"M2 11h6v1h-6v-1z\"/></g>\n<g id=\"crop\"><path d=\"M16 0.7v-0.7h-0.7l-3 3h-7.3v-3h-2v3h-3v2h3v8h8v3h2v-3h3v-2h-3v-7.3l3-3zM5 5h5.3l-5.3 5.3v-5.3zM11 11h-5.3l5.3-5.3v5.3z\"/></g>\n<g id=\"cross-cutlery\"><path d=\"M10.9 8.6c0 0 0 0 0 0 0.6-0.1 1.2-0.4 1.6-0.9l3.1-3.1c0.4-0.4 0.4-1 0-1.4l-0.1-0.2-3 3c-0.2 0.2-0.6 0.2-0.9 0s-0.2-0.6 0-0.9l2.6-2.6c0.2-0.2 0.2-0.6 0-0.9-0.2-0.2-0.6-0.2-0.9 0l-2.6 2.6c-0.2 0.2-0.6 0.2-0.9 0-0.2-0.2-0.2-0.6 0-0.9l3-3-0.1-0.1c-0.4-0.4-1-0.4-1.4 0l-3.1 3.3c-0.4 0.4-0.7 1-0.8 1.6l-4.9-4.8c-0.4-0.4-1-0.3-1.3 0l-0.2 0.2c-1.4 1.4-0.9 4.2 1.5 6.6l0.8 0.8c0.4 0.4 0.9 0.7 1.5 0.8-0.5 0.4-0.8 0.8-0.8 0.8l-3.4 3.4c-0.7 0.7-0.7 1.9 0 2.6s1.9 0.7 2.6 0l3.3-3.5c0.2-0.2 0.7-0.8 1.3-1.5 0.3 0.4 0.5 0.6 0.5 0.6l4.3 4.3c0.7 0.7 1.9 0.7 2.6 0s0.7-1.9 0-2.6l-4.3-4.2z\"/></g>\n<g id=\"crosshairs\"><path d=\"M7.5 0h1v4l-0.5 2-0.5-2v-4z\"/><path d=\"M8.5 16h-1v-4l0.5-2 0.5 2v4z\"/><path d=\"M16 7.5v1h-4l-2-0.5 2-0.5h4z\"/><path d=\"M0 8.5v-1h4l2 0.5-2 0.5h-4z\"/><path d=\"M8 2.5c3.038 0 5.5 2.462 5.5 5.5s-2.462 5.5-5.5 5.5c-3.038 0-5.5-2.462-5.5-5.5 0.006-3.035 2.465-5.494 5.499-5.5zM8 1c-3.866 0-7 3.134-7 7s3.134 7 7 7c3.866 0 7-3.134 7-7s-3.134-7-7-7v0z\"/></g>\n<g id=\"css\"><path d=\"M4.1 11c1.4 0 1.9-1 1.9-1l-0.8-0.5c0 0-0.3 0.5-1 0.5s-1.2-0.9-1.2-2.2c0-1.2 0.6-1.8 1.2-1.8 0.5 0 0.9 0.4 0.9 0.4l0.8-0.6c0 0-0.7-0.8-1.7-0.8-1.1 0-2.2 0.9-2.2 2.8s0.9 3.2 2.1 3.2zM8.7 9.9c-0.3 0.1-0.7 0-1-0.4l-0.8 0.5c0.4 0.6 1 1 1.6 1 0.1 0 0.3 0 0.4-0.1 0.7-0.2 1.1-0.8 1.1-1.6 0-1.2-0.8-1.6-1.3-1.8-0.5-0.3-0.7-0.4-0.7-0.8s0.1-0.7 0.6-0.7c0.3 0 0.6 0.4 0.6 0.4l0.8-0.6c-0.2-0.3-0.7-0.8-1.4-0.8-0.9 0-1.6 0.6-1.6 1.6 0 1.1 0.7 1.5 1.2 1.8 0.6 0.2 0.8 0.4 0.8 0.9 0 0.3 0 0.6-0.3 0.6zM12.7 9.9c-0.3 0.1-0.7 0-1-0.4l-0.8 0.5c0.4 0.6 1 1 1.6 1 0.1 0 0.3 0 0.4-0.1 0.7-0.2 1.1-0.8 1.1-1.6 0-1.2-0.8-1.6-1.3-1.8-0.5-0.3-0.7-0.4-0.7-0.8s0.1-0.7 0.6-0.7c0.3 0 0.6 0.4 0.6 0.4l0.8-0.6c-0.2-0.3-0.7-0.8-1.4-0.8-0.9 0-1.6 0.6-1.6 1.6 0 1.1 0.7 1.5 1.2 1.8 0.6 0.2 0.8 0.4 0.8 0.9 0 0.3 0 0.6-0.3 0.6zM0 0v16h16v-16h-16zM15 15h-14v-14h14v14z\"/></g>\n<g id=\"ctrl-a\"><path d=\"M9 7v-1h-1v-1h-1v1h-0.5v1h0.5v3.56c0.176 0.835 0.907 1.453 1.783 1.453 0.077 0 0.152-0.005 0.226-0.014l-0.009-0.999c-0.055 0.012-0.119 0.019-0.185 0.019-0.359 0-0.669-0.21-0.813-0.514l-0.002-3.505h1z\"/><path d=\"M14 3h1v9h-1v-9z\"/><path d=\"M13 6c-0.025-0.001-0.055-0.001-0.085-0.001-0.773 0-1.462 0.358-1.911 0.917l-0.004-0.915h-1v6h1v-3c-0.003-0.037-0.004-0.080-0.004-0.124 0-1.038 0.842-1.88 1.88-1.88 0.044 0 0.087 0.001 0.13 0.004l-0.006-1z\"/><path d=\"M4.19 12c-2.030 0-3.19-1.46-3.19-4s1.16-4 3.19-4c0.009-0 0.019-0 0.029-0 0.539 0 1.052 0.114 1.515 0.32l-0.424 0.901c-0.319-0.139-0.69-0.22-1.080-0.22-0.014 0-0.028 0-0.042 0-1.808-0-2.188 1.63-2.188 3s0.38 3 2.19 3c0.497-0.013 0.96-0.145 1.366-0.368l0.444 0.898c-0.524 0.285-1.146 0.458-1.806 0.47z\"/></g>\n<g id=\"ctrl\"><path d=\"M0 0v16h16v-16h-16zM4.19 12c-2.030 0-3.19-1.46-3.19-4s1.16-4 3.19-4c0.009-0 0.019-0 0.029-0 0.539 0 1.052 0.114 1.515 0.32l-0.424 0.901c-0.319-0.139-0.69-0.22-1.080-0.22-0.014 0-0.028 0-0.042 0-1.808-0-2.188 1.63-2.188 3s0.38 3 2.19 3c0.497-0.013 0.96-0.145 1.366-0.368l0.444 0.898c-0.524 0.285-1.146 0.458-1.806 0.47zM9 7h-1v3.5c0.147 0.309 0.457 0.519 0.815 0.519 0.065 0 0.129-0.007 0.19-0.020l-0.006 1.001c-0.065 0.008-0.141 0.013-0.217 0.013-0.875 0-1.606-0.618-1.781-1.441l-0.002-3.572h-0.51v-1h0.51v-1h1v1h1v1zM11 9v3h-1v-6h1v0.92c0.453-0.564 1.142-0.921 1.915-0.921 0.030 0 0.060 0.001 0.090 0.002l-0.004 1c-0.037-0.003-0.080-0.004-0.124-0.004-1.038 0-1.88 0.842-1.88 1.88 0 0.044 0.001 0.087 0.004 0.13zM15 12h-1v-9h1v9z\"/></g>\n<g id=\"cube\"><path d=\"M8 0l-8 2v10l8 4 8-4v-10l-8-2zM14.4 2.6l-5.9 2.2-6.6-2.2 6.1-1.6 6.4 1.6zM1 11.4v-8.1l7 2.4v9.2l-7-3.5z\"/></g>\n<g id=\"cubes\"><path d=\"M12 6v-4l-4-2-4 2v4l-4 2v5l4 2 4-2 4 2 4-2v-5zM8.090 1.12l2.91 1.44-2.6 1.3-2.91-1.44zM5 2.78l3 1.5v3.6l-3-1.5v-3.6zM4 13.88l-3-1.5v-3.6l3 1.5v3.6zM4.28 9.88l-2.88-1.46 2.6-1.3 2.88 1.44zM12 13.88l-3-1.5v-3.6l3 1.5v3.6zM12.28 9.88l-2.88-1.46 2.6-1.3 2.88 1.44z\"/></g>\n<g id=\"curly-brackets\"><path d=\"M2.1 3.1c0.2 1.3 0.4 1.6 0.4 2.9 0 0.8-1.5 1.5-1.5 1.5v1c0 0 1.5 0.7 1.5 1.5 0 1.3-0.2 1.6-0.4 2.9-0.3 2.1 0.8 3.1 1.8 3.1s2.1 0 2.1 0v-2c0 0-1.8 0.2-1.8-1 0-0.9 0.2-0.9 0.4-2.9 0.1-0.9-0.5-1.6-1.1-2.1 0.6-0.5 1.2-1.1 1.1-2-0.3-2-0.4-2-0.4-2.9 0-1.2 1.8-1.1 1.8-1.1v-2c0 0-1 0-2.1 0s-2.1 1-1.8 3.1z\"/><path d=\"M13.9 3.1c-0.2 1.3-0.4 1.6-0.4 2.9 0 0.8 1.5 1.5 1.5 1.5v1c0 0-1.5 0.7-1.5 1.5 0 1.3 0.2 1.6 0.4 2.9 0.3 2.1-0.8 3.1-1.8 3.1s-2.1 0-2.1 0v-2c0 0 1.8 0.2 1.8-1 0-0.9-0.2-0.9-0.4-2.9-0.1-0.9 0.5-1.6 1.1-2.1-0.6-0.5-1.2-1.1-1.1-2 0.2-2 0.4-2 0.4-2.9 0-1.2-1.8-1.1-1.8-1.1v-2c0 0 1 0 2.1 0s2.1 1 1.8 3.1z\"/></g>\n<g id=\"cursor-o\"><path d=\"M5 2.6l5.75 6.4h-2.46l0.63 1.41 1.8 4-0.91 0.34-1.88-4.3-0.5-1.11-1 0.71-1.43 1.020v-8.47zM4 0v13l3-2.14 2.26 5.14 2.8-1-2.23-5h3.17l-9-10z\"/></g>\n<g id=\"cursor\"><path d=\"M4 0v13l3.31-3.47 2.69 6.47 1.37-0.63-2.72-6.37h4.35l-9-9z\"/></g>\n<g id=\"cutlery\"><path d=\"M13 0.8c0-0.5-0.4-0.8-0.8-0.8h-0.2c-1.7 0-3 1.9-3 4.7v0.9c0 1 0.5 1.9 1.4 2.4-0.3 1.2-0.4 2.5-0.4 2.5v4c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5v-4c0-0.4-0.1-1.4-0.3-2.3 0.2-0.2 0.3-0.4 0.3-0.7v-6.7z\"/><path d=\"M7.2 0h-0.2v3.5c0 0.3-0.2 0.5-0.5 0.5s-0.5-0.2-0.5-0.5v-3c0-0.3-0.2-0.5-0.5-0.5s-0.5 0.2-0.5 0.5v3c0 0.3-0.2 0.5-0.5 0.5s-0.5-0.2-0.5-0.5v-3.5h-0.2c-0.4 0-0.8 0.4-0.8 0.8v3.7c0 1 0.6 1.9 1.5 2.3-0.4 1.6-0.5 3.7-0.5 3.7v4c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5v-4c0-0.5-0.1-2.3-0.4-3.7 0.8-0.4 1.4-1.3 1.4-2.3v-3.7c0-0.4-0.4-0.8-0.8-0.8z\"/></g>\n<g id=\"dashboard\"><path d=\"M16 10.1c0-4.4-3.6-8.1-8-8.1s-8 3.7-8 8.1c0 1.4 0.3 2.9 0.9 3.9h4.9c0.5 0.6 1.3 1 2.2 1s1.7-0.4 2.2-1h4.9c0.6-1 0.9-2.5 0.9-3.9zM14 7v1l-4.1 3.5c0 0.1 0.1 0.3 0.1 0.5 0 1.1-0.9 2-2 2s-2-0.9-2-2 0.9-2 2-2c0.3 0 0.6 0.1 0.8 0.2l4.2-3.2h1zM10 4h1v1h-1v-1zM5 4h1v1h-1v-1zM2 12h-1v-1h1v1zM3 8h-1v-1h1v1zM15 12h-1v-1h1v1z\"/><path d=\"M9 12c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/></g>\n<g id=\"database\"><path d=\"M14 2.5c0 0.828-2.686 1.5-6 1.5s-6-0.672-6-1.5c0-0.828 2.686-1.5 6-1.5s6 0.672 6 1.5z\"/><path d=\"M8 5c-3.3 0-6-0.7-6-1.5v3c0 0.8 2.7 1.5 6 1.5s6-0.7 6-1.5v-3c0 0.8-2.7 1.5-6 1.5z\"/><path d=\"M8 9c-3.3 0-6-0.7-6-1.5v3c0 0.8 2.7 1.5 6 1.5s6-0.7 6-1.5v-3c0 0.8-2.7 1.5-6 1.5z\"/><path d=\"M8 13c-3.3 0-6-0.7-6-1.5v3c0 0.8 2.7 1.5 6 1.5s6-0.7 6-1.5v-3c0 0.8-2.7 1.5-6 1.5z\"/></g>\n<g id=\"date-input\"><path d=\"M14 1v3h-3v-3h-6v3h-3v-3h-2v15h16v-15h-2zM15 15h-14v-9h14v9z\"/><path d=\"M3 0h1v3h-1v-3z\"/><path d=\"M12 0h1v3h-1v-3z\"/><path d=\"M3 8h1v5h-1v-5z\"/></g>\n<g id=\"deindent\"><path d=\"M4 10.5v-6l-4 3z\"/><path d=\"M0 0h16v3h-16v-3z\"/><path d=\"M6 4h10v3h-10v-3z\"/><path d=\"M6 8h10v3h-10v-3z\"/><path d=\"M0 12h16v3h-16v-3z\"/></g>\n<g id=\"del-a\"><path d=\"M14 3h1v9h-1v-9z\"/><path d=\"M3 12h-2v-9h2c2.23 0.051 4.019 1.871 4.019 4.109 0 0.138-0.007 0.274-0.020 0.408 0.013 0.1 0.020 0.236 0.020 0.374 0 2.238-1.788 4.058-4.014 4.109zM2 11h1c0.31 0 3-0.12 3-3.5s-2.88-3.5-3-3.5h-1v7z\"/><path d=\"M13 9v-0.5c-0.017-0.77-0.31-1.468-0.783-2.003-0.419-0.412-0.999-0.668-1.638-0.668-0.031 0-0.063 0.001-0.094 0.002-0.013-0.001-0.034-0.001-0.054-0.001-0.594 0-1.132 0.241-1.521 0.631-0.566 0.685-0.91 1.572-0.91 2.54 0 0.003-0 0.006-0 0.009 0 0.881 0.322 1.686 0.854 2.306 0.43 0.429 1.030 0.697 1.692 0.697 0.030 0 0.059-0.001 0.089-0.002 0.861-0.026 1.642-0.372 2.228-0.922l-0.712-0.708c-0.401 0.368-0.931 0.603-1.515 0.63-0.026 0.001-0.051 0.002-0.076 0.002-0.385 0-0.734-0.153-0.99-0.402-0.355-0.435-0.57-0.997-0.57-1.61l4-0zM10.5 6.8c0.020-0.001 0.043-0.002 0.066-0.002 0.362 0 0.691 0.141 0.935 0.372 0.209 0.224 0.361 0.505 0.427 0.818l-2.778 0.011c0.11-0.661 0.661-1.165 1.337-1.2z\"/></g>\n<g id=\"del\"><path d=\"M0 0v16h16v-16h-16zM3 12h-2v-9h2c2.23 0.051 4.019 1.871 4.019 4.109 0 0.138-0.007 0.274-0.020 0.408 0.013 0.1 0.020 0.236 0.020 0.374 0 2.238-1.788 4.058-4.014 4.109zM13 9h-4c-0 0.004-0 0.008-0 0.012 0 0.607 0.211 1.164 0.564 1.603 0.252 0.244 0.601 0.397 0.986 0.397 0.025 0 0.049-0.001 0.074-0.002 0.586-0.027 1.115-0.261 1.518-0.631l0.708 0.712c-0.584 0.548-1.364 0.893-2.225 0.92-0.030 0.001-0.060 0.002-0.090 0.002-0.662 0-1.261-0.268-1.696-0.702-0.522-0.613-0.84-1.414-0.84-2.289 0-0.007 0-0.014 0-0.022-0-0.005-0-0.012-0-0.019 0-0.968 0.344-1.855 0.915-2.547 0.384-0.383 0.922-0.624 1.516-0.624 0.021 0 0.041 0 0.062 0.001 0.024-0.001 0.055-0.002 0.086-0.002 0.639 0 1.219 0.256 1.641 0.672 0.47 0.532 0.762 1.23 0.78 1.996l0 0.524zM15 12h-1v-9h1v9z\"/><path d=\"M3 4h-1v7h1c0.31 0 3-0.12 3-3.5s-2.88-3.5-3-3.5z\"/><path d=\"M10.49 6.8c-0.679 0.035-1.23 0.539-1.339 1.192l2.779 0.008c-0.069-0.324-0.22-0.606-0.431-0.831-0.242-0.229-0.571-0.371-0.934-0.371-0.027 0-0.053 0.001-0.079 0.002z\"/></g>\n<g id=\"dental-chair\"><path d=\"M11.5 8.2c-0.3-0.1-0.6-0.2-0.8-0.2h-2.7v-1h3c0-0.6-0.4-1-1-1h-4c0 0.6 0.4 1 1 1v1c-0.5 0-1-0.2-1.2-0.6l-1.1-1.8c-0.3-0.4-0.7-0.6-1.1-0.6h-0.6v-0.7c0-0.3-0.1-0.5-0.2-0.8l-0.3-0.7c-0.3-0.5-0.9-0.8-1.5-0.8h-1l5 7c0.4 0.6 1.1 1 1.8 1h1.2v1h-1v2h-0.6c-0.9 0-1.8 0.4-2.4 1v0h-1v1h11v-1h-1c-0.6-0.6-1.5-1-2.4-1h-0.6v-2h-1v-1h1.6c0.2 0 0.5 0.1 0.7 0.2l1.7 0.9c0.9 0.5 2 0.5 2.9 0h0.1l-4.5-2.9z\"/></g>\n<g id=\"desktop\"><path d=\"M16 0h-16v13h6v2h-2v1h8v-1h-2v-2h6v-13zM9 12h-2v-1h2v1zM15 10h-14v-8.9c0-0.1 0-0.1 0-0.1h14c0 0 0 0 0 0.1v8.9z\"/></g>\n<g id=\"diamond-o\"><path d=\"M13 2h-10l-3 3.5 8 9.5 8-9.5zM4.64 5h-2.89l1.52-1.78zM6.42 5l1.58-1.84 1.58 1.84h-3.16zM10 6l-2 6.68-2-6.68h4zM5.26 6l1.89 6.44-5.42-6.44h3.53zM10.75 6h3.53l-5.43 6.44zM11.37 5l1.37-1.78 1.51 1.78h-2.9zM12 3l-1.44 1.81-1.46-1.81h2.9zM5.43 4.83l-1.43-1.83h2.9z\"/></g>\n<g id=\"diamond\"><path d=\"M0 6h4l3 8.6-7-8.6z\"/><path d=\"M16 6h-4l-3 8.6 7-8.6z\"/><path d=\"M8 15l-3-9h6l-3 9z\"/><path d=\"M4 5h-4l2-3 2 3z\"/><path d=\"M16 5h-4l2-3 2 3z\"/><path d=\"M10 5h-4l2-3 2 3z\"/><path d=\"M3.34 2h3.66l-2 3-1.66-3z\"/><path d=\"M9 2h4l-2 3-2-3z\"/></g>\n<g id=\"diploma-scroll\"><path d=\"M12.61 8.41c-0.53-0.079-1.008-0.223-1.454-0.424 2.104-1.876 4.424-3.536 4.454-3.556l0.1-0.070 0.060-0.11c0.177-0.367 0.281-0.797 0.281-1.252 0-0.901-0.407-1.707-1.046-2.244-0.523-0.482-1.219-0.776-1.983-0.776-0.538 0-1.043 0.146-1.476 0.4l-0.126 0.133c-1.578 2.181-3.182 4.099-4.908 5.899-1.836 1.638-3.87 3.195-6.018 4.592l-0.394 0.248v0.23c-0.077 0.314-0.122 0.675-0.122 1.046 0 0.97 0.304 1.87 0.822 2.609 0.507 0.53 1.237 0.87 2.045 0.87 0.055 0 0.109-0.002 0.162-0.005 0.026 0.002 0.065 0.003 0.104 0.003 0.701 0 1.317-0.36 1.674-0.905 0.245-0.308 2.065-2.608 4.005-4.708 0.268 0.464 0.476 1.003 0.594 1.575 0.032 0.249 0.046 0.496 0.046 0.747 0 0.823-0.158 1.61-0.445 2.331l1.685-2.043 1.33 1c-0.041-1.174-0.243-2.286-0.584-3.336-0.227-0.416-0.542-0.845-0.915-1.214 0.406 0.346 0.871 0.643 1.372 0.874 0.94 0.338 1.989 0.572 3.076 0.672l-0.949-1.266 2-1.73c-0.83 0.273-1.785 0.431-2.777 0.431-0.216 0-0.43-0.007-0.642-0.022zM12.16 1.18c0.246-0.123 0.536-0.194 0.842-0.194 0.506 0 0.966 0.196 1.309 0.516 0.441 0.356 0.721 0.897 0.721 1.504 0 0.242-0.045 0.474-0.126 0.688-0.486 0.307-2.346 1.717-4.146 3.307-0.055-0.521-0.302-0.975-0.668-1.298-0.28-0.239-0.643-0.384-1.039-0.384-0.068 0-0.135 0.004-0.201 0.012 1.568-1.771 2.978-3.691 3.308-4.151zM2.7 11.81c0.073-0.051 0.164-0.082 0.262-0.082 0.014 0 0.027 0.001 0.040 0.002l0.068-0c0.179 0.052 0.334 0.142 0.461 0.261l-0.871 0.719c-0.081-0.165-0.128-0.358-0.128-0.563 0-0.052 0.003-0.103 0.009-0.153 0.027-0.077 0.084-0.144 0.158-0.183zM4 14.5c-0.175 0.306-0.499 0.508-0.871 0.508-0.046 0-0.090-0.003-0.134-0.009-0.046 0.006-0.106 0.008-0.167 0.008-0.515 0-0.981-0.209-1.318-0.548-0.365-0.54-0.583-1.206-0.583-1.922 0-0.251 0.027-0.495 0.077-0.73l0.706-0.457c-0.094 0.14-0.164 0.304-0.199 0.481-0.007 0.076-0.010 0.154-0.010 0.234 0 0.642 0.202 1.237 0.545 1.724l0.354 0.44 1.7-1.4c0.066 0.209 0.104 0.45 0.104 0.7 0 0.351-0.075 0.685-0.21 0.985zM4.86 12.050c-0.345-0.6-0.889-1.053-1.54-1.274-0.071-0.012-0.13-0.016-0.19-0.016s-0.119 0.004-0.177 0.010c-0.046-0.007-0.106-0.011-0.168-0.011s-0.122 0.004-0.182 0.011c1.489-1.018 2.766-2.003 3.988-3.052 0.398 0.071 0.812 0.25 1.131 0.533 0.297 0.313 0.48 0.739 0.48 1.209 0 0.032-0.001 0.063-0.002 0.094-1.14 1.226-2.25 2.536-3 3.506-0.054-0.379-0.177-0.719-0.357-1.023z\"/></g>\n<g id=\"diploma\"><path d=\"M14 10.58c0.024-0.048 0.038-0.105 0.038-0.165s-0.014-0.117-0.039-0.167l-0.479-0.698c-0.009-0.013-0.014-0.028-0.014-0.045s0.005-0.032 0.014-0.045l0.48-0.7c0.024-0.048 0.038-0.105 0.038-0.165s-0.014-0.117-0.039-0.167c-0.040-0.11-0.127-0.196-0.236-0.237l-0.823-0.301c-0.031-0.011-0.054-0.037-0.060-0.069l-0-0.841c-0.007-0.125-0.072-0.233-0.169-0.299-0.066-0.045-0.145-0.071-0.231-0.071-0.004 0-0.007 0-0.011 0l-0.159-0-0.85 0.22c-0.010 0.004-0.022 0.007-0.035 0.007s-0.025-0.003-0.036-0.007l-0.549-0.65c-0.079-0.085-0.191-0.137-0.315-0.137s-0.236 0.053-0.315 0.137l-0.55 0.65c-0.010 0.004-0.022 0.007-0.035 0.007s-0.025-0.003-0.036-0.007l0.001 0-0.9-0.23h-0.1c-0.002-0-0.005-0-0.008-0-0.087 0-0.167 0.026-0.234 0.071-0.096 0.066-0.161 0.174-0.168 0.298l-0 0.841c-0.006 0.033-0.029 0.059-0.059 0.070l-0.821 0.3c-0.134 0.023-0.245 0.11-0.299 0.228-0.025 0.051-0.039 0.107-0.039 0.167s0.014 0.117 0.039 0.167l0.479 0.698c0.009 0.013 0.014 0.028 0.014 0.045s-0.005 0.032-0.014 0.045l-0.48 0.7c-0.024 0.048-0.038 0.105-0.038 0.165s0.014 0.117 0.039 0.167c0.040 0.11 0.127 0.196 0.236 0.237l0.823 0.301c0.031 0.011 0.054 0.037 0.060 0.069l0 0.841c0.007 0.125 0.072 0.233 0.169 0.299 0.067 0.045 0.147 0.071 0.234 0.071 0.003 0 0.005-0 0.008-0h0.16l0.31-0.070v3.69l1.53-2 1.47 2v-3.69l0.31 0.080h0.11c0.002 0 0.005 0 0.008 0 0.087 0 0.167-0.026 0.234-0.071 0.096-0.066 0.161-0.174 0.168-0.298l0-0.841c0.006-0.033 0.029-0.059 0.059-0.070l0.821-0.3c0.13-0.026 0.236-0.112 0.289-0.227z\"/><path d=\"M0 1v12h8l-0.11-0.050c-0.282-0.195-0.469-0.508-0.49-0.867l-0-0.083h-6.4v-10h14v10h-1.43v0.080c-0.021 0.361-0.208 0.675-0.486 0.868l-0.084 0.052h3v-12h-16z\"/><path d=\"M7.43 6.91c0.007-0.377 0.198-0.708 0.486-0.908 0.016-0.005 0.030-0.006 0.044-0.006s0.028 0.001 0.041 0.004l-5.001-0v1h4.43v-0.090z\"/><path d=\"M6.42 8h-3.42v1h3.36c-0.074-0.136-0.117-0.298-0.117-0.47 0-0.13 0.025-0.253 0.070-0.367 0.014-0.063 0.054-0.122 0.107-0.163z\"/><path d=\"M3 4h10v1h-10v-1z\"/></g>\n<g id=\"disc\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM15 8c0 1.1-0.2 2.1-0.7 3l-2.7-1.2c0.2-0.6 0.4-1.2 0.4-1.8 0-2.2-1.8-4-4-4-0.5 0-0.9 0.1-1.4 0.3l-1.2-2.8c0.6-0.2 1.2-0.4 1.8-0.5l0.3 3h0.5v-3c3.9 0 7 3.1 7 7zM8 5c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zM1 8c0-1.1 0.2-2.1 0.7-3l2.7 1.2c-0.2 0.6-0.4 1.2-0.4 1.8 0 2.2 1.8 4 4 4 0.5 0 0.9-0.1 1.4-0.3l1.2 2.8c-0.6 0.2-1.2 0.4-1.8 0.5l-0.3-3h-0.5v3c-3.9 0-7-3.1-7-7z\"/><path d=\"M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/></g>\n<g id=\"doctor-briefcase\"><path d=\"M16 12l-1.4-6.7c-0.2-0.7-0.9-1.3-1.7-1.3h-1.9v-1.2c0-1-0.8-1.8-1.8-1.8h-2.4c-1 0-1.8 0.8-1.8 1.8v1.2h-1.9c-0.8 0-1.5 0.6-1.7 1.3l-1.4 6.7c-0.2 1 0.6 2 1.7 2h12.5c1.2 0 2-1 1.8-2zM6 2.8c0-0.4 0.4-0.8 0.8-0.8h2.4c0.4 0 0.8 0.4 0.8 0.8v1.2h-4v-1.2zM11 10h-2v2h-2v-2h-2v-2h2v-2h2v2h2v2z\"/></g>\n<g id=\"doctor\"><path d=\"M14 11.3c-1-1.9-2-1.6-3.1-1.7 0.1 0.3 0.1 0.6 0.1 1 1.6 0.4 2 2.3 2 3.4v1h-2v-1h1c0 0 0-2.5-1.5-2.5s-1.5 2.4-1.5 2.5h1v1h-2v-1c0-1.1 0.4-3.1 2-3.4 0-0.6-0.1-1.1-0.2-1.3-0.2-0.1-0.4-0.3-0.4-0.6 0-0.6 0.8-0.4 1.4-1.5 0 0 0.9-2.3 0.6-4.3h-1c0-0.2 0.1-0.3 0.1-0.5s0-0.3-0.1-0.5h0.8c-0.3-1-1.3-1.9-3.2-1.9 0 0 0 0 0 0s0 0 0 0 0 0 0 0c-1.9 0-2.9 0.9-3.3 2h0.8c0 0.2-0.1 0.3-0.1 0.5s0 0.3 0.1 0.5h-1c-0.2 2 0.6 4.3 0.6 4.3 0.6 1 1.4 0.8 1.4 1.5 0 0.5-0.5 0.7-1.1 0.8-0.2 0.2-0.4 0.6-0.4 1.4 0 0.4 0 0.8 0 1.2 0.6 0.2 1 0.8 1 1.4 0 0.7-0.7 1.4-1.5 1.4s-1.5-0.7-1.5-1.5c0-0.7 0.4-1.2 1-1.4 0-0.3 0-0.7 0-1.2s0.1-0.9 0.2-1.3c-0.7 0.1-1.5 0.4-2.2 1.7-0.6 1.1-0.9 4.7-0.9 4.7h13.7c0.1 0-0.2-3.6-0.8-4.7zM6.5 2.5c0-0.8 0.7-1.5 1.5-1.5s1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5-1.5-0.7-1.5-1.5z\"/><path d=\"M5 13.5c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5z\"/></g>\n<g id=\"dollar\"><path d=\"M8.2 6.8c-0.1 0-0.1-0.1-0.2-0.1v-3.1c1.2 0.1 2.2 0.6 2.2 0.6l0.9-1.8c-0.1 0-1.5-0.8-3.1-0.8v-1.6h-1v1.6c-0.8 0.2-1.4 0.5-2 0.9-0.6 0.6-1 1.4-1 2.3 0 0.7 0.2 2.3 3 3.6v3.9c-0.9-0.2-2-0.7-2.4-0.9l-1 1.7c0.2 0.1 1.8 1 3.4 1.2v1.7h1v-1.7c0 0 0 0 0 0 2.3-0.3 3.6-2.1 3.6-3.8 0-1.5-1-2.7-3.4-3.7zM7 6.2c-0.8-0.5-1-1-1-1.3 0-0.4 0.1-0.7 0.4-0.9 0.2-0.1 0.4-0.2 0.6-0.3v2.5zM8 12.3v-3.4c1.1 0.5 1.6 1.1 1.6 1.6 0 0.6-0.3 1.6-1.6 1.8z\"/></g>\n<g id=\"dot-circle\"><path d=\"M8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z\"/><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/></g>\n<g id=\"download-alt\"><path d=\"M0 14h16v2h-16v-2z\"/><path d=\"M8 13l5-5h-3v-8h-4v8h-3z\"/></g>\n<g id=\"download\"><path d=\"M16 10h-5.5l-2.5 2.5-2.5-2.5h-5.5v6h16v-6zM4 14h-2v-2h2v2z\"/><path d=\"M10 6v-6h-4v6h-3l5 5 5-5z\"/></g>\n<g id=\"drop\"><path d=\"M8 0c0 0-5 8.2-5 11s2.2 5 5 5 5-2.2 5-5-5-11-5-11zM8.9 14.9l-0.2-1c1.4-0.3 2.4-1.7 2.4-3.2 0-0.3-0.1-1.1-0.8-2.6l0.9-0.4c0.6 1.4 0.8 2.4 0.8 3 0 2-1.3 3.8-3.1 4.2z\"/></g>\n<g id=\"edit\"><path d=\"M16 4c0 0 0-1-1-2s-1.9-1-1.9-1l-1.1 1.1v-2.1h-12v16h12v-8l4-4zM6.3 11.4l-0.6-0.6 0.3-1.1 1.5 1.5-1.2 0.2zM7.2 9.5l-0.6-0.6 5.2-5.2c0.2 0.1 0.4 0.3 0.6 0.5zM14.1 2.5l-0.9 1c-0.2-0.2-0.4-0.3-0.6-0.5l0.9-0.9c0.1 0.1 0.3 0.2 0.6 0.4zM11 15h-10v-14h10v2.1l-5.9 5.9-1.1 4.1 4.1-1.1 2.9-3v6z\"/></g>\n<g id=\"eject\"><path d=\"M1 11h14l-7-10z\"/><path d=\"M1 12h14v3h-14v-3z\"/></g>\n<g id=\"elastic\"><path d=\"M4.7 16v0c-1.7 0-3.1-0.8-4-2.1-1.1-1.7-0.9-4 0.4-5.8 0.9-1.3 2.1-2.1 3.6-2.4 1.2-0.3 2.2-1.1 2.5-2.2 0.2-0.8 0.7-1.5 1.3-2 0.9-1 2.2-1.5 3.5-1.5 1.1 0 2.2 0.4 2.9 1.2 1.5 1.6 1.5 4.2-0.1 6-0.5 0.6-1.2 1.1-2 1.4-1.2 0.5-2.2 1.6-2.6 3-0.3 1-0.8 1.9-1.5 2.6-1.1 1.2-2.6 1.8-4 1.8zM12 1c-1 0-2 0.4-2.8 1.2-0.5 0.5-0.8 1-1 1.6-0.5 1.5-1.8 2.5-3.3 2.9-1.2 0.2-2.2 0.9-3 2-1.1 1.5-1.2 3.3-0.3 4.7 0.6 1 1.8 1.6 3.1 1.6v0c1.2 0 2.4-0.5 3.3-1.4 0.6-0.6 1.1-1.4 1.3-2.2 0.4-1.7 1.6-3 3.2-3.6 0.6-0.2 1.2-0.7 1.6-1.2 1.2-1.4 1.3-3.5 0.1-4.7-0.6-0.6-1.4-0.9-2.2-0.9z\"/></g>\n<g id=\"ellipsis-circle-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M4 7h2v2h-2v-2z\"/><path d=\"M7 7h2v2h-2v-2z\"/><path d=\"M10 7h2v2h-2v-2z\"/></g>\n<g id=\"ellipsis-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6 9h-2v-2h2v2zM9 9h-2v-2h2v2zM12 9h-2v-2h2v2z\"/></g>\n<g id=\"ellipsis-dots-h\"><path d=\"M4 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M16 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/></g>\n<g id=\"ellipsis-dots-v\"><path d=\"M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M10 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/></g>\n<g id=\"ellipsis-h\"><path d=\"M0 6h4v4h-4v-4z\"/><path d=\"M6 6h4v4h-4v-4z\"/><path d=\"M12 6h4v4h-4v-4z\"/></g>\n<g id=\"ellipsis-v\"><path d=\"M6 0h4v4h-4v-4z\"/><path d=\"M6 6h4v4h-4v-4z\"/><path d=\"M6 12h4v4h-4v-4z\"/></g>\n<g id=\"enter-arrow\"><path d=\"M0 9l7 4v-3h9v-7l-3 2v2h-6v-3l-7 5z\"/></g>\n<g id=\"enter\"><path d=\"M4 0v6h-3v10h14v-16h-11zM12 11h-5v2l-3-2.5 3-2.5v2h4v-3h1v4z\"/></g>\n<g id=\"envelope-o\"><path d=\"M0 3v11h16v-11h-16zM1 7.1l3.9 2-3.9 3.4v-5.4zM1.9 13l4-3.5 2.1 1.1 2.1-1.1 4 3.5h-12.2zM15 12.5l-3.9-3.5 3.9-2v5.5zM15 5.9l-7 3.5-7-3.5v-1.9h14v1.9z\"/></g>\n<g id=\"envelope-open-o\"><path d=\"M14 3.7v-0.7h-1.5l-4.5-3-4.6 3h-1.4v0.7l-2 1.3v11h16v-10.9l-2-1.4zM8 1.2l2.7 1.8h-5.5l2.8-1.8zM3 4h10v3.7l-3.5 1.7-1.5-1.3-1.5 1.4-3.5-1.7v-3.8zM1 5.5l1-0.7v2.4l-1-0.4v-1.3zM1 7.9l4.6 2.3-4.6 4v-6.3zM1.9 15l6.1-5.3 6.1 5.3h-12.2zM15 14.2l-4.7-4.1 4.7-2.3v6.4zM15 6.7l-1 0.5v-2.3l1 0.7v1.1z\"/></g>\n<g id=\"envelope-open\"><path d=\"M14 3.7v3.7l2-1v-1.4z\"/><path d=\"M2 3.8l-2 1.2v1.5l2 1z\"/><path d=\"M11.2 2l-3.2-2-3.2 2z\"/><path d=\"M13 3h-10v4.9l3.4 1.7 1.6-1.2 1.6 1.2 3.4-1.7z\"/><path d=\"M16 7.6l-5.5 2.7 5.5 4.4z\"/><path d=\"M8 9.6l-8 6.4h16z\"/><path d=\"M5.5 10.3l-5.5-2.7v7.1z\"/></g>\n<g id=\"envelope\"><path d=\"M0 3h16v2.4l-8 4-8-4z\"/><path d=\"M0 14l5.5-4.8 2.5 1.4 2.5-1.4 5.5 4.8z\"/><path d=\"M4.6 8.8l-4.6-2.3v6.5z\"/><path d=\"M11.4 8.8l4.6-2.3v6.5z\"/></g>\n<g id=\"envelopes-o\"><path d=\"M14 2h-14v10h14v-10zM5.71 8l1.29 0.55 1.29-0.55 4.71 3h-12zM1 9.83v-4l3.64 1.63zM9.36 7.46l3.64-1.68v4zM13 3v1.68l-6 2.77-6-2.77v-1.68h12z\"/><path d=\"M15 4v9h-13v1h14v-10h-1z\"/></g>\n<g id=\"envelopes\"><path d=\"M16 14h-14v-1h13v-9h1v10z\"/><path d=\"M14 10.77v-5.48l-4.68 2.18 4.68 3.3z\"/><path d=\"M8.28 7.96l-1.28 0.59-1.28-0.59-5.72 4.030v0.010l14-0.010-5.72-4.030z\"/><path d=\"M7 7.45l7-3.27v-2.18h-14v2.18l7 3.27z\"/><path d=\"M4.68 7.47l-4.68-2.18v5.48l4.68-3.3z\"/></g>\n<g id=\"eraser\"><path d=\"M8.1 14l6.4-7.2c0.6-0.7 0.6-1.8-0.1-2.5l-2.7-2.7c-0.3-0.4-0.8-0.6-1.3-0.6h-1.8c-0.5 0-1 0.2-1.4 0.6l-6.7 7.6c-0.6 0.7-0.6 1.9 0.1 2.5l2.7 2.7c0.3 0.4 0.8 0.6 1.3 0.6h11.4v-1h-7.9zM6.8 13.9c0 0 0-0.1 0 0l-2.7-2.7c-0.4-0.4-0.4-0.9 0-1.3l3.4-3.9h-1l-3 3.3c-0.6 0.7-0.6 1.7 0.1 2.4l2.3 2.3h-1.3c-0.2 0-0.4-0.1-0.6-0.2l-2.8-2.8c-0.3-0.3-0.3-0.8 0-1.1l3.5-3.9h1.8l3.5-4h1l-3.5 4 3.1 3.7-3.5 4c-0.1 0.1-0.2 0.1-0.3 0.2z\"/></g>\n<g id=\"esc-a\"><path d=\"M8 12c-0.726-0.029-1.409-0.177-2.043-0.425l0.403-0.915c0.435 0.202 0.945 0.319 1.482 0.319 0.326 0 0.643-0.043 0.943-0.125 0.121-0.109 0.215-0.285 0.215-0.484 0-0 0-0 0-0 0.070-0.43-0.22-0.62-1.17-1-0.83-0.29-2.040-0.76-1.83-2.080 0.072-0.594 0.46-1.082 0.989-1.296 0.223-0.053 0.466-0.081 0.715-0.081 0.724 0 1.393 0.235 1.934 0.633l-0.569 0.754c-0.366-0.248-0.817-0.396-1.302-0.396-0.123 0-0.243 0.009-0.361 0.028-0.215 0.084-0.377 0.296-0.387 0.547-0.080 0.401 0.14 0.581 1.15 1.001 0.85 0.33 2 0.77 1.8 2.080-0.067 0.511-0.364 0.94-0.782 1.186-0.323 0.163-0.696 0.256-1.090 0.256-0.034 0-0.069-0.001-0.103-0.002z\"/><path d=\"M13.71 12c-0.027 0.001-0.058 0.001-0.089 0.001-0.583 0-1.124-0.18-1.57-0.488-0.646-0.548-1.059-1.37-1.059-2.289 0-0.079 0.003-0.157 0.009-0.235-0.011-0.079-0.016-0.183-0.016-0.288 0-0.899 0.413-1.701 1.060-2.228 0.5-0.282 1.091-0.446 1.72-0.446 0.443 0 0.868 0.081 1.259 0.23l-0.374 0.922c-0.276-0.111-0.595-0.176-0.93-0.176-0.388 0-0.756 0.087-1.086 0.242-0.395 0.361-0.652 0.893-0.652 1.485 0 0.095 0.007 0.188 0.019 0.279-0.010 0.063-0.016 0.148-0.016 0.234 0 0.599 0.255 1.138 0.663 1.514 0.346 0.177 0.754 0.28 1.185 0.28 0.292 0 0.573-0.047 0.835-0.134l0.331 0.905c-0.383 0.121-0.823 0.19-1.279 0.19-0.004 0-0.008 0-0.012-0z\"/><path d=\"M5 4v-1h-4v9h4v-1h-3v-3h3v-1h-3v-3h3z\"/></g>\n<g id=\"esc\"><path d=\"M0 0v16h16v-16h-16zM5 4h-3v3h3v1h-3v3h3v1h-4v-9h4v1zM10 10.54c-0.067 0.511-0.364 0.94-0.782 1.186-0.333 0.175-0.719 0.276-1.129 0.276-0.031 0-0.062-0.001-0.093-0.002-0.722-0.029-1.405-0.177-2.038-0.425l0.403-0.915c0.435 0.202 0.945 0.319 1.482 0.319 0.326 0 0.643-0.043 0.943-0.125 0.121-0.109 0.215-0.285 0.215-0.484 0-0 0-0 0-0 0.070-0.43-0.22-0.62-1.17-1-0.83-0.29-2.040-0.76-1.83-2.080 0.072-0.594 0.46-1.082 0.989-1.296 0.223-0.053 0.466-0.081 0.715-0.081 0.724 0 1.393 0.235 1.934 0.633l-0.569 0.754c-0.366-0.248-0.817-0.396-1.302-0.396-0.123 0-0.243 0.009-0.361 0.028-0.215 0.084-0.377 0.296-0.387 0.547-0.080 0.401 0.14 0.581 1.15 1.001 0.83 0.3 2.020 0.75 1.83 2.060zM12.67 10.72c0.345 0.176 0.752 0.279 1.183 0.279 0.292 0 0.573-0.047 0.835-0.134l0.311 0.945c-0.383 0.121-0.823 0.19-1.279 0.19-0 0-0.001 0-0.001 0-0.027 0.001-0.058 0.001-0.089 0.001-0.583 0-1.124-0.18-1.57-0.488-0.651-0.548-1.069-1.374-1.069-2.297 0-0.076 0.003-0.152 0.008-0.227-0.010-0.079-0.016-0.183-0.016-0.288 0-0.899 0.413-1.701 1.060-2.228 0.5-0.282 1.091-0.446 1.72-0.446 0.443 0 0.868 0.081 1.259 0.23l-0.374 0.922c-0.276-0.111-0.595-0.176-0.93-0.176-0.388 0-0.756 0.087-1.086 0.242-0.395 0.361-0.652 0.893-0.652 1.485 0 0.095 0.007 0.188 0.019 0.279-0.008 0.055-0.013 0.13-0.013 0.206 0 0.592 0.25 1.126 0.65 1.502z\"/></g>\n<g id=\"euro\"><path d=\"M10.89 3c1.166 0.009 2.244 0.383 3.127 1.011l-0.017-2.321c-0.918-0.433-1.994-0.686-3.129-0.686-3.606 0-6.616 2.551-7.323 5.947l-1.548 0.049v1h1.41c0 0.17 0 0.33 0 0.5-0.005 0.075-0.008 0.162-0.008 0.25s0.003 0.175 0.008 0.262l-1.411-0.012v1h1.54c0.882 3.353 3.805 5.818 7.331 5.999 1.149-0.002 2.218-0.256 3.175-0.708l-0.045-2.291c-0.866 0.617-1.944 0.991-3.108 1-2.461-0.128-4.512-1.744-5.28-3.959l6.388-0.041v-1h-6.59c-0.006-0.075-0.009-0.162-0.009-0.25s0.003-0.175 0.010-0.261c-0.001-0.159-0.001-0.319-0.001-0.489h6.59v-1h-6.4c0.678-2.325 2.788-3.996 5.29-4z\"/></g>\n<g id=\"exchange\"><path d=\"M16 5v2h-13v2l-3-3 3-3v2z\"/><path d=\"M0 12v-2h13v-2l3 3-3 3v-2z\"/></g>\n<g id=\"exclamation-circle-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M7 3h2v7h-2v-7z\"/><path d=\"M7 11h2v2h-2v-2z\"/></g>\n<g id=\"exclamation-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM9 13h-2v-2h2v2zM9 10h-2v-7h2v7z\"/></g>\n<g id=\"exclamation\"><path d=\"M6 0h4v4l-1 7h-2l-1-7z\"/><path d=\"M10 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/></g>\n<g id=\"exit-o\"><path d=\"M10 0c1.1 0 2 0.9 2 2 0 0.9-0.6 1.7-1.5 1.9 0 0 0 0.1 0 0.1 0.4 0 0.7 0.2 1 0.5l1.3 1.3c0.1 0.1 0.3 0.2 0.5 0.2h1.7v-6h-5z\"/><path d=\"M11.8 14.5l-3.8-4.5v2.5c0 0.8-0.7 1.5-1.5 1.5h-3.5c-0.6 0-1-0.4-1-1s0.4-1 1-1h2.5c0.3 0 0.5-0.2 0.5-0.5v-2c0-0.7 0.1-1.3 0.4-2l0.7-1.5h-0.8c-0.5 0-0.9 0.2-1.2 0.6l-0.5 0.7c-0.2 0.4-0.7 0.5-1.2 0.3-0.4-0.3-0.6-0.9-0.2-1.3l0.6-0.8c0.7-1 1.9-1.5 3.1-1.5h2l0.1-0.3c-0.6-0.3-1-1-1-1.7 0-1.1 0.9-2 2-2h-7v4.9l-0.6 0.8c-0.3 0.4-0.5 0.9-0.4 1.5 0.1 0.5 0.4 1 0.9 1.3 0 0 0 0 0 0v2.5c-1.1 0-2 0.9-2 2s0.9 2 2 2v1h11.6c-1.1 0-2.1-0.6-2.7-1.5z\"/><path d=\"M11.4 7.3l-0.7-0.8-0.6 1.5c-0.2 0.5-0.3 0.9 0 1.3l4.9 6.1v-7.4h-2.1c-0.6 0-1.1-0.2-1.5-0.7z\"/></g>\n<g id=\"exit\"><path d=\"M14 6h-1.7c-0.2 0-0.4-0.1-0.6-0.2l-1.3-1.3c-0.2-0.3-0.6-0.5-1.1-0.5h-0.3c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2c0 0.7 0.4 1.4 1 1.7l-0.2 0.3h-2c-1.1 0-2.3 0.5-3 1.5l-0.6 0.8c-0.4 0.4-0.2 1 0.2 1.3 0.4 0.2 0.9 0.1 1.2-0.3l0.5-0.7c0.3-0.4 0.7-0.6 1.2-0.6h0.8l-0.7 1.6c-0.3 0.6-0.4 1.2-0.4 1.9v2c0 0.3-0.2 0.5-0.5 0.5h-2.5c-0.6 0-1 0.4-1 1s0.4 1 1 1h3.5c0.8 0 1.5-0.7 1.5-1.5v-2.5l3.8 4.5c0.6 0.9 1.7 1.5 2.8 1.5h0.9l-5.4-6.7c-0.3-0.4-0.2-0.8 0-1.3l0.6-1.5 0.7 0.8c0.4 0.4 1 0.7 1.6 0.7h2c0.6 0 1-0.4 1-1s-0.4-1-1-1z\"/></g>\n<g id=\"expand-full\"><path d=\"M5.3 6.7l1.4-1.4-3-3 1.3-1.3h-4v4l1.3-1.3z\"/><path d=\"M6.7 10.7l-1.4-1.4-3 3-1.3-1.3v4h4l-1.3-1.3z\"/><path d=\"M10.7 9.3l-1.4 1.4 3 3-1.3 1.3h4v-4l-1.3 1.3z\"/><path d=\"M11 1l1.3 1.3-3 3 1.4 1.4 3-3 1.3 1.3v-4z\"/></g>\n<g id=\"expand-square\"><path d=\"M11 2h-9v9l1-1v-7h7z\"/><path d=\"M5 14h9v-9l-1 1v7h-7z\"/><path d=\"M16 0h-5l1.8 1.8-4.5 4.5 1.4 1.4 4.5-4.5 1.8 1.8z\"/><path d=\"M7.7 9.7l-1.4-1.4-4.5 4.5-1.8-1.8v5h5l-1.8-1.8z\"/></g>\n<g id=\"expand\"><path d=\"M15 1h-4l1.3 1.3-4.5 4.5 1.4 1.4 4.5-4.5 1.3 1.3z\"/><path d=\"M6.8 7.8l-4.5 4.5-1.3-1.3v4h4l-1.3-1.3 4.5-4.5z\"/></g>\n<g id=\"external-browser\"><path d=\"M11 10l-2.9-3.2-3.3 3.2h2.2v1.8c0 1.7-0.9 4.2-4 4.2 4.8 0 6-1.4 6-4.3v-1.7h2z\"/><path d=\"M0 0v13h6v-1h-5v-9h14v9h-5v1h6v-13h-16zM2 2h-1v-1h1v1zM13 2h-10v-1h10v1z\"/></g>\n<g id=\"external-link\"><path d=\"M14 16v-11l-1 1v9h-12v-12h9l1-1h-11v14z\"/><path d=\"M16 0h-5l1.8 1.8-6.8 6.8 1.4 1.4 6.8-6.8 1.8 1.8z\"/></g>\n<g id=\"eye-slash\"><path d=\"M12.9 5.2l-0.8 0.8c1.7 0.9 2.5 2.3 2.8 3-0.7 0.9-2.8 3.1-7 3.1-0.7 0-1.2-0.1-1.8-0.2l-0.8 0.8c0.8 0.3 1.7 0.4 2.6 0.4 5.7 0 8.1-4 8.1-4s-0.6-2.4-3.1-3.9z\"/><path d=\"M12 7.1c0-0.3 0-0.6-0.1-0.8l-4.8 4.7c0.3 0 0.6 0.1 0.9 0.1 2.2 0 4-1.8 4-4z\"/><path d=\"M15.3 0l-4.4 4.4c-0.8-0.2-1.8-0.4-2.9-0.4-6.7 0-8 5.1-8 5.1s1 1.8 3.3 3l-3.3 3.2v0.7h0.7l15.3-15.3v-0.7h-0.7zM4 11.3c-1.6-0.7-2.5-1.8-2.9-2.3 0.3-0.7 1.1-2.2 3.1-3.2-0.1 0.4-0.2 0.8-0.2 1.3 0 1.1 0.5 2.2 1.3 2.9l-1.3 1.3zM6.2 7.9l-1 0.2c0 0-0.3-0.5-0.3-1.2 0-0.8 0.4-1.5 0.4-1.5 0.5-0.3 1.3-0.3 1.3-0.3s-0.5 0.9-0.5 1.7c-0.1 0.7 0.1 1.1 0.1 1.1z\"/></g>\n<g id=\"eye\"><path d=\"M8 3.9c-6.7 0-8 5.1-8 5.1s2.2 4.1 7.9 4.1 8.1-4 8.1-4-1.3-5.2-8-5.2zM5.3 5.4c0.5-0.3 1.3-0.3 1.3-0.3s-0.5 0.9-0.5 1.6c0 0.7 0.2 1.1 0.2 1.1l-1.1 0.2c0 0-0.3-0.5-0.3-1.2 0-0.8 0.4-1.4 0.4-1.4zM7.9 12.1c-4.1 0-6.2-2.3-6.8-3.2 0.3-0.7 1.1-2.2 3.1-3.2-0.1 0.4-0.2 0.8-0.2 1.3 0 2.2 1.8 4 4 4s4-1.8 4-4c0-0.5-0.1-0.9-0.2-1.3 2 0.9 2.8 2.5 3.1 3.2-0.7 0.9-2.8 3.2-7 3.2z\"/></g>\n<g id=\"eyedropper\"><path d=\"M15 1c-1.8-1.8-3.7-0.7-4.6 0.1-0.4 0.4-0.7 0.9-0.7 1.5v0c0 1.1-1.1 1.8-2.1 1.5l-0.1-0.1-0.7 0.8 0.7 0.7-6 6-0.8 2.3-0.7 0.7 1.5 1.5 0.8-0.8 2.3-0.8 6-6 0.7 0.7 0.7-0.6-0.1-0.2c-0.3-1 0.4-2.1 1.5-2.1v0c0.6 0 1.1-0.2 1.4-0.6 0.9-0.9 2-2.8 0.2-4.6zM3.9 13.6l-2 0.7-0.2 0.1 0.1-0.2 0.7-2 5.8-5.8 1.5 1.5-5.9 5.7z\"/></g>\n<g id=\"facebook-square\"><path d=\"M0 0v16h16v-16h-16zM12.9 8.4h-2.1v5.6h-2.1v-5.6h-1.5v-2h1.5c0 0 0-0.8 0-1.7 0-1.5 0.9-2.7 2.9-2.7 0.8 0 1.4 0.1 1.4 0.1v1.9c0 0-0.6 0-1.3 0s-0.8 0.3-0.8 0.9c0 0.1 0 0.1 0 0.1 0 0.2 0 0.5 0 1.4h2.1l-0.1 2z\"/></g>\n<g id=\"facebook\"><path d=\"M7.2 16v-7.5h-2v-2.7h2c0 0 0-1.1 0-2.3 0-1.8 1.2-3.5 3.9-3.5 1.1 0 1.9 0.1 1.9 0.1l-0.1 2.5c0 0-0.8 0-1.7 0-1 0-1.1 0.4-1.1 1.2 0 0.6 0-1.3 0 2h2.9l-0.1 2.7h-2.8v7.5h-2.9z\"/></g>\n<g id=\"factory\"><path d=\"M4.4 1.3c-0.6 0.3-0.8 1.1-0.4 1.5 0.5-0.9 1.3-0.6 2.5 0.4 0.8 0.7 1.9 0.1 1.9 0.1s0.2 1.2 1.7 1.4c1.7 0.2 2.3-0.8 2.3-0.8s0.4 1 1.9 0.4c1.1-0.4 0.7-1.1 0.7-1.1s1 0 1-0.7c0-0.9-1.1-0.8-1.1-0.8s0.2-1-0.9-1.1c-1-0.1-1.3 0.5-1.3 0.5s-0.3-1.1-1.8-1.1c-1.4 0-1.9 1.3-1.9 1.3s-0.4-0.6-1.6-0.6c-0.9 0-1.3 0.7-1.3 0.7s-1.1-0.5-1.7-0.1z\"/><path d=\"M12 12.1v-2.1l-4 2.1v-2.1h-2.4l-0.6-7h-2l-0.6 7h-2.4v6h16v-6l-4 2.1zM6 14h-4v-2h4v2z\"/></g>\n<g id=\"family\"><path d=\"M9.5 7.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z\"/><path d=\"M14.27 4h-2.54c0 0 0 0 0 0-0.955 0-1.73 0.775-1.73 1.73v3.27c0 0.552 0.448 1 1 1v6h4v-6c0.552 0 1-0.448 1-1v-3.27c0-0.955-0.775-1.73-1.73-1.73 0 0 0 0 0 0z\"/><path d=\"M15 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M4.27 5h-2.54c-0.955 0-1.73 0.775-1.73 1.73s0.775 1.73 1.73 1.73c0.955 0 1.73-0.775 1.73-1.73s-0.775-1.73-1.73-1.73c-0.955 0-1.73 0.775-1.73 1.73v2.27c0 0.552 0.448 1 1 1l-1 3h1v3h4v-3h1l-1-3c0.552 0 1-0.448 1-1v-2.27c0-0.955-0.775-1.73-1.73-1.73 0 0 0 0 0 0z\"/><path d=\"M5 3c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M7 13v3h2v-3c0.552 0 1-0.448 1-1v-1.54c0-0.806-0.654-1.46-1.46-1.46 0 0 0 0 0 0h-1.080c-0.806 0-1.46 0.654-1.46 1.46 0 0 0 0 0 0v1.54c0 0.552 0.448 1 1 1z\"/></g>\n<g id=\"fast-backward\"><path d=\"M16 15v-14l-7 7z\"/><path d=\"M9 15v-14l-7 7z\"/><path d=\"M0 1h2v14h-2v-14z\"/></g>\n<g id=\"fast-forward\"><path d=\"M0 1v14l7-7z\"/><path d=\"M7 1v14l7-7z\"/><path d=\"M14 1h2v14h-2v-14z\"/></g>\n<g id=\"female\"><path d=\"M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M10 8v-1.5l1.8 1.8c0.3 0.3 0.7 0.3 1 0s0.3-0.8 0-1l-2.6-2.6c-0.4-0.5-1-0.7-1.7-0.7h-1c-0.7 0-1.3 0.2-1.7 0.7l-2.6 2.6c-0.3 0.3-0.3 0.8 0 1 0.3 0.3 0.7 0.3 1 0l1.8-1.8v1.5l-4 5h4v3h4v-3h4l-4-5z\"/></g>\n<g id=\"file-add\"><path d=\"M12 15h-10v-14h6v4h4v1h1v-2l-4-4h-8v16h12v-2h-1v1zM9 1l3 3h-3v-3z\"/><path d=\"M13 7h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z\"/></g>\n<g id=\"file-code\"><path d=\"M10 0h-8v16h12v-12l-4-4zM9 5h4v10h-10v-14h6v4zM10 4v-3l3 3h-3z\"/><path d=\"M6.2 13h-0.7l-2-2.5 2-2.5h0.7l-2 2.5z\"/><path d=\"M9.8 13h0.7l2-2.5-2-2.5h-0.7l2 2.5z\"/><path d=\"M6.7 14h0.6l2.1-7h-0.8z\"/></g>\n<g id=\"file-font\"><path d=\"M10 0h-8v16h12v-12l-4-4zM9 5h4v10h-10v-14h6v4zM10 4v-3l3 3h-3z\"/><path d=\"M5 7v2h2v5h2v-5h2v-2z\"/></g>\n<g id=\"file-movie\"><path d=\"M10 0h-8v16h12v-12l-4-4zM9 5h4v10h-10v-14h6v4zM10 4v-3l3 3h-3z\"/><path d=\"M10 10v-2h-6v5h6v-2l2 2v-5z\"/></g>\n<g id=\"file-o\"><path d=\"M10 0h-8v16h12v-12l-4-4zM9 5h4v10h-10v-14h6v4zM10 4v-3l3 3h-3z\"/></g>\n<g id=\"file-picture\"><path d=\"M10 0h-8v16h12v-12l-4-4zM9 5h4v10h-10v-14h6v4zM10 4v-3l3 3h-3z\"/><path d=\"M4 11.5v2.5h8v-1.7c0 0 0.1-1.3-1.3-1.5-1.3-0.2-1.5 0.4-2.5 0.5-0.8 0-0.6-1.3-2.2-1.3-1.2 0-2 1.5-2 1.5z\"/><path d=\"M12 8.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z\"/></g>\n<g id=\"file-presentation\"><path d=\"M10 0h-8v16h12v-12l-4-4zM13 15h-10v-14h6v4h4v10zM10 4v-3l3 3h-3z\"/><path d=\"M9 6h-2v1h-3v6h2v1h1v-1h2v1h1v-1h2v-6h-3v-1zM11 8v4h-6v-4h6z\"/><path d=\"M7 9v2l2-1z\"/></g>\n<g id=\"file-process\"><path d=\"M12 0h-7v6h0.7l0.2 0.7 0.1 0.1v-5.8h5v4h4v9h-6l0.3 0.5-0.5 0.5h7.2v-11l-4-4zM12 4v-3l3 3h-3z\"/><path d=\"M5.5 11.5c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M7.9 12.4l1.1-0.4v-1l-1.1-0.4c-0.1-0.3-0.2-0.6-0.4-0.9l0.5-1-0.7-0.7-1 0.5c-0.3-0.2-0.6-0.3-0.9-0.4l-0.4-1.1h-1l-0.4 1.1c-0.3 0.1-0.6 0.2-0.9 0.4l-1-0.5-0.7 0.7 0.5 1.1c-0.2 0.3-0.3 0.6-0.4 0.9l-1.1 0.3v1l1.1 0.4c0.1 0.3 0.2 0.6 0.4 0.9l-0.5 1 0.7 0.7 1.1-0.5c0.3 0.2 0.6 0.3 0.9 0.4l0.3 1.1h1l0.4-1.1c0.3-0.1 0.6-0.2 0.9-0.4l1 0.5 0.7-0.7-0.5-1.1c0.2-0.2 0.3-0.5 0.4-0.8zM4.5 13.5c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2c0 1.1-0.9 2-2 2z\"/></g>\n<g id=\"file-refresh\"><path d=\"M10 0h-8v16h12v-12l-4-4zM13 15h-10v-14h6v4h4v10zM10 4v-3l3 3h-3z\"/><path d=\"M4.7 7.7l-0.7-0.7v3h3l-1.2-1.2c0.4-0.8 1.3-1.3 2.2-1.3 1.4 0 2.5 1.1 2.5 2.5h1.5c0-2.2-1.8-4-4-4-1.3 0-2.5 0.7-3.3 1.7z\"/><path d=\"M9.8 11.8c-0.5 0.5-1.1 0.8-1.8 0.7-1 0-1.9-0.6-2.3-1.5h-1.6c0.4 1.7 2 3 3.8 3 1.1 0 2.1-0.5 2.8-1.2l1.3 1.2v-3h-3l0.8 0.8z\"/></g>\n<g id=\"file-remove\"><path d=\"M12 15h-10v-14h6v4h4v2.59l1-1v-2.59l-4-4h-8v16h12v-2.59l-1-1v2.59zM9 1l3 3h-3v-3z\"/><path d=\"M15 8l-1-1-2 2-2-2-1 1 2 2-2 2 1 1 2-2 2 2 1-1-2-2 2-2z\"/></g>\n<g id=\"file-search\"><path d=\"M12 13.47v1.53h-10v-14h6v4h4v0.56c0.386 0.229 0.716 0.504 0.996 0.825l0.004-2.385-4-4h-8v16h12v-1.53zM9 1l3 3h-3v-3z\"/><path d=\"M14.78 12.72l-1.92-1.92c-0.089-0.085-0.201-0.148-0.325-0.179 0.292-0.458 0.468-1.018 0.468-1.618 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.657 1.343 3 3 3 0.6 0 1.16-0.176 1.629-0.48 0.020 0.136 0.083 0.248 0.169 0.337l1.92 1.92c0.134 0.125 0.313 0.201 0.511 0.201 0.414 0 0.75-0.336 0.75-0.75 0-0.198-0.077-0.378-0.202-0.512zM10 11c-1.105 0-2-0.895-2-2s0.895-2 2-2c1.105 0 2 0.895 2 2s-0.895 2-2 2z\"/></g>\n<g id=\"file-sound\"><path d=\"M11.4 10.5c0 1.2-0.4 2.2-1 3l0.4 0.5c0.7-0.9 1.2-2.1 1.2-3.5s-0.5-2.6-1.2-3.5l-0.4 0.5c0.6 0.8 1 1.9 1 3z\"/><path d=\"M9.9 8l-0.4 0.5c0.4 0.5 0.7 1.2 0.7 2s-0.3 1.5-0.7 2l0.4 0.5c0.5-0.6 0.8-1.5 0.8-2.5s-0.3-1.8-0.8-2.5z\"/><path d=\"M9.1 9l-0.4 0.5c0.2 0.3 0.3 0.6 0.3 1s-0.1 0.7-0.3 1l0.4 0.5c0.3-0.4 0.5-0.9 0.5-1.5s-0.2-1.1-0.5-1.5z\"/><path d=\"M10 0h-8v16h12v-12l-4-4zM9 5h4v10h-10v-14h6v4zM10 4v-3l3 3h-3z\"/><path d=\"M6 9h-2v3h2l2 2v-7z\"/></g>\n<g id=\"file-start\"><path d=\"M10 0h-8v16h12v-12l-4-4zM13 15h-10v-14h6v4h4v10zM10 4v-3l3 3h-3z\"/><path d=\"M5 6v6l6-3z\"/></g>\n<g id=\"file-table\"><path d=\"M10 0h-8v16h12v-12l-4-4zM9 5h4v10h-10v-14h6v4zM10 4v-3l3 3h-3z\"/><path d=\"M4 7v6h8v-6h-8zM6 12h-1v-1h1v1zM6 10h-1v-1h1v1zM9 12h-2v-1h2v1zM9 10h-2v-1h2v1zM11 12h-1v-1h1v1zM11 10h-1v-1h1v1z\"/></g>\n<g id=\"file-text-o\"><path d=\"M10 0h-8v16h12v-12l-4-4zM9 5h4v10h-10v-14h6v4zM10 4v-3l3 3h-3z\"/><path d=\"M4 7h8v1h-8v-1z\"/><path d=\"M4 9h8v1h-8v-1z\"/><path d=\"M4 11h8v1h-8v-1z\"/></g>\n<g id=\"file-text\"><path d=\"M10 0v4h4z\"/><path d=\"M9 0h-7v16h12v-11h-5v-5zM12 12h-8v-1h8v1zM12 10h-8v-1h8v1zM12 7v1h-8v-1h8z\"/></g>\n<g id=\"file-tree-small\"><path d=\"M5 12v2h11v-5h-11v2h-2v-4h9v-5h-12v5h2v5z\"/></g>\n<g id=\"file-tree-sub\"><path d=\"M8 11v1h-1v-2h5v-4h-8v1h-1v-2h6v-4h-9v4h2v3h2v2h2v3h2v2h8v-4z\"/></g>\n<g id=\"file-tree\"><path d=\"M16 10v-4h-11v1h-2v-3h9v-4h-12v4h2v10h3v2h11v-4h-11v1h-2v-5h2v2z\"/></g>\n<g id=\"file-zip\"><path d=\"M10 0h-8v16h12v-12l-4-4zM9 15h-4v-2.8l0.7-2.2h2.4l0.9 2.2v2.8zM13 15h-3v-3l-1-3h-2v-1h-2v1l-1 3v3h-1v-14h4v1h2v1h-2v1h2v1h4v10zM10 4v-3l3 3h-3z\"/><path d=\"M5 6h2v1h-2v-1z\"/><path d=\"M5 2h2v1h-2v-1z\"/><path d=\"M5 4h2v1h-2v-1z\"/><path d=\"M7 5h2v1h-2v-1z\"/><path d=\"M7 7h2v1h-2v-1z\"/><path d=\"M6 12h2v2h-2v-2z\"/></g>\n<g id=\"file\"><path d=\"M9 5h5v11h-12v-16h7v5zM10 4v-4l4 4h-4z\"/></g>\n<g id=\"fill\"><path d=\"M13 14.5c0.468-2.207 0.985-4.050 1.604-5.846 0.411 1.796 0.928 3.638 1.337 5.521 0.059 1.153-0.612 1.825-1.441 1.825s-1.5-0.672-1.5-1.5z\"/><path d=\"M8 1l-1.44 1.44-2-2c-0.276-0.262-0.649-0.423-1.060-0.423s-0.784 0.161-1.061 0.423c-0.27 0.271-0.438 0.645-0.438 1.059s0.168 0.789 0.439 1.060l2 2-4.44 4.44 7 7 8-8zM8 2.41l5.59 5.59h-11.18l2.75-2.75c0.071 0.042 0.156 0.067 0.247 0.067 0.271 0 0.49-0.219 0.49-0.49 0-0.091-0.025-0.176-0.068-0.249l0.721-0.718 1.54 1.53c0.091 0.091 0.216 0.147 0.355 0.147 0.277 0 0.502-0.225 0.502-0.502 0-0.139-0.056-0.264-0.147-0.355l-1.53-1.53zM3.15 1.85c-0.091-0.091-0.148-0.216-0.148-0.355s0.057-0.264 0.148-0.355c0.092-0.089 0.217-0.144 0.355-0.144s0.263 0.055 0.355 0.144l2 2-0.71 0.71z\"/></g>\n<g id=\"film\"><path d=\"M0 0v16h1v-1h1v1h12v-1h1v1h1v-16h-16zM2 14h-1v-1h1v1zM2 12h-1v-1h1v1zM2 10h-1v-1h1v1zM2 8h-1v-1h1v1zM2 6h-1v-1h1v1zM2 4h-1v-1h1v1zM2 2h-1v-1h1v1zM13 15h-10v-6h10v6zM13 7h-10v-6h10v6zM15 14h-1v-1h1v1zM15 12h-1v-1h1v1zM15 10h-1v-1h1v1zM15 8h-1v-1h1v1zM15 6h-1v-1h1v1zM15 4h-1v-1h1v1zM15 2h-1v-1h1v1z\"/></g>\n<g id=\"filter\"><path d=\"M1 2h14v2l-6 5v7l-2-2v-5l-6-5v-2z\"/><path d=\"M1 0h14v1h-14v-1z\"/></g>\n<g id=\"fire\"><path d=\"M4.9 15.8c0 0-3.9-0.4-3.9-5.7 0-4.1 3.1-6.5 3.1-6.5s1.3 1.4 2.3 1.9c1 0.6 1.4-5.5 1.4-5.5s7.2 3.9 7.2 9.8c0 6.1-4 5.9-4 5.9s1.8-2.4 1.8-5.2c0-3-3.9-6.7-3.9-6.7s-0.5 4.4-2.1 5c-1.6-0.9-2.5-2.3-2.5-2.3s-3.7 5.8 0.6 9.3z\"/><path d=\"M8.2 16.1c-2-0.1-3.7-1.4-3.7-3.2s0.7-2.6 0.7-2.6 0.5 1 1.1 1.5 1.8 0.8 2.4 0.1c0.6-0.6 0.8-2.3 0.8-2.3s1.4 1.1 1.2 3c-0.1 2-0.9 3.5-2.5 3.5z\"/></g>\n<g id=\"flag-checkered\"><path d=\"M2 0c-1.1 0-2 0.9-2 2 0 0.7 0.4 1.4 1 1.7v12.3h2v-12.3c0.6-0.3 1-1 1-1.7 0-1.1-0.9-2-2-2z\"/><path d=\"M12 2c-2.1 0-1.8-1-4.4-1s-3.6 3-3.6 3v8c0 0 0.7-2 3-2 2.7 0 2.8 1 5 1 3.3 0 4-2 4-2v-8c0 0-1.6 1-4 1zM15 4.5c-0.2 0.2-0.8 0.4-2 0.6v-2.2c0.8-0.1 1.5-0.2 2-0.4v2zM5 7.9v-2.6c0.4-0.6 1.1-1.1 2-1.1v-2.1c0.2-0.1 0.4-0.1 0.6-0.1 1.2 0 1.6 0.2 2.1 0.4 0.1 0.1 0.2 0.2 0.3 0.2v2.2c0.5 0.2 1.1 0.4 2 0.4 0.4 0 0.7 0 1-0.1v2.6c-0.3 0-0.6 0.1-1 0.1-1.1 0-1.5-0.2-2-0.5v2.3c-0.7-0.3-1.5-0.6-3-0.6v-2.2c-0.9 0.2-1.5 0.6-2 1.1zM13 9.9v-2.2c1.1-0.2 1.7-0.6 2-0.8v1.8c-0.2 0.3-0.7 1-2 1.2z\"/><path d=\"M10 7.2v-2.4c0 0-1.2-0.6-3-0.6v2.6c1.7-0.4 3 0.4 3 0.4z\"/></g>\n<g id=\"flag-o\"><path d=\"M4 2c0-1.1-0.9-2-2-2s-2 0.9-2 2c0 0.7 0.4 1.4 1 1.7v12.3h2v-12.3c0.6-0.3 1-1 1-1.7z\"/><path d=\"M7.6 2c1.2 0 1.6 0.2 2.1 0.4 0.5 0.3 1.1 0.6 2.3 0.6s2.2-0.2 3-0.5v6.3c-0.2 0.3-0.9 1.2-3 1.2-0.9 0-1.3-0.2-1.9-0.4-0.7-0.3-1.5-0.6-3.1-0.6-0.8 0-1.5 0.2-2 0.5v-5.3c0.2-0.5 1-2.2 2.6-2.2zM16 1c0 0-1.6 1-4 1-2.1 0-1.8-1-4.4-1s-3.6 3-3.6 3v8c0 0 0.7-2 3-2 2.7 0 2.8 1 5 1 3.3 0 4-2 4-2v-8z\"/></g>\n<g id=\"flag\"><path d=\"M4 2c0-1.1-0.9-2-2-2s-2 0.9-2 2c0 0.7 0.4 1.4 1 1.7v12.3h2v-12.3c0.6-0.3 1-1 1-1.7z\"/><path d=\"M4 4c0 0 1-3 3.6-3 2.7 0 2.3 1 4.4 1 2.4 0 4-1 4-1v8c0 0-0.7 2-4 2-2.2 0-2.3-1-5-1-2.3 0-3 2-3 2v-8z\"/></g>\n<g id=\"flash\"><path d=\"M16 8l-2.2-1.6 1.1-2.4-2.7-0.2-0.2-2.7-2.4 1.1-1.6-2.2-1.6 2.2-2.4-1.1-0.2 2.7-2.7 0.2 1.1 2.4-2.2 1.6 2.2 1.6-1.1 2.4 2.7 0.2 0.2 2.7 2.4-1.1 1.6 2.2 1.6-2.2 2.4 1.1 0.2-2.7 2.7-0.2-1.1-2.4 2.2-1.6z\"/></g>\n<g id=\"flask\"><path d=\"M2 16h12l-4-8v-7h1v-1h-6v1h1v7l-4 8zM9 1v7.2l1.9 3.8h-5.8l1.9-3.8v-7.2h2z\"/></g>\n<g id=\"flight-landing\"><path d=\"M13.64 7c-0.71-0.2-1.89-0.43-3.23-0.67l-3.82-4.24c-0.209-0.23-0.462-0.416-0.746-0.544l-1.194-0.546c-0.090 0-0.15 0-0.1 0.11s1.45 2.89 2.29 4.59c-1.84-0.29-3.5-0.53-4.23-0.63-0.258-0.047-0.474-0.198-0.608-0.406l-0.722-1.074c-0.115-0.168-0.28-0.294-0.474-0.358l-0.806-0.232 0.61 3.26c0.067 0.34 0.318 0.609 0.644 0.699 1.326 0.381 4.816 1.341 7.526 1.921 6 1.28 6.8 1.28 7.12 0.91s-0.67-2.38-2.26-2.79z\"/><path d=\"M0 13h16v1h-16v-1z\"/></g>\n<g id=\"flight-takeoff\"><path d=\"M12.57 2.26c-0.65 0.29-1.66 0.85-2.8 1.5l-5.46-0.76c-0.093-0.014-0.2-0.022-0.309-0.022-0.211 0-0.414 0.030-0.607 0.086l-1.185 0.336c-0.1 0-0.1 0.1 0 0.14l4.56 2c-1.54 0.92-2.91 1.76-3.51 2.14-0.13 0.082-0.288 0.13-0.458 0.13-0.094 0-0.184-0.015-0.268-0.042l-1.194-0.378c-0.086-0.031-0.186-0.049-0.29-0.049s-0.204 0.018-0.296 0.051l-0.754 0.308 2.52 2.1c0.152 0.127 0.349 0.205 0.565 0.205 0.129 0 0.251-0.028 0.361-0.077 1.204-0.538 4.374-1.998 6.734-3.228 5.24-2.78 5.82-3.26 5.82-3.7 0-0.69-2-1.4-3.43-0.74z\"/><path d=\"M0 13h16v1h-16v-1z\"/></g>\n<g id=\"flip-h\"><path d=\"M0 15l6-5-6-4.9z\"/><path d=\"M9 10.1l6 4.9v-10l-6 5.1zM14 12.9l-3.4-2.8 3.4-3v5.8z\"/><path d=\"M7 5h1v1h-1v-1z\"/><path d=\"M7 3h1v1h-1v-1z\"/><path d=\"M7 7h1v1h-1v-1z\"/><path d=\"M7 9h1v1h-1v-1z\"/><path d=\"M7 11h1v1h-1v-1z\"/><path d=\"M7 13h1v1h-1v-1z\"/><path d=\"M7 15h1v1h-1v-1z\"/><path d=\"M7.5 1v0c1.3 0 2.6 0.7 3.6 1.9l-1.1 1.1h3v-3l-1.2 1.2c-1.2-1.4-2.7-2.2-4.3-2.2 0 0 0 0 0 0-1.9 0-3.6 1-4.9 2.9l0.8 0.6c1.1-1.6 2.5-2.5 4.1-2.5z\"/></g>\n<g id=\"flip-v\"><path d=\"M1 1l5 6 4.94-6h-9.94z\"/><path d=\"M5.94 10l-4.94 6h10zM3.12 15l2.83-3.44 3 3.44h-5.83z\"/><path d=\"M10 8h1v1h-1v-1z\"/><path d=\"M12 8h1v1h-1v-1z\"/><path d=\"M8 8h1v1h-1v-1z\"/><path d=\"M6 8h1v1h-1v-1z\"/><path d=\"M4 8h1v1h-1v-1z\"/><path d=\"M2 8h1v1h-1v-1z\"/><path d=\"M0 8h1v1h-1v-1z\"/><path d=\"M15 8.47v0c-0.059 1.485-0.782 2.789-1.879 3.632l-1.121-1.102v3h3l-1.18-1.18c1.293-1.031 2.128-2.588 2.18-4.342l0-0.008c-0.092-2.083-1.223-3.883-2.884-4.905l-0.596 0.805c1.423 0.857 2.383 2.357 2.479 4.087z\"/></g>\n<g id=\"folder-add\"><path d=\"M14 6v-2h-7l-1-2h-4l-1 2h-1v11h14v-1h-13v-9h0.62l1-2h2.57l1.19 2h6.62v1h1z\"/><path d=\"M14 7h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z\"/></g>\n<g id=\"folder-o\"><path d=\"M7 4l-1-2h-4l-1 2h-1v11h16v-11h-9zM15 14h-14v-9h0.6l1-2h2.6l1.2 2h8.6v9z\"/></g>\n<g id=\"folder-open-o\"><path d=\"M14 6v-2h-7l-1-2h-4l-1 2h-1v11h14l2-9h-2zM14.9 7l-1.6 7-11.9-0.1 2.3-6.9h11.2zM1 5h0.6l1-2h2.6l1.2 2h6.6v1h-10l-2 5.9v-6.9z\"/></g>\n<g id=\"folder-open\"><path d=\"M14 6v-2h-7l-1-2h-4l-1 2h-1v9.5l3-7.5z\"/><path d=\"M3.7 7l-3.2 8h12.8l2.5-8z\"/></g>\n<g id=\"folder-remove\"><path d=\"M13 12.41v1.59h-12v-9h0.62l1-2h2.57l1.19 2h6.62v2.59l1-1v-2.59h-7l-1-2h-4l-1 2h-1v11h14v-1.59l-1-1z\"/><path d=\"M16 8l-1-1-2 2-2-2-1 1 2 2-2 2 1 1 2-2 2 2 1-1-2-2 2-2z\"/></g>\n<g id=\"folder-search\"><path d=\"M13 13.47v0.53h-12v-9h0.62l1-2h2.57l1.19 2h6.62v0.91c0.385 0.179 0.716 0.407 1.001 0.681l-0.001-2.591h-7l-1-2h-4l-1 2h-1v11h14v-0.53z\"/><path d=\"M15.78 12.72l-1.92-1.92c-0.089-0.085-0.201-0.148-0.325-0.179 0.292-0.458 0.468-1.018 0.468-1.618 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.657 1.343 3 3 3 0.6 0 1.16-0.176 1.629-0.48 0.020 0.136 0.083 0.248 0.169 0.337l1.92 1.92c0.134 0.125 0.313 0.201 0.511 0.201 0.414 0 0.75-0.336 0.75-0.75 0-0.198-0.077-0.378-0.202-0.512zM11 11c-1.105 0-2-0.895-2-2s0.895-2 2-2c1.105 0 2 0.895 2 2s-0.895 2-2 2z\"/></g>\n<g id=\"folder\"><path d=\"M16 15h-16v-11h1l1-2h4l1 2h9z\"/></g>\n<g id=\"font\"><path d=\"M12 16h3l-6-16h-2l-6 16h3l1.9-5h4.2l1.9 5zM6.7 9l1.3-3.6 1.3 3.6h-2.6z\"/></g>\n<g id=\"form\"><path d=\"M15 2v2h-9v-2h9zM16 1h-11v4h11v-4z\"/><path d=\"M0 1h4v4h-4v-4z\"/><path d=\"M15 7v2h-9v-2h9zM16 6h-11v4h11v-4z\"/><path d=\"M0 6h4v4h-4v-4z\"/><path d=\"M15 12v2h-9v-2h9zM16 11h-11v4h11v-4z\"/><path d=\"M0 11h4v4h-4v-4z\"/></g>\n<g id=\"forward\"><path d=\"M0 1v14l8-7z\"/><path d=\"M8 1v14l8-7z\"/></g>\n<g id=\"frown-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M7 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M11 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M11.3 12.3c-0.7-1.1-2-1.8-3.3-1.8s-2.6 0.7-3.3 1.8l-0.8-0.6c0.9-1.4 2.4-2.2 4.1-2.2s3.2 0.8 4.1 2.2l-0.8 0.6z\"/></g>\n<g id=\"funcion\"><path d=\"M10 0c0 0-2.1 0-2.7 3l-0.4 2h-1.9l-0.5 1h2.2l-1.4 7c-0.4 2-1.9 2-1.9 2h-1l-0.4 1h3c0 0 2.1 0 2.7-3l1.4-7h2.4l0.5-1h-2.7l0.4-2c0.4-2 1.8-2 1.8-2h1l0.5-1h-3z\"/></g>\n<g id=\"funnel\"><path d=\"M6 11h4v4h-4v-4z\"/><path d=\"M13.6 5l2.4-4h-16l2.4 4h11.2z\"/><path d=\"M3 6l2.4 4h5.2l2.4-4h-10z\"/></g>\n<g id=\"gamepad\"><path d=\"M12.16 2c-1.215 0.603-2.641 0.968-4.149 1-1.53-0.032-2.956-0.397-4.229-1.026-2.611 0.026-3.781 1.196-3.781 3.866v6c0.017 1.197 0.991 2.16 2.19 2.16 0 0 0 0 0 0h0.23c0 0 0.001 0 0.002 0 0.963 0 1.78-0.621 2.074-1.485 0.305-0.915 1.145-2.515 2.085-2.515h2.84c0.94 0 1.78 1.6 2.080 2.5 0.298 0.879 1.116 1.5 2.078 1.5 0.001 0 0.001 0 0.002 0h0.23c1.21 0 2.19-0.98 2.19-2.19v-6c0-2.64-1.17-3.81-3.84-3.81zM5 7h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1zM10.060 8.11c-0.585 0-1.060-0.475-1.060-1.060s0.475-1.060 1.060-1.060c0.585 0 1.060 0.475 1.060 1.060s-0.475 1.060-1.060 1.060zM13 8c-0.552 0-1-0.448-1-1s0.448-1 1-1c0.552 0 1 0.448 1 1s-0.448 1-1 1z\"/></g>\n<g id=\"gavel\"><path d=\"M6.4 4.1v0c-0.4-0.4-0.4-0.9-0.1-1.2l2.6-2.6c0.3-0.3 0.8-0.3 1.2 0l0.1 0.1c0.3 0.3 0.3 0.8 0 1.2l-2.6 2.5c-0.3 0.3-0.9 0.3-1.2 0z\"/><path d=\"M12 9.7v0c-0.4-0.4-0.4-0.9-0.1-1.3l2.6-2.6c0.3-0.3 0.8-0.3 1.2 0l0.1 0.1c0.3 0.3 0.3 0.8 0 1.2l-2.6 2.6c-0.4 0.3-0.9 0.3-1.2 0z\"/><path d=\"M10 7.7l-1.7-1.7c-0.4-0.4-0.4-1 0-1.4l2.3-2.3c0.4-0.4 1-0.4 1.4 0l1.7 1.7c0.4 0.4 0.4 1 0 1.4l-2.3 2.3c-0.4 0.4-1 0.4-1.4 0z\"/><path d=\"M4 14.2c0.6-0.6 4-5.6 4.5-5.3 0.4 0.2 1-0.5 1-0.5l-1.9-1.9c0 0-0.7 0.6-0.5 1 0.3 0.5-4.7 3.9-5.3 4.5 0 0-2.8 2.2-1.4 3.6s3.6-1.4 3.6-1.4z\"/></g>\n<g id=\"gift\"><path d=\"M10.1 5c2-0.3 3.9-1.1 2.2-3.6-0.7-1-1.4-1.4-2-1.4-1 0-1.7 1.1-2.3 2.2-0.6-1.1-1.3-2.2-2.3-2.2-0.6 0-1.3 0.4-2 1.4-1.8 2.5 0.2 3.3 2.2 3.6h-5.9v3h16v-3h-5.9zM10.3 1c0.1 0 0.5 0.1 1.2 1 0.5 0.7 0.6 1.1 0.5 1.3-0.2 0.3-1.3 0.7-3.3 0.8 0-0.2-0.1-0.4-0.2-0.6 0.6-1.4 1.3-2.5 1.8-2.5zM4 3.3c-0.1-0.2 0-0.6 0.5-1.3 0.7-0.9 1.1-1 1.2-1 0.5 0 1.2 1.1 1.8 2.5-0.1 0.2-0.2 0.4-0.2 0.6-2-0.1-3.1-0.5-3.3-0.8zM7 7v-2h2v2h-2z\"/><path d=\"M9 15h-2v-6h-6v7h14v-7h-6z\"/></g>\n<g id=\"glass\"><path d=\"M11 15h-2v-8l6-7h-15l6 7v8h-2c-2 0-2 1-2 1h11c0 0 0-1-2-1zM12.9 1l-1.8 2h-7.2l-1.7-2h10.7zM7 15v-8h1v8h-1z\"/></g>\n<g id=\"glasses\"><path d=\"M15.5 7h-0.5c-0.1 0-0.1 0-0.2 0-0.4-1.2-1.5-2-2.8-2s-2.4 0.9-2.8 2.1c-0.3-0.4-0.7-0.6-1.2-0.6s-0.9 0.2-1.2 0.6c-0.4-1.2-1.5-2.1-2.8-2.1s-2.4 0.9-2.8 2c-0.1 0-0.1 0-0.2 0h-0.5c-0.3 0-0.5 0.2-0.5 0.5s0.2 0.5 0.5 0.5h0.5c0 1.7 1.3 3 3 3 1.5 0 2.7-1.1 3-2.5 0 0 0 0 0 0 0.3 0 0.5-0.2 0.5-0.5s0.2-0.5 0.5-0.5 0.5 0.2 0.5 0.5c0 0.3 0.2 0.5 0.5 0.5 0 0 0 0 0 0 0.2 1.4 1.5 2.5 3 2.5 1.7 0 3-1.3 3-3h0.5c0.3 0 0.5-0.2 0.5-0.5s-0.2-0.5-0.5-0.5zM4 10c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2zM12 10c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z\"/></g>\n<g id=\"globe-wire\"><path d=\"M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM14.8 9.5c0 0.5-0.7 0.66-2 1 0.124-0.589 0.206-1.277 0.229-1.98l2.001-0.020c0 0.36-0.080 0.5-0.16 1v0zM1.2 9.5v0c-0.1-0.5-0.15-0.64-0.2-1h2c0.024 0.723 0.106 1.411 0.244 2.079-1.344-0.419-2.044-0.579-2.044-1.079zM1.2 6.5c0-0.5 0.7-0.66 2-1-0.115 0.594-0.187 1.284-0.2 1.989l-2 0.011c0-0.36 0.080-0.5 0.16-1v0zM8.5 5c1.13 0.013 2.226 0.107 3.298 0.277 0.047 0.643 0.165 1.41 0.201 2.199l-3.499 0.025v-2.5zM8.5 4v-2.94c1.17 0.27 2.2 1.47 2.84 3.15-0.836-0.116-1.819-0.192-2.817-0.21zM7.5 1.060v2.94c-1.017 0.015-2.001 0.087-2.968 0.214 0.768-1.684 1.798-2.884 2.968-3.154zM7.5 5v2.5h-3.5c0.031-0.806 0.142-1.571 0.326-2.307 0.932-0.080 2.035-0.177 3.158-0.193zM4 8.5h3.5v2.5c-1.13-0.013-2.226-0.107-3.298-0.277-0.047-0.643-0.165-1.41-0.201-2.199zM7.5 12v2.94c-1.17-0.27-2.2-1.47-2.84-3.15 0.836 0.116 1.819 0.192 2.817 0.21zM8.5 14.94v-2.94c1.017-0.015 2.001-0.087 2.968-0.214-0.768 1.684-1.798 2.884-2.968 3.154zM8.5 11v-2.5h3.5c-0.031 0.806-0.142 1.571-0.326 2.307-0.932 0.080-2.035 0.177-3.158 0.193zM15 7.5h-2c-0.024-0.723-0.106-1.411-0.244-2.079 1.354 0.399 2.014 0.559 2.014 1.079v0c0.13 0.5 0.18 0.64 0.23 1zM14.3 4.91c-0.506-0.204-1.106-0.38-1.726-0.5-0.361-1.019-0.809-1.898-1.389-2.672 1.355 0.726 2.413 1.811 3.067 3.131zM4.84 1.76c-0.568 0.752-1.019 1.631-1.305 2.581-0.699 0.189-1.299 0.365-1.874 0.593 0.751-1.39 1.823-2.475 3.139-3.156zM1.73 11.090c0.506 0.204 1.106 0.38 1.726 0.5 0.361 1.019 0.809 1.898 1.389 2.672-1.367-0.722-2.436-1.807-3.097-3.131zM11.17 14.24c0.564-0.753 1.012-1.631 1.295-2.581 0.699-0.189 1.299-0.365 1.874-0.593-0.751 1.39-1.823 2.475-3.139 3.156z\"/></g>\n<g id=\"globe\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM13.2 5.3c0.4 0 0.7 0.3 1.1 0.3-0.3 0.4-1.6 0.4-2-0.1 0.3-0.1 0.5-0.2 0.9-0.2zM1 8c0-0.4 0-0.8 0.1-1.3 0.1 0 0.2 0.1 0.3 0.1 0 0 0.1 0.1 0.1 0.2 0 0.3 0.3 0.5 0.5 0.5 0.8 0.1 1.1 0.8 1.8 1 0.2 0.1 0.1 0.3 0 0.5-0.6 0.8-0.1 1.4 0.4 1.9 0.5 0.4 0.5 0.8 0.6 1.4 0 0.7 0.1 1.5 0.4 2.2-2.5-1.2-4.2-3.6-4.2-6.5zM8 15c-0.7 0-1.5-0.1-2.1-0.3-0.1-0.2-0.1-0.4 0-0.6 0.4-0.8 0.8-1.5 1.3-2.2 0.2-0.2 0.4-0.4 0.4-0.7 0-0.2 0.1-0.5 0.2-0.7 0.3-0.5 0.2-0.8-0.2-0.9-0.8-0.2-1.2-0.9-1.8-1.2s-1.2-0.5-1.7-0.2c-0.2 0.1-0.5 0.2-0.5-0.1 0-0.4-0.5-0.7-0.4-1.1-0.1 0-0.2 0-0.3 0.1s-0.2 0.2-0.4 0.1c-0.2-0.2-0.1-0.4-0.1-0.6 0.1-0.2 0.2-0.3 0.4-0.4 0.4-0.1 0.8-0.1 1 0.4 0.3-0.9 0.9-1.4 1.5-1.8 0 0 0.8-0.7 0.9-0.7s0.2 0.2 0.4 0.3c0.2 0 0.3 0 0.3-0.2 0.1-0.5-0.2-1.1-0.6-1.2 0-0.1 0.1-0.1 0.1-0.1 0.3-0.1 0.7-0.3 0.6-0.6 0-0.4-0.4-0.6-0.8-0.6-0.2 0-0.4 0-0.6 0.1-0.4 0.2-0.9 0.4-1.5 0.4 1.1-0.8 2.5-1.2 3.9-1.2 0.3 0 0.5 0 0.8 0-0.6 0.1-1.2 0.3-1.6 0.5 0.6 0.1 0.7 0.4 0.5 0.9-0.1 0.2 0 0.4 0.2 0.5s0.4 0.1 0.5-0.1c0.2-0.3 0.6-0.4 0.9-0.5 0.4-0.1 0.7-0.3 1-0.7 0-0.1 0.1-0.1 0.2-0.2 0.6 0.2 1.2 0.6 1.8 1-0.1 0-0.1 0.1-0.2 0.1-0.2 0.2-0.5 0.3-0.2 0.7 0.1 0.2 0 0.3-0.1 0.4-0.2 0.1-0.3 0-0.4-0.1s-0.1-0.3-0.4-0.3c-0.1 0.2-0.4 0.3-0.4 0.6 0.5 0 0.4 0.4 0.5 0.7-0.6 0.1-0.8 0.4-0.5 0.9 0.1 0.2-0.1 0.3-0.2 0.4-0.4 0.6-0.8 1-0.8 1.7s0.5 1.4 1.3 1.3c0.9-0.1 0.9-0.1 1.2 0.7 0 0.1 0.1 0.2 0.1 0.3 0.1 0.2 0.2 0.4 0.1 0.6-0.3 0.8 0.1 1.4 0.4 2 0.1 0.2 0.2 0.3 0.3 0.4-1.3 1.4-3 2.2-5 2.2z\"/></g>\n<g id=\"golf\"><path d=\"M7 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M9.8 1.8c-0.2-0.5-1.7-0.1-2 0.5-0.2 0.3-0.2 1.2-1.2 1.9-0.8 0.5-1.6 0.5-1.6 0.5-0.3 0.6-0.1 1.1 0.2 1.6 0.5 0.9 0.6 1.8 0.7 2.8 0.1 1.3-0.5 2.4-2.3 3.2-0.8 0.3-1.3 0.9-1 1.9 0 0 2-0.3 3.1-1.2 1.5-1.2 1.8-2.3 1.8-2.3s0.1 0.7 0 1.9c-0.1 1-0.2 1.5-0.4 2.2s0.3 1.2 0.9 1.2 1-0.4 1-1l0.3-1.9c0.3-2.1 0-4.3-0.8-6.3 0-0.1-0.1-0.1-0.1-0.2-0.6-1.6 0.2-2.6 0.6-3 0.3-0.4 1.2-1.2 0.8-1.8z\"/><path d=\"M12 0v10h1v-6l3-2z\"/><path d=\"M16 10c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M1 8.4l3.7-3.7-0.7-0.3-3.8 3.6c0 0-0.4 0.7 0.1 1.7s1.6 0.3 1.6 0.3c0.4-0.2 0.2-0.4 0-0.6s-0.9-1-0.9-1z\"/></g>\n<g id=\"google-plus-square\"><path d=\"M5 3.4c-0.8 0-1.3 0.8-1.2 1.8 0.1 1.1 0.9 1.9 1.7 2 0.8 0 1.3-0.8 1.2-1.9-0.1-1-0.9-1.9-1.7-1.9z\"/><path d=\"M5.4 9.3c-1.2 0-2.3 0.7-2.3 1.6s0.9 1.7 2.1 1.7c1.7 0 2.3-0.7 2.3-1.6 0-0.1 0-0.2 0-0.3-0.1-0.5-0.6-0.8-1.3-1.2-0.2-0.2-0.5-0.2-0.8-0.2z\"/><path d=\"M0 0v16h16v-16h-16zM7.9 5.3c0 0.7-0.4 1.2-0.9 1.6s-0.6 0.6-0.6 0.9c0 0.3 0.5 0.8 0.8 1 0.8 0.6 1.1 1.1 1.1 2 0 1.1-1.1 2.3-3.1 2.3-1.7 0-3.2-0.7-3.2-1.8 0-1.2 1.3-2.3 3.1-2.3 0.2 0 0.4 0 0.5 0-0.2-0.3-0.4-0.6-0.4-0.9 0-0.2 0.1-0.4 0.2-0.6-0.1 0-0.2 0-0.3 0-1.4 0-2.4-1-2.4-2.3 0-1.2 1.3-2.3 2.7-2.3 0.8 0 3.1 0 3.1 0l-0.7 0.6h-1c0.7 0.2 1.1 1 1.1 1.8zM14 5.5h-2.1v2h-0.5v-2h-2v-0.5h2v-2h0.5v2h2.1v0.5z\"/></g>\n<g id=\"google-plus\"><path d=\"M16 3.9h-2.8v-2.6h-0.6v2.6h-2.7v0.8h2.7v2.6h0.6v-2.6h2.8z\"/><path d=\"M6.9 9c-0.4-0.2-1.1-0.9-1.1-1.3s0.1-0.7 0.8-1.2c0.7-0.5 1.2-1.2 1.2-2.1 0-1.1-0.5-2.1-1.3-2.4h1.3l0.9-0.7c0 0-3.1 0-4.2 0-1.9 0-3.6 1.4-3.6 3.1s1.3 3 3.2 3c0.1 0 0.3 0 0.4 0-0.2 0.2-0.2 0.4-0.2 0.7 0 0.5 0.3 0.8 0.6 1.2-0.2 0-0.5 0-0.7 0-2.3 0-4.1 1.5-4.1 3s2 2.5 4.3 2.5c2.6 0 4.1-1.5 4.1-3-0.1-1.3-0.5-2-1.6-2.8zM4.7 6.9c-1.1 0-2.1-1.2-2.3-2.6s0.5-2.5 1.6-2.5c1.1 0 2.1 1.2 2.3 2.6s-0.5 2.6-1.6 2.5zM4.3 14.1c-1.6 0-2.8-1-2.8-2.2s1.4-2.2 3-2.2c0.4 0 0.7 0.1 1 0.2 0.9 0.6 1.5 0.9 1.7 1.6 0 0.1 0.1 0.3 0.1 0.4 0 1.2-0.8 2.2-3 2.2z\"/></g>\n<g id=\"grab\"><path d=\"M12.6 4c-0.2 0-0.4 0-0.6 0 0-0.2-0.2-0.6-0.4-0.8s-0.5-0.4-1.1-0.4c-0.2 0-0.4 0-0.6 0.1-0.1-0.2-0.2-0.3-0.3-0.5-0.2-0.2-0.5-0.4-1.1-0.4-0.8 0-1.2 0.5-1.4 1-0.1 0-0.3-0.1-0.5-0.1-0.5 0-0.8 0.2-1.1 0.4-0.5 0.6-0.5 1.4-0.5 1.5v0.4c-0.6 0-1.1 0.2-1.4 0.5-0.6 0.7-0.6 1.6-0.6 2.8 0 0.2 0 0.5 0 0.7 0 1.4 0.7 2.1 1.4 2.8l0.3 0.4c1.3 1.2 2.5 1.6 5.1 1.6 2.9 0 4.2-1.6 4.2-5.1v-2.5c0-0.7-0.2-2.1-1.4-2.4zM10.5 3.8c0.4 0 0.5 0.4 0.5 0.6v0.8c0 0.3 0.2 0.5 0.4 0.5 0.3 0 0.5-0.1 0.5-0.4 0 0 0-0.4 0.4-0.3 0.6 0.2 0.7 1.1 0.7 1.3 0 0 0 0 0 0v2.6c0 3.4-1.3 4.1-3.2 4.1-2.4 0-3.3-0.3-4.3-1.3-0.1-0.1-0.2-0.2-0.4-0.4-0.7-0.7-1.1-1.1-1.1-2.1 0-0.2 0-0.3 0-0.6 0-1 0-1.8 0.3-2.1 0.1-0.2 0.4-0.3 0.7-0.3v0.8l-0.3 1.2c0 0.1 0 0.1 0.1 0.1 0.1 0.1 0.2 0 0.2 0l1-1.2c0 0 0-0.1 0-0.1v-2c0-0.1 0-0.6 0.2-0.8 0.1-0.1 0.2-0.2 0.4-0.2 0.3 0 0.4 0.2 0.4 0.4v0.4c0 0.2 0.2 0.5 0.5 0.5s0.5-0.3 0.5-0.5v-1.3c0-0.1 0-0.5 0.5-0.5 0.3 0 0.5 0.2 0.5 0.5v1.2c0 0.3 0.2 0.6 0.5 0.6s0.5-0.3 0.5-0.5v-0.5c0-0.3 0.2-0.5 0.5-0.5z\"/></g>\n<g id=\"grid-bevel\"><path d=\"M14 2v-1h-13v13h1v1h13v-13h-1zM5 13h-3v-3h3v3zM5 9h-3v-3h3v3zM5 5h-3v-3h3v3zM9 13h-3v-3h3v3zM9 9h-3v-3h3v3zM9 5h-3v-3h3v3zM13 13h-3v-3h3v3zM13 9h-3v-3h3v3zM13 5h-3v-3h3v3z\"/></g>\n<g id=\"grid-big-o\"><path d=\"M0 7h7v-7h-7v7zM1 1h5v5h-5v-5z\"/><path d=\"M9 0v7h7v-7h-7zM15 6h-5v-5h5v5z\"/><path d=\"M0 16h7v-7h-7v7zM1 10h5v5h-5v-5z\"/><path d=\"M9 16h7v-7h-7v7zM10 10h5v5h-5v-5z\"/></g>\n<g id=\"grid-big\"><path d=\"M0 0h7v7h-7v-7z\"/><path d=\"M9 0h7v7h-7v-7z\"/><path d=\"M0 9h7v7h-7v-7z\"/><path d=\"M9 9h7v7h-7v-7z\"/></g>\n<g id=\"grid-h\"><path d=\"M0 0v16h16v-16h-16zM5 15h-4v-14h4v14zM10 15h-4v-14h4v14zM15 15h-4v-14h4v14z\"/></g>\n<g id=\"grid-small-o\"><path d=\"M0 4h4v-4h-4v4zM1 1h2v2h-2v-2z\"/><path d=\"M0 10h4v-4h-4v4zM1 7h2v2h-2v-2z\"/><path d=\"M0 16h4v-4h-4v4zM1 13h2v2h-2v-2z\"/><path d=\"M6 4h4v-4h-4v4zM7 1h2v2h-2v-2z\"/><path d=\"M6 10h4v-4h-4v4zM7 7h2v2h-2v-2z\"/><path d=\"M6 16h4v-4h-4v4zM7 13h2v2h-2v-2z\"/><path d=\"M12 0v4h4v-4h-4zM15 3h-2v-2h2v2z\"/><path d=\"M12 10h4v-4h-4v4zM13 7h2v2h-2v-2z\"/><path d=\"M12 16h4v-4h-4v4zM13 13h2v2h-2v-2z\"/></g>\n<g id=\"grid-small\"><path d=\"M0 0h4v4h-4v-4z\"/><path d=\"M0 6h4v4h-4v-4z\"/><path d=\"M0 12h4v4h-4v-4z\"/><path d=\"M6 0h4v4h-4v-4z\"/><path d=\"M6 6h4v4h-4v-4z\"/><path d=\"M6 12h4v4h-4v-4z\"/><path d=\"M12 0h4v4h-4v-4z\"/><path d=\"M12 6h4v4h-4v-4z\"/><path d=\"M12 12h4v4h-4v-4z\"/></g>\n<g id=\"grid-v\"><path d=\"M16 0h-16v16h16v-16zM1 5v-4h14v4h-14zM1 10v-4h14v4h-14zM1 15v-4h14v4h-14z\"/></g>\n<g id=\"grid\"><path d=\"M0 0v16h16v-16h-16zM5 15h-4v-4h4v4zM5 10h-4v-4h4v4zM5 5h-4v-4h4v4zM10 15h-4v-4h4v4zM10 10h-4v-4h4v4zM10 5h-4v-4h4v4zM15 15h-4v-4h4v4zM15 10h-4v-4h4v4zM15 5h-4v-4h4v4z\"/></g>\n<g id=\"group\"><path d=\"M5 16v-5.3c-0.6-0.3-1-1-1-1.7v-4c0-0.7 0.4-1.3 1-1.7 0-0.1 0-0.2 0-0.3 0-1.1-0.9-2-2-2s-2 0.9-2 2c0 1.1 0.9 2 2 2h-2c-0.5 0-1 0.5-1 1v4c0 0.5 0.5 1 1 1v5h4z\"/><path d=\"M15 5h-2c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2c0 0.1 0 0.2 0 0.3 0.6 0.4 1 1 1 1.7v4c0 0.7-0.4 1.4-1 1.7v5.3h4v-5c0.5 0 1-0.5 1-1v-4c0-0.5-0.5-1-1-1z\"/><path d=\"M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M10 4h-4c-0.5 0-1 0.5-1 1v4c0 0.5 0.5 1 1 1v6h4v-6c0.5 0 1-0.5 1-1v-4c0-0.5-0.5-1-1-1z\"/></g>\n<g id=\"hammer\"><path d=\"M6 2l7 7 3-3-4.48-4.48s-2.97 1.030-4.52-0.52z\"/><path d=\"M8.8 5.79l-8.53 8.52c-0.165 0.178-0.267 0.417-0.267 0.68s0.101 0.502 0.267 0.681c0.181 0.183 0.433 0.297 0.711 0.297 0.253 0 0.484-0.094 0.66-0.248l8.569-8.519z\"/></g>\n<g id=\"hand\"><path d=\"M13.5 2.4c-0.4-0.4-1-0.5-1.5-0.3 0-0.3-0.1-0.6-0.4-0.9-0.2-0.2-0.6-0.4-1.1-0.4-0.3 0-0.5 0.1-0.7 0.1 0-0.2-0.1-0.3-0.2-0.5-0.5-0.6-1.5-0.6-2 0-0.2 0.2-0.4 0.4-0.4 0.6-0.2 0-0.4-0.1-0.6-0.1-0.5 0-0.8 0.2-1.1 0.5-0.5 0.5-0.5 1.3-0.5 1.3v3.8c-0.3-0.3-0.8-0.8-1.5-0.8-0.2 0-0.5 0.1-0.7 0.2-0.4 0.2-0.6 0.5-0.7 0.9-0.3 1 0.6 2.4 0.6 2.5 0.1 0.1 1.2 2.7 2.2 3.8 1 1.2 2.1 1.9 4.9 1.9 2.9 0 4.2-1.6 4.2-5.1v-5.5c0-0.1 0.1-1.3-0.5-2zM8 2c0-0.3-0.1-1 0.5-1 0.5 0 0.5 0.5 0.5 1v4c0 0.3 0.2 0.5 0.5 0.5s0.5-0.2 0.5-0.5v-3.8c0 0 0-0.4 0.5-0.4 0.6 0 0.5 0.9 0.5 0.9v3.3c0 0.3 0.2 0.5 0.5 0.5s0.5-0.2 0.5-0.5v-2.4c0-0.1 0-0.6 0.5-0.6s0.5 1 0.5 1v5.9c0 3.4-1.3 4.1-3.2 4.1-2.4 0-3.3-0.5-4.1-1.6-0.9-1-2.1-3.6-2.1-3.7-0.3-0.3-0.7-1.2-0.6-1.6 0-0.1 0.1-0.2 0.2-0.3 0.1 0 0.2-0.1 0.2-0.1 0.4 0 0.8 0.5 0.9 0.7l0.6 0.9c0.1 0.2 0.4 0.3 0.6 0.2 0.4 0 0.5-0.2 0.5-0.4v-5.2c0-0.4 0-1 0.5-1 0.4 0 0.5 0.3 0.5 0.8v3.3c0 0.3 0.2 0.5 0.5 0.5s0.5-0.2 0.5-0.5z\"/></g>\n<g id=\"handle-corner\"><path d=\"M6.7 16l9.3-9.3v-1.4l-10.7 10.7z\"/><path d=\"M9.7 16l6.3-6.3v-1.4l-7.7 7.7z\"/><path d=\"M12.7 16l3.3-3.3v-1.4l-4.7 4.7z\"/><path d=\"M15.7 16l0.3-0.3v-1.4l-1.7 1.7z\"/></g>\n<g id=\"hands-up\"><path d=\"M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M6 16h1.5v-5h1v5h1.5v-9c-0-0.016-0.001-0.034-0.001-0.052 0-0.521 0.194-0.997 0.513-1.36l3.278-3.318c0.216-0.129 0.358-0.362 0.358-0.628 0-0.403-0.327-0.73-0.73-0.73-0.266 0-0.499 0.142-0.626 0.355l-2.362 2.383c-0.212 0.216-0.508 0.35-0.835 0.35-0.002 0-0.004 0-0.006-0h-3.18c-0.002 0-0.004 0-0.005 0-0.327 0-0.622-0.134-0.834-0.35l-2.32-2.39c-0.129-0.216-0.362-0.358-0.628-0.358-0.403 0-0.73 0.327-0.73 0.73 0 0.266 0.142 0.499 0.355 0.626l3.243 3.332c0.317 0.361 0.511 0.836 0.511 1.358 0 0.018-0 0.037-0.001 0.055l0 8.997z\"/></g>\n<g id=\"handshake\"><path d=\"M13 3c-0.538 0.515-1.185 0.92-1.902 1.178-0.748 0.132-2.818-0.828-3.838 0.152-0.17 0.17-0.38 0.34-0.6 0.51-0.48-0.21-1.22-0.53-1.76-0.84s-1.9-1-1.9-1l-3 3.5s0.74 1 1.2 1.66c0.3 0.44 0.67 1.11 0.91 1.56l-0.34 0.4c-0.058 0.115-0.093 0.25-0.093 0.393 0 0.235 0.092 0.449 0.243 0.607 0.138 0.103 0.311 0.165 0.5 0.165s0.362-0.062 0.502-0.167c-0.094 0.109-0.149 0.249-0.149 0.402 0 0.193 0.088 0.365 0.226 0.479 0.144 0.085 0.317 0.135 0.501 0.135s0.357-0.050 0.505-0.137c-0.112 0.139-0.177 0.313-0.177 0.503s0.065 0.364 0.174 0.502c0.099 0.035 0.214 0.056 0.334 0.056 0.207 0 0.399-0.063 0.558-0.17-0.043 0.095-0.065 0.203-0.065 0.317 0 0.234 0.096 0.445 0.252 0.595 0.13 0.059 0.283 0.093 0.443 0.093 0.226 0 0.437-0.068 0.611-0.185l0.516-0.467c0.472 0.47 1.123 0.761 1.842 0.761 0.020 0 0.041-0 0.061-0.001 0.494-0.042 0.908-0.356 1.094-0.791 0.146 0.056 0.312 0.094 0.488 0.094 0.236 0 0.455-0.068 0.64-0.185 0.585-0.387 0.445-0.687 0.445-0.687 0.125 0.055 0.27 0.087 0.423 0.087 0.321 0 0.61-0.142 0.806-0.366 0.176-0.181 0.283-0.427 0.283-0.697 0-0.19-0.053-0.367-0.145-0.518 0.008 0.005 0.015 0.005 0.021 0.005 0.421 0 0.787-0.232 0.978-0.574 0.068-0.171 0.105-0.363 0.105-0.563 0-0.342-0.11-0.659-0.296-0.917l0.003 0.005c0.82-0.16 0.79-0.57 1.19-1.17 0.384-0.494 0.852-0.902 1.387-1.208zM12.95 10.060c-0.44 0.44-0.78 0.25-1.53-0.32s-2.24-1.64-2.24-1.64c0.061 0.305 0.202 0.57 0.401 0.781 0.319 0.359 1.269 1.179 1.719 1.599 0.28 0.26 1 0.78 0.58 1.18s-0.75 0-1.44-0.56-2.23-1.94-2.23-1.94c-0.001 0.018-0.002 0.038-0.002 0.059 0 0.258 0.104 0.491 0.272 0.661 0.17 0.2 1.12 1.12 1.52 1.54s0.75 0.67 0.41 1-1.030-0.19-1.41-0.58c-0.59-0.57-1.76-1.63-1.76-1.63-0.001 0.016-0.001 0.034-0.001 0.053 0 0.284 0.098 0.544 0.263 0.75 0.288 0.378 0.848 0.868 1.188 1.248s0.54 0.7 0 1-1.34-0.44-1.69-0.8c0-0.001 0-0.001 0-0.002 0-0.103-0.038-0.197-0.1-0.269-0.159-0.147-0.374-0.238-0.609-0.238-0.104 0-0.204 0.018-0.297 0.050 0.128-0.114 0.204-0.274 0.204-0.452s-0.076-0.338-0.198-0.45c-0.126-0.095-0.284-0.152-0.455-0.152s-0.33 0.057-0.457 0.153c0.117-0.113 0.189-0.268 0.189-0.441 0-0.213-0.109-0.4-0.274-0.509-0.153-0.097-0.336-0.153-0.532-0.153-0.244 0-0.468 0.088-0.642 0.233 0.095-0.114 0.151-0.26 0.151-0.42 0-0.195-0.085-0.37-0.219-0.491-0.178-0.165-0.417-0.266-0.679-0.266-0.185 0-0.358 0.050-0.507 0.138l-0.665-1.123c-0.46-0.73-1-1.49-1-1.49l2.28-2.77s0.81 0.5 1.48 0.88c0.33 0.19 0.9 0.44 1.33 0.64-0.68 0.51-1.25 1-1.080 1.34 0.297 0.214 0.668 0.343 1.069 0.343 0.376 0 0.726-0.113 1.018-0.307 0.373-0.251 0.84-0.403 1.343-0.403 0.347 0 0.677 0.072 0.976 0.203 0.554 0.374 1.574 1.294 2.504 1.874v0c1.17 0.85 1.4 1.4 1.12 1.68z\"/></g>\n<g id=\"harddrive-o\"><path d=\"M2 12h1v1h-1v-1z\"/><path d=\"M4 12h3v1h-3v-1z\"/><path d=\"M13 1h-10l-3 9v5h16v-5l-3-9zM3.7 2h8.6l2.7 8h-13.9l2.6-8zM1 14v-3h14v3h-14z\"/></g>\n<g id=\"harddrive\"><path d=\"M13 1h-10l-2.7 8h15.4z\"/><path d=\"M0 10v5h16v-5h-16zM3 13h-1v-1h1v1zM7 13h-3v-1h3v1z\"/></g>\n<g id=\"hash\"><path d=\"M15 6v-2h-2.6l0.6-2.8-2-0.4-0.7 3.2h-3l0.7-2.8-2-0.4-0.7 3.2h-3.3v2h2.9l-0.9 4h-3v2h2.6l-0.6 2.8 2 0.4 0.7-3.2h3l-0.7 2.8 2 0.4 0.7-3.2h3.3v-2h-2.9l0.9-4h3zM9 10h-3l1-4h3l-1 4z\"/></g>\n<g id=\"header\"><path d=\"M11 0v7h-6v-7h-3v16h3v-7h6v7h3v-16z\"/></g>\n<g id=\"headphones\"><path d=\"M14 8.3v-2.3c0-3.3-2.7-6-6-6s-6 2.7-6 6v2.3c-1.2 0.5-2 1.7-2 3.1v1.2c0 1.8 1.3 3.2 3 3.4h2v-8h-1v-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2h-1v8h2c1.7-0.2 3-1.7 3-3.4v-1.2c0-1.4-0.8-2.6-2-3.1zM4 15h-1v-6h1v6zM13 15h-1v-6h1v6z\"/></g>\n<g id=\"headset\"><path d=\"M14.82 8c-0.309-0.851-0.969-1.511-1.799-1.813l-0.021-1.687c0-2.5-2.47-4.5-5.5-4.5s-5.5 2-5.5 4.5v1.68c-1.173 0.423-1.996 1.525-2 2.82v1c0 1.657 1.343 3 3 3h1v-7h-1v-1.5c0-1.93 2-3.5 4.5-3.5s4.5 1.57 4.5 3.5v1.5h-1v7h1c1.657 0 3-1.343 3-3v1.73c0 1.806-1.464 3.27-3.27 3.27h-1.73c0-0.552-0.448-1-1-1h-1c-0.552 0-1 0.448-1 1s0.448 1 1 1h3.73c2.358 0 4.27-1.912 4.27-4.27v-3.73h-1.18z\"/></g>\n<g id=\"health-card\"><path d=\"M15 3v10h-14v-10h14zM16 2h-16v12h16v-12z\"/><path d=\"M9 5h5v1h-5v-1z\"/><path d=\"M9 7h5v1h-5v-1z\"/><path d=\"M9 9h2v1h-2v-1z\"/><path d=\"M6.5 5c0 0 0 0 0 0-0.6 0-1.1 0.6-1.5 1-0.4-0.4-0.9-1-1.5-1 0 0 0 0 0 0-1.5 0-2.1 1.9-1 2.9l2.5 2.1 2.5-2.1c1.1-1 0.5-2.9-1-2.9z\"/></g>\n<g id=\"heart-o\"><path d=\"M11.7 2c-0.9 0-2.7 0.5-3.7 2.1-1-1.6-2.8-2.1-3.8-2.1-2.3 0-4.2 1.9-4.2 4.2 0 4 7.4 8.5 7.7 8.7l0.3 0.2 0.3-0.2c0.3-0.2 7.7-4.8 7.7-8.7 0-2.3-1.9-4.2-4.3-4.2zM8 13.9c-2.2-1.4-7-5-7-7.7 0-1.8 1.5-3.2 3.2-3.2 0.1 0 2.5 0.1 3.3 2.4l0.5 1.4 0.5-1.4c0.8-2.3 3.2-2.4 3.3-2.4 1.7 0 3.2 1.4 3.2 3.2 0 2.7-4.8 6.3-7 7.7z\"/></g>\n<g id=\"heart\"><path d=\"M12 2c0 0-3 0-4 3-1-3-4-3-4-3-2.2 0-4 1.8-4 4 0 4.1 8 9 8 9s8-5 8-9c0-2.2-1.8-4-4-4z\"/></g>\n<g id=\"home-o\"><path d=\"M16 6.6l-8-5.2-2 1.3v-1.7h-2v3l-4 2.6 1.9 2.7 0.1-0.1v5.8h5v-4h2v4h5v-5.8l0.1 0.1 1.9-2.7zM1.4 6.9l6.6-4.3 6.6 4.3-0.7 1-5.9-3.9-5.9 3.9-0.7-1zM13 14h-3v-4h-4v4h-3v-5.4l5-3.3 5 3.3v5.4z\"/></g>\n<g id=\"home\"><path d=\"M8 1.4l-2 1.3v-1.7h-2v3l-4 2.6 0.6 0.8 7.4-4.8 7.4 4.8 0.6-0.8z\"/><path d=\"M8 4l-6 4v7h5v-3h2v3h5v-7z\"/></g>\n<g id=\"hospital\"><path d=\"M15 4v-4h-7v4h-8v12h6v-3h4v3h6v-12h-1zM4 11h-2v-2h2v2zM4 8h-2v-2h2v2zM7 11h-2v-2h2v2zM7 8h-2v-2h2v2zM10 3v-1h1v-1h1v1h1v1h-1v1h-1v-1h-1zM11 11h-2v-2h2v2zM11 8h-2v-2h2v2zM14 11h-2v-2h2v2zM14 8h-2v-2h2v2z\"/></g>\n<g id=\"hourglass-empty\"><path d=\"M11.18 6.060c1.107-0.808 1.819-2.101 1.82-3.56v-0.5h1v-2h-12v2h1v0.5c0.001 1.459 0.713 2.752 1.808 3.551 0.672 0.43 1.121 1.13 1.192 1.939-0.093 0.848-0.551 1.564-1.209 2.003-1.081 0.814-1.772 2.078-1.79 3.503l-0 0.503h-1v2h12v-2h-1v-0.5c-0.018-1.429-0.709-2.692-1.769-3.492-0.68-0.454-1.138-1.169-1.23-1.996 0.071-0.831 0.52-1.532 1.169-1.946zM9 8c0.072 1.142 0.655 2.136 1.519 2.763 0.877 0.623 1.445 1.61 1.481 2.732l0 0.505h-8v-0.5c0.036-1.127 0.604-2.114 1.459-2.723 0.886-0.642 1.468-1.635 1.54-2.766-0.063-1.124-0.641-2.091-1.498-2.683-0.914-0.633-1.499-1.662-1.502-2.827v-0.5h8v0.5c-0.003 1.166-0.587 2.195-1.479 2.813-0.88 0.607-1.458 1.574-1.521 2.678z\"/></g>\n<g id=\"hourglass-end\"><path d=\"M11.18 6.060c1.107-0.808 1.819-2.101 1.82-3.56v-0.5h1v-2h-12v2h1v0.5c0.001 1.459 0.713 2.752 1.808 3.551 0.672 0.43 1.121 1.13 1.192 1.939-0.093 0.848-0.551 1.564-1.209 2.003-1.081 0.814-1.772 2.078-1.79 3.503l-0 0.503h-1v2h12v-2h-1v-0.5c-0.018-1.429-0.709-2.692-1.769-3.492-0.68-0.454-1.138-1.169-1.23-1.996 0.071-0.831 0.52-1.532 1.169-1.946zM9 8c0.072 1.142 0.655 2.136 1.519 2.763 0.877 0.623 1.445 1.61 1.481 2.732l0 0.505h-1s-1.62-3.5-3-3.5-3 3.5-3 3.5h-1v-0.5c0.036-1.127 0.604-2.114 1.459-2.723 0.886-0.642 1.468-1.635 1.54-2.766-0.063-1.124-0.641-2.091-1.498-2.683-0.914-0.633-1.499-1.662-1.502-2.827v-0.5h8v0.5c-0.003 1.166-0.587 2.195-1.479 2.813-0.88 0.607-1.458 1.574-1.521 2.678z\"/></g>\n<g id=\"hourglass-start\"><path d=\"M6.16 4.6c1.114 0.734 1.84 1.979 1.84 3.394 0 0.002 0 0.004 0 0.006v-0c0-0.002 0-0.004 0-0.006 0-1.415 0.726-2.66 1.825-3.384 0.573-0.385 0.984-0.939 1.17-1.589l-5.995-0.020c0.191 0.67 0.603 1.225 1.15 1.594z\"/><path d=\"M11.18 6.060c1.107-0.808 1.819-2.101 1.82-3.56v-0.5h1v-2h-12v2h1v0.5c0.001 1.459 0.713 2.752 1.808 3.551 0.672 0.43 1.121 1.13 1.192 1.939-0.093 0.848-0.551 1.564-1.209 2.003-1.081 0.814-1.772 2.078-1.79 3.503l-0 0.503h-1v2h12v-2h-1v-0.5c-0.018-1.429-0.709-2.692-1.769-3.492-0.68-0.454-1.138-1.169-1.23-1.996 0.071-0.831 0.52-1.532 1.169-1.946zM9 8c0.072 1.142 0.655 2.136 1.519 2.763 0.877 0.623 1.445 1.61 1.481 2.732l0 0.505h-8v-0.5c0.036-1.127 0.604-2.114 1.459-2.723 0.886-0.642 1.468-1.635 1.54-2.766-0.063-1.124-0.641-2.091-1.498-2.683-0.914-0.633-1.499-1.662-1.502-2.827v-0.5h8v0.5c-0.003 1.166-0.587 2.195-1.479 2.813-0.88 0.607-1.458 1.574-1.521 2.678z\"/></g>\n<g id=\"hourglass\"><path d=\"M6.16 4.6c1.114 0.734 1.84 1.979 1.84 3.394 0 0.002 0 0.004 0 0.006v-0c0-0.002 0-0.004 0-0.006 0-1.415 0.726-2.66 1.825-3.384 0.23-0.199 0.426-0.395 0.609-0.602l-4.874-0.007c0.19 0.214 0.386 0.41 0.593 0.594z\"/><path d=\"M11.18 6.060c1.107-0.808 1.819-2.101 1.82-3.56v-0.5h1v-2h-12v2h1v0.5c0.001 1.459 0.713 2.752 1.808 3.551 0.672 0.43 1.121 1.13 1.192 1.939-0.093 0.848-0.551 1.564-1.209 2.003-1.081 0.814-1.772 2.078-1.79 3.503l-0 0.503h-1v2h12v-2h-1v-0.5c-0.018-1.429-0.709-2.692-1.769-3.492-0.68-0.454-1.138-1.169-1.23-1.996 0.071-0.831 0.52-1.532 1.169-1.946zM9 8c0.072 1.142 0.655 2.136 1.519 2.763 0.877 0.623 1.445 1.61 1.481 2.732l0 0.505h-1.77c-0.7-0.87-1.71-2-2.23-2s-1.53 1.13-2.23 2h-1.77v-0.5c0.036-1.127 0.604-2.114 1.459-2.723 0.886-0.642 1.468-1.635 1.54-2.766-0.063-1.124-0.641-2.091-1.498-2.683-0.914-0.633-1.499-1.662-1.502-2.827v-0.5h8v0.5c-0.003 1.166-0.587 2.195-1.479 2.813-0.88 0.607-1.458 1.574-1.521 2.678z\"/></g>\n<g id=\"inbox\"><path d=\"M10 6v-6h-4v6h-2l4 5 4-5z\"/><path d=\"M13 1h-2v1h1.3l2.6 8h-3.9v2h-6v-2h-3.9l2.6-8h1.3v-1h-2l-3 9v5h16v-5z\"/></g>\n<g id=\"indent\"><path d=\"M0 0h16v3h-16v-3z\"/><path d=\"M6 4h10v3h-10v-3z\"/><path d=\"M6 8h10v3h-10v-3z\"/><path d=\"M0 12h16v3h-16v-3z\"/><path d=\"M0 4.5v6l4-3z\"/></g>\n<g id=\"info-circle-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M7 6h2v7h-2v-7z\"/><path d=\"M7 3h2v2h-2v-2z\"/></g>\n<g id=\"info-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM9 13h-2v-7h2v7zM9 5h-2v-2h2v2z\"/></g>\n<g id=\"info\"><path d=\"M6 5h4v11h-4v-11z\"/><path d=\"M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/></g>\n<g id=\"input\"><path d=\"M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z\"/><path d=\"M2 6h1v4h-1v-4z\"/></g>\n<g id=\"insert\"><path d=\"M14 16v-11l-1 1v9h-12v-12h9l1-1h-11v14z\"/><path d=\"M16 1.4l-1.4-1.4-6.8 6.8-1.8-1.8v5h5l-1.8-1.8z\"/></g>\n<g id=\"institution\"><path d=\"M8 0l-8 3v2h16v-2z\"/><path d=\"M0 14h16v2h-16v-2z\"/><path d=\"M16 7v-1h-16v1h1v5h-1v1h16v-1h-1v-5h1zM4 12h-1v-5h1v5zM7 12h-1v-5h1v5zM10 12h-1v-5h1v5zM13 12h-1v-5h1v5z\"/></g>\n<g id=\"invoice\"><path d=\"M4.4 10.2c-0.6 0.1-1.4-0.3-1.7-0.4l-0.5 0.9c0 0 0.9 0.4 1.7 0.5v0.8h1v-0.9c0.9-0.3 1.4-1.1 1.5-1.8 0-0.8-0.6-1.4-1.9-1.9-0.4-0.2-1.1-0.5-1.1-0.9 0-0.5 0.4-0.8 1-0.8 0.7 0 1.4 0.3 1.4 0.3l0.4-0.9c0 0-0.5-0.2-1.2-0.4v-0.7h-1v0.7c-0.9 0.2-1.5 0.8-1.6 1.7 0 1.2 1.3 1.7 1.8 1.9 0.6 0.2 1.3 0.6 1.3 0.9 0 0.4-0.4 0.9-1.1 1z\"/><path d=\"M0 2v12h16v-12h-16zM15 13h-14v-10h14v10z\"/><path d=\"M8 5h6v1h-6v-1z\"/><path d=\"M8 7h6v1h-6v-1z\"/><path d=\"M8 9h3v1h-3v-1z\"/></g>\n<g id=\"italic\"><path d=\"M8 0h3l-3 16h-3z\"/></g>\n<g id=\"key-o\"><path d=\"M13 0l-7 6.1c-0.3-0.1-0.6-0.1-1-0.1-2.8 0-5 2.2-5 5s2.3 5 5 5 5-2.2 5-5c0-0.3 0-0.6-0.1-0.9l1.1-1.1v-2h2v-2h2l1-1v-4h-3zM12 6h-1.7l1.7-1.4v1.4zM15 3.6l-0.4 0.4h-1.9l2.3-2v1.6zM7.3 7.6l0.7 0.4 2-1.7v2.3l-0.8 0.8-0.3 0.4 0.1 0.5c0 0.2 0.1 0.5 0.1 0.7 0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c0.3 0 0.5 0 0.8 0.1l0.5 0.1 0.4-0.3 6.6-5.9h1.6l-7.7 6.6z\"/><path d=\"M6 11.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z\"/></g>\n<g id=\"key\"><path d=\"M8.1 7c-0.2-0.1-0.4-0.2-0.6-0.3l7.5-6.7h-2l-7 6.1c-0.3-0.1-0.6-0.1-1-0.1-2.8 0-5 2.2-5 5s2.3 5 5 5 5-2.2 5-5c0-0.6-0.1-1.2-0.3-1.7l1.3-1.3v-2h2v-2h2l1-1v-3l-7.9 7zM4 13.2c-0.7 0-1.2-0.6-1.2-1.2s0.6-1.2 1.2-1.2 1.2 0.6 1.2 1.2-0.5 1.2-1.2 1.2z\"/></g>\n<g id=\"keyboard-o\"><path d=\"M15 5v7h-14v-7h14zM16 4h-16v9h16v-9z\"/><path d=\"M4 10h8v1h-8v-1z\"/><path d=\"M2 10h1v1h-1v-1z\"/><path d=\"M13 10h1v1h-1v-1z\"/><path d=\"M11 8h1v1h-1v-1z\"/><path d=\"M9 8h1v1h-1v-1z\"/><path d=\"M7 8h1v1h-1v-1z\"/><path d=\"M5 8h1v1h-1v-1z\"/><path d=\"M3 8h1v1h-1v-1z\"/><path d=\"M10 6h1v1h-1v-1z\"/><path d=\"M12 6v1h1v2h1v-3z\"/><path d=\"M8 6h1v1h-1v-1z\"/><path d=\"M6 6h1v1h-1v-1z\"/><path d=\"M4 6h1v1h-1v-1z\"/><path d=\"M2 6h1v1h-1v-1z\"/></g>\n<g id=\"keyboard\"><path d=\"M0 4v9h16v-9h-16zM10 6h1v1h-1v-1zM8 6h1v1h-1v-1zM10 8v1h-1v-1h1zM6 6h1v1h-1v-1zM8 8v1h-1v-1h1zM4 6h1v1h-1v-1zM6 8v1h-1v-1h1zM2 6h1v1h-1v-1zM3 11h-1v-1h1v1zM3 8h1v1h-1v-1zM12 11h-8v-1h8v1zM12 9h-1v-1h1v1zM14 11h-1v-1h1v1zM14 9h-1v-2h-1v-1h2v3z\"/></g>\n<g id=\"laptop\"><path d=\"M14 11v-9h-12v9h-2v2h16v-2h-2zM10 12h-4v-1h4v1zM13 10h-10v-7h10v7z\"/></g>\n<g id=\"layout\"><path d=\"M0 0v16h16v-16h-16zM1 3h4v12h-4v-12zM15 15h-9v-12h9v12z\"/></g>\n<g id=\"level-down-bold\"><path d=\"M9 16l4-7h-3v-9h-7l2 3h2v6h-3z\"/></g>\n<g id=\"level-down\"><path d=\"M5 1h6v11h2l-3 3-3-3h2v-9h-6z\"/></g>\n<g id=\"level-left-bold\"><path d=\"M0 7l7-4v3h9v7l-3-2v-2h-6v3z\"/></g>\n<g id=\"level-left\"><path d=\"M15 12v-6h-11v-2l-3 3 3 3v-2h9v6z\"/></g>\n<g id=\"level-right-bold\"><path d=\"M16 7l-7-4v3h-9v7l3-2v-2h6v3z\"/></g>\n<g id=\"level-right\"><path d=\"M1 12v-6h11v-2l3 3-3 3v-2h-9v6z\"/></g>\n<g id=\"level-up-bold\"><path d=\"M9 0l4 7h-3v9h-7l2-3h2v-6h-3z\"/></g>\n<g id=\"level-up\"><path d=\"M11 15h-6v-11h-2l3-3 3 3h-2v9h6z\"/></g>\n<g id=\"lifebuoy\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM4 8c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.2-1.8 4-4 4s-4-1.8-4-4zM12.6 9.8c0.3-0.5 0.4-1.2 0.4-1.8s-0.1-1.3-0.4-1.8l1.5-1.5c0.6 1 0.9 2.1 0.9 3.3s-0.3 2.3-0.8 3.3l-1.6-1.5zM11.3 1.8l-1.5 1.6c-0.5-0.3-1.2-0.4-1.8-0.4s-1.3 0.1-1.8 0.4l-1.5-1.6c1-0.5 2.1-0.8 3.3-0.8s2.3 0.3 3.3 0.8zM1.8 4.7l1.5 1.5c-0.2 0.5-0.3 1.2-0.3 1.8s0.1 1.3 0.4 1.8l-1.5 1.5c-0.6-1-0.9-2.1-0.9-3.3s0.3-2.3 0.8-3.3zM4.7 14.2l1.5-1.5c0.5 0.2 1.2 0.3 1.8 0.3s1.3-0.1 1.8-0.4l1.5 1.5c-1 0.6-2.1 0.9-3.3 0.9s-2.3-0.3-3.3-0.8z\"/></g>\n<g id=\"lightbulb\"><path d=\"M8 0c-2.761 0-5 2.239-5 5 0.013 1.672 0.878 3.138 2.182 3.989l0.818 2.011c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.41c0.342 0.55 0.915 0.929 1.581 0.999 0.684-0.071 1.258-0.449 1.594-0.99l0.415-0.009c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5l0.8-2c1.322-0.862 2.187-2.328 2.2-3.998 0-2.763-2.239-5.002-5-5.002zM10.25 8.21l-0.25 0.17-0.11 0.29-0.89 2.14c-0.042 0.111-0.147 0.189-0.27 0.19h-1.51c-0.103-0.020-0.186-0.093-0.219-0.188l-0.871-2.142-0.13-0.29-0.25-0.18c-1.045-0.7-1.729-1.868-1.75-3.197-0-2.212 1.791-4.003 4-4.003s4 1.791 4 4c-0.017 1.336-0.702 2.509-1.736 3.201z\"/><path d=\"M10.29 3c-0.574-0.612-1.387-0.995-2.289-1l-0.001 1c0.585 0.002 1.115 0.238 1.5 0.62 0.278 0.386 0.459 0.858 0.499 1.37l1.001 0.009c-0.045-0.756-0.305-1.443-0.718-2.011z\"/></g>\n<g id=\"line-bar-chart\"><path d=\"M5 11h3v5h-3v-5z\"/><path d=\"M1 14h3v2h-3v-2z\"/><path d=\"M13 12h3v4h-3v-4z\"/><path d=\"M9 9h3v7h-3v-7z\"/><path d=\"M16 0.070l-5.68 4.97-5.47-1.7-4.85 3.76v1.9l5.15-4 5.53 1.72 5.32-4.66v-1.99z\"/></g>\n<g id=\"line-chart\"><path d=\"M1 15v-15h-1v16h16v-1h-15z\"/><path d=\"M9 8l-3-3-4 4v2l4-4 3 3 7-7v-2z\"/></g>\n<g id=\"line-h\"><path d=\"M0 7h16v1h-16v-1z\"/></g>\n<g id=\"line-v\"><path d=\"M8 0h1v16h-1v-16z\"/></g>\n<g id=\"lines-list\"><path d=\"M0 1h3v2h-3v-2z\"/><path d=\"M0 5h3v2h-3v-2z\"/><path d=\"M0 9h3v2h-3v-2z\"/><path d=\"M0 13h3v2h-3v-2z\"/><path d=\"M4 1h12v2h-12v-2z\"/><path d=\"M4 5h12v2h-12v-2z\"/><path d=\"M4 9h12v2h-12v-2z\"/><path d=\"M4 13h12v2h-12v-2z\"/></g>\n<g id=\"lines\"><path d=\"M0 1h16v2h-16v-2z\"/><path d=\"M0 5h16v2h-16v-2z\"/><path d=\"M0 9h16v2h-16v-2z\"/><path d=\"M0 13h16v2h-16v-2z\"/></g>\n<g id=\"link\"><path d=\"M14.9 1.1c-1.4-1.4-3.7-1.4-5.1 0l-4.4 4.3c-1.4 1.5-1.4 3.7 0 5.2 0.1 0.1 0.3 0.2 0.4 0.3l1.5-1.5c-0.1-0.1-0.3-0.2-0.4-0.3-0.6-0.6-0.6-1.6 0-2.2l4.4-4.4c0.6-0.6 1.6-0.6 2.2 0s0.6 1.6 0 2.2l-1.3 1.3c0.4 0.8 0.5 1.7 0.4 2.5l2.3-2.3c1.5-1.4 1.5-3.7 0-5.1z\"/><path d=\"M10.2 5.1l-1.5 1.5c0 0 0.3 0.2 0.4 0.3 0.6 0.6 0.6 1.6 0 2.2l-4.4 4.4c-0.6 0.6-1.6 0.6-2.2 0s-0.6-1.6 0-2.2l1.3-1.3c-0.4-0.8-0.1-1.3-0.4-2.5l-2.3 2.3c-1.4 1.4-1.4 3.7 0 5.1s3.7 1.4 5.1 0l4.4-4.4c1.4-1.4 1.4-3.7 0-5.1-0.2-0.1-0.4-0.3-0.4-0.3z\"/></g>\n<g id=\"list-ol\"><path d=\"M4 0h12v4h-12v-4z\"/><path d=\"M4 6h12v4h-12v-4z\"/><path d=\"M4 12h12v4h-12v-4z\"/><path d=\"M1 0l-0.9 0.5 0.2 0.7 0.7-0.3v3.1h1v-4z\"/><path d=\"M2.2 13.9c0.3-0.2 0.5-0.5 0.5-0.8 0-0.5-0.4-1-1.3-1-0.5 0-1 0.1-1.2 0.3h-0.1l0.2 0.8 0.1-0.1c0.1-0.1 0.4-0.2 0.7-0.2s0.4 0.1 0.4 0.3c0 0.4-0.5 0.4-0.6 0.4h-0.4v0.7h0.4c0.3 0 0.6 0.1 0.6 0.4 0 0.2-0.2 0.4-0.6 0.4s-0.7-0.2-0.8-0.2l-0.1-0.1v0.9h0.1c0.2 0.2 0.6 0.3 1.1 0.3 1 0 1.6-0.5 1.6-1.2 0-0.4-0.2-0.8-0.6-0.9z\"/><path d=\"M0.1 6.4l0.3 1c0 0 0.7-0.6 1.2-0.3 1.1 0.8-1.6 2.4-1.6 2.4v0.5h3v-1h-1.2c0.6-0.5 1.2-1.2 1-1.9-0.5-1.9-2.7-0.7-2.7-0.7z\"/></g>\n<g id=\"list-select\"><path d=\"M1 0h12v2h-12v-2z\"/><path d=\"M1 8h13v2h-13v-2z\"/><path d=\"M1 11h11v2h-11v-2z\"/><path d=\"M1 14h14v2h-14v-2z\"/><path d=\"M0 3v4h16v-4h-16zM11 6h-10v-2h10v2z\"/></g>\n<g id=\"list-ul\"><path d=\"M0 1h3v3h-3v-3z\"/><path d=\"M0 6h3v3h-3v-3z\"/><path d=\"M0 11h3v3h-3v-3z\"/><path d=\"M5 1h11v3h-11v-3z\"/><path d=\"M5 6h11v3h-11v-3z\"/><path d=\"M5 11h11v3h-11v-3z\"/></g>\n<g id=\"list\"><path d=\"M0 0h4v3h-4v-3z\"/><path d=\"M0 4h4v3h-4v-3z\"/><path d=\"M0 12h4v3h-4v-3z\"/><path d=\"M0 8h4v3h-4v-3z\"/><path d=\"M5 0h11v3h-11v-3z\"/><path d=\"M5 4h11v3h-11v-3z\"/><path d=\"M5 12h11v3h-11v-3z\"/><path d=\"M5 8h11v3h-11v-3z\"/></g>\n<g id=\"location-arrow-circle-o\"><path d=\"M1 8c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7-7-3.1-7-7zM0 8c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8-8 3.6-8 8v0z\"/><path d=\"M2 9l10-5-5 10v-5z\"/></g>\n<g id=\"location-arrow-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 14v-5h-5l10-5-5 10z\"/></g>\n<g id=\"location-arrow\"><path d=\"M0 9l16-9-9 16v-7z\"/></g>\n<g id=\"lock\"><path d=\"M12 8v-3.1c0-2.2-1.6-3.9-3.8-3.9h-0.3c-2.1 0-3.9 1.7-3.9 3.9v3.1h-1l0.1 5c0 0-0.1 3 4.9 3s5-3 5-3v-5h-1zM9 14h-1v-2c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1v3zM10 8h-4v-3.1c0-1.1 0.9-1.9 1.9-1.9h0.3c1 0 1.8 0.8 1.8 1.9v3.1z\"/></g>\n<g id=\"magic\"><path d=\"M0 5h3v1h-3v-1z\"/><path d=\"M5 0h1v3h-1v-3z\"/><path d=\"M6 11h-1v-2.5l1 1z\"/><path d=\"M11 6h-1.5l-1-1h2.5z\"/><path d=\"M3.131 7.161l0.707 0.707-2.97 2.97-0.707-0.707 2.97-2.97z\"/><path d=\"M10.131 0.161l0.707 0.707-2.97 2.97-0.707-0.707 2.97-2.97z\"/><path d=\"M0.836 0.199l3.465 3.465-0.707 0.707-3.465-3.465 0.707-0.707z\"/><path d=\"M6.1 4.1l-2.1 2 9.8 9.9 2.2-2.1-9.9-9.8zM6.1 5.5l2.4 2.5-0.6 0.6-2.5-2.5 0.7-0.6z\"/></g>\n<g id=\"magnet\"><path d=\"M11 0h5v4h-5v-4z\"/><path d=\"M11 5v3c0 1.6-1.4 3-3 3s-3-1.4-3-3v-3h-5v3c0 4.4 3.6 8 8 8s8-3.6 8-8v-3h-5z\"/><path d=\"M0 0h5v4h-5v-4z\"/></g>\n<g id=\"mailbox\"><path d=\"M13 1h-10l-3 9v5h16v-5l-3-9zM11 10v2h-6v-2h-3.9l2.7-8h8.6l2.7 8h-4.1z\"/></g>\n<g id=\"male\"><path d=\"M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M12.79 7.32l-2.6-2.63c-0.421-0.426-1.004-0.69-1.65-0.69h-1.070c-0 0-0 0-0.001 0-0.648 0-1.235 0.264-1.659 0.69l-2.6 2.63c-0.216 0.129-0.358 0.362-0.358 0.628 0 0.403 0.327 0.73 0.73 0.73 0.266 0 0.499-0.142 0.626-0.355l1.792-1.793v9.47h1.5v-5h1v5h1.5v-9.47l1.75 1.8c0.135 0.175 0.344 0.287 0.58 0.287 0.403 0 0.73-0.327 0.73-0.73 0-0.228-0.105-0.432-0.269-0.566z\"/></g>\n<g id=\"map-marker\"><path d=\"M8 0c-2.8 0-5 2.2-5 5s4 11 5 11c1 0 5-8.2 5-11s-2.2-5-5-5zM8 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z\"/></g>\n<g id=\"margin-bottom\"><path d=\"M0 0v14h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v-13h-16zM15 12h-14v-11h14v11z\"/><path d=\"M0 15h1v1h-1v-1z\"/><path d=\"M1 14h1v1h-1v-1z\"/><path d=\"M2 15h1v1h-1v-1z\"/><path d=\"M3 14h1v1h-1v-1z\"/><path d=\"M4 15h1v1h-1v-1z\"/><path d=\"M5 14h1v1h-1v-1z\"/><path d=\"M6 15h1v1h-1v-1z\"/><path d=\"M7 14h1v1h-1v-1z\"/><path d=\"M8 15h1v1h-1v-1z\"/><path d=\"M9 14h1v1h-1v-1z\"/><path d=\"M10 15h1v1h-1v-1z\"/><path d=\"M11 14h1v1h-1v-1z\"/><path d=\"M12 15h1v1h-1v-1z\"/><path d=\"M13 14h1v1h-1v-1z\"/><path d=\"M14 15h1v1h-1v-1z\"/><path d=\"M15 14h1v1h-1v-1z\"/></g>\n<g id=\"margin-left\"><path d=\"M2 0v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h13v-16h-14zM15 15h-11v-14h11v14z\"/><path d=\"M0 0h1v1h-1v-1z\"/><path d=\"M1 1h1v1h-1v-1z\"/><path d=\"M0 2h1v1h-1v-1z\"/><path d=\"M1 3h1v1h-1v-1z\"/><path d=\"M0 4h1v1h-1v-1z\"/><path d=\"M1 5h1v1h-1v-1z\"/><path d=\"M0 6h1v1h-1v-1z\"/><path d=\"M1 7h1v1h-1v-1z\"/><path d=\"M0 8h1v1h-1v-1z\"/><path d=\"M1 9h1v1h-1v-1z\"/><path d=\"M0 10h1v1h-1v-1z\"/><path d=\"M1 11h1v1h-1v-1z\"/><path d=\"M0 12h1v1h-1v-1z\"/><path d=\"M1 13h1v1h-1v-1z\"/><path d=\"M0 14h1v1h-1v-1z\"/><path d=\"M1 15h1v1h-1v-1z\"/></g>\n<g id=\"margin-right\"><path d=\"M14 2v-1h-1v-1h-13v16h14v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1zM12 15h-11v-14h11v14z\"/><path d=\"M15 15h1v1h-1v-1z\"/><path d=\"M14 14h1v1h-1v-1z\"/><path d=\"M15 13h1v1h-1v-1z\"/><path d=\"M14 12h1v1h-1v-1z\"/><path d=\"M15 11h1v1h-1v-1z\"/><path d=\"M14 10h1v1h-1v-1z\"/><path d=\"M15 9h1v1h-1v-1z\"/><path d=\"M14 8h1v1h-1v-1z\"/><path d=\"M15 7h1v1h-1v-1z\"/><path d=\"M14 6h1v1h-1v-1z\"/><path d=\"M15 5h1v1h-1v-1z\"/><path d=\"M14 4h1v1h-1v-1z\"/><path d=\"M15 3h1v1h-1v-1z\"/><path d=\"M14 2h1v1h-1v-1z\"/><path d=\"M15 1h1v1h-1v-1z\"/><path d=\"M14 0h1v1h-1v-1z\"/></g>\n<g id=\"margin-top\"><path d=\"M15 2v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v13h16v-14h-1zM15 15h-14v-11h14v11z\"/><path d=\"M15 0h1v1h-1v-1z\"/><path d=\"M14 1h1v1h-1v-1z\"/><path d=\"M13 0h1v1h-1v-1z\"/><path d=\"M12 1h1v1h-1v-1z\"/><path d=\"M11 0h1v1h-1v-1z\"/><path d=\"M10 1h1v1h-1v-1z\"/><path d=\"M9 0h1v1h-1v-1z\"/><path d=\"M8 1h1v1h-1v-1z\"/><path d=\"M7 0h1v1h-1v-1z\"/><path d=\"M6 1h1v1h-1v-1z\"/><path d=\"M5 0h1v1h-1v-1z\"/><path d=\"M4 1h1v1h-1v-1z\"/><path d=\"M3 0h1v1h-1v-1z\"/><path d=\"M2 1h1v1h-1v-1z\"/><path d=\"M1 0h1v1h-1v-1z\"/><path d=\"M0 1h1v1h-1v-1z\"/></g>\n<g id=\"margin\"><path d=\"M0 0h1v1h-1v-1z\"/><path d=\"M2 0h1v1h-1v-1z\"/><path d=\"M1 1h1v1h-1v-1z\"/><path d=\"M0 2h1v1h-1v-1z\"/><path d=\"M2 2h1v1h-1v-1z\"/><path d=\"M1 3h1v1h-1v-1z\"/><path d=\"M0 4h1v1h-1v-1z\"/><path d=\"M1 5h1v1h-1v-1z\"/><path d=\"M0 6h1v1h-1v-1z\"/><path d=\"M1 7h1v1h-1v-1z\"/><path d=\"M0 8h1v1h-1v-1z\"/><path d=\"M1 9h1v1h-1v-1z\"/><path d=\"M0 10h1v1h-1v-1z\"/><path d=\"M1 11h1v1h-1v-1z\"/><path d=\"M0 12h1v1h-1v-1z\"/><path d=\"M1 13h1v1h-1v-1z\"/><path d=\"M0 14h1v1h-1v-1z\"/><path d=\"M2 14h1v1h-1v-1z\"/><path d=\"M1 15h1v1h-1v-1z\"/><path d=\"M3 15h1v1h-1v-1z\"/><path d=\"M5 15h1v1h-1v-1z\"/><path d=\"M4 0h1v1h-1v-1z\"/><path d=\"M3 1h1v1h-1v-1z\"/><path d=\"M5 1h1v1h-1v-1z\"/><path d=\"M4 14h1v1h-1v-1z\"/><path d=\"M6 0h1v1h-1v-1z\"/><path d=\"M8 0h1v1h-1v-1z\"/><path d=\"M7 1h1v1h-1v-1z\"/><path d=\"M6 14h1v1h-1v-1z\"/><path d=\"M8 14h1v1h-1v-1z\"/><path d=\"M7 15h1v1h-1v-1z\"/><path d=\"M9 15h1v1h-1v-1z\"/><path d=\"M11 15h1v1h-1v-1z\"/><path d=\"M10 0h1v1h-1v-1z\"/><path d=\"M9 1h1v1h-1v-1z\"/><path d=\"M11 1h1v1h-1v-1z\"/><path d=\"M10 14h1v1h-1v-1z\"/><path d=\"M12 0h1v1h-1v-1z\"/><path d=\"M14 0h1v1h-1v-1z\"/><path d=\"M13 1h1v1h-1v-1z\"/><path d=\"M13 2h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1zM12 12h-8v-8h8v8z\"/><path d=\"M14 2h1v1h-1v-1z\"/><path d=\"M14 4h1v1h-1v-1z\"/><path d=\"M14 6h1v1h-1v-1z\"/><path d=\"M14 8h1v1h-1v-1z\"/><path d=\"M14 10h1v1h-1v-1z\"/><path d=\"M14 12h1v1h-1v-1z\"/><path d=\"M13 13h1v1h-1v-1z\"/><path d=\"M12 14h1v1h-1v-1z\"/><path d=\"M14 14h1v1h-1v-1z\"/><path d=\"M13 15h1v1h-1v-1z\"/><path d=\"M15 15h1v1h-1v-1z\"/><path d=\"M15 1h1v1h-1v-1z\"/><path d=\"M15 3h1v1h-1v-1z\"/><path d=\"M15 5h1v1h-1v-1z\"/><path d=\"M15 7h1v1h-1v-1z\"/><path d=\"M15 9h1v1h-1v-1z\"/><path d=\"M15 11h1v1h-1v-1z\"/><path d=\"M15 13h1v1h-1v-1z\"/></g>\n<g id=\"medal\"><path d=\"M10 12.2c-0.3 0-0.5-0.1-0.8-0.2l-1.2-0.5-1.2 0.5c-0.2 0.1-0.5 0.2-0.8 0.2-0.2 0-0.3 0-0.5-0.1l-0.5 3.9 3-2 3 2-0.6-3.9c-0.1 0.1-0.3 0.1-0.4 0.1z\"/><path d=\"M12.9 5.9c-0.1-0.2-0.1-0.5 0-0.7l0.6-1.2c0.2-0.4 0-0.9-0.5-1.1l-1.3-0.5c-0.2-0.1-0.4-0.3-0.5-0.5l-0.5-1.3c-0.1-0.4-0.4-0.6-0.7-0.6-0.1 0-0.3 0-0.4 0.1l-1.3 0.6c-0.1 0-0.2 0-0.3 0s-0.2 0-0.3-0.1l-1.3-0.5c-0.1-0.1-0.3-0.1-0.4-0.1-0.3 0-0.6 0.2-0.8 0.5l-0.5 1.4c0 0.2-0.2 0.4-0.4 0.5l-1.4 0.5c-0.4 0.1-0.6 0.6-0.4 1.1l0.6 1.3c0.1 0.2 0.1 0.5 0 0.7l-0.6 1.2c-0.2 0.4 0 0.9 0.5 1.1l1.3 0.5c0.2 0.1 0.4 0.3 0.5 0.5l0.5 1.3c0.1 0.4 0.4 0.6 0.7 0.6 0.1 0 0.2 0 0.3-0.1l1.3-0.6c0.1 0 0.2-0.1 0.3-0.1s0.2 0 0.3 0.1l1.3 0.6c0.1 0.1 0.2 0.1 0.3 0.1 0.3 0 0.6-0.2 0.8-0.5l0.5-1.3c0.1-0.2 0.3-0.4 0.5-0.5l1.3-0.5c0.4-0.2 0.7-0.7 0.5-1.1l-0.5-1.4zM8 9.6c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4c0 2.2-1.8 4-4 4z\"/><path d=\"M11 5.6c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z\"/></g>\n<g id=\"megafone\"><path d=\"M15.5 5.4l-0.5-0.4v-4c0-0.6-0.4-1-1-1s-1 0.4-1 1v0.5c-2 0.9-5 2.5-8 2.5h-2.5c-1.4 0-2.5 1.2-2.5 2.5 0 0.9 0.5 1.7 1.2 2.1l1.1 5.9c0 0.3 0.3 0.5 0.7 0.5 0.1 0 0.1 0 0.2 0l3.6-0.7c0.4-0.1 0.6-0.4 0.5-0.7-0.3-0.6-0.8-1.5-1.2-1.8-0.2-0.1-0.5-0.9-0.7-1.8h0.6v-0.9c2.7 0.3 6 1.6 7 2.4v0.5c0 0.6 0.4 1 1 1s1-0.4 1-1v-4l0.4-0.3c0.4-0.3 0.6-0.7 0.6-1.1v-0.2c0-0.4-0.2-0.7-0.5-1zM2 5h3v1h-3v-1zM5.6 12.6c0.1 0 0.3 0.3 0.5 0.7l-2.8 0.7-1-5h1.9c0.2 1.3 0.6 3.2 1.4 3.6zM13 10.3c-1.6-0.8-4.4-2-7-2.3v-3c2.6-0.3 5.4-1.4 7-2.3v7.6z\"/></g>\n<g id=\"meh-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M7 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M11 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M4 10h8v1h-8v-1z\"/></g>\n<g id=\"menu\"><path d=\"M0 1h16v3h-16v-3z\"/><path d=\"M0 6h16v3h-16v-3z\"/><path d=\"M0 11h16v3h-16v-3z\"/></g>\n<g id=\"microphone\"><path d=\"M8 10v0c-1.7 0-3-1.3-3-3v-4c0-1.6 1.3-3 3-3v0c1.6 0 3 1.3 3 3v4c0 1.6-1.4 3-3 3z\"/><path d=\"M12 5v2.5c0 1.9-1.8 3.5-3.8 3.5h-0.4c-2 0-3.8-1.6-3.8-3.5v-2.5c-0.6 0-1 0.4-1 1v1.5c0 2.2 1.8 4.1 4 4.4v2.1c-3 0-2.5 2-2.5 2h7c0 0 0.5-2-2.5-2v-2.1c2.2-0.4 4-2.2 4-4.4v-1.5c0-0.6-0.4-1-1-1z\"/></g>\n<g id=\"minus-circle-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M3 7h10v2h-10v-2z\"/></g>\n<g id=\"minus-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM13 9h-10v-2h10v2z\"/></g>\n<g id=\"minus-square-o\"><path d=\"M4 7h8v2h-8v-2z\"/><path d=\"M15 1h-14v14h14v-14zM14 14h-12v-12h12v12z\"/></g>\n<g id=\"minus\"><path d=\"M2 7h12v2h-12v-2z\"/></g>\n<g id=\"mobile-browser\"><path d=\"M16 0h-13v5h-3v11h7v-3h9v-13zM6 1h9v1h-9v-1zM4 1h1v1h-1v-1zM4 15h-1v-1h1v1zM6 13h-5v-7h5v7zM15 12h-8v-7h-3v-2h11v9z\"/></g>\n<g id=\"mobile-retro\"><path d=\"M11 0h-1v2h-6v14h7v-16zM6 14h-1v-1h1v1zM6 12h-1v-1h1v1zM6 10h-1v-1h1v1zM8 14h-1v-1h1v1zM8 12h-1v-1h1v1zM8 10h-1v-1h1v1zM10 14h-1v-1h1v1zM10 12h-1v-1h1v1zM10 10h-1v-1h1v1zM10 8h-5v-4h5v4z\"/></g>\n<g id=\"mobile\"><path d=\"M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z\"/></g>\n<g id=\"modal-list\"><path d=\"M3 6h2v1h-2v-1z\"/><path d=\"M6 6h7v1h-7v-1z\"/><path d=\"M3 8h2v1h-2v-1z\"/><path d=\"M6 8h7v1h-7v-1z\"/><path d=\"M3 10h2v1h-2v-1z\"/><path d=\"M6 10h7v1h-7v-1z\"/><path d=\"M0 1v14h16v-14h-16zM15 14h-14v-10h14v10zM15 3h-1v-1h1v1z\"/></g>\n<g id=\"modal\"><path d=\"M0 1v14h16v-14h-16zM15 14h-14v-10h14v10zM15 3h-1v-1h1v1z\"/></g>\n<g id=\"money-deposit\"><path d=\"M8 16l-2-3h1v-2h2v2h1l-2 3z\"/><path d=\"M15 1v8h-14v-8h14zM16 0h-16v10h16v-10z\"/><path d=\"M8 2c1.657 0 3 1.343 3 3s-1.343 3-3 3h5v-1h1v-4h-1v-1h-5z\"/><path d=\"M5 5c0-1.657 1.343-3 3-3h-5v1h-1v4h1v1h5c-1.657 0-3-1.343-3-3z\"/></g>\n<g id=\"money-exchange\"><path d=\"M16 14l-3 2v-1h-4.75l2-2h2.75v-1l3 2z\"/><path d=\"M0 2l3-2v1h4.75l-2 2h-2.75v1l-3-2z\"/><path d=\"M9.74 0l-9.74 9.74 6.26 6.26 9.74-9.74zM1.39 9.74l8.35-8.35 4.87 4.87-8.35 8.35z\"/><path d=\"M4.17 9.74l-0.7 0.7 2.090 2.090 0.7-0.7 0.74 0.69 2.74-2.78c-0.445 0.445-1.060 0.721-1.74 0.721-1.359 0-2.461-1.102-2.461-2.461 0-0.68 0.275-1.295 0.721-1.74l-2.78 2.74z\"/><path d=\"M12.52 5.57l-2.090-2.090-0.7 0.7-0.73-0.7-2.74 2.78c0.445-0.445 1.060-0.721 1.74-0.721 1.359 0 2.461 1.102 2.461 2.461 0 0.68-0.275 1.295-0.721 1.74l2.78-2.74-0.7-0.7z\"/></g>\n<g id=\"money-withdraw\"><path d=\"M8 0l2 3h-1v2h-2v-2h-1l2-3z\"/><path d=\"M15 7v8h-14v-8h14zM16 6h-16v10h16v-10z\"/><path d=\"M8 8c1.657 0 3 1.343 3 3s-1.343 3-3 3h5v-1h1v-4h-1v-1h-5z\"/><path d=\"M5 11c0-1.657 1.343-3 3-3h-5v1h-1v4h1v1h5c-1.657 0-3-1.343-3-3z\"/></g>\n<g id=\"money\"><path d=\"M15 4v8h-14v-8h14zM16 3h-16v10h16v-10z\"/><path d=\"M8 5c1.7 0 3 1.3 3 3s-1.3 3-3 3h5v-1h1v-4h-1v-1h-5z\"/><path d=\"M5 8c0-1.7 1.3-3 3-3h-5v1h-1v4h1v1h5c-1.7 0-3-1.3-3-3z\"/></g>\n<g id=\"moon-o\"><path d=\"M13.2 11.9c-4.5 0-8.1-3.6-8.1-8.1 0-1.4 0.3-2.7 0.9-3.8-3.4 0.9-6 4.1-6 7.9 0 4.5 3.6 8.1 8.1 8.1 3.1 0 5.8-1.8 7.2-4.4-0.6 0.2-1.3 0.3-2.1 0.3zM8.1 15c-3.9 0-7.1-3.2-7.1-7.1 0-2.5 1.3-4.7 3.3-6-0.2 0.6-0.2 1.2-0.2 1.9 0 5 4.1 9.1 9.1 9.2-1.4 1.2-3.2 2-5.1 2z\"/></g>\n<g id=\"moon\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8 15c-3.9 0-7-3.1-7-7 0-2.4 1.2-4.6 3.2-5.9-0.1 0.6-0.2 1.3-0.2 1.9 0 4.9 4 8.9 8.9 9-1.3 1.3-3 2-4.9 2z\"/></g>\n<g id=\"morning\"><path d=\"M14 10l-1.58-1.18 0.78-1.82-2-0.23-0.2-1.97-1.82 0.78-1.18-1.58-1.18 1.58-1.82-0.78-0.23 2-1.97 0.2 0.78 1.82-1.58 1.18h-2v1h16v-1h-2zM4 10c0.075-2.178 1.822-3.925 3.993-4 2.185 0.075 3.932 1.821 4.007 3.993l-8 0.007z\"/></g>\n<g id=\"movie\"><path d=\"M12 7v-3h-12v9h12v-3l4 2v-7l-4 2zM9 11h-7v-5h7v5z\"/><path d=\"M5 8.4c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M8 8.4c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/></g>\n<g id=\"music\"><path d=\"M4 3v9.4c-0.4-0.2-0.9-0.4-1.5-0.4-1.4 0-2.5 0.9-2.5 2s1.1 2 2.5 2 2.5-0.9 2.5-2v-7.3l7-2.3v5.1c-0.4-0.3-0.9-0.5-1.5-0.5-1.4 0-2.5 0.9-2.5 2s1.1 2 2.5 2 2.5-0.9 2.5-2v-11l-9 3z\"/></g>\n<g id=\"mute\"><path d=\"M15.2 0l-4.2 4.2v-1.2c0-1.7-1.3-3-3-3s-3 1.3-3 3v4c0 0.9 0.4 1.7 1 2.2l-0.8 0.8c-0.7-0.6-1.2-1.5-1.2-2.5v-2.5c-0.6 0-1 0.4-1 1v1.5c0 1.3 0.6 2.4 1.5 3.2l-4.5 4.6v0.7h0.7l15.3-15.4v-0.6h-0.8z\"/><path d=\"M12.5 5.1l-0.5 0.5v1.9c0 1.9-1.8 3.5-3.8 3.5h-0.4c-0.3 0-0.6-0.1-0.9-0.1l-0.9 0.7c0.3 0.1 0.6 0.2 1 0.3v2.1c-3 0-2.5 2-2.5 2h7c0 0 0.5-2-2.5-2v-2.1c2.2-0.4 4-2.2 4-4.4v-1.5c0-0.4-0.2-0.7-0.5-0.9z\"/><path d=\"M11 7v-0.4l-3.3 3.4c0.1 0 0.2 0 0.3 0 1.7 0 3-1.4 3-3z\"/></g>\n<g id=\"native-button\"><path d=\"M15 12h-14c-0.6 0-1-0.4-1-1v-6c0-0.6 0.4-1 1-1h14c0.6 0 1 0.4 1 1v6c0 0.6-0.4 1-1 1z\"/></g>\n<g id=\"newspaper\"><path d=\"M2 4h11v4h-11v-4z\"/><path d=\"M2 2h11v1h-11v-1z\"/><path d=\"M8 13h3v1h-3v-1z\"/><path d=\"M8 11h5v1h-5v-1z\"/><path d=\"M8 9h5v1h-5v-1z\"/><path d=\"M2 13h5v1h-5v-1z\"/><path d=\"M2 11h5v1h-5v-1z\"/><path d=\"M2 9h5v1h-5v-1z\"/><path d=\"M15 2v-2h-15v14.5c0 0.828 0.672 1.5 1.5 1.5h13c0.828 0 1.5-0.672 1.5-1.5v-12.5h-1zM1.5 15c-0.276 0-0.5-0.224-0.5-0.5v-13.5h13v12.5c0 1.5 1 1.5 1 1.5h-13.5z\"/></g>\n<g id=\"notebook\"><path d=\"M2 0v1h-0.52c-0.265 0-0.48 0.215-0.48 0.48v0c-0.001 0.012-0.002 0.026-0.002 0.040 0 0.265 0.215 0.48 0.48 0.48 0.001 0 0.001 0 0.002 0h0.52v1h-0.52c-0.265 0-0.48 0.215-0.48 0.48v0c-0.001 0.012-0.002 0.026-0.002 0.040 0 0.265 0.215 0.48 0.48 0.48 0.001 0 0.001 0 0.002 0h0.52v1h-0.52c-0.265 0-0.48 0.215-0.48 0.48 0 0 0 0 0 0v0c-0.001 0.012-0.002 0.026-0.002 0.040 0 0.265 0.215 0.48 0.48 0.48 0.001 0 0.001 0 0.002 0h0.52v1h-0.52c-0.265 0-0.48 0.215-0.48 0.48 0 0 0 0 0 0v0c-0.001 0.012-0.002 0.026-0.002 0.040 0 0.265 0.215 0.48 0.48 0.48 0.001 0 0.001 0 0.002 0h0.52v1h-0.52c-0.265 0-0.48 0.215-0.48 0.48 0 0 0 0 0 0v0c0 0.265 0.215 0.48 0.48 0.48 0 0 0 0 0 0h0.52v1h-0.52c-0.265 0-0.48 0.215-0.48 0.48 0 0 0 0 0 0v0c0 0.265 0.215 0.48 0.48 0.48 0 0 0 0 0 0h0.52v1h-0.52c-0.265 0-0.48 0.215-0.48 0.48 0 0 0 0 0 0v0c0 0.265 0.215 0.48 0.48 0.48 0 0 0 0 0 0h0.52v2h12v-15.88h-12zM3.5 14c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5zM3.5 12c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5zM3.5 10c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5zM3.5 8c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5zM3.5 6c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5zM3.5 4c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5zM3.5 2c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5zM12 6h-6v-3h6v3z\"/></g>\n<g id=\"nurse\"><path d=\"M15.2 12c-0.658-1.414-2.067-2.376-3.701-2.376-0.077 0-0.154 0.002-0.23 0.006l-3.269 3.9-3.28-3.9c-0.049-0.002-0.106-0.003-0.163-0.003-1.648 0-3.072 0.958-3.746 2.348-0.422 0.9-0.707 1.917-0.808 2.988l1.997 0.037v1h12v-1h2c-0.104-1.107-0.388-2.124-0.824-3.057z\"/><path d=\"M6.57 8.73c-0.038 0.374-0.322 0.671-0.685 0.729l2.115 2.541 2.12-2.52c-0.368-0.059-0.652-0.356-0.69-0.727-0-0.613 0.8-0.413 1.43-1.453 0-0.030 2.88-7.3-2.86-7.3s-2.86 7.27-2.86 7.27c0.63 1.050 1.44 0.85 1.43 1.46z\"/></g>\n<g id=\"office\"><path d=\"M14 15v-11h-3v-3h-9v14h-2v1h7v-3h2v3h7v-1h-2zM6 11h-2v-2h2v2zM6 8h-2v-2h2v2zM6 5h-2v-2h2v2zM9 11h-2v-2h2v2zM9 8h-2v-2h2v2zM9 5h-2v-2h2v2zM13 11h-2v-2h2v2zM13 8h-2v-2h2v2z\"/></g>\n<g id=\"open-book\"><path d=\"M15 4.7v-0.7c-1.159-1.163-2.734-1.91-4.484-1.999-0.112-0.012-0.222-0.018-0.334-0.018-0.874 0-1.657 0.394-2.179 1.013-0.556-0.617-1.357-1.007-2.249-1.007-0.090 0-0.178 0.004-0.266 0.012-1.754 0.089-3.33 0.836-4.488 1.999l-0 0.7-1 0.3v10l6.7-1.4 0.3 0.4h2l0.3-0.4 6.7 1.4v-10zM5.48 11.31c-1.275 0.037-2.467 0.358-3.526 0.902l0.046-7.792c0.885-0.835 2.066-1.365 3.369-1.42 0.806 0.054 1.534 0.303 2.159 0.701l-0.019 7.869c-0.555-0.166-1.193-0.262-1.854-0.262-0.062 0-0.124 0.001-0.185 0.003zM14 12.19c-1.013-0.522-2.205-0.843-3.468-0.88-0.056-0.001-0.108-0.002-0.161-0.002-0.66 0-1.297 0.096-1.899 0.274l0.047-7.902c0.601-0.381 1.322-0.627 2.096-0.679 1.324 0.055 2.501 0.586 3.386 1.422l-0.003 7.768z\"/></g>\n<g id=\"option-a\"><path d=\"M12.5 10h-1.5v-4h1.5c1.381 0 2.5-1.119 2.5-2.5s-1.119-2.5-2.5-2.5c-1.381 0-2.5 1.119-2.5 2.5v1.5h-4v-1.5c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5c0 1.381 1.119 2.5 2.5 2.5h1.5v4h-1.5c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5c1.381 0 2.5-1.119 2.5-2.5v-1.5h4v1.5c0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM11 3.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5h-1.5v-1.5zM5 12.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5h1.5v1.5zM5 5h-1.5c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5c0.828 0 1.5 0.672 1.5 1.5v1.5zM10 10h-4v-4h4v4zM12.5 14c-0.828 0-1.5-0.672-1.5-1.5v-1.5h1.5c0.828 0 1.5 0.672 1.5 1.5s-0.672 1.5-1.5 1.5z\"/></g>\n<g id=\"option\"><path d=\"M4 11c0 0.552 0.448 1 1 1s1-0.448 1-1v-1h-1c-0.552 0-1 0.448-1 1z\"/><path d=\"M0 0v16h16v-16h-16zM11 9c1.105 0 2 0.895 2 2s-0.895 2-2 2c-1.105 0-2-0.895-2-2v-1h-2v1c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2h1v-2h-1c-1.105 0-2-0.895-2-2s0.895-2 2-2c1.105 0 2 0.895 2 2v1h2v-1c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2h-1v2h1z\"/><path d=\"M12 5c0-0.552-0.448-1-1-1s-1 0.448-1 1v1h1c0.552 0 1-0.448 1-1z\"/><path d=\"M5 4c-0.552 0-1 0.448-1 1s0.448 1 1 1h1v-1c0-0.552-0.448-1-1-1z\"/><path d=\"M7 7h2v2h-2v-2z\"/><path d=\"M10 11c0 0.552 0.448 1 1 1s1-0.448 1-1c0-0.552-0.448-1-1-1h-1v1z\"/></g>\n<g id=\"options\"><path d=\"M5 3.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z\"/><path d=\"M3.5 0c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zM3.5 6c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5z\"/><path d=\"M3.5 8c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5zM3.5 14c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5z\"/><path d=\"M8 2h8v3h-8v-3z\"/><path d=\"M8 10h8v3h-8v-3z\"/></g>\n<g id=\"orientation\"><path d=\"M11 2.1c2 0 3 1.3 3 2.9h-1l1.5 2 1.5-2h-1c0-2.2-2-3.9-4-3.9v-1.1l-2 1.5 2 1.5v-0.9z\"/><path d=\"M9 9h6v6h-7v-15h-8v16h16v-8h-7v1zM7 8h-1v1h1v6h-6v-14h6v7z\"/><path d=\"M2 8h1v1h-1v-1z\"/><path d=\"M4 8h1v1h-1v-1z\"/></g>\n<g id=\"out\"><path d=\"M3.5 8c0.3 0 0.5 0.2 0.5 0.5v2c0 0.3-0.2 0.5-0.5 0.5s-0.5-0.2-0.5-0.5v-2c0-0.3 0.2-0.5 0.5-0.5v0zM3.5 7v0c-0.8 0-1.5 0.7-1.5 1.5v2c0 0.8 0.7 1.5 1.5 1.5v0c0.8 0 1.5-0.7 1.5-1.5v-2c0-0.8-0.7-1.5-1.5-1.5v0z\"/><path d=\"M8 7v3.5c0 0.3-0.2 0.5-0.5 0.5s-0.5-0.2-0.5-0.5v-3.5h-1v3.5c0 0.8 0.7 1.5 1.5 1.5v0c0.8 0 1.5-0.7 1.5-1.5v-3.5h-1z\"/><path d=\"M13 7h-3v1h1v4h1v-4h1z\"/><path d=\"M15 6v-1h-2.4l-3.7-3c0.1-0.2 0.1-0.3 0.1-0.5 0-0.8-0.7-1.5-1.5-1.5s-1.5 0.7-1.5 1.5c0 0.2 0 0.3 0.1 0.5l-3.7 3h-2.4v9h1v1h15v-9h-1zM6.7 2.8c0.3 0.1 0.5 0.2 0.8 0.2s0.5-0.1 0.8-0.2l2.7 2.2h-7l2.7-2.2zM14 13h-13v-7h13v7z\"/></g>\n<g id=\"outbox\"><path d=\"M6 5v6h4v-6h2l-4-5-4 5z\"/><path d=\"M13 2h-2l0.9 1h0.4l2.6 8h-3.9v2h-6v-2h-3.9l2.6-8h0.4l0.9-1h-2l-3 9v5h16v-5z\"/></g>\n<g id=\"package\"><path d=\"M8 0l-8 2v10l8 4 8-4v-10l-8-2zM8 1l2.1 0.5-5.9 1.9-2.3-0.8 6.1-1.6zM8 14.9l-7-3.5v-8.1l3 1v3.4l1 0.3v-3.3l3 1v9.2zM8.5 4.8l-2.7-0.9 6.2-1.9 2.4 0.6-5.9 2.2z\"/></g>\n<g id=\"padding-bottom\"><path d=\"M16 16v-16h-16v16h16zM1 13h1v-1h-1v-11h14v12h-1v1h1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v-1z\"/><path d=\"M12 13h1v1h-1v-1z\"/><path d=\"M13 12h1v1h-1v-1z\"/><path d=\"M11 12h1v1h-1v-1z\"/><path d=\"M9 12h1v1h-1v-1z\"/><path d=\"M10 13h1v1h-1v-1z\"/><path d=\"M8 13h1v1h-1v-1z\"/><path d=\"M6 13h1v1h-1v-1z\"/><path d=\"M7 12h1v1h-1v-1z\"/><path d=\"M5 12h1v1h-1v-1z\"/><path d=\"M3 12h1v1h-1v-1z\"/><path d=\"M4 13h1v1h-1v-1z\"/><path d=\"M2 13h1v1h-1v-1z\"/></g>\n<g id=\"padding-left\"><path d=\"M0 16h16v-16h-16v16zM3 1v1h1v-1h11v14h-12v-1h-1v1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h1z\"/><path d=\"M2 12h1v1h-1v-1z\"/><path d=\"M3 13h1v1h-1v-1z\"/><path d=\"M3 11h1v1h-1v-1z\"/><path d=\"M3 9h1v1h-1v-1z\"/><path d=\"M2 10h1v1h-1v-1z\"/><path d=\"M2 8h1v1h-1v-1z\"/><path d=\"M2 6h1v1h-1v-1z\"/><path d=\"M3 7h1v1h-1v-1z\"/><path d=\"M3 5h1v1h-1v-1z\"/><path d=\"M3 3h1v1h-1v-1z\"/><path d=\"M2 4h1v1h-1v-1z\"/><path d=\"M2 2h1v1h-1v-1z\"/></g>\n<g id=\"padding-right\"><path d=\"M16 0h-16v16h16v-16zM13 15v-1h-1v1h-11v-14h12v1h1v-1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h-1z\"/><path d=\"M13 3h1v1h-1v-1z\"/><path d=\"M12 2h1v1h-1v-1z\"/><path d=\"M12 4h1v1h-1v-1z\"/><path d=\"M12 6h1v1h-1v-1z\"/><path d=\"M13 5h1v1h-1v-1z\"/><path d=\"M13 7h1v1h-1v-1z\"/><path d=\"M13 9h1v1h-1v-1z\"/><path d=\"M12 8h1v1h-1v-1z\"/><path d=\"M12 10h1v1h-1v-1z\"/><path d=\"M12 12h1v1h-1v-1z\"/><path d=\"M13 11h1v1h-1v-1z\"/><path d=\"M13 13h1v1h-1v-1z\"/></g>\n<g id=\"padding-top\"><path d=\"M0 0v16h16v-16h-16zM15 3h-1v1h1v11h-14v-12h1v-1h-1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v1z\"/><path d=\"M3 2h1v1h-1v-1z\"/><path d=\"M2 3h1v1h-1v-1z\"/><path d=\"M4 3h1v1h-1v-1z\"/><path d=\"M6 3h1v1h-1v-1z\"/><path d=\"M5 2h1v1h-1v-1z\"/><path d=\"M7 2h1v1h-1v-1z\"/><path d=\"M9 2h1v1h-1v-1z\"/><path d=\"M8 3h1v1h-1v-1z\"/><path d=\"M10 3h1v1h-1v-1z\"/><path d=\"M12 3h1v1h-1v-1z\"/><path d=\"M11 2h1v1h-1v-1z\"/><path d=\"M13 2h1v1h-1v-1z\"/></g>\n<g id=\"padding\"><path d=\"M0 0v16h16v-16h-16zM15 3h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v1z\"/><path d=\"M3 2h1v1h-1v-1z\"/><path d=\"M4 3h1v1h-1v-1z\"/><path d=\"M6 3h1v1h-1v-1z\"/><path d=\"M5 2h1v1h-1v-1z\"/><path d=\"M7 2h1v1h-1v-1z\"/><path d=\"M9 2h1v1h-1v-1z\"/><path d=\"M8 3h1v1h-1v-1z\"/><path d=\"M10 3h1v1h-1v-1z\"/><path d=\"M12 3h1v1h-1v-1z\"/><path d=\"M11 2h1v1h-1v-1z\"/><path d=\"M13 2h1v1h-1v-1z\"/><path d=\"M12 5h1v1h-1v-1z\"/><path d=\"M13 4h1v1h-1v-1z\"/><path d=\"M12 7h1v1h-1v-1z\"/><path d=\"M13 6h1v1h-1v-1z\"/><path d=\"M12 9h1v1h-1v-1z\"/><path d=\"M13 8h1v1h-1v-1z\"/><path d=\"M12 11h1v1h-1v-1z\"/><path d=\"M13 10h1v1h-1v-1z\"/><path d=\"M12 13h1v1h-1v-1z\"/><path d=\"M13 12h1v1h-1v-1z\"/><path d=\"M2 3h1v1h-1v-1z\"/><path d=\"M3 4h1v1h-1v-1z\"/><path d=\"M2 5h1v1h-1v-1z\"/><path d=\"M3 6h1v1h-1v-1z\"/><path d=\"M2 7h1v1h-1v-1z\"/><path d=\"M3 8h1v1h-1v-1z\"/><path d=\"M2 9h1v1h-1v-1z\"/><path d=\"M3 10h1v1h-1v-1z\"/><path d=\"M2 11h1v1h-1v-1z\"/><path d=\"M2 13h1v1h-1v-1z\"/><path d=\"M3 12h1v1h-1v-1z\"/><path d=\"M4 11h1v1h-1v-1z\"/><path d=\"M4 13h1v1h-1v-1z\"/><path d=\"M5 12h1v1h-1v-1z\"/><path d=\"M6 13h1v1h-1v-1z\"/><path d=\"M7 12h1v1h-1v-1z\"/><path d=\"M9 12h1v1h-1v-1z\"/><path d=\"M8 13h1v1h-1v-1z\"/><path d=\"M11 12h1v1h-1v-1z\"/><path d=\"M10 13h1v1h-1v-1z\"/></g>\n<g id=\"paint-roll\"><path d=\"M16 6.9v-4.9h-2v-2h-13v1h-1v3h1v1h13v-2h1v3.1l-8 1v1.9h-1v0.9c0 0 0.5 0 0.5 0.9s-0.5 0.6-0.5 1.5v2.8c0 0 0 0.9 1.5 0.9s1.5-0.9 1.5-0.9v-2.8c0-0.9-0.5-0.7-0.5-1.5s0.5-0.9 0.5-0.9v-0.9h-1v-1.1l8-1z\"/></g>\n<g id=\"paintbrush\"><path d=\"M5.6 11.6l-1.2-1.2c-0.8-0.2-2-0.1-2.7 1-0.8 1.1-0.3 2.8-1.7 4.6 0 0 3.5 0 4.8-1.3 1.2-1.2 1.2-2.2 1-3l-0.2-0.1z\"/><path d=\"M5.8 8.1c-0.2 0.3-0.5 0.7-0.7 1 0 0.2-0.1 0.3-0.2 0.4l1.5 1.5c0.1-0.1 0.3-0.2 0.4-0.3 0.3-0.2 0.7-0.4 1-0.7 0.4 0 0.6-0.2 0.8-0.4l-2.2-2.2c-0.2 0.2-0.4 0.4-0.6 0.7z\"/><path d=\"M15.8 0.2c-0.3-0.3-0.7-0.3-1-0.1 0 0-3 2.5-5.9 5.1-0.4 0.4-0.7 0.7-1.1 1-0.2 0.2-0.4 0.4-0.6 0.5l2.1 2.1c0.2-0.2 0.4-0.4 0.5-0.7 0.3-0.4 0.6-0.7 0.9-1.1 2.5-3 5.1-5.9 5.1-5.9 0.3-0.2 0.3-0.6 0-0.9z\"/></g>\n<g id=\"palete\"><path d=\"M8.25 0c-6.38 0-9.11 7.38-8.010 9.92 0.82 1.89 2.62 0.080 3.34 1 1.88 2.46-2.11 3.81 0.090 4.68 2.59 1.060 12.33 0.4 12.33-8.53 0-2.69-1.34-7.070-7.75-7.070zM4.47 9c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0zM6 3.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5-0.672 1.5-1.5 1.5c-0.011 0-0.021-0-0.032-0-0.814-0.017-1.468-0.682-1.468-1.5 0-0 0-0 0-0zM8.47 14c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0zM12.47 11c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0zM12.47 6c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0z\"/></g>\n<g id=\"panel\"><path d=\"M0 0v16h16v-16h-16zM13 15h-12v-12h12v12zM15 15h-1v-1h1v1zM15 13h-1v-8h1v8zM15 4h-1v-1h1v1z\"/></g>\n<g id=\"paperclip\"><path d=\"M2.7 15.3c-0.7 0-1.4-0.3-1.9-0.8-0.9-0.9-1.2-2.5 0-3.7l8.9-8.9c1.4-1.4 3.8-1.4 5.2 0s1.4 3.8 0 5.2l-7.4 7.4c-0.2 0.2-0.5 0.2-0.7 0s-0.2-0.5 0-0.7l7.4-7.4c1-1 1-2.7 0-3.7s-2.7-1-3.7 0l-8.9 8.9c-0.8 0.8-0.6 1.7 0 2.2 0.6 0.6 1.5 0.8 2.2 0l8.9-8.9c0.2-0.2 0.2-0.5 0-0.7s-0.5-0.2-0.7 0l-7.4 7.4c-0.2 0.2-0.5 0.2-0.7 0s-0.2-0.5 0-0.7l7.4-7.4c0.6-0.6 1.6-0.6 2.2 0s0.6 1.6 0 2.2l-8.9 8.9c-0.6 0.4-1.3 0.7-1.9 0.7z\"/></g>\n<g id=\"paperplane-o\"><path d=\"M16 0l-16 8 4.7 1.6 0.3 5.4 2.5-2.8 2.5 3.8 6-16zM7.5 10.4l4.3-5.9-6.2 4.3-3-1 11.6-5.8-4.5 11.8-2.2-3.4z\"/></g>\n<g id=\"paperplane\"><path d=\"M0 8l4.9 1.4h0.1v-0.1l7.1-5.3-1.1 1.2-6.2 6.6 0.2 3.2 2.9-3.2 2.1 4.2 6-16z\"/></g>\n<g id=\"paragraph\"><path d=\"M5.5 0c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5h2.5v7h2v-14h1v14h2v-14h2v-2h-9.5z\"/></g>\n<g id=\"password\"><path d=\"M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z\"/><path d=\"M6 8c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M9 8c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M12 8c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/></g>\n<g id=\"paste\"><path d=\"M13 4h-3v-4h-10v14h6v2h10v-9l-3-3zM3 1h4v1h-4v-1zM15 15h-8v-10h5v3h3v7zM13 7v-2l2 2h-2z\"/></g>\n<g id=\"pause\"><path d=\"M0 1h7v14h-7v-14z\"/><path d=\"M9 1h7v14h-7v-14z\"/></g>\n<g id=\"pencil\"><path d=\"M1 11.9l-1 4.1 4.1-1 9.2-9.2-3.1-3.1-9.2 9.2zM1.5 15l-0.4-0.5 0.4-2 2 2-2 0.5zM10.9 4.4l-8.1 8-0.6-0.6 8.1-8 0.6 0.6z\"/><path d=\"M15.3 0.7c-1.1-1.1-2.6-0.5-2.6-0.5l-1.5 1.5 3.1 3.1 1.5-1.5c0-0.1 0.6-1.5-0.5-2.6zM13.4 1.6l-0.5-0.5c0.6-0.6 1.1-0.1 1.1-0.1l-0.6 0.6z\"/></g>\n<g id=\"phone-landline\"><path d=\"M15.88 3.86l-0.61-1.31c-0.155-0.326-0.443-0.568-0.792-0.658-1.938-0.528-4.161-0.851-6.453-0.891-2.342 0.041-4.565 0.363-6.687 0.934-0.165 0.048-0.453 0.29-0.605 0.609l-0.613 1.317c-0.075 0.152-0.119 0.331-0.12 0.52v0.87c-0.001 0.012-0.001 0.026-0.001 0.041 0 0.392 0.318 0.71 0.71 0.71 0.011 0 0.022-0 0.033-0.001l2.518 0c0.412-0.010 0.742-0.346 0.742-0.76 0-0.018-0.001-0.035-0.002-0.053l0-0.838c-0-0.004-0-0.008-0-0.012 0-0.229 0.119-0.43 0.298-0.546 0.947-0.508 2.069-0.806 3.26-0.806 0.156 0 0.31 0.005 0.464 0.015 0.122-0.011 0.288-0.017 0.456-0.017 1.178 0 2.287 0.291 3.261 0.805 0.143 0.099 0.262 0.3 0.262 0.529 0 0.004-0 0.009-0 0.013l0 0.859c-0.001 0.015-0.002 0.033-0.002 0.050 0 0.413 0.33 0.75 0.741 0.76l2.521 0c0.009 0 0.020 0.001 0.031 0.001 0.392 0 0.71-0.318 0.71-0.71 0-0.014-0-0.029-0.001-0.043l0-0.868c-0.001-0.189-0.045-0.368-0.123-0.527z\"/><path d=\"M12 8.3c-0.624-0.797-1.001-1.815-1.001-2.92 0-0.028 0-0.056 0.001-0.084l-0-0.296h-1v1h-4v-1h-1v0.33c0 0.024 0.001 0.052 0.001 0.080 0 1.105-0.377 2.122-1.009 2.93l-2.992 3.66v3h14v-3zM8 13c-1.657 0-3-1.343-3-3s1.343-3 3-3c1.657 0 3 1.343 3 3s-1.343 3-3 3z\"/><path d=\"M10 10c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/></g>\n<g id=\"phone\"><path d=\"M12.2 10c-1.1-0.1-1.7 1.4-2.5 1.8-1.3 0.7-3.7-1.8-3.7-1.8s-2.5-2.4-1.9-3.7c0.5-0.8 2-1.4 1.9-2.5-0.1-1-2.3-4.6-3.4-3.6-2.4 2.2-2.6 3.1-2.6 4.9-0.1 3.1 3.9 7 3.9 7 0.4 0.4 3.9 4 7 3.9 1.8 0 2.7-0.2 4.9-2.6 1-1.1-2.5-3.3-3.6-3.4z\"/></g>\n<g id=\"picture\"><path d=\"M16 14h-16v-12h16v12zM1 13h14v-10h-14v10z\"/><path d=\"M2 10v2h12v-1c0 0 0.2-1.7-2-2-1.9-0.3-2.2 0.6-3.8 0.6-1.1 0-0.9-1.6-3.2-1.6-1.7 0-3 2-3 2z\"/><path d=\"M13 6c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/></g>\n<g id=\"pie-bar-chart\"><path d=\"M5 11h3v5h-3v-5z\"/><path d=\"M1 14h3v2h-3v-2z\"/><path d=\"M13 12h3v4h-3v-4z\"/><path d=\"M9 9h3v7h-3v-7z\"/><path d=\"M5 0c-2.761 0-5 2.239-5 5s2.239 5 5 5c2.761 0 5-2.239 5-5s-2.239-5-5-5zM5 9c-2.209 0-4-1.791-4-4s1.791-4 4-4v4h4c0 2.209-1.791 4-4 4z\"/></g>\n<g id=\"pie-chart\"><path d=\"M9 1c3.2 0.2 5.7 2.8 6 6h-6v-6zM8.5 0c-0.2 0-0.3 0-0.5 0v8h8c0-0.2 0-0.3 0-0.5 0-4.1-3.4-7.5-7.5-7.5v0z\"/><path d=\"M7 9v-8c-3.9 0.3-7 3.5-7 7.5 0 4.1 3.4 7.5 7.5 7.5 4 0 7.2-3.1 7.5-7h-8z\"/></g>\n<g id=\"piggy-bank-coin\"><path d=\"M15.93 7.75c-0.061-0.2-0.165-0.371-0.3-0.51-0.105-0.113-0.241-0.197-0.394-0.238 0.074 0.117 0.141 0.252 0.191 0.396 0.056 0.147 0.092 0.304 0.103 0.467 0.008 0.067 0.012 0.138 0.012 0.21s-0.004 0.143-0.012 0.214c-0.035-0.115-0.083-0.208-0.142-0.292-0.123-0.166-0.288-0.299-0.48-0.383-0.119-0.053-0.248-0.082-0.384-0.082-0.346 0-0.648 0.186-0.811 0.464-0.050 0.082-0.090 0.171-0.12 0.266-1.182-1.968-3.309-3.271-5.741-3.271-0.124 0-0.247 0.003-0.369 0.010-0.763 0.001-1.517 0.11-2.231 0.313-0.062-0.434-0.632-1.314-3.252-1.314l0.8 2.51c-0.507 0.411-0.927 0.905-1.247 1.465l-1.553 0.025s-0.17 4 1 4h0.54c0.379 0.638 0.868 1.171 1.445 1.589l0.015 2.411h1.080c1.31 0 1.92 0 1.92-0.75v-0.39c0.451 0.088 0.97 0.139 1.5 0.139s1.049-0.051 1.551-0.147l-0.051 0.398c0 0.75 0.62 0.75 1.94 0.75h1.060v-2.39c0.932-0.651 1.613-1.605 1.903-2.717 0.057-0.027 0.114-0.024 0.172-0.024s0.115-0.003 0.172-0.010c0.251-0.046 0.48-0.144 0.679-0.283 0.266-0.188 0.474-0.454 0.591-0.765 0.028-0.093 0.049-0.191 0.063-0.292l0.001-0.010c0.221-0.262 0.372-0.59 0.419-0.951 0.012-0.084 0.019-0.171 0.019-0.259 0-0.197-0.032-0.386-0.091-0.563zM3.51 7.75c0.414 0 0.75 0.336 0.75 0.75s-0.336 0.75-0.75 0.75c-0.414 0-0.75-0.336-0.75-0.75s0.336-0.75 0.75-0.75zM5.88 7c-0.046 0.015-0.099 0.024-0.154 0.024-0.194 0-0.362-0.11-0.445-0.271-0.013-0.038-0.019-0.078-0.019-0.12 0-0.19 0.136-0.348 0.315-0.383 0.571-0.141 1.224-0.221 1.896-0.221 0.038 0 0.075 0 0.113 0.001 0.026-0 0.064-0.001 0.101-0.001 0.672 0 1.324 0.080 1.949 0.232 0.126 0.024 0.262 0.182 0.262 0.372 0 0.042-0.007 0.082-0.019 0.119-0.070 0.129-0.197 0.223-0.346 0.247l-0.153 0c-0.512-0.127-1.101-0.2-1.706-0.2-0.016 0-0.031 0-0.047 0-0.011-0-0.026-0-0.042-0-0.605 0-1.193 0.073-1.756 0.211zM14.58 9.93c-0.13 0.095-0.285 0.165-0.453 0.199l-0.127 0.001s0-0.13 0-0.13 0-0.21 0-0.31c0.165 0.125 0.374 0.2 0.6 0.2 0.007 0 0.014-0 0.021-0zM14.66 9.25c-0.018 0.003-0.040 0.004-0.061 0.004-0.176 0-0.327-0.103-0.398-0.252-0.044-0.084-0.069-0.18-0.069-0.283s0.025-0.199 0.070-0.283c0.059-0.082 0.157-0.138 0.269-0.138 0.059 0 0.113 0.015 0.161 0.042 0.181 0.070 0.308 0.244 0.308 0.448 0 0 0 0.001 0 0.001 0.009 0.062 0.014 0.133 0.014 0.205s-0.005 0.143-0.015 0.213c-0.066 0.012-0.144 0.024-0.224 0.024-0.019 0-0.039-0.001-0.058-0.002z\"/><path d=\"M8 3h-1v-0.17h0.25v-1.090h-0.25l0.55-0.55h0.2v1.64h0.25v0.17z\"/><path d=\"M7.5 0.75c0.828 0 1.5 0.672 1.5 1.5s-0.672 1.5-1.5 1.5c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5zM7.5 0c-1.243 0-2.25 1.007-2.25 2.25s1.007 2.25 2.25 2.25c1.243 0 2.25-1.007 2.25-2.25s-1.007-2.25-2.25-2.25v0z\"/></g>\n<g id=\"piggy-bank\"><path d=\"M15.93 5.75c-0.061-0.2-0.165-0.371-0.3-0.51-0.105-0.113-0.241-0.197-0.394-0.238 0.074 0.117 0.141 0.252 0.191 0.396 0.056 0.147 0.092 0.304 0.103 0.467 0.008 0.067 0.012 0.138 0.012 0.21s-0.004 0.143-0.012 0.214c-0.035-0.115-0.083-0.208-0.142-0.292-0.123-0.166-0.288-0.299-0.48-0.383-0.119-0.053-0.248-0.082-0.384-0.082-0.346 0-0.648 0.186-0.811 0.464-0.050 0.082-0.090 0.171-0.12 0.266-1.182-1.968-3.309-3.271-5.741-3.271-0.124 0-0.247 0.003-0.369 0.010-0.763 0.001-1.517 0.11-2.231 0.313-0.062-0.434-0.632-1.314-3.252-1.314l0.8 2.51c-0.507 0.411-0.927 0.905-1.247 1.465l-1.553 0.025s-0.17 4 1 4h0.54c0.379 0.638 0.868 1.171 1.445 1.589l0.015 2.41h1.080c1.31 0 1.92 0 1.92-0.75v-0.39c0.451 0.088 0.97 0.139 1.5 0.139s1.049-0.051 1.551-0.147l-0.051 0.398c0 0.75 0.62 0.75 1.94 0.75h1.060v-2.39c0.932-0.651 1.613-1.605 1.903-2.717 0.057-0.027 0.114-0.024 0.172-0.024s0.115-0.003 0.172-0.010c0.251-0.046 0.48-0.144 0.679-0.283 0.266-0.188 0.474-0.454 0.591-0.765 0.028-0.093 0.049-0.191 0.063-0.292l0.001-0.010c0.221-0.262 0.372-0.59 0.419-0.951 0.012-0.084 0.019-0.171 0.019-0.259 0-0.197-0.032-0.386-0.091-0.563zM3.51 5.75c0.414 0 0.75 0.336 0.75 0.75s-0.336 0.75-0.75 0.75c-0.414 0-0.75-0.336-0.75-0.75s0.336-0.75 0.75-0.75zM5.88 5c-0.046 0.015-0.099 0.024-0.154 0.024-0.194 0-0.362-0.11-0.445-0.271-0.013-0.038-0.019-0.078-0.019-0.12 0-0.19 0.136-0.348 0.315-0.383 0.571-0.141 1.224-0.221 1.896-0.221 0.038 0 0.075 0 0.113 0.001 0.026-0 0.064-0.001 0.101-0.001 0.672 0 1.324 0.080 1.949 0.232 0.126 0.024 0.262 0.182 0.262 0.372 0 0.042-0.007 0.082-0.019 0.119-0.070 0.129-0.197 0.223-0.346 0.247l-0.153 0c-0.512-0.127-1.101-0.2-1.706-0.2-0.016 0-0.031 0-0.047 0-0.011-0-0.026-0-0.042-0-0.605 0-1.193 0.073-1.756 0.211zM14.58 7.93c-0.13 0.095-0.285 0.165-0.453 0.199l-0.127 0.011s0-0.14 0-0.14 0-0.21 0-0.31c0.165 0.125 0.374 0.2 0.6 0.2 0.007 0 0.014-0 0.021-0zM14.66 7.25c-0.018 0.003-0.040 0.004-0.061 0.004-0.176 0-0.327-0.103-0.398-0.252-0.044-0.084-0.069-0.18-0.069-0.283s0.025-0.199 0.070-0.283c0.059-0.082 0.157-0.138 0.269-0.138 0.059 0 0.113 0.015 0.161 0.042 0.181 0.070 0.308 0.244 0.308 0.448 0 0 0 0.001 0 0.001 0.009 0.062 0.014 0.133 0.014 0.205s-0.005 0.143-0.015 0.213c-0.066 0.012-0.144 0.024-0.224 0.024-0.019 0-0.039-0.001-0.058-0.002z\"/></g>\n<g id=\"pill\"><path d=\"M14.8 1.4l-0.2-0.2c-0.7-0.8-1.8-1.2-2.8-1.2s-2.1 0.4-2.9 1.2l-7.7 7.7c-1.6 1.6-1.6 4.1 0 5.7l0.2 0.2c0.7 0.8 1.8 1.2 2.8 1.2s2.1-0.4 2.9-1.2l7.8-7.8c1.5-1.5 1.5-4.1-0.1-5.6zM14.1 6.4l-3.9 3.9-3.5-3.6-3.8 3.8c-1.1 1.1-1.1 2.5-1 3.5v0c-1.2-1.2-1.2-3.1 0-4.3l7.8-7.8c0.5-0.6 1.3-0.9 2.1-0.9s1.6 0.3 2.2 0.9l0.2 0.2c0.5 0.5 0.8 1.3 0.8 2.1s-0.3 1.6-0.9 2.2z\"/></g>\n<g id=\"pills\"><path d=\"M3.5 8l6.3-6.3c0.4-0.4 1-0.7 1.7-0.7s1.3 0.3 1.8 0.7c1 1 1 2.6 0 3.5l-2.8 2.8h1.4l2-2c1.4-1.4 1.4-3.6 0-4.9-0.7-0.7-1.6-1-2.5-1s-1.7 0.2-2.4 0.9l-6.3 6.4c-0.3 0.2-0.5 0.5-0.7 0.9 0.5-0.2 1-0.3 1.5-0.3z\"/><path d=\"M7.3 5.6l-2.4 2.4h4.7z\"/><path d=\"M12.5 9h-9c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5h9c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5zM12.5 15h-4.5v-4h-4.5c-1.1 0-2 0.6-2.5 1.2 0.2-1.2 1.2-2.2 2.5-2.2h9c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5z\"/></g>\n<g id=\"pin-post\"><path d=\"M15 4v-1h-6c0-1.69 1-2 1-2v-1h-5v1s1 0.31 1 2h-6v12h2v1h14v-12h-1zM14 14h-13v-10h4v1h2v2h1v-2h2v-1h4v10z\"/></g>\n<g id=\"pin\"><path d=\"M11 6.5v-5.5h1v-1h-8v1h1v5.5c0 0-2 1.5-2 3.5 0 0.5 1.9 0.7 4 0.7v2.2c0 0.7 0.2 1.4 0.5 2.1l0.5 1 0.5-1c0.3-0.6 0.5-1.3 0.5-2.1v-2.2c2.1 0 4-0.3 4-0.7 0-2-2-3.5-2-3.5zM7 6.6c0 0-0.5 0.3-1.6 1.4-1 1-1.5 1.9-1.5 1.9s0.1-1 0.8-1.9c0.9-1.1 1.3-1.4 1.3-1.4v-5.6h1v5.6z\"/></g>\n<g id=\"play-circle-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M6 4v8l6-4z\"/></g>\n<g id=\"play-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6 12v-8l6 4-6 4z\"/></g>\n<g id=\"play\"><path d=\"M2 1v14l12-7z\"/></g>\n<g id=\"plug\"><path d=\"M14.7 3.1c-0.4-0.4-1-0.4-1.4 0l-2.8 2.8-1.5-1.4 2.8-2.8c0.4-0.4 0.4-1 0-1.4s-1-0.4-1.4 0l-2.8 2.8-1.4-1.4-1.4 1.4 0.7 0.7-1.4 1.4c-1.4 1.4-1.5 3.5-0.5 5.1-1.7 1.5-2.6 3.8-2.6 5.7h2c0-1.3 0.4-3.2 2.1-4.4 1.5 0.8 3.4 0.5 4.6-0.7l1.4-1.4 0.7 0.7 1.4-1.4-1.4-1.4 2.8-2.8c0.5-0.5 0.5-1.1 0.1-1.5z\"/></g>\n<g id=\"plus-circle-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M13 7h-4v-4h-2v4h-4v2h4v4h2v-4h4z\"/></g>\n<g id=\"plus-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM13 9h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z\"/></g>\n<g id=\"plus-minus\"><path d=\"M10 7h6v2h-6v-2z\"/><path d=\"M4 5h-2v2h-2v2h2v2h2v-2h2v-2h-2z\"/><path d=\"M6 2l3 12h1l-3-12z\"/></g>\n<g id=\"plus-square-o\"><path d=\"M12 7h-3v-3h-2v3h-3v2h3v3h2v-3h3z\"/><path d=\"M15 1h-14v14h14v-14zM14 14h-12v-12h12v12z\"/></g>\n<g id=\"plus\"><path d=\"M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z\"/></g>\n<g id=\"pointer\"><path d=\"M12.6 5c-0.2 0-0.5 0-0.6 0 0-0.2-0.2-0.6-0.4-0.8s-0.6-0.4-1.1-0.4c-0.2 0-0.4 0-0.6 0.1-0.1-0.2-0.2-0.3-0.3-0.5-0.2-0.2-0.5-0.4-1.1-0.4-0.2 0-0.4 0-0.5 0.1v-1.7c0-0.6-0.4-1.4-1.4-1.4-0.4 0-0.8 0.2-1.1 0.4-0.5 0.6-0.5 1.4-0.5 1.4v4.3c-0.6 0.1-1.1 0.3-1.4 0.6-0.6 0.7-0.6 1.6-0.6 2.8 0 0.2 0 0.5 0 0.7 0 1.4 0.7 2.1 1.4 2.8l0.3 0.4c1.3 1.2 2.4 1.6 5.1 1.6 2.9 0 4.2-1.6 4.2-5.1v-2.5c0-0.7-0.2-2.1-1.4-2.4zM13 7.4v2.6c0 3.4-1.3 4.1-3.2 4.1-2.4 0-3.3-0.3-4.3-1.3-0.1-0.1-0.2-0.2-0.4-0.4-0.7-0.8-1.1-1.2-1.1-2.2 0-0.2 0-0.5 0-0.7 0-1 0-1.7 0.3-2.1 0.1-0.1 0.4-0.2 0.7-0.2v0.5l-0.3 1.5c0 0.1 0 0.1 0.1 0.2s0.2 0 0.2 0l1-1.2c0-0.1 0-0.2 0-0.2v-6.2c0-0.1 0-0.5 0.2-0.7 0.1 0 0.2-0.1 0.4-0.1 0.3 0 0.4 0.3 0.4 0.4v3.1c0 0 0 0 0 0v1.2c0 0.3 0.2 0.6 0.5 0.6s0.5-0.3 0.5-0.5v-1.3c0 0 0 0 0 0 0-0.1 0.1-0.5 0.5-0.5 0.3 0 0.5 0.1 0.5 0.4v1.3c0 0.3 0.2 0.6 0.5 0.6s0.5-0.3 0.5-0.5v-0.7c0-0.1 0.1-0.3 0.5-0.3 0.2 0 0.3 0.1 0.3 0.1 0.2 0.1 0.2 0.4 0.2 0.4v0.8c0 0.3 0.2 0.5 0.4 0.5 0.3 0 0.5-0.1 0.5-0.4 0-0.1 0.1-0.2 0.2-0.3 0 0 0.1 0 0.2 0 0.6 0.2 0.7 1.2 0.7 1.5 0-0.1 0-0.1 0 0z\"/></g>\n<g id=\"power-off\"><path d=\"M10 2.3v3.3c1.2 0.7 2 2 2 3.4 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.5 0.8-2.8 2-3.4v-3.3c-2.9 0.9-5 3.5-5 6.7 0 3.9 3.1 7 7 7s7-3.1 7-7c0-3.2-2.1-5.8-5-6.7z\"/><path d=\"M7 1h2v7h-2v-7z\"/></g>\n<g id=\"presentation\"><path d=\"M16 1h-7v-1h-2v1h-7v11h5l-2 4h2.2l2-4h1.5l2 4h2.3l-2-4h5v-11zM15 11h-14v-9h14v9z\"/><path d=\"M6 4v5l4-2.5z\"/></g>\n<g id=\"print\"><path d=\"M0 10v4h2v2h12v-2h2v-4h-16zM13 15h-10v-3h10v3z\"/><path d=\"M12 6v-4l-2.7-2h-5.3v6h-4v3h16v-3h-4zM9 1l1.3 1h-1.3v-1zM11 7h-6v-6h3v2h3v4zM15 8h-1v-1h1v1z\"/></g>\n<g id=\"progressbar\"><path d=\"M0 5v6h16v-6h-16zM15 10h-14v-4h14v4z\"/><path d=\"M2 7h7v2h-7v-2z\"/></g>\n<g id=\"puzzle-piece\"><path d=\"M14.9 0.9c-1.1-1-2.5-1.3-3.1-0.4-0.7 1.1 0.5 1.7-0.3 2.5-0.5 0.6-2-0.8-2-0.8l-0.8-0.8-1.4 1.4c-0.6 0.7-2.1 1.5-2.6 1.1-0.7-0.6 0.1-1.8-0.5-2.6-0.7-1-2.1-0.8-3 0.3-1 1.1-1.4 2.4-0.5 3 1.1 0.7 1.9-0.3 2.7 0.5 0.4 0.4-0.2 1.7-0.5 2.1l-2.3 2.3 6.5 6.5 1.7-1.7c0.7-0.7 1.5-2 1.1-2.4-0.6-0.7-1.7 0.1-2.5-0.4-1-0.7-0.8-2 0.3-3s2.5-1.3 3.1-0.4c0.7 1.1-0.4 1.8 0.4 2.6 0.4 0.4 1.6-0.2 2-0.6l2.1-2.1-1.1-1.1c-0.6-0.6-1.9-2-1.4-2.5 0.6-0.7 1.7 0.2 2.5-0.4 0.9-0.8 0.6-2.1-0.4-3.1z\"/></g>\n<g id=\"pyramid-chart\"><path d=\"M10.29 5l-2.29-4-2.29 4h4.58z\"/><path d=\"M2.29 11l-2.29 4h16l-2.29-4h-11.42z\"/><path d=\"M13.14 10l-2.28-4h-5.72l-2.28 4h10.28z\"/></g>\n<g id=\"qrcode\"><path d=\"M6 0h-6v6h6v-6zM5 5h-4v-4h4v4z\"/><path d=\"M2 2h2v2h-2v-2z\"/><path d=\"M0 16h6v-6h-6v6zM1 11h4v4h-4v-4z\"/><path d=\"M2 12h2v2h-2v-2z\"/><path d=\"M10 0v6h6v-6h-6zM15 5h-4v-4h4v4z\"/><path d=\"M12 2h2v2h-2v-2z\"/><path d=\"M2 7h-2v2h3v-1h-1z\"/><path d=\"M7 9h2v2h-2v-2z\"/><path d=\"M3 7h2v1h-2v-1z\"/><path d=\"M9 12h-2v1h1v1h1v-1z\"/><path d=\"M6 7v1h-1v1h2v-2z\"/><path d=\"M8 4h1v2h-1v-2z\"/><path d=\"M9 8v1h2v-2h-3v1z\"/><path d=\"M7 6h1v1h-1v-1z\"/><path d=\"M9 14h2v2h-2v-2z\"/><path d=\"M7 14h1v2h-1v-2z\"/><path d=\"M9 11h1v1h-1v-1z\"/><path d=\"M9 3v-2h-1v-1h-1v4h1v-1z\"/><path d=\"M12 14h1v2h-1v-2z\"/><path d=\"M12 12h2v1h-2v-1z\"/><path d=\"M11 13h1v1h-1v-1z\"/><path d=\"M10 12h1v1h-1v-1z\"/><path d=\"M14 10v1h1v1h1v-2h-1z\"/><path d=\"M15 13h-1v3h2v-2h-1z\"/><path d=\"M10 10v1h3v-2h-2v1z\"/><path d=\"M12 7v1h2v1h2v-2h-2z\"/></g>\n<g id=\"question-circle-o\"><path d=\"M9 10h-2c0-2 1.2-2.6 2-3 0.3-0.1 0.5-0.2 0.7-0.4 0.1-0.1 0.3-0.3 0.1-0.7-0.2-0.5-0.8-1-1.7-1-1.4 0-1.6 1.2-1.7 1.5l-2-0.3c0.1-1.1 1-3.2 3.6-3.2 1.6 0 3 0.9 3.6 2.2 0.4 1.1 0.2 2.2-0.6 3-0.4 0.4-0.8 0.6-1.2 0.7-0.6 0.4-0.8 0.2-0.8 1.2z\"/><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M6.9 11h2v2h-2v-2z\"/></g>\n<g id=\"question-circle\"><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM8.9 13h-2v-2h2v2zM11 8.1c-0.4 0.4-0.8 0.6-1.2 0.7-0.6 0.4-0.8 0.2-0.8 1.2h-2c0-2 1.2-2.6 2-3 0.3-0.1 0.5-0.2 0.7-0.4 0.1-0.1 0.3-0.3 0.1-0.7-0.2-0.5-0.8-1-1.7-1-1.4 0-1.6 1.2-1.7 1.5l-2-0.3c0.1-1.1 1-3.2 3.6-3.2 1.6 0 3 0.9 3.6 2.2 0.4 1.1 0.2 2.2-0.6 3z\"/></g>\n<g id=\"question\"><path d=\"M9 11h-3c0-3 1.6-4 2.7-4.6 0.4-0.2 0.7-0.4 0.9-0.6 0.5-0.5 0.3-1.2 0.2-1.4-0.3-0.7-1-1.4-2.3-1.4-2.1 0-2.5 1.9-2.5 2.3l-3-0.4c0.2-1.7 1.7-4.9 5.5-4.9 2.3 0 4.3 1.3 5.1 3.2 0.7 1.7 0.4 3.5-0.8 4.7-0.5 0.5-1.1 0.8-1.6 1.1-0.9 0.5-1.2 1-1.2 2z\"/><path d=\"M9.5 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/></g>\n<g id=\"quote-left\"><path d=\"M7 7v7h-7v-7.1c0-4.8 4.5-5.4 4.5-5.4l0.6 1.4c0 0-2 0.3-2.4 1.9-0.4 1.2 0.4 2.2 0.4 2.2h3.9z\"/><path d=\"M16 7v7h-7v-7.1c0-4.8 4.5-5.4 4.5-5.4l0.6 1.4c0 0-2 0.3-2.4 1.9-0.4 1.2 0.4 2.2 0.4 2.2h3.9z\"/></g>\n<g id=\"quote-right\"><path d=\"M9 9v-7h7v7.1c0 4.8-4.5 5.4-4.5 5.4l-0.6-1.4c0 0 2-0.3 2.4-1.9 0.4-1.2-0.4-2.2-0.4-2.2h-3.9z\"/><path d=\"M0 9v-7h7v7.1c0 4.8-4.5 5.4-4.5 5.4l-0.6-1.4c0 0 2-0.3 2.4-1.9 0.4-1.2-0.4-2.2-0.4-2.2h-3.9z\"/></g>\n<g id=\"random\"><path d=\"M13 12h-2c-1 0-1.7-1.2-2.4-2.7-0.3 0.7-0.6 1.5-1 2.3 0.8 1.4 1.8 2.4 3.4 2.4h2v2l3-3-3-3v2z\"/><path d=\"M5.4 6.6c0.3-0.7 0.6-1.5 1-2.2-0.8-1.4-1.9-2.4-3.4-2.4h-3v2h3c1 0 1.7 1.2 2.4 2.6z\"/><path d=\"M16 3l-3-3v2h-2c-2.7 0-3.9 3-5 5.7-0.8 2.1-1.7 4.3-3 4.3h-3v2h3c2.6 0 3.8-2.8 4.9-5.6 0.9-2.2 1.8-4.4 3.1-4.4h2v2l3-3z\"/></g>\n<g id=\"raster-lower-left\"><path d=\"M15 7h1v1h-1v-1z\"/><path d=\"M13 7h1v1h-1v-1z\"/><path d=\"M11 7h1v1h-1v-1z\"/><path d=\"M9 7h1v1h-1v-1z\"/><path d=\"M14 6h1v1h-1v-1z\"/><path d=\"M12 6h1v1h-1v-1z\"/><path d=\"M10 6h1v1h-1v-1z\"/><path d=\"M15 5h1v1h-1v-1z\"/><path d=\"M13 5h1v1h-1v-1z\"/><path d=\"M11 5h1v1h-1v-1z\"/><path d=\"M14 4h1v1h-1v-1z\"/><path d=\"M12 4h1v1h-1v-1z\"/><path d=\"M15 3h1v1h-1v-1z\"/><path d=\"M13 3h1v1h-1v-1z\"/><path d=\"M14 2h1v1h-1v-1z\"/><path d=\"M15 1h1v1h-1v-1z\"/><path d=\"M7 15h1v1h-1v-1z\"/><path d=\"M5 15h1v1h-1v-1z\"/><path d=\"M3 15h1v1h-1v-1z\"/><path d=\"M1 15h1v1h-1v-1z\"/><path d=\"M6 14h1v1h-1v-1z\"/><path d=\"M4 14h1v1h-1v-1z\"/><path d=\"M2 14h1v1h-1v-1z\"/><path d=\"M7 13h1v1h-1v-1z\"/><path d=\"M5 13h1v1h-1v-1z\"/><path d=\"M3 13h1v1h-1v-1z\"/><path d=\"M6 12h1v1h-1v-1z\"/><path d=\"M4 12h1v1h-1v-1z\"/><path d=\"M7 11h1v1h-1v-1z\"/><path d=\"M5 11h1v1h-1v-1z\"/><path d=\"M6 10h1v1h-1v-1z\"/><path d=\"M7 9h1v1h-1v-1z\"/><path d=\"M15 15h1v1h-1v-1z\"/><path d=\"M13 15h1v1h-1v-1z\"/><path d=\"M11 15h1v1h-1v-1z\"/><path d=\"M9 15h1v1h-1v-1z\"/><path d=\"M14 14h1v1h-1v-1z\"/><path d=\"M12 14h1v1h-1v-1z\"/><path d=\"M10 14h1v1h-1v-1z\"/><path d=\"M8 14h1v1h-1v-1z\"/><path d=\"M15 13h1v1h-1v-1z\"/><path d=\"M13 13h1v1h-1v-1z\"/><path d=\"M11 13h1v1h-1v-1z\"/><path d=\"M9 13h1v1h-1v-1z\"/><path d=\"M14 12h1v1h-1v-1z\"/><path d=\"M12 12h1v1h-1v-1z\"/><path d=\"M10 12h1v1h-1v-1z\"/><path d=\"M8 12h1v1h-1v-1z\"/><path d=\"M15 11h1v1h-1v-1z\"/><path d=\"M13 11h1v1h-1v-1z\"/><path d=\"M11 11h1v1h-1v-1z\"/><path d=\"M9 11h1v1h-1v-1z\"/><path d=\"M14 10h1v1h-1v-1z\"/><path d=\"M12 10h1v1h-1v-1z\"/><path d=\"M10 10h1v1h-1v-1z\"/><path d=\"M8 10h1v1h-1v-1z\"/><path d=\"M15 9h1v1h-1v-1z\"/><path d=\"M13 9h1v1h-1v-1z\"/><path d=\"M11 9h1v1h-1v-1z\"/><path d=\"M9 9h1v1h-1v-1z\"/><path d=\"M14 8h1v1h-1v-1z\"/><path d=\"M12 8h1v1h-1v-1z\"/><path d=\"M10 8h1v1h-1v-1z\"/><path d=\"M8 8h1v1h-1v-1z\"/></g>\n<g id=\"raster\"><path d=\"M7 7h1v1h-1v-1z\"/><path d=\"M5 7h1v1h-1v-1z\"/><path d=\"M3 7h1v1h-1v-1z\"/><path d=\"M1 7h1v1h-1v-1z\"/><path d=\"M6 6h1v1h-1v-1z\"/><path d=\"M4 6h1v1h-1v-1z\"/><path d=\"M2 6h1v1h-1v-1z\"/><path d=\"M0 6h1v1h-1v-1z\"/><path d=\"M7 5h1v1h-1v-1z\"/><path d=\"M5 5h1v1h-1v-1z\"/><path d=\"M3 5h1v1h-1v-1z\"/><path d=\"M1 5h1v1h-1v-1z\"/><path d=\"M6 4h1v1h-1v-1z\"/><path d=\"M4 4h1v1h-1v-1z\"/><path d=\"M2 4h1v1h-1v-1z\"/><path d=\"M0 4h1v1h-1v-1z\"/><path d=\"M7 3h1v1h-1v-1z\"/><path d=\"M5 3h1v1h-1v-1z\"/><path d=\"M3 3h1v1h-1v-1z\"/><path d=\"M1 3h1v1h-1v-1z\"/><path d=\"M6 2h1v1h-1v-1z\"/><path d=\"M4 2h1v1h-1v-1z\"/><path d=\"M2 2h1v1h-1v-1z\"/><path d=\"M0 2h1v1h-1v-1z\"/><path d=\"M7 1h1v1h-1v-1z\"/><path d=\"M5 1h1v1h-1v-1z\"/><path d=\"M3 1h1v1h-1v-1z\"/><path d=\"M1 1h1v1h-1v-1z\"/><path d=\"M6 0h1v1h-1v-1z\"/><path d=\"M4 0h1v1h-1v-1z\"/><path d=\"M2 0h1v1h-1v-1z\"/><path d=\"M0 0h1v1h-1v-1z\"/><path d=\"M15 7h1v1h-1v-1z\"/><path d=\"M13 7h1v1h-1v-1z\"/><path d=\"M11 7h1v1h-1v-1z\"/><path d=\"M9 7h1v1h-1v-1z\"/><path d=\"M14 6h1v1h-1v-1z\"/><path d=\"M12 6h1v1h-1v-1z\"/><path d=\"M10 6h1v1h-1v-1z\"/><path d=\"M8 6h1v1h-1v-1z\"/><path d=\"M15 5h1v1h-1v-1z\"/><path d=\"M13 5h1v1h-1v-1z\"/><path d=\"M11 5h1v1h-1v-1z\"/><path d=\"M9 5h1v1h-1v-1z\"/><path d=\"M14 4h1v1h-1v-1z\"/><path d=\"M12 4h1v1h-1v-1z\"/><path d=\"M10 4h1v1h-1v-1z\"/><path d=\"M8 4h1v1h-1v-1z\"/><path d=\"M15 3h1v1h-1v-1z\"/><path d=\"M13 3h1v1h-1v-1z\"/><path d=\"M11 3h1v1h-1v-1z\"/><path d=\"M9 3h1v1h-1v-1z\"/><path d=\"M14 2h1v1h-1v-1z\"/><path d=\"M12 2h1v1h-1v-1z\"/><path d=\"M10 2h1v1h-1v-1z\"/><path d=\"M8 2h1v1h-1v-1z\"/><path d=\"M15 1h1v1h-1v-1z\"/><path d=\"M13 1h1v1h-1v-1z\"/><path d=\"M11 1h1v1h-1v-1z\"/><path d=\"M9 1h1v1h-1v-1z\"/><path d=\"M14 0h1v1h-1v-1z\"/><path d=\"M12 0h1v1h-1v-1z\"/><path d=\"M10 0h1v1h-1v-1z\"/><path d=\"M8 0h1v1h-1v-1z\"/><path d=\"M7 15h1v1h-1v-1z\"/><path d=\"M5 15h1v1h-1v-1z\"/><path d=\"M3 15h1v1h-1v-1z\"/><path d=\"M1 15h1v1h-1v-1z\"/><path d=\"M6 14h1v1h-1v-1z\"/><path d=\"M4 14h1v1h-1v-1z\"/><path d=\"M2 14h1v1h-1v-1z\"/><path d=\"M0 14h1v1h-1v-1z\"/><path d=\"M7 13h1v1h-1v-1z\"/><path d=\"M5 13h1v1h-1v-1z\"/><path d=\"M3 13h1v1h-1v-1z\"/><path d=\"M1 13h1v1h-1v-1z\"/><path d=\"M6 12h1v1h-1v-1z\"/><path d=\"M4 12h1v1h-1v-1z\"/><path d=\"M2 12h1v1h-1v-1z\"/><path d=\"M0 12h1v1h-1v-1z\"/><path d=\"M7 11h1v1h-1v-1z\"/><path d=\"M5 11h1v1h-1v-1z\"/><path d=\"M3 11h1v1h-1v-1z\"/><path d=\"M1 11h1v1h-1v-1z\"/><path d=\"M6 10h1v1h-1v-1z\"/><path d=\"M4 10h1v1h-1v-1z\"/><path d=\"M2 10h1v1h-1v-1z\"/><path d=\"M0 10h1v1h-1v-1z\"/><path d=\"M7 9h1v1h-1v-1z\"/><path d=\"M5 9h1v1h-1v-1z\"/><path d=\"M3 9h1v1h-1v-1z\"/><path d=\"M1 9h1v1h-1v-1z\"/><path d=\"M6 8h1v1h-1v-1z\"/><path d=\"M4 8h1v1h-1v-1z\"/><path d=\"M2 8h1v1h-1v-1z\"/><path d=\"M0 8h1v1h-1v-1z\"/><path d=\"M15 15h1v1h-1v-1z\"/><path d=\"M13 15h1v1h-1v-1z\"/><path d=\"M11 15h1v1h-1v-1z\"/><path d=\"M9 15h1v1h-1v-1z\"/><path d=\"M14 14h1v1h-1v-1z\"/><path d=\"M12 14h1v1h-1v-1z\"/><path d=\"M10 14h1v1h-1v-1z\"/><path d=\"M8 14h1v1h-1v-1z\"/><path d=\"M15 13h1v1h-1v-1z\"/><path d=\"M13 13h1v1h-1v-1z\"/><path d=\"M11 13h1v1h-1v-1z\"/><path d=\"M9 13h1v1h-1v-1z\"/><path d=\"M14 12h1v1h-1v-1z\"/><path d=\"M12 12h1v1h-1v-1z\"/><path d=\"M10 12h1v1h-1v-1z\"/><path d=\"M8 12h1v1h-1v-1z\"/><path d=\"M15 11h1v1h-1v-1z\"/><path d=\"M13 11h1v1h-1v-1z\"/><path d=\"M11 11h1v1h-1v-1z\"/><path d=\"M9 11h1v1h-1v-1z\"/><path d=\"M14 10h1v1h-1v-1z\"/><path d=\"M12 10h1v1h-1v-1z\"/><path d=\"M10 10h1v1h-1v-1z\"/><path d=\"M8 10h1v1h-1v-1z\"/><path d=\"M15 9h1v1h-1v-1z\"/><path d=\"M13 9h1v1h-1v-1z\"/><path d=\"M11 9h1v1h-1v-1z\"/><path d=\"M9 9h1v1h-1v-1z\"/><path d=\"M14 8h1v1h-1v-1z\"/><path d=\"M12 8h1v1h-1v-1z\"/><path d=\"M10 8h1v1h-1v-1z\"/><path d=\"M8 8h1v1h-1v-1z\"/></g>\n<g id=\"records\"><path d=\"M4 9h4v2h-4v-2z\"/><path d=\"M16 2h-1v-2h-10v2h-2v1.25l-0.6 0.75h-1.4v1.75l-1 1.25v9h12l4-5v-9zM2 5h8v2h-8v-2zM11 15h-10v-7h10v7zM12 7h-1v-3h-7v-1h8v4zM14 4.5l-1 1.25v-3.75h-7v-1h8v3.5z\"/></g>\n<g id=\"recycle\"><path d=\"M8 3.1l1.4 2.2-1.6 1.1 1.3 0.3 2.8 0.6 0.6-2.7 0.4-1.4-1.8 1.1-2-3.3h-2.2l-2.6 4.3 1.7 1z\"/><path d=\"M16 12l-2.7-4.3-1.7 1 2 3.3h-2.6v-2l-3 3 3 3v-2h3.7z\"/><path d=\"M2.4 12v0l1.4-2.3 1.7 1.1-0.9-4.2-2.8 0.7-1.3 0.3 1.6 1-2.1 3.4 1.3 2h5.7v-2z\"/></g>\n<g id=\"refresh\"><path d=\"M2.6 5.6c0.9-2.1 3-3.6 5.4-3.6 3 0 5.4 2.2 5.9 5h2c-0.5-3.9-3.8-7-7.9-7-3 0-5.6 1.6-6.9 4.1l-1.1-1.1v4h4l-1.4-1.4z\"/><path d=\"M16 9h-4.1l1.5 1.4c-0.9 2.1-3 3.6-5.5 3.6-2.9 0-5.4-2.2-5.9-5h-2c0.5 3.9 3.9 7 7.9 7 3 0 5.6-1.7 7-4.1l1.1 1.1v-4z\"/></g>\n<g id=\"reply-all\"><path d=\"M16 8c0-5-4.9-5-4.9-5h-2.1v-3l-6 6 6 6v-3h2.2c3.5 0 1.8 7 1.8 7s3-4.1 3-8z\"/><path d=\"M0 6l6 6v-1.5l-4.5-4.5 4.5-4.5v-1.5z\"/></g>\n<g id=\"reply\"><path d=\"M16 8c0-5-4.9-5-4.9-5h-5.1v-3l-6 6 6 6v-3h5.2c3.5 0 1.8 7 1.8 7s3-4.1 3-8z\"/></g>\n<g id=\"resize-h\"><path d=\"M0 7h16v2h-16v-2z\"/><path d=\"M7 6h2v-3h2l-3-3-3 3h2z\"/><path d=\"M9 10h-2v3h-2l3 3 3-3h-2z\"/></g>\n<g id=\"resize-v\"><path d=\"M7 0h2v16h-2v-16z\"/><path d=\"M3 5l-3 3 3 3v-2h3v-2h-3z\"/><path d=\"M16 8l-3-3v2h-3v2h3v2z\"/></g>\n<g id=\"retweet\"><path d=\"M2 1h12v5h2l-3 3-3-3h2v-3h-8v2h-2z\"/><path d=\"M14 14h-12v-5h-2l3-3 3 3h-2v3h8v-2h2z\"/></g>\n<g id=\"rhombus\"><path d=\"M8 0l-8 8 8 8 8-8-8-8zM2 8l6-6 6 6-6 6-6-6z\"/></g>\n<g id=\"road-branch\"><path d=\"M16 4h-16v3h3.2l3.8 3.6c1.6 1.5 3.6 2.4 5.8 2.4h3.2v-3h-3.2c-1.4 0-2.7-0.5-3.7-1.5l-1.6-1.5h8.5v-3z\"/></g>\n<g id=\"road-branches\"><path d=\"M16 4v-3h-16v3h1.7l7.7 9.5c1.3 1.6 3.1 2.5 5 2.5h1.6v-3h-1.5c-1 0-1.9-0.5-2.7-1.4l-1.3-1.6h5.5v-3h-8l-2.4-3h10.4z\"/></g>\n<g id=\"road-split\"><path d=\"M14 13v-1c0-0.2 0-4.1-2.8-5.4-2.2-1-2.2-3.5-2.2-3.6v-3h-2v3c0 0.1 0 2.6-2.2 3.6-2.8 1.3-2.8 5.2-2.8 5.4v1h-2l3 3 3-3h-2v-1c0 0 0-2.8 1.7-3.6 1.1-0.5 1.8-1.3 2.3-2 0.5 0.8 1.2 1.5 2.3 2 1.7 0.8 1.7 3.6 1.7 3.6v1h-2l3 3 3-3h-2z\"/></g>\n<g id=\"road\"><path d=\"M9 11v4h7l-4-14h-3v3h-2v-3h-3l-4 14h7v-4h2zM7 6h2v3h-2v-3z\"/></g>\n<g id=\"rocket\"><path d=\"M16 0c0 0-3.5-0.4-6.7 2.8-1.6 1.5-2.9 3.5-3.9 5.3l-2.5-0.6-1.6 1.6 2.8 1.4c-0.3 0.6-0.4 1-0.4 1l0.8 0.8c0 0 0.4-0.2 1-0.4l1.4 2.8 1.6-1.6-0.5-2.5c1.7-1 3.8-2.3 5.3-3.8 3.1-3.2 2.7-6.8 2.7-6.8zM12.8 4.8c-0.4 0.4-1.1 0.4-1.6 0-0.4-0.4-0.4-1.1 0-1.6 0.4-0.4 1.1-0.4 1.6 0 0.4 0.4 0.4 1.1 0 1.6z\"/><path d=\"M4 14.2c-0.8 0.8-2.6 0.4-2.6 0.4s-0.4-1.8 0.4-2.6c0.8-0.8 1.5-0.9 1.5-0.9s-1.3-0.3-2.1 0.6c-1.6 1.6-1 4.2-1 4.2s2.6 0.6 4.2-1c0.9-0.9 0.6-2.2 0.6-2.2s-0.2 0.7-1 1.5z\"/></g>\n<g id=\"rotate-left\"><path d=\"M8 0c-3 0-5.6 1.6-6.9 4.1l-1.1-1.1v4h4l-1.5-1.5c1-2 3.1-3.5 5.5-3.5 3.3 0 6 2.7 6 6s-2.7 6-6 6c-1.8 0-3.4-0.8-4.5-2.1l-1.5 1.3c1.4 1.7 3.6 2.8 6 2.8 4.4 0 8-3.6 8-8s-3.6-8-8-8z\"/></g>\n<g id=\"rotate-right\"><path d=\"M16 7v-4l-1.1 1.1c-1.3-2.5-3.9-4.1-6.9-4.1-4.4 0-8 3.6-8 8s3.6 8 8 8c2.4 0 4.6-1.1 6-2.8l-1.5-1.3c-1.1 1.3-2.7 2.1-4.5 2.1-3.3 0-6-2.7-6-6s2.7-6 6-6c2.4 0 4.5 1.5 5.5 3.5l-1.5 1.5h4z\"/></g>\n<g id=\"rss-square\"><path d=\"M0 0v16h16v-16h-16zM3.6 14c-0.9 0-1.6-0.7-1.6-1.6s0.7-1.6 1.6-1.6 1.6 0.7 1.6 1.6-0.6 1.6-1.6 1.6zM7.6 14c0-3.1-2.5-5.6-5.6-5.6v-2.4c4.4 0 8 3.6 8 8h-2.4zM11.6 14c0-5.3-4.3-9.6-9.6-9.6v-2.4c6.6 0 12 5.4 12 12h-2.4z\"/></g>\n<g id=\"rss\"><path d=\"M4.4 13.8c0 1.215-0.985 2.2-2.2 2.2s-2.2-0.985-2.2-2.2c0-1.215 0.985-2.2 2.2-2.2s2.2 0.985 2.2 2.2z\"/><path d=\"M10.6 16h-3.1c0-4.1-3.4-7.5-7.5-7.5v0-3.1c5.9 0 10.6 4.7 10.6 10.6z\"/><path d=\"M12.8 16c0-7.1-5.7-12.8-12.8-12.8v-3.2c8.8 0 16 7.2 16 16h-3.2z\"/></g>\n<g id=\"safe-lock\"><path d=\"M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM11.13 14.25l-0.37-0.9-0.92 0.38 0.37 0.9c-0.659 0.23-1.419 0.363-2.21 0.363s-1.551-0.133-2.259-0.378l0.419-0.885-0.92-0.38-0.37 0.9c-1.355-0.69-2.43-1.765-3.102-3.080l0.882-0.41-0.38-0.93-0.9 0.37c-0.23-0.659-0.363-1.419-0.363-2.21s0.133-1.551 0.378-2.259l0.885 0.419 0.38-0.92-0.9-0.37c0.691-1.351 1.766-2.423 3.080-3.092l0.41 0.882 0.92-0.38-0.37-0.9c0.659-0.23 1.419-0.363 2.21-0.363s1.551 0.133 2.259 0.378l-0.419 0.885 0.92 0.38 0.37-0.9c1.355 0.69 2.43 1.765 3.102 3.080l-0.882 0.41 0.38 0.92 0.9-0.37c0.23 0.659 0.363 1.419 0.363 2.21s-0.133 1.551-0.378 2.259l-0.885-0.419-0.38 0.92 0.9 0.37c-0.69 1.355-1.765 2.43-3.080 3.102z\"/><path d=\"M10.36 3.62l-1.16 2.79c-0.329-0.253-0.746-0.407-1.199-0.41h0.279l1.15-2.77c-0.426-0.14-0.917-0.223-1.427-0.23-0.023-0-0.047-0-0.071-0-2.795 0-5.060 2.265-5.060 5.060s2.265 5.060 5.060 5.060c2.795 0 5.060-2.265 5.060-5.060 0-1.904-1.052-3.563-2.606-4.426z\"/></g>\n<g id=\"safe\"><path d=\"M1 0v16h3v-1h8v1h3v-16h-14zM14 10h-1v-5h1v5zM14 3h-1v-1h-10v11h10v-1h1v2h-12v-13h12v2zM8.5 7.5c0 1.1-0.9 2-2 2s-2-0.9-2-2 0.9-2 2-2 2 0.9 2 2z\"/><path d=\"M7.5 7.5c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/></g>\n<g id=\"scale-unbalance\"><path d=\"M15.81 9l-2.47-4.93 0.83-0.15c0.239-0.044 0.418-0.251 0.418-0.5 0-0.281-0.227-0.508-0.508-0.508-0.032 0-0.063 0.003-0.093 0.009l-0.777 0.14c-0.993-0.755-2.25-1.21-3.613-1.21-0.21 0-0.418 0.011-0.623 0.032-0.036-0.5-0.457-0.882-0.967-0.882-0.003 0-0.005 0-0.008 0-0.552 0-1 0.448-1 1v0.2c-1.714 0.336-3.151 1.327-4.066 2.697l-0.754 0.153c-0.257 0.024-0.457 0.239-0.457 0.5 0 0.277 0.225 0.502 0.502 0.502 0.016 0 0.032-0.001 0.047-0.002l0.088 0 0.35-0.050-2.52 5h-0.19c0 1.1 1.34 2 3 2s3-0.9 3-2h-0.19l-2.56-5.12h0.1c0.172-0.031 0.311-0.144 0.379-0.297 0.021-0.093 0.701-1.583 3.271-2.363v10.78h-1v1h-2v1h8v-1h-2v-1h-1v-11.12c0.201-0.031 0.434-0.049 0.67-0.049 1.152 0 2.205 0.419 3.016 1.114l-0.006-0.005-2.49 5.060h-0.19c0 1.1 1.34 2 3 2s3-0.9 3-2h-0.19zM5 11h-4l2-3.94zM11 9l2-3.94 2 3.94h-4z\"/></g>\n<g id=\"scale\"><path d=\"M15.81 10l-2.5-5h0.69c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-0.79c-1.056-1.145-2.541-1.881-4.198-1.95l-0.012-0.050c0-0.552-0.448-1-1-1s-1 0.448-1 1v0.050c-1.681 0.073-3.178 0.807-4.247 1.947l-0.753 0.003c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.69l-2.5 5h-0.19c0 1.1 1.34 2 3 2s3-0.9 3-2h-0.19l-2.55-5.090c0.064-0.039 0.118-0.089 0.159-0.148 0.873-1.019 2.148-1.669 3.575-1.702l0.006 10.94h-1v1h-2v1h8v-1h-2v-1h-1v-10.94c1.418 0.030 2.679 0.682 3.524 1.693 0.053 0.084 0.117 0.145 0.193 0.186l-2.527 5.061h-0.19c0 1.1 1.34 2 3 2s3-0.9 3-2h-0.19zM5 10h-4l2-3.94zM11 10l2-3.94 2 3.94h-4z\"/></g>\n<g id=\"scatter-chart\"><path d=\"M1 15v-15h-1v16h16v-1h-15z\"/><path d=\"M5 11c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M8 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M14 5c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M11 10c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/></g>\n<g id=\"scissors\"><path d=\"M16 3.1c0 0-2.1-1.1-3.5-1-0.3 0-0.5 0.1-0.7 0.2l-4.3 3.4-1.8-1.5c0.1-0.3 0.2-0.6 0.3-1 0.1-1.8-1.4-3.4-3.3-3.2-1.2 0.1-2.3 1-2.6 2.2-0.3 1.3 0.2 2.5 1.2 3.2l3.3 2.6-3.3 2.6c-1 0.7-1.5 1.9-1.2 3.2 0.3 1.2 1.4 2 2.6 2.2 1.9 0.2 3.4-1.4 3.2-3.2 0-0.3-0.1-0.7-0.3-1l1.8-1.5 4.3 3.4c0.2 0.1 0.4 0.2 0.7 0.2 1.4 0.1 3.5-1 3.5-1l-5.7-4.9 5.8-4.9zM2.8 4.6c-0.9-0.1-1.6-0.9-1.5-1.8s0.9-1.6 1.8-1.5c0.9 0.1 1.6 0.9 1.5 1.8 0 0.9-0.9 1.6-1.8 1.5zM3.1 14.7c-0.9 0.1-1.7-0.6-1.8-1.5s0.6-1.7 1.5-1.8c0.9-0.1 1.7 0.6 1.8 1.5s-0.6 1.7-1.5 1.8zM12.4 3.2c0 0 0.1 0 0.2 0 0.4 0 0.9 0.1 1.4 0.2l-6.8 5.7-0.9-1.1 6.1-4.8zM14 12.6c-0.5 0.2-1 0.3-1.4 0.2-0.1 0-0.2 0-0.2 0l-4-3.2 1-0.9 4.6 3.9z\"/></g>\n<g id=\"screwdriver\"><path d=\"M8 10.8l0.9-0.8-0.9-0.9 5.7-5.7 1.2-0.4 1.1-2.2-0.7-0.7-2.3 1-0.5 1.2-5.6 5.7-0.9-0.9-0.8 0.9c0 0 0.8 0.6-0.1 1.5-0.5 0.5-1.3-0.1-2.8 1.4-0.5 0.5-2.1 2.1-2.1 2.1s-0.6 1 0.6 2.2 2.2 0.6 2.2 0.6 1.6-1.6 2.1-2.1c1.4-1.4 0.9-2.3 1.3-2.7 0.9-0.9 1.6-0.2 1.6-0.2zM4.9 10.4l0.7 0.7-3.8 3.8-0.7-0.7z\"/></g>\n<g id=\"search-minus\"><path d=\"M15.7 14.3l-4.2-4.2c-0.2-0.2-0.5-0.3-0.8-0.3 0.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6c1.4 0 2.8-0.5 3.8-1.4 0 0.3 0 0.6 0.3 0.8l4.2 4.2c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.3 0.4-0.9 0-1.3zM6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z\"/><path d=\"M3 5h6v2h-6v-2z\"/></g>\n<g id=\"search-plus\"><path d=\"M15.7 14.3l-4.2-4.2c-0.2-0.2-0.5-0.3-0.8-0.3 0.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6c1.4 0 2.8-0.5 3.8-1.4 0 0.3 0 0.6 0.3 0.8l4.2 4.2c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.3 0.4-0.9 0-1.3zM6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z\"/><path d=\"M7 3h-2v2h-2v2h2v2h2v-2h2v-2h-2z\"/></g>\n<g id=\"search\"><path d=\"M15.7 14.3l-4.2-4.2c-0.2-0.2-0.5-0.3-0.8-0.3 0.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6c1.4 0 2.8-0.5 3.8-1.4 0 0.3 0 0.6 0.3 0.8l4.2 4.2c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.3 0.4-0.9 0-1.3zM6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z\"/></g>\n<g id=\"select\"><path d=\"M15 4h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6c0-0.6-0.4-1-1-1zM12 9l-2-2h4l-2 2z\"/></g>\n<g id=\"server\"><path d=\"M3 5v3h10v-3h-10zM7 7h-3v-1h3v1z\"/><path d=\"M3 4h10l-2-4h-6z\"/><path d=\"M3 12h10v-3h-10v3zM11 10h1v1h-1v-1zM9 10h1v1h-1v-1z\"/><path d=\"M3 16h10v-3h-10v3zM4 14h3v1h-3v-1z\"/></g>\n<g id=\"share-square\"><path d=\"M11 3h-3.6c0 0-4.4-0.2-4.4 4.3 0 3.5 2 6.7 2 6.7s-0.4-7 2.3-7h3.7v3l5-5-5-5v3z\"/><path d=\"M14 9v6h-13v-13h9v-1h-10v15h15v-8z\"/></g>\n<g id=\"share\"><path d=\"M10 3h-5.1c0 0-4.9 0-4.9 5 0 3.9 3 8 3 8s-1.7-7 1.8-7h5.2v3l6-6-6-6v3z\"/></g>\n<g id=\"shield\"><path d=\"M1 0c0 0 0 3.2 0 7 0 5.6 7 9 7 9s7-3.4 7-9c0-3.8 0-7 0-7h-14zM14 7c0 4.2-4.6 7.1-6 7.9v-13.9h6v6z\"/></g>\n<g id=\"shift-arrow\"><path d=\"M8 2l-7 7h4v5h6v-5h4zM10 8v5h-4v-5h-2.5l4.5-4.58 4.5 4.58h-2.5z\"/></g>\n<g id=\"shift\"><path d=\"M0 2v12h16v-12h-16zM6 8v3h-2v-3h-2l3-3 3 3h-2z\"/></g>\n<g id=\"shop\"><path d=\"M0 15h16v1h-16v-1z\"/><path d=\"M0 0v6c0.005 0.732 0.401 1.37 0.991 1.715l0.009 6.285h9v-5h3v5h2v-6.28c0.599-0.35 0.995-0.988 1-1.719v-6.001h-16zM4 2h2v4c0 0.552-0.448 1-1 1s-1-0.448-1-1v-4zM2 7c-0.552 0-1-0.448-1-1v-4h2v4c0 0.552-0.448 1-1 1zM8 12h-5v-3h5v3zM9 6c0 0.552-0.448 1-1 1s-1-0.448-1-1v-4h2v4zM12 6c0 0.552-0.448 1-1 1s-1-0.448-1-1v-4h2v4zM15 6c0 0.552-0.448 1-1 1s-1-0.448-1-1v-4h2v4z\"/></g>\n<g id=\"sign-in-alt\"><path d=\"M0 0h2v16h-2v-16z\"/><path d=\"M3 10h8v3l5-5-5-5v3h-8z\"/></g>\n<g id=\"sign-in\"><path d=\"M7 1v2l1 1v-2h7v12h-7v-2l-1 1v2h9v-14z\"/><path d=\"M10 8l-5-4v2h-5v4h5v2z\"/></g>\n<g id=\"sign-out-alt\"><path d=\"M14 0h2v16h-2v-16z\"/><path d=\"M8 6h-8v4h8v3l5-5-5-5z\"/></g>\n<g id=\"sign-out\"><path d=\"M9 4v-3h-9v14h9v-3h-1v2h-7v-12h7v2z\"/><path d=\"M16 8l-5-4v2h-5v4h5v2z\"/></g>\n<g id=\"signal\"><path d=\"M6.9 13.2l1.1 1.1 1.1-1.1c-0.3-0.3-0.7-0.5-1.1-0.5s-0.9 0.2-1.1 0.5z\"/><path d=\"M8 4.6c2.7 0 5.1 1.1 6.9 2.8l1.1-1.1c-2-2-4.9-3.3-8-3.3s-6 1.3-8 3.3l1.1 1.1c1.8-1.7 4.2-2.8 6.9-2.8z\"/><path d=\"M2.3 8.6l1.1 1.1c1.2-1.1 2.8-1.8 4.6-1.8s3.4 0.7 4.6 1.9l1.1-1.1c-1.4-1.6-3.5-2.5-5.7-2.5s-4.3 0.9-5.7 2.4z\"/><path d=\"M4.6 10.9l1.1 1.1c0.6-0.6 1.4-0.9 2.3-0.9s1.7 0.4 2.3 0.9l1.1-1.1c-0.8-0.9-2.1-1.4-3.4-1.4s-2.6 0.5-3.4 1.4z\"/></g>\n<g id=\"sitemap\"><path d=\"M14.5 12v-4.5h-6v-3.5h1.5v-4h-4v4h1.5v3.5h-6v4.5h-1.5v4h4v-4h-1.5v-3.5h5v3.5h-1.5v4h4v-4h-1.5v-3.5h5v3.5h-1.5v4h4v-4z\"/></g>\n<g id=\"slider\"><path d=\"M16 6h-3.6c-0.7-1.2-2-2-3.4-2s-2.8 0.8-3.4 2h-5.6v4h5.6c0.7 1.2 2 2 3.4 2s2.8-0.8 3.4-2h3.6v-4zM1 9v-2h4.1c0 0.3-0.1 0.7-0.1 1s0.1 0.7 0.1 1h-4.1zM9 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3c0 1.7-1.3 3-3 3z\"/></g>\n<g id=\"sliders\"><path d=\"M7 0h2v3h-2v-3z\"/><path d=\"M6 4v3h1v9h2v-9h1v-3z\"/><path d=\"M2 0h2v8h-2v-8z\"/><path d=\"M1 9v3h1v4h2v-4h1v-3z\"/><path d=\"M12 0h2v10h-2v-10z\"/><path d=\"M11 11v3h1v2h2v-2h1v-3z\"/></g>\n<g id=\"smiley-o\"><path d=\"M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z\"/><path d=\"M8 13.2c-2 0-3.8-1.2-4.6-3.1l0.9-0.4c0.6 1.5 2.1 2.4 3.7 2.4s3.1-1 3.7-2.4l0.9 0.4c-0.8 2-2.6 3.1-4.6 3.1z\"/><path d=\"M7 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M11 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/></g>\n<g id=\"sort\"><path d=\"M11 7h-6l3-4z\"/><path d=\"M5 9h6l-3 4z\"/></g>\n<g id=\"sound-disable\"><path d=\"M4 5h-4v6h4l5 4v-14z\"/><path d=\"M15.9 5.6l-0.8-0.7-2.3 2.4-2.4-2.4-0.8 0.7 2.4 2.4-2.4 2.4 0.8 0.7 2.4-2.4 2.3 2.4 0.8-0.7-2.4-2.4z\"/></g>\n<g id=\"spark-line\"><path d=\"M14 6c-1.105 0-2 0.895-2 2 0 0.060 0 0.11 0 0.16l-0.81 0.25-2.3-3.48-1.73 4.32-1.16-5.81-2.3 4.78-1.64-1.31-2.060 1.090v1.080l1.94-1 2.11 1.7 1.56-3.22 1.23 6.19 2.27-5.68 1.68 2.52 1.55-0.48c0.364 0.54 0.973 0.89 1.664 0.89 1.105 0 2-0.895 2-2s-0.895-2-2-2c-0.001 0-0.003 0-0.004 0zM14 9c-0.552 0-1-0.448-1-1s0.448-1 1-1c0.552 0 1 0.448 1 1s-0.448 1-1 1z\"/></g>\n<g id=\"specialist\"><path d=\"M4.1 8c0.2 0.6 0.3 1.1 0.3 1.1 0.8 1.3 1.8 1.1 1.8 1.8 0 0.3-0.2 0.6-0.5 0.7l2.3 1.8 2.3-1.7c-0.3-0.2-0.5-0.4-0.5-0.7 0-0.8 1-0.5 1.8-1.8 0 0 0.2-0.4 0.3-1.1v0c0.3-1.1 0.6-3.1 0.5-4.1h-1.5c0-0.3 0.1-0.6 0.1-1h1.1c-0.3-1.4-1-2-2.2-2.3-0.5-0.4-1.2-0.7-1.9-0.7s-1.4 0.3-1.9 0.7c-1.2 0.3-1.8 0.9-2.2 2.3h1.1c0 0.4 0.1 0.7 0.2 1h-1.6c-0.1 1 0.2 3 0.5 4v0zM11.2 8.5c-0.1 0.1-0.2 0.2-0.3 0.3l-0.5 0.6c-0.4 0.5-0.8 0.8-1.4 0.9l-0.4 0.1c-0.4 0.1-0.9 0.1-1.4 0l-0.4-0.1c-0.6-0.2-1.1-0.5-1.5-1.1l-0.2-0.4c-0.1-0.1-0.2-0.2-0.3-0.3l-0.7-0.5 3.1-0.9c0.5-0.1 1-0.2 1.5 0l3.2 0.9-0.7 0.5zM6 3c0-1.1 0.9-2 2-2s2 0.9 2 2c0 1.1-0.9 2-2 2s-2-0.9-2-2z\"/><path d=\"M15.5 14.2c-1.3-2.4-2.6-2-3.9-2.2 0 0 0 0-0.1 0l-3.5 2.6-3.5-2.6c0 0 0 0-0.1 0-1.4 0.1-2.6-0.2-3.9 2.2-0.2 0.4-0.4 1.1-0.5 1.8h16c-0.1-0.7-0.3-1.4-0.5-1.8z\"/></g>\n<g id=\"spinner-arc\"><path d=\"M15 8c0 3.9-3.1 7-7 7s-7-3-7-7h-1c0 4 3.6 8 8 8s8-3.6 8-8h-1z\"/></g>\n<g id=\"spinner-third\"><path d=\"M12.9 3.1c1.3 1.2 2.1 3 2.1 4.9 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-1.9 0.8-3.7 2.1-4.9l-0.8-0.8c-1.4 1.5-2.3 3.5-2.3 5.7 0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.2-0.9-4.2-2.3-5.7l-0.8 0.8z\"/></g>\n<g id=\"spinner\"><path d=\"M9.9 0.2l-0.2 1c3 0.8 5.3 3.5 5.3 6.8 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-3.3 2.3-6 5.3-6.8l-0.2-1c-3.5 0.9-6.1 4.1-6.1 7.8 0 4.4 3.6 8 8 8s8-3.6 8-8c0-3.7-2.6-6.9-6.1-7.8z\"/></g>\n<g id=\"spline-area-chart\"><path d=\"M1 15v-15h-1v16h16v-1h-15z\"/><path d=\"M10 7c-2 0-2.080-1-4-1-2.34 0-4 3-4 3v5h14v-12c-2 0-3.86 5-6 5z\"/></g>\n<g id=\"spline-chart\"><path d=\"M1 15v-15h-1v16h16v-1h-15z\"/><path d=\"M12 5c-0.69 1-1.41 2-2 2-0.026 0.001-0.056 0.001-0.087 0.001-0.601 0-1.164-0.16-1.65-0.44-0.623-0.35-1.387-0.562-2.2-0.562-0.022 0-0.045 0-0.067 0-1.6 0.116-3.009 0.864-3.991 1.993l-0.006 2.347c0.77-1.12 2.32-2.84 4-2.84 0.014-0 0.031-0 0.048-0 0.579 0 1.121 0.156 1.587 0.428 0.643 0.358 1.429 0.573 2.264 0.573 0.035 0 0.071-0 0.106-0.001 1.395 0 2.335-1.32 3.245-2.6s1.75-2.4 2.75-2.4v-1.5c-1.81 0-3 1.61-4 3z\"/></g>\n<g id=\"split-h\"><path d=\"M0 1v14h16v-14h-16zM1 4h6.5v10h-6.5v-10zM15 14h-6.5v-10h6.5v10zM15 3h-1v-1h1v1z\"/></g>\n<g id=\"split-v\"><path d=\"M0 1v14h16v-14h-16zM14 2h1v1h-1v-1zM15 4v4.5h-14v-4.5h14zM1 14v-4.5h14v4.5h-14z\"/></g>\n<g id=\"split\"><path d=\"M0 11h6v5h-6v-5z\"/><path d=\"M11 10v-2l-0.64 0.64c-0.851-0.81-1.38-1.952-1.38-3.217 0-0.149 0.007-0.296 0.022-0.441l1.999 0.018v-5h-6v5h2c0.013 0.127 0.020 0.274 0.020 0.423 0 1.265-0.529 2.407-1.378 3.216l-0.642-0.638v2h2l-0.65-0.65c1.028-0.991 1.667-2.38 1.667-3.919 0-0.152-0.006-0.302-0.018-0.45-0.010 0.149-0.016 0.299-0.016 0.45 0 1.539 0.639 2.928 1.665 3.917l-0.648 0.652h2z\"/><path d=\"M10 11h6v5h-6v-5z\"/></g>\n<g id=\"spoon\"><path d=\"M10.5 4.8c0-1.8-0.9-4.8-3-4.8s-3 3-3 4.8c0 1.5 0.8 2.8 2.2 3.1-0.5 1.6-0.7 4.6-0.7 4.6v2c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5v-2c0-0.6-0.2-3.2-0.7-4.6 1.4-0.3 2.2-1.6 2.2-3.1z\"/></g>\n<g id=\"square-shadow\"><path d=\"M14 2v-2h-14v14h2v2h14v-14h-2zM13 13h-12v-12h12v12z\"/></g>\n<g id=\"star-half-left-o\"><path d=\"M15.9 6.2l-5.5-0.8-2.4-5-2.4 5-5.5 0.8 3.9 3.8-0.9 5.4 4.9-2.5 4.9 2.6-0.9-5.5 3.9-3.8zM8 11.8v-9.1l1.8 3.6 4 0.6-2.9 2.8 0.7 4-3.6-1.9z\"/></g>\n<g id=\"star-half-left\"><path d=\"M5.6 5.4l-5.5 0.8 3.9 3.8-0.9 5.5 4.9-2.6v-12.5z\"/></g>\n<g id=\"star-half-right-o\"><path d=\"M15.9 6.2l-5.5-0.8-2.4-5-2.4 5-5.5 0.8 3.9 3.8-0.9 5.4 4.9-2.5 4.9 2.6-0.9-5.5 3.9-3.8zM4.4 13.7l0.7-4-2.9-2.8 4-0.6 1.8-3.6v9.1l-3.6 1.9z\"/></g>\n<g id=\"star-half-right\"><path d=\"M10.5 5.4l5.5 0.8-4 3.8 0.9 5.5-4.9-2.6v-12.5z\"/></g>\n<g id=\"star-o\"><path d=\"M15.9 6.2l-5.5-0.8-2.4-5-2.4 5-5.5 0.8 3.9 3.8-0.9 5.4 4.9-2.5 4.9 2.6-0.9-5.5 3.9-3.8zM8 11.8l-3.6 1.9 0.7-4-2.9-2.8 4-0.6 1.8-3.6 1.8 3.6 4 0.6-2.9 2.8 0.7 4-3.6-1.9z\"/></g>\n<g id=\"star\"><path d=\"M12.9 15.4l-4.9-2.6-4.9 2.6 0.9-5.4-4-3.9 5.5-0.8 2.4-5 2.4 5 5.5 0.8-3.8 3.9 0.9 5.4z\"/></g>\n<g id=\"start-cog\"><path d=\"M4 0v6h1.7l0.2 0.7 0.2 0.6c0 0 0.1 0 0.1 0l1.2-0.6 1.8 1.8-0.6 1.2c0 0 0 0.1 0 0.1l0.6 0.2 0.7 0.2v0.2l6.1-3.4-12-7z\"/><path d=\"M4.5 10.5c-0.2 0-0.4 0.1-0.5 0.2-0.3 0.2-0.5 0.5-0.5 0.8s0.2 0.7 0.5 0.8c0.1 0.1 0.3 0.2 0.5 0.2 0.6 0 1-0.4 1-1s-0.4-1-1-1z\"/><path d=\"M9 12v-1l-1.1-0.4c-0.1-0.3-0.2-0.6-0.4-0.9l0.5-1-0.7-0.7-1 0.5c-0.3-0.2-0.6-0.3-0.9-0.4l-0.4-1.1h-1l-0.4 1.1c-0.3 0.1-0.6 0.2-0.9 0.4l-1-0.5-0.7 0.7 0.5 1.1c-0.2 0.3-0.3 0.6-0.4 0.9l-1.1 0.3v1l1.1 0.4c0.1 0.3 0.2 0.6 0.4 0.9l-0.5 1 0.7 0.7 1.1-0.5c0.3 0.2 0.6 0.3 0.9 0.4l0.3 1.1h1l0.4-1.1c0.3-0.1 0.6-0.2 0.9-0.4l1 0.5 0.7-0.7-0.5-1.1c0.2-0.3 0.3-0.6 0.4-0.9l1.1-0.3zM4.5 13.5c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2c0 1.1-0.9 2-2 2z\"/></g>\n<g id=\"step-backward\"><path d=\"M14 15v-14l-10 7z\"/><path d=\"M2 1h2v14h-2v-14z\"/></g>\n<g id=\"step-forward\"><path d=\"M2 1v14l10-7z\"/><path d=\"M12 1h2v14h-2v-14z\"/></g>\n<g id=\"stethoscope\"><path d=\"M5.7 15.2c0.3 0.3 1 0.8 1.8 0.8 2.7 0 3.3-2 3.4-3.6 0.2-2.3 0.8-2.2 1.1-2.2 0.7 0 0.9 0.4 0.9 1.1-0.6 0.4-1 1-1 1.7 0 1.1 0.9 2 2 2s2-0.9 2-2-0.9-2-2-2c-0.1 0-0.1 0-0.2 0-0.2-0.9-0.7-1.8-1.8-1.8-1.6 0-2 1.4-2.1 2.9-0.1 2.1-0.8 2.9-2.3 2.9-0.4 0-0.8-0.2-1-0.4-0.6-0.5-0.5-2.3-0.5-2.3 2 0 4-1.8 4.7-4.8l-0.2-0.1c0.3-1.2 0.5-2.6 0.5-3.6 0-1.1-0.3-1.9-1-2.5s-1.5-0.8-2.1-0.8c-0.2-0.3-0.5-0.5-0.9-0.5-0.5 0-1 0.4-1 1s0.4 1 1 1c0.4 0 0.7-0.2 0.8-0.5 0.5 0 1 0.2 1.5 0.6s0.7 0.9 0.7 1.7c0 0.9-0.2 2.2-0.5 3.5l-0.2-0.1c-0.3 1.1-1.3 3.6-3.3 3.6h-1c-2 0-3-2.5-3.3-3.6l-0.2 0.1c-0.3-1.3-0.5-2.6-0.5-3.5 0-0.8 0.2-1.3 0.7-1.7 0.4-0.4 1-0.5 1.5-0.6 0.1 0.3 0.4 0.5 0.8 0.5 0.6 0 1-0.4 1-1s-0.4-1-1-1c-0.4 0-0.7 0.2-0.9 0.5-0.6 0-1.4 0.2-2.1 0.8s-1 1.4-1 2.5c0 1 0.2 2.4 0.5 3.7l-0.2 0.1c0.7 2.9 2.7 4.7 4.7 4.7 0 0-0.1 2.2 0.7 2.9zM14 14c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1-0.5 1-1 1z\"/></g>\n<g id=\"stock\"><path d=\"M12 6v-6h-8v6h-4v7h16v-7h-4zM7 12h-6v-5h2v1h2v-1h2v5zM5 6v-5h2v1h2v-1h2v5h-6zM15 12h-6v-5h2v1h2v-1h2v5z\"/><path d=\"M0 16h3v-1h10v1h3v-2h-16v2z\"/></g>\n<g id=\"stop-cog\"><path d=\"M1 0v7.2l0.5-0.5 1.2 0.6c0 0 0.1 0 0.1 0l0.2-0.6 0.3-0.7h2.4l0.2 0.7 0.2 0.6c0 0 0.1 0 0.1 0l1.2-0.6 1.8 1.8-0.6 1.2c0 0 0 0.1 0 0.1l0.6 0.2 0.7 0.2v2.4l-0.7 0.2-0.6 0.2c0 0 0 0.1 0 0.1l0.6 1.2-0.4 0.7h7.2v-15h-15z\"/><path d=\"M5.5 11.5c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z\"/><path d=\"M7.9 12.4l1.1-0.4v-1l-1.1-0.4c-0.1-0.3-0.2-0.6-0.4-0.9l0.5-1-0.7-0.7-1 0.5c-0.3-0.2-0.6-0.3-0.9-0.4l-0.4-1.1h-1l-0.4 1.1c-0.3 0.1-0.6 0.2-0.9 0.4l-1-0.5-0.7 0.7 0.5 1.1c-0.2 0.3-0.3 0.6-0.4 0.9l-1.1 0.3v1l1.1 0.4c0.1 0.3 0.2 0.6 0.4 0.9l-0.5 1 0.7 0.7 1.1-0.5c0.3 0.2 0.6 0.3 0.9 0.4l0.3 1.1h1l0.4-1.1c0.3-0.1 0.6-0.2 0.9-0.4l1 0.5 0.7-0.7-0.5-1.1c0.2-0.2 0.3-0.5 0.4-0.8zM4.5 13.5c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2c0 1.1-0.9 2-2 2z\"/></g>\n<g id=\"stop\"><path d=\"M1 1h14v14h-14v-14z\"/></g>\n<g id=\"stopwatch\"><path d=\"M8.5 8.14v-3.64h-1v3.64c-0.301 0.176-0.5 0.498-0.5 0.866 0 0.552 0.448 1 1 1s1-0.448 1-1c0-0.368-0.199-0.69-0.495-0.863z\"/><path d=\"M8 2c-3.866 0-7 3.134-7 7s3.134 7 7 7c3.866 0 7-3.134 7-7s-3.134-7-7-7zM8 14.5c-3.038 0-5.5-2.462-5.5-5.5s2.462-5.5 5.5-5.5c3.038 0 5.5 2.462 5.5 5.5-0.006 3.035-2.465 5.494-5.499 5.5z\"/><path d=\"M6 0h4v1.5h-4v-1.5z\"/><path d=\"M0.005 4.438l2.713-2.939 1.102 1.017-2.713 2.939-1.102-1.017z\"/><path d=\"M12.186 2.519l1.102-1.017 2.713 2.939-1.102 1.017-2.713-2.939z\"/></g>\n<g id=\"storage\"><path d=\"M16 4l-8.060-4-7.94 4v1h1v11h2v-9h10v9h2v-11h1v-1zM4 6v-1h2v1h-2zM7 6v-1h2v1h-2zM10 6v-1h2v1h-2z\"/><path d=\"M6 9h-1v-1h-1v3h3v-3h-1v1z\"/><path d=\"M6 13h-1v-1h-1v3h3v-3h-1v1z\"/><path d=\"M10 13h-1v-1h-1v3h3v-3h-1v1z\"/></g>\n<g id=\"strikethrough\"><path d=\"M10.5 7c-0.5-0.3-1-0.5-1.4-0.7-2-0.9-2.1-1.1-2-1.9s0.4-1 0.6-1.2c0.9-0.5 2.8-0.1 3.5 0.2l1.1-2.8c-0.4-0.2-3.7-1.4-6.1 0-0.8 0.5-1.9 1.5-2.1 3.4-0.2 1.3 0.1 2.3 0.7 3h-4.8v1h16v-1h-5.5z\"/><path d=\"M7.7 9c0 0 0.1 0 0.1 0.1 2 0.9 2.4 1.2 2.2 2.5-0.2 0.9-0.5 1.1-0.8 1.3-1.1 0.6-3.3 0-4.4-0.5l-1.2 2.6c0.3 0.1 2.3 1 4.5 1 0.9 0 1.8-0.2 2.6-0.6 0.9-0.5 2-1.4 2.4-3.4 0.2-1.3 0-2.3-0.4-3.1h-5z\"/></g>\n<g id=\"subscript\"><path d=\"M16 15v1h-4v-1c0 0 3.3-1.6 2.6-3.2-0.5-1.1-2-0.2-2-0.2l-0.5-0.9c0 0 1.9-1.4 3.1-0.2 2.4 2.3-1.4 4.5-1.4 4.5h2.2z\"/><path d=\"M12 3h-3.4l-2.6 3-2.6-3h-3.4l4.3 5-4.3 5h3.4l2.6-3 2.6 3h3.4l-4.3-5z\"/></g>\n<g id=\"suitcase\"><path d=\"M11 3v-2h-6v2h-5v12h16v-12h-5zM4 14h-1v-10h1v10zM10 3h-4v-1h4v1zM13 14h-1v-10h1v10z\"/></g>\n<g id=\"sun-down\"><path d=\"M10 3h-1v-2h-2v2h-1l2 3 2-3z\"/><path d=\"M14 13l-1.58-1.18 0.78-1.82-2-0.23-0.2-1.97-1.82 0.78-1.18-1.58-1.18 1.58-1.82-0.78-0.23 2-1.97 0.2 0.78 1.82-1.58 1.18h-2v1h16v-1h-2zM4 13c0.075-2.178 1.822-3.925 3.993-4 2.185 0.075 3.932 1.821 4.007 3.993l-8 0.007z\"/></g>\n<g id=\"sun-o\"><path d=\"M16 8l-2.2-1.6 1.1-2.4-2.7-0.2-0.2-2.7-2.4 1.1-1.6-2.2-1.6 2.2-2.4-1.1-0.2 2.7-2.7 0.2 1.1 2.4-2.2 1.6 2.2 1.6-1.1 2.4 2.7 0.2 0.2 2.7 2.4-1.1 1.6 2.2 1.6-2.2 2.4 1.1 0.2-2.7 2.7-0.2-1.1-2.4 2.2-1.6zM8 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z\"/></g>\n<g id=\"sun-rise\"><path d=\"M6 4h1v2h2v-2h1l-2-3-2 3z\"/><path d=\"M12.42 11.82l0.78-1.82-2-0.23-0.2-1.97-1.82 0.78-1.18-1.58-1.18 1.58-1.82-0.78-0.23 2-1.97 0.2 0.78 1.82-1.58 1.18h-2v1h16v-1h-2zM4 13c0.075-2.178 1.822-3.925 3.993-4 2.185 0.075 3.932 1.821 4.007 3.993l-8 0.007z\"/></g>\n<g id=\"superscript\"><path d=\"M16 5v1h-4v-1c0 0 3.3-1.6 2.6-3.2-0.5-1.1-2-0.2-2-0.2l-0.5-0.9c0 0 1.9-1.4 3.1-0.2 2.4 2.3-1.4 4.5-1.4 4.5h2.2z\"/><path d=\"M12 3h-3.4l-2.6 3-2.6-3h-3.4l4.3 5-4.3 5h3.4l2.6-3 2.6 3h3.4l-4.3-5z\"/></g>\n<g id=\"sword\"><path d=\"M15.8 0.5l-0.1-0.2-0.2-0.1c-0.1 0-2.5-0.8-4.2 0.9l-6.7 6.6c-0.9-0.6-1.7-1.2-1.8-1l-0.4 0.3c-0.2 0.2 0.9 1.7 1.8 2.7l-2.5 3.4c-0.3-0.3-0.8-0.3-1.1 0l-0.3 0.3c-0.3 0.3-0.3 0.8 0 1.1l1 1c0.3 0.3 0.8 0.3 1.1 0l0.3-0.3c0.3-0.3 0.3-0.8 0-1.1v0l3.5-2.5c1 0.9 2.5 2 2.7 1.8l0.4-0.4c0.1-0.1-0.4-1-1.1-1.8l6.7-6.7c1.7-1.5 0.9-3.9 0.9-4zM7.7 10.5l-0.8-0.8 6.2-6.9-6.9 6.2-0.7-0.7 6.5-6.5c1-1 2.3-0.8 2.9-0.7 0.1 0.6 0.3 1.9-0.7 2.8l-6.5 6.6z\"/></g>\n<g id=\"tab-a\"><path d=\"M9 10h-9v-4h9v-2l5 4-5 4v-2z\"/><path d=\"M14 4h2v8h-2v-8z\"/></g>\n<g id=\"tab\"><path d=\"M0 2v12h16v-12h-16zM13 11h-1v-3l-3 3v-2h-6v-2h6v-2l3 3v-3h1v6z\"/></g>\n<g id=\"table\"><path d=\"M0 1v15h16v-15h-16zM5 15h-4v-2h4v2zM5 12h-4v-2h4v2zM5 9h-4v-2h4v2zM5 6h-4v-2h4v2zM10 15h-4v-2h4v2zM10 12h-4v-2h4v2zM10 9h-4v-2h4v2zM10 6h-4v-2h4v2zM15 15h-4v-2h4v2zM15 12h-4v-2h4v2zM15 9h-4v-2h4v2zM15 6h-4v-2h4v2z\"/></g>\n<g id=\"tablet\"><path d=\"M0 2v12h16v-12h-16zM13 13h-11v-10h11v10zM15 9h-1v-2h1v2z\"/></g>\n<g id=\"tabs\"><path d=\"M14 4v-2h-14v12h16v-10h-2zM10 3h3v1h-3v-1zM6 3h3v1h-3v-1zM15 13h-14v-10h4v2h10v8z\"/></g>\n<g id=\"tag\"><path d=\"M8 1h-7v7l7 7 7-7zM3.75 5c-0.69 0-1.25-0.56-1.25-1.25s0.56-1.25 1.25-1.25c0.69 0 1.25 0.56 1.25 1.25s-0.56 1.25-1.25 1.25z\"/></g>\n<g id=\"tags\"><path d=\"M9 2h-1.5l7 7-5.3 5.2 0.8 0.8 6-6z\"/><path d=\"M6 2h-6v6l7 7 6-6-7-7zM2.8 6c-0.7 0-1.3-0.6-1.3-1.2s0.6-1.2 1.2-1.2 1.3 0.5 1.3 1.2-0.6 1.2-1.2 1.2z\"/></g>\n<g id=\"tasks\"><path d=\"M6 0h10v4h-10v-4z\"/><path d=\"M6 6h10v4h-10v-4z\"/><path d=\"M6 12h10v4h-10v-4z\"/><path d=\"M3 1v2h-2v-2h2zM4 0h-4v4h4v-4z\"/><path d=\"M3 13v2h-2v-2h2zM4 12h-4v4h4v-4z\"/><path d=\"M5.3 5.9l-0.6-0.8-0.9 0.9h-3.8v4h4v-2.8l1.3-1.3zM2.7 7l-0.7 0.7-0.8-0.7h1.5zM1 8.2l0.9 0.8h-0.9v-0.8zM3 9h-0.9l0.9-0.9v0.9z\"/></g>\n<g id=\"taxi\"><path d=\"M15 6.1l-1.4-2.9c-0.4-0.7-1.1-1.2-2-1.2h-0.6v-1.3c0-0.4-0.3-0.7-0.7-0.7h-4.6c-0.4 0-0.7 0.3-0.7 0.7v1.3h-0.7c-0.8 0-1.6 0.5-1.9 1.2l-1.4 2.9c-0.6 0.1-1 0.6-1 1.1v3.5c0 0.6 0 1.1 1 1.2v2c0 0.6 0.4 1.1 1 1.1h0.9c0.6 0 1.1-0.5 1.1-1.1v-1.9h8v1.9c0 0.6 0.4 1.1 1 1.1h0.9c0.6 0 1.1-0.5 1.1-1.1v-2c1-0.1 1-0.6 1-1.2v-3.5c0-0.5-0.4-1-1-1.1zM4 8.4c0 0.3-0.3 0.6-0.6 0.6h-1.8c-0.3 0-0.6-0.3-0.6-0.6v-0.8c0-0.3 0.3-0.6 0.6-0.6h1.8c0.3 0 0.6 0.3 0.6 0.6v0.8zM10 11h-4v-1h4v1zM2.1 6l1.2-2.4c0.2-0.4 0.6-0.6 1-0.6h7.4c0.4 0 0.8 0.2 1 0.6l1.2 2.4h-11.8zM15 8.4c0 0.3-0.3 0.6-0.6 0.6h-1.8c-0.3 0-0.6-0.3-0.6-0.6v-0.8c0-0.3 0.3-0.6 0.6-0.6h1.8c0.3 0 0.6 0.3 0.6 0.6v0.8z\"/></g>\n<g id=\"teeth\"><path d=\"M4.6 7.6c-0.1 0.1-0.5 0.4-1.6 0.4 1.1 0 1.5 0.3 1.6 0.4 0.2-0.2 0.6-0.4 1.5-0.4-0.9 0-1.3-0.2-1.5-0.4z\"/><path d=\"M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8c4.4 0 8-3.6 8-8s-3.6-8-8-8zM13.1 11.6c-1 0-1.4-0.8-1.6-1.6-0.2 0.9-0.6 2-1.8 2-1.1 0-1.5-1.1-1.7-2-0.2 1-0.6 2-1.7 2s-1.6-1.1-1.8-2c-0.2 0.8-0.6 1.6-1.6 1.6-2 0-1.9-3-1.9-3s0.2-0.6 1.7-0.6c-1.5 0-1.7-0.5-1.7-0.5s-0.1-3 1.9-3c1 0 1.4 0.8 1.6 1.6 0.2-0.9 0.6-2 1.8-2 1.1-0.1 1.5 1 1.7 1.9 0.2-1 0.6-2 1.7-2s1.6 1.1 1.8 2c0.2-0.8 0.6-1.6 1.6-1.6 2 0 1.9 3 1.9 3s-0.3 0.6-1.8 0.6c-1.2 0-1.6-0.3-1.8-0.4-0.2 0.2-0.7 0.4-1.6 0.4-1.2 0-1.6-0.2-1.8-0.4-0.1 0.1-0.6 0.4-1.6 0.4 1 0 1.4 0.3 1.6 0.4 0.2-0.2 0.6-0.4 1.8-0.4 1 0 1.4 0.2 1.7 0.4 0-0.1 0.5-0.4 1.7-0.4 1.5 0 1.8 0.6 1.8 0.6s0.1 3-1.9 3z\"/></g>\n<g id=\"terminal\"><path d=\"M6 12h9v1h-9v-1z\"/><path d=\"M1.1 13h1.2l3.7-5-3.7-5h-1.3l3.8 5z\"/></g>\n<g id=\"text-height\"><path d=\"M15 3h1l-1.5-3-1.5 3h1v10h-1l1.5 3 1.5-3h-1z\"/><path d=\"M1 0v3h4v13h3v-13h4v-3z\"/></g>\n<g id=\"text-input\"><path d=\"M2 2h1v4h-1v-4z\"/><path d=\"M1 0c-0.6 0-1 0.4-1 1v14c0 0.6 0.4 1 1 1h15v-16h-15zM13 15h-12v-14h12v14zM15 15v0h-1v-1h1v1zM15 13h-1v-10h1v10zM15 2h-1v-1h1v1z\"/></g>\n<g id=\"text-label\"><path d=\"M12.5 4.9c-1.4 0-2.5 0.8-2.6 0.9l1.2 1.6c0 0 0.7-0.5 1.4-0.5 1.4 0 1.5 1.2 1.5 1.6-0.4-0.1-1.1-0.3-2-0.1-1.4 0.3-2.8 2-2.1 3.9 0.7 1.8 3.1 2.1 4.1 0.6v1h2v-5.3c0-2.7-1.9-3.7-3.5-3.7zM11.5 11.4c-0.1-1.9 1.5-1.9 2.5-1.8v1c0 1.2-2.3 2.3-2.5 0.8z\"/><path d=\"M6.9 14h2.1l-3.2-12h-2.7l-3.1 12h2.1l1-4h2.7l1.1 4zM3.6 8l0.8-3.2 0.9 3.2h-1.7z\"/></g>\n<g id=\"text-width\"><path d=\"M15 14.5l-3-1.5v1h-9v-1l-3 1.5 3 1.5v-1h9v1z\"/><path d=\"M0 0v3h6v9h3v-9h6v-3z\"/></g>\n<g id=\"thin-square\"><path d=\"M15 1h-14v14h14v-14zM14 14h-12v-12h12v12z\"/></g>\n<g id=\"thumbs-down-o\"><path d=\"M15.6 7.3c0.1-0.3 0.3-0.7 0.2-1.2 0-0.6-0.3-1.1-0.5-1.3 0.1-0.3 0.1-0.6 0-1.1s-0.4-0.8-0.6-1c0.1-0.3 0.1-0.8-0.3-1.4-0.4-1-1.2-1.3-3.6-1.3-1.7 0-3.3 0.8-4.6 1.5-0.4 0.2-1 0.5-1.2 0.5v0h-5v9h5v-0.9l2.7 2.7 1 2.8c0.2 0.2 0.4 0.4 0.8 0.4h0.1c0 0 0 0 0 0 0.5 0 2-0.1 2.4-1.9 0.2-0.9-0.1-2.2-0.5-3.1h2.3c0.7-0.1 2.1-0.6 2.2-2.1 0-0.7-0.2-1.3-0.4-1.6zM2.5 7.5c0.6 0 1 0.4 1 1s-0.4 1-1 1-1-0.4-1-1c0-0.6 0.4-1 1-1zM13.8 10h-2.5c-0.3 0-0.5 0.1-0.7 0.4-0.2 0.2-0.2 0.5-0.1 0.8 0.5 1.2 0.7 2.2 0.6 2.8-0.2 0.9-0.9 1.1-1.4 1.1l-1-2.7c0-0.1-0.1-0.2-0.2-0.3l-2.9-2.9c-0.1-0.1-0.3-0.2-0.5-0.2h-0.1v-6c0.4 0 0.8-0.2 1.7-0.6 1.1-0.6 2.7-1.4 4.1-1.4 2.5 0 2.7 0.4 2.9 0.7 0.3 0.5 0.1 0.9 0.1 0.9l-0.2 0.4 0.4 0.3c0 0 0.4 0.2 0.5 0.7 0.1 0.4 0 0.7 0 0.7l-0.3 0.3 0.3 0.3c0 0 0.4 0.3 0.4 0.9 0 0.5-0.2 0.7-0.2 0.7l-0.4 0.3 0.4 0.4c0 0 0.4 0.4 0.3 1.2 0 1.1-1.1 1.2-1.2 1.2z\"/></g>\n<g id=\"thumbs-down\"><path d=\"M15.6 7.8c0 0 0.5 0.5 0.4 1.6 0 1.5-1.6 1.6-1.6 1.6h-2.4c-0.2 0-0.3 0.2-0.3 0.4 0.3 0.7 0.8 2.1 0.6 3.1-0.3 1.4-1.5 1.5-1.9 1.5-0.1 0-0.2-0.1-0.2-0.2l-1-2.8c0 0 0-0.1-0.1-0.1l-2.6-2.8c-0.1-0.1-0.2-0.1-0.3-0.1h-0.2v-7h0.2c0.7 0 3.2-2 5.4-2s2.7 0.3 3.1 1c0.4 0.7 0.1 1.3 0.1 1.3s0.5 0.3 0.6 1c0.1 0.7-0.1 1.1-0.1 1.1s0.5 0.4 0.5 1.2c0.1 0.9-0.2 1.2-0.2 1.2z\"/><path d=\"M0 11h5v-8h-5v8zM2.5 7.5c0.6 0 1 0.4 1 1s-0.4 1-1 1-1-0.4-1-1c0-0.6 0.4-1 1-1z\"/></g>\n<g id=\"thumbs-up-o\"><path d=\"M16 7.1c0-1.5-1.4-2.1-2.2-2.1h-2.2c0.4-1 0.7-2.2 0.5-3.1-0.5-1.8-2-1.9-2.5-1.9h-0.1c-0.4 0-0.6 0.2-0.8 0.5l-1 2.8-2.7 2.7h-5v9h5v-1c0.2 0 0.7 0.3 1.2 0.6 1.2 0.6 2.9 1.5 4.5 1.5 2.4 0 3.2-0.3 3.8-1.3 0.3-0.6 0.3-1.1 0.3-1.4 0.2-0.2 0.5-0.5 0.6-1s0.1-0.8 0-1.1c0.2-0.3 0.4-0.7 0.5-1.3 0-0.5-0.1-0.9-0.2-1.2 0.1-0.4 0.3-0.9 0.3-1.7zM2.5 13.5c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1zM14.7 9.1c0 0 0.2 0.2 0.2 0.7 0 0.6-0.4 0.9-0.4 0.9l-0.3 0.3 0.2 0.3c0 0 0.2 0.3 0 0.7-0.1 0.4-0.5 0.7-0.5 0.7l-0.3 0.3 0.2 0.4c0 0 0.2 0.4-0.1 0.9-0.2 0.4-0.4 0.7-2.9 0.7-1.4 0-3-0.8-4.1-1.4-0.8-0.4-1.3-0.6-1.7-0.6v0-6h0.1c0.2 0 0.4-0.1 0.6-0.2l2.8-2.8c0.1-0.1 0.1-0.2 0.2-0.3l1-2.7c0.5 0 1.2 0.2 1.4 1.1 0.1 0.6-0.1 1.6-0.6 2.8-0.1 0.3-0.1 0.5 0.1 0.8 0.1 0.2 0.4 0.3 0.7 0.3h2.5c0.1 0 1.2 0.2 1.2 1.1 0 0.8-0.3 1.2-0.3 1.2l-0.3 0.4 0.3 0.4z\"/></g>\n<g id=\"thumbs-up\"><path d=\"M15.6 8.2c0 0 0.5-0.5 0.4-1.6 0-1.5-1.6-1.6-1.6-1.6h-2.4c-0.2 0-0.3-0.2-0.3-0.4 0.3-0.7 0.8-2.1 0.6-3.1-0.3-1.4-1.5-1.5-1.9-1.5-0.1 0-0.2 0.1-0.2 0.2l-1 2.8c0 0 0 0.1-0.1 0.1l-2.6 2.8c-0.1 0.1-0.2 0.1-0.3 0.1h-0.2v7h0.2c0.7 0 3.2 2 5.4 2s2.7-0.3 3.1-1c0.4-0.7 0.1-1.3 0.1-1.3s0.5-0.3 0.6-1c0.1-0.7-0.1-1.1-0.1-1.1s0.5-0.4 0.5-1.2c0.1-0.9-0.2-1.2-0.2-1.2z\"/><path d=\"M0 14h5v-8h-5v8zM2.5 10.5c0.6 0 1 0.4 1 1s-0.4 1-1 1-1-0.4-1-1c0-0.6 0.4-1 1-1z\"/></g>\n<g id=\"ticket\"><path d=\"M14 3h-12c0 1.1-0.9 2-2 2v6c1.1 0 2 0.9 2 2h12c0-1.1 0.9-2 2-2v0-6c-1.1 0-2-0.9-2-2zM13 12h-10v-8h10v8z\"/><path d=\"M4 5h8v6h-8v-6z\"/></g>\n<g id=\"time-backward\"><path d=\"M8 4h-1v5h4v-1h-3z\"/><path d=\"M8 0c-3 0-5.6 1.6-6.9 4.1l-1.1-1.1v4h4l-1.5-1.5c1-2 3.1-3.5 5.5-3.5 3.3 0 6 2.7 6 6s-2.7 6-6 6c-1.8 0-3.4-0.8-4.5-2.1l-1.5 1.3c1.4 1.7 3.6 2.8 6 2.8 4.4 0 8-3.6 8-8s-3.6-8-8-8z\"/></g>\n<g id=\"time-forward\"><path d=\"M8 4h-1v5h4v-1h-3z\"/><path d=\"M16 7v-4l-1.1 1.1c-1.3-2.5-3.9-4.1-6.9-4.1-4.4 0-8 3.6-8 8s3.6 8 8 8c2.4 0 4.6-1.1 6-2.8l-1.5-1.3c-1.1 1.3-2.7 2.1-4.5 2.1-3.3 0-6-2.7-6-6s2.7-6 6-6c2.4 0 4.5 1.5 5.5 3.5l-1.5 1.5h4z\"/></g>\n<g id=\"timer\"><path d=\"M9.060 9.060c0.271-0.271 0.439-0.646 0.439-1.060s-0.168-0.789-0.439-1.060c-0.59-0.59-6.72-4.6-6.72-4.6s4 6.13 4.59 6.72c0.272 0.274 0.649 0.444 1.065 0.444s0.793-0.17 1.065-0.444z\"/><path d=\"M8 0v3h1v-1.41c3.153 0.495 5.536 3.192 5.536 6.445 0 3.601-2.919 6.52-6.52 6.52s-6.52-2.919-6.52-6.52c0-1.256 0.355-2.428 0.97-3.423l-0.916-1.322c-0.958 1.303-1.533 2.939-1.533 4.71 0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8-0.006 0-0.012 0-0.017 0z\"/></g>\n<g id=\"toolbox\"><path d=\"M0 8h6v2h4v-2h6v6h-16z\"/><path d=\"M7 7h2v2h-2v-2z\"/><path d=\"M11 4v-2h-6v2h-5v3h6v-1h4v1h6v-3h-5zM6 4v-1h4v1h-4z\"/></g>\n<g id=\"tools\"><path d=\"M10.3 8.2l-0.9 0.9 0.9 0.9-1.2 1.2 4.3 4.3c0.6 0.6 1.5 0.6 2.1 0s0.6-1.5 0-2.1l-5.2-5.2zM14.2 15c-0.4 0-0.8-0.3-0.8-0.8 0-0.4 0.3-0.8 0.8-0.8s0.8 0.3 0.8 0.8c0 0.5-0.3 0.8-0.8 0.8z\"/><path d=\"M3.6 8l0.9-0.6 1.5-1.7 0.9 0.9 0.9-0.9-0.1-0.1c0.2-0.5 0.3-1 0.3-1.6 0-2.2-1.8-4-4-4-0.6 0-1.1 0.1-1.6 0.3l2.9 2.9-2.1 2.1-2.9-2.9c-0.2 0.5-0.3 1-0.3 1.6 0 2.1 1.6 3.7 3.6 4z\"/><path d=\"M8 10.8l0.9-0.8-0.9-0.9 5.7-5.7 1.2-0.4 1.1-2.2-0.7-0.7-2.3 1-0.5 1.2-5.6 5.7-0.9-0.9-0.8 0.9c0 0 0.8 0.6-0.1 1.5-0.5 0.5-1.3-0.1-2.8 1.4-0.5 0.5-2.1 2.1-2.1 2.1s-0.6 1 0.6 2.2 2.2 0.6 2.2 0.6 1.6-1.6 2.1-2.1c1.4-1.4 0.9-2.3 1.3-2.7 0.9-0.9 1.6-0.2 1.6-0.2zM4.9 10.4l0.7 0.7-3.8 3.8-0.7-0.7z\"/></g>\n<g id=\"tooth\"><path d=\"M11.3 16c-1.2 0-1.7-3.9-1.7-4.1-0.1-1.3-1-2.1-1.6-2.2-0.6 0-1.4 0.9-1.6 2.2 0 0.2-0.5 4.1-1.7 4.1s-1.8-4.4-1.9-4.4c-0.2-1.4 0.1-3.4 0.2-4-0.4-1.2-1.8-5.6-0.5-7 0.5-0.4 1.1-0.6 1.9-0.6 0.6 0 1.3 0.1 2 0.3 0.6 0.1 1.1 0.2 1.6 0.2s1-0.1 1.6-0.2c0.7-0.2 1.4-0.3 2-0.3 0.8 0 1.4 0.2 1.8 0.7 1.3 1.4-0.1 5.8-0.5 7 0.1 0.5 0.4 2.5 0.2 3.9 0.1 0-0.5 4.4-1.8 4.4zM8 8.7c1.3 0.1 2.4 1.4 2.6 3.1 0.1 1.2 0.5 2.4 0.7 2.9 0.3-0.6 0.7-2.1 0.9-3.3 0.2-1.4-0.2-3.7-0.2-3.7v-0.2c0.7-2.1 1.4-5.3 0.8-6.1-0.3-0.3-0.7-0.4-1.2-0.4s-1.2 0.1-1.8 0.3c-0.6 0.1-1.2 0.2-1.8 0.2s-1.2-0.1-1.8-0.2c-0.6-0.2-1.3-0.3-1.8-0.3s-0.9 0.1-1.1 0.4c-0.7 0.7 0 4 0.8 6.1v0.2c0 0-0.4 2.3-0.2 3.7 0.2 1.2 0.6 2.7 0.9 3.3 0.2-0.6 0.6-1.7 0.7-2.9 0.1-1.6 1.2-3 2.5-3.1z\"/></g>\n<g id=\"touch\"><path d=\"M12.62 6c-0.093-0.023-0.2-0.036-0.31-0.036s-0.217 0.013-0.319 0.038c-0.045-0.33-0.192-0.616-0.402-0.843-0.257-0.259-0.614-0.42-1.008-0.42-0.018 0-0.036 0-0.053 0.001-0-0-0.004-0-0.007-0-0.22 0-0.43 0.044-0.621 0.124-0.062-0.183-0.163-0.336-0.29-0.464-0.261-0.25-0.617-0.403-1.008-0.403-0.036 0-0.072 0.001-0.107 0.004l0.005-0c0.315-0.414 0.505-0.938 0.505-1.506 0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5c0 0.813 0.388 1.535 0.989 1.992l0.006 2.664c-0.554 0.015-1.054 0.233-1.432 0.581-0.568 0.619-0.568 1.579-0.568 2.779 0 0.23 0 0.47 0 0.72 0.032 1.127 0.573 2.121 1.402 2.764l0.358 0.356c1.24 1.27 2.38 1.65 5.020 1.65 2.88 0 4.22-1.61 4.22-5.060v-2.51c0-0.77-0.22-2.12-1.38-2.43zM13 8.35v2.59c0 3.37-1.29 4.060-3.22 4.060-2.6 0-3.4-0.39-4.3-1.33l-0.36-0.37c-0.657-0.468-1.088-1.215-1.12-2.065-0-0.265-0-0.505-0-0.735-0.033-0.178-0.053-0.383-0.053-0.592 0-0.538 0.126-1.047 0.351-1.498 0.186-0.132 0.431-0.228 0.698-0.24l0.003 0.7v-0.22l-0.34 1.5c-0.010 0.022-0.016 0.048-0.016 0.075 0 0.103 0.083 0.186 0.186 0.186 0.075 0 0.14-0.045 0.17-0.11l1-1.211c0.003-0.014 0.005-0.029 0.005-0.045s-0.002-0.031-0.005-0.046l0-5.609c-0-0.012-0.001-0.026-0.001-0.039 0-0.256 0.083-0.492 0.223-0.684 0.091-0.096 0.223-0.158 0.369-0.158 0.010 0 0.020 0 0.030 0.001-0.001-0-0.001-0-0.001-0 0.21 0 0.38 0.17 0.38 0.38 0 0.004-0 0.007-0 0.011l0 3.869c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-1.32c0.010-0.251 0.217-0.451 0.47-0.451 0.011 0 0.021 0 0.032 0.001 0.023-0.005 0.051-0.008 0.079-0.008 0.232 0 0.42 0.188 0.42 0.42 0 0.010-0 0.020-0.001 0.029l0 1.329c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-0.64c0.034-0.218 0.22-0.383 0.445-0.383 0.019 0 0.038 0.001 0.057 0.004 0.013-0.002 0.030-0.003 0.047-0.003 0.112 0 0.214 0.043 0.291 0.113 0.1 0.129 0.16 0.294 0.16 0.473 0 0.006-0 0.012-0 0.017l0 0.819c0.003 0.252 0.193 0.459 0.438 0.49 0.021 0.003 0.043 0.004 0.066 0.004 0.241 0 0.442-0.166 0.496-0.39 0.026-0.112 0.082-0.204 0.16-0.273 0.033-0.015 0.071-0.024 0.111-0.024s0.078 0.009 0.112 0.024c0.38 0.249 0.628 0.674 0.628 1.157 0 0.057-0.003 0.113-0.010 0.169l0.001-0.007z\"/></g>\n<g id=\"train\"><path d=\"M13 11.2v-7.4c0-1-0.8-1.8-1.8-1.8h-2.2v-1h2v-1h-6v1h2v1h-2.2c-1 0-1.8 0.8-1.8 1.8v7.4c0 1 0.8 1.8 1.8 1.8h0.2l-0.7 1h-1.3v1h0.7l-0.7 1h2l0.6-1h4.9l0.6 1h2l-0.7-1h0.6v-1h-1.3l-0.7-1h0.2c1 0 1.8-0.8 1.8-1.8zM4 3.9c0-0.5 0.4-0.9 0.9-0.9h6.1c0.6 0 1 0.4 1 0.9v2.1c0 0.6-0.4 1-0.9 1h-6.2c-0.5 0-0.9-0.4-0.9-0.9v-2.2zM4 11c0-0.6 0.4-1 1-1s1 0.4 1 1c0 0.6-0.4 1-1 1s-1-0.4-1-1zM9.9 14h-3.8l0.6-1h2.6l0.6 1zM10 11c0-0.6 0.4-1 1-1s1 0.4 1 1c0 0.6-0.4 1-1 1s-1-0.4-1-1z\"/></g>\n<g id=\"trash\"><path d=\"M13 3s0-0.51-2-0.8v-0.7c-0.017-0.832-0.695-1.5-1.53-1.5-0 0-0 0-0 0h-3c-0.815 0.017-1.47 0.682-1.47 1.5 0 0 0 0 0 0v0.7c-0.765 0.068-1.452 0.359-2.007 0.806l-0.993-0.006v1h12v-1h-1zM6 1.5c0.005-0.274 0.226-0.495 0.499-0.5l3.001-0c0 0 0.001 0 0.001 0 0.282 0 0.513 0.22 0.529 0.499l0 0.561c-0.353-0.042-0.763-0.065-1.178-0.065-0.117 0-0.233 0.002-0.349 0.006-0.553-0-2.063-0-2.503 0.070v-0.57z\"/><path d=\"M2 5v1h1v9c1.234 0.631 2.692 1 4.236 1 0.002 0 0.003 0 0.005 0h1.52c0.001 0 0.003 0 0.004 0 1.544 0 3.002-0.369 4.289-1.025l-0.054-8.975h1v-1h-12zM6 13.92q-0.51-0.060-1-0.17v-6.75h1v6.92zM9 14h-2v-7h2v7zM11 13.72c-0.267 0.070-0.606 0.136-0.95 0.184l-0.050-6.904h1v6.72z\"/></g>\n<g id=\"tree-table\"><path d=\"M6 10v-2h-2v-1h1v-2h-3v2h1v6h3v-2h-2v-1z\"/><path d=\"M0 0v16h16v-16h-16zM7 15h-6v-12h6v12zM11 15h-3v-12h3v12zM15 15h-3v-12h3v12z\"/></g>\n<g id=\"trendind-down\"><path d=\"M16 14h-4l1.29-1.29-4.29-4.3-3 3-6-6v-2.82l6 6 3-3 5.71 5.7 1.28-1.29 0.010 4z\"/></g>\n<g id=\"trending-up\"><path d=\"M16 2h-4l1.29 1.29-4.29 4.3-3-3-6 6v2.82l6-6 3 3 5.71-5.7 1.28 1.29 0.010-4z\"/></g>\n<g id=\"trophy\"><path d=\"M11.7 8c4.2-0.3 4.3-2.7 4.3-5h-3v-3h-10v3h-3c0 2.3 0.1 4.7 4.3 5 0.9 1.4 2.1 2 2.7 2v4c-3 0-3 2-3 2h8c0 0 0-2-3-2v-4c0.6 0 1.8-0.6 2.7-2zM13 4h2c-0.1 1.6-0.4 2.7-2.7 2.9 0.3-0.8 0.6-1.7 0.7-2.9zM1 4h2c0.1 1.2 0.4 2.1 0.7 2.9-2.2-0.2-2.6-1.3-2.7-2.9zM4.5 6.1c-0.5-1.7-0.5-3.1-0.5-3.1v-2h1v2c0 0 0 1.7 0.4 3.1 0.5 1.7 1.6 2.9 1.6 2.9s-1.8-0.2-2.5-2.9z\"/></g>\n<g id=\"truck\"><path d=\"M6 3h10v7h-10v-7z\"/><path d=\"M15 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/><path d=\"M13 11c1.3 0 2.4 0.8 2.8 2h0.2v-2h-3z\"/><path d=\"M5 5h-4l-1 4v4h1.2c0.4-1.2 1.5-2 2.8-2s2.4 0.8 2.8 2h3.4c0.4-1.2 1.5-2 2.8-2h-8v-6zM4 9h-3l0.8-3h2.2v3z\"/><path d=\"M6 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z\"/></g>\n<g id=\"twin-col-select\"><path d=\"M0 2v12h16v-12h-16zM7 13h-6v-10h6v10zM15 13h-6v-10h6v10z\"/><path d=\"M10 4h4v1h-4v-1z\"/><path d=\"M2 4h4v1h-4v-1z\"/><path d=\"M2 6h4v1h-4v-1z\"/><path d=\"M2 8h4v1h-4v-1z\"/></g>\n<g id=\"twitter-square\"><path d=\"M0 0v16h16v-16h-16zM12.8 5.6c0 0.1 0 0.2 0 0.3 0 3.3-2.5 7-7 7-1.4 0-2.7-0.4-3.8-1.1 0.2 0 0.4 0 0.6 0 1.2 0 2.2-0.4 3.1-1.1-1.1 0-2-0.7-2.3-1.7 0.2 0 0.3 0 0.5 0s0.4 0 0.6-0.1c-1.1-0.2-2-1.2-2-2.4 0 0 0 0 0 0 0.3 0.2 0.7 0.3 1.1 0.3-0.7-0.4-1.1-1.2-1.1-2 0-0.5 0.1-0.9 0.3-1.2 1.2 1.5 3.1 2.4 5.1 2.5 0-0.2-0.1-0.4-0.1-0.6 0-1.4 1.1-2.5 2.5-2.5 0.7 0 1.3 0.3 1.8 0.8 0.6-0.1 1.1-0.3 1.6-0.6-0.2 0.6-0.6 1.1-1.1 1.4 0.5-0.1 1-0.2 1.4-0.4-0.3 0.6-0.7 1-1.2 1.4z\"/></g>\n<g id=\"twitter\"><path d=\"M16 3c-0.6 0.3-1.2 0.4-1.9 0.5 0.7-0.4 1.2-1 1.4-1.8-0.6 0.4-1.3 0.6-2.1 0.8-0.6-0.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 0.3 0 0.5 0.1 0.7-2.7-0.1-5.2-1.4-6.8-3.4-0.3 0.5-0.4 1-0.4 1.7 0 1.1 0.6 2.1 1.5 2.7-0.5 0-1-0.2-1.5-0.4 0 0 0 0 0 0 0 1.6 1.1 2.9 2.6 3.2-0.3 0.1-0.6 0.1-0.9 0.1-0.2 0-0.4 0-0.6-0.1 0.4 1.3 1.6 2.3 3.1 2.3-1.1 0.9-2.5 1.4-4.1 1.4-0.3 0-0.5 0-0.8 0 1.5 0.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3 0-0.1 0-0.3 0-0.4 0.7-0.5 1.3-1.1 1.7-1.8z\"/></g>\n<g id=\"umbrella\"><path d=\"M5.36 0.9l-0.27-0.57c-0.083-0.197-0.275-0.333-0.499-0.333-0.1 0-0.193 0.027-0.274 0.074-0.217 0.074-0.372 0.279-0.372 0.52 0 0.087 0.020 0.169 0.056 0.242l0.319 0.577c-6.2 3.49-3.9 10.59-3.9 10.59h0.060c0.25-0.12 0.8-1.64 2.050-2.25s2.78-0.090 3-0.21l0.12-0.060c0.477-0.742 0.998-1.387 1.58-1.97l3.37 7.070c0.246 0.619 0.729 1.098 1.334 1.335 0.168 0.053 0.343 0.080 0.524 0.080 0.254 0 0.495-0.053 0.713-0.149l0.359-0.176c0.263-0.145 0.462-0.38 0.558-0.662 0.117-0.276 0.183-0.586 0.183-0.913 0-0.401-0.1-0.778-0.277-1.108-0.102-0.189-0.311-0.324-0.551-0.324-0.076 0-0.149 0.014-0.217 0.038-0.182 0.089-0.308 0.277-0.308 0.495 0 0.093 0.023 0.18 0.064 0.257s0.529 1.067-0.101 1.337-1.19-0.73-1.19-0.73l-3.42-7.060c0.372-0.043 0.803-0.067 1.24-0.067s0.868 0.024 1.292 0.072l0.068-0.065c0.25-0.12 0.8-1.64 2.050-2.25s2.78-0.090 3-0.21h0.060s-3.98-6.41-10.62-3.58zM7.36 6.36c-1.034 0.399-1.834 1.209-2.211 2.224-0.55-1.082-0.909-2.375-1.007-3.74-0.142-2.244 0.608-2.924 0.608-2.924l0.77-0.32c1.084 0.101 2.052 0.534 2.816 1.195 0.976 0.895 1.747 2.009 2.233 3.265-0.339-0.021-0.752-0.067-1.175-0.067-0.724 0-1.417 0.134-2.054 0.379z\"/></g>\n<g id=\"underline\"><path d=\"M2 15h12v1h-12v-1z\"/><path d=\"M11 0v8.4c0 1.5-1.1 2.6-2.6 2.6h-0.8c-1.5 0-2.6-1.1-2.6-2.6v-8.4h-3v8.4c0 3.1 2.5 5.6 5.6 5.6h0.9c3.1 0 5.6-2.5 5.6-5.6v-8.4h-3.1z\"/></g>\n<g id=\"unlink\"><path d=\"M8 0h1v4h-1v-4z\"/><path d=\"M8 12h1v4h-1v-4z\"/><path d=\"M7 9h-4c-0.552 0-1-0.448-1-1s0.448-1 1-1h4v-2h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h4v-2z\"/><path d=\"M13 5h-4v2h4c0.552 0 1 0.448 1 1s-0.448 1-1 1h-4v2h4c1.657 0 3-1.343 3-3s-1.343-3-3-3z\"/><path d=\"M4.51 15.44l2.49-3.44h-1.23l-2.080 2.88 0.82 0.56z\"/><path d=\"M12.49 15.44l-2.49-3.44h1.23l2.080 2.88-0.82 0.56z\"/><path d=\"M12.49 0.99l-2.49 3.010h1.23l2.080-2.66-0.82-0.35z\"/><path d=\"M4.51 0.99l2.49 3.010h-1.23l-2.080-2.66 0.82-0.35z\"/></g>\n<g id=\"unlock\"><path d=\"M8 8v-3.1c0-2.2-1.8-3.9-3.9-3.9h-0.3c-2.2 0-3.8 1.7-3.8 3.9v2.1h2v-2.1c0-1.1 0.7-1.9 1.8-1.9h0.3c1 0 1.9 0.8 1.9 1.9v3.1h-1l0.1 5c0 0-0.1 3 4.9 3s5-3 5-3v-5h-7zM11 14h-1v-1.8c-0.6 0-1-0.6-1-1.1 0-0.6 0.4-1.1 1-1.1s1 0.4 1 0.9v3.1z\"/></g>\n<g id=\"upload-alt\"><path d=\"M0 14h16v2h-16v-2z\"/><path d=\"M8 0l-5 5h3v8h4v-8h3z\"/></g>\n<g id=\"upload\"><path d=\"M11 10v2h-6v-2h-5v6h16v-6h-5zM4 14h-2v-2h2v2z\"/><path d=\"M13 5l-5-5-5 5h3v6h4v-6z\"/></g>\n<g id=\"user-card\"><path d=\"M15 3v10h-14v-10h14zM16 2h-16v12h16v-12z\"/><path d=\"M8 5h6v1h-6v-1z\"/><path d=\"M8 7h6v1h-6v-1z\"/><path d=\"M8 9h3v1h-3v-1z\"/><path d=\"M5.4 7h-0.4v-0.1c0.6-0.2 1-0.8 1-1.4 0-0.8-0.7-1.5-1.5-1.5s-1.5 0.7-1.5 1.5c0 0.7 0.4 1.2 1 1.4v0.1h-0.4c-0.9 0-1.6 0.7-1.6 1.6v2.4h5v-2.4c0-0.9-0.7-1.6-1.6-1.6z\"/></g>\n<g id=\"user-check\"><path d=\"M7.5 14.4c-0.8-0.8-0.8-2 0-2.8s2-0.8 2.8 0l0.6 0.6 1.9-2.1c-0.7-0.4-1.3-0.4-2-0.4-0.7-0.1-1.4-0.3-1.4-0.9s0.8-0.4 1.4-1.5c0 0 2.7-7.3-2.9-7.3-5.5 0-2.8 7.3-2.8 7.3 0.6 1 1.4 0.8 1.4 1.5s-0.7 0.7-1.4 0.8c-1.1 0.1-2.1-0.1-3.1 1.7-0.6 1.1-0.9 4.7-0.9 4.7h8l-1.6-1.6z\"/><path d=\"M12.8 16h2.1c0 0-0.1-0.9-0.2-2l-1.9 2z\"/><path d=\"M11 16c-0.3 0-0.5-0.1-0.7-0.3l-2-2c-0.4-0.4-0.4-1 0-1.4s1-0.4 1.4 0l1.3 1.3 3.3-3.6c0.4-0.4 1-0.4 1.4-0.1 0.4 0.4 0.4 1 0.1 1.4l-4 4.3c-0.3 0.3-0.5 0.4-0.8 0.4 0 0 0 0 0 0z\"/></g>\n<g id=\"user-clock\"><path d=\"M14 13h-3v-3h1v2h2z\"/><path d=\"M16 12.5c0-2.5-2-4.5-4.5-4.5-0.7 0-1.4 0.2-2 0.5 0.2-0.3 0.8-0.3 1.4-1.2 0 0 2.7-7.3-2.9-7.3s-2.9 7.3-2.9 7.3c0.6 1 1.4 0.8 1.4 1.5s-0.7 0.7-1.4 0.8c-1.1 0.1-2.1-0.1-3.1 1.7-0.6 1.1-0.9 4.7-0.9 4.7h10.4c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5c0 1.9-1.6 3.5-3.5 3.5h3.4c0 0 0-0.2 0-0.5 0.6-0.8 1.1-1.8 1.1-3z\"/></g>\n<g id=\"user-heart\"><path d=\"M14.2 16h0.6c0 0 0-0.2 0-0.6l-0.6 0.6z\"/><path d=\"M8.6 13.9c-0.7-0.7-1-1.8-0.8-2.8s0.8-1.8 1.7-2.1c0-0.1-0.1-0.2-0.1-0.2 0-0.6 0.8-0.4 1.4-1.5 0 0 2.7-7.3-2.9-7.3-5.5 0-2.8 7.3-2.8 7.3 0.6 1 1.4 0.8 1.4 1.5s-0.7 0.7-1.4 0.8c-1.1 0.1-2.1-0.1-3.1 1.7-0.6 1.1-0.9 4.7-0.9 4.7h9.6l-2.1-2.1z\"/><path d=\"M14.9 10.1c-0.2-0.1-0.5-0.1-0.7-0.1-0.7 0-1.3 0.6-1.7 1.1-0.4-0.5-1-1.1-1.7-1.1-0.3 0-0.5 0-0.7 0.1-1.2 0.4-1.4 2-0.5 2.9l3 2.9 3-2.9c0.8-0.9 0.5-2.5-0.7-2.9z\"/></g>\n<g id=\"user-star\"><path d=\"M8.92 13.67l-1.61-1.53-1.5-1.42 2-0.29 2.25-0.32 0.29-0.57c-0.006 0-0.013 0-0.020 0-0.482 0-0.884-0.34-0.979-0.794-0.001-0.617 0.799-0.417 1.429-1.457 0.080-0.020 2.82-7.29-2.78-7.29s-2.86 7.27-2.86 7.27c0.63 1 1.44 0.85 1.43 1.45s-0.74 0.8-1.43 0.87c-1.14 0.13-2.14-0.13-3.14 1.76-0.6 1.090-0.85 4.65-0.85 4.65h7.36v-0.17z\"/><path d=\"M11.72 16h0.56l-0.28-0.14-0.28 0.14z\"/><path d=\"M12 14.73l2.47 1.27-0.47-2.69 2-1.9-2.76-0.39-1.24-2.45-1.24 2.45-2.76 0.39 2 1.9-0.47 2.69 2.47-1.27z\"/></g>\n<g id=\"user\"><path d=\"M8 0c-5.6 0-2.9 7.3-2.9 7.3 0.6 1 1.4 0.8 1.4 1.5 0 0.6-0.7 0.8-1.4 0.9-1.1 0-2.1-0.2-3.1 1.6-0.6 1.1-0.9 4.7-0.9 4.7h13.7c0 0-0.3-3.6-0.8-4.7-1-1.9-2-1.6-3.1-1.7-0.7-0.1-1.4-0.3-1.4-0.9s0.8-0.4 1.4-1.5c0 0.1 2.7-7.2-2.9-7.2z\"/></g>\n<g id=\"users\"><path d=\"M5.3 9.7c-0.4 0-0.9-0.2-0.9-0.6s0.5-0.3 0.9-1c0 0 1.8-4.9-1.8-4.9s-1.8 4.9-1.8 4.9c0.4 0.7 0.9 0.6 0.9 1s-0.5 0.6-0.9 0.6c-0.6 0.1-1.1 0-1.7 0.6v5.7h5c0.2-1.7 0.7-5.2 1.1-6.1 0 0 0.1-0.1 0.1-0.1-0.2-0.1-0.5-0.1-0.9-0.1z\"/><path d=\"M16 9.5c-0.7-0.8-1.3-0.7-2-0.8-0.5-0.1-1.1-0.2-1.1-0.7s0.6-0.3 1.1-1.2c0 0 2.1-5.9-2.2-5.9-4.4 0.1-2.3 6-2.3 6 0.5 0.8 1.1 0.7 1.1 1.1 0 0.5-0.6 0.6-1.1 0.7-0.9 0.1-1.7 0-2.5 1.5-0.4 0.9-1 5.8-1 5.8h10v-6.5z\"/></g>\n<g id=\"vaadin-h\"><path d=\"M7 15l-1.9-5.6h-0.1c-0.6 0-0.9-0.4-0.9-0.9 0-0.4 0.3-0.9 0.9-0.9h0.7c0.4 0 0.7 0.3 0.9 0.6l1.4 4.8 1.4-4.9c0.1-0.3 0.5-0.6 0.8-0.6h0.8c0.6 0 0.9 0.5 0.9 0.9 0.1 0.6-0.2 1-0.9 1h-0.1l-1.9 5.6c-0.1 0.3-0.4 0.6-1 0.6s-0.9-0.3-1-0.6zM2.7 2.5h3.5c1.6 0 1.7 1.2 1.8 1.9 0.1-0.6 0.2-1.9 1.8-1.9h3.5c0.7 0 1.1-0.3 1.1-0.8v-0.5c0-0.5 0.2-0.8 0.8-0.8 0.5 0 0.8 0.3 0.8 0.8v1.3c0 1.5-0.7 2.3-2.4 2.3h-3.6c-1 0-1.2 0.5-1.2 0.9 0 0.6-0.4 0.8-0.8 0.8s-0.8-0.3-0.8-0.8c0-0.4-0.2-0.9-1.2-0.9h-3.6c-1.7 0-2.4-0.7-2.4-2.3v-1.3c0-0.5 0.3-0.8 0.8-0.8s0.8 0.3 0.8 0.8v0.4c0 0.6 0.3 0.9 1.1 0.9z\"/></g>\n<g id=\"vaadin-v\"><path d=\"M15 9l-5.6 1.9v0.1c0 0.6-0.5 0.9-0.9 0.9s-0.9-0.3-0.9-0.9v-0.7c0-0.4 0.3-0.7 0.6-0.9l4.8-1.4-4.8-1.5c-0.3-0.1-0.6-0.4-0.6-0.8v-0.7c0-0.7 0.5-1 0.9-1 0.5 0 0.9 0.3 0.9 1v0.1l5.6 1.9c0.3 0.1 0.6 0.4 0.6 1s-0.3 0.9-0.6 1zM2.5 13.3v-3.5c0-1.6 1.2-1.7 1.9-1.8-0.7-0.1-1.9-0.2-1.9-1.8v-3.5c0-0.7-0.3-1.1-0.8-1.1h-0.5c-0.5 0-0.8-0.2-0.8-0.8 0-0.5 0.4-0.8 0.8-0.8h1.3c1.5 0 2.3 0.7 2.3 2.4v3.6c0 1.1 0.5 1.2 0.9 1.2 0.6 0 0.8 0.4 0.8 0.8s-0.3 0.8-0.8 0.8c-0.4 0-0.9 0.2-0.9 1.2v3.6c0 1.6-0.8 2.4-2.3 2.4h-1.3c-0.5 0-0.8-0.3-0.8-0.8s0.3-0.8 0.8-0.8h0.4c0.6 0 0.9-0.3 0.9-1.1z\"/></g>\n<g id=\"viewport\"><path d=\"M1 4h-1v-4h4v1h-3z\"/><path d=\"M12 1v-1h4v4h-1v-3z\"/><path d=\"M15 12h1v4h-4v-1h3z\"/><path d=\"M4 15v1h-4v-4h1v3z\"/><path d=\"M13 3v10h-10v-10h10zM14 2h-12v12h12v-12z\"/></g>\n<g id=\"vimeo-square\"><path d=\"M0 0v16h16v-16h-16zM13.9 5.3c-0.7 3.8-4.4 7-5.5 7.7s-2.2-0.3-2.5-1.1c-0.4-0.9-1.7-5.7-2-6.1-0.4-0.3-1.4 0.5-1.4 0.5l-0.5-0.7c0 0 2-2.4 3.6-2.7s1.6 2.5 2 4.1c0.4 1.5 0.6 2.4 1 2.4 0.3 0 1-0.9 1.7-2.2s0-2.5-1.4-1.6c0.5-3.3 5.7-4.1 5-0.3z\"/></g>\n<g id=\"vimeo\"><path d=\"M15.9 4.4c-0.9 5-5.9 9.3-7.4 10.3s-2.9-0.4-3.4-1.4c-0.5-1.3-2.2-7.6-2.7-8.2-0.4-0.5-1.8 0.6-1.8 0.6l-0.6-0.9c0 0 2.7-3.3 4.8-3.7 2.2-0.4 2.2 3.4 2.7 5.5 0.5 2 0.9 3.2 1.3 3.2s1.3-1.1 2.2-2.9c0.9-1.7 0-3.3-1.9-2.2 0.8-4.3 7.7-5.4 6.8-0.3z\"/></g>\n<g id=\"volume-down\"><path d=\"M10.8 4.4l-0.5 1.1c0.5 0.9 0.8 1.9 0.8 3 0 1-0.3 2-0.7 2.9l0.7 0.9c0.6-1.1 1-2.4 1-3.7-0.1-1.6-0.5-3-1.3-4.2z\"/><path d=\"M4 5h-4v6h4l5 4v-14z\"/></g>\n<g id=\"volume-off\"><path d=\"M4 5h-4v6h4l5 4v-14z\"/></g>\n<g id=\"volume-up\"><path d=\"M15 8.5c0 2.3-0.8 4.5-2 6.2l0.7 0.8c1.5-1.9 2.4-4.4 2.4-7 0-3.1-1.2-5.9-3.2-8l-0.5 1c1.6 1.8 2.6 4.3 2.6 7z\"/><path d=\"M11.8 2.4l-0.5 1c1.1 1.4 1.7 3.2 1.7 5.1 0 1.7-0.5 3.2-1.3 4.6l0.7 0.8c1.1-1.5 1.7-3.4 1.7-5.4-0.1-2.3-0.9-4.4-2.3-6.1z\"/><path d=\"M10.8 4.4l-0.5 1.1c0.5 0.9 0.8 1.9 0.8 3 0 1-0.3 2-0.7 2.9l0.7 0.9c0.6-1.1 1-2.4 1-3.7-0.1-1.6-0.5-3-1.3-4.2z\"/><path d=\"M4 5h-4v6h4l5 4v-14z\"/></g>\n<g id=\"volume\"><path d=\"M11.8 2.4l-0.5 1c1.1 1.4 1.7 3.2 1.7 5.1 0 1.7-0.5 3.2-1.3 4.6l0.7 0.8c1.1-1.5 1.7-3.4 1.7-5.4-0.1-2.3-0.9-4.4-2.3-6.1z\"/><path d=\"M10.8 4.4l-0.5 1.1c0.5 0.9 0.8 1.9 0.8 3 0 1-0.3 2-0.7 2.9l0.7 0.9c0.6-1.1 1-2.4 1-3.7-0.1-1.6-0.5-3-1.3-4.2z\"/><path d=\"M4 5h-4v6h4l5 4v-14z\"/></g>\n<g id=\"wallet\"><path d=\"M14.5 4h-12.12c-0.057 0.012-0.123 0.018-0.19 0.018-0.552 0-1-0.448-1-1 0-0.006 0-0.013 0-0.019l12.81-0.499v-1.19c0.005-0.041 0.008-0.089 0.008-0.138 0-0.652-0.528-1.18-1.18-1.18-0.049 0-0.097 0.003-0.144 0.009l-11.374 1.849c-0.771 0.289-1.31 1.020-1.31 1.877 0 0.011 0 0.023 0 0.034l-0 10.728c-0 0.003-0 0.006-0 0.010 0 0.828 0.672 1.5 1.5 1.5 0 0 0 0 0 0h13c0 0 0 0 0 0 0.828 0 1.5-0.672 1.5-1.5 0-0.004-0-0.007-0-0.011v-8.999c0-0.012 0.001-0.027 0.001-0.041 0-0.801-0.649-1.45-1.45-1.45-0.018 0-0.036 0-0.053 0.001zM13 11c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5c0.828 0 1.5 0.672 1.5 1.5s-0.672 1.5-1.5 1.5z\"/></g>\n<g id=\"warning\"><path d=\"M8 1l-8 14h16l-8-14zM8 13c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1zM7 10v-4h2v4h-2z\"/></g>\n<g id=\"workplace\"><path d=\"M11 3v-3h-9v14h-2v1h7v-5h2v-2h5v-5h-3zM-3 4v-4h-7v4h-8v12h6v-3h4v3h6v-12h-1zM-14 11h-2v-2h2v2zM-14 8h-2v-2h2v2zM-11 11h-2v-2h2v2zM-11 8h-2v-2h2v2zM-8 3v-1h1v-1h1v1h1v1h-1v1h-1v-1h-1zM-7 11h-2v-2h2v2zM-7 8h-2v-2h2v2zM-4 11h-2v-2h2v2zM-4 8h-2v-2h2v2zM6 10h-2v-2h2v2zM6 7h-2v-2h2v2zM6 4h-2v-2h2v2zM9 7h-2v-2h2v2zM9 4h-2v-2h2v2zM13 7h-2v-2h2v2z\"/><path d=\"M14 11v-2h-4v2h-2v5h8v-5h-2zM13 11h-2v-1h2v1z\"/></g>\n<g id=\"wrench\"><path d=\"M15.5 13.4l-7.8-7.8c0.2-0.5 0.3-1 0.3-1.6 0-2.2-1.8-4-4-4-0.6 0-1.1 0.1-1.6 0.3l2.9 2.9-2.1 2.1-2.9-2.9c-0.2 0.5-0.3 1-0.3 1.6 0 2.2 1.8 4 4 4 0.6 0 1.1-0.1 1.6-0.3l7.8 7.8c0.6 0.6 1.5 0.6 2.1 0s0.6-1.5 0-2.1zM6.8 7.6l-1.4-1.4 0.9-0.9 1.4 1.4-0.9 0.9zM14.2 15c-0.4 0-0.8-0.3-0.8-0.8 0-0.4 0.3-0.8 0.8-0.8s0.8 0.3 0.8 0.8c0 0.5-0.3 0.8-0.8 0.8z\"/></g>\n<g id=\"youtube-square\"><path d=\"M7.9 6c0.2 0 0.3-0.2 0.3-0.5v-1.4c0-0.3-0.1-0.5-0.3-0.5s-0.3 0.2-0.3 0.5v1.4c0 0.3 0.1 0.5 0.3 0.5z\"/><path d=\"M7.1 11.9c-0.1 0.2-0.3 0.3-0.4 0.3s-0.1 0-0.1-0.1c0 0 0-0.1 0-0.2v-2.5h-0.6v2.6c0 0.2 0 0.4 0.1 0.5 0.1 0.2 0.2 0.2 0.4 0.2s0.4-0.1 0.7-0.4v0.4h0.6v-3.3h-0.7v2.5z\"/><path d=\"M3.8 8.9h0.7v3.8h0.7v-3.8h0.7v-0.7h-2.1z\"/><path d=\"M9.4 9.3c-0.2 0-0.4 0.2-0.6 0.4v-1.5h-0.6v4.4h0.6v-0.3c0.2 0.2 0.4 0.4 0.6 0.4s0.4-0.1 0.5-0.4c0-0.1 0.1-0.4 0.1-0.7v-1.3c0-0.3 0-0.5-0.1-0.7-0.1-0.1-0.2-0.3-0.5-0.3zM9.4 11.7c0 0.3-0.1 0.4-0.3 0.4-0.1 0-0.2 0-0.3-0.1v-2c0.1-0.1 0.2-0.1 0.3-0.1 0.2 0 0.3 0.2 0.3 0.5v1.3z\"/><path d=\"M11.3 9.3c-0.3 0-0.5 0.1-0.7 0.3-0.1 0.2-0.2 0.4-0.2 0.8v1.2c0 0.4 0.1 0.6 0.2 0.8 0.2 0.2 0.4 0.3 0.7 0.3s0.6-0.1 0.7-0.4c0.1-0.1 0.1-0.2 0.1-0.4 0-0.1 0-0.2 0-0.4v-0.1h-0.6c0 0.2 0 0.4 0 0.4 0 0.2-0.1 0.2-0.3 0.2s-0.3-0.2-0.3-0.5v-0.6h1.2v-0.7c0-0.4-0.1-0.6-0.2-0.8 0 0.1-0.3-0.1-0.6-0.1zM11.6 10.6h-0.6v-0.3c0-0.3 0.1-0.5 0.3-0.5s0.3 0.2 0.3 0.5v0.3z\"/><path d=\"M0 0v16h16v-16h-16zM9.3 3.1h0.6v2.5c0 0.1 0 0.2 0 0.2 0 0.1 0 0.2 0.1 0.2s0.2-0.1 0.4-0.3v-2.6h0.6v3.3h-0.6v-0.3c-0.2 0.3-0.5 0.4-0.7 0.4s-0.3-0.1-0.4-0.2c0-0.1-0.1-0.3-0.1-0.5v-2.7zM7 4.2c0-0.3 0-0.6 0.2-0.8s0.4-0.3 0.7-0.3c0.3 0 0.5 0.1 0.7 0.3 0.1 0.2 0.2 0.4 0.2 0.8v1.2c0 0.4-0.1 0.6-0.2 0.8-0.2 0.2-0.4 0.3-0.7 0.3s-0.5-0.1-0.7-0.3c-0.2-0.2-0.2-0.4-0.2-0.8v-1.2zM5.3 2l0.5 1.8 0.5-1.8h0.7l-0.8 2.7v1.8h-0.7v-1.8c-0.1-0.4-0.2-0.8-0.4-1.5-0.2-0.4-0.3-0.8-0.5-1.2h0.7zM12.8 12.9c-0.1 0.5-0.6 0.9-1.1 1-1.2 0.1-2.5 0.1-3.7 0.1s-2.5 0-3.7-0.1c-0.5-0.1-1-0.4-1.1-1-0.2-0.8-0.2-1.6-0.2-2.4 0-0.7 0-1.5 0.2-2.3 0.1-0.5 0.6-0.9 1.1-1 1.2-0.1 2.5-0.1 3.7-0.1s2.5 0 3.7 0.1c0.5 0.1 1 0.4 1.1 1 0.2 0.8 0.2 1.6 0.2 2.3 0 0.8 0 1.6-0.2 2.4z\"/></g>\n<g id=\"youtube\"><path d=\"M6.6 0h-0.9l-0.6 2.3-0.6-2.3h-1c0.2 0.6 0.4 1.1 0.6 1.7 0.3 0.8 0.5 1.5 0.5 1.9v2.4h0.9v-2.4l1.1-3.6zM9 4.5v-1.5c0-0.5-0.1-0.8-0.3-1.1s-0.5-0.4-0.9-0.4c-0.4 0-0.7 0.2-0.9 0.5-0.2 0.2-0.3 0.5-0.3 1v1.6c0 0.5 0.1 0.8 0.3 1 0.2 0.3 0.5 0.4 0.9 0.4s0.7-0.2 0.9-0.5c0.2-0.1 0.3-0.5 0.3-1zM8.2 4.7c0 0.4-0.1 0.6-0.4 0.6s-0.4-0.2-0.4-0.6v-1.9c0-0.4 0.1-0.6 0.4-0.6s0.4 0.2 0.4 0.6v1.9zM12 6v-4.5h-0.8v3.4c-0.2 0.3-0.3 0.4-0.5 0.4-0.1 0-0.2-0.1-0.2-0.2 0 0 0-0.1 0-0.3v-3.3h-0.8v3.5c0 0.3 0 0.5 0.1 0.7 0 0.2 0.2 0.3 0.5 0.3s0.6-0.2 0.9-0.5v0.5h0.8z\"/><path d=\"M12.4 10.5c-0.3 0-0.4 0.2-0.4 0.6v0.4h0.8v-0.4c0-0.4-0.1-0.6-0.4-0.6z\"/><path d=\"M9.5 10.5c-0.1 0-0.3 0.1-0.4 0.2v2.7c0.1 0.1 0.3 0.2 0.4 0.2 0.2 0 0.3-0.2 0.3-0.6v-1.9c0-0.4-0.1-0.6-0.3-0.6z\"/><path d=\"M14.4 8.3c-0.2-0.7-0.8-1.3-1.4-1.3-1.6-0.2-3.3-0.2-5-0.2s-3.3 0-5 0.2c-0.6 0-1.2 0.6-1.4 1.3-0.2 1-0.2 2.1-0.2 3.1s0 2.1 0.2 3.1c0.2 0.7 0.7 1.2 1.4 1.3 1.7 0.2 3.3 0.2 5 0.2s3.3 0 5-0.2c0.7-0.1 1.3-0.6 1.4-1.3 0.2-1 0.2-2.1 0.2-3.1s0-2.1-0.2-3.1zM5.2 9.2h-1v5.1h-0.9v-5.1h-0.9v-0.9h2.8v0.9zM7.6 14.3h-0.8v-0.5c-0.3 0.4-0.6 0.5-0.9 0.5s-0.4-0.1-0.5-0.3c0-0.1-0.1-0.3-0.1-0.7v-3.5h0.8v3.2c0 0.2 0 0.3 0 0.3 0 0.1 0.1 0.2 0.2 0.2 0.2 0 0.3-0.1 0.5-0.4v-3.3h0.8v4.5zM10.6 12.9c0 0.4 0 0.7-0.1 0.9-0.1 0.3-0.3 0.5-0.6 0.5s-0.6-0.2-0.8-0.5v0.4h-0.8v-5.9h0.8v1.9c0.3-0.3 0.5-0.5 0.8-0.5s0.5 0.2 0.6 0.5c0.1 0.2 0.1 0.5 0.1 0.9v1.8zM13.6 12.2h-1.6v0.8c0 0.4 0.1 0.6 0.4 0.6 0.2 0 0.3-0.1 0.4-0.3 0 0 0-0.2 0-0.5h0.8v0.1c0 0.3 0 0.4 0 0.5 0 0.2-0.1 0.3-0.2 0.5-0.2 0.3-0.5 0.5-1 0.5-0.4 0-0.7-0.2-1-0.5-0.2-0.2-0.3-0.6-0.3-1v-1.5c0-0.5 0.1-0.8 0.2-1 0.2-0.3 0.5-0.5 1-0.5 0.4 0 0.7 0.2 0.9 0.5 0.2 0.2 0.2 0.6 0.2 1v0.8z\"/></g>\n</defs></svg>\n</iron-iconset-svg>\n</body></html>";

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const vaadin_progress_bar_mixin_1 = __webpack_require__(67);
const vaadinProgressBar = __webpack_require__(68);
let ProgressBarElement = ProgressBarElement_1 = class ProgressBarElement extends vaadin_progress_bar_mixin_1.default(polymer_element_1.Element) {
    static get template() {
        const domModule = cheerio.load(vaadinProgressBar)('template');
        const html = domModule.html();
        return html;
    }
    static get is() {
        return 'vaadin-progress-bar';
    }
};
ProgressBarElement = ProgressBarElement_1 = __decorate([
    polymer3_decorators_1.component(ProgressBarElement_1.is)
], ProgressBarElement);
var ProgressBarElement_1;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VaadinProgressMixin = superClass => class _VaadinProgressMixin extends superClass {
    ready() {
        super.ready();
    }
    static get properties() {
        return {
            /**
             * Displays current progress
             */
            value: {
                type: Number,
                reflectToAttribute: true
            },
            /**
             * Minimum bound of the progress bar. Cannot be greater than max.
             */
            min: {
                type: Number,
                value: 0,
                reflectToAttribute: true,
                observer: '_minChanged'
            },
            /**
             * Maximum bound of the progress bar. Cannot be less than min.
             */
            max: {
                type: Number,
                value: 1,
                reflectToAttribute: true,
                observer: '_maxChanged'
            }
        };
    }
    _minChanged(newV, oldV) {
        if (newV >= this.max) {
            try {
                throw new Error('min should be less then max');
            }
            finally {
                this.min = oldV;
            }
        }
    }
    _maxChanged(newV, oldV) {
        if (newV <= this.min) {
            try {
                throw new Error('min should be less then max');
            }
            finally {
                this.max = oldV;
            }
        }
    }
    /**
     * Percent of current progress relative to whole progress bar (max - min)
     */
    _normalizeValue(value, min, max) {
        if (!value && value != 0) {
            return;
        }
        var nV = (value - min) / (max - min);
        if (nV > 1) {
            nV = 1;
        }
        else if (nV < 0) {
            nV = 0;
        }
        return nV;
    }
};
exports.default = VaadinProgressMixin;


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"vaadin-progress-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-progress-bar\">\n  <template>\n    <style>\n      :host {\n        --vaadin-progress-background-color: rgba(0, 0, 0, 0.1);\n        --vaadin-progress-foreground-color: var(--primary-color, rgba(0, 0, 0, 0.5));\n        --vaadin-progress-line-width: 3px;\n\n        display: block;\n        height: var(--vaadin-progress-line-width);\n        margin: 8px 0;\n        overflow: hidden;\n        position: relative;\n      }\n\n      #background {\n        background: var(--vaadin-progress-background-color);\n        height: 100%;\n        position: absolute;\n        width: 100%;\n      }\n\n      #foreground {\n        background: var(--vaadin-progress-foreground-color);\n        height: 100%;\n        position: absolute;\n        transform-origin: 0 50%;\n        transition: transform 150ms;\n        width: 100%;\n      }\n\n      :host(:not([value])) #foreground {\n        animation: indeterminate-progress-bar 1s infinite;\n      }\n\n      @keyframes indeterminate-progress-bar {\n        0% {\n          transform: translateX(-100%);\n        }\n\n        100% {\n          transform: translateX(100%);\n        }\n      }\n\n    </style>\n\n    <div id=\"background\"></div>\n    <div id=\"foreground\" style$=\"transform: scaleX([[_normalizeValue(value, min, max)]])\"></div>\n\n  </template>\n\n  <script>\n    if (!Polymer.Element) {\n      throw new Error(`Unexpected Polymer version ${Polymer.version} is used, expected v2.0.0 or later.`);\n    }\n\n    {\n      /**\n       * `<vaadin-progress-bar>` is a Polymer 2 progress bar.\n       *\n       * ```html\n       * <vaadin-progress-bar>\n       * </vaadin-progress-bar>\n       * ```\n       *\n       * @memberof Vaadin\n       * @mixes Vaadin.ProgressMixin\n       * @demo demo/index.html\n       */\n      class ProgressBarElement extends Vaadin.ProgressMixin(Polymer.Element) {\n        static get is() {\n          return 'vaadin-progress-bar';\n        }\n      }\n\n      customElements.define(ProgressBarElement.is, ProgressBarElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.ProgressBarElement = ProgressBarElement;\n    }\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const gesture_event_listeners_1 = __webpack_require__(6);
const vaadin_control_state_mixin_1 = __webpack_require__(5);
const vaadin_themable_mixin_1 = __webpack_require__(4);
__webpack_require__(70);
const vaadinRadioButton = __webpack_require__(72);
const domModule = cheerio.load(vaadinRadioButton)('body');
utils_1.importStyle(`<dom-module id="vaadin-radio-button-default-theme" theme-for="vaadin-radio-button">${domModule.find('dom-module[id="vaadin-radio-button-default-theme"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-radio-button"><template>${domModule.find('dom-module[id="vaadin-radio-button"] template').html()}</template></dom-module>`);
let RadioButtonElement = RadioButtonElement_1 = class RadioButtonElement extends vaadin_control_state_mixin_1.default(vaadin_themable_mixin_1.default(gesture_event_listeners_1.GestureEventListeners(polymer_element_1.Element))) {
    static get is() {
        return 'vaadin-radio-button';
    }
    static get properties() {
        return Object.assign({
            /**
             * True if the radio button is checked.
             */
            checked: {
                type: Boolean,
                value: false,
                notify: true,
                observer: '_checkedChanged',
                reflectToAttribute: true
            },
            /**
             * The name of the control, which is submitted with the form data.
             */
            name: {
                type: String
            },
            /**
             * The value passed to `<vaadin-radio-group>` and submitted as form data.
             */
            value: {
                type: String,
                reflectToAttribute: true
            }
        }, super.properties);
    }
    ready() {
        super.ready();
        this.setAttribute('role', 'radio');
        this._addActiveListeners();
    }
    _checkedChanged(checked) {
        this.setAttribute('aria-checked', checked);
        if (checked && !this.value) {
            this.value = 'on';
        }
        else if (!checked && this.value == 'on') {
            this.value = undefined;
        }
        this.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    }
    _addActiveListeners() {
        // DOWN
        this._addEventListenerToNode(this, 'down', (e) => {
            if (!this.disabled) {
                this.setAttribute('active', '');
            }
        });
        // UP
        this._addEventListenerToNode(this, 'up', (e) => {
            this.removeAttribute('active');
            if (!this.checked && !this.disabled) {
                this.checked = true;
            }
        });
        // KEYDOWN
        this.addEventListener('keydown', e => {
            if (!this.disabled && e.keyCode === 32) {
                e.preventDefault();
                this.setAttribute('active', '');
            }
        });
        // KEYUP
        this.addEventListener('keyup', e => {
            if (!this.disabled && e.keyCode === 32) {
                e.preventDefault();
                this.setAttribute('checked', '');
                this.removeAttribute('active');
            }
        });
    }
    get focusElement() {
        return this.$.label;
    }
    _preventDefault(e) {
        e.preventDefault();
    }
};
RadioButtonElement = RadioButtonElement_1 = __decorate([
    polymer3_decorators_1.component(RadioButtonElement_1.is)
], RadioButtonElement);
var RadioButtonElement_1;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadinRadioButtonGroup = __webpack_require__(71);
const domModule = cheerio.load(vaadinRadioButtonGroup)('body');
utils_1.importStyle(`<dom-module id="vaadin-radio-button-group-default-theme" theme-for="vaadin-radio-button-group">${domModule.find('dom-module[id="vaadin-radio-button-group-default-theme"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-radio-button-group"><template>${domModule.find('dom-module[id="vaadin-radio-button-group"] template').html()}</template></dom-module>`);
let RadioButtonGroupElement = RadioButtonGroupElement_1 = class RadioButtonGroupElement extends vaadin_themable_mixin_1.default(polymer_element_1.Element) {
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
        }
        else {
            this._selectButton(this.firstElementChild);
        }
    }
    _selectPreviousButton(element) {
        if (element.previousElementSibling) {
            this._selectButton(element.previousElementSibling);
        }
        else {
            this._selectButton(this.lastElementChild);
        }
    }
    _forEachButton(fn) {
        Array.from(this.children).filter(child => child.localName === 'vaadin-radio-button').forEach(fn);
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
        }
        else {
            this.removeAttribute('invalid');
            return true;
        }
    }
};
RadioButtonGroupElement = RadioButtonGroupElement_1 = __decorate([
    polymer3_decorators_1.component(RadioButtonGroupElement_1.is)
], RadioButtonGroupElement);
var RadioButtonGroupElement_1;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"vaadin-radio-button.html\">\n\n</head><body><dom-module id=\"vaadin-radio-button-group-default-theme\" theme-for=\"vaadin-radio-button-group\">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        outline: none;\n      }\n\n      :host([invalid]) {\n        box-shadow: 0 0 1px red;\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-radio-button-group\">\n  <template>\n    <slot></slot>\n  </template>\n\n  <script>\n    if (!Polymer.Element) {\n      throw new Error(`Unexpected Polymer version ${Polymer.version} is used, expected v2.0.0 or later.`);\n    }\n\n    (function() {\n      /**\n       * `<vaadin-radio-button-group>` is a Polymer element for grouping vaadin-radio-buttons.\n       *\n       * ```html\n       * <vaadin-radio-button-group name=\"radio-group\" value=\"bar\">\n       *   <vaadin-radio-button value=\"foo\">Foo</vaadin-radio-button>\n       *   <vaadin-radio-button value=\"bar\">Bar</vaadin-radio-button>\n       *   <vaadin-radio-button value=\"baz\">Baz</vaadin-radio-button>\n       * </vaadin-radio-button-group>\n       * ```\n       *\n       * ### Styling\n       *\n       * The following attributes are exposed for styling:\n       *\n       * Attribute    | Description\n       * -------------|------------\n       * `disabled`   | Set when the radio button group and its children are disabled.\n       * `invalid`    | Set when the radio button group is required and submitted, but does not have value.\n       * `required`   | Set when the radio group is required for submission of the form and must have value.\n       *\n       * @memberof Vaadin\n       * @mixes Vaadin.ThemableMixin\n       * @element vaadin-radio-button-group\n       * @demo demo/index.html\n       */\n      class RadioButtonGroupElement extends Vaadin.ThemableMixin(Polymer.Element) {\n        static get is() {\n          return 'vaadin-radio-button-group';\n        }\n\n        static get properties() {\n          return {\n            /**\n             * The current disabled state of the radio button group. True if group and all internal radio buttons are disabled.\n             */\n            disabled: {\n              type: Boolean,\n              reflectToAttribute: true,\n              observer: '_disabledChanged'\n            },\n\n            /**\n             * The name of the control, which is submitted with the form data.\n             */\n            name: {\n              type: String,\n              reflectToAttribute: true\n            },\n\n            /**\n             * The current required state of the radio button group. True if required.\n             */\n            required: {\n              type: Boolean,\n              reflectToAttribute: true,\n              observer: '_requiredChanged'\n            },\n\n            /**\n             * The value given to the data submitted with the radio button group's name to the server when the control is inside a form.\n             */\n            value: {\n              type: String,\n              notify: true,\n              observer: '_valueChanged',\n              reflectToAttribute: true\n            },\n\n            _checkedButton: {\n              type: Object,\n              observer: '_checkedButtonChanged'\n            }\n          };\n        }\n\n        ready() {\n          super.ready();\n\n          this._addActiveListeners();\n\n          this._checkForInitialValue();\n\n          this.addEventListener('change', e => {\n            var radioButton = e.target;\n\n            if (radioButton.checked) {\n              this._setValueFromButton(radioButton);\n            }\n          });\n\n          this.setAttribute('role', 'radiogroup');\n        }\n\n        _checkForInitialValue() {\n          var checkedButton = this.querySelector('[checked]');\n\n          if (checkedButton) {\n            this._setValueFromButton(checkedButton);\n          }\n        }\n\n        _requiredChanged(required) {\n          this.setAttribute('aria-required', required);\n        }\n\n        _disabledChanged(disabled) {\n          this.validate();\n\n          this.setAttribute('aria-disabled', disabled);\n\n          this._forEachButton(button => button.disabled = disabled);\n        }\n\n        _addActiveListeners() {\n          this.addEventListener('keydown', e => {\n            // if e.target is vaadin-radio-group then assign to checkedRadioButton currently checked radio button\n            var checkedRadioButton = (e.target == this) ? this._checkedButton : e.target;\n            if (this.disabled) {\n              return;\n            }\n\n            // LEFT, UP - select previous radio button\n            if (e.keyCode === 37 || e.keyCode === 38) {\n              e.preventDefault();\n              this._selectPreviousButton(checkedRadioButton);\n            }\n\n            // RIGHT, DOWN - select next radio button\n            if (e.keyCode === 39 || e.keyCode === 40) {\n              e.preventDefault();\n              this._selectNextButton(checkedRadioButton);\n            }\n          });\n        }\n\n        _selectButton(element) {\n          element.focus();\n\n          this._setValueFromButton(element);\n        }\n\n        _selectNextButton(element) {\n          if (element.nextElementSibling) {\n            this._selectButton(element.nextElementSibling);\n          } else {\n            this._selectButton(this.firstElementChild);\n          }\n        }\n\n        _selectPreviousButton(element) {\n          if (element.previousElementSibling) {\n            this._selectButton(element.previousElementSibling);\n          } else {\n            this._selectButton(this.lastElementChild);\n          }\n        }\n\n        _forEachButton(fn) {\n          Array.from(this.children).filter(child => child.localName === 'vaadin-radio-button').forEach(fn);\n        }\n\n        _setValueFromButton(button) {\n          this._checkedButton = button;\n\n          this.value = button.value;\n        }\n\n        _checkedButtonChanged(checkedButton) {\n          this.validate();\n\n          this._forEachButton(button => button.checked = button === checkedButton);\n        }\n\n        _valueChanged(value) {\n          this.validate();\n\n          var buttonWithValue = this.querySelector(`[value='${value}']`);\n          if (!buttonWithValue) {\n            return;\n          }\n\n          if (!this._checkedButton || this._checkedButton.value !== value) {\n            buttonWithValue.setAttribute('checked', '');\n          }\n        }\n\n        validate() {\n          if (!this._checkedButton && this.required && !this.disabled) {\n            this.setAttribute('invalid', '');\n            return false;\n          } else {\n            this.removeAttribute('invalid');\n            return true;\n          }\n        }\n      }\n\n      customElements.define(RadioButtonGroupElement.is, RadioButtonGroupElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.RadioButtonGroupElement = RadioButtonGroupElement;\n    })();\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2017 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../polymer/lib/mixins/gesture-event-listeners.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n<link rel=\"import\" href=\"../vaadin-control-state-mixin/vaadin-control-state-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-radio-button-default-theme\" theme-for=\"vaadin-radio-button\">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        outline: none;\n      }\n\n      [part=\"wrapper\"] {\n        display: inline-flex;\n        align-items: center;\n        outline: none;\n      }\n\n      :host([focus-ring]) {\n        box-shadow: 0 0 2px 2px Highlight;\n      }\n\n      [part=\"native-radio\"] {\n        margin: 3px 0 3px 3px;\n      }\n\n      [part=\"label\"] {\n        padding: 0 5px;\n      }\n\n      :host([disabled]) [part=\"label\"] {\n        opacity: 0.5;\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-radio-button\">\n  <template>\n    <label part=\"wrapper\" id=\"label\" on-click=\"_preventDefault\">\n      <input id=\"nativeRadio\" type=\"radio\" part=\"native-radio\" checked=\"{{checked::change}}\" disabled$=\"[[disabled]]\" role=\"presentation\" tabindex=\"-1\">\n\n      <span part=\"radio\"></span>\n\n      <span part=\"label\">\n        <slot></slot>\n      </span>\n    </label>\n  </template>\n\n  <script>\n    if (!Polymer.Element) {\n      throw new Error(`Unexpected Polymer version ${Polymer.version} is used, expected v2.0.0 or later.`);\n    }\n\n    (function() {\n      /**\n       * `<vaadin-radio-button>` is a Polymer element for radio buttons.\n       *\n       * ```html\n       * <vaadin-radio-button value=\"foo\">Foo</vaadin-radio-button>\n       * ```\n       *\n       * ### Styling\n       *\n       * The following shadow DOM parts are exposed for styling:\n       *\n       * Part name         | Description\n       * ------------------|----------------\n       * `wrapper`         | The `<label>` element which wrapps the radio button and [part=\"label\"]\n       * `native-radio`    | The `<input type=\"radio\">` element\n       * `radio`           | The `<span>` element for a custom graphical radio button\n       * `label`           | The `<span>` element for slotted text/HTML label\n       *\n       * The following attributes are exposed for styling:\n       *\n       * Attribute    | Description\n       * -------------|------------\n       * `disabled`   | Set when the radio button is disabled.\n       * `focus-ring` | Set when the radio button is focused using the keyboard.\n       * `focused`    | Set when the radio button is focused.\n       *\n       * @memberof Vaadin\n       * @mixes Vaadin.ControlStateMixin\n       * @mixes Vaadin.ThemableMixin\n       * @element vaadin-radio-button\n       * @demo demo/index.html\n       */\n      class RadioButtonElement extends Vaadin.ControlStateMixin(Vaadin.ThemableMixin(Polymer.GestureEventListeners(Polymer.Element))) {\n        static get is() {\n          return 'vaadin-radio-button';\n        }\n\n        static get properties() {\n          return {\n            /**\n             * True if the radio button is checked.\n             */\n            checked: {\n              type: Boolean,\n              value: false,\n              notify: true,\n              observer: '_checkedChanged',\n              reflectToAttribute: true\n            },\n\n\n            /**\n             * The name of the control, which is submitted with the form data.\n             */\n            name: {\n              type: String\n            },\n\n            /**\n             * The value passed to `<vaadin-radio-group>` and submitted as form data.\n             */\n            value: {\n              type: String,\n              reflectToAttribute: true\n            }\n          };\n        }\n\n        ready() {\n          super.ready();\n\n          this.setAttribute('role', 'radio');\n\n          this._addActiveListeners();\n        }\n\n        _checkedChanged(checked) {\n          this.setAttribute('aria-checked', checked);\n\n          if (checked && !this.value) {\n            this.value = 'on';\n          } else if (!checked && this.value == 'on') {\n            this.value = undefined;\n          }\n\n          this.dispatchEvent(new CustomEvent('change', {bubbles: true}));\n        }\n\n        _addActiveListeners() {\n          // DOWN\n          this._addEventListenerToNode(this, 'down', (e) => {\n            if (!this.disabled) {\n              this.setAttribute('active', '');\n            }\n          });\n\n          // UP\n          this._addEventListenerToNode(this, 'up', (e) => {\n            this.removeAttribute('active');\n\n            if (!this.checked && !this.disabled) {\n              this.checked = true;\n            }\n          });\n\n          // KEYDOWN\n          this.addEventListener('keydown', e => {\n            if (!this.disabled && e.keyCode === 32) {\n              e.preventDefault();\n              this.setAttribute('active', '');\n            }\n          });\n\n          // KEYUP\n          this.addEventListener('keyup', e => {\n            if (!this.disabled && e.keyCode === 32) {\n              e.preventDefault();\n              this.setAttribute('checked', '');\n              this.removeAttribute('active');\n            }\n          });\n        }\n\n        get focusElement() {\n          return this.$.label;\n        }\n\n        _preventDefault(e) {\n          e.preventDefault();\n        }\n      }\n\n      customElements.define(RadioButtonElement.is, RadioButtonElement);\n\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.RadioButtonElement = RadioButtonElement;\n    })();\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const polymer_element_1 = __webpack_require__(2);
const polymer3_decorators_1 = __webpack_require__(1);
const flattened_nodes_observer_1 = __webpack_require__(20);
const class_1 = __webpack_require__(9);
const iron_resizable_behavior_1 = __webpack_require__(8);
const vaadin_themable_mixin_1 = __webpack_require__(4);
const vaadinSplitLayout = __webpack_require__(74);
const domModule = cheerio.load(vaadinSplitLayout)('body');
utils_1.importStyle(`<dom-module id="vaadin-split-layout-default-theme" theme-for="vaadin-split-layout">${domModule.find('dom-module[id="vaadin-split-layout-default-theme"]').html()}</dom-module>`);
utils_1.importStyle(`<dom-module id="vaadin-split-layout"><template>${domModule.find('dom-module[id="vaadin-split-layout"] template').html()}</template></dom-module>`);
let SplitLayoutElement = SplitLayoutElement_1 = class SplitLayoutElement extends vaadin_themable_mixin_1.default(class_1.mixinBehaviors(iron_resizable_behavior_1.IronResizableBehavior, polymer_element_1.Element)) {
    static get is() {
        return 'vaadin-split-layout';
    }
    static get properties() {
        return {
            /**
             * Change the split layout to vertical
             */
            vertical: {
                type: Boolean,
                reflectToAttribute: true,
                value: false
            },
            _previousPrimaryPointerEvents: String,
            _previousSecondaryPointerEvents: String
        };
    }
    ready() {
        super.ready();
        new flattened_nodes_observer_1.FlattenedNodesObserver(this, this._processChildren);
    }
    _processChildren() {
        this.getEffectiveChildren().forEach((child, i) => {
            if (i === 0) {
                this._primaryChild = child;
                child.setAttribute('slot', 'primary');
            }
            else if (i == 1) {
                this._secondaryChild = child;
                child.setAttribute('slot', 'secondary');
            }
            else {
                child.removeAttribute('slot');
            }
        });
    }
    _setFlexBasis(element, flexBasis, containerSize) {
        flexBasis = Math.max(0, Math.min(flexBasis, containerSize));
        if (flexBasis === 0) {
            // Pure zero does not play well in Safari
            flexBasis = 0.000001;
        }
        element.style.flex = '1 1 ' + flexBasis + 'px';
    }
    _onHandleTrack(event) {
        if (!this._primaryChild || !this._secondaryChild) {
            return;
        }
        var size = this.vertical ? 'height' : 'width';
        if (event.detail.state === 'start') {
            this._startSize = {
                container: this.getBoundingClientRect()[size] - this.$.splitter.getBoundingClientRect()[size],
                primary: this._primaryChild.getBoundingClientRect()[size],
                secondary: this._secondaryChild.getBoundingClientRect()[size]
            };
            this._previousPrimaryPointerEvents = this._primaryChild.style.pointerEvents;
            this._previousSecondaryPointerEvents = this._secondaryChild.style.pointerEvents;
            this._primaryChild.style.pointerEvents = 'none';
            this._secondaryChild.style.pointerEvents = 'none';
            return;
        }
        var distance = this.vertical ? event.detail.dy : event.detail.dx;
        this._setFlexBasis(this._primaryChild, this._startSize.primary + distance, this._startSize.container);
        this._setFlexBasis(this._secondaryChild, this._startSize.secondary - distance, this._startSize.container);
        this.notifyResize();
        if (event.detail.state === 'end') {
            delete this._startSize;
            this._primaryChild.style.pointerEvents = this._previousPrimaryPointerEvents;
            this._secondaryChild.style.pointerEvents = this._previousSecondaryPointerEvents;
        }
    }
    _preventDefault(event) {
        event.preventDefault();
    }
};
SplitLayoutElement = SplitLayoutElement_1 = __decorate([
    polymer3_decorators_1.component(SplitLayoutElement_1.is)
], SplitLayoutElement);
var SplitLayoutElement_1;


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = "<!--\n@license\nCopyright (c) 2016 Vaadin Ltd.\nThis program is available under Apache License Version 2.0, available at https://vaadin.com/license/\n--><html><head><link rel=\"import\" href=\"../polymer/polymer-element.html\">\n<link rel=\"import\" href=\"../polymer/lib/utils/flattened-nodes-observer.html\">\n<link rel=\"import\" href=\"../iron-resizable-behavior/iron-resizable-behavior.html\">\n<link rel=\"import\" href=\"../vaadin-themable-mixin/vaadin-themable-mixin.html\">\n\n</head><body><dom-module id=\"vaadin-split-layout-default-theme\" theme-for=\"vaadin-split-layout\">\n  <template>\n    <style>\n      [part=\"splitter\"] {\n        background: #ccc;\n      }\n\n      [part=\"handle\"]::after {\n        content: \"\";\n        display: block;\n        width: 2px;\n        height: 24px;\n        margin: 8px auto;\n        background: #fff;\n      }\n\n      :host([vertical]) [part=\"handle\"]::after {\n        transform: rotate(90deg);\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"vaadin-split-layout\">\n  <template>\n    <style>\n      :host {\n        display: flex;\n        overflow: hidden !important;\n        transform: translateZ(0);\n      }\n\n      :host([vertical]) {\n        flex-direction: column;\n      }\n\n      :host ::slotted(*) {\n        flex: 1 1 auto;\n        overflow: auto;\n      }\n\n      [part=\"splitter\"] {\n        flex: none;\n        position: relative;\n        z-index: 1;\n        overflow: visible;\n        min-width: 8px;\n        min-height: 8px;\n      }\n\n      :host(:not([vertical])) > [part=\"splitter\"] {\n        cursor: ew-resize;\n      }\n\n      :host([vertical]) > [part=\"splitter\"] {\n        cursor: ns-resize;\n      }\n\n      [part=\"handle\"] {\n        width: 40px;\n        height: 40px;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate3d(-50%, -50%, 0);\n      }\n    </style>\n    <slot id=\"primary\" name=\"primary\"></slot>\n    <div part=\"splitter\" id=\"splitter\" on-track=\"_onHandleTrack\" on-down=\"_preventDefault\">\n      <div part=\"handle\"></div>\n    </div>\n    <slot id=\"secondary\" name=\"secondary\"></slot>\n  </template>\n\n  <script>\n    if (!Polymer.Element) {\n      throw new Error(`Unexpected Polymer version ${Polymer.version} is used, expected v2.0.0 or later.`);\n    }\n\n    {\n      /**\n       * `<vaadin-split-layout>` is a Polymer element implementing a split layout for two\n       * content elements with a draggable splitter between them.\n       *\n       * ```html\n       * <vaadin-split-layout>\n       *   <div>First content element</div>\n       *   <div>Second content element</div>\n       * </vaadin-split-layout>\n       * ```\n       *\n       * ### Horizontal and Vertical Layouts\n       *\n       * By default, the split is horizontal, meaning that the content elements are\n       * positioned side by side in a flex container with a horizontal layout.\n       *\n       * You can change the split mode to vertical by adding the `vertical` attribute:\n       *\n       * ```html\n       * <vaadin-split-layout vertical>\n       *   <div>Content on the top</div>\n       *   <div>Content on the bottom</div>\n       * </vaadin-split-layout>\n       * ```\n       *\n       * ### Layouts Combination\n       *\n       * For the layout contents, we usually use `<div>` elements in the examples,\n       * although you can use any other elements as well.\n       *\n       * For instance, in order to have a nested vertical split layout inside a\n       * horizontal one, you can include `<vaadin-split-layout>` as a content element\n       * inside another split layout:\n       *\n       * ```html\n       * <vaadin-split-layout>\n       *   <div>First content element</div>\n       *   <vaadin-split-layout vertical>\n       *     <div>Second content element</div>\n       *     <div>Third content element</div>\n       *   </vaadin-split-layout>\n       * </vaadin-split-layout>\n       * ```\n       *\n       * You can also trigger the vertical mode by setting the property:\n       * `splitLayout.vertical = true;`.\n       *\n       * ### Split Layout Element Height\n       *\n       * `<vaadin-split-layout>` element itself is a flex container. It does not inherit\n       * the parent height by default, but rather sets its height depending on the\n       * content.\n       *\n       * You can use CSS to set the fixed height for the split layout, as usual with any\n       * block element:\n       *\n       * ```html\n       * <vaadin-split-layout style=\"height: 200px;\">\n       *   <div>First content element</div>\n       *   <div>Second content element</div>\n       * </vaadin-split-layout>\n       * ```\n       *\n       * It is possible to define percentage height as well. Note that you have to set\n       * the parent height in order to make percentages work correctly. In the following\n       * example, the `<body>` is resized to fill the entire viewport, and the\n       * `<vaadin-split-layout>` element is set to take 100% height of the `<body>`:\n       *\n       * ```html\n       * <body style=\"height: 100vh; margin: 0;\">\n       *   <vaadin-split-layout style=\"height: 100%;\">\n       *     <div>First</div>\n       *     <div>Second</div>\n       *   </vaadin-split-layout>\n       * </body>\n       * ```\n       *\n       * Alternatively, you can use a flexbox layout to make `<vaadin-split-layout>`\n       * fill up the parent:\n       *\n       * ```html\n       * <body style=\"height: 100vh; margin: 0; display: flex;\">\n       *   <vaadin-split-layout style=\"flex: 1;\">\n       *     <div>First</div>\n       *     <div>Second</div>\n       *   </vaadin-split-layout>\n       * </body>\n       * ```\n       *\n       * ### Initial Splitter Position\n       *\n       * The initial splitter position is determined from the sizes of the content elements\n       * inside the split layout. Therefore, changing `width` on the content elements\n       * affects the initial splitter position for the horizontal layouts, while `height`\n       * affects the vertical ones.\n       *\n       * Note that when the total size of the content elements does not fit the layout,\n       * the content elements are scaled proportionally.\n       *\n       * When setting initial sizes with relative units, such as percentages, it is\n       * recommended to assing the size for both content elements:\n       *\n       * ```html\n       * <vaadin-split-layout>\n       *   <div style=\"width: 75%;\">Three fourths</div>\n       *   <div style=\"width: 25%;\">One fourth</div>\n       * </vaadin-split-layout>\n       * ```\n       *\n       * ### Size Limits\n       *\n       * The `min-width`/`min-height`, and `max-width`/`max-height` CSS size values\n       * for the content elements are respected and used to limit the splitter position\n       * when it is dragged.\n       *\n       * It is preferred to set the limits only for a single content element, in order\n       * to avoid size conflicts:\n       *\n       * ```html\n       * <vaadin-split-layout>\n       *   <div style=\"min-width: 50px; max-width: 150px;\">First</div>\n       *   <div>Second</div>\n       * </vaadin-split-layout>\n       * ```\n       *\n       * ### Resize Notification\n       *\n       * This element implements `IronResizableBehavior` to notify the nested resizables\n       * when the splitter is dragged. In order to define a resizable and receive that\n       * notification in a nested element, include `IronResizableBehavior` and listen\n       * for the `iron-resize` event.\n       *\n       * ### Styling\n       *\n       * The following shadow DOM parts are available for styling:\n       *\n       * Part name | Description | Theme for Element\n       * ----------------|----------------|----------------\n       * `splitter` | Split element | vaadin-split-layout\n       * `handle` | The handle of the splitter | vaadin-split-layout\n       *\n       * @memberof Vaadin\n       * @demo demo/index.html\n       */\n      class SplitLayoutElement extends Vaadin.ThemableMixin(Polymer.mixinBehaviors([Polymer.IronResizableBehavior], Polymer.Element)) {\n        static get is() {\n          return 'vaadin-split-layout';\n        }\n\n        static get properties() {\n          return {\n            /**\n             * Change the split layout to vertical\n             */\n            vertical: {\n              type: Boolean,\n              reflectToAttribute: true,\n              value: false\n            },\n\n            _previousPrimaryPointerEvents: String,\n            _previousSecondaryPointerEvents: String\n          };\n        }\n\n        ready() {\n          super.ready();\n          new Polymer.FlattenedNodesObserver(this, this._processChildren);\n        }\n\n        _processChildren() {\n          this.getEffectiveChildren().forEach((child, i) => {\n            if (i === 0) {\n              this._primaryChild = child;\n              child.setAttribute('slot', 'primary');\n            } else if (i == 1) {\n              this._secondaryChild = child;\n              child.setAttribute('slot', 'secondary');\n            } else {\n              child.removeAttribute('slot');\n            }\n          });\n        }\n\n        _setFlexBasis(element, flexBasis, containerSize) {\n          flexBasis = Math.max(0, Math.min(flexBasis, containerSize));\n          if (flexBasis === 0) {\n            // Pure zero does not play well in Safari\n            flexBasis = 0.000001;\n          }\n          element.style.flex = '1 1 ' + flexBasis + 'px';\n        }\n\n        _onHandleTrack(event) {\n          if (!this._primaryChild || !this._secondaryChild) {\n            return;\n          }\n\n          var size = this.vertical ? 'height' : 'width';\n          if (event.detail.state === 'start') {\n            this._startSize = {\n              container: this.getBoundingClientRect()[size] - this.$.splitter.getBoundingClientRect()[size],\n              primary: this._primaryChild.getBoundingClientRect()[size],\n              secondary: this._secondaryChild.getBoundingClientRect()[size]\n            };\n\n            this._previousPrimaryPointerEvents = this._primaryChild.style.pointerEvents;\n            this._previousSecondaryPointerEvents = this._secondaryChild.style.pointerEvents;\n            this._primaryChild.style.pointerEvents = 'none';\n            this._secondaryChild.style.pointerEvents = 'none';\n            return;\n          }\n\n          var distance = this.vertical ? event.detail.dy : event.detail.dx;\n          this._setFlexBasis(this._primaryChild, this._startSize.primary + distance, this._startSize.container);\n          this._setFlexBasis(this._secondaryChild, this._startSize.secondary - distance, this._startSize.container);\n\n          this.notifyResize();\n\n          if (event.detail.state === 'end') {\n            delete this._startSize;\n\n            this._primaryChild.style.pointerEvents = this._previousPrimaryPointerEvents;\n            this._secondaryChild.style.pointerEvents = this._previousSecondaryPointerEvents;\n          }\n        }\n\n        _preventDefault(event) {\n          event.preventDefault();\n        }\n\n        /**\n         * Fired when the splitter is dragged. Non-bubbing. Fired for the splitter\n         * element and any nested elements with `IronResizableBehavior`.\n         *\n         * @event iron-resize\n         */\n      }\n\n      customElements.define(SplitLayoutElement.is, SplitLayoutElement);\n\n      /**\n       * @namespace Vaadin\n       */\n      window.Vaadin = window.Vaadin || {};\n      Vaadin.SplitLayoutElement = SplitLayoutElement;\n    }\n  </script>\n</dom-module>\n</body></html>";

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const importStyles = template => {
    const domModule = cheerio.load(template)('body');
    domModule.remove('script');
    utils_1.importStyle(domModule.html());
};
__webpack_require__(76);
const color = __webpack_require__(77);
const sizingAndSpacing = __webpack_require__(78);
const style = __webpack_require__(79);
const typography = __webpack_require__(80);
const fontIcons = __webpack_require__(81);
const _vaadinButton = __webpack_require__(82);
const _vaadinCheckbox = __webpack_require__(83);
const _vaadinComboBox = __webpack_require__(84);
const _vaadinContextMenu = __webpack_require__(85);
const _vaadinDatePicker = __webpack_require__(86);
const _vaadinDialog = __webpack_require__(87);
const _vaadinFormItem = __webpack_require__(88);
const _vaadinFormLayout = __webpack_require__(89);
const _vaadinGrid = __webpack_require__(90);
const _vaadinOverlay = __webpack_require__(91);
const _vaadinPasswordField = __webpack_require__(92);
const _vaadinTextField = __webpack_require__(93);
importStyles(color);
importStyles(sizingAndSpacing);
importStyles(style);
importStyles(typography);
importStyles(fontIcons);
importStyles(_vaadinButton);
importStyles(_vaadinCheckbox);
importStyles(_vaadinComboBox);
importStyles(_vaadinContextMenu);
importStyles(_vaadinDatePicker);
importStyles(_vaadinDialog);
importStyles(_vaadinFormItem);
importStyles(_vaadinFormLayout);
importStyles(_vaadinGrid);
importStyles(_vaadinOverlay);
importStyles(_vaadinPasswordField);
importStyles(_vaadinTextField);


/***/ }),
/* 76 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"../polymer/lib/elements/custom-style.html\">\n\n</head><body><custom-style>\n  <style>\n    html {\n      /* Tints */\n      --valo-tint-5pct: hsla(0, 0%, 100%, 0.06);\n      --valo-tint-10pct: hsla(0, 0%, 100%, 0.11);\n      --valo-tint-20pct: hsla(0, 0%, 100%, 0.21);\n      --valo-tint-30pct: hsla(0, 0%, 100%, 0.31);\n      --valo-tint-40pct: hsla(0, 0%, 100%, 0.41);\n      --valo-tint-50pct: hsla(0, 0%, 100%, 0.51);\n      --valo-tint-60pct: hsla(0, 0%, 100%, 0.61);\n      --valo-tint-70pct: hsla(0, 0%, 100%, 0.71);\n      --valo-tint-80pct: hsla(0, 0%, 100%, 0.81);\n      --valo-tint-90pct: hsla(0, 0%, 100%, 0.91);\n      --valo-tint: #FFF;\n\n      /* Shades */\n      --valo-shade-5pct: hsla(214, 27%, 26%, 0.06);\n      --valo-shade-10pct: hsla(214, 27%, 26%, 0.11);\n      --valo-shade-20pct: hsla(214, 27%, 26%, 0.21);\n      --valo-shade-30pct: hsla(214, 27%, 26%, 0.31);\n      --valo-shade-40pct: hsla(214, 27%, 26%, 0.41);\n      --valo-shade-50pct: hsla(214, 27%, 26%, 0.51);\n      --valo-shade-60pct: hsla(214, 27%, 26%, 0.61);\n      --valo-shade-70pct: hsla(214, 27%, 26%, 0.71);\n      --valo-shade-80pct: hsla(214, 27%, 26%, 0.81);\n      --valo-shade-90pct: hsla(214, 27%, 26%, 0.91);\n      --valo-shade: hsl(214, 27%, 26%);\n\n      /* Contrast colors */\n      --valo-contrast-5pct: var(--valo-shade-5pct);\n      --valo-contrast-10pct: var(--valo-shade-10pct);\n      --valo-contrast-20pct: var(--valo-shade-20pct);\n      --valo-contrast-30pct: var(--valo-shade-30pct);\n      --valo-contrast-40pct: var(--valo-shade-40pct);\n      --valo-contrast-50pct: var(--valo-shade-50pct);\n      --valo-contrast-60pct: var(--valo-shade-60pct);\n      --valo-contrast-70pct: var(--valo-shade-70pct);\n      --valo-contrast-80pct: var(--valo-shade-80pct);\n      --valo-contrast-90pct: var(--valo-shade-90pct);\n      --valo-contrast: var(--valo-shade);\n\n      /* Text colors */\n      --valo-header-text-color: var(--valo-contrast);\n      --valo-body-text-color: var(--valo-contrast-90pct);\n      --valo-secondary-text-color: var(--valo-contrast-70pct);\n      --valo-tertiary-text-color: var(--valo-contrast-50pct);\n      --valo-disabled-text-color: var(--valo-contrast-30pct);\n\n      /* Primary colors */\n      --valo-primary-color: #1676f4;\n      --valo-primary-color-50pct: rgba(22, 118, 244, 0.5);\n      --valo-primary-color-10pct: rgba(22, 118, 244, 0.1);\n      --valo-primary-text-color: var(--valo-primary-color);\n      --valo-primary-contrast-color: #FFF;\n\n      /* Error colors */\n      --valo-error-color: #FF473A;\n      --valo-error-color-50pct: rgba(255, 66, 56, 0.5);\n      --valo-error-color-10pct: rgba(255, 66, 56, 0.1);\n      --valo-error-text-color: var(--valo-error-color);\n      --valo-error-contrast-color: var(--valo-primary-contrast-color);\n\n      /* Success colors */\n      --valo-success-color: #1BCA66;\n      --valo-success-color-50pct: rgba(27, 201, 102, .5);\n      --valo-success-color-10pct: rgba(27, 201, 102, .1);\n      --valo-success-text-color: var(--valo-success-color);\n      --valo-success-contrast-color: var(--valo-primary-contrast-color);\n\n      /* Base color (main bg) */\n      --valo-base-color: #FFF;\n    }\n  </style>\n</custom-style>\n\n<dom-module id=\"valo-color\">\n  <template>\n    <style>\n      html {\n        color: var(--valo-body-text-color);\n        background-color: var(--valo-base-color);\n      }\n\n      /* Need to duplicate so this style module can be used for custom elements as well */\n      /* Can’t combine with the above selector because that doesn’t work in Firefox */\n      :host {\n        color: var(--valo-body-text-color);\n        background-color: var(--valo-base-color);\n      }\n\n      [theme~=\"dark\"] {\n        /* Tints */\n        --valo-tint-5pct: hsla(214, 13%, 97%, 0.06);\n        --valo-tint-10pct: hsla(214, 13%, 97%, 0.11);\n        --valo-tint-20pct: hsla(214, 13%, 97%, 0.21);\n        --valo-tint-30pct: hsla(214, 13%, 97%, 0.31);\n        --valo-tint-40pct: hsla(214, 13%, 97%, 0.41);\n        --valo-tint-50pct: hsla(214, 13%, 97%, 0.51);\n        --valo-tint-60pct: hsla(214, 13%, 97%, 0.61);\n        --valo-tint-70pct: hsla(214, 13%, 97%, 0.71);\n        --valo-tint-80pct: hsla(214, 13%, 97%, 0.81);\n        --valo-tint-90pct: hsla(214, 13%, 97%, 0.91);\n        --valo-tint: hsl(214, 13%, 97%);\n\n        /* Shades */\n        --valo-shade-5pct: hsla(214, 8%, 7%, 0.06);\n        --valo-shade-10pct: hsla(214, 8%, 7%, 0.11);\n        --valo-shade-20pct: hsla(214, 8%, 7%, 0.21);\n        --valo-shade-30pct: hsla(214, 8%, 7%, 0.31);\n        --valo-shade-40pct: hsla(214, 8%, 7%, 0.41);\n        --valo-shade-50pct: hsla(214, 8%, 7%, 0.51);\n        --valo-shade-60pct: hsla(214, 8%, 7%, 0.61);\n        --valo-shade-70pct: hsla(214, 8%, 7%, 0.71);\n        --valo-shade-80pct: hsla(214, 8%, 7%, 0.81);\n        --valo-shade-90pct: hsla(214, 8%, 7%, 0.91);\n        --valo-shade: hsl(214, 8%, 7%);\n\n        /* Contrast colors */\n        --valo-contrast-5pct: var(--valo-tint-5pct);\n        --valo-contrast-10pct: var(--valo-tint-10pct);\n        --valo-contrast-20pct: var(--valo-tint-20pct);\n        --valo-contrast-30pct: var(--valo-tint-30pct);\n        --valo-contrast-40pct: var(--valo-tint-40pct);\n        --valo-contrast-50pct: var(--valo-tint-50pct);\n        --valo-contrast-60pct: var(--valo-tint-60pct);\n        --valo-contrast-70pct: var(--valo-tint-70pct);\n        --valo-contrast-80pct: var(--valo-tint-80pct);\n        --valo-contrast-90pct: var(--valo-tint-90pct);\n        --valo-contrast: var(--valo-tint);\n\n        /* Text colors */\n        --valo-header-text-color: var(--valo-contrast);\n        --valo-body-text-color: var(--valo-contrast-90pct);\n        --valo-secondary-text-color: var(--valo-contrast-70pct);\n        --valo-tertiary-text-color: var(--valo-contrast-50pct);\n        --valo-disabled-text-color: var(--valo-contrast-30pct);\n\n        /* Primary colors */\n        --valo-primary-color: #3d92ff;\n        --valo-primary-color-50pct: rgba(61, 146, 255, 0.5);\n        --valo-primary-color-10pct: rgba(61, 146, 255, 0.1);\n        --valo-primary-text-color: var(--valo-primary-color);\n        --valo-primary-contrast-color: #FFF;\n\n        /* Error colors */\n        --valo-error-color: #f65b50;\n        --valo-error-color-50pct: rgba(246, 91, 80, 0.5);\n        --valo-error-color-10pct: rgba(246, 91, 80, 0.1);\n        --valo-error-text-color: var(--valo-error-color);\n\n        /* Use the original shade color. The newly defined shade colors are used to shade this color */\n        --valo-base-color: hsl(214, 27%, 26%);\n\n        /* This is a special case, where the contrast colors don’t look nice, so we need an extra property for it */\n        ---valo-button-background-color: var(--valo-tint-5pct);\n\n        /* Set the base colors */\n        color: var(--valo-body-text-color);\n        background-color: var(--valo-base-color);\n      }\n\n      /* Set link color */\n      a {\n        color: var(--valo-link-color, var(--valo-primary-text-color));\n      }\n    </style>\n  </template>\n</dom-module>\n\n<!-- TODO: only needed for IE11/Edge14. This is a copy-paste of the [theme~=dark] selector above, and it should be automatically generated by a build script -->\n<dom-module id=\"valo-dark\">\n  <template>\n    <style>\n      :host {\n        /* Tints */\n        --valo-tint-5pct: hsla(214, 13%, 97%, 0.06);\n        --valo-tint-10pct: hsla(214, 13%, 97%, 0.11);\n        --valo-tint-20pct: hsla(214, 13%, 97%, 0.21);\n        --valo-tint-30pct: hsla(214, 13%, 97%, 0.31);\n        --valo-tint-40pct: hsla(214, 13%, 97%, 0.41);\n        --valo-tint-50pct: hsla(214, 13%, 97%, 0.51);\n        --valo-tint-60pct: hsla(214, 13%, 97%, 0.61);\n        --valo-tint-70pct: hsla(214, 13%, 97%, 0.71);\n        --valo-tint-80pct: hsla(214, 13%, 97%, 0.81);\n        --valo-tint-90pct: hsla(214, 13%, 97%, 0.91);\n        --valo-tint: hsl(214, 13%, 97%);\n\n        /* Shades */\n        --valo-shade-5pct: hsla(214, 8%, 7%, 0.06);\n        --valo-shade-10pct: hsla(214, 8%, 7%, 0.11);\n        --valo-shade-20pct: hsla(214, 8%, 7%, 0.21);\n        --valo-shade-30pct: hsla(214, 8%, 7%, 0.31);\n        --valo-shade-40pct: hsla(214, 8%, 7%, 0.41);\n        --valo-shade-50pct: hsla(214, 8%, 7%, 0.51);\n        --valo-shade-60pct: hsla(214, 8%, 7%, 0.61);\n        --valo-shade-70pct: hsla(214, 8%, 7%, 0.71);\n        --valo-shade-80pct: hsla(214, 8%, 7%, 0.81);\n        --valo-shade-90pct: hsla(214, 8%, 7%, 0.91);\n        --valo-shade: hsl(214, 8%, 7%);\n\n        /* Contrast colors */\n        --valo-contrast-5pct: var(--valo-tint-5pct);\n        --valo-contrast-10pct: var(--valo-tint-10pct);\n        --valo-contrast-20pct: var(--valo-tint-20pct);\n        --valo-contrast-30pct: var(--valo-tint-30pct);\n        --valo-contrast-40pct: var(--valo-tint-40pct);\n        --valo-contrast-50pct: var(--valo-tint-50pct);\n        --valo-contrast-60pct: var(--valo-tint-60pct);\n        --valo-contrast-70pct: var(--valo-tint-70pct);\n        --valo-contrast-80pct: var(--valo-tint-80pct);\n        --valo-contrast-90pct: var(--valo-tint-90pct);\n        --valo-contrast: var(--valo-tint);\n\n        /* Text colors */\n        --valo-header-text-color: var(--valo-contrast);\n        --valo-body-text-color: var(--valo-contrast-90pct);\n        --valo-secondary-text-color: var(--valo-contrast-70pct);\n        --valo-tertiary-text-color: var(--valo-contrast-50pct);\n        --valo-disabled-text-color: var(--valo-contrast-30pct);\n\n        /* Primary colors */\n        --valo-primary-color: #3d92ff;\n        --valo-primary-color-50pct: rgba(61, 146, 255, 0.5);\n        --valo-primary-color-10pct: rgba(61, 146, 255, 0.1);\n        --valo-primary-text-color: var(--valo-primary-color);\n        --valo-primary-contrast-color: #FFF;\n\n        /* Error colors */\n        --valo-error-color: #f65b50;\n        --valo-error-color-50pct: rgba(246, 91, 80, 0.5);\n        --valo-error-color-10pct: rgba(246, 91, 80, 0.1);\n        --valo-error-text-color: var(--valo-error-color);\n\n        /* Use the original shade color. The newly defined shade colors are used to shade this color */\n        --valo-base-color: hsl(214, 27%, 26%);\n\n        /* This is a special case, where the contrast colors don’t look nice, so we need an extra property for it */\n        ---valo-button-background-color: var(--valo-tint-5pct);\n\n        /* Set the base colors */\n        color: var(--valo-body-text-color);\n        background-color: var(--valo-base-color);\n      }\n    </style>\n  </template>\n</dom-module>\n\n<!-- TODO remove before beta (https://github.com/vaadin/vaadin-valo-theme/issues/15) -->\n<dom-module id=\"valo-colors\">\n  <template>\n    <style include=\"valo-color\">\n      body {\n        --valo-deprecated-colors-style-module: \"true\";\n      }\n    </style>\n  </template>\n</dom-module>\n\n<script>\ndocument.addEventListener('WebComponentsReady', () => {\n  const deprecatedStyleModule = ShadyCSS.getComputedStyleValue(document.body, '--valo-deprecated-colors-style-module');\n  if (deprecatedStyleModule) {\n    console.warn(\"The “valo-colors” style module is renamed to “valo-color”. Please update your code accordingly. The deprecated “valo-colors” style module will be removed in some version before the first beta version.\");\n  }\n});\n</script>\n</body></html>";

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"../polymer/lib/elements/custom-style.html\">\n\n</head><body><custom-style>\n  <style>\n    html {\n\n      /* Sizes */\n      --valo-size-xs: 26px;\n      --valo-size-s: 30px;\n      --valo-size-m: 36px;\n      --valo-size-l: 44px;\n      --valo-size-xl: 56px;\n\n      /* Spaces */\n      --valo-space-xs: 4px;\n      --valo-space-s: 8px;\n      --valo-space-m: 16px;\n      --valo-space-l: 32px;\n      --valo-space-xl: 64px;\n\n      /* Wide spaces (more horizontal vs vertical padding) */\n      --valo-space-wide-xs: 4px 8px;\n      --valo-space-wide-s: 6px 12px;\n      --valo-space-wide-m: 8px 16px;\n      --valo-space-wide-l: 16px 32px;\n      --valo-space-wide-xl: 32px 64px;\n\n      /* Tall spaces (more vertical vs horizontal padding) */\n      --valo-space-tall-xs: 8px 4px;\n      --valo-space-tall-s: 12px 6px;\n      --valo-space-tall-m: 16px 8px;\n      --valo-space-tall-l: 32px 16px;\n      --valo-space-tall-xl: 64px 32px;\n    }\n  </style>\n</custom-style>\n</body></html>";

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"../polymer/lib/elements/custom-style.html\">\n\n</head><body><custom-style>\n  <style>\n    html {\n      --valo-border-radius: 4px;\n    }\n  </style>\n</custom-style>\n</body></html>";

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"../polymer/lib/elements/custom-style.html\">\n\n</head><body><custom-style>\n  <style>\n    html {\n      /* Font families */\n      --valo-font-family: -apple-system, BlinkMacSystemFont, \"Roboto\", \"Segoe UI\", Ubuntu, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\n      /* Font sizes */\n      --valo-font-size-xxxl: 2.25rem;\n      --valo-font-size-xxl: 1.75rem;\n      --valo-font-size-xl: 1.375rem;\n      --valo-font-size-l: 1.125rem;\n      --valo-font-size-m: 1rem;\n      --valo-font-size-s: .875rem;\n      --valo-font-size-xs: .8125rem;\n\n      /* Line heights */\n      --valo-line-height: 1.625;\n      --valo-line-height-s: 1.375;\n      --valo-line-height-xs: 1.25;\n    }\n\n  </style>\n</custom-style>\n\n<dom-module id=\"valo-typography\">\n  <template>\n    <style>\n      body {\n        font-family: var(--valo-font-family);\n        font-size: var(--valo-font-size, var(--valo-font-size-m));\n        line-height: var(--valo-line-height);\n        -webkit-text-size-adjust: 100%;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        color: var(--valo-header-text-color);\n        font-weight: 600;\n        line-height: var(--valo-line-height-xs);\n      }\n\n      h1 {\n        font-size: var(--valo-font-size-xxxl);\n      }\n\n      h2 {\n        font-size: var(--valo-font-size-xxl);\n      }\n\n      h3 {\n        font-size: var(--valo-font-size-xl);\n      }\n\n      h4 {\n        font-size: var(--valo-font-size-l);\n      }\n\n      h5 {\n        font-size: var(--valo-font-size-m);\n      }\n\n      h6 {\n        font-size: var(--valo-font-size-s);\n      }\n\n      a {\n        text-decoration: none;\n      }\n\n      a:hover {\n        text-decoration: underline;\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = "<html><head><style>\n  @font-face {\n    font-family: 'valo-icons';\n    src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAo0AAsAAAAACegAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIGM2NtYXAAAAFoAAAAVAAAAFQXVtKQZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAABdAAAAXQ3J1VgWhlYWQAAAeUAAAANgAAADYOpgD+aGhlYQAAB8wAAAAkAAAAJAdtA89obXR4AAAH8AAAADgAAAA4LAAJPGxvY2EAAAgoAAAAHgAAAB4JvghibWF4cAAACEgAAAAgAAAAIAAkAHNuYW1lAAAIaAAAAaoAAAGqtwXeuHBvc3QAAAoUAAAAIAAAACAAAwAAAAMEAAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QkDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkJ//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAABABVAMADqwLAABQAOABEAFAAACUiLgI1ND4CMzIeAhUUDgIjJR4BFx4BMzI2Nz4BNz4BNy4BJy4BJy4BIyIGBw4BBw4BBx4BBSImNTQ2MzIWFRQGJzI2NTQmIyIGFRQWAgBIl3xQUHyXSEiXfFBQfJdI/qgPKRg9h0REhz0YKQ8FCQMDCQQQKRg9h0REhz0YKQ8FCQMDCQFdPldXPj5XVz4bJSUbGyUlwDdPWSEhWU83N09ZISFZTzfsESQRKzIyKxEkEQYKBAQKBhEkESsyMisRJBEGCgQECodXPj5XVz4+V1UlGxslJRsbJQAFAFUAfQOrAwgAIwBGAFEAWwBqAAAlNx4BMzI2Nz4BNz4BNy4BJy4BJy4BJzceARUUDgIjIiYnMScuATU0PgIzMhYXBy4BIyIGBw4BBw4BBx4BFx4BFx4BFwclNx4BFRQGIyImJycuATU0NjMyFhcJATYyFxYUBwEGIicmNDcBiz0OHA5Ehz0YKQ8FCQMDCQUPKRgIEAg0PlFQfJdIHDsepj9RUHyXSB07HjwOHQ9Ehz0YKQ8FCQMDCQUPKRgIEAk0AQGtAQFXPgcMB3kBAVc+Bw4G/qUCWwodCgoK/aQKHAoKCtI8AgMyKxEkEQYKBAQKBhEkEQULBTMnWSIhWU83CQlLKFkiIVlPNwoIPAIDMisRJBEGCgQECgYRJBEGCgYzEK0HDAc+VwEBeAYOBz5XAQH+WgJbCgoKHAr9pQoKChwKAAABARABBgMbAoYAEwAAASYiBwYUHwEWMjcBNjQnJiIHAScBRgsgCwwMiwsgCwFKCwsLIAv+0XABxwwMCyALiwwMAUoLIAsLC/7RcAAAAQE+AKkCbQLnABMAACUWBgcGJi8BJjQ3Ez4BFx4BDwEXAmcNAg4OJgzmDAzrDCYODgIM0MrpDiYMDQIO+g0jDQEADgIMDSYO4dwAAAEA4QEwAx8CXwATAAABBiYnJjY/ATYyFwUeAQcOAS8BBwEhDiUNDQIO+w0jDQEADgINDSUO4twBNg0CDg4mDOYMDOsMJg4OAgzQygABAQ4BMwLyAjIAEwAAASYGBwYWHwEWMj8BPgEnLgEPAScBRAwfCwsCDNMLHQvYDAILCx8MvroCLgoCCwwgC8EKCsYKIAwMAguvqwAAAQGTAKkCwgLnABMAAAEmNjc2Fh8BFhQHAw4BJy4BPwEnAZkNAg4OJgzmDAzrDCYODgIM0MoCpg4mDQwCDvoNIw3/AA4CDQwmDuLbAAEBNgD2AsoCigAfAAABBwYUFxYyPwEXFjI3NjQvATc2NCcmIg8BJyYiBwYUFwHHkQsLDCEMkZEMIQwLC5GRCwsMIQyRkQwhDAsLAcCRDCEMCwuRkQsLDCEMkZEMIQwLC5GRCwsMIQwAFQCrAGsDVQMVABgAHAAhACYAKgAvADQAOAA9AEIARgBKAE4AUgBWAFsAYABkAGgAbABwAAABITUzFTMyFh0BFAYjISImPQE0NjsBNTMVBzMVIzczFSM1OwEVIzUFMxUjNzMVIzU7ARUjNQUzFSM3MxUjNTsBFSM1EzMVIxUzFSMVMxUjNzMVIwUzFSM3MxUjNTsBFSM1OwEVIzczFSMRMxUjNTMVIwGAAQBVVhEZGRH9qhEZGRFWVatWVoBWVoBWVv8AVlaAVlaAVlb/AFZWgFZWgFZWgFZWVlZWVoBWVv4AVlaAVlaAVlaAVlaAVlZWVlZWAusqKhkSKxIYGRErEhkqKqtVVVVVVVWAVVVVVVVVgFVVVVVVVQEAVStVK1VVVStVVVVVVVVVVVUBVVXVVQAAAAABAOEBBgMfAjQAEwAAASYGBwYWHwEWMjclPgEnLgEPAScBIQ4lDQ0CDvsNIw0BAA4CDQ0lDuLcAi8NAg4OJg3lDAzrDCYODgINz8oAAQAAAAEAADItq8lfDzz1AAsEAAAAAADV7l52AAAAANXuXnYAAAAAA6sDFQAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAADqwABAAAAAAAAAAAAAAAAAAAADgQAAAAAAAAAAAAAAAAAAAAEAABVBAAAVQQAARAEAAE+BAAA4QQAAQ4EAAGTBAABNgQAAKsEAADhAAAAAAAKABQAHgCUATYBXAGCAagBzgH0AigCwgLoAAAAAQAAAA4AcQAVAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAoAAAABAAAAAAACAAcAewABAAAAAAADAAoAPwABAAAAAAAEAAoAkAABAAAAAAAFAAsAHgABAAAAAAAGAAoAXQABAAAAAAAKABoArgADAAEECQABABQACgADAAEECQACAA4AggADAAEECQADABQASQADAAEECQAEABQAmgADAAEECQAFABYAKQADAAEECQAGABQAZwADAAEECQAKADQAyHZhbG8taWNvbnMAdgBhAGwAbwAtAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMHZhbG8taWNvbnMAdgBhAGwAbwAtAGkAYwBvAG4Ac3ZhbG8taWNvbnMAdgBhAGwAbwAtAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcnZhbG8taWNvbnMAdgBhAGwAbwAtAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format('woff');\n    font-weight: normal;\n    font-style: normal;\n  }\n</style>\n</head><body></body></html>";

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"color.html\">\n<link rel=\"import\" href=\"sizing-and-spacing.html\">\n<link rel=\"import\" href=\"style.html\">\n<link rel=\"import\" href=\"typography.html\">\n\n</head><body><dom-module id=\"valo-button\" theme-for=\"vaadin-button\">\n  <template>\n    <style>\n      :host {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        color: var(--valo-primary-text-color);\n        font-family: var(--valo-font-family);\n        font-size: var(--valo-font-size, var(--valo-font-size-m));\n        font-weight: 500;\n        /* Custom property only needed for the dark theme */\n        background-color: var(---valo-button-background-color, var(--valo-tint-80pct));\n        min-width: calc(var(--valo-size, var(--valo-size-m)) * 2);\n        min-height: var(--valo-size, var(--valo-size-m));\n        border-radius: var(--valo-border-radius);\n        margin: var(--valo-space-xs);\n        -webkit-tap-highlight-color: transparent;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n        transition-property: background-color, color, box-shadow;\n        transition-duration: 0.3s;\n        will-change: transform;\n        position: relative;\n        box-shadow: 0 0 0 1px var(--valo-shade-5pct), 0 1px 2px 0 var(--valo-shade-20pct);\n        cursor: default;\n      }\n\n      [part=\"button\"] {\n        border: 0;\n        margin: 0;\n        padding: var(--valo-space-xs) calc(var(--valo-size, var(--valo-size-m)) / 3 + var(--valo-border-radius) / 2);\n        background-color: transparent;\n        color: inherit;\n        font: inherit;\n        line-height: normal;\n        text-transform: inherit;\n        outline: none;\n        min-height: inherit;\n        text-shadow: inherit;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        cursor: inherit;\n        /* TODO magic number, based on Valo icons size -1px to make it work nicely with Roboto and SF fonts */\n        line-height: calc(var(--valo-size, var(--valo-size-m)) - 13px);\n      }\n\n      [part=\"button\"]::-moz-focus-inner {\n        border: 0;\n      }\n\n      @media (hover: hover) {\n        :host(:hover:not([theme~=\"tertiary\"]):not([active])) {\n          box-shadow: 0 0 0 1px var(--valo-shade-5pct), 0 2px 6px 0 var(--valo-shade-20pct);\n        }\n      }\n\n      /* Activation effect */\n\n      :host::before,\n      :host::after {\n        content: \"\";\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        background-color: var(--valo-contrast-5pct);\n        border-radius: var(--valo-border-radius);\n        opacity: 0;\n        transition: opacity 0.2s;\n        will-change: opacity;\n        pointer-events: none;\n      }\n\n      :host::after {\n        background-color: currentColor;\n        transition: opacity 1.4s, transform 0.1s;\n        will-change: opacity, transform;\n        filter: blur(8px);\n      }\n\n      :host([active]) {\n        transition-duration: 0.05s;\n      }\n\n      :host([active]:not([theme~=\"primary\"]):not([theme~=\"tertiary\"])) {\n        box-shadow: 0 0 0 1px var(--valo-shade-5pct), 0 1px 1px 0 var(--valo-shade-10pct);\n      }\n\n      :host([active]:not([theme~=\"tertiary\"]))::before {\n        opacity: 1;\n        transition-duration: 0s;\n      }\n\n      :host([active])::after {\n        opacity: 0.1;\n        transition-duration: 0.05s, 0s;\n        transform: scale(0);\n      }\n\n      :host([active]:not([theme~=\"primary\"])) {\n        color: var(--valo-body-text-color);\n      }\n\n      /* Tertiary */\n\n      :host([theme~=\"tertiary\"]) {\n        background-color: transparent;\n        box-shadow: none;\n        cursor: pointer;\n      }\n\n      :host([theme~=\"tertiary\"]) [part=\"button\"] {\n        padding: 0 calc(var(--valo-size, var(--valo-size-m)) / 6 + var(--valo-border-radius) / 2);\n      }\n\n      /* Tertiary inline (no padding or margin) */\n\n      :host([theme~=\"inline\"]) {\n        margin: 0;\n        min-width: 0;\n        min-height: 0;\n      }\n\n      :host([theme~=\"inline\"]) [part=\"button\"] {\n        padding: 0;\n      }\n\n      /* Primary */\n\n      :host([theme~=\"primary\"]) {\n        background-color: var(--valo-primary-color);\n        color: var(--valo-primary-contrast-color);\n        box-shadow: 0 1px 2px 0 var(--valo-shade-40pct);\n        font-weight: 600;\n        min-width: calc(var(--valo-size, var(--valo-size-m)) * 2.5);\n      }\n\n      :host([theme~=\"primary\"][active])::after {\n        opacity: 0.15;\n      }\n\n      @media (hover: hover) {\n        :host([theme~=\"primary\"]:hover:not([active])) {\n          box-shadow: 0 2px 6px 0 var(--valo-shade-40pct);\n        }\n      }\n\n      /* X-Small */\n\n      :host([theme~=\"x-small\"]) {\n        --valo-font-size: var(--valo-font-size-xs);\n        --valo-size: var(--valo-size-xs);\n      }\n\n      /* Small */\n\n      :host([theme~=\"small\"]) {\n        --valo-font-size: var(--valo-font-size-s);\n        --valo-size: var(--valo-size-s);\n      }\n\n      /* Large */\n\n      :host([theme~=\"large\"]) {\n        --valo-font-size: var(--valo-font-size-l);\n        --valo-size: var(--valo-size-l);\n      }\n\n      /* Icon-only */\n\n      :host([theme~=\"icon\"]:not([theme~=\"inline\"])) {\n        min-width: var(--valo-size, var(--valo-size-m));\n      }\n\n      :host([theme~=\"icon\"]:not([theme~=\"inline\"])) [part=\"button\"] {\n        padding-left: var(--valo-space-s);\n        padding-right: var(--valo-space-s);\n      }\n\n      /* Icons used together with text (not super proud of these calc's) */\n\n      :host ::slotted(iron-icon:first-child:not(:last-child)) {\n        margin-left: calc(var(--valo-size, var(--valo-size-m)) / -6);\n        margin-right: calc(var(--valo-size, var(--valo-size-m)) / 9);\n      }\n\n      :host ::slotted(iron-icon:last-child:not(:first-child)) {\n        margin-left: calc(var(--valo-size, var(--valo-size-m)) / 9);\n        margin-right: calc(var(--valo-size, var(--valo-size-m)) / -6);\n      }\n\n      :host([theme~=\"inline\"]) ::slotted(iron-icon:first-child:not(:last-child)) {\n        margin-left: 0;\n      }\n\n      :host([theme~=\"inline\"]) ::slotted(iron-icon:last-child:not(:first-child)) {\n        margin-right: 0;\n      }\n\n      [part=\"button\"] ::slotted(iron-icon) {\n        display: inline-block;\n        width: 1.5em;\n        height: 1.5em;\n      }\n\n      /* Vaadin icons are based on a 16x16 grid (unlike Valo and Material icons with 24x24), so they look too big by default */\n      [part=\"button\"] ::slotted(iron-icon[icon^=\"vaadin:\"]) {\n        width: 1em;\n        height: 1em;\n        padding: 4px;\n      }\n\n      /* Color alternatives */\n\n      :host([theme~=\"success\"]) {\n        color: var(--valo-success-text-color);\n      }\n\n      :host([theme~=\"success\"][theme~=\"primary\"]) {\n        background-color: var(--valo-success-color);\n        color: var(--valo-success-contrast-color);\n      }\n\n      :host([theme~=\"danger\"]) {\n        color: var(--valo-error-text-color);\n      }\n\n      :host([theme~=\"danger\"][theme~=\"primary\"]) {\n        background-color: var(--valo-error-color);\n        color: var(--valo-error-contrast-color);\n      }\n\n      :host([theme~=\"contrast\"]) {\n        color: var(--valo-contrast);\n      }\n\n      :host([theme~=\"contrast\"][theme~=\"primary\"]) {\n        background-color: var(--valo-contrast);\n        color: var(--valo-base-color);\n      }\n\n      /* Disabled */\n\n      :host([disabled][disabled]) {\n        pointer-events: none;\n        color: var(--valo-disabled-text-color);\n        box-shadow: none;\n      }\n\n      :host([disabled]:not([theme~=\"tertiary\"])) {\n        background-color: var(--valo-contrast-20pct);\n      }\n\n      /* Keyboard focus */\n\n      :host([focus-ring]) {\n        box-shadow: 0 0 0 2px var(--valo-primary-color-50pct);\n      }\n\n      /* Hacks department (shame) */\n\n      /* Needed to cancel the 3D push effect in IE11 */\n      ::-ms-backdrop,\n      :host([active]) [part=\"button\"] {\n        transform: translate(-1px, -1px);\n      }\n\n      ::-ms-backdrop,\n      :host([active]) [part=\"button\"] ::slotted(*) {\n        transform: translate(1px, 1px);\n      }\n\n      /* Align the icon nicely with the text, without using flexbox on the parent element (in order to keep text truncation working) */\n      [part=\"button\"] ::slotted(iron-icon) {\n        vertical-align: -0.43em;\n      }\n\n      @-moz-document url-prefix() {\n        /* Firefox is being stupid and truncates (shows an ellipsis) the suffix icon because of the negative margin */\n        [part=\"button\"] ::slotted(iron-icon:last-child:not(:first-child)) {\n          margin-right: 0;\n        }\n\n        /* Firefox is being picky about the vertical alignment */\n        [part=\"button\"] ::slotted(iron-icon) {\n          vertical-align: -0.39em;\n        }\n      }\n\n      @supports (-ms-ime-align: auto) {\n        /* Edge is also being picky about the vertical alignment */\n        [part=\"button\"] ::slotted(iron-icon) {\n          vertical-align: -0.39em;\n        }\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"color.html\">\n<link rel=\"import\" href=\"sizing-and-spacing.html\">\n<link rel=\"import\" href=\"style.html\">\n<link rel=\"import\" href=\"typography.html\">\n\n</head><body><dom-module id=\"valo-checkbox\" theme-for=\"vaadin-checkbox\">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        -webkit-user-select: none;\n        color: var(--valo-body-text-color);\n      }\n\n      [part=\"wrapper\"] {\n        display: flex;\n        align-items: baseline;\n        -webkit-tap-highlight-color: transparent;\n        outline: none;\n      }\n\n      /* This makes the :active style work in IE11 */\n      [part=\"label\"] {\n        pointer-events: none;\n        transition: transform 0.3s;\n        will-change: transform;\n      }\n\n      /* Not sure if this is necessary: should there ever be anything clickable inside the label? */\n      [part=\"label\"] > * {\n        pointer-events: auto;\n      }\n\n      [part=\"label\"]:not(:empty) {\n        margin: 0.1875em 0.875em 0.1875em 0.375em;\n      }\n\n      [part=\"native-checkbox\"] {\n        opacity: 0;\n        position: absolute;\n      }\n\n      [part=\"checkbox\"] {\n        display: inline-block;\n        width: calc(1em + 2px);\n        height: calc(1em + 2px);\n        flex: none;\n        margin: 0.1875em;\n        position: relative;\n        border-radius: 4px;\n        background-color: var(--valo-contrast-20pct);\n        transition: transform 0.2s cubic-bezier(.12, .32, .54, 2), background-color 0.15s;\n        pointer-events: none;\n        will-change: transform;\n        line-height: 1.2;\n      }\n\n      /* IE11 only */\n      ::-ms-backdrop,\n      [part=\"checkbox\"] {\n        line-height: 1;\n      }\n\n      /* Used for activation \"halo\" */\n      [part=\"checkbox\"]::before {\n        /* Needed to align the checkbox nicely on the baseline */\n        content: \"\\2003\";\n        color: transparent;\n        display: inline-block;\n        width: 100%;\n        height: 100%;\n        border-radius: inherit;\n        background-color: inherit;\n        transform: scale(1.4);\n        opacity: 0;\n        transition: transform 0.1s, opacity 0.8s;\n        will-change: transform, opacity;\n      }\n\n      /* Used for the checkmark */\n      [part=\"checkbox\"]::after {\n        content: \"\";\n        display: inline-block;\n        width: 0;\n        height: 0;\n        border: 0 solid var(--valo-primary-contrast-color);\n        border-width: 0.1875em 0 0 0.1875em;\n        box-sizing: border-box;\n        transform-origin: 0 0;\n        position: absolute;\n        top: 0.8125em;\n        left: 0.5em;\n        transform: scale(0.55) rotate(-135deg);\n        opacity: 0;\n        transition: width 0.1s, height 0.4s;\n      }\n\n      :host([indeterminate]) [part=\"checkbox\"],\n      :host([checked]) [part=\"checkbox\"] {\n        background-color: var(--valo-primary-color);\n      }\n\n      :host([checked]) [part=\"checkbox\"]::after {\n        opacity: 1;\n        width: 0.625em;\n        height: 1.0625em;\n      }\n\n      :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part=\"checkbox\"] {\n        background-color: var(--valo-contrast-30pct);\n      }\n\n      :host([active]) [part=\"checkbox\"] {\n        transform: scale(0.9);\n        transition-duration: 0.05s;\n      }\n\n      :host([active][checked]) [part=\"checkbox\"] {\n        transform: scale(1.1);\n      }\n\n      :host([active]:not([checked])) [part=\"checkbox\"]::before {\n        transition-duration: 0.01s, 0.01s;\n        transform: scale(0);\n        opacity: 0.4;\n      }\n\n      :host([focus-ring]) [part=\"checkbox\"] {\n        box-shadow: 0 0 0 2px var(--valo-primary-color-50pct);\n      }\n\n      :host([indeterminate]) [part=\"checkbox\"]::after {\n        transform: none;\n        opacity: 1;\n        top: 45%;\n        height: 10%;\n        left: 22%;\n        right: 22%;\n        width: auto;\n        border: 0;\n        background-color: var(--valo-primary-contrast-color);\n        transition: opacity 0.4s;\n      }\n\n      :host([disabled]) {\n        pointer-events: none;\n        color: var(--valo-disabled-text-color);\n      }\n\n      :host([disabled]) ::slotted(*) {\n        color: inherit;\n      }\n\n      :host([disabled]) [part=\"checkbox\"] {\n        background-color: var(--valo-contrast-10pct);\n      }\n\n      :host([disabled]) [part=\"checkbox\"]::after {\n        border-color: var(--valo-contrast-30pct);\n      }\n\n      :host([indeterminate][disabled]) [part=\"checkbox\"]::after {\n        background-color: var(--valo-contrast-30pct);\n      }\n\n      /* Workaround for vaadin-checkbox issue: https://github.com/vaadin/vaadin-checkbox/issues/16 */\n      [part=\"native-checkbox\"]:checked ~ [part=\"checkbox\"] {\n        opacity: 1;\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"vaadin-text-field.html\">\n<link rel=\"import\" href=\"vaadin-overlay.html\">\n<link rel=\"import\" href=\"font-icons.html\">\n\n</head><body><dom-module id=\"valo-combo-box\" theme-for=\"vaadin-combo-box\">\n  <template>\n    <style>\n      :host([label]) {\n        margin-top: var(--valo-space-m);\n        vertical-align: var(---vaadin-text-field-vertical-align-offset);\n      }\n\n      [part=\"text-field\"] {\n        display: block;\n        max-width: 100%;\n      }\n\n      [part$=\"button\"] {\n        width: 24px;\n        height: 24px;\n        line-height: 24px;\n        font-size: 24px;\n        text-align: center;\n        color: var(--valo-contrast-40pct);\n        transition: 0.2s color;\n      }\n\n      [part$=\"button\"]:hover {\n        color: var(--valo-contrast-70pct);\n      }\n\n      [part$=\"button\"]::before {\n        font-family: \"valo-icons\";\n      }\n\n      [part=\"toggle-button\"]::before {\n        content: \"\\e905\";\n      }\n\n      [part=\"clear-button\"]::before {\n        content: \"\\e907\";\n      }\n\n      /* Read-only */\n\n      :host([readonly]) [part=\"toggle-button\"] {\n        display: none;\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"valo-combo-box-overlay\" theme-for=\"vaadin-combo-box-overlay\">\n  <template>\n    <style>\n      #scroller {\n        border-radius: var(--valo-border-radius);\n      }\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"valo-combo-box-item\" theme-for=\"vaadin-combo-box-item\">\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        min-height: var(--valo-size-m);\n        padding: var(--valo-space-xs) var(--valo-space-m) var(--valo-space-xs) calc(var(--valo-space-xs) * 2 + 24px);\n        box-sizing: border-box;\n        line-height: var(--valo-line-height-s);\n        border-radius: var(--valo-border-radius);\n        cursor: pointer;\n        white-space: nowrap;\n        position: relative;\n\n        /* TODO ugly hack to add horizontal spacing between the overlay and the item */\n        /* Should eventually be fixed so that using paddings for the combo box overlay is straightforward */\n        left: var(--valo-space-xs);\n        right: var(--valo-space-xs);\n        width: auto !important;\n      }\n\n      :host([focused]) {\n        background-color: var(--valo-primary-color-10pct);\n      }\n\n      @media (pointer: coarse) {\n        :host {\n          min-height: var(--valo-size-l);\n        }\n\n        :host([focused]) {\n          background-color: transparent;\n        }\n      }\n\n      :host([selected])::before {\n        position: absolute;\n        content: \"\\e902\";\n        font-family: valo-icons;\n        font-size: 24px;\n        width: 24px;\n        top: 50%;\n        transform: translateY(-50%);\n        left: var(--valo-space-xs);\n        color: var(--valo-secondary-text-color);\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"vaadin-overlay.html\">\n\n</head><body><dom-module id=\"valo-context-menu-overlay\" theme-for=\"vaadin-context-menu-overlay\">\n  <template>\n    <style>\n      /* TODO the default padding should be removed from the core styles */\n      :host([phone][phone]) {\n        padding: var(--valo-space-m);\n      }\n\n      /* On a phone, the animation is bottom-up */\n      :host([phone]) [part=\"overlay\"] {\n        animation: 0.15s vaadin-context-menu-overlay-enter ease-out;\n      }\n\n      @keyframes vaadin-context-menu-overlay-enter {\n        0% {\n          transform: translateY(150%);\n        }\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"vaadin-text-field.html\">\n<link rel=\"import\" href=\"vaadin-overlay.html\">\n<link rel=\"import\" href=\"vaadin-button.html\">\n<link rel=\"import\" href=\"font-icons.html\">\n\n</head><body><dom-module id=\"valo-date-picker\" theme-for=\"vaadin-date-picker\">\n  <template>\n    <style>\n      :host {\n        -webkit-tap-highlight-color: transparent;\n      }\n\n      :host([label]) {\n        margin-top: var(--valo-space-m);\n        vertical-align: var(---vaadin-text-field-vertical-align-offset);\n      }\n\n      [part=\"text-field\"] {\n        display: block;\n        max-width: 100%;\n      }\n\n      [part$=\"button\"] {\n        width: 24px;\n        height: 24px;\n        line-height: 24px;\n        font-size: 24px;\n        text-align: center;\n        color: var(--valo-contrast-40pct);\n        transition: 0.2s color;\n      }\n\n      [part$=\"button\"]:hover {\n        color: var(--valo-contrast-70pct);\n      }\n\n      [part$=\"button\"]::before {\n        font-family: \"valo-icons\";\n      }\n\n      [part=\"toggle-button\"] {\n        order: -1;\n      }\n\n      [part=\"toggle-button\"]::before {\n        content: \"\\e908\";\n      }\n\n      [part=\"clear-button\"]::before {\n        content: \"\\e907\";\n      }\n\n      /* Overlay width */\n\n      [part=\"overlay\"] {\n        width: calc(var(--valo-size-m) * 10);\n      }\n\n      :host([show-week-numbers]) [part=\"overlay\"]:not([fullscreen]) {\n        width: calc(var(--valo-size-m) * 11);\n      }\n\n      [part=\"overlay\"][fullscreen] {\n        width: 100vw;\n        height: 100vh;\n      }\n\n    </style>\n  </template>\n</dom-module>\n\n<dom-module id=\"valo-month-calendar\" theme-for=\"vaadin-month-calendar\">\n  <template>\n    <style>\n      :host {\n        -moz-user-select: none;\n        -ms-user-select: none;\n        -webkit-user-select: none;\n        user-select: none;\n        font-size: var(--valo-font-size-m);\n        color: var(--valo-body-text-color);\n        text-align: center;\n        /* Make the currently focused month be roughly in the center of the overlay */\n        /* TODO expose the overlay max-height as a custom property, so it can be used in calc's */\n        /* TODO this doesn’t work nicely with the infinite scroller buffers, as sometimes one buffer\n         * will overlap the other, and the user can’t click on a date to select it. Using smaller\n         * offset for now, and compensating it in the scroll item height */\n        /*transform: translateY(calc(var(--valo-size-m) * 2));*/\n        transform: translateY(var(--valo-size-s));\n      }\n\n      /* Disabled state */\n\n      :host([disabled]) {\n        color: var(--valo-disabled-text-color);\n        cursor: default;\n      }\n\n      /* Month header */\n\n      [part=\"month-header\"] {\n        color: var(--valo-header-text-color);\n        font-size: var(--valo-font-size-l);\n        line-height: 1;\n        font-weight: 500;\n        margin-bottom: var(--valo-space-m);\n      }\n\n      /* Week days and numbers */\n\n      [part=\"weekdays\"],\n      [part=\"weekday\"],\n      [part=\"week-numbers\"] {\n        font-size: var(--valo-font-size-xs);\n        line-height: 1;\n        color: var(--valo-tertiary-text-color);\n      }\n\n      [part=\"weekdays\"] {\n        margin-bottom: var(--valo-space-s);\n      }\n\n      [part=\"week-numbers\"] {\n        width: var(--valo-size-s);\n      }\n\n      /* Date and week number cells */\n\n      [part=\"date\"],\n      [part=\"week-number\"] {\n        box-sizing: border-box;\n        height: var(--valo-size-m);\n        line-height: var(--valo-size-m);\n        position: relative;\n      }\n\n      @media (pointer: coarse) {\n        [part=\"date\"],\n        [part=\"week-number\"] {\n          height: var(--valo-size-l);\n          line-height: var(--valo-size-l);\n        }\n      }\n\n      [part=\"date\"]:not(:empty):not([disabled]) {\n        cursor: pointer;\n      }\n\n      /* Today date */\n\n      [part=\"date\"][today] {\n        color: var(--valo-primary-text-color);\n      }\n\n      /* Focused date */\n\n      [part=\"date\"][focused] {\n        color: var(--valo-primary-contrast-color);\n      }\n\n      [part=\"date\"][focused]::before,\n      [part=\"date\"][selected]::before {\n        content: \"\";\n        position: absolute;\n        z-index: -1;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%) scale(0.85);\n        transition: 0.16s transform cubic-bezier(.12, .32, .54, 2);\n        will-change: transform;\n        min-width: 2em;\n        min-height: 2em;\n        width: 80%;\n        height: 80%;\n        max-height: 100%;\n        max-width: 100%;\n        background-color: var(--valo-primary-color);\n        border-radius: var(--valo-border-radius);\n      }\n\n      [part=\"date\"][selected]:not([focused])::before {\n        content: none;\n      }\n\n      :host([focused]) [part=\"date\"][focused]::before {\n        transform: translate(-50%, -50%);\n      }\n\n      @media (pointer: coarse) {\n        [part=\"date\"][focused]::before {\n          content: none;\n        }\n\n        [part=\"date\"][focused]:not([selected]) {\n          color: inherit;\n        }\n\n        [part=\"date\"][today]:not([selected]) {\n          color: var(--valo-primary-text-color);\n        }\n\n        [part=\"date\"][selected]::before {\n          content: \"\";\n        }\n      }\n    </style>\n  </template>\n</dom-module>\n<dom-module id=\"valo-date-picker-overlay\" theme-for=\"vaadin-date-picker-overlay\">\n  <template>\n    <style>\n      :host {\n        /* TODO should use vaadin-overlay styles eventually, now just copy pasted from there */\n        background-color: var(--valo-base-color);\n        border-radius: var(--valo-border-radius);\n        box-shadow: var(--valo-overlay-box-shadow);\n        box-sizing: border-box;\n        animation: 0.2s vaadin-overlay-enter;\n        font-family: var(--valo-font-family);\n        font-size: var(--valo-font-size-m);\n\n        max-height: calc(var(--valo-size-m) * 14);\n\n        /* Background for the year scroller, placed here as we are using a mask image on the actual years part */\n        background-image: linear-gradient(var(--valo-shade-5pct), var(--valo-shade-5pct));\n        background-size: 57px 100%;\n        background-position: top right;\n        background-repeat: no-repeat;\n      }\n\n      /* Month scroller */\n\n      [part=\"months\"] {\n        /* TODO this property should support calc or measure the height from the DOM */\n        /*--vaadin-infinite-scroller-item-height: calc(var(--valo-size-l) * 6 + var(--valo-font-size-l) + var(--valo-space-m) + var(--valo-font-size-xs) + var(--valo-space-s) + var(--valo-size-s));*/\n        --vaadin-infinite-scroller-item-height: 301px;\n        -webkit-mask-image: linear-gradient(transparent, #000 10%, #000 85%, transparent);\n        mask-image: linear-gradient(transparent, #000 10%, #000 85%, transparent);\n        bottom: calc(var(--valo-size-m) + var(--valo-space-m));\n        height: auto;\n      }\n\n      @media (pointer: coarse) {\n        :host {\n          max-height: calc(var(--valo-size-l) * 14);\n        }\n\n        [part=\"months\"] {\n          /*--vaadin-infinite-scroller-item-height: calc(var(--valo-size-m) * 6 + var(--valo-font-size-l) + var(--valo-space-m) + var(--valo-font-size-xs) + var(--valo-space-s) + var(--valo-size-s));*/\n          --vaadin-infinite-scroller-item-height: 349px;\n        }\n      }\n\n      [part=\"month\"][disabled] {\n        opacity: 0.3;\n      }\n\n      /* Year scroller */\n\n      [part=\"years\"] {\n        --vaadin-infinite-scroller-buffer-width: 97px;\n        width: 57px;\n        font-size: var(--valo-font-size-s);\n        cursor: pointer;\n        box-shadow: inset 2px 0 4px 0 var(--valo-shade-5pct);\n        -webkit-mask-image: linear-gradient(transparent, #000 35%, #000 65%, transparent);\n        mask-image: linear-gradient(transparent, #000 35%, #000 65%, transparent);\n      }\n\n      [part=\"year-number\"],\n      [part=\"year-separator\"]{\n        opacity: 0.5;\n        transition: 0.2s opacity;\n      }\n\n      [part=\"years\"]:hover [part=\"year-number\"],\n      [part=\"years\"]:hover [part=\"year-separator\"] {\n        opacity: 1;\n      }\n\n\n      /* TODO unsupported selector, should fix this in vaadin-date-picker that it adapts to the\n       * width of the year scroller */\n      #scrollers[desktop] [part=\"months\"] {\n        right: 57px;\n      }\n\n      /* Year scroller position indicator */\n      [part=\"years\"]::before {\n        border: none;\n        width: 1em;\n        height: 1em;\n        background-color: var(--valo-base-color);\n        transform: translate(-75%, -50%) rotate(45deg);\n        border-top-right-radius: calc(var(--valo-border-radius) / 2);\n        box-shadow: 2px -2px 6px 0 var(--valo-shade-5pct);\n        z-index: 1;\n      }\n\n      [part=\"year-number\"],\n      [part=\"year-separator\"] {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        height: 50%;\n        transform: translateY(-50%);\n      }\n\n      [part=\"years\"] [part=\"year-separator\"]::after {\n        color: var(--valo-disabled-text-color);\n        content: \"•\";\n      }\n\n      /* Current year */\n\n      [part=\"years\"] [part=\"year-number\"][current] {\n        color: var(--valo-primary-text-color);\n      }\n\n      /* Toolbar (footer) */\n\n      [part=\"toolbar\"] {\n        padding: var(--valo-space-wide-s);\n        box-shadow: 0 -1px 0 0 var(--valo-contrast-10pct);\n        background-color: var(--valo-base-color);\n        position: absolute;\n        right: 57px;\n        left: 0;\n        bottom: 0;\n        border-bottom-left-radius: var(--valo-border-radius);\n      }\n\n      @supports (mask-image: linear-gradient(#000, #000)) or (-webkit-mask-image: linear-gradient(#000, #000)) {\n        [part=\"toolbar\"] {\n          box-shadow: none;\n        }\n      }\n\n      /* Today and Cancel buttons */\n\n      /* TODO: Would be great if I could apply the \"tertiary\" theme from here instead of copying\n       * those styles */\n      /* TODO: It’s not possible to adjust the padding inside the buttons, so we have to use\n       * negative margins instead */\n      [part=\"toolbar\"] [part$=\"button\"] {\n        background-color: transparent;\n        margin: 0 calc(var(--valo-space-s) * -1);\n      }\n\n      [part=\"toolbar\"] [part$=\"button\"]:not([focused]) {\n        box-shadow: none;\n      }\n\n      [part=\"toolbar\"] [part$=\"button\"][active] {\n        color: var(--valo-body-text-color);\n      }\n\n      [part=\"toolbar\"] [part$=\"button\"][active]::before {\n        display: none;\n      }\n\n      /* Narrow viewport mode (fullscreen) */\n\n      :host([fullscreen]) {\n        max-height: none;\n        border-radius: 0;\n      }\n\n      [part=\"overlay-header\"] {\n        padding: var(--valo-space-s);\n        margin-right: 57px;\n      }\n\n      /* TODO why is there a forced padding-bottom in the core styles */\n      [part=\"overlay-header\"]:not([desktop]) {\n        padding: 0;\n      }\n\n      :host([fullscreen]) [part=\"toggle-button\"],\n      :host([fullscreen]) [part=\"clear-button\"],\n      [part=\"overlay-header\"] [part=\"label\"] {\n        display: none;\n      }\n\n      /* Very narrow screen (year scroller initially hidden) */\n\n      [part=\"years-toggle-button\"] {\n        top: 0;\n        right: 0;\n        bottom: auto;\n        padding: var(--valo-space-s);\n        color: var(--valo-primary-text-color);\n        text-align: right;\n        flex: 1;\n      }\n\n      [part=\"years-toggle-button\"]::after {\n        content: \"\";\n        position: absolute;\n        z-index: -1;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        background-color: var(--valo-base-color);\n        filter: blur(8px);\n      }\n\n      [part=\"years-toggle-button\"]::before {\n        content: none;\n      }\n\n      /* TODO magic number (same as used for iron-media-query in vaadin-date-picker-overlay) */\n      @media screen and (max-width: 374px) {\n        :host {\n          background-image: none;\n        }\n\n        [part=\"years\"] {\n          background-color: var(--valo-shade-5pct);\n        }\n\n        [part=\"overlay-header\"] {\n          margin-right: 0;\n        }\n\n        :host(:not([years-visible])) [part=\"toolbar\"] {\n          right: 0;\n        }\n\n        /* TODO make date-picker adapt to the width of the years part */\n        [part=\"years\"] {\n          --vaadin-infinite-scroller-buffer-width: 90px;\n          width: 50px;\n        }\n\n        :host([years-visible]) [part=\"months\"] {\n          padding-left: 50px;\n        }\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"vaadin-overlay.html\">\n\n<!-- TODO add vaadin-date-picker-overlay once it uses the generic vaadin-overlay element -->\n</head><body><dom-module id=\"valo-dialog\" theme-for=\"vaadin-dialog-overlay\">\n  <template>\n    <style include=\"valo-overlay\">\n      [part=\"overlay\"] {\n        box-shadow: var(--valo-raised-overlay-box-shadow);\n        animation: 0.2s vaadin-dialog-enter cubic-bezier(.215, .61, .355, 1);\n      }\n\n      [part=\"content\"] {\n        padding: var(--valo-space-m);\n      }\n\n      @keyframes vaadin-dialog-enter {\n        0% {\n          opacity: 0;\n          transform: scale(0.8) translatey(10px);\n        }\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"color.html\">\n<link rel=\"import\" href=\"sizing-and-spacing.html\">\n<link rel=\"import\" href=\"typography.html\">\n<link rel=\"import\" href=\"style.html\">\n\n\n</head><body><dom-module id=\"valo-form-item\" theme-for=\"vaadin-form-item\">\n  <template>\n    <style>\n      :host {\n        --vaadin-form-item-row-gap: 0;\n      }\n\n      /* font-weight, margin-bottom, transition and line-height same values as for part label in text-field */\n      [part=\"label\"] {\n        color: var(--valo-contrast-60pct);\n        font-family: var(--valo-font-family);\n        font-size: var(--valo-font-size-s);\n        font-weight: 500;\n        margin-top: var(--valo-space-m);\n        margin-left: calc(var(--valo-text-field-border-radius, var(--valo-border-radius)) / 4);\n        margin-bottom: var(--valo-space-xs);\n        transition: color 0.4s;\n        line-height: 1.333;\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"sizing-and-spacing.html\">\n\n</head><body><dom-module id=\"valo-form-layout\" theme-for=\"vaadin-form-layout\">\n  <template>\n    <style>\n      :host {\n        --vaadin-form-layout-column-gap: var(--valo-space-l);\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"vaadin-checkbox.html\">\n\n</head><body><dom-module id=\"valo-grid\" theme-for=\"vaadin-grid\">\n  <template>\n    <style>\n      :host {\n        background-color: var(--valo-base-color);\n        font-family: var(--valo-font-family);\n        font-size: var(--valo-font-size);\n        line-height: var(--valo-line-height);\n        color: var(--valo-body-text-color);\n        border: 1px solid var(--valo-contrast-10pct);\n      }\n\n      [part~=\"cell\"] {\n        min-height: var(--valo-size-l);\n        padding: var(--valo-space-xs) var(--valo-space-m);\n        align-items: center;\n      }\n\n      [part~=\"header-cell\"],\n      [part~=\"footer-cell\"] {\n        background-color: var(--valo-base-color);\n        color: var(--valo-secondary-text-color);\n      }\n\n      [part~=\"header-cell\"] ::slotted(*),\n      [part~=\"footer-cell\"] ::slotted(*) {\n        font-size: var(--valo-font-size-xs);\n      }\n\n      [part~=\"header-cell\"],\n      [part~=\"footer-cell\"] {\n        min-height: var(--valo-size-m);\n      }\n\n      [part=\"row\"]:only-child [part~=\"header-cell\"] {\n        min-height: var(--valo-size-xl);\n      }\n\n      /* Header and footer divider between body rows */\n\n      [part~=\"row\"]:last-child [part~=\"header-cell\"] {\n        border-bottom: 1px solid var(--valo-contrast-10pct);\n      }\n\n      [part~=\"row\"]:first-child [part~=\"footer-cell\"] {\n        border-top: 1px solid var(--valo-contrast-10pct);\n      }\n\n      /* Body rows/cells */\n\n      [part~=\"body-cell\"] {\n        background-color: var(--valo-base-color);\n      }\n\n      /* Selected row */\n\n      :host(:not([reordering])) [part~=\"row\"][selected] [part~=\"cell\"] {\n        background: linear-gradient(var(--valo-primary-color-10pct), var(--valo-primary-color-10pct)) var(--valo-base-color);\n      }\n\n      /* Column reordering */\n\n      :host([reordering]) [part~=\"cell\"] {\n        background: linear-gradient(var(--valo-shade-20pct), var(--valo-shade-20pct)) var(--valo-base-color);\n      }\n\n      :host([reordering]) [part~=\"cell\"][reorder-status=\"allowed\"] {\n        background: var(--valo-base-color);\n      }\n\n      :host([reordering]) [part~=\"cell\"][reorder-status=\"dragging\"] {\n        background: linear-gradient(var(--valo-contrast-5pct), var(--valo-contrast-5pct)) var(--valo-base-color);\n      }\n\n      /* Frozen columns */\n\n      [part~=\"cell\"][last-frozen] {\n        border-right: 1px solid var(--valo-contrast-10pct);\n      }\n\n      /* Column resizing */\n\n      :host(:not([theme~=\"column-dividers\"])) [part~=\"cell\"]:not([last-frozen]) [part=\"resize-handle\"] {\n        border-right: 1px solid var(--valo-contrast-10pct);\n        right: -1px;\n      }\n\n      /* Keyboard navigation */\n\n      [part~=\"cell\"]:focus {\n        outline: none;\n      }\n\n      :host([navigating]) [part~=\"cell\"]:focus {\n        box-shadow: inset 0 0 0 2px var(--valo-contrast-50pct);\n      }\n\n      /* Borderless */\n\n      :host([theme~=\"borderless\"]) {\n        border: none;\n      }\n\n      /* Row dividers */\n\n      :host([theme~=\"row-dividers\"]) [part~=\"body-cell\"] {\n        border-bottom: 1px solid var(--valo-contrast-10pct);\n      }\n\n      /* Column dividers */\n\n      :host([theme~=\"column-dividers\"]) [part~=\"cell\"]:not([last-column]) {\n        border-right: 1px solid var(--valo-contrast-10pct);\n      }\n\n      /* Row stripes */\n\n      :host([theme~=\"row-stripes\"]) [part~=\"row\"][odd] [part~=\"body-cell\"] {\n        background: linear-gradient(var(--valo-contrast-5pct), var(--valo-contrast-5pct)) var(--valo-base-color);\n        background-repeat: repeat-x;\n      }\n\n      :host([theme~=\"row-stripes\"]) [part~=\"row\"][odd][selected] [part~=\"body-cell\"] {\n        background: linear-gradient(var(--valo-primary-color-10pct), var(--valo-primary-color-10pct)), linear-gradient(var(--valo-contrast-5pct), var(--valo-contrast-5pct)) var(--valo-base-color);\n        background-repeat: repeat, repeat-x;\n      }\n\n      /* Override cell content styles (experimental) */\n\n      [part~=\"cell\"]:not([part~=\"details-cell\"]) ::slotted(vaadin-grid-cell-content) {\n        display: block;\n        text-overflow: ellipsis;\n        cursor: default;\n      }\n\n      /* Wrap cell contents */\n\n      :host([theme~=\"wrap-cell-content\"]) [part~=\"cell\"]:not([part~=\"details-cell\"]) ::slotted(vaadin-grid-cell-content) {\n        white-space: normal;\n      }\n    </style>\n  </template>\n</dom-module>\n\n\n<dom-module id=\"valo-grid-sorter\" theme-for=\"vaadin-grid-sorter\">\n  <template>\n    <style include=\"vaadin-grid-sorter-default-theme\">\n      :host {\n        justify-content: flex-start;\n        height: 100%;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n\n      [part=\"content\"] {\n        flex: none;\n      }\n\n      :host([direction]) {\n        color: var(--valo-primary-text-color);\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"color.html\">\n<link rel=\"import\" href=\"style.html\">\n\n</head><body><custom-style>\n  <style>\n    html {\n      --valo-overlay-box-shadow:\n          0 0 0 1px var(--valo-contrast-5pct),\n          0 1px 6px 0 var(--valo-shade-30pct),\n          0 8px 24px -6px var(--valo-shade-40pct);\n\n      --valo-raised-overlay-box-shadow:\n          0 0 0 1px var(--valo-contrast-5pct),\n          0 1px 6px 0 var(--valo-shade-30pct),\n          0 24px 56px -6px var(--valo-shade-40pct);\n    }\n\n    [theme~=\"dark\"] {\n      --valo-overlay-box-shadow:\n          0 0 0 1px var(--valo-contrast-10pct),\n          0 1px 6px 0 var(--valo-shade-60pct),\n          0 8px 24px -6px var(--valo-shade-80pct);\n\n      --valo-raised-overlay-box-shadow:\n          0 0 0 1px var(--valo-contrast-10pct),\n          0 1px 6px 0 var(--valo-shade-30pct),\n          0 24px 56px -6px var(--valo-shade-80pct);\n    }\n  </style>\n</custom-style>\n\n<!-- TODO add vaadin-date-picker-overlay once it uses the generic vaadin-overlay element -->\n<dom-module id=\"valo-overlay\" theme-for=\"vaadin-combo-box-overlay vaadin-context-menu-overlay\">\n  <template>\n    <style>\n      [part=\"overlay\"] {\n        background-color: var(--valo-base-color);\n        border-radius: var(--valo-border-radius);\n        box-shadow: var(--valo-overlay-box-shadow);\n        animation: 0.2s vaadin-overlay-enter;\n        font-family: var(--valo-font-family);\n        font-size: var(--valo-font-size-m);\n        will-change: transform;\n      }\n\n      @keyframes vaadin-overlay-enter {\n        0% {\n          opacity: 0;\n          transform: translateY(-4px);\n        }\n      }\n\n      [part=\"backdrop\"] {\n        background-color: var(--valo-shade-40pct);\n        animation: 0.2s vaadin-overlay-backdrop-enter;\n        will-change: opacity;\n      }\n\n      @keyframes vaadin-overlay-backdrop-enter {\n        0% {\n          opacity: 0;\n        }\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"vaadin-text-field.html\">\n<link rel=\"import\" href=\"font-icons.html\">\n\n</head><body><dom-module id=\"valo-password-field\" theme-for=\"vaadin-password-field\">\n  <template>\n    <style include=\"vaadin-password-field-default-theme\">\n      [part=\"reveal-button\"] {\n        font-family: \"valo-icons\";\n        font-size: 24px;\n        cursor: default;\n        color: var(--valo-contrast-40pct);\n        transition: 0.3s color;\n      }\n\n      [part=\"reveal-button\"]:hover {\n        color: var(--valo-contrast-80pct);\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = "<html><head><link rel=\"import\" href=\"color.html\">\n<link rel=\"import\" href=\"sizing-and-spacing.html\">\n<link rel=\"import\" href=\"style.html\">\n<link rel=\"import\" href=\"typography.html\">\n\n</head><body><custom-style>\n  <style>\n    html {\n      /* TODO Internal magic number, dependent on the font family, think if this could be computed somehow */\n      /* Used in combo-box and date-picker styles as well */\n      ---vaadin-text-field-vertical-align-offset: 34px;\n    }\n  </style>\n</custom-style>\n\n<dom-module id=\"valo-text-field\" theme-for=\"vaadin-text-field\">\n  <template>\n    <style>\n      :host {\n        color: var(--valo-body-text-color);\n        font-size: var(--valo-font-size, var(--valo-font-size-m));\n        font-family: var(--valo-font-family);\n        width: calc(var(--valo-size-m) * 5);\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n        -webkit-tap-highlight-color: transparent;\n      }\n\n      [part=\"label\"] {\n        color: var(--valo-contrast-60pct);\n        font-weight: 500;\n        font-size: var(--valo-font-size-s);\n        margin-left: calc(var(--valo-border-radius) / 4);\n        margin-bottom: var(--valo-space-xs);\n        transition: color 0.4s;\n        line-height: 1;\n      }\n\n      :host([label]) {\n        margin-top: var(--valo-space-m);\n        vertical-align: var(---vaadin-text-field-vertical-align-offset);\n      }\n\n      :host([focused]:not([readonly])) [part=\"label\"] {\n        color: var(--valo-primary-text-color);\n      }\n\n      /* Used for required and invalid indicators */\n      [part=\"label\"]::after {\n        content: var(--valo-required-field-indicator, \"•\");\n        transition: all 0.2s;\n        margin-left: 0.2em;\n        opacity: 0;\n        color: var(--valo-primary-text-color);\n      }\n\n      [part=\"value\"] {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        outline: none;\n        margin: 0;\n        border: 0;\n        border-radius: 0;\n        padding: 0 calc(var(--valo-size, var(--valo-size-m)) / 9);\n        width: 100%;\n        height: 100%;\n        font-family: inherit;\n        font-size: 1em;\n        font-weight: 500;\n        color: inherit;\n        background-color: transparent;\n        align-self: baseline;\n        text-align: var(--valo-text-field-text-align);\n\n        /* Disable default invalid style in Firefox */\n        box-shadow: none;\n      }\n\n      [part=\"value\"]::-webkit-input-placeholder {\n        color: var(--valo-tertiary-text-color);\n        transition: opacity 0.175s 0.05s;\n        opacity: 1;\n      }\n\n      [part=\"value\"]:-ms-input-placeholder {\n        color: var(--valo-tertiary-text-color);\n      }\n\n      [part=\"value\"]::-moz-placeholder {\n        color: var(--valo-tertiary-text-color);\n        transition: opacity 0.175s 0.05s;\n        opacity: 1;\n      }\n\n      [part=\"value\"]::placeholder {\n        color: var(--valo-tertiary-text-color);\n        transition: opacity 0.175s 0.1s;\n        opacity: 1;\n      }\n\n      [part=\"input-field\"] {\n        margin-top: var(--valo-space-xs);\n        margin-bottom: var(--valo-space-xs);\n        border-radius: var(--valo-border-radius);\n        background-color: var(--valo-contrast-5pct);\n        padding: 0 calc(var(--valo-size, var(--valo-size-m)) / 6 + var(--valo-border-radius) / 4);\n        transition: all 0.5s;\n        font-weight: 500;\n        position: relative;\n        will-change: transform;\n        height: var(--valo-size, var(--valo-size-m));\n      }\n\n      @media (hover: hover) {\n        :host(:hover:not([readonly]):not([invalid]):not([focused])) [part=\"label\"] {\n          color: var(--valo-body-text-color);\n        }\n        :host(:hover:not([readonly]):not([invalid]):not([focused])) [part=\"input-field\"] {\n          background-color: var(--valo-contrast-10pct);\n        }\n      }\n\n      :host([focused]:not([readonly])) [part=\"input-field\"] {\n        background-color: var(--valo-base-color);\n        box-shadow: 0 0 0 1px var(--valo-contrast-10pct), 0 1px 4px 1px var(--valo-shade-10pct);\n      }\n\n      :host([focus-ring]) [part=\"input-field\"] {\n        transition-duration: 0.2s;\n      }\n\n      /* Activation effect */\n\n      [part=\"input-field\"]::after {\n        content: \"\";\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        border-radius: inherit;\n        pointer-events: none;\n        background-color: var(--valo-base-color);\n        opacity: 0.5;\n        transform: scaleX(0);\n        transition: transform 0s, opacity 0s;\n        transform-origin: 0 0;\n        will-change: transform;\n      }\n\n      /* Trigger when not focusing using the keyboard */\n      :host([focused]:not([focus-ring]):not([readonly])) [part=\"input-field\"]::after {\n        opacity: 0;\n        transform: scaleX(1);\n        transition: transform 0.15s, opacity 1s;\n      }\n\n      /* Disabled style */\n\n      :host([disabled]) {\n        pointer-events: none;\n      }\n\n      :host([disabled]) [part=\"value\"] {\n        color: var(--valo-disabled-text-color);\n      }\n\n      :host([disabled]) [part=\"value\"]::-webkit-input-placeholder {\n        opacity: 0;\n      }\n\n      :host([disabled]) [part=\"value\"]:-ms-input-placeholder {\n        opacity: 0;\n      }\n\n      :host([disabled]) [part=\"value\"]::-moz-placeholder {\n        opacity: 0;\n      }\n\n      :host([disabled]) [part=\"value\"]::placeholder {\n        opacity: 0;\n      }\n\n      :host([disabled]) [part=\"input-field\"] {\n        background-color: var(--valo-contrast-10pct);\n      }\n\n      /* Required field style */\n\n      :host([required]:not([has-value])) [part=\"label\"]::after {\n        opacity: 1;\n      }\n\n      /* Invalid style */\n\n      :host([invalid]) [part=\"label\"] {\n        color: var(--valo-error-color);\n      }\n\n      :host([invalid]) [part=\"label\"]::after {\n        color: inherit;\n      }\n\n      :host([invalid]) [part=\"input-field\"] {\n        background-color: var(--valo-error-color-10pct);\n      }\n\n      /* Error message */\n\n      [part=\"error-message\"] {\n        margin-left: calc(var(--valo-border-radius) / 4);\n        font-size: var(--valo-font-size-xs);\n        line-height: var(--valo-line-height-xs);\n        color: var(--valo-secondary-text-color);\n        will-change: max-height;\n        transition: 0.4s max-height;\n        max-height: 5em;\n      }\n\n      /* Margin that doesn’t reserve space when there’s no error message*/\n      [part=\"error-message\"]::after {\n        content: \"\";\n        display: block;\n        height: var(--valo-space-s);\n      }\n\n      [part=\"error-message\"][hidden] {\n        display: block;\n        max-height: 0;\n        overflow: hidden;\n      }\n\n      /* Small theme */\n\n      :host([theme~=\"small\"]) {\n        --valo-font-size: var(--valo-font-size-s);\n        --valo-size: var(--valo-size-s);\n      }\n\n      :host([theme~=\"small\"][label]) {\n        ---vaadin-text-field-vertical-align-offset: 30px;\n      }\n\n      :host([theme~=\"small\"][label]) [part=\"label\"] {\n        font-size: var(--valo-font-size-xs);\n      }\n\n      /* Slotted buttons */\n\n      [part=\"input-field\"] ::slotted(vaadin-button) {\n        margin: 0;\n      }\n\n      /* Slotted valo icons */\n\n      [part=\"input-field\"] ::slotted(iron-icon[icon^=\"valo\"]) {\n        color: var(--valo-contrast-50pct);\n      }\n    </style>\n  </template>\n</dom-module>\n</body></html>";

/***/ })
/******/ ]);