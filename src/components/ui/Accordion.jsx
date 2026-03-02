import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Accordion component with smooth animations
 * @param {string} title - Accordion header
 * @param {boolean} defaultOpen - Initial open state
 */
export default function Accordion({
  title,
  children,
  defaultOpen = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`border-b border-[#DDB892] ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08968] focus-visible:ring-inset rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-[#7F5539] pr-4">
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <svg
            className="w-5 h-5 text-[#9C6644]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-[#7F5539]/80">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
