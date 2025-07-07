// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} AgroAdvisor. Built with 🌱 and ☀️ by PLP.
        </p>
        <div className="mt-2 space-x-4">
          <a
            href="https://agriculture.go.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Ministry of Agriculture
          </a>
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Weather by OpenWeatherMap
          </a>
        </div>
      </div>
    </footer>
  )
}