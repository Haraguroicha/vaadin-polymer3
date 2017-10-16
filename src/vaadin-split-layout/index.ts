import * as cheerio from 'cheerio';
import { importStyle } from '../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { FlattenedNodesObserver as PolymerFlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer';
import { mixinBehaviors as PolymerMixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { IronResizableBehavior as PolymerIronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { addListener as PolymerGesturesAddListener } from '@polymer/polymer/lib/utils/gestures';
import VaadinControlStateMixin from '../vaadin-control-state-mixin';
import VaadinThemableMixin from '../vaadin-themable-mixin';

import * as vaadinSplitLayout from 'vaadin-split-layout/vaadin-split-layout.html';

const domModule = cheerio.load(vaadinSplitLayout)('body');
importStyle(`<dom-module id="vaadin-split-layout-default-theme" theme-for="vaadin-split-layout">${domModule.find('dom-module[id="vaadin-split-layout-default-theme"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-split-layout"><template>${domModule.find('dom-module[id="vaadin-split-layout"] template').html()}</template></dom-module>`);

@component(SplitLayoutElement.is)
class SplitLayoutElement extends VaadinThemableMixin(PolymerMixinBehaviors(PolymerIronResizableBehavior, PolymerElement)) {
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
    new PolymerFlattenedNodesObserver(this, this._processChildren);
  }
  _processChildren() {
    this.getEffectiveChildren().forEach((child, i) => {
      if (i === 0) {
        this._primaryChild = child;
        child.setAttribute('slot', 'primary');
      } else if (i == 1) {
        this._secondaryChild = child;
        child.setAttribute('slot', 'secondary');
      } else {
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
  /**
   * Fired when the splitter is dragged. Non-bubbing. Fired for the splitter
   * element and any nested elements with `IronResizableBehavior`.
   *
   * @event iron-resize
   */
}
