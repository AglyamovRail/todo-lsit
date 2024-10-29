import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  return (
    `<li class="task" draggable="true">${task.name}</li>` // Добавляем draggable атрибут
  );
}

export default class TaskComponent extends AbstractComponent {
  constructor(task) {
    super();
    this.task = task;
    this.#afterCreateElement();
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }

  #afterCreateElement() {
    this.#makeTaskDraggable();
  }

  #makeTaskDraggable() {
    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.task.id);
    });
  }
}
