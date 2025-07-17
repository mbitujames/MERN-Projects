import { useState, useEffect } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <Card className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={addTask} className="rounded-l-none">
          Add
        </Button>
      </div>
      
      <div className="flex space-x-2 mb-4">
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>
          All
        </Button>
        <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>
          Active
        </Button>
        <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>
          Completed
        </Button>
      </div>
      
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mr-2 h-4 w-4"
              />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.text}
              </span>
            </div>
            <Button variant="danger" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default TaskManager