import React, { useEffect, useState } from 'react';
import TaskBar from '../components/TaskBar';

// import AddTaskForm from '../components/AddTaskForm';
// import '../src/index.css';
const Index = () => {
  const [taskCategories, setTaskCategories] = useState({
    inProgress: [],
    notStarted: [],
    completed: []
  });

  const addTask = (taskName, taskStatus) => {
    setTaskCategories((prev) => ({
      ...prev,
      [taskStatus]: [...prev[taskStatus], taskName]
    }));
  };

  useEffect(() => {
    countTasks();
  }, [taskCategories]);

  const countTasks = () => {
    const taskCounts = {
      inProgress: taskCategories.inProgress.length,
      notStarted: taskCategories.notStarted.length,
      completed: taskCategories.completed.length
    };
    document.getElementById('inProgressCount').textContent = taskCounts.inProgress;
    document.getElementById('notStartedCount').textContent = taskCounts.notStarted;
    document.getElementById('completedCount').textContent = taskCounts.completed;
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    const targetCategory = e.target.closest('.task-category');
    if (draggedTask && targetCategory) {
      targetCategory.appendChild(draggedTask);
    }
  };

  let draggedTask = null;

  const dragStart = (e) => {
    draggedTask = e.target;
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const dragEnd = (e) => {
    e.target.style.opacity = '1';
    draggedTask = null;
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <TaskBar />
      {/* <AddTaskForm addTask={addTask} /> */}
    </div>
  );
};

export default Index;
