import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageContainer from '../components/layout/PageContainer'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Accordion from '../components/ui/Accordion'
import ToggleSwitch from '../components/ui/ToggleSwitch'

// Quick summary points
const summaryPoints = [
  'Hit 0.7–1g of protein per pound of bodyweight daily',
  'Eat fiber first — vegetables and legumes before starches',
  'Eat within a consistent 8–10 hour window each day',
  'Aim for 30 different plants per week for gut diversity',
  'Crowd out ultra-processed foods, don\'t just restrict them',
]

// Why nutrition matters cards
const whyNutritionMatters = [
  {
    title: 'Muscle Preservation',
    description: 'Adequate protein intake preserves lean mass as you age, directly counteracting sarcopenia.',
    impact: 'Strength, metabolism, fall prevention, functional independence',
  },
  {
    title: 'Metabolic Health',
    description: 'Fiber, meal timing, and food quality regulate blood sugar, insulin sensitivity, and inflammation.',
    impact: 'Energy stability, fat metabolism, cardiovascular risk, longevity biomarkers',
  },
  {
    title: 'Gut Microbiome',
    description: 'Diverse plant intake feeds beneficial bacteria that produce short-chain fatty acids critical to systemic health.',
    impact: 'Immune function, mental health, inflammation, colon cancer risk',
  },
]

// Meal timeline data
const mealTimeline = [
  {
    period: 'Morning',
    time: 'Within 1 hour of waking',
    action: 'Protein-forward first meal',
    detail: 'Front-load protein early. 30–50g at breakfast blunts hunger and supports muscle synthesis.',
    color: 'bg-[#DDB892]',
  },
  {
    period: 'Midday',
    time: '4–6 hours after first meal',
    action: 'Fiber first, then protein',
    detail: 'Eat vegetables and legumes before starches. Lowers postprandial glucose spike.',
    color: 'bg-[#E6CCB2]',
  },
  {
    period: 'Evening',
    time: 'Close eating window by 8pm',
    action: 'Light, protein-rich final meal',
    detail: 'Avoid heavy carbs late. Closing the eating window supports metabolic rest overnight.',
    color: 'bg-[#9C6644]/30',
  },
]

// Nutrition protocol steps
const protocolSteps = [
  {
    step: 'Hit your protein target',
    why: 'Protein is the only macronutrient that directly builds and preserves muscle tissue. Most people undereat it.',
    dose: '0.7–1g per pound bodyweight. Prioritize whole sources: eggs, fish, legumes, Greek yogurt.',
  },
  {
    step: 'Eat fiber first at every meal',
    why: 'Starting with vegetables and legumes slows gastric emptying and blunts the glucose spike from subsequent starches.',
    dose: 'One vegetable or legume serving before any starch. Takes 30 seconds to change.',
  },
  {
    step: 'Establish a consistent eating schedule',
    why: 'Your gut has its own circadian rhythm. Irregular meal timing disrupts digestive enzymes and metabolic efficiency.',
    dose: 'Eat within the same 2-hour window daily. Start with a consistent first meal time.',
  },
  {
    step: 'Compress your eating window',
    why: 'Time-restricted eating supports metabolic rest, insulin sensitivity, and cellular repair processes.',
    dose: '8–10 hour eating window. Finish eating 2–3 hours before bed.',
  },
  {
    step: 'Crowd out ultra-processed foods',
    why: 'UPFs are engineered to override satiety signals. Crowding out (adding whole foods) is more sustainable than restriction.',
    dose: 'Add one whole-food protein and one vegetable to every meal first, then fill remaining hunger.',
  },
  {
    step: 'Aim for 30 plants per week',
    why: 'Gut microbiome diversity is directly tied to the variety of plants consumed, not just quantity of any single food.',
    dose: 'Count unique plant foods (herbs, spices, legumes, fruits, vegetables all count). Track for one week.',
  },
]

// Common mistakes
const mistakes = [
  {
    mistake: 'Undereating protein',
    why: 'Most people eat half the protein needed for muscle preservation. The gap widens with age.',
  },
  {
    mistake: 'Skipping breakfast or eating carbs first',
    why: 'Starting with carbs or skipping breakfast spikes glucose and leaves protein targets unmet by end of day.',
  },
  {
    mistake: 'Eating the same 5 plants every week',
    why: 'Microbiome diversity requires dietary diversity. Rotating crops feed different bacterial species.',
  },
  {
    mistake: 'Late-night eating',
    why: 'Eating close to sleep impairs overnight metabolic rest and disrupts circadian-regulated digestion.',
  },
  {
    mistake: 'Confusing "healthy" processed food with whole food',
    why: 'Protein bars and plant-based junk food can still be ultra-processed. Ingredient length is a proxy.',
  },
  {
    mistake: 'Restricting rather than crowding out',
    why: 'Restriction-based diets have poor long-term adherence. Adding whole foods first is more sustainable.',
  },
]

// Research accordions
const researchTopics = [
  {
    title: 'Protein and Muscle Protein Synthesis',
    findings: [
      'Muscle protein synthesis requires ~0.4g/kg per meal as a minimum stimulus',
      'Leucine threshold (~2-3g per meal) is required to trigger anabolic signaling',
      'Evenly distributing protein across meals outperforms single large-dose strategies',
      'Protein needs increase with age due to anabolic resistance',
    ],
    takeaway: 'Hit 30–50g protein per meal with leucine-rich sources (eggs, dairy, legumes). Don\'t save it all for dinner.',
    citation: 'Moore, D. R. et al. (2015). British Journal of Nutrition.',
  },
  {
    title: 'Chrononutrition and Meal Timing',
    findings: [
      'Glucose tolerance is highest in the morning and declines through the day',
      'The same meal eaten at night produces a larger glucose spike than at breakfast',
      'Time-restricted eating improves insulin sensitivity independent of calories',
      'Consistent meal timing synchronizes peripheral circadian clocks in metabolic tissues',
    ],
    takeaway: 'Front-load calories earlier in the day. Compress your eating window. Consistency of timing matters as much as content.',
    citation: 'Sutton, E. F. et al. (2018). Cell Metabolism.',
  },
  {
    title: 'Dietary Fiber and Short-Chain Fatty Acids',
    findings: [
      'Gut bacteria ferment soluble fiber into butyrate, propionate, and acetate (SCFAs)',
      'Butyrate is the primary fuel source for colonocytes and has anti-inflammatory effects',
      'Higher fiber intake is associated with reduced all-cause mortality in prospective studies',
      'Fiber diversity (many fiber types) produces greater SCFA diversity than high dose of one type',
    ],
    takeaway: 'Eat diverse fiber sources — oats, legumes, vegetables, fruits. Variety drives different SCFA profiles.',
    citation: 'Sonnenburg, J. L. & Bäckhed, F. (2016). Nature.',
  },
  {
    title: 'The 30 Plants Per Week Principle',
    findings: [
      'APC Microbiome study (10,000 participants) found strongest predictor of microbiome diversity was plant variety, not quantity',
      'People eating 30+ plant types per week had significantly more diverse gut bacteria',
      'Even herbs and spices count as distinct plant sources',
      'Ultra-processed food consumption inversely correlated with microbiome diversity',
    ],
    takeaway: 'Count unique plant types per week, not servings. Rotate vegetables, legumes, grains, fruits, nuts, herbs.',
    citation: 'McDonald, D. et al. (2018). Cell Host & Microbe.',
  },
  {
    title: 'Ultra-Processed Foods and Longevity',
    findings: [
      'NOVA classification identifies UPFs by industrial processing and additive profiles, not nutrients',
      'UPF intake linked to increased all-cause mortality, cardiovascular disease, and depression',
      'UPFs appear to override satiety mechanisms, driving overconsumption independent of calorie labeling',
      'Whole food substitution studies show metabolic benefits within 2 weeks',
    ],
    takeaway: 'Minimize UPFs by crowding them out with whole foods. Read ingredient lists — more than 5 ingredients with additives is a signal.',
    citation: 'Monteiro, C. A. et al. (2019). Public Health Nutrition.',
  },
]

// References
const references = [
  'Moore, D. R., Churchward-Venne, T. A., Witard, O., et al. (2015). Protein ingestion to stimulate myofibrillar protein synthesis requires greater relative protein intakes in healthy older versus younger men. The Journals of Gerontology, 70(1), 57-62.',
  'Sutton, E. F., Beyl, R., Early, K. S., et al. (2018). Early time-restricted feeding improves insulin sensitivity, blood pressure, and oxidative stress even without weight loss in men with prediabetes. Cell Metabolism, 27(6), 1212-1221.',
  'Sonnenburg, J. L., & Bäckhed, F. (2016). Diet-induced alterations in gut microflora contribute to lethal pulmonary damage in TLR2/TLR4-deficient mice. Nature, 535(7610), 56-64.',
  'McDonald, D., Hyde, E., Debelius, J. W., et al. (2018). American Gut: an open platform for citizen science microbiome research. Cell Host & Microbe, 23(3), 271-283.',
  'Monteiro, C. A., Cannon, G., Levy, R. B., et al. (2019). Ultra-processed foods: what they are and how to identify them. Public Health Nutrition, 22(5), 936-941.',
  'Spector, T. (2022). Food for Life: The New Science of Eating Well. Jonathan Cape.',
]

export default function Nutrition() {
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
          Nutrition
        </motion.h1>
        <motion.p
          className="text-xl text-[#9C6644] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          The single biggest lever you pull every day.
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
            <h3 className="font-semibold text-[#7F5539] mb-2">Key Metric: The 30-Plant Rule</h3>
            <p className="text-sm text-[#9C6644]">
              Count unique plant types per week — vegetables, fruits, legumes, whole grains, nuts,
              seeds, herbs, and spices all count. Diversity drives gut microbiome health.
            </p>
          </div>
        </Card>
      </motion.section>

      {/* Why Nutrition Matters - Research view only */}
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
              title="Why Nutrition Impacts Longevity"
              subtitle="Three systems that depend on what you eat."
            />
            <div className="grid md:grid-cols-3 gap-6">
              {whyNutritionMatters.map((item, index) => (
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

      {/* Meal Timing & Body Clock - Research view only */}
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
              title="Meal Timing & Your Body Clock"
              subtitle="When you eat shapes metabolism as much as what you eat."
            />

            {/* Meal Timeline */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                {mealTimeline.map((item, index) => (
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
                  <strong>Chrononutrition:</strong> Glucose tolerance peaks in the morning.
                  The same meal eaten at dinner produces a larger blood sugar spike than at breakfast.
                  Front-load your calories earlier in the day.
                </p>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Protein & Fiber Deep Dive - Research view only */}
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
              title="Protein & Fiber Deep Dive"
              subtitle="The two most under-consumed nutrients in modern diets."
            />

            <div className="max-w-3xl mx-auto">
              <Card variant="elevated">
                <h4 className="font-semibold text-[#7F5539] mb-3">Protein: Your Longevity Armor</h4>
                <p className="text-[#7F5539] mb-6">
                  Muscle mass is one of the strongest predictors of longevity. It declines from your 30s
                  unless you actively counter it with resistance training and adequate protein. Most adults
                  eat roughly half the protein needed for optimal muscle preservation. Aim for 30–50g per
                  meal with leucine-rich sources to hit the anabolic threshold — eggs, fish, dairy, and
                  legumes are your best tools.
                </p>

                <h4 className="font-semibold text-[#7F5539] mb-3">Fiber: Your Gut's Fuel Source</h4>
                <p className="text-[#7F5539] mb-4">
                  Gut bacteria ferment dietary fiber into short-chain fatty acids (SCFAs), which are
                  critical to immune regulation, inflammation control, and metabolic health. The four
                  key SCFAs and their roles:
                </p>
                <ul className="space-y-2 mb-4">
                  {[
                    'Butyrate — primary fuel for colon cells, anti-inflammatory, protects gut barrier',
                    'Propionate — shuttled to liver, helps regulate glucose and lipid metabolism',
                    'Acetate — most abundant SCFA, supports gut motility and peripheral metabolism',
                    'Valerate — emerging evidence for neuroactive and anti-inflammatory properties',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 bg-[#9C6644] rounded-full mt-2" />
                      <span className="text-[#9C6644] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Nutrition Protocol - Always visible */}
      <motion.section className="mb-16" {...fadeIn}>
        <SectionHeader
          title="The Nutrition Protocol (90-Day Friendly)"
          subtitle="A step-by-step playbook for better eating."
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

        {/* Tomorrow's Checklist */}
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
              Tomorrow's Checklist
            </h4>
            <div className="space-y-2 font-mono text-sm text-[#7F5539]">
              <p>[ ] Protein target (g): _____</p>
              <p>[ ] Fiber first at breakfast: _____</p>
              <p>[ ] First meal time: _____</p>
              <p>[ ] Eating window closes: _____</p>
              <p>[ ] Plant types today: _____</p>
              <p>[ ] UPFs crowded out: _____</p>
            </div>
            <p className="text-xs text-[#9C6644] mt-4">Copy this to your notes. Fill in your targets.</p>
          </Card>
        </motion.div>
      </motion.section>

      {/* Common Mistakes - Always visible */}
      <motion.section className="mb-16" {...fadeIn}>
        <SectionHeader
          title="Common Mistakes"
          subtitle="What to avoid for better nutrition."
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
