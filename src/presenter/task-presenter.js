import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';

export default class TaskPresenter {
  #taskComponent = null;
  #taskContainer = null;
  #task = null;

  constructor({taskContainer}) {
    this.#taskContainer = taskContainer;
  }

  init(task) {
    this.#task = task;
    this.#taskComponent = new TaskComponent(task);

    render(this.#taskComponent, this.#taskContainer);
  }
}