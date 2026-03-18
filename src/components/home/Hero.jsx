import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TrianglesBackground from './TrianglesBackground'
import Button from '../ui/Button'

export default function Hero() {
  const scrollToFramework = () => {
    document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Triangles Background */}
      <TrianglesBackground />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#7F5539] mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Evidence-Based Longevity for Busy Minds.
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-[#9C6644] mb-2 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          Clear explanation and research you can verify<br />— without the overwhelm.
        </motion.p>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-[#9C6644] mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          Creation of Cody Chen
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <Link to="/sleep" className="w-full sm:w-64">
            <Button variant="primary" size="lg" className="w-full whitespace-nowrap">
              Explore Sleep
            </Button>
          </Link>
          <Button variant="secondary" size="lg" onClick={scrollToFramework} className="w-full sm:w-64 whitespace-nowrap">
            See the Framework
          </Button>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-[#B08968] rounded-full flex justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-[#9C6644] rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
