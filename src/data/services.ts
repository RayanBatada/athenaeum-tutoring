import type { Package } from './packages';
import { packages } from './packages';

export type ServiceSlug = 'ap' | 'sat' | 'act' | 'college-counseling';
export type CardColor = 'lime' | 'tangerine' | 'ink' | 'cream';

export type FAQ = { question: string; answer: string };

export interface Service {
  slug: ServiceSlug;
  name: string;
  longName: string;
  tagline: string;
  blurb: string;
  cardColor: CardColor;
  cadence: string;
  topics: string[];
  startingAtHourly: number;
  packages: Package[];
  faqs: FAQ[];
}

export const services: Service[] = [
  {
    slug: 'ap',
    name: 'AP',
    longName: 'AP Tutoring',
    tagline: 'Master the curriculum and the exam at the same time.',
    blurb: 'Subject-specific 1-on-1 tutoring covering the full AP curriculum, with weekly problem sets and timed practice through the May exam.',
    cardColor: 'lime',
    cadence: 'Weekly 1-on-1s',
    topics: ['Calc AB / BC', 'Bio · Chem · Physics', 'Lit · Lang', 'Stats · CS', 'History · Econ'],
    startingAtHourly: 130,
    packages,
    faqs: [
      { question: "When should we <span class='serif'>start</span> AP prep?", answer: "Most students start 8-12 weeks before the May exam. For especially demanding APs (Calc BC, Physics C, Chemistry), 4-6 months is ideal." },
      { question: "Do you cover <span class='serif'>school</span> coursework or just the exam?", answer: "Both. Your tutor will support classroom work and pivot to exam-specific prep as May approaches. The two reinforce each other." },
      { question: "What's the <span class='serif'>format</span>?", answer: "Two 1-on-1 sessions per week is most common. Sessions are recorded, posted to your portal, and followed by a problem set for the week ahead." },
      { question: "Can we focus on a <span class='serif'>single</span> hard unit?", answer: "Yes. Short packages (8 hours) are designed for one section or topic that's been a sticking point." },
    ],
  },
  {
    slug: 'sat',
    name: 'SAT',
    longName: 'SAT Tutoring',
    tagline: 'A custom plan, hand-graded homework, and four full practice tests.',
    blurb: 'Calibrated for the digital SAT. Section drills, adaptive strategies, and full proctored practice tests built into the plan.',
    cardColor: 'tangerine',
    cadence: 'Weekly 1-on-1s',
    topics: ['Reading & Writing', 'Math (calc + no-calc)', 'Adaptive strategy', '4+ practice tests'],
    startingAtHourly: 130,
    packages,
    faqs: [
      { question: "How long does a <span class='serif'>full</span> prep cycle take?", answer: "Most students prep over 10-14 weeks. We design the plan around your test date so practice tests fall at the right cadence." },
      { question: "Is this for the <span class='serif'>digital</span> SAT?", answer: "Yes. The plan, drills, and practice tests are all calibrated for the College Board's digital format." },
      { question: "How are <span class='serif'>practice</span> tests run?", answer: "Proctored and timed. Your tutor then walks every miss with you, question by question. The walkthrough is where the score moves." },
      { question: "What's a <span class='serif'>typical</span> score gain?", answer: "We commit to specific plans not specific points. A strong starting baseline plus 16-24 hours of focused 1-on-1 tends to move students 100-180 points." },
    ],
  },
  {
    slug: 'act',
    name: 'ACT',
    longName: 'ACT Tutoring',
    tagline: 'Pacing is the whole game. We coach it from day one.',
    blurb: 'Section coverage plus the pacing drills that make the ACT different. Optional Writing.',
    cardColor: 'ink',
    cadence: 'Weekly 1-on-1s',
    topics: ['English', 'Math', 'Reading', 'Science', 'Optional Writing'],
    startingAtHourly: 130,
    packages,
    faqs: [
      { question: "Should we pick <span class='serif'>SAT</span> or <span class='serif'>ACT</span>?", answer: "Start with a 30-min consult. We look at your math/science strengths and reading speed and recommend the better fit. Many students try both before committing." },
      { question: "How is <span class='serif'>pacing</span> different from SAT?", answer: "ACT is faster, more reading-heavy, includes Science, and rewards a different skim/lock-in cadence. We drill pacing on every section." },
      { question: "Is the <span class='serif'>Science</span> section actually science?", answer: "Not really. It's a reading-and-charts section. We teach the specific reading patterns that make it tractable." },
      { question: "What about <span class='serif'>Writing</span>?", answer: "Optional. Your tutor will tell you whether your target schools care, and add the section to the plan if so." },
    ],
  },
  {
    slug: 'college-counseling',
    name: 'College Counseling',
    longName: 'College Counseling',
    tagline: 'School list, essays, interviews, timeline. One mentor across all of it.',
    blurb: 'Application strategy from school list through final submit. Essay coaching, interview prep, timeline guidance, and an honest read of fit.',
    cardColor: 'cream',
    cadence: 'Monthly or weekly',
    topics: ['School list strategy', 'Application essays', 'Interview prep', 'Timeline & deadlines', 'Activity narrative'],
    startingAtHourly: 160,
    packages: [
      { hours: 8,  price: 1440, perHour: 180, tagline: 'Essay focus or interview sprint' },
      { hours: 16, price: 2720, perHour: 170, tagline: 'Full essay + school list package' },
      { hours: 24, price: 3840, perHour: 160, tagline: 'End-to-end from sophomore-junior planning to submit' },
    ],
    faqs: [
      { question: "When should we <span class='serif'>start</span> college counseling?", answer: "Spring of sophomore year is ideal for full planning. Rising seniors can also start in May/June and ship a strong application." },
      { question: "Does this <span class='serif'>replace</span> our school counselor?", answer: "It complements them. School counselors are essential for transcripts and rec letters. Athenaeum brings the focused application work: essays, fit research, narrative, interviews." },
      { question: "How many <span class='serif'>schools</span> do you help with?", answer: "Usually 10-15. The list is the strategy. Reach / target / likely balance, optimizing your highest-probability great-fit outcomes." },
      { question: "What about <span class='serif'>scholarships</span>?", answer: "Yes, including merit-based and need-based aid strategy. We fold it into the school list conversation." },
    ],
  },
];
