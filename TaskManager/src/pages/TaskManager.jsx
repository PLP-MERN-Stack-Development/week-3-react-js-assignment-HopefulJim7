import { useState, useEffect } from 'react'

const FILTERS = {
  all: () => true,
  active: task => !task.done,
  completed: task => task.done,
}

export default function TaskManager() {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('agro_tasks')
    return stored ? JSON.parse(stored) : []
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('agro_tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAdd = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { text: taskText.trim(), done: false }])
      setTaskText('')
    }
  }

  const handleToggle = index => {
    const updated = [...tasks]
    updated[index].done = !updated[index].done
    setTasks(updated)
  }

  const handleDelete = index => {
    const updated = [...tasks]
    updated.splice(index, 1)
    setTasks(updated)
  }

  const filtered = tasks.filter(FILTERS[filter])

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">📋 Field Task Manager</h1>

      {/* Task Input */}
      <div className="flex gap-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="e.g. Weed the maize field"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 text-sm">
        {Object.keys(FILTERS).map(key => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded ${
              filter === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No tasks found for this filter.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b pb-1"
            >
              <span
                onClick={() => handleToggle(index)}
                className={`cursor-pointer flex-1 ${
                  task.done ? 'line-through text-gray-400' : ''
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}