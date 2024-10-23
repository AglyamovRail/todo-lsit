import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  return (
    `<li class="task">${task.name}</li>` // Используем имя задачи (name), которое передаётся из модели
  );
}

export default class TaskComponent extends AbstractComponent {
  constructor(task) {
    super();
    this.task = task; // Передаём объект задачи в компонент
  }

  get template() {
    return createTaskComponentTemplate(this.task); // Используем объект задачи для рендеринга
  }
}
