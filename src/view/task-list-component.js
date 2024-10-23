import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(listname, status) {
  return (
    `<ul class="${status}-list">
      <h3 class="${status}">${listname}</h3>
      <ul class="task-list"></ul>
    </ul>`
  );
}

export default class TaskListComponent extends AbstractComponent {
  constructor(listname, status) {
    super();
    this.listname = listname;
    this.status = status;
  }

  get template() {
    return createTaskListComponentTemplate(this.listname, this.status);
  }
}
