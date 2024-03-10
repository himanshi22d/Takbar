import React from 'react';

const TaskCategoryPage = ({ categoryId, tasks }) => {
  const tasksInCategory = tasks[categoryId] || [];

  return (
    <div>
      <h1>Tasks in Category {categoryId}</h1>
      {/* Display tasks here */}
      <ul>
        {tasksInCategory.map(task => (
          <li key={task.id}>
            {task.name} - {task.title} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCategoryPage;
