export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  lessons: string;
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  imageUrl: string;
}

export interface Resource {
  slug: string;
  title: string;
  category: string;
  description: string;
  downloadUrl: string;
  overview: string;
  version: string;
  updates: string[];
  installation: string[];
  faqs: { q: string; a: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  summary: string;
  tags: string[];
  coverUrl: string;
  content: string;
}

export interface PromptItem {
  category: string;
  title: string;
  prompt: string;
  description: string;
}

export interface UsesCategory {
  category: string;
  items: { name: string; spec: string; description: string }[];
}

export const projects: Project[] = [
  {
    slug: 'memovault',
    title: 'MemoVault',
    description: 'An end-to-end encrypted AI-powered memory repository and semantic note-taking assistant.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    longDescription: 'MemoVault is designed for individuals who require strict privacy but desire the power of modern LLM search and organization. Instead of uploading personal notes to cloud servers, MemoVault vectorizes, encrypts, and indexes all notes directly on-device.',
    problem: 'Existing semantic note-taking tools send private diary logs and personal notes to external LLM servers, compromising data ownership. Plain-text options lack the ability to cluster thoughts or search by conceptual meaning.',
    solution: 'Built a local-first browser-based notebook that loads client-side sentence-transformer embeddings via Web Workers. Data is saved in an encrypted local database, enabling semantic search and automatic connection visualization entirely offline.',
    features: [
      'On-device local vector embeddings with zero external APIs',
      'End-to-end password-derived SQLite database encryption',
      'Dynamic bi-directional graph mapping showing clusters of related memories',
      'Smart capture widget with markdown support'
    ],
    architecture: 'Next.js App Router for UI presentation, SQLite + SQL.js for relational storage, Transformers.js (ONNX Runtime) for browser-based text embeddings, and Framer Motion for interactive node-graph visualizers.',
    challenges: 'Running a 33M parameter embedding model on mobile browsers caused significant page freezes and thread blocking.',
    lessons: 'Leveraging Web Workers allowed us to offload LLM calculations from the main execution thread, keeping interface updates smooth and responsiveness under 16ms.',
    techStack: ['Next.js', 'TypeScript', 'Transformers.js', 'SQLite', 'TailwindCSS', 'Framer Motion'],
    demoUrl: 'https://memovault.example.com',
    githubUrl: 'https://github.com/therajatdua/memovault'
  },
  {
    slug: 'expense-tracker',
    title: 'Expense Tracker',
    description: 'A keyboard-first automated expense command console integrated with iOS Shortcuts.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    longDescription: 'A custom finance operating interface designed to minimize input friction. Logs can be recorded globally via a hotkey console, or instantly from an iPhone home screen using custom Siri-enabled iOS Shortcuts.',
    problem: 'Logging finances fails when the app requires multiple clicks, categories selection, and loading screens. Users drop off because of the input time friction.',
    solution: 'Created a keyboard-first terminal interface where a user types a command (e.g., "12 dinner with team #social") to parse amounts, categories, and tags immediately. Provided an API webhook to pipe logs directly from iOS Shortcuts.',
    features: [
      'Single-string input parser that extracts values, labels, and tags',
      'Native iOS Shortcut widget for quick capturing on-the-go',
      'Clean data visualization using interactive light graphs',
      'Local CSV exporting capability'
    ],
    architecture: 'Next.js App Router, Tailwind CSS for strict light/dark layouts, custom parser utilities in TypeScript, and local storage state persistence.',
    challenges: 'Parsing complex natural language inputs accurately (e.g. distinguishing dates from prices) without introducing slow and expensive LLM lookups.',
    lessons: 'Writing deterministic regex parsers and lexical tokenizers solved 95% of common user inputs instantly and without token latency.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'iOS Shortcuts', 'Framer Motion'],
    demoUrl: '/expense-tracker',
    githubUrl: 'https://github.com/therajatdua/expense-tracker'
  },
  {
    slug: 'khabri',
    title: 'Khabri',
    description: 'An autonomous AI agent summarizing global newsletters, RSS feeds, and podcasts into daily briefings.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    longDescription: 'Khabri acts as a private news intelligence agent. It monitors chosen tech journals, newsletters, and podcasts, clusters news by thematic importance, and generates a personalized high-signal briefing audio file every morning.',
    problem: 'Professionals face information overload from hundreds of tech newsletters. Most articles are low-value, duplicate topics, or clickbait.',
    solution: 'Designed an autonomous backend pipeline that scrapes RSS feeds and newsletters, clusters stories based on semantic similarity, filters out low-signal topics, and generates a cohesive brief utilizing OpenAI and text-to-speech models.',
    features: [
      'Autonomous feed scraping and topic-clustering pipelines',
      'LLM-based semantic filtering (clickbait removal)',
      'Personalized audio brief generation via high-fidelity voice models',
      'E-ink friendly dashboard UI'
    ],
    architecture: 'Python and FastAPI for agent execution, LangGraph for pipeline orchestration, Next.js for dashboard UI, and TailwindCSS for responsive screen layouts.',
    challenges: 'Managing API costs when processing hundreds of articles daily and avoiding repetitive agent loops.',
    lessons: 'Implementing structured database caching and preprocessing with smaller models before passing content to LLMs reduced operational costs by 84%.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Python', 'LangChain', 'OpenAI API'],
    demoUrl: 'https://khabri.example.com',
    githubUrl: 'https://github.com/therajatdua/khabri'
  }
];

export const resources: Resource[] = [
  {
    slug: 'expense-tracker-shortcut',
    title: 'Expense Tracker Shortcut',
    category: 'iOS Shortcuts',
    description: 'The native iOS shortcut that lets you log expenses directly via Siri or your home screen widget.',
    downloadUrl: 'https://icloud.com/shortcuts/example-expense',
    overview: 'A deep iOS integration script that allows logging expenses straight into your digital dashboard in under 2 seconds. Tap the widget, type or speak your expense, and the shortcut parses and uploads the text.',
    version: 'v1.2.0',
    updates: [
      'Added voice dictate configuration',
      'Supported automatic tag separation by hashtag symbols',
      'Fixed timezone mismatch bugs'
    ],
    installation: [
      'Install the official iOS Shortcuts app if not already on your iPhone.',
      'Tap the Download button above to add this shortcut to your gallery.',
      'During setup, input your personal Expense Tracker endpoint URL.',
      'Trigger by tapping the widget or saying: "Hey Siri, log expense".'
    ],
    faqs: [
      { q: 'Is my financial data secure?', a: 'Yes. All data passes directly from your device to your self-hosted tracker API endpoint. No third party ever sees your entries.' },
      { q: 'Can I log multiple items at once?', a: 'Yes, separate each purchase with a new line, and the shortcut will execute bulk logging requests.' }
    ]
  },
  {
    slug: 'shortcut-library',
    title: 'Shortcut Library',
    category: 'Productivity',
    description: 'A library of 10+ iOS shortcuts optimizing capture workflows, recording audio diaries, and automating AI transcriptions.',
    downloadUrl: 'https://github.com/therajatdua/shortcuts',
    overview: 'A curated collection of productivity macros built to supercharge iPhone usage. Includes utilities for YouTube transcript fetching, quick text-to-speech rendering, and calendar agenda summaries.',
    version: 'v2.0.1',
    updates: [
      'Added "Capture Audio Journal" which transcribes speech and uploads to Notion',
      'Optimized RSS reader feeds parsing speed'
    ],
    installation: [
      'Clone the github repository or download individual iCloud links inside the repo README.',
      'Enable "Allow Untrusted Shortcuts" in your iOS System Settings.'
    ],
    faqs: [
      { q: 'Do these require third-party apps?', a: 'Most run on native iOS features, but AI-based utilities require setting up your personal OpenAI API Key in the shortcut config.' }
    ]
  },
  {
    slug: 'prompt-collection',
    title: 'Prompt Collection',
    category: 'AI Engineering',
    description: 'The exact system and user prompts used to orchestrate Khabri and MemoVault, optimized for structured JSON outputs.',
    downloadUrl: '/prompts',
    overview: 'A structured vault of engineered prompts designed for production-level reliability. Focuses on forcing LLMs to output strict, parsing-friendly JSON schemas without verbose descriptions.',
    version: 'v4.1.0',
    updates: [
      'Optimized token usages for Claude 3.5 Sonnet structure calls',
      'Added few-shot examples for hierarchical summarization pipelines'
    ],
    installation: [
      'Click the prompts navigation link to copy-paste prompts directly.',
      'Review instructions on setting up system vs user prompt partitions in your LLM wrapper.'
    ],
    faqs: [
      { q: 'Do these prompts work on open-weight models?', a: 'Yes, they have been validated on Llama-3-70B and Mistral-Large, though schema adherence is highest on GPT/Claude.' }
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'keyboard-first-interfaces',
    title: 'Designing Keyboard-First Web Interfaces',
    date: 'August 1, 2026',
    readingTime: '5 min',
    summary: 'Why friction-free input matters and how to design Raycast-like command navigation in modern web applications.',
    tags: ['Design System', 'React', 'UX'],
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    content: `
Keyboard-first design is not just an accessibility requirement; it is a superpower for power users. When building tools that developers use daily, reducing the friction of clicking around complex layouts can increase productivity tenfold.

### The Problem with Click-Heavy UIs
Most dashboards force users to navigate through multi-layered menus. This context switching disrupts focus and increases cognitive load. Imagine if code editors forced you to click a button every time you wanted to save a file.

### How to Implement Command Navigation
The solution is simple: centralize operations into a command palette. Using hotkeys like \`⌘K\` or \`Ctrl+K\`, users can access any page, change settings, or trigger actions immediately.

Here is a checklist of critical requirements for keyboard navigation:
1. **Focus Management:** When the palette opens, focus must shift to the input field instantly.
2. **Deterministic Hotkeys:** Do not override standard browser behaviors (like page refresh or history navigation).
3. **Optimized Render:** Matching results must be filtered under 10ms to feel instantaneous.

\`\`\`typescript
// Catching global keyboard shortcuts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen(prev => !prev);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
\`\`\`

By giving users command of their software without breaking their hands away from the keyboard, we design experiences that feel like extensions of their thoughts.
`
  },
  {
    slug: 'on-device-ml',
    title: 'On-Device Machine Learning with Transformers.js',
    date: 'July 12, 2026',
    readingTime: '8 min',
    summary: 'Running embedding models directly in the user\'s browser to build secure, private search engines without high server hosting bills.',
    tags: ['AI', 'Web Dev', 'Privacy'],
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    content: `
Serverless databases and LLMs are expensive. For single-user applications like secure notes apps or local diaries, running inference on cloud servers introduces unnecessary costs and serious privacy concerns.

### The Browser as a Runtime
Modern browsers support WebAssembly (Wasm) and WebGPU, making them highly efficient targets for machine learning models. Using library wrappers like **Transformers.js**, we can run complete ONNX-runtime model files inside client browsers.

### Generating Embeddings Locally
For semantic search, we need to map sentences to high-dimensional space vector embeddings. A small model like \`Xenova/all-MiniLM-L6-v2\` is only 90MB, which loads into browser memory in less than 2 seconds.

### The Web Worker Pattern
Running these models on the UI thread causes severe lag. To prevent this, offload the initialization and execution into a dedicated Web Worker:

\`\`\`javascript
// worker.js
import { pipeline } from '@xenova/transformers';

let embedder;

self.addEventListener('message', async (event) => {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  
  const output = await embedder(event.data.text, {
    pooling: 'mean',
    normalize: true
  });
  
  self.postMessage({ embedding: Array.from(output.data) });
});
\`\`\`

With local execution, users enjoy complete privacy (data never leaves their CPU) and creators benefit from \$0 server maintenance bills.
`
  },
  {
    slug: 'building-khabri-agent',
    title: 'How I Built Khabri: An Autonomous Tech Briefing Agent',
    date: 'June 25, 2026',
    readingTime: '12 min',
    summary: 'A deep dive into orchestration pipelines, token cost optimization, and visual output styling for personal newsletters.',
    tags: ['AI Agents', 'Next.js', 'Python'],
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    content: `
Khabri was born out of frustration. I subscribed to 40 newsletters, but read less than 5% of them. I wanted a personal agent that would pre-read everything, filter out low-value content, extract actionable items, and read it to me like a podcast during my morning run.

### Pipeline Orchestration
To solve this, I designed a simple autonomous system in Python using **LangGraph**:
1. **Scraper:** Regularly extracts article feeds and parses HTML bodies.
2. **Filter:** Matches semantic embeddings of texts against user preferences to discard irrelevant content.
3. **Summarizer:** Synthesizes the raw data into bullet-point briefs using GPT-4o-mini.
4. **TTS voice engine:** Converts textual output into an audio mp3 using natural voice profiles.

### Reducing API Costs
If you parse 100 articles completely with a frontier model daily, API costs quickly spiral. Khabri solves this by using a two-stage filter:
- First, it evaluates the article title and meta description using cheap regex classifiers.
- Second, it embeds the title to check semantic similarity, only processing full articles that match target thresholds.

This reduced monthly costs by over 80% while retaining high summaries precision. The final brief dashboard acts as an interface that renders text beautifully, making consumption clean and effortless.
`
  }
];

export const prompts: PromptItem[] = [
  {
    category: 'Structured JSON Outputs',
    title: 'JSON Parsing Enforcer',
    prompt: `You are a strict data-extraction engine. Extract all entities, prices, dates, and categories from the input text.
Return ONLY a valid JSON object matching this schema:
{
  "amount": number,
  "category": string,
  "date": string (ISO format),
  "tags": string[],
  "description": string
}
Do not write explanations, markdown blocks, or text outside the JSON structure. If an item cannot be extracted, set its value to null.`,
    description: 'Forces LLMs to return parsable, clean JSON schemas without prefaces.'
  },
  {
    category: 'Summarization',
    title: 'Hierarchical Newsletter Summarizer',
    prompt: `Analyze the following newsletter contents and generate a summary structure:
1. One-line headline (executive view).
2. Key takeaways: max 3 bullet points, each under 15 words.
3. Technical impact level: Low, Medium, or High, with a one-sentence rationale.
4. Code references or architectural snippets mentioned.
Write concisely. Keep the tone clinical, objective, and technical.`,
    description: 'Perfect for news feeds and RSS clustering summaries.'
  },
  {
    category: 'Coding & Architecture',
    title: 'System Boundary Spec Writer',
    prompt: `Review the proposed feature requirements and output a system architecture specification:
1. Define the service boundaries (what handles storage, computation, and rendering).
2. List external API routes and exact payload schemas.
3. Call out state synchronization hazards between client and database.
4. Detail the failover state (what happens when network connection is severed).`,
    description: 'Guides AI in mapping clear architectural scopes for new features.'
  }
];

export const uses: UsesCategory[] = [
  {
    category: 'Hardware & Workspace',
    items: [
      { name: 'MacBook Pro 16" (M3 Max)', spec: '64GB RAM, 2TB SSD', description: 'The absolute workhorse for local embedding model fine-tuning and running compilation tasks.' },
      { name: 'Keychron Q1 Max Keyboard', spec: 'Gateron Banana Switches', description: 'Custom mechanical typing experience with silent tactile switches.' },
      { name: 'Logitech MX Master 3S', spec: 'Pale Grey', description: 'Ergonomic precision mouse. Essential for scroll efficiency.' },
      { name: 'Dell UltraSharp 32" 4K Monitor', spec: 'U3223QE IPS Black', description: 'Extremely high contrast and accurate color representation for UI designs.' }
    ]
  },
  {
    category: 'Software & IDEs',
    items: [
      { name: 'Visual Studio Code', spec: 'Custom minimal theme', description: 'Development environment configured with custom keybindings and no visual sidebar buttons.' },
      { name: 'Warp Terminal', spec: 'Modern GPU accelerated', description: 'Modern shell environment with built-in command lookup workflows.' },
      { name: 'Figma', spec: 'Desktop Client', description: 'Where every operating system interface layout starts before writing code.' },
      { name: 'Arc Browser', spec: 'Minimalist Workspace UI', description: 'Browser interface that hides tabs and clutter, allowing focus on local servers.' }
    ]
  },
  {
    category: 'AI Tooling',
    items: [
      { name: 'Cursor AI', spec: 'Composer mode', description: 'Integrates local code context directly into generation models for faster refactoring.' },
      { name: 'Anthropic Claude API', spec: '3.5 Sonnet', description: 'Primary reasoning model used for logic structuring and writing detailed schemas.' },
      { name: 'OpenAI API client', spec: 'GPT-4o-mini', description: 'Cost-efficient inference used in Khabri for daily newsletter summaries.' }
    ]
  }
];

export const now = {
  lastUpdated: 'August 2026',
  currentlyBuilding: [
    { title: 'MemoVault Graph', description: 'Refining local WebGPU rendering speeds for dynamic node graphs on mobile devices.' },
    { title: 'Next.js OS framework', description: 'Packaging this portfolio boilerplate as a clean open-source starter kit.' }
  ],
  learning: [
    'Advanced systems design (specifically high-concurrency event parsing databases).',
    'Rust for system-level web tooling compilation integrations.'
  ],
  reading: [
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann' },
    { title: 'Less and More: The Design Ethos of Dieter Rams', author: 'Klaus Klemp' }
  ],
  creating: [
    'Monthly technical essays exploring localized machine learning.',
    'Sharing developer workflow automations on YouTube.'
  ]
};

export const resume = {
  name: 'Rajat Dua',
  role: 'Software Engineer & Product Developer',
  contact: {
    email: 'rajat@example.com',
    location: 'San Francisco, CA',
    github: 'github.com/therajatdua',
    linkedin: 'linkedin.com/in/therajatdua'
  },
  summary: 'Product-focused Software Engineer specializing in creating minimal, high-utility digital interfaces and local-first AI applications. Proven track record of reducing system input friction and orchestrating autonomous LLM pipelines.',
  experience: [
    {
      company: 'Product Launch Studio',
      role: 'Founding Engineer',
      period: '2024 — Present',
      bullets: [
        'Built dynamic Next.js dashboards scaling to 15,000+ daily active users.',
        'Reduced client-side rendering bundle sizes by 42% utilizing code-splitting and state optimizations.',
        'Engineered an on-device OCR transcription pipeline using WASM, eliminating expensive backend processing costs.'
      ]
    },
    {
      company: 'AI Automation Labs',
      role: 'Frontend Architect',
      period: '2022 — 2024',
      bullets: [
        'Designed reusable design systems in React and Tailwind CSS matching strict AAA accessibility standards.',
        'Integrated asynchronous search palettes and shortcuts reducing task-completion times by 30%.',
        'Built automated testing suites reducing continuous integration failure rates to zero.'
      ]
    }
  ],
  education: [
    {
      institution: 'University of Computer Science',
      degree: 'B.S. in Computer Science',
      period: '2018 — 2022'
    }
  ],
  skills: [
    { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Rust (Basic)', 'HTML/CSS'] },
    { category: 'Frameworks & Tools', items: ['Next.js', 'React', 'Node.js', 'TailwindCSS', 'Framer Motion', 'Git', 'SQLite'] },
    { category: 'AI Tools', items: ['LangChain', 'ONNX Runtime', 'Transformers.js', 'Vector Databases'] }
  ]
};
