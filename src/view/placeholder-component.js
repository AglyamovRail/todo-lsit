import { AbstractComponent } from '../framework/view/abstract-component.js';

function createPlaceHolderComponentTemplate() {
  return (
    `<p class="placeholder">Перетащите карточку</p>`
  );
}

export default class PlaceholderComponent extends AbstractComponent {
  get template() {
    return createPlaceHolderComponentTemplate();
  }
}
