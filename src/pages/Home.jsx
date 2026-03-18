import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import TopicRow from '../components/home/TopicRow'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import codyPhoto from '../assets/cody.jpg'

// Topic icons as simple SVG components
const SleepIcon = () => (
  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3" />
    <path d="M35 45 C35 35, 50 30, 60 40 C70 50, 65 70, 50 70 C35 70, 30 55, 35 45" fill="currentColor" opacity="0.3" />
    <circle cx="40" cy="35" r="4" fill="currentColor" />
    <circle cx="55" cy="30" r="3" fill="currentColor" opacity="0.6" />
    <path d="M45 55 Q50 60, 55 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const NutritionIcon = () => (
  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="60" rx="30" ry="25" stroke="currentColor" strokeWidth="3" />
    <path d="M50 20 C55 25, 60 30, 55 40 C50 50, 45 50, 40 40 C35 30, 45 25, 50 20" fill="currentColor" opacity="0.3" />
    <line x1="50" y1="40" x2="50" y2="55" stroke="currentColor" strokeWidth="2" />
    <circle cx="40" cy="60" r="5" fill="currentColor" opacity="0.5" />
    <circle cx="55" cy="55" r="4" fill="currentColor" opacity="0.4" />
    <circle cx="60" cy="65" r="3" fill="currentColor" opacity="0.3" />
  </svg>
)

const ExerciseIcon = () => (
  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="25" r="10" stroke="currentColor" strokeWidth="3" />
    <path d="M50 35 L50 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 55 L35 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 55 L65 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 45 L50 40 L70 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="25" cy="45" r="5" fill="currentColor" opacity="0.3" />
    <circle cx="75" cy="45" r="5" fill="currentColor" opacity="0.3" />
  </svg>
)

const topics = [
  {
    title: 'Sleep',
    description: 'Your circadian rhythm anchors everything. Consistent sleep timing improves recovery, cognitive performance, and metabolic health. Small shifts compound into major gains.',
    icon: <SleepIcon />,
    link: '/sleep',
  },
  {
    title: 'Nutrition',
    description: 'Metabolic health starts with consistency, not perfection. Focus on protein and fiber basics, meal timing, and sustainable patterns that fit your life.',
    icon: <NutritionIcon />,
    link: '/nutrition',
  },
  {
    title: 'Exercise',
    description: 'Strength training and cardio work together. Build resilience, improve insulin sensitivity, and injury-proof your body for the long game.',
    icon: <ExerciseIcon />,
    link: '/exercise',
  },
]

const howToUse = [
  {
    title: 'Start with Summary',
    description: 'Get the key points in under a minute. Simple view shows only what matters.',
  },
  {
    title: 'Use Research View',
    description: 'When curious, dive deeper. Collapsible sections let you explore the evidence.',
  },
  {
    title: 'Apply One Actionable',
    description: 'Pick one change per week. Small wins compound. Consistency beats intensity.',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* About the Author */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="About the Author"
            subtitle="Get to know the person behind the site."
          />

          <motion.div
            className="flex flex-col md:flex-row items-center gap-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Photo */}
            <div className="flex-shrink-0">
              <img
                src={codyPhoto}
                alt="Cody Chen"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-center shadow-lg border-4 border-[#DDB892]"
              />
            </div>

            {/* Bio */}
            <Card variant="elevated" className="flex-1" hover={false}>
              <h3 className="text-xl font-bold text-[#7F5539] mb-1">Cody Chen</h3>
              <p className="text-sm text-[#B08968] mb-4">Born in Taiwan, Raised in LA, Now studying in Davis</p>
              <p className="text-[#7F5539] leading-relaxed">
                I'm a Computer Science and Engineering student at UC Davis — not a doctor, not a
                health expert. But I've always been curious about what actually keeps people healthy
                long-term, and I care a lot about the people around me. LiveLonger started as a
                class project and turned into something I genuinely use to improve my lifestyle.
                The goal is simple: take the best research out there and make it easy for anyone to act on.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-[#E6CCB2]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="How to Use This Site"
            subtitle="A simple approach to lasting change."
          />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {howToUse.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="default" className="h-full">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#9C6644] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#7F5539] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[#9C6644] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Section */}
      <section id="framework" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="The LiveLonger Framework"
            subtitle="Three pillars that compound over time."
          />

          <div className="space-y-20 md:space-y-28">
            {topics.map((topic, index) => (
              <TopicRow
                key={topic.title}
                title={topic.title}
                description={topic.description}
                icon={topic.icon}
                link={topic.link}
                reversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
