import { groupedTasksArray } from '../const.js';

export default class TasksModel {
  #boardtasks = groupedTasksArray;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }

  addTask(task) {
    const backlog = this.#boardtasks.find(group => group.status === 'backlog');
    backlog.tasks.push({ id: task.id, name: task.title });
    this._notifyObservers();
  }

  clearBasket() {
    const basket = this.#boardtasks.find(group => group.status === 'basket');
    basket.tasks = [];
    this._notifyObservers();
  }

  updateTaskStatus(taskId, newStatus, newIndex) {
    const taskGroup = this.#boardtasks.find(group => group.tasks.some(task => task.id === taskId));
    if (taskGroup) {
      const task = taskGroup.tasks.find(task => task.id === taskId);
      if (task) {
        // Удаляем задачу из текущего списка
        taskGroup.tasks = taskGroup.tasks.filter(t => t.id !== taskId);
  
        // Добавляем задачу в нужный список в нужное место
        const newGroup = this.#boardtasks.find(group => group.status === newStatus);
        if (newIndex >= 0 && newIndex < newGroup.tasks.length) {
          newGroup.tasks.splice(newIndex, 0, task); // Вставляем на нужный индекс
        } else {
          newGroup.tasks.push(task); // Если индекс некорректный, добавляем в конец
        }
  
        task.status = newStatus;
        this._notifyObservers();
      }
    }
  }
  
}
