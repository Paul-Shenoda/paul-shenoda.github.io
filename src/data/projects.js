// Single source of content for the site. First draft written from Paul's resume and the project
// READMEs; Paul will rewrite it in his own words.
//
// Privacy: this repo and site are public. Never add a phone number, home address, server IPs,
// credentials, or anything about the people using these apps.

export const site = {
  name: 'Paul Shenoda',
  role: 'AI-first software engineer',
  focus: 'I ship production AI systems end to end: RAG pipelines, multi-agent workflows and full-stack apps on Azure.',
  about:
    'I build AI systems from the first client conversation to a deployed, evaluated product. I use Claude Code and Codex throughout the development lifecycle while owning the architecture, testing and verification myself. Before that I spent 8 months on a safety-critical industrial platform at Skyjack, and I hold a Computer Engineering and Management degree from McMaster University.',
  links: {
    // Public version of the resume: no phone number, region instead of city. Set to null to hide the button.
    resume: '/resume.pdf',
    github: 'https://github.com/Paul-Shenoda',
    linkedin: 'https://www.linkedin.com/in/Paul-Shenoda',
    // Base64 of the address, so it never appears as plain text in the HTML for scrapers to collect.
    // The Email button decodes it in the browser when clicked (see src/scripts/email-link.js).
    emailEncoded: 'cGF1bC5zYmFzdGF3cm9zQGhvdG1haWwuY29t',
  },
  experience: [
    {
      dates: 'Jan 2023 – Aug 2023',
      title: 'Embedded Software Engineer Co-op',
      company: 'Skyjack',
      description:
        'Developed and validated 30+ CANBus message protocols across isolated control boxes, and cut on-machine field testing time by about 40% by setting up four in-office hardware control boxes so developers could validate faults at their desks. Extended from a 4-month term to 8 months.',
      technologies: 'CANBus, hardware control boxes, Agile (Scrum), Simulink (test harnesses)',
    },
  ],
  colophon: 'Built with Astro. Hosted on GitHub Pages.',
};

const AZURE_NOTE = 'The live demo runs on Azure and may take about 20 seconds to wake.';

export const projects = [
  {
    slug: 'rag-document-chatbot',
    title: 'RAG Document Chatbot',
    stack: 'Python, LangChain, FastAPI, Azure OpenAI, Azure AI Search',
    outcome:
      'A support chatbot that answers post-installation questions from product manuals, scored on a 30-question RAGAS suite.',
    summary:
      'Customers of a smart home integrator ask questions in plain language and get answers grounded in the manufacturers’ manuals, instead of calling support.',
    liveUrl: 'https://rag-chatbot-app.yellowsmoke-32d2ec2c.canadacentral.azurecontainerapps.io',
    demoNote: AZURE_NOTE,
    metrics: {
      type: 'table',
      rows: [
        { measure: 'Faithfulness', value: '91%', conditions: 'gpt-4o judge, mean of 3 runs, 30 questions' },
        { measure: 'Faithfulness', value: '89%', conditions: 'gpt-4o-mini judge, same 30 questions' },
        { measure: 'Context recall', value: '87%', conditions: '30 questions across 4 brands' },
        { measure: 'Answer relevancy', value: '85%', conditions: '30 questions across 4 brands' },
      ],
    },
    steps: [
      {
        name: 'Ingest',
        text: '18 PDF manuals from four partner brands are split into 1,000-character chunks with a 150-character overlap, so an answer that spans a page break still lands in one chunk.',
      },
      {
        name: 'Embed and index',
        text: 'Each chunk is embedded with text-embedding-3-small (1,536 dimensions) and stored in an Azure AI Search index, ready for vector search.',
      },
      {
        name: 'Retrieve',
        text: 'A customer’s question is embedded the same way and the 4 most similar chunks are pulled from the index. This step is where most remaining errors come from.',
      },
      {
        name: 'Generate',
        text: 'LangChain passes the question and those chunks to gpt-4o at temperature 0, with instructions to answer only from the supplied context and say so when the manuals don’t cover it.',
      },
      {
        name: 'Serve',
        text: 'A FastAPI service exposes the chain at /chat and serves the chat page. GitHub Actions builds the Docker image and deploys it to Azure Container Apps on every push.',
      },
    ],
    writeup: {
      problem: [
        'This started as a capstone with an industry partner: a smart home integrator that designs and installs systems built from 20 partner brands. After installation, customers call support with questions whose answers are already in the product manuals.',
        'I interviewed the client to scope the problem, then built the full pipeline on my own after the course ended.',
      ],
      approach: [
        'A retrieval-augmented generation pipeline: LangChain and Azure OpenAI for grounded question answering, Azure AI Search as the vector store, and FastAPI behind a single-page chat UI with an escalation sidebar for when the bot can’t help.',
        'I chose LangChain over LlamaIndex and Azure Container Apps for hosting. The RAG chain loads lazily to fix a cold-start timeout on the first request.',
      ],
      results: [
        'On a 30-question RAGAS suite with hand-written ground truth, the chatbot scores 91% faithfulness with a gpt-4o judge and 89% with gpt-4o-mini, 87% context recall and 85% answer relevancy. gpt-4o-mini marked some correct answers as unsupported, including one copied word for word from a spec sheet, which is why I report both judges.',
        'Two questions still get “I don’t have enough information” even though the answer is in the manuals. In both cases the right chunk ranked 5th, just outside the top 4, so the gap is retrieval, not generation.',
      ],
      change: [
        'Filter junk chunks (copyright footers, title pages, tables of contents) at ingestion, then add hybrid keyword and vector search so exact terms like “ZigBee” count. I’d also add a faithfulness judge from a different model family, since gpt-4o is currently grading its own answers.',
      ],
    },
  },
  {
    slug: 'bible-reading-tracker',
    title: 'Bible Reading Tracker',
    stack: 'Next.js, TypeScript, Prisma, PostgreSQL, Auth.js',
    outcome:
      'A full-stack app that helps high school students build a daily Bible reading habit, now used by 68 registered students.',
    summary:
      'Students log daily readings against a grade-specific plan and earn streaks and points; leaders get dashboards and admin tools, all self-hosted at no cost.',
    // No public link: the live app holds real students' data. Shown instead with screenshots and a
    // recording of a throwaway copy running on fake seed data, with the church's name removed.
    liveUrl: null,
    demoNote: 'Shown with demo data: the real app holds students’ information, so it isn’t open to the public.',
    showcase: {
      // Played one after another in a loop. Descriptions are short text alternatives for screen
      // readers (the clips have no sound); they are not shown on screen.
      clips: [
        {
          title: 'Log in',
          src: '/media/bible-tracker/login.webm',
          poster: '/media/bible-tracker/login-poster.webp',
          description: 'A student logs in and lands on their Today page, with a 13-day streak.',
        },
        {
          title: 'Read today’s passage',
          src: '/media/bible-tracker/read.webm',
          poster: '/media/bible-tracker/read-poster.webp',
          description:
            'The student turns on Auto-mark as read in Settings, opens today’s passage and scrolls to the end. It is marked as read automatically and the streak goes from 13 to 14 days.',
        },
        {
          title: 'Earn a milestone badge',
          src: '/media/bible-tracker/badges.webm',
          poster: '/media/bible-tracker/badges-poster.webp',
          description: 'On the Progress tab, the new 14-day milestone badge is lit next to the 7-day badge.',
        },
        {
          title: 'Catch up on a missed day',
          src: '/media/bible-tracker/catch-up.webm',
          poster: '/media/bible-tracker/catch-up-poster.webp',
          description:
            'A student who missed yesterday taps it in the Progress calendar and marks it as read late. Their streak is saved at 14 days.',
        },
      ],
    },
    metrics: {
      type: 'single',
      value: '~30',
      label: 'students complete their reading every day',
      conditions: 'of 68 registered, October 2026',
    },
    steps: [
      {
        name: 'Log a reading',
        text: 'Students open the installable web app on their phone and log the day’s reading against their grade’s plan. Reading is on the honour system.',
      },
      {
        name: 'Sign-in and roles',
        text: 'Auth.js handles username sign-in. A 4-role permission system with grade-scoped access decides what each person can see, from a student’s own progress to a leader’s whole grade.',
      },
      {
        name: 'Store',
        text: 'Readings, streaks and points are stored in PostgreSQL through Prisma.',
      },
      {
        name: 'Scheduled jobs',
        text: '4 scheduled jobs run inside the app: nightly streak resets, the event lifecycle, and push and event reminders.',
      },
      {
        name: 'Notify',
        text: 'Reminders reach students as push notifications through the Web Push API, with no third-party service.',
      },
    ],
    writeup: {
      problem: [
        'Youth leaders at a local church wanted Grade 9–12 students to keep a daily New Testament reading habit, and needed a way to see who was keeping up. It had to cost nothing to run.',
      ],
      approach: [
        'I built a full-stack app with Claude Code and Claude Design, from the database schema to sign-in to admin tools. Streaks and points keep students motivated, and a 4-role permission system with grade-scoped access covers students, group leaders and church leadership.',
        'It’s self-hosted at no cost using Docker and a persistent Tailscale tunnel, with data export and an activity log so non-technical church leadership can take it over.',
      ],
      results: [
        'After a live pilot, it’s now used by 68 registered students, with about 30 completing their reading every day.',
        'The screens on this page come from a copy running on made-up demo data.',
      ],
      change: [
        'Move hosting from my laptop to the church’s own server, so the app no longer depends on my laptop being on.',
      ],
    },
  },
  {
    slug: 'background-job-runner',
    title: 'Background Job Runner',
    stack: 'Python, FastAPI, PostgreSQL, React',
    outcome:
      'A job orchestration engine that survives crashes, built for a take-home technical assessment.',
    summary:
      'Submit a job over a REST API, get a handle back immediately, and watch it run in a concurrency-limited pool that survives restarts, with live updates over server-sent events.',
    liveUrl: 'https://job-runner-app.mangobush-0fc2a290.eastus.azurecontainerapps.io',
    demoNote: `${AZURE_NOTE} Sign in with the demo key alice-demo-key.`,
    metrics: {
      type: 'single',
      value: '9.6/10',
      label: 'take-home assessment score',
      conditions: '28 criteria',
    },
    steps: [
      {
        name: 'Submit',
        text: 'A client posts a job to the REST API with its API key. The engine allocates the lowest free handle number (like scrape-1) and returns it in well under a second, before any work starts.',
      },
      {
        name: 'Claim',
        text: 'A worker claims the next queued job with a single Postgres update that skips rows other workers have locked, and stamps a 30-second lease. A concurrency limit caps how many run at once.',
      },
      {
        name: 'Run and heartbeat',
        text: 'While the job runs, the worker renews its lease every 10 seconds. Retryable failures go back to the queue with a backoff delay.',
      },
      {
        name: 'Recover',
        text: 'If the process is killed mid-job, the lease stops being renewed. On restart, and on a timer, a reaper puts expired jobs back in the queue so they run again.',
      },
      {
        name: 'Stream',
        text: 'Every status change is published to clients over server-sent events. The React dashboard also refetches on reconnect, so the stream is a liveness hint, not the only path to the truth.',
      },
    ],
    writeup: {
      problem: [
        'A take-home assessment: build a background job runner where submitting returns a handle immediately, work runs under a concurrency limit, state survives a process restart, and clients see lifecycle events live.',
      ],
      approach: [
        'I combined atomic Postgres handle allocation with lease-based claiming and heartbeat renewal, so handles never collide when they’re recycled and a crashed job is always reclaimed.',
        'The engine has no web framework imports and only one module touches the database, which keeps the FastAPI layer a thin adapter. The API uses per-user API keys and is documented end to end.',
      ],
      results: [
        'It scored 9.6/10 on the 28-criteria assessment and passed its hardest-weighted correctness tests. The pytest suite includes a real process-kill restart test.',
      ],
      change: [
        'Let several server processes share one concurrency limit, and make jobs safe to run twice, so a real worker with side effects (like charging a card) can be retried safely.',
      ],
    },
  },
];

export const otherProjects = [
  {
    name: 'AI Crypto Trading Bot',
    line: 'A multi-agent trading system in LangGraph. I fixed a model misreading 69.5 as greater than 70 by moving number comparisons into plain Python.',
  },
  {
    name: 'Watch Timegrapher',
    line: 'McMaster capstone: owned the signal-processing module from Python prototype to C++ on a Teensy microcontroller, within 1 ms beat error.',
  },
  {
    name: 'Tournament Bracket Manager',
    line: 'A Google Sheets backend with live bracket logic, used by 460+ students over a tournament weekend.',
  },
  {
    name: 'Audiobook Player',
    line: 'A browser-only audiobook library that plays local audiobooks and reads EPUBs aloud, with all data kept on the device.',
    url: 'https://paul-shenoda.github.io/Audiobook-player/',
  },
];
