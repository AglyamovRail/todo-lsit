import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-area-component.js';
import ButtonComponent from '../view/reset-button-component.js';
import PlaceholderComponent from '../view/placeholder-component.js';
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent();
  #boardContainer;
  #tasksModel;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this)); // Подписка на изменения модели
  }

  init() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#renderBoard(); // Первая отрисовка доски
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard(); // Обновление доски при изменении модели
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = ''; // Очищаем доску перед обновлением
  }

  #renderBoard() {
    const sortedStatuses = ['backlog', 'in-process', 'done', 'basket']; // Убеждаемся, что "Корзина" последняя

    sortedStatuses.forEach((status) => {
      const list = this.#tasksModel.tasks.find(group => group.status === status);

      if (list) {
        const tasksListComponent = new TasksListComponent(list.title, list.status);
        render(tasksListComponent, this.#tasksBoardComponent.element);

        this.#renderTasksList(tasksListComponent, list.tasks); // Рендерим задачи для каждого статуса

        if (status === 'basket') {
          const clearButtonComponent = new ButtonComponent();
          tasksListComponent.element.appendChild(clearButtonComponent.element);

          clearButtonComponent.element.addEventListener('click', () => {
            this.#tasksModel.clearBasket(); // Очищаем только задачи в "Корзине"
            clearButtonComponent.element.disabled = true; // Отключаем кнопку после очистки
          });
        }
      }
    });
  }

  #renderTasksList(tasksListComponent, tasks) {
    const tasksListElement = tasksListComponent.element.querySelector('.task-list');

    if (tasks.length === 0) {
      const placeholderComponent = new PlaceholderComponent();
      render(placeholderComponent, tasksListElement);
    } else {
      tasks.forEach(task => {
        this.#renderTask(task, tasksListElement);
      });
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task); // Передаём задачу как объект
    render(taskComponent, container);
  }
}
