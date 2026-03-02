import { motion } from 'framer-motion'

/**
 * Section header with title and optional subtitle
 * @param {string} title - Main heading
 * @param {string} subtitle - Optional subheading
 * @param {string} align - 'left' | 'center' | 'right'
 */
export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <motion.div
      className={`mb-12 ${alignments[align]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[#7F5539] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-[#9C6644] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
