<<<<<<< HEAD
import { groupedTasksArray } from '../const.js';

export default class TasksModel {
  #boardtasks = groupedTasksArray;
  #observers = [];

=======
import { fetchTasks, addTaskToServer, updateTaskStatusOnServer, clearBasketOnServer } from '../api.js';

export default class TasksModel {
  #boardtasks = [];
  #observers = [];

  async init() {
    const tasksFromServer = await fetchTasks();
    this.#boardtasks = this.#groupTasks(tasksFromServer);
    this._notifyObservers();
  }
  
  #groupTasks(tasks) {
    const predefinedStatuses = ['backlog', 'in-process', 'done', 'basket'];
    const groupedTasks = tasks.reduce((acc, task) => {
      const status = task.status;
      if (!acc[status]) {
        acc[status] = this.#createTaskGroup(status);
      }
      acc[status].tasks.push({ id: task.id, name: task.title });
      return acc;
    }, {});
  
    predefinedStatuses.forEach((status) => {
      if (!groupedTasks[status]) {
        groupedTasks[status] = this.#createTaskGroup(status);
      }
    });
  
    return Object.values(groupedTasks);
  }
  
  #createTaskGroup(status) {
    const titles = {
      'backlog': 'Бэклог',
      'in-process': 'В процессе',
      'done': 'Готово',
      'basket': 'Корзина',
    };
  
    return {
      title: titles[status] || status.charAt(0).toUpperCase() + status.slice(1),
      status: status,
      tasks: [],
    };
  }
  
>>>>>>> 12edd0b (added lab7)
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
<<<<<<< HEAD

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
       
        taskGroup.tasks = taskGroup.tasks.filter(t => t.id !== taskId);
  
       
        const newGroup = this.#boardtasks.find(group => group.status === newStatus);
        if (newIndex >= 0 && newIndex < newGroup.tasks.length) {
          newGroup.tasks.splice(newIndex, 0, task); 
        } else {
          newGroup.tasks.push(task); 
        }
  
        task.status = newStatus;
        this._notifyObservers();
      }
    }
  }
  
}
=======
  

  async addTask(task) {
    const newTask = {
      title: task.title,
      status: 'backlog',
      id: task.id || Date.now().toString(),
    };
  
    try {
      const createdTask = await addTaskToServer(newTask.title, newTask.status);
      const tasksFromServer = await fetchTasks();

      this.#boardtasks = this.#groupTasks(tasksFromServer);
  
      this._notifyObservers();
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  }
  
  
  
  
  
  
  
  
  

  async clearBasket() {
    // Очистка корзины на сервере
    await clearBasketOnServer(); 
  
    // Локальная очистка корзины
    this.#boardtasks.forEach(group => {
      if (group.status === 'basket') {
        group.tasks = []; // Очищаем локальные задачи в корзине
      }
    });
  
    // Уведомление наблюдателей о том, что состояние изменилось
    this._notifyObservers();
  }
  
  
  

  async updateTaskStatus(taskId, newStatus, newIndex) {
    try {
      // Находим текущую задачу и её статус
      const taskGroup = this.#boardtasks.find(group => group.tasks.some(task => task.id === taskId));
      if (!taskGroup) {
        console.error('Задача не найдена');
        return;
      }
      const task = taskGroup.tasks.find(task => task.id === taskId);
      
     
  
      // Обновляем статус задачи на сервере
      const updatedTask = await updateTaskStatusOnServer(taskId, newStatus);
  
      // Проверяем, что задача действительно была обновлена
      if (!updatedTask) {
        
        return;
      }
  
      // Обновляем локальное состояние
      taskGroup.tasks = taskGroup.tasks.filter(t => t.id !== taskId); // Убираем старую задачу из текущей группы
  
      // Находим группу с новым статусом
      const newGroup = this.#boardtasks.find(group => group.status === newStatus);
      if (newIndex >= 0 && newIndex < newGroup.tasks.length) {
        newGroup.tasks.splice(newIndex, 0, task); // Вставляем задачу на новое место
      } else {
        newGroup.tasks.push(task); // Добавляем в конец
      }
  
      // Обновляем статус задачи
      task.status = newStatus;
  
      this._notifyObservers(); // Уведомляем наблюдателей об изменении
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
    }
  }
  
  

  
  
  
}
>>>>>>> 12edd0b (added lab7)
