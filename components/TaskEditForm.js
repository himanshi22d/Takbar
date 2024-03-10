import React from 'react';

const TaskEditForm = ({ tasks, id, onCancelEdit, onSaveEdit, onTaskChange }) => {
  // Function to handle changes in the form fields
  const handleTaskFieldChange = (taskId, field, event) => {
    const value = event.target.value;
    onTaskChange(taskId, field, value);
  };

  // Function to handle saving the edited tasks
  const handleSaveClick = () => {
    onSaveEdit();
  };

  return (
    <div>
      <h3>Edit Category {id}</h3>

      {/* Example form fields */}
      {tasks.map((task) => (
        <div key={task.id}>
          <input type="text" defaultValue={task.name} onChange={(event) => handleTaskFieldChange(task.id, 'name', event)} />
          <input type="text" defaultValue={task.title} onChange={(event) => handleTaskFieldChange(task.id, 'title', event)} />
          <input type="text" defaultValue={task.description} onChange={(event) => handleTaskFieldChange(task.id, 'description', event)} />
        </div>
      ))}
      <button onClick={onCancelEdit}>Cancel</button>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default TaskEditForm;
