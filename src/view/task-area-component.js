import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskAreaComponentTemplate() {
  return (
    `<section class="list"></section>`
  );
}

export default class TaskAreaComponent extends AbstractComponent {
  get template() {
    return createTaskAreaComponentTemplate();
  }
}
