import React, { useState, useEffect } from 'react';
import styles from '../styles/TaskCategory.module.css';
import TaskEditForm from './TaskEditForm';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const TaskCategory = ({ id, title, tasks: initialTasks, addTask, moveTask, count, editMode }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTasks, setEditingTasks] = useState([]);
  const [localEditMode, setLocalEditMode] = useState(editMode);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleEditClick = () => {
    setLocalEditMode(true);
    setEditingTasks([...tasks]); // Create a copy of tasks for editing
  };

  const handleCancelEdit = () => {
    setLocalEditMode(false);
    setEditingTasks([]); // Clear editing tasks
  };

  const handleSaveEdit = () => {
    setLocalEditMode(false);
    setTasks([...editingTasks]); // Update tasks with edited tasks
    setEditingTasks([]); // Clear editing tasks
  };

  const handleTaskChange = (taskId, field, value) => {
    const updatedTasks = editingTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, [field]: value };
      }
      return task;
    });
    setEditingTasks(updatedTasks);
  };

  const handleDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    const updatedTasks = Array.from(tasks);
    const [removed] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, removed);

    setTasks(updatedTasks);
  };

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className={styles.taskCategory}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>{title}</h3>
          
          <div id={`${id}Count`}>{count}</div>
          {!localEditMode ? (
            <div>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className={styles.task}>
                        <div>Name: {task.name}</div>
                        <div>Title: {task.title}</div>
                        <div>Description: {task.description}</div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {count > 0 && editMode && <button onClick={handleEditClick}>Edit Category</button>}
            </div>
          ) : (
            <div>
              <TaskEditForm tasks={editingTasks} id={id} onCancelEdit={handleCancelEdit} onSaveEdit={handleSaveEdit} onTaskChange={handleTaskChange} />
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskCategory;
