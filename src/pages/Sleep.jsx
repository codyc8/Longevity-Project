import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageContainer from '../components/layout/PageContainer'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Accordion from '../components/ui/Accordion'
import ToggleSwitch from '../components/ui/ToggleSwitch'

// Quick summary points
const summaryPoints = [
  'Keep sleep/wake time consistent (even weekends)',
  'Get morning light within 30 minutes of waking',
  'Dim lights 60+ minutes before bed',
  'Keep room cool (65-68°F) and dark',
  'Caffeine cutoff 8+ hours before sleep',
]

// Why sleep matters cards
const whySleepMatters = [
  {
    title: 'Recovery & Repair',
    description: 'Deep sleep triggers growth hormone release and tissue repair.',
    impact: 'Physical performance, injury recovery, immune function',
  },
  {
    title: 'Metabolic Regulation',
    description: 'Sleep deprivation disrupts glucose metabolism and hunger hormones.',
    impact: 'Weight management, insulin sensitivity, energy levels',
  },
  {
    title: 'Cognitive Performance',
    description: 'Sleep consolidates memory and clears metabolic waste from the brain.',
    impact: 'Focus, decision-making, learning, emotional regulation',
  },
]

// Day timeline data
const dayTimeline = [
  {
    period: 'Morning',
    time: 'Before 10am',
    action: 'Get bright outdoor light',
    detail: 'Anchors your circadian clock. 20-30 minutes ideal.',
    color: 'bg-[#DDB892]',
  },
  {
    period: 'Midday',
    time: '10am - 3pm',
    action: 'Light exposure neutral',
    detail: 'Indoor/outdoor light fine. Main window for caffeine.',
    color: 'bg-[#E6CCB2]',
  },
  {
    period: 'Evening',
    time: 'After sunset',
    action: 'Dim lights progressively',
    detail: 'Overhead lights off. Use lamps, warm bulbs.',
    color: 'bg-[#9C6644]/30',
  },
]

// Sleep protocol steps
const protocolSteps = [
  {
    step: 'Set a consistent wake time',
    why: 'Your wake time anchors your entire circadian rhythm. The body adapts to predictable patterns.',
    dose: 'Same time daily, within 30 minutes, 7 days a week.',
  },
  {
    step: 'Get 20-30 minutes outdoor light in the morning',
    why: 'Morning light signals "daytime" to your brain and suppresses melatonin.',
    dose: 'Within 1 hour of waking. Cloudy days still count.',
  },
  {
    step: 'Caffeine cutoff window',
    why: 'Caffeine has a 6-8 hour half-life. Late caffeine fragments deep sleep.',
    dose: 'Stop caffeine 8+ hours before bed. Noon for 8pm bedtime.',
  },
  {
    step: 'Evening dim-light routine',
    why: 'Bright light suppresses melatonin. Dimming signals "nighttime" to your brain.',
    dose: '60 minutes before bed. Use warm, low-level lighting.',
  },
  {
    step: 'Bedroom setup: cool, dark, quiet',
    why: 'Core body temperature drops during sleep. Light disrupts melatonin.',
    dose: '65-68°F. Blackout curtains. White noise if needed.',
  },
  {
    step: "If you can't sleep: get out of bed",
    why: 'Staying in bed while awake weakens the bed-sleep association.',
    dose: 'Leave after 20 minutes. Do something boring. Return when sleepy.',
  },
]

// Common mistakes
const mistakes = [
  {
    mistake: 'Sleeping in to "catch up" on weekends',
    why: "Creates social jetlag. Your clock doesn't reset that easily.",
  },
  {
    mistake: 'Caffeine too late',
    why: 'Even if you fall asleep, caffeine fragments deep sleep stages.',
  },
  {
    mistake: 'Bright overhead lights at night',
    why: 'Ceiling lights are the worst. Use lamps at eye level or below.',
  },
  {
    mistake: 'Doomscrolling in bed',
    why: 'Phone in bed = brain associates bed with stimulation, not sleep.',
  },
  {
    mistake: 'Alcohol as a sleep aid',
    why: 'Alcohol fragments REM sleep. You sleep, but recover less.',
  },
  {
    mistake: 'Training too late',
    why: 'Exercise raises core temp. Allow 3+ hours before bed.',
  },
]

// Research accordions
const researchTopics = [
  {
    title: 'Sunlight Timing and Circadian Phase',
    findings: [
      'Morning light exposure advances circadian phase (earlier sleep)',
      'Evening light delays phase (later sleep)',
      'Midpoint of sleep is more reliable than sleep duration for tracking rhythm',
      'Outdoor light (even cloudy) far exceeds indoor light intensity',
    ],
    takeaway: 'Get bright light early, dim light late. Track your midpoint of sleep to see shifts.',
    citation: 'Roenneberg, T. et al. (2019). Chronobiology International.',
  },
  {
    title: 'Blue Light and Melatonin Suppression',
    findings: [
      'Blue wavelengths (460-480nm) most strongly suppress melatonin',
      'Evening screen use delays melatonin onset by 1-3 hours',
      'Effect is dose-dependent: brighter and longer exposure = more suppression',
      'Blue-blocking glasses reduce but do not eliminate the effect',
    ],
    takeaway: 'Dim screens and use warm lighting in the evening. Glasses help but dimming is better.',
    citation: 'Chang, A. M. et al. (2015). PNAS.',
  },
  {
    title: 'Sleep Regularity vs. Sleep Duration',
    findings: [
      'Irregular sleep patterns linked to worse metabolic outcomes',
      'Consistency matters as much as total hours',
      'Variable schedules disrupt circadian gene expression',
      'Weekend catch-up sleep provides limited recovery',
    ],
    takeaway: 'Prioritize consistent timing over occasional long sleeps.',
    citation: 'Phillips, A. J. et al. (2017). Scientific Reports.',
  },
  {
    title: 'Alcohol and Sleep Architecture',
    findings: [
      'Alcohol initially promotes sleep onset but fragments later cycles',
      'REM sleep significantly reduced with alcohol consumption',
      'Deep sleep may increase initially but decreases overall quality',
      'Effects persist even with moderate consumption',
    ],
    takeaway: 'Avoid alcohol within 3 hours of bed. Quality suffers even if you fall asleep fast.',
    citation: 'Ebrahim, I. O. et al. (2013). Alcoholism: Clinical and Experimental Research.',
  },
  {
    title: 'Temperature and Sleep Onset',
    findings: [
      'Core body temp naturally drops 1-2°F during sleep',
      'Cool environments facilitate this temperature drop',
      'Warm hands/feet (peripheral vasodilation) helps cool the core',
      'Ideal room temperature: 60-68°F (15-20°C)',
    ],
    takeaway: 'Keep your room cool. Warm shower before bed can help (counterintuitively).',
    citation: 'Okamoto-Mizuno, K. & Mizuno, K. (2012). Journal of Physiological Anthropology.',
  },
]

// References
const references = [
  'Roenneberg, T., Pilz, L. K., Zerbini, G., & Winnebeck, E. C. (2019). Chronotype and social jetlag: A (self-) critical review. Chronobiology International, 36(7), 921-936.',
  'Chang, A. M., Aeschbach, D., Duffy, J. F., & Czeisler, C. A. (2015). Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness. Proceedings of the National Academy of Sciences, 112(4), 1232-1237.',
  'Phillips, A. J., Clerx, W. M., O\'Brien, C. S., et al. (2017). Irregular sleep/wake patterns are associated with poorer academic performance and delayed circadian and sleep/wake timing. Scientific Reports, 7(1), 3216.',
  'Ebrahim, I. O., Shapiro, C. M., Williams, A. J., & Fenwick, P. B. (2013). Alcohol and sleep I: Effects on normal sleep. Alcoholism: Clinical and Experimental Research, 37(4), 539-549.',
  'Okamoto-Mizuno, K., & Mizuno, K. (2012). Effects of thermal environment on sleep and circadian rhythm. Journal of Physiological Anthropology, 31(1), 14.',
  'Walker, M. (2017). Why We Sleep: Unlocking the Power of Sleep and Dreams. Scribner.',
]

export default function Sleep() {
  const [researchView, setResearchView] = useState(false)

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  }

  return (
    <PageContainer className="py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-[#7F5539] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Sleep
        </motion.h1>
        <motion.p
          className="text-xl text-[#9C6644] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          High-leverage recovery that compounds.
        </motion.p>

        {/* View Toggle */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ToggleSwitch
            enabled={researchView}
            onChange={setResearchView}
            labelLeft="Simple View"
            labelRight="Research View"
          />
        </motion.div>
      </div>

      {/* Quick Summary - Always visible */}
      <motion.section className="mb-16" {...fadeIn}>
        <Card variant="elevated" className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-[#7F5539] mb-4">Quick Summary</h2>
          <ul className="space-y-3">
            {summaryPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 bg-[#9C6644] rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[#7F5539]">{point}</span>
              </li>
            ))}
          </ul>

          {/* Key Metric */}
          <div className="mt-6 p-4 bg-[#DDB892] rounded-xl">
            <h3 className="font-semibold text-[#7F5539] mb-2">Key Metric: Midpoint of Sleep</h3>
            <p className="text-sm text-[#9C6644]">
              Because sleep duration varies, midpoint is a clean signal of your sleep timing.
              Calculate: (bedtime + wake time) / 2. Track shifts over time.
            </p>
          </div>
        </Card>
      </motion.section>

      {/* Why Sleep Matters - Research view only */}
      <AnimatePresence mode="wait">
        {researchView && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader
              title="Why Sleep Impacts Longevity"
              subtitle="Three systems that depend on quality sleep."
            />
            <div className="grid md:grid-cols-3 gap-6">
              {whySleepMatters.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="default" className="h-full">
                    <h3 className="font-semibold text-[#7F5539] mb-2">{item.title}</h3>
                    <p className="text-[#9C6644] text-sm mb-3">{item.description}</p>
                    <p className="text-xs text-[#B08968]">
                      <span className="font-medium">Impact:</span> {item.impact}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Circadian Rhythm - Research view only */}
      <AnimatePresence mode="wait">
        {researchView && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader
              title="Circadian Rhythm & Light Exposure"
              subtitle="Light is a lever. Use it intentionally."
            />

            {/* Day Timeline */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                {dayTimeline.map((item, index) => (
                  <motion.div
                    key={item.period}
                    className="flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="default" className={`h-full ${item.color}`}>
                      <div className="text-sm text-[#9C6644] mb-1">{item.time}</div>
                      <h4 className="font-semibold text-[#7F5539] mb-2">{item.period}</h4>
                      <p className="text-[#7F5539] font-medium text-sm mb-2">{item.action}</p>
                      <p className="text-xs text-[#9C6644]">{item.detail}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card variant="outlined" className="text-center">
                <p className="text-[#7F5539]">
                  <strong>Remember:</strong> Morning light shifts your rhythm earlier.
                  Evening light shifts it later. Your midpoint of sleep reveals the trend.
                </p>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Deep Sleep - Research view only */}
      <AnimatePresence mode="wait">
        {researchView && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader
              title="Deep Sleep & Repair"
              subtitle="Your nightly recovery window."
            />

            <div className="max-w-3xl mx-auto">
              <Card variant="elevated">
                <p className="text-[#7F5539] mb-6">
                  Deep sleep (slow-wave sleep) is when your body does most of its physical repair.
                  Growth hormone peaks during deep sleep. Memory consolidation happens here.
                  Protect this window.
                </p>

                <h4 className="font-semibold text-[#7F5539] mb-4">Protect Deep Sleep:</h4>
                <ul className="space-y-3">
                  {[
                    'Avoid alcohol close to bed (fragments sleep architecture)',
                    'Avoid heavy meals late (digestion competes with recovery)',
                    'Wind-down routine (signal to your brain that sleep is coming)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 bg-[#9C6644] rounded-full mt-2" />
                      <span className="text-[#9C6644]">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Sleep Protocol - Always visible */}
      <motion.section className="mb-16" {...fadeIn}>
        <SectionHeader
          title="The Sleep Protocol (90-Day Friendly)"
          subtitle="A step-by-step playbook for better sleep."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {protocolSteps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card variant="default" hover={true}>
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#9C6644] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#7F5539] mb-2">{item.step}</h4>
                    <p className="text-sm text-[#9C6644] mb-2">
                      <span className="font-medium">Why it works:</span> {item.why}
                    </p>
                    <p className="text-sm text-[#B08968]">
                      <span className="font-medium">Minimum effective dose:</span> {item.dose}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tonight's Checklist */}
        <motion.div
          className="max-w-xl mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="secondary" className="border-2 border-[#9C6644]/30">
            <h4 className="font-semibold text-[#7F5539] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Tonight's Checklist
            </h4>
            <div className="space-y-2 font-mono text-sm text-[#7F5539]">
              <p>[ ] Set wake alarm for: _____</p>
              <p>[ ] Caffeine cutoff by: _____</p>
              <p>[ ] Dim lights at: _____</p>
              <p>[ ] Phone away at: _____</p>
              <p>[ ] Room temp: 65-68°F</p>
            </div>
            <p className="text-xs text-[#9C6644] mt-4">Copy this to your notes. Fill in your times.</p>
          </Card>
        </motion.div>
      </motion.section>

      {/* Common Mistakes - Always visible */}
      <motion.section className="mb-16" {...fadeIn}>
        <SectionHeader
          title="Common Mistakes"
          subtitle="What to avoid for better sleep."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {mistakes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card variant="outlined" className="h-full border-red-200/50">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-[#7F5539] mb-1">{item.mistake}</h4>
                    <p className="text-sm text-[#9C6644]">{item.why}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Research Section - Research view only */}
      <AnimatePresence mode="wait">
        {researchView && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader
              title="Research (Optional Deep Dive)"
              subtitle="Open what you need. Skip what you don't."
            />

            <div className="max-w-3xl mx-auto">
              <Card variant="default">
                {researchTopics.map((topic, index) => (
                  <Accordion key={index} title={topic.title}>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-[#7F5539] mb-2">Key Findings:</h5>
                        <ul className="space-y-1">
                          {topic.findings.map((finding, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="text-[#9C6644]">•</span>
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-[#DDB892]/50 rounded-lg">
                        <p className="text-sm">
                          <span className="font-medium text-[#7F5539]">Practical takeaway:</span>{' '}
                          <span className="text-[#9C6644]">{topic.takeaway}</span>
                        </p>
                      </div>

                      <p className="text-xs text-[#B08968] italic">{topic.citation}</p>
                    </div>
                  </Accordion>
                ))}
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* References - Research view only */}
      <AnimatePresence mode="wait">
        {researchView && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader title="References" />

            <div className="max-w-3xl mx-auto">
              <Card variant="outlined">
                <ol className="space-y-3 list-decimal list-inside">
                  {references.map((ref, index) => (
                    <li key={index} className="text-sm text-[#7F5539]/80 leading-relaxed">
                      {ref}
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}
