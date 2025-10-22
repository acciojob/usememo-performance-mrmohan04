import React, { useState, useMemo } from "react";
import './../styles/App.css';

// Utility function to generate initial tasks
const generateTasks = () => {
  const tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      text: `Task ${i}`,
      completed: i <= 25 // First 25 tasks are completed
    });
  }
  return tasks;
};

// Utility function to filter tasks based on tab
const filterTasks = (tasks, tab) => {
  // Artificially slow down rendering to demonstrate useMemo benefit
  const startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Simulate slow computation - 500ms delay
  }

  if (tab === 'active') {
    return tasks.filter(task => !task.completed);
  } else if (tab === 'completed') {
    return tasks.filter(task => task.completed);
  }
  return tasks; // 'all' tab
};

const App = () => {
  const [tasks] = useState(generateTasks());
  const [currentTab, setCurrentTab] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Use useMemo to memoize filtered tasks and prevent unnecessary recalculations
  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, currentTab);
  }, [tasks, currentTab]);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      {/* Do not remove the main div */}
      <div className="app-container">
        <h1>Todo Application</h1>
        
        {/* Dark mode toggle */}
        <div className="dark-mode-toggle">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Filter buttons */}
        <div className="filter-buttons">
          <button 
            onClick={() => setCurrentTab('all')}
            className={currentTab === 'all' ? 'active' : ''}
          >
            All
          </button>
          <button 
            onClick={() => setCurrentTab('active')}
            className={currentTab === 'active' ? 'active' : ''}
          >
            Active
          </button>
          <button 
            onClick={() => setCurrentTab('completed')}
            className={currentTab === 'completed' ? 'active' : ''}
          >
            Completed
          </button>
        </div>

        {/* Task list */}
        <div className="task-list">
          <h2>
            {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} Tasks ({filteredTasks.length})
          </h2>
          <ul>
            {filteredTasks.map(task => (
              <li key={task.id} className={task.completed ? 'completed' : 'active'}>
                {task.text}
                <span className="status">
                  {task.completed ? '✓ Completed' : '○ Active'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
