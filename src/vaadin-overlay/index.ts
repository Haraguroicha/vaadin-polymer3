import * as cheerio from 'cheerio';
import { importStyle } from '../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { FlattenedNodesObserver as PolymerFlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer';
import * as PolymerAsync from '@polymer/polymer/lib/utils/async';
import { Templatize as PolymerTemplatize } from '@polymer/polymer/lib/utils/templatize';
import * as PolymerSettings from '@polymer/polymer/lib/utils/settings';
import VaadinThemableMixin from '../vaadin-themable-mixin';

import * as vaadinOverlay from 'vaadin-overlay/vaadin-overlay.html';

const domModule = cheerio.load(vaadinOverlay)('body');
importStyle(`<dom-module id="vaadin-overlay-default-theme" theme-for="vaadin-overlay">${domModule.find('dom-module[id="vaadin-overlay-default-theme"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-overlay"><template>${domModule.find('dom-module[id="vaadin-overlay"] template').html()}</template></dom-module>`);

@component(OverlayElement.is)
class OverlayElement extends VaadinThemableMixin(PolymerElement) {
  getAttribute;

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
  constructor() {
    super();
    this._boundMouseDownListener = this._mouseDownListener.bind(this);
    this._boundMouseUpListener = this._mouseUpListener.bind(this);
    this._boundOutsideClickListener = this._outsideClickListener.bind(this);
    this._boundKeydownListener = this._keydownListener.bind(this);
    this._observer = new PolymerFlattenedNodesObserver(this, info => {
      this._setTemplateFromNodes(info.addedNodes);
    });
    // Listener for preventing closing of the paper-dialog and all components extending `iron-overlay-behavior`.
    this._boundIronOverlayCanceledListener = e => {
      e.preventDefault();
      window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
    };
  }
  ready() {
    super.ready();
    this._observer.flush();
    // Need to add dummy click listeners to this and the backdrop or else
    // the document click event listener (_outsideClickListener) may never
    // get invoked on iOS Safari (reproducible in <vaadin-dialog>
    // and <vaadin-context-menu>).
    this.addEventListener('click', () => {});
    this.$.backdrop.addEventListener('click', () => {});
  }
  _setTemplateFromNodes(nodes) {
    this.template = nodes.filter(node => node.localName && node.localName === 'template')[0] || this.template;
  }
  /**
   * @event vaadin-overlay-close
   * fired before the `vaadin-overlay` will be closed. If canceled the closing of the overlay is canceled as well.
   */
  close(sourceEvent) {
    var evt = new CustomEvent('vaadin-overlay-close', {bubbles: true, cancelable: true, detail: {sourceEvent: sourceEvent}});
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
    } else {
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
    const evt = new CustomEvent('vaadin-overlay-outside-click', {bubbles: true, cancelable: true, detail: {sourceEvent: event}});
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
      } else {
        this._setFocus(focusedElementIndex, -1);
      }
      event.preventDefault();
    // ESC
    } else if (event.keyCode === 27) {
      const evt = new CustomEvent('vaadin-overlay-escape-press', {bubbles: true, cancelable: true, detail: {sourceEvent: event}});
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
      document.body.appendChild((this as PolymerElement));
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
        const evt = new CustomEvent('vaadin-overlay-open', {bubbles: true});
        this.dispatchEvent(evt);
      });
    } else if (this._placeholder) {
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
    const Templatizer = PolymerTemplatize.templatize(template, this, {
      forwardHostProp: function(prop, value) {
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
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }
      // determine if element is visible
      const el = focusableElements[index];
      if (this._isVisible(el)) {
        this._focusedElement = el;
        return (el as HTMLElement).focus();
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
    const focusableElements = Array.from(this.$.content.querySelectorAll(
      '[tabindex], button, input, select, textarea, object, iframe, label, a[href], area[href]'
    )).filter((el:HTMLElement) => {
      return el.getAttribute('tabindex') !== '-1';
    });
    // sort focusable elements according to tabindex
    return focusableElements.sort((_a:HTMLElement, _b:HTMLElement) => {
      const a = parseInt(_a.getAttribute('tabindex') || '') || 0;
      const b = parseInt(_b.getAttribute('tabindex') || '') || 0;
      if (a === b) {
        return 0;
      } else if (a === 0) {
        return 1;
      } else if (b === 0) {
        return -1;
      } else if (a < b) {
        return -1;
      } else if (a > b) {
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
}

export { OverlayElement }
