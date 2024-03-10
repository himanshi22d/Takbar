import React, { useState } from 'react';
const AddTaskForm = ({ addTask }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('notStarted');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTaskStatusChange = (e) => {
    setTaskStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || title.trim() === '' || description.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }
    addTask(name, title, description, taskStatus);
    setName('');
    setTitle('');
    setDescription('');
  };

  const handleReset = () => {
    setName('');
    setTitle('');
    setDescription('');
    setTaskStatus('notStarted');
  };

  return (
    <form onSubmit={handleSubmit} class="form-inline">
  <div class="form-group mr-2 mb-2">
    <input type="text" value={name} onChange={handleNameChange} placeholder="Enter Your Name" class="form-control" />
  </div>
  <div class="form-group mr-2 mb-2">
    <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter Task Title" class="form-control" />
  </div>
  <div class="form-group mr-2 mb-2">
    <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Enter Task Description" class="form-control" />
  </div>
  <select value={taskStatus} onChange={handleTaskStatusChange} class="form-control mr-2 mb-2">
    <option value="notStarted">Not Started</option>
    <option value="inProgress">In Progress</option>
    <option value="completed">Completed</option>
  </select>
  <button type="submit" class="btn btn-primary mb-2 mr-2">Add Task</button>
  <button type="button" onClick={handleReset} class="btn btn-primary  mb-2">Reset Fields</button>
</form>

  );
};

export default AddTaskForm;


