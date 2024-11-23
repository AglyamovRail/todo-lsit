import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(listname, status) {
<<<<<<< HEAD
  return (
    `<ul class="${status}-list">
      <h3 class="${status}">${listname}</h3>
=======
  const statusTranslation = {
    backlog: 'Бэклог',
    'in-process': 'В процессе',
    done: 'Готово',
    basket: 'Корзина'
  };

  return (
    `<ul class="${status}-list">
      <h3 class="${status}">${statusTranslation[status] || status}</h3>
>>>>>>> 12edd0b (added lab7)
      <ul class="task-list"></ul>
    </ul>`
  );
}

<<<<<<< HEAD
=======

>>>>>>> 12edd0b (added lab7)
export default class TaskListComponent extends AbstractComponent {
  constructor(listname, status, onTaskDrop) {
    super();
    this.listname = listname;
    this.status = status;
    this.onTaskDrop = onTaskDrop;
    this.#setDropHandler();
  }

  get template() {
    return createTaskListComponentTemplate(this.listname, this.status);
  }

  #setDropHandler() {
    const container = this.element.querySelector('.task-list');
<<<<<<< HEAD
    
    
    let targetIndex = null;

    
    container.addEventListener('dragover', (event) => {
      event.preventDefault();

=======
  
    let targetIndex = null;
  
    container.addEventListener('dragover', (event) => {
      event.preventDefault(); 
  
>>>>>>> 12edd0b (added lab7)
      const targetElement = event.target.closest('.task');
      if (targetElement) {
        const taskList = Array.from(container.children);
        targetIndex = taskList.indexOf(targetElement);
<<<<<<< HEAD
        
        
        taskList.forEach(task => task.classList.remove('drag-over'));
        targetElement.classList.add('drag-over');
      } else {
        
        targetIndex = 0;
      }
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      
      
      container.querySelectorAll('.task').forEach(task => task.classList.remove('drag-over'));

     
=======
  
        taskList.forEach(task => task.classList.remove('drag-over'));
        targetElement.classList.add('drag-over');
      } else {
        targetIndex = 0;
      }
    });
  
    container.addEventListener('drop', (event) => {
      event.preventDefault();
  
      const taskId = event.dataTransfer.getData('text/plain');
  
      container.querySelectorAll('.task').forEach(task => task.classList.remove('drag-over'));
  
>>>>>>> 12edd0b (added lab7)
      if (this.onTaskDrop && taskId && targetIndex !== null) {
        this.onTaskDrop(taskId, this.status, targetIndex);
      }
    });
  }
<<<<<<< HEAD
=======
  
  
>>>>>>> 12edd0b (added lab7)
}
