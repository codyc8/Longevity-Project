import { motion } from 'framer-motion'

/**
 * Toggle switch for Simple/Research view modes
 * @param {boolean} enabled - Current state
 * @param {function} onChange - State change handler
 * @param {string} labelLeft - Left label text
 * @param {string} labelRight - Right label text
 */
export default function ToggleSwitch({
  enabled,
  onChange,
  labelLeft = 'Simple',
  labelRight = 'Research',
  className = '',
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          !enabled ? 'text-[#7F5539]' : 'text-[#9C6644]/60'
        }`}
      >
        {labelLeft}
      </span>

      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className="relative w-14 h-8 bg-[#DDB892] rounded-full p-1 cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08968] focus-visible:ring-offset-2"
      >
        <motion.div
          className="w-6 h-6 bg-[#9C6644] rounded-full shadow-md"
          animate={{
            x: enabled ? 24 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>

      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          enabled ? 'text-[#7F5539]' : 'text-[#9C6644]/60'
        }`}
      >
        {labelRight}
      </span>
    </div>
  )
}
