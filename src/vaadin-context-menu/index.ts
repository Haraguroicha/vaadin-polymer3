import * as cheerio from 'cheerio';
import { importStyle } from '../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import * as PolymerGestures from '@polymer/polymer/lib/utils/gestures';
import * as PolymerAsync from '@polymer/polymer/lib/utils/async';
import { Templatize as PolymerTemplatize } from '@polymer/polymer/lib/utils/templatize';

import './vaadin-contextmenu-event';
import './vaadin-device-detector';
import './vaadin-context-menu-overlay';

import * as vaadinContextMenu from 'vaadin-context-menu/vaadin-context-menu.html';

const domModule = cheerio.load(vaadinContextMenu)('body');
importStyle(`<dom-module id="vaadin-context-menu-overlay-styles" theme-for="vaadin-context-menu-overlay">${domModule.find('dom-module[id="vaadin-context-menu-overlay-styles"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-context-menu"><template>${domModule.find('dom-module[id="vaadin-context-menu"] template').html()}</template></dom-module>`);

@component(ContextMenuElement.is)
class ContextMenuElement extends PolymerGestureEventListeners(PolymerElement) {
  $:any;
  selector:string;
  opened:Boolean;
  openOn:string;
  listenOn:any;
  closeOn:string;
  _context:any;
  _contentTemplate:any;
  _boundClose:any;
  _boundOpen:any;
  _templateClass:any;
  _oldListenOn:any;
  _oldOpenOn:any;
  _setOpened:any;
  _instance:any;

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
        value: function() {
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
  constructor() {
    super();
    this._boundOpen = this.open.bind(this);
    this._boundClose = this.close.bind(this);
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
    } else if (e.detail.value === false) {
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
    } else {
      this._listen(this.$.overlay, evtOverlay, this._preventDefault);
    }
  }
  _preventDefault(e) {
    e.preventDefault();
  }
  _openedChanged(opened) {
    if (opened && !this._instance) {
      this._contentTemplate = (this as PolymerElement).querySelector('template');
      const Templatizer = PolymerTemplatize.templatize(this._contentTemplate, this, {
        instanceProps: {
          detail: true,
          target: true
        },
        forwardHostProp: function(prop, value) {
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
      const targets = (this.listenOn as HTMLElement).querySelectorAll(this.selector);
      return Array.prototype.filter.call(targets, el => {
        return e.composedPath().indexOf(el) > -1;
      })[0];
    } else {
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
      } else if (event.detail.sourceEvent) {
        // Unwrap detailed event
        return this._getEventCoordinate(event.detail.sourceEvent, coord);
      }
    } else {
      // Native mouse or touch event
      const prop = 'client' + coord.toUpperCase();
      return event.changedTouches ? event.changedTouches[0][prop] : event[prop];
    }
  }
  _listen(node, evType, handler) {
    if (PolymerGestures.gestures[evType]) {
      PolymerGestures.addListener(node, evType, handler);
    } else {
      node.addEventListener(evType, handler);
    }
  }
  _unlisten(node, evType, handler) {
    if (PolymerGestures.gestures[evType]) {
      PolymerGestures.removeListener(node, evType, handler);
    } else {
      node.removeEventListener(evType, handler);
    }
  }
}
