import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const navClass =
    'px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors'

  const activeClass = ({ isActive }) =>
    isActive ? 'text-white bg-blue-600 font-semibold ' + navClass : navClass

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo or title */}
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          🌿 AgroAdvisor
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-4 items-center">
          <NavLink to="/" className={activeClass}>
            Home
          </NavLink>
          <NavLink to="/tasks" className={activeClass}>
            Tasks
          </NavLink>
          <NavLink to="/community" className={activeClass}>
            Community
          </NavLink>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-4 px-2 py-1 rounded border text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  )
}