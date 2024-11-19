import { tasks } from './mock/task.js';

const groupedTasks = tasks.reduce((acc, task) => {
  const status = task.status;
  if (!acc[status]) {
    let title;
    switch (status) {
      case 'backlog':
        title = 'Бэклог';
        break;
      case 'in-process':
        title = 'В процессе';
        break;
      case 'done':
        title = 'Готово';
        break;
      case 'basket':
        title = 'Корзина';
        break;
      default:
        title = status.charAt(0).toUpperCase() + status.slice(1);
    }
    acc[status] = {
      title: title,
      status: status,
      tasks: [],
    };
  }
  
  acc[status].tasks.push({ id: task.id, name: task.title });
  return acc;
}, {});

export const groupedTasksArray = Object.values(groupedTasks);
