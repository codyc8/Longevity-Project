import { motion } from 'framer-motion'
import PageContainer from '../components/layout/PageContainer'
import Card from '../components/ui/Card'

export default function Exercise() {
  return (
    <PageContainer className="py-20 md:py-32">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-8 bg-[#E6CCB2] rounded-2xl flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="w-10 h-10 text-[#9C6644]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="5" r="3" />
            <path d="M12 8v6M12 14l-4 6M12 14l4 6" strokeLinecap="round" />
            <path d="M6 11h4M14 11h4" strokeLinecap="round" />
          </svg>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#7F5539] mb-4">
          Exercise
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-block px-4 py-2 bg-[#DDB892] text-[#7F5539] rounded-full text-sm font-medium mb-8">
            Coming Soon
          </span>
        </motion.div>

        <Card variant="elevated" className="text-left">
          <h2 className="text-xl font-semibold text-[#7F5539] mb-4">
            What to expect
          </h2>
          <p className="text-[#9C6644] leading-relaxed mb-6">
            This page will provide evidence-based exercise protocols for longevity.
            We'll balance strength training and cardiovascular health with practical, sustainable routines.
          </p>

          <h3 className="font-medium text-[#7F5539] mb-3">Topics we'll cover:</h3>
          <ul className="space-y-2 text-[#9C6644]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#9C6644] rounded-full" />
              Strength training fundamentals
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#9C6644] rounded-full" />
              Zone 2 cardio and VO2 max
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#9C6644] rounded-full" />
              Injury prevention strategies
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#9C6644] rounded-full" />
              Insulin sensitivity and metabolic benefits
            </li>
          </ul>
        </Card>
      </motion.div>
    </PageContainer>
  )
}
