import { motion } from 'framer-motion'

/**
 * Page container with consistent padding and max-width
 * @param {boolean} fullWidth - Remove max-width constraint
 * @param {boolean} noPadding - Remove horizontal padding
 */
export default function PageContainer({
  children,
  fullWidth = false,
  noPadding = false,
  className = '',
}) {
  return (
    <motion.main
      className={`
        flex-1
        ${!noPadding ? 'px-4 sm:px-6 lg:px-8' : ''}
        ${!fullWidth ? 'max-w-7xl mx-auto w-full' : ''}
        ${className}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.main>
  )
}
