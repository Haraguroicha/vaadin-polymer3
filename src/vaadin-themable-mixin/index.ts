import { DomModule } from '@polymer/polymer/lib/elements/dom-module';

const VaadinThemableMixin = superClass =>
class _VaadinThemableMixin extends superClass {
  static is:any;
  static _memoizedThemableMixinTemplate:any;

  static get template() {
    const modules = DomModule.prototype.modules;
    if (super.template && !this.hasOwnProperty('_memoizedThemableMixinTemplate')) {
      this._memoizedThemableMixinTemplate = super.template.cloneNode(true);
      let hasThemes = false;
      const defaultModuleName = this.is + '-default-theme';
      Object.keys(modules).forEach(moduleName => {
        if (moduleName !== defaultModuleName) {
          const themeFor = modules[moduleName].getAttribute('theme-for');
          if (themeFor) {
            themeFor.split(' ').forEach(themeForToken => {
              if (new RegExp('^' + themeForToken.split('*').join('.*') + '$').test(this.is)) {
                hasThemes = true;
                this._includeStyle(moduleName);
              }
            });
          }
        }
      });
      if (!hasThemes && modules[defaultModuleName]) {
        // No theme modules found, include the default module if it exists
        this._includeStyle(defaultModuleName);
      }
    }
    return this._memoizedThemableMixinTemplate;
  }
  /** @private */
  static _includeStyle(moduleName) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('include', moduleName);
    this._memoizedThemableMixinTemplate.content.appendChild(styleEl);
  }
}

export default VaadinThemableMixin;
