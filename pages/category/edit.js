// pages/category/[categoryId]/edit.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EditCategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  // State to hold tasks data
  const [tasks, setTasks] = useState([]);

  // Fetch tasks data when component mounts
  useEffect(() => {
    // Replace this with your actual data fetching method
    // Fetch tasks data based on categoryId
    const fetchData = async () => {
      try {
        // Example of fetching data from an API
        const response = await fetch(`/api/tasks?category=${categoryId}`);
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [categoryId]);

  // Function to handle task updates
  const handleTaskUpdate = (taskId, field, value) => {
    // Update the tasks state with the modified task
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, [field]: value };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to save changes
  const handleSaveChanges = async () => {
    try {
      // Example of saving changes to the server (replace with your actual implementation)
      const response = await fetch(`/api/tasks`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: categoryId, tasks }),
      });
      if (response.ok) {
        console.log('Changes saved successfully.');
      } else {
        console.error('Failed to save changes:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div>
      <h1>Edit Category: {categoryId}</h1>
      {/* Display tasks for editing */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="text"
              value={task.name}
              onChange={e => handleTaskUpdate(task.id, 'name', e.target.value)}
            />
            <input
              type="text"
              value={task.title}
              onChange={e => handleTaskUpdate(task.id, 'title', e.target.value)}
            />
            <input
              type="text"
              value={task.description}
              onChange={e => handleTaskUpdate(task.id, 'description', e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default EditCategoryPage;
