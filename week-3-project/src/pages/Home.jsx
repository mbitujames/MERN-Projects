import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function Home() {
  return (
    <div className="text-center py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Task Manager</h1>
      <div className="space-x-4">
        <Link to="/tasks">
          <Button>Go to Task Manager</Button>
        </Link>
        <Link to="/api">
          <Button variant="secondary">View API Data</Button>
        </Link>
      </div>
    </div>
  )
}