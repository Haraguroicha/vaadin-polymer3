import * as cheerio from 'cheerio';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { mixinBehaviors as PolymerMixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { IronResizableBehavior as PolymerIronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior';
import * as PolymerRenderStatus from '@polymer/polymer/lib/utils/render-status';
import VaadinThemableMixin from '../vaadin-themable-mixin';

import * as vaadinFormLayout from 'vaadin-form-layout/vaadin-form-layout.html';

import './vaadin-form-item';

@component(FormLayoutElement.is)
class FormLayoutElement extends VaadinThemableMixin(PolymerMixinBehaviors(PolymerIronResizableBehavior, PolymerElement)) {
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
        value: function() {
          return [
            {minWidth: 0, columns: 1, labelsPosition: 'top'},
            {minWidth: '20em', columns: 1},
            {minWidth: '40em', columns: 2}
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
    if (typeof n === 'number' && n >= 1 && n < Infinity) return Math.floor(n);
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
    if (value === 'inherit' || value === 'normal') return false;
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
    } catch(e) {
      if (oldResponsiveSteps && oldResponsiveSteps !== responsiveSteps) {
        console.warn(`${e.message} Using previously set 'responsiveSteps' instead.`);
        this.responsiveSteps = oldResponsiveSteps;
      } else {
        console.warn(`${e.message} Using default 'responsiveSteps' instead.`);
        this.responsiveSteps = [
          {minWidth: 0, columns: 1, labelsPosition: 'top'},
          {minWidth: '20em', columns: 1},
          {minWidth: '40em', columns: 2}
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
      : getComputedStyle((this as any)).getPropertyValue('--vaadin-form-layout-column-gap');
    Array.from(this.children).forEach(child => {
      let colspan = this._naturalNumberOrOne(parseFloat((child as any).getAttribute('colspan')));
      // Never span further than the number of columns
      colspan = Math.min(colspan, this._columnCount);
      const childRatio = colspan / this._columnCount;
      // Note: using 99.999% for 100% fixes rounding errors in MS Edge,
      // otherwise the items might wrap, resizing is wobbly
      (child as any).style.width = `calc(${childRatio * 99.999}% - ${columnGap})`;
      if ((child as any).localName === 'vaadin-form-item') {
        if (this._labelsOnTop) {
          (child as any).setAttribute('label-position', 'top');
        } else {
          (child as any).removeAttribute('label-position');
        }
      }
    });
  }
}
