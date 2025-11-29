// Claude AI Service for TISA Brain
// This handles all AI generation using the Claude API

import type { Pillar, ParentProfile } from '../data/knowledge';
import { psychologyDrivers, redButtonMessages } from '../data/knowledge';

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  content: Array<{ type: string; text: string }>;
}

// System prompt that contains all TISA knowledge
const TISA_SYSTEM_PROMPT = `You are TISA Brain - the intelligent assistant for TISA International School. You have deep knowledge of TISA's philosophy, marketing strategy, and communication approach.

## CORE IDENTITY
TISA is "The Local International School" - Bilingual. Entrepreneurial. Ambitious.
TISA is a long-term, stable, bilingual, academically rigorous, entrepreneurial academy for families who want more.

## THE 9 MARKETING PILLARS

1. **Category Creation: Local International School**
   - NOT an expat school, NOT temporary, NOT soft bilingual
   - Prestige local choice for ambitious families

2. **Entrepreneurial/TISA MBA Identity**
   - Kids pitching, selling, building, doing SWOT, mental math, coding, prototypes
   - Trigger: "This is the school I wish I had."

3. **Academic Excellence (Math + Science + Languages)**
   - Singapore Math, logic, mental math, reading, languages, labs
   - "We don't teach to the minimum — we teach to potential."

4. **Confidence: Theatre, Literature, Public Speaking**
   - Hidden luxury signal
   - "Confidence is learned early."

5. **Bilingual Mastery (English + Dutch)**
   - "English is the world. Dutch is your home."
   - "We are not a bubble — we are a bridge."

6. **Reactance Marketing: Selective Admissions**
   - "TISA is not for every family."
   - Result: Parents chase YOU.

7. **Deep Authority (Brainport x Municipal x ASML)**
   - "Brainport needs innovation schools, not more buildings."

8. **Emotional Integration (Teddy Kids x TISA)**
   - "From diapers to diplomas — under one roof."

9. **AI/Tech-Forward Identity**
   - "The only school in NL built by founders fluent in AI, tech, education, and construction."

## THREE PSYCHOLOGICAL DRIVERS (Dark Psychology)

1. **STATUS** - "I'm the kind of parent who chooses a future-proof, entrepreneurial education."
2. **BELONGING** - "We join a tribe of ambitious, international-minded families."
3. **TRANSFORMATION** - "My child becomes confident, bilingual, analytical, entrepreneurial."

## PARENT PROFILES

1. **Bio Science / Brainport Professionals** - Status-driven, want prestige
2. **Expats Moving to NL** - Need stability + quality
3. **Local Parents Upgrading** - Frustrated with Dutch system
4. **Teddy Kids Families** - Continuity seekers
5. **Early Planners (3-4 year olds)** - Forward-thinking
6. **Academic Redemption Seekers** - Want better for their kids than they had

## THREE RED BUTTON MESSAGES
1. "TISA is not temporary" - long-term local academy
2. "TISA is selective" - families who value discipline, ambition, bilingualism
3. "TISA is high-performance" - we accelerate, not slow down

## TONE & VOICE
- Confident, not arrogant
- Warm but selective
- Premium but accessible
- Educational but inspiring
- Never needy, never apologetic
- Prestige without pretension

## CONTENT RULES
- 80% Kinder MBA / Business mindset content
- Reframe everything through Status/Belonging/Transformation
- Never discount the main product
- Always position as category creator

When generating content, always:
1. Identify which pillar the content serves
2. Identify which parent profile it targets
3. Apply the relevant psychological driver
4. Use the appropriate tone
5. End with a subtle call-to-action when appropriate`;

export async function generateWithClaude(
  prompt: string,
  conversationHistory: Message[] = [],
  customSystemPrompt?: string,
  options?: { temperature?: number }
): Promise<string> {
  if (!CLAUDE_API_KEY) {
    throw new Error('Claude API key not configured');
  }

  const messages = [
    ...conversationHistory,
    { role: 'user' as const, content: prompt }
  ];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        temperature: options?.temperature ?? 0.8,
        system: customSystemPrompt || TISA_SYSTEM_PROMPT,
        messages
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Claude API error: ${error}`);
    }

    const data: ClaudeResponse = await response.json();
    return data.content[0]?.text || 'No response generated';
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}

// Specific generators

export async function generateInstagramPost(
  topic: string,
  pillar: Pillar,
  profile: ParentProfile,
  psychology: string
): Promise<string> {
  const psychDriver = psychologyDrivers[psychology as keyof typeof psychologyDrivers];

  const prompt = `Generate an Instagram post for TISA School that is BOLD, UNIQUE, and SPECIFIC.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOPIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${topic}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MARKETING PILLAR: ${pillar.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${pillar.description}

KEY MESSAGES (weave these in naturally):
${pillar.keyMessages.map((msg, i) => `${i + 1}. "${msg}"`).join('\n')}

CONTENT INSPIRATION:
${pillar.contentIdeas.map(idea => `• ${idea}`).join('\n')}

PSYCHOLOGY FIT: Status (${pillar.psychologyFit.status}/3) | Belonging (${pillar.psychologyFit.belonging}/3) | Transformation (${pillar.psychologyFit.transformation}/3)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TARGET AUDIENCE: ${profile.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${profile.description}

THEIR DEEP FEARS (address subtly):
${profile.fears.map(f => `• ${f}`).join('\n')}

THEIR ASPIRATIONS (trigger these):
${profile.aspirations.map(a => `• ${a}`).join('\n')}

CORE IDENTITY STATEMENT:
"${profile.coreSentence}"

KEY MESSAGES FOR THIS AUDIENCE:
${profile.keyMessages.map(msg => `• "${msg}"`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PSYCHOLOGY FRAMEWORK: ${psychDriver.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${psychDriver.description}

CORE TRIGGER: "${psychDriver.coreTrigger}"

CONTENT ANGLES (use 1-2 of these):
${psychDriver.contentAngles.map(angle => `• ${angle}`).join('\n')}

EXAMPLE PHRASES (integrate naturally):
${psychDriver.examplePhrases.map(phrase => `• "${phrase}"`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a SCROLL-STOPPING Instagram post that:

1. Opens with an UNEXPECTED hook that stops the scroll
2. Embodies the "${pillar.shortName}" pillar
3. Speaks directly to ${profile.shortName} parents
4. Triggers the ${psychDriver.name} psychology ("${psychDriver.coreTrigger}")
5. Addresses at least ONE of their fears OR aspirations
6. Uses 1-2 key messages naturally (don't be obvious)
7. Incorporates at least one example phrase from the psychology framework
8. Uses vivid, specific details (not generic education jargon)
9. Ends with a compelling call-to-action
10. Includes 5 strategic hashtags

CRITICAL: Be BOLD, CREATIVE, and SPECIFIC to TISA. Avoid clichés. Make it feel like it was written by someone who deeply understands this school and this audience.

Format exactly as it would appear on Instagram. Keep the hook short. Make every word count.`;

  return generateWithClaude(prompt, [], undefined, { temperature: 0.9 });
}

export async function generateTourScript(
  parentProfile: ParentProfile,
  specificConcerns: string
): Promise<string> {
  const psychDriver = psychologyDrivers[parentProfile.primaryDrive];

  const prompt = `Generate a compelling tour script for TISA School.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARENT PROFILE: ${parentProfile.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${parentProfile.description}

PRIMARY PSYCHOLOGICAL DRIVE: ${psychDriver.name}
Core Trigger: "${psychDriver.coreTrigger}"

THEIR DEEP FEARS (address proactively - don't wait for them to ask):
${parentProfile.fears.map(f => `• ${f}`).join('\n')}

THEIR DEEP ASPIRATIONS (paint this picture for them):
${parentProfile.aspirations.map(a => `• ${a}`).join('\n')}

THEIR CORE IDENTITY (this is the emotional anchor):
"${parentProfile.coreSentence}"

KEY MESSAGES FOR THIS AUDIENCE:
${parentProfile.keyMessages.map(msg => `• "${msg}"`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TODAY'S SPECIFIC CONCERNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${specificConcerns}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a tour script that:

1. **WELCOME & CONNECTION** (60 seconds)
   - Acknowledge their situation and the challenge they're navigating
   - Mirror their values (especially ${parentProfile.primaryDrive} psychology)
   - Make them feel understood

2. **OPENING STATEMENT** (30 seconds)
   - Position TISA as the bridge/solution for them
   - Reference their core identity: "${parentProfile.coreSentence}"
   - Create intrigue and forward momentum

3. **KEY TALKING POINTS** (3-5 minutes)
   - Address at least ONE of their fears proactively
   - Trigger at least ONE of their aspirations
   - Use the key messages naturally (don't be obvious)
   - Provide specific examples and stories, not just statements

4. **OBJECTION HANDLING** (reactive section)
   - Anticipate their specific concern: "${specificConcerns}"
   - Prepare 2-3 other likely objections based on their profile
   - Provide reframes that address the underlying psychology
   - Use selective admissions framing ONLY if appropriate for their drive

5. **THE CLOSE** (60 seconds)
   - Make them feel like they've found their tribe/solution
   - Invoke their core identity one more time
   - Clear next steps (application, visit, inquiry)
   - End with confidence, not desperation

TONE: Confident, warm, selective, and empowering (never defensive, never needy)

CRITICAL: This script should sound natural, conversational, and personalized to ${parentProfile.shortName} parents. Not a robot script. Real human dialogue.`;

  return generateWithClaude(prompt, [], undefined, { temperature: 0.85 });
}

export async function handleObjection(
  objection: string,
  context: string,
  parentProfile?: ParentProfile
): Promise<string> {
  const redButtonMsgs = redButtonMessages.map(msg => `• **${msg.message}** - ${msg.explanation}`).join('\n');

  const profileContext = parentProfile ? `
PARENT PROFILE: ${parentProfile.name}
Primary Drive: ${parentProfile.primaryDrive.toUpperCase()}
Fears: ${parentProfile.fears.join(', ')}
Aspirations: ${parentProfile.aspirations.join(', ')}` : '';

  const prompt = `A parent has raised this objection/concern during a TISA interaction:

**Objection:** "${objection}"
**Context:** ${context}${profileContext}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RED BUTTON MESSAGES (use these as reframes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${redButtonMsgs}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Provide:

1. **The Psychology Behind This Objection**
   - What is the parent REALLY asking?
   - What underlying fear or desire is driving this?

2. **Which Red Button Message Applies?**
   - Select 1-2 of the red button messages that reframe this objection
   - Explain how to use it in this context

3. **The Response** (word-for-word, conversational)
   - Start by validating their concern
   - Reframe using the red button message(s)
   - Provide specific TISA examples or evidence
   - End with confidence

4. **Follow-up Question** (to regain control)
   - Ask something that moves the conversation forward
   - Address their underlying concern
   - Redirect to TISA's value proposition

TONE: Warm, confident, never defensive, never apologetic. Turn this into an opportunity to demonstrate TISA's unique value.${parentProfile ? `\n\nREMEMBER: This parent's primary drive is ${parentProfile.primaryDrive}. Frame your response to appeal to that psychology.` : ''}`;

  return generateWithClaude(prompt, [], undefined, { temperature: 0.8 });
}

export async function upgradeDocument(
  originalText: string,
  documentType: string
): Promise<string> {
  const prompt = `Rewrite this text in the TISA voice and style with IMPACT and CREATIVITY.

**Original Text:**
${originalText}

**Document Type:** ${documentType}

Upgrade this to:
- Match TISA's premium, confident tone (never arrogant, never needy)
- Apply psychological framing (status/belonging/transformation)
- Make it MORE compelling, MORE professional, MORE TISA
- Keep the core information but ELEVATE the language
- Remove education jargon - add specificity and emotion
- Add unexpected turns of phrase that make it memorable

CRITICAL: This should feel like it was written by someone who deeply understands TISA's mission and the families we serve.

Provide the upgraded version ready to use immediately.`;

  return generateWithClaude(prompt, [], undefined, { temperature: 0.85 });
}

export async function runScenario(
  scenario: string,
  conversationHistory: Message[]
): Promise<string> {
  const scenarioSystemPrompt = `${TISA_SYSTEM_PROMPT}

## SCENARIO SIMULATION MODE

You are now simulating a conversation scenario for TISA staff training. You will play the role described and respond realistically. After each response, provide coaching notes in [COACHING: ...] format.

Your goals:
1. Be realistic - act as a real parent/stakeholder would
2. Push back on weak responses
3. Reward strong, TISA-aligned responses
4. Provide actionable coaching after each exchange`;

  const prompt = scenario;
  return generateWithClaude(prompt, conversationHistory, scenarioSystemPrompt);
}

export async function generateEmail(
  context: string,
  recipient: string,
  purpose: string
): Promise<string> {
  const prompt = `Write a compelling email for TISA School.

**Recipient:** ${recipient}
**Purpose:** ${purpose}
**Context:** ${context}

Create a complete email with:
- Subject line (short, intriguing, action-oriented)
- Greeting (personalized if possible)
- Body (concise, compelling, no filler)
- Professional closing
- Signature line

TISA TONE GUIDELINES:
- Warm but professional
- Confident but not arrogant
- Premium but accessible
- Never needy or apologetic
- Specific details, not generic statements
- Action-oriented, not passive

CRITICAL: Make every sentence earn its place. This email should feel personal and thoughtful, not templated.`;

  return generateWithClaude(prompt, [], undefined, { temperature: 0.8 });
}

export { TISA_SYSTEM_PROMPT };
