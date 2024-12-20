import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-area-component.js';
import ButtonComponent from '../view/reset-button-component.js';
import PlaceholderComponent from '../view/placeholder-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent();
  #loadingViewComponent = new LoadingViewComponent();
  #boardContainer;
  #tasksModel;
  #isLoading = true;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#renderBoard();

    setTimeout(() => {
      this.#isLoading = false;
      this.#handleModelChange();
    }, 2000);
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #renderBoard() {
    if (this.#isLoading) {
      render(this.#loadingViewComponent, this.#tasksBoardComponent.element);
      return;
    }

    const sortedStatuses = ['backlog', 'in-process', 'done', 'basket'];

    sortedStatuses.forEach((status) => {
      const list = this.#tasksModel.tasks.find((group) => group.status === status);

      if (list) {
        const tasksListComponent = new TasksListComponent(
          list.title,
          list.status,
          this.#handleTaskDrop.bind(this)
        );
        render(tasksListComponent, this.#tasksBoardComponent.element);

        this.#renderTasksList(tasksListComponent, list.tasks);

        if (status === 'basket') {
          const clearButtonComponent = new ButtonComponent();
          tasksListComponent.element.appendChild(clearButtonComponent.element);

          if (list.tasks.length === 0) {
            clearButtonComponent.element.classList.add('button-disabled');
          } else {
            clearButtonComponent.element.classList.remove('button-disabled');
            clearButtonComponent.element.addEventListener('click', () => {
              this.#tasksModel.clearBasket();
              clearButtonComponent.element.disabled = true;
            });
          }
        }
      }
    });
  }

  #renderTasksList(tasksListComponent, tasks) {
    const tasksListElement = tasksListComponent.element.querySelector('.task-list');

    if (!tasks || tasks.length === 0) {
      const placeholderComponent = new PlaceholderComponent();
      render(placeholderComponent, tasksListElement);
    } else {
      tasks.forEach((task) => {
        this.#renderTask(task, tasksListElement);
      });
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }

  #handleTaskDrop(taskId, newStatus, newIndex) {
    try {
      this.#tasksModel.updateTaskStatus(taskId, newStatus, newIndex);
    } catch (error) {
      console.error('Ошибка в #handleTaskDrop:', error);
    }
  }
}
