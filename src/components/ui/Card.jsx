import { motion } from 'framer-motion'

/**
 * Reusable Card component with hover effects
 * @param {string} variant - 'default' | 'elevated' | 'outlined'
 * @param {boolean} hover - Enable hover lift effect
 */
export default function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}) {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300'

  const variants = {
    default: 'bg-[#E6CCB2]',
    elevated: 'bg-[#E6CCB2] shadow-md',
    outlined: 'bg-transparent border-2 border-[#DDB892]',
    secondary: 'bg-[#DDB892]',
  }

  return (
    <motion.div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={hover ? {
        y: -4,
        boxShadow: '0 12px 40px rgba(127, 85, 57, 0.15)'
      } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
