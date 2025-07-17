import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import TaskManager from './pages/TaskManager'
import ApiData from './pages/ApiData'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/api" element={<ApiData />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App