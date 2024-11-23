import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-area-component.js';
import ButtonComponent from '../view/reset-button-component.js';
import PlaceholderComponent from '../view/placeholder-component.js';
<<<<<<< HEAD
=======
import LoadingViewComponent from '../view/loading-view-component.js';
>>>>>>> 12edd0b (added lab7)
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent();
<<<<<<< HEAD
  #boardContainer;
  #tasksModel;
=======
  #loadingViewComponent = new LoadingViewComponent();
  #boardContainer;
  #tasksModel;
  #isLoading = true;
>>>>>>> 12edd0b (added lab7)

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#renderBoard();
<<<<<<< HEAD
=======

    setTimeout(() => {
      this.#isLoading = false;
      this.#handleModelChange();
    }, 2000);
>>>>>>> 12edd0b (added lab7)
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #renderBoard() {
<<<<<<< HEAD
    const sortedStatuses = ['backlog', 'in-process', 'done', 'basket'];
  
    sortedStatuses.forEach((status) => {
      const list = this.#tasksModel.tasks.find(group => group.status === status);
  
      if (list) {
        const tasksListComponent = new TasksListComponent(list.title, list.status, this.#handleTaskDrop.bind(this));
        render(tasksListComponent, this.#tasksBoardComponent.element);
  
        this.#renderTasksList(tasksListComponent, list.tasks);
  
        if (status === 'basket') {
          const clearButtonComponent = new ButtonComponent();
          tasksListComponent.element.appendChild(clearButtonComponent.element);
  
=======
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

>>>>>>> 12edd0b (added lab7)
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

<<<<<<< HEAD
    if (tasks.length === 0) {
      const placeholderComponent = new PlaceholderComponent();
      render(placeholderComponent, tasksListElement);
    } else {
      tasks.forEach(task => {
=======
    if (!tasks || tasks.length === 0) {
      const placeholderComponent = new PlaceholderComponent();
      render(placeholderComponent, tasksListElement);
    } else {
      tasks.forEach((task) => {
>>>>>>> 12edd0b (added lab7)
        this.#renderTask(task, tasksListElement);
      });
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }

  #handleTaskDrop(taskId, newStatus, newIndex) {
<<<<<<< HEAD
    this.#tasksModel.updateTaskStatus(taskId, newStatus, newIndex);
  }  
=======
    try {
      this.#tasksModel.updateTaskStatus(taskId, newStatus, newIndex);
    } catch (error) {
      console.error('Ошибка в #handleTaskDrop:', error);
    }
  }
>>>>>>> 12edd0b (added lab7)
}
