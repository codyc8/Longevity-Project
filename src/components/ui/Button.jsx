import { motion } from 'framer-motion'

/**
 * Reusable Button component with variants
 * @param {string} variant - 'primary' | 'secondary' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center font-medium
    rounded-xl transition-all duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08968] focus-visible:ring-offset-2
  `

  const variants = {
    primary: 'bg-[#9C6644] text-white hover:bg-[#7F5539] shadow-md hover:shadow-lg',
    secondary: 'bg-[#E6CCB2] text-[#7F5539] hover:bg-[#DDB892] border border-[#B08968]/20',
    ghost: 'text-[#7F5539] hover:bg-[#E6CCB2] hover:text-[#9C6644]',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const MotionComponent = href ? motion.a : motion.button

  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}
