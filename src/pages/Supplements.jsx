import { motion } from 'framer-motion'
import PageContainer from '../components/layout/PageContainer'
import Card from '../components/ui/Card'

export default function Supplements() {
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
            <rect x="6" y="4" width="12" height="16" rx="2" />
            <rect x="8" y="6" width="8" height="6" rx="1" />
            <circle cx="12" cy="16" r="2" />
            <path d="M12 14v-2" />
          </svg>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#7F5539] mb-4">
          Supplements
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
            This page will take an evidence-first approach to supplements.
            We'll focus on what actually has research support, while being clear about limitations.
          </p>

          <h3 className="font-medium text-[#7F5539] mb-3">Topics we'll cover:</h3>
          <ul className="space-y-2 text-[#9C6644]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#9C6644] rounded-full" />
              Vitamin D and common deficiencies
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#9C6644] rounded-full" />
              Omega-3s and when they matter
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#9C6644] rounded-full" />
              Creatine beyond the gym
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#9C6644] rounded-full" />
              What to skip (and why)
            </li>
          </ul>

          <div className="mt-6 p-4 bg-[#DDB892]/50 rounded-xl">
            <p className="text-sm text-[#7F5539]">
              <strong>Our approach:</strong> Optional, not magic. Food first, supplements to fill gaps.
              We'll show you the evidence and let you decide.
            </p>
          </div>
        </Card>
      </motion.div>
    </PageContainer>
  )
}
