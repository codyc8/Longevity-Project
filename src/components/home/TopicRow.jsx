import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

/**
 * Alternating topic row with image and text
 * @param {boolean} reversed - Flip the layout (text left, image right)
 */
export default function TopicRow({
  title,
  description,
  icon,
  link,
  linkLabel = 'Learn more',
  reversed = false,
}) {
  return (
    <motion.div
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 lg:gap-16`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Icon/Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: reversed ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        <motion.div
          className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-[#E6CCB2] rounded-3xl flex items-center justify-center shadow-md"
          whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(127, 85, 57, 0.15)' }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-[#9C6644]">
            {icon}
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`w-full md:w-1/2 ${reversed ? 'md:text-right' : 'md:text-left'} text-center`}
        initial={{ opacity: 0, x: reversed ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-[#7F5539] mb-4">
          {title}
        </h3>
        <p className="text-[#9C6644] text-lg mb-6 leading-relaxed">
          {description}
        </p>
        <Link to={link}>
          <Button variant="ghost">
            {linkLabel}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
