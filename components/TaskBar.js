import React, { useState, useEffect } from 'react';
import TaskCategory from './TaskCategory';
import AddTaskForm from './AddTaskForm';
import { DragDropContext } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const TaskBar = () => {
  const [tasks, setTasks] = useState({
    inProgress: [],
    notStarted: [],
    completed: []
  });

  const [categoryCounts, setCategoryCounts] = useState({
    inProgressCount: 0,
    notStartedCount: 0,
    completedCount: 0
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    const inProgressCount = tasks.inProgress.length;
    const notStartedCount = tasks.notStarted.length;
    const completedCount = tasks.completed.length;
    setCategoryCounts({
      inProgressCount,
      notStartedCount,
      completedCount
    });
  }, [tasks]);

  const addTask = (taskName, title, description, taskStatus) => {
    if (!tasks[taskStatus]) {
      tasks[taskStatus] = [];
    }
    const newTask = { id: tasks[taskStatus].length + 1, name: taskName, title: title, description: description, status: taskStatus };
    setTasks(prevTasks => ({
      ...prevTasks,
      [taskStatus]: [...prevTasks[taskStatus], newTask]
    }));
    setEditMode(true);
  };

  const moveTask = (taskId, sourceId, targetId) => {
    const taskToMove = tasks[sourceId].find(task => task.id.toString() === taskId);
    if (!taskToMove) return;

    setTasks(prevTasks => ({
      ...prevTasks,
      [sourceId]: prevTasks[sourceId].filter(task => task.id.toString() !== taskId),
      [targetId]: [...prevTasks[targetId], taskToMove]
    }));
  };

  const handleDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    const sourceId = source.droppableId;
    const targetId = destination.droppableId;
    const taskId = result.draggableId;

    moveTask(taskId, sourceId, targetId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-bar">
  <div className="row">
    <div className="col">
      <TaskCategory id="inProgress" title="In Progress" tasks={tasks.inProgress} addTask={addTask} moveTask={moveTask} count={categoryCounts.inProgressCount} editMode={editMode} />
    </div>
    <div className="col">
      <TaskCategory id="notStarted" title="Not Started" tasks={tasks.notStarted} addTask={addTask} moveTask={moveTask} count={categoryCounts.notStartedCount} editMode={editMode} />
    </div>
    <div className="col">
      <TaskCategory id="completed" title="Completed" tasks={tasks.completed} addTask={addTask} moveTask={moveTask} count={categoryCounts.completedCount} editMode={editMode} />
    </div>
  </div>
  <div className="row">
    <div className="col">
      <AddTaskForm addTask={addTask} />
    </div>
  </div>
</div>
    </DragDropContext>
  );
};

export default TaskBar;
