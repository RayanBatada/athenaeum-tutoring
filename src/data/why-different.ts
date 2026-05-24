export type Pillar = 'Talent' | 'Method' | 'Touch' | 'Trust';

export interface Reason {
  pillar: Pillar;
  title: string;
  titleSerif?: string;
  body: string;
  iconLetter: string;
  iconColor: 'lime' | 'tangerine' | 'cream';
}

export const reasons: Reason[] = [
  {
    pillar: 'Talent',
    title: 'Top-1% Ivy League',
    titleSerif: 'tutors',
    body: 'Harvard, Yale, Princeton, Columbia, MIT, Stanford. Every tutor scored at the top of the exam they teach. They remember what worked.',
    iconLetter: 'T',
    iconColor: 'lime',
  },
  {
    pillar: 'Method',
    title: 'Custom lesson plans,',
    titleSerif: 'every student',
    body: 'A diagnostic week determines the gaps. The weekly plan adapts to scores and pace. No cookie-cutter curriculum.',
    iconLetter: 'C',
    iconColor: 'tangerine',
  },
  {
    pillar: 'Method',
    title: 'Hand-graded',
    titleSerif: 'homework',
    body: 'Your tutor reviews every problem set personally. Real, specific feedback, not auto-graded.',
    iconLetter: 'H',
    iconColor: 'cream',
  },
  {
    pillar: 'Method',
    title: 'Real practice tests,',
    titleSerif: 'real walkthroughs',
    body: 'Proctored, timed conditions. Then a question-by-question debrief on every miss. The walkthrough is where the score moves.',
    iconLetter: 'P',
    iconColor: 'lime',
  },
  {
    pillar: 'Method',
    title: 'Test-day',
    titleSerif: 'strategy session',
    body: 'The final week is pacing, anxiety, and mindset, not new content. The non-academic side that matters on the actual exam.',
    iconLetter: 'S',
    iconColor: 'tangerine',
  },
  {
    pillar: 'Method',
    title: 'Integrated',
    titleSerif: 'college counseling',
    body: 'Your test-prep tutor knows your college list. One conversation across scores, GPA, essays, fit. Not five vendors.',
    iconLetter: 'I',
    iconColor: 'cream',
  },
  {
    pillar: 'Touch',
    title: 'Office hours +',
    titleSerif: 'async support',
    body: 'Message your tutor for quick questions between sessions. No 24-hour-response gulf.',
    iconLetter: 'O',
    iconColor: 'lime',
  },
  {
    pillar: 'Touch',
    title: 'Recorded sessions,',
    titleSerif: 'kept in your portal',
    body: 'Rewatch anytime. Useful before the exam, useful during a tough unit.',
    iconLetter: 'R',
    iconColor: 'tangerine',
  },
  {
    pillar: 'Touch',
    title: 'Biweekly',
    titleSerif: 'parent updates',
    body: 'A short note on progress, focus areas, and what is next. Quiet visibility, no surprises.',
    iconLetter: 'B',
    iconColor: 'cream',
  },
  {
    pillar: 'Trust',
    title: 'Free 30-min',
    titleSerif: 'consult first',
    body: 'Meet the fit before any commitment. We will tell you honestly if Athenaeum is not the right match.',
    iconLetter: 'F',
    iconColor: 'lime',
  },
  {
    pillar: 'Trust',
    title: 'No long-term',
    titleSerif: 'contracts',
    body: 'Pay per package: 8 / 16 / 24 hours. Cancel anytime.',
    iconLetter: 'N',
    iconColor: 'tangerine',
  },
  {
    pillar: 'Trust',
    title: 'First-week',
    titleSerif: 'money-back',
    body: 'Try a week. Full refund if it is not the right fit, no questions asked.',
    iconLetter: 'M',
    iconColor: 'cream',
  },
];

export const comparisonRows = [
  { label: 'Class size',         athenaeum: '1-on-1, every session',                            chain: '6-20 students per session' },
  { label: 'Tutor caliber',      athenaeum: 'Top-1% Ivy League who scored at the top',          chain: 'College students or career tutors, mixed credentials' },
  { label: 'Lesson plan',        athenaeum: 'Custom plan from diagnostic week',                 chain: 'Same curriculum for everyone' },
  { label: 'Homework feedback',  athenaeum: 'Tutor reviews every problem set personally',       chain: 'Auto-graded or skimmed' },
  { label: 'Practice tests',     athenaeum: 'Proctored + question-by-question walkthrough',     chain: 'Self-graded online tests' },
  { label: 'College counseling', athenaeum: 'Integrated with the same tutor',                   chain: 'Separate vendor, $$ extra' },
  { label: 'Contract',           athenaeum: 'Pay per package, cancel anytime',                  chain: '6-12 month commitment' },
  { label: 'Money-back',         athenaeum: 'Full refund first week, no questions',             chain: 'Conditional, school-by-school' },
];
