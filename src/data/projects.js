// Single source of content for the site. Every string is a placeholder until Paul writes the copy.

export const site = {
  name: 'Paul Shenoda',
  role: '[Role: e.g. Software engineer, AI systems]',
  focus: '[One-line focus, in your own words]',
  about: '[Two or three sentences about you. What you build, what you care about, what you are looking for.]',
  links: {
    resume: '/resume.pdf',
    github: 'https://github.com/Paul-Shenoda',
    linkedin: '[LinkedIn URL]',
    email: 'mailto:[address]',
  },
  experience: [
    {
      dates: '[Start date to end date]',
      title: '[Job title]',
      company: 'Skyjack',
      description: '[What you worked on and what changed because of it. One or two sentences.]',
      technologies: '[Technologies used]',
    },
  ],
  colophon: '[Colophon: how the site was built and how you used AI tools, in your own words]',
};

const placeholderSteps = [1, 2, 3, 4, 5].map((n) => ({
  name: `[Stage ${n} name]`,
  text: `[What happens in stage ${n}, and what it passes to the next stage. Two to three sentences.]`,
}));

const placeholderWriteup = {
  problem: '[Who had the problem and what made it hard. Two to four sentences.]',
  approach: '[What you built, your role in it, and the key decisions and trade-offs.]',
  results: '[What the numbers mean, how you measured them, and their limits.]',
  change: '[What you would do differently, and what you would build next.]',
};

export const projects = [
  {
    slug: 'rag-document-chatbot',
    title: 'RAG Document Chatbot',
    stack: '[Tech stack]',
    outcome: '[Outcome line, written by you]',
    summary: '[One-line summary: what it does and the result]',
    liveUrl: '[Live demo URL]',
    metrics: {
      type: 'table',
      rows: [
        { measure: '[Measure]', value: '[Value]', conditions: '[How it was measured]' },
        { measure: '[Measure]', value: '[Value]', conditions: '[How it was measured]' },
      ],
    },
    steps: placeholderSteps,
    writeup: placeholderWriteup,
  },
  {
    slug: 'bible-reading-tracker',
    title: 'Bible Reading Tracker',
    stack: '[Tech stack]',
    outcome: '[Outcome line, written by you]',
    summary: '[One-line summary: what it does and the result]',
    liveUrl: '[Live demo URL]',
    metrics: {
      type: 'single',
      value: '[~30]',
      label: '[daily readers]',
      conditions: '[Conditions, e.g. as of a date]',
    },
    steps: placeholderSteps,
    writeup: placeholderWriteup,
  },
  {
    slug: 'background-job-runner',
    title: 'Background Job Runner',
    stack: '[Tech stack]',
    outcome: '[Outcome line, written by you]',
    summary: '[One-line summary: what it does and the result]',
    liveUrl: '[Live demo URL]',
    metrics: { type: 'none' },
    steps: placeholderSteps,
    writeup: placeholderWriteup,
  },
];

export const otherProjects = [
  { name: '[Project name]', line: '[One line: what it is and one result]' },
  { name: '[Project name]', line: '[One line: what it is and one result]' },
  { name: '[Project name]', line: '[One line: what it is and one result]' },
  { name: '[Project name]', line: '[One line: what it is and one result]' },
];
