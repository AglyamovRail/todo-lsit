const API_URL = 'https://67220f092108960b9cc2b93c.mockapi.io/tasks';

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Не удалось получить задания');
  }
  return await response.json();
};

export function addTaskToServer(taskTitle, status) {
  
    return fetch('https://67220f092108960b9cc2b93c.mockapi.io/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: taskTitle,
        status: status,
      }),
    })
      .then(function(response) {
        if (!response.ok) {
          console.error('Ошибка при добавлении задачи, код ответа:', response.status);
          throw new Error('Не удалось создать новую задачу');
        }
        return response.json();
      })
      .then(function(addedTask) {
        return addedTask;
      })
      .catch(function(error) {
        console.error('Ошибка при добавлении задачи:', error);
        throw error;
      });
  }
  
  export const updateTaskStatusOnServer = async (taskId, newStatus) => {
    try {
      const taskData = await fetch(`https://67220f092108960b9cc2b93c.mockapi.io/tasks/${taskId}`);
      if (!taskData.ok) {
        throw new Error(`Задача с идентификатором ${taskId} не найдена`);
      }
      const task = await taskData.json();
      if (task.status === newStatus) {
        return; 
      }
      const updateResponse = await fetch(`https://67220f092108960b9cc2b93c.mockapi.io/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          status: newStatus,
        }),
      });
      if (!updateResponse.ok) {
        throw new Error('Не удалось обновить статус задачи');
      }
      return await updateResponse.json();
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
      throw error;
    }
  };
  
export const clearBasketOnServer = async () => {
    const tasks = await fetchTasks();
    const basketTasks = tasks.filter(task => task.status === 'basket');

    for (const task of basketTasks) {
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Не удалось очистить корзину');
      }
    }
  };
  
