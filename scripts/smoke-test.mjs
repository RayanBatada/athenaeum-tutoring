#!/usr/bin/env node
// Smoke test: assumes `npm run dev` is running on localhost:4321.

// Local dev defaults to http://localhost:4321/athenaeum-tutoring (matches astro.config base).
// Override SMOKE_BASE_URL for prod (e.g., "https://rayanbatada.github.io/athenaeum-tutoring").
const base = process.env.SMOKE_BASE_URL || 'http://localhost:4321/athenaeum-tutoring';

const checks = [
  { path: '/',                    expectAll: ['Athenaeum', 'Ivy League', 'Schedule Free Consult', 'College'] },
  { path: '/ap/',                 expectAll: ['AP Tutoring', 'Calc', 'Free Consult'] },
  { path: '/sat/',                expectAll: ['SAT Tutoring', 'Reading', 'Math'] },
  { path: '/act/',                expectAll: ['ACT Tutoring', 'pacing', 'Science'] },
  { path: '/college-counseling/', expectAll: ['College Counseling', 'School list', 'essay'] },
  { path: '/tutors/',             expectAll: ['Browse our', 'Eliza', 'Jian', 'Sofia', 'Adetola'] },
  { path: '/tutors/eliza-m/',     expectAll: ['Eliza', 'Harvard', 'Book a Lesson'] },
  { path: '/tutors/jian-k/',      expectAll: ['Jian', 'Yale'] },
  { path: '/tutors/sofia-r/',     expectAll: ['Sofia', 'Princeton'] },
  { path: '/tutors/adetola-o/',   expectAll: ['Adetola', 'Columbia'] },
  { path: '/why-different/',      expectAll: ['Built around the', 'Top-1%', 'No long-term'] },
  { path: '/book/',               expectAll: ['Free 30-min Consult', 'Schedule a First Lesson'] },
  { path: '/privacy/',            expectAll: ['Privacy Policy'] },
  { path: '/terms/',              expectAll: ['Terms of Service'] },
];

let failures = 0;
for (const c of checks) {
  process.stdout.write(`  ${c.path.padEnd(28)} ... `);
  try {
    const res = await fetch(base + c.path);
    if (res.status !== 200) {
      console.log(`FAIL (status ${res.status})`);
      failures++;
      continue;
    }
    const body = await res.text();
    const missing = c.expectAll.filter((s) => !body.includes(s));
    if (missing.length > 0) {
      console.log(`FAIL (missing: ${missing.join(', ')})`);
      failures++;
      continue;
    }
    console.log('ok');
  } catch (err) {
    console.log(`FAIL (${err.message})`);
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} smoke test failure(s).`);
  process.exit(1);
}
console.log('\nAll smoke tests passed.');
