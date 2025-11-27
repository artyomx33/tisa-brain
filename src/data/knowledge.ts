// TISA Brain Knowledge Base
// All the strategic content from Luna's framework

export interface Pillar {
  id: string;
  name: string;
  shortName: string;
  priority: 'top' | 'second' | 'third' | 'supporting';
  description: string;
  keyMessages: string[];
  contentIdeas: string[];
  psychologyFit: {
    status: number; // 1-3 strength
    belonging: number;
    transformation: number;
  };
}

export interface ParentProfile {
  id: string;
  name: string;
  shortName: string;
  description: string;
  primaryDrive: 'status' | 'belonging' | 'transformation';
  fears: string[];
  aspirations: string[];
  coreSentence: string;
  bestChannels: string[];
  keyMessages: string[];
}

export interface Channel {
  id: string;
  name: string;
  purpose: string;
  psychRole: string;
  contentTypes: string[];
  tone: string;
  frequency: string;
}

export interface RedButtonMessage {
  id: string;
  message: string;
  explanation: string;
  useCase: string;
}

// ===================
// THE 9 PILLARS
// ===================

export const pillars: Pillar[] = [
  {
    id: 'category-creation',
    name: 'Category Creation: Local International School',
    shortName: 'Local International',
    priority: 'top',
    description: 'This is the PRIMARY pillar. TISA is NOT an expat school, NOT temporary, NOT soft bilingual, NOT Dutch system chaos. TISA is a long-term, stable, bilingual, academically rigorous, entrepreneurial academy for families who want more.',
    keyMessages: [
      'TISA is NOT an expat school.',
      'TISA is NOT temporary.',
      'TISA is NOT soft bilingual.',
      'TISA is a long-term, stable, bilingual, academically rigorous, entrepreneurial academy.',
      'We are the prestige local choice.'
    ],
    contentIdeas: [
      'What makes a "Local International School" different',
      'Why we built TISA for families who are staying',
      'The difference between expat transit and rooted excellence',
      'International standards, local commitment'
    ],
    psychologyFit: { status: 3, belonging: 2, transformation: 2 }
  },
  {
    id: 'entrepreneurial-mba',
    name: 'Entrepreneurial/TISA MBA Identity',
    shortName: 'Kinder MBA',
    priority: 'top',
    description: 'This is your fire. The piece NO OTHER SCHOOL can touch. Kids pitching, selling, building, doing SWOT, mental math, coding, prototypes, theatre with business context.',
    keyMessages: [
      'THIS is the school I wish I had.',
      'Children who think like founders will never fear the future.',
      'Business thinking starts at age 5.',
      'From playground to pitch deck.'
    ],
    contentIdeas: [
      'Kids doing SWOT analysis',
      'Mini pitch competitions',
      'Product prototyping sessions',
      'Mental math demonstrations',
      'Business vocabulary lessons',
      'Negotiation games',
      'How Grade 4 built a real business plan'
    ],
    psychologyFit: { status: 3, belonging: 2, transformation: 3 }
  },
  {
    id: 'selective-admissions',
    name: 'Reactance Marketing: Selective Admissions',
    shortName: 'Selective',
    priority: 'top',
    description: 'This is your enrollment engine. TISA is not for every family. We review families before we accept them. Parents chase YOU.',
    keyMessages: [
      'TISA is not for every family.',
      'We only accept applications that align with our philosophy.',
      'We review families before we accept them.',
      'We accept families who value discipline, ambition, bilingualism, and entrepreneurial thinking.'
    ],
    contentIdeas: [
      'What we look for in TISA families',
      'Why we say "no" sometimes',
      'The values interview explained',
      'Not everyone is a fit — and that\'s okay'
    ],
    psychologyFit: { status: 3, belonging: 3, transformation: 1 }
  },
  {
    id: 'academic-excellence',
    name: 'Academic Excellence (Math + Science + Languages)',
    shortName: 'Academic',
    priority: 'second',
    description: 'Singapore Math, logic, mental math, reading, languages, labs. We don\'t teach to the minimum — we teach to potential.',
    keyMessages: [
      'We don\'t teach to the minimum — we teach to potential.',
      'Math is a language. We teach it fluently.',
      'Academic rigor is not optional.',
      'Singapore Math meets entrepreneurial thinking.'
    ],
    contentIdeas: [
      'Mental math tricks kids can do',
      'Singapore Math explained',
      'Why we push beyond the standard',
      'How 7-year-olds out-calculate adults'
    ],
    psychologyFit: { status: 3, belonging: 1, transformation: 2 }
  },
  {
    id: 'bilingual-mastery',
    name: 'Bilingual Mastery (English + Dutch)',
    shortName: 'Bilingual',
    priority: 'second',
    description: 'English + Dutch every day. Integration through language. Not a bubble — a bridge.',
    keyMessages: [
      'English is the world. Dutch is your home.',
      'We integrate through language.',
      'We are not a bubble — we are a bridge.',
      'True bilingualism, not translation.'
    ],
    contentIdeas: [
      'A day in two languages',
      'How bilingual brains develop faster',
      'Dutch integration without losing global skills',
      'The bridge between worlds'
    ],
    psychologyFit: { status: 2, belonging: 3, transformation: 2 }
  },
  {
    id: 'confidence-theatre',
    name: 'Confidence: Theatre, Literature, Public Speaking',
    shortName: 'Confidence',
    priority: 'second',
    description: 'The hidden luxury signal. Parents LOVE this. Confidence is learned early.',
    keyMessages: [
      'Confidence is learned early.',
      'Children speak, perform, debate — weekly.',
      'We teach public speaking before puberty.',
      'Your child will never fear a boardroom.'
    ],
    contentIdeas: [
      'Why theatre matters for business',
      'Weekly debate sessions',
      'From shy to speaker in one year',
      'Confidence building in action'
    ],
    psychologyFit: { status: 2, belonging: 3, transformation: 3 }
  },
  {
    id: 'teddy-pathway',
    name: 'Emotional Integration (Teddy Kids x TISA)',
    shortName: 'Teddy → TISA',
    priority: 'third',
    description: 'The wrap-around system: Childcare → School → After-school MBA → Summer → Holidays. One price, one philosophy, one path.',
    keyMessages: [
      'From diapers to diplomas — under one roof.',
      'One philosophy from age 0 to 12.',
      'The only seamless educational journey.',
      'Your family grows with us.'
    ],
    contentIdeas: [
      'The Teddy Kids to TISA journey',
      'Why continuity matters',
      'One family, one system',
      'Building on foundations'
    ],
    psychologyFit: { status: 1, belonging: 3, transformation: 3 }
  },
  {
    id: 'ai-tech',
    name: 'AI/Tech-Forward Identity',
    shortName: 'Tech/AI',
    priority: 'third',
    description: 'Your signature. No one else has it. LMS systems, AI curriculum, automation, apps, AI training for children.',
    keyMessages: [
      'The only school in NL built by founders fluent in AI, tech, education, and construction.',
      'We don\'t just teach tech — we build with it.',
      'Future-ready is not a slogan, it\'s our DNA.',
      'AI-powered education, human-centered values.'
    ],
    contentIdeas: [
      'How we use AI in curriculum',
      'Kids learning with technology',
      'Building our own educational tools',
      'The tech behind TISA'
    ],
    psychologyFit: { status: 3, belonging: 1, transformation: 2 }
  },
  {
    id: 'deep-authority',
    name: 'Deep Authority (Brainport x Municipal x ASML)',
    shortName: 'Authority',
    priority: 'supporting',
    description: 'Brainport alignment, municipal partnerships, ASML connection. Political + corporate support.',
    keyMessages: [
      'Brainport needs innovation schools, not more buildings.',
      'TISA is small but fast — exactly the model needed.',
      'Hybrid teachers, AI integration, entrepreneurship — all aligned with Eindhoven needs.',
      'Endorsed by the ecosystem.'
    ],
    contentIdeas: [
      'TISA\'s Brainport alignment',
      'Partnership announcements',
      'Why municipalities choose TISA',
      'Meeting with education leaders'
    ],
    psychologyFit: { status: 3, belonging: 2, transformation: 1 }
  }
];

// ===================
// PARENT PROFILES
// ===================

export const parentProfiles: ParentProfile[] = [
  {
    id: 'bio-science',
    name: 'Bio Science / Brainport Professionals',
    shortName: 'Scientists',
    description: 'Status-seeking professionals from Bio Science Park, universities, Brainport ecosystem. High achievers who want prestige education.',
    primaryDrive: 'status',
    fears: [
      'Their child falling behind internationally',
      'Being stuck in a mediocre Dutch system',
      'Not maximizing their child\'s potential'
    ],
    aspirations: [
      'Elite education without elite prices',
      'Global-ready children',
      'Being seen as a smart, forward-thinking parent'
    ],
    coreSentence: 'I choose TISA because I\'m the kind of parent who invests in future-proof education.',
    bestChannels: ['LinkedIn', 'Website', 'Word of mouth'],
    keyMessages: [
      'Academic excellence meets entrepreneurial thinking',
      'Brainport-aligned education',
      'The school for families who think ahead'
    ]
  },
  {
    id: 'expat',
    name: 'Expats Moving to NL',
    shortName: 'Expats',
    description: 'International families relocating to Netherlands. Need stability, quality, and integration support.',
    primaryDrive: 'belonging',
    fears: [
      'Their child not integrating',
      'Temporary, unstable schooling',
      'Losing educational progress in transition'
    ],
    aspirations: [
      'Smooth transition for their family',
      'Dutch integration without losing global edge',
      'Finding their tribe in a new country'
    ],
    coreSentence: 'I choose TISA because it gives my child roots and wings.',
    bestChannels: ['Instagram', 'Google Search', 'Expat groups'],
    keyMessages: [
      'Not a transit school — your long-term home',
      'Dutch + English = true integration',
      'A community that welcomes you'
    ]
  },
  {
    id: 'local-upgrade',
    name: 'Local Parents Upgrading',
    shortName: 'Local Upgraders',
    description: 'Dutch or long-term resident families frustrated with the traditional Dutch system. Want more for their children.',
    primaryDrive: 'transformation',
    fears: [
      'Their child being held back by system limitations',
      'Missing out on what international schools offer',
      'Their child becoming "just average"'
    ],
    aspirations: [
      'Breaking free from mediocrity',
      'Giving their child competitive advantage',
      'Being part of something exceptional'
    ],
    coreSentence: 'I choose TISA because my child deserves more than the standard path.',
    bestChannels: ['Instagram', 'TikTok', 'Local community'],
    keyMessages: [
      'International quality, local commitment',
      'Why settle for average?',
      'The upgrade your family deserves'
    ]
  },
  {
    id: 'teddy-pathway',
    name: 'Teddy Kids Families',
    shortName: 'Teddy Parents',
    description: 'Families already in Teddy Kids daycare looking for continuity. Trust the philosophy, want seamless transition.',
    primaryDrive: 'belonging',
    fears: [
      'Disrupting what\'s working',
      'Starting over somewhere new',
      'Losing the community they love'
    ],
    aspirations: [
      'Seamless growth for their child',
      'Staying in the "family"',
      'Natural progression of values'
    ],
    coreSentence: 'I choose TISA because it\'s the natural next step for our family.',
    bestChannels: ['Direct communication', 'Parent events', 'Teddy Kids channels'],
    keyMessages: [
      'From diapers to diplomas',
      'One philosophy, one journey',
      'Your Teddy family grows with you'
    ]
  },
  {
    id: 'early-planners',
    name: 'Early Planners (3-4 year olds)',
    shortName: 'Early Planners',
    description: 'Forward-thinking parents of toddlers already researching schools. Want to secure the best spot early.',
    primaryDrive: 'status',
    fears: [
      'Missing out on good spots',
      'Not being prepared',
      'Making the wrong choice'
    ],
    aspirations: [
      'Being ahead of other parents',
      'Securing the best for their child',
      'Making a strategic decision'
    ],
    coreSentence: 'I choose TISA early because smart parents plan ahead.',
    bestChannels: ['Instagram', 'Google Search', 'Parenting forums'],
    keyMessages: [
      'The parents who plan ahead choose TISA',
      'Limited spots for exceptional families',
      'Your child\'s future starts now'
    ]
  },
  {
    id: 'academic-redemption',
    name: 'Academic Redemption Seekers',
    shortName: 'Redemption Parents',
    description: 'Parents who hated traditional school and want something radically better for their children.',
    primaryDrive: 'transformation',
    fears: [
      'Their child having the same bad experience',
      'Repeating generational patterns',
      'School killing their child\'s creativity'
    ],
    aspirations: [
      'Breaking the cycle',
      'Giving what they never had',
      'Seeing their child thrive where they struggled'
    ],
    coreSentence: 'I choose TISA because I refuse to let my child have the education I had.',
    bestChannels: ['Instagram', 'TikTok', 'Emotional content'],
    keyMessages: [
      'The school you wish you had',
      'Education that celebrates, not crushes',
      'A different story for your child'
    ]
  }
];

// ===================
// CHANNELS
// ===================

export const channels: Channel[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    purpose: 'Main brand engine. Parent education + school showcase + category creation.',
    psychRole: 'Identity & Status — show who your child becomes and what tribe you join.',
    contentTypes: ['Reels', 'Carousels', 'Authority posts', 'Testimonials', 'Behind-the-scenes'],
    tone: 'Aspirational, confident, cinematic, prestige',
    frequency: '5-6x weekly'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    purpose: 'Viral engine. Cool entrepreneurial kids, mini CEOs, wow learning moments.',
    psychRole: 'Emotional proof → Transformation. Show the wow.',
    contentTypes: ['Kids explaining business', 'Mental math flexes', 'Prototypes', 'Teacher reactions'],
    tone: 'High-energy, kid-led, fast, fun',
    frequency: '3-5x weekly'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    purpose: 'Authority + long-form. Build deep trust + showcase curriculum.',
    psychRole: 'Deep belief-building — Inside TISA MBA, How we teach, Why we built this.',
    contentTypes: ['3-5 min explainers', 'Day at TISA', 'Founder story', 'Method deep-dives'],
    tone: 'Premium documentary, serious, authoritative',
    frequency: '1-2x weekly'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    purpose: 'Eindhoven + corporate + Brainport positioning.',
    psychRole: 'Macro-status for TISA as an institution.',
    contentTypes: ['Pitch updates', 'Partnership news', 'Industry insights', 'Achievement showcases'],
    tone: 'Serious, powerful, strategic, professional',
    frequency: '2-3x weekly'
  },
  {
    id: 'website',
    name: 'Website',
    purpose: 'Ultimate conversion machine. The final mirror.',
    psychRole: 'Parent lands and thinks: "Yes, this is exactly the kind of environment I want."',
    contentTypes: ['Category creation', 'Pillars', 'Testimonials', 'Admissions process', 'Pricing'],
    tone: 'Prestige, confident, minimalist',
    frequency: 'Always updated'
  },
  {
    id: 'in-school',
    name: 'In-School Experience',
    purpose: 'The silent seller. Make parents FEEL the philosophy when they enter.',
    psychRole: 'Visual + emotional proof of everything promised.',
    contentTypes: ['Wall displays', 'Student projects', 'Entrepreneur boards', 'TISA Codes'],
    tone: 'Premium, entrepreneurial, bilingual, clean',
    frequency: 'Permanent'
  }
];

// ===================
// RED BUTTON MESSAGES
// ===================

export const redButtonMessages: RedButtonMessage[] = [
  {
    id: 'not-temporary',
    message: 'TISA is not temporary.',
    explanation: 'We are a long-term international local academy — not an expat transit school.',
    useCase: 'When parents ask about stability, long-term commitment, or compare to other international schools.'
  },
  {
    id: 'selective',
    message: 'TISA is selective.',
    explanation: 'We accept families who value discipline, ambition, bilingualism, and entrepreneurial thinking.',
    useCase: 'When positioning admissions, during tours, in any content about enrollment.'
  },
  {
    id: 'high-performance',
    message: 'TISA is a high-performance environment.',
    explanation: 'We don\'t slow children down — we accelerate them.',
    useCase: 'When discussing academic approach, curriculum, or differentiation from other schools.'
  }
];

// ===================
// PSYCHOLOGY FRAMEWORK
// ===================

export const psychologyDrivers = {
  status: {
    name: 'Status',
    description: 'The parent\'s desire to be seen as smart, forward-thinking, successful.',
    coreTrigger: 'I\'m the kind of parent who...',
    contentAngles: [
      'Prestige associations',
      'Exclusive access',
      'Smart choice validation',
      'Being ahead of others',
      'Expertise and excellence'
    ],
    examplePhrases: [
      'For parents who think ahead',
      'The choice of ambitious families',
      'Where forward-thinking parents choose',
      'Not everyone qualifies'
    ]
  },
  belonging: {
    name: 'Belonging',
    description: 'The desire to be part of a tribe, community, something bigger.',
    coreTrigger: 'We are part of...',
    contentAngles: [
      'Community building',
      'Shared values',
      'Family feeling',
      'Integration',
      'Being welcomed'
    ],
    examplePhrases: [
      'Join families like yours',
      'A community that gets it',
      'Your tribe is here',
      'We grow together'
    ]
  },
  transformation: {
    name: 'Transformation',
    description: 'The promise of what the child (and parent) will become.',
    coreTrigger: 'My child will become...',
    contentAngles: [
      'Before/after stories',
      'Skill development',
      'Confidence building',
      'Future potential',
      'Breaking patterns'
    ],
    examplePhrases: [
      'Watch them transform',
      'From today to tomorrow',
      'The child they\'re meant to be',
      'Unlock their potential'
    ]
  }
};

// ===================
// CONTENT TEMPLATES
// ===================

export const contentTemplates = {
  instagram: {
    teaching: {
      name: 'Teaching Content',
      structure: `[HOOK - Stop the scroll]
      
[MAIN POINT 1]

[MAIN POINT 2]

[MAIN POINT 3]

[CALL TO ACTION]

[HASHTAGS]`,
      example: `Most schools teach kids to follow instructions.

We teach them to give instructions.

Here's what 8-year-olds learn in TISA MBA:
→ How to identify a problem worth solving
→ How to pitch an idea in 60 seconds
→ How to handle "no" and try again

Because confidence isn't taught.
It's practiced.

Want to see it in action? Book a tour. Link in bio.

#TISASchool #KinderMBA #EntrepreneurialEducation #LeidenSchools #FutureReady`
    },
    caseFile: {
      name: 'Case File (Proof)',
      structure: `[THE SETUP - What happened]

[THE PROCESS - How they did it]

[THE RESULT - What they achieved]

[THE TAKEAWAY - Why it matters]`,
      example: `Last week, Grade 5 had a challenge:

"Build something that solves a problem at home."

72 hours later, they presented:
• A shoe rack that reminds you to clean them
• A plant watering system for busy parents
• A homework station organizer

Real problems. Real prototypes. Real pitches.

This is TISA MBA in action.`
    },
    philosophy: {
      name: 'Philosophy (The Why)',
      structure: `[BOLD STATEMENT]

[EXPLANATION]

[CONTRAST WITH NORMAL]

[OUR APPROACH]

[INVITATION]`,
      example: `We don't slow children down.

We accelerate them.

While other schools teach to the minimum, we teach to potential.

Every child at TISA is challenged at THEIR level.
Not held back by the average.
Not left behind by the pace.

This is what education should be.

Agree? Let's talk.`
    }
  }
};

// Helper functions
export function getPillarById(id: string): Pillar | undefined {
  return pillars.find(p => p.id === id);
}

export function getProfileById(id: string): ParentProfile | undefined {
  return parentProfiles.find(p => p.id === id);
}

export function getChannelById(id: string): Channel | undefined {
  return channels.find(c => c.id === id);
}

export function getPillarsByPriority(priority: Pillar['priority']): Pillar[] {
  return pillars.filter(p => p.priority === priority);
}

export function getProfilesByDrive(drive: ParentProfile['primaryDrive']): ParentProfile[] {
  return parentProfiles.filter(p => p.primaryDrive === drive);
}
