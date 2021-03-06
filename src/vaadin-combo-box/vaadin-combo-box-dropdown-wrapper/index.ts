import * as cheerio from 'cheerio';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import '@polymer/polymer/lib/utils/debounce';
import '@polymer/iron-list/iron-list';
import '@polymer/iron-resizable-behavior/iron-resizable-behavior';
import '../vaadin-combo-box-item';
import '../vaadin-combo-box-dropdown';

import * as vaadinComboBoxDropdownWrapper from 'vaadin-combo-box/vaadin-combo-box-dropdown-wrapper.html';

@component(ComboBoxOverlayElement.is)
class ComboBoxOverlayElement extends PolymerElement {
  $:any;
  get:any;
  _selector;
  _items;
  _scroller;
  positionTarget;
  dispatchEvent;
  _itemLabelPath;
  _focusedIndex;
  _cachedViewportTotalPaddingBottom;

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
          } catch (e) {
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
      const evt = new CustomEvent('vaadin-overlay-touch-start', {detail: {sourceEvent: sourceEvent}});
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
    } else {
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
      getComputedStyle((this as PolymerElement)).getPropertyValue('--vaadin-combo-box-overlay-max-height')) || '65vh';
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
    } else {
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
    this.dispatchEvent(new CustomEvent('selection-changed', {detail: {item: e.model.item}}));
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
    } else if (index > this._selector.firstVisibleIndex) {
      // The item is already visible, scrolling is unnecessary per se. But we need to trigger iron-list to set
      // the correct scrollTop on the scrollTarget. Scrolling to firstVisibleIndex.
      targetIndex = this._selector.firstVisibleIndex;
    }
    this._selector.scrollToIndex(Math.max(0, targetIndex));
    // Sometimes the item is partly below the bottom edge, detect and adjust.
    const pidx = this._selector._getPhysicalIndex(index),
      physicalItem = this._selector._physicalItems[pidx];
    if (!physicalItem) {
      return;
    }
    const physicalItemRect = physicalItem.getBoundingClientRect(),
      scrollerRect = this._scroller.getBoundingClientRect(),
      scrollTopAdjust = physicalItemRect.bottom - scrollerRect.bottom + this._viewportTotalPaddingBottom;
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
      } else if (scrolledToBottom && e.deltaY > 0) {
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
}
