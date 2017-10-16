import * as cheerio from 'cheerio';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import VaadinProgressMixin from '../vaadin-progress-bar-mixin';
import * as vaadinProgressBar from 'vaadin-progress-bar/vaadin-progress-bar.html';

@component(ProgressBarElement.is)
class ProgressBarElement extends VaadinProgressMixin(PolymerElement) {
    static get template() {
        const domModule = cheerio.load(vaadinProgressBar)('template');
        const html = domModule.html();
        return html;
    }
    static get is() {
        return 'vaadin-progress-bar';
    }
}
