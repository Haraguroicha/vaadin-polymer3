import * as PolymerGestures from '@polymer/polymer/lib/utils/gestures';

(function() {
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
    reset: function() {
      this.info.sourceEvent = null;
      this._cancelTimer();
      this.info.touchJob = null;
      this.info.touchStartCoords = null;
    },
    _cancelTimer: function() {
      if (this._timerId) {
        clearTimeout(this._timerId);
        delete this._fired;
      }
    },
    touchstart: function(e) {
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
    touchmove: function(e) {
      const moveThreshold = 15;
      const touchStartCoords = this.info.touchStartCoords;
      if (Math.abs(touchStartCoords.x - e.changedTouches[0].clientX) > moveThreshold ||
          Math.abs(touchStartCoords.y - e.changedTouches[0].clientY) > moveThreshold) {
        this._cancelTimer();
      }
    },
    touchend: function(e) {
      if (this._fired) {
        e.preventDefault();
      }
      this._cancelTimer();
    },
    contextmenu: function(e) {
      if (!e.shiftKey) {
        this.info.sourceEvent = e;
        this.fire(e.target, e.clientX, e.clientY);
        PolymerGestures.prevent('tap');
      }
    },
    fire: function(target, x, y) {
      PolymerGestures._fire(target, 'vaadin-contextmenu', {
        x: x,
        y: y,
        sourceEvent: this.info.sourceEvent
      });
    }
  });
})();
