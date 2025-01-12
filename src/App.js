import { Header } from './components/header';
import { Tasks } from './components/tasks';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { AddTask } from './components/tasks/Task/addTask';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3001/tasks');
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  const addTask = async (task) => {
    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();
    setTasks([...tasks, data])
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();
    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)));
  };

  return (
    <div className="container">
      <Header
        title={'Task tracker'}
        onAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
      />
      {showAddTask ? <AddTask onAdd={addTask} /> : null}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No tasks to show!'
      )}
    </div>
  );
};

export default App;
