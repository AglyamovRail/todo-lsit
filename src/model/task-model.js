import { groupedTasksArray } from '../const.js';

export default class TasksModel {
  #boardtasks = groupedTasksArray; // Используем сгруппированные задачи
  #observers = [];

  get tasks() {
    return this.#boardtasks; // Возвращаем сгруппированные задачи
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs != observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }

  addTask(task) {
    // Добавляем новую задачу в список задач "Бэклог"
    const backlog = this.#boardtasks.find(group => group.status === 'backlog'); // Ищем группу "Бэклог"
    backlog.tasks.push({ name: task.title }); // Добавляем задачу в "Бэклог"
    this._notifyObservers(); // Уведомляем всех наблюдателей
  }

  clearBasket() {
    // Очищаем задачи в "Корзине"
    const basket = this.#boardtasks.find(group => group.status === 'basket');
    basket.tasks = []; // Очищаем задачи внутри "Корзины"
    this._notifyObservers(); // Уведомляем всех наблюдателей
  }
}
