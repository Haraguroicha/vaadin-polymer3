import * as cheerio from 'cheerio';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { component } from 'polymer3-decorators';
import '@polymer/iron-media-query/iron-media-query';
import * as vaadinDeviceDector from 'vaadin-context-menu/vaadin-device-detector.html';

@component(DeviceDetector.is)
class DeviceDetector extends PolymerElement {
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
    } catch (err) {
      return false;
    }
  }
  _phone(wide, touch) {
    return !wide && touch;
  }
}
