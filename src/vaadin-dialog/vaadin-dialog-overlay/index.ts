import { OverlayElement as VaadinOverlayElement } from '../../vaadin-overlay';
import { component } from 'polymer3-decorators';

@component(VaadinDialogOverlay.is)
class VaadinDialogOverlay extends VaadinOverlayElement {
  static get is() {
    return 'vaadin-dialog-overlay';
  }
}
