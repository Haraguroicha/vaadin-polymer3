const VaadinProgressMixin = superClass =>
class _VaadinProgressMixin extends superClass {
  max:Number;
  min:Number;
  value:Number;

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
      } finally {
        this.min = oldV;
      }
    }
  }
  _maxChanged(newV, oldV) {
    if (newV <= this.min) {
      try {
        throw new Error('min should be less then max');
      } finally {
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
    } else if (nV < 0) {
      nV = 0;
    }
    return nV;
  }
};

export default VaadinProgressMixin;
