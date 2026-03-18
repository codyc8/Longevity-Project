import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageContainer from '../components/layout/PageContainer'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Accordion from '../components/ui/Accordion'
import ToggleSwitch from '../components/ui/ToggleSwitch'

// Quick summary points
const summaryPoints = [
  "Maximize VO₂ max — it's the single strongest predictor of all-cause mortality",
  'Lift heavy 2–3x per week to preserve muscle and bone density',
  'Do 150–180 min/week of Zone 2 cardio (conversational pace)',
  'Train balance and mobility weekly to prevent falls and maintain function',
  'Break up sedentary time — daily movement compounds across decades',
]

// Why exercise matters cards
const whyExerciseMatters = [
  {
    title: 'Cardiovascular & Metabolic',
    description: 'Exercise improves cardiac output, insulin sensitivity, and lipid profiles. VO₂ max is a stronger predictor of mortality than smoking, hypertension, or diabetes.',
    impact: 'Heart disease risk, blood sugar regulation, all-cause mortality',
  },
  {
    title: 'Muscle & Skeletal',
    description: 'Resistance training preserves lean mass against sarcopenia, strengthens bone density against osteoporosis, and keeps metabolism elevated.',
    impact: 'Strength, independence, fall prevention, fracture resistance',
  },
  {
    title: 'Brain Health',
    description: 'Aerobic exercise increases BDNF (brain-derived neurotrophic factor), promoting neurogenesis, memory consolidation, and protection against cognitive decline.',
    impact: 'Memory, executive function, depression, dementia risk',
  },
]

// The four exercise pillars
const exercisePillars = [
  {
    pillar: 'Zone 2 Cardio',
    trains: 'Aerobic base & mitochondria',
    why: 'Builds mitochondrial density in slow-twitch fibers. Trains fat oxidation. Improves VO₂ max baseline. Sustainable for decades.',
    howMuch: '150–180 min/week. Conversational pace — you can speak in full sentences.',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    pillar: 'Strength Training',
    trains: 'Muscle mass & bone density',
    why: 'Combats sarcopenia and osteoporosis. Preserves resting metabolic rate. Improves glucose disposal in muscle tissue.',
    howMuch: '2–3x per week. Compound movements (squat, hinge, push, pull, carry).',
    color: 'bg-[#E6CCB2] border-[#DDB892]',
  },
  {
    pillar: 'VO₂ Max / HIIT',
    trains: 'Peak cardiovascular capacity',
    why: 'High-intensity intervals push cardiac output ceiling higher. Each 1 MET increase in VO₂ max cuts all-cause mortality by ~13%.',
    howMuch: '1x per week. 4–6 × 4-minute intervals at 85–95% max heart rate.',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    pillar: 'Balance & Mobility',
    trains: 'Proprioception & joint range',
    why: 'Falls are a leading cause of death in older adults. Balance and mobility decline silently until a fracture. Train proactively.',
    howMuch: '10–15 min daily. Single-leg stance, hip hinges, shoulder CARs.',
    color: 'bg-green-50 border-green-200',
  },
]

// Protocol steps
const protocolSteps = [
  {
    step: 'Establish a Zone 2 baseline',
    why: 'Zone 2 builds the aerobic foundation everything else sits on. It trains mitochondrial biogenesis and fat oxidation without excessive recovery cost.',
    dose: '3–4 sessions/week, 40–60 min each. Target: speaking in full sentences, not gasping.',
  },
  {
    step: 'Add 2–3 strength sessions per week',
    why: 'Muscle mass is the primary driver of metabolic health and functional independence. Resistance training is the only stimulus for bone density.',
    dose: 'Full-body or upper/lower splits. Progressive overload. At least 2 sets per major movement pattern.',
  },
  {
    step: 'Include one VO₂ max interval session',
    why: 'VO₂ max is the strongest independent predictor of longevity. High-intensity intervals are the most efficient way to raise it.',
    dose: '4–6 × 4-min intervals at 85–95% max HR, with equal rest. Once per week is enough.',
  },
  {
    step: 'Train balance and mobility daily',
    why: 'Proprioception degrades with age. Falls and fractures are a leading cause of loss of independence and death after age 65.',
    dose: '10–15 min daily. Single-leg work, hip mobility, shoulder range. Can be done before bed.',
  },
  {
    step: 'Break up sedentary time',
    why: 'Sitting for extended periods independently increases mortality risk, even in people who exercise regularly. Movement frequency matters.',
    dose: 'Stand or walk for 2–5 minutes every 45–60 minutes during the workday.',
  },
  {
    step: 'Track and progress your VO₂ max',
    why: 'What gets measured gets managed. VO₂ max is the most actionable longevity biomarker you can directly improve.',
    dose: 'Use a fitness tracker estimate or Cooper 12-minute run test. Test every 3 months.',
  },
]

// Common mistakes
const mistakes = [
  {
    mistake: 'Only doing cardio, no strength training',
    why: 'Cardio without resistance training leaves muscle mass and bone density unprotected. Both decline from your 30s without a stimulus to preserve them.',
  },
  {
    mistake: 'Training too hard, too often',
    why: 'Most training should be easy (Zone 2). Chronic high-intensity training without adequate recovery leads to diminishing returns and injury.',
  },
  {
    mistake: 'Skipping balance and mobility work',
    why: 'Balance training feels unnecessary — until a fall. The time to build proprioception is decades before it matters.',
  },
  {
    mistake: 'Never testing VO₂ max',
    why: 'VO₂ max is the most predictive longevity metric you can improve. Not tracking it means not knowing if training is working.',
  },
  {
    mistake: 'Sitting all day between workouts',
    why: 'An hour of exercise doesn\'t offset 10 hours of sitting. Daily movement frequency is an independent health variable.',
  },
  {
    mistake: 'Neglecting progressive overload',
    why: 'Doing the same workout forever produces no new adaptation. Strength and fitness require progressive overload — more weight, reps, or intensity over time.',
  },
]

// Research accordions
const researchTopics = [
  {
    title: 'VO₂ Max and All-Cause Mortality',
    findings: [
      'Each 1 MET increase in cardiorespiratory fitness reduces all-cause mortality by ~13%',
      'Transition from "low" to "below average" fitness category cuts mortality risk in half',
      'VO₂ max is a stronger mortality predictor than smoking, hypertension, or diabetes',
      'Elite aerobic fitness in older adults associates with a 5x lower mortality risk vs sedentary peers',
    ],
    takeaway: 'Improving VO₂ max from "low" to "moderate" is one of the highest-leverage health interventions available. Even modest improvement matters.',
    citation: 'Mandsager, K. et al. (2018). JAMA Network Open.',
  },
  {
    title: 'Zone 2 Training and Mitochondrial Biogenesis',
    findings: [
      'Zone 2 (60–70% VO₂ max) is the primary stimulus for mitochondrial biogenesis in slow-twitch fibers',
      'Mitochondrial density is a key determinant of metabolic flexibility — the ability to switch between fat and carbohydrate oxidation',
      'Higher mitochondrial density improves lactate clearance, lowering blood lactate at any given pace',
      'Zone 2 training produces adaptations without the recovery cost of high-intensity work',
    ],
    takeaway: 'Most training volume should be Zone 2. It builds the metabolic foundation that makes higher-intensity work more effective and sustainable.',
    citation: 'Iaia, F. M. & Bangsbo, J. (2010). Scandinavian Journal of Medicine & Science in Sports.',
  },
  {
    title: 'Resistance Training and Sarcopenia',
    findings: [
      'Muscle mass declines at ~3–8% per decade after age 30, accelerating after 60',
      'Sarcopenia (muscle wasting) is independently associated with mortality, disability, and metabolic disease',
      'Resistance training 2–3x per week can preserve or increase lean mass at any age',
      'Muscle tissue is a major site of glucose disposal — resistance training improves insulin sensitivity',
    ],
    takeaway: 'Treat strength training as non-negotiable. It is the primary defense against the muscle and metabolic decline that drives aging.',
    citation: 'Landi, F. et al. (2012). European Journal of Internal Medicine.',
  },
  {
    title: 'BDNF, Neurogenesis, and Aerobic Exercise',
    findings: [
      'Aerobic exercise increases brain-derived neurotrophic factor (BDNF) acutely and chronically',
      'BDNF promotes hippocampal neurogenesis — the growth of new neurons in the memory center',
      'Regular aerobic exercise is associated with larger hippocampal volume in older adults',
      'Exercise-induced BDNF rise correlates with improvements in memory and executive function',
    ],
    takeaway: 'Aerobic exercise is one of the most effective tools for protecting cognitive function and reducing dementia risk.',
    citation: 'Voss, M. W. et al. (2013). Trends in Cognitive Sciences.',
  },
  {
    title: 'Falls, Balance Training, and Longevity',
    findings: [
      'Falls are the leading cause of injury death in adults over 65 in the US',
      'Balance and proprioception decline measurably from the 4th decade of life',
      'Single-leg balance training significantly reduces fall risk in randomized controlled trials',
      'Inability to stand on one leg for 10 seconds at midlife predicts 84% higher all-cause mortality',
    ],
    takeaway: 'Balance training is critical preventive medicine. Test yourself: stand on one leg for 10 seconds with eyes closed. Work on it if you can\'t.',
    citation: 'Araujo, C. G. et al. (2022). British Journal of Sports Medicine.',
  },
]

// References
const references = [
  'Mandsager, K., Harb, S., Cremer, P., et al. (2018). Association of cardiorespiratory fitness with long-term mortality among adults undergoing exercise treadmill testing. JAMA Network Open, 1(6), e183605.',
  'Iaia, F. M., & Bangsbo, J. (2010). Speed endurance training is a potent stimulator of physiological adaptations leading to augmented plasma volume and red cell mass but not VO2max. Scandinavian Journal of Medicine & Science in Sports, 20(S2), 25-35.',
  'Landi, F., Liperoti, R., Fusco, D., et al. (2012). Sarcopenia and mortality among older nursing home residents. Journal of the American Medical Directors Association, 13(2), 121-126.',
  'Voss, M. W., Vivar, C., Kramer, A. F., & van Praag, H. (2013). Bridging animal and human models of exercise-induced brain plasticity. Trends in Cognitive Sciences, 17(10), 525-544.',
  'Araujo, C. G., de Souza e Silva, C. G., Laukkanen, J. A., et al. (2022). Successful 10-second one-legged stance performance predicts survival in middle-aged and older individuals. British Journal of Sports Medicine, 56(17), 975-980.',
  'Attia, P. (2023). Outlive: The Science and Art of Longevity. Harmony Books.',
]

export default function Exercise() {
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
          Exercise
        </motion.h1>
        <motion.p
          className="text-xl text-[#9C6644] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          The closest thing we have to an anti-aging drug.
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
            <h3 className="font-semibold text-[#7F5539] mb-2">VO₂ Max: The Number That Predicts Your Future</h3>
            <p className="text-sm text-[#9C6644]">
              VO₂ max measures your maximum oxygen uptake — the ceiling of your cardiovascular system.
              Moving from "low" to "below average" cuts all-cause mortality risk in half. It's trainable at any age.
            </p>
          </div>
        </Card>
      </motion.section>

      {/* Why Exercise Impacts Longevity - Research view only */}
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
              title="Why Exercise Impacts Longevity"
              subtitle="Three systems that exercise directly protects."
            />
            <div className="grid md:grid-cols-3 gap-6">
              {whyExerciseMatters.map((item, index) => (
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

      {/* The Four Pillars - Research view only */}
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
              title="The Four Pillars of Exercise"
              subtitle="Each trains a different system. All four are required for longevity."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {exercisePillars.map((item, index) => (
                <motion.div
                  key={item.pillar}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="default" className={`h-full border ${item.color}`}>
                    <h3 className="font-semibold text-[#7F5539] mb-1">{item.pillar}</h3>
                    <p className="text-xs text-[#B08968] mb-3 italic">{item.trains}</p>
                    <p className="text-[#9C6644] text-sm mb-3">{item.why}</p>
                    <p className="text-xs text-[#7F5539]">
                      <span className="font-medium">Dose:</span> {item.howMuch}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <Card variant="outlined" className="text-center">
                <p className="text-[#7F5539]">
                  <strong>The Combination Effect:</strong> Zone 2 builds your aerobic floor. Strength training
                  preserves your muscle. HIIT raises your VO₂ max ceiling. Balance and mobility keeps it all
                  accessible. Skip any one pillar and you leave a significant gap.
                </p>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* VO₂ Max & Mitochondria - Research view only */}
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
              title="VO₂ Max & Mitochondria"
              subtitle="The two mechanisms that explain why exercise extends life."
            />

            <div className="max-w-3xl mx-auto">
              <Card variant="elevated">
                <h4 className="font-semibold text-[#7F5539] mb-3">VO₂ Max: Your Biological Speedometer</h4>
                <p className="text-[#7F5539] mb-6">
                  VO₂ max is the maximum rate at which your body can consume oxygen during intense exercise.
                  It reflects the combined capacity of your heart, lungs, blood, and muscles. Research from
                  the Cleveland Clinic found it is a stronger predictor of all-cause mortality than smoking,
                  hypertension, or diabetes. Each 1 MET improvement cuts mortality risk by ~13%. The good
                  news: it's highly trainable at any age. Zone 2 cardio raises the base; VO₂ max intervals
                  raise the ceiling.
                </p>

                <h4 className="font-semibold text-[#7F5539] mb-3">Mitochondria: Your Cellular Power Plants</h4>
                <p className="text-[#7F5539] mb-4">
                  Mitochondria convert oxygen and fuel into ATP — the energy currency of every cell.
                  Mitochondrial density and efficiency decline with age and sedentary behavior, contributing
                  directly to fatigue, metabolic dysfunction, and cellular aging. Zone 2 training is the
                  primary stimulus for mitochondrial biogenesis: the creation of new mitochondria. More
                  mitochondria means more efficient energy production, better fat oxidation, and slower
                  metabolic aging. Exercise is currently the only proven tool for reversing mitochondrial
                  decline.
                </p>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Exercise Protocol - Always visible */}
      <motion.section className="mb-16" {...fadeIn}>
        <SectionHeader
          title="The Exercise Protocol (90-Day Friendly)"
          subtitle="A step-by-step playbook for building all four pillars."
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

        {/* Weekly Checklist */}
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
              Weekly Checklist
            </h4>
            <div className="space-y-2 font-mono text-sm text-[#7F5539]">
              <p>[ ] Zone 2 sessions (3–4x): _____</p>
              <p>[ ] Strength sessions (2–3x): _____</p>
              <p>[ ] VO₂ max intervals (1x): _____</p>
              <p>[ ] Balance/mobility (daily): _____</p>
              <p>[ ] Sedentary breaks taken: _____</p>
              <p>[ ] VO₂ max estimate: _____</p>
            </div>
            <p className="text-xs text-[#9C6644] mt-4">Copy this to your notes. Fill in your targets.</p>
          </Card>
        </motion.div>
      </motion.section>

      {/* Common Mistakes - Always visible */}
      <motion.section className="mb-16" {...fadeIn}>
        <SectionHeader
          title="Common Mistakes"
          subtitle="What to avoid for better exercise outcomes."
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
