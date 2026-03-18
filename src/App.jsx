import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Sleep from './pages/Sleep'
import Nutrition from './pages/Nutrition'
import Exercise from './pages/Exercise'

// Wrapper component to handle route transitions
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/exercise" element={<Exercise />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#EDE0D4]">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  )
}

export default App
