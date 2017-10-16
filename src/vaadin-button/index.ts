import * as cheerio from 'cheerio';
import { importStyle } from '../utils';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import { GestureEventListeners as PolymerGestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import * as PolymerGestures from '@polymer/polymer/lib/utils/gestures';
import VaadinControlStateMixin from '../vaadin-control-state-mixin';
import VaadinThemableMixin from '../vaadin-themable-mixin';

import * as vaadinButton from 'vaadin-button/vaadin-button.html';

const domModule = cheerio.load(vaadinButton)('body');
importStyle(`<dom-module id="vaadin-button-default-theme" theme-for="vaadin-button">${domModule.find('dom-module[id="vaadin-button-default-theme"]').html()}</dom-module>`);
importStyle(`<dom-module id="vaadin-button"><template>${domModule.find('dom-module[id="vaadin-button"] template').html()}</template></dom-module>`);

@component(ButtonElement.is)
class ButtonElement extends VaadinControlStateMixin(VaadinThemableMixin(PolymerGestureEventListeners(PolymerElement))) {
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
}
