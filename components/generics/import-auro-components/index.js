import '@alaskaairux/auro-button';
import '@alaskaairux/auro-checkbox';
import '@alaskaairux/auro-header';
import '@alaskaairux/auro-hyperlink';
import '@alaskaairux/auro-popover';
import '@alaskaairux/auro-carousel';
import '@alaskaairux/auro-pane';
import '@alaskaairux/auro-interruption/dist/auro-dialog';
import '@alaskaairux/auro-interruption/dist/auro-drawer';
import '@alaskaairux/auro-alerts';

import '../../flight-results/fs-matrix-flight-details-ascom-cart-adapter';

document.onload = function() {
  const dialog = document.querySelector('auro-dialog');
  if (!dialog) {
    const modal = document.createElement('auro-dialog');
    document.body.appendChild(modal);
  }
};
