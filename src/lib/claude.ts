// Claude AI Service for TISA Brain
// This handles all AI generation using the Claude API

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
  customSystemPrompt?: string
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
  pillar: string,
  profile: string,
  psychology: string
): Promise<string> {
  const prompt = `Generate an Instagram post for TISA School.

**Topic:** ${topic}
**Pillar:** ${pillar}
**Target Parent Profile:** ${profile}
**Primary Psychological Driver:** ${psychology}

Create:
1. A hook (first line that stops the scroll)
2. The main content (3-5 short paragraphs)
3. A call-to-action
4. 5 relevant hashtags

Format it exactly as it would appear on Instagram. Make it psychologically compelling using the ${psychology} driver.`;

  return generateWithClaude(prompt);
}

export async function generateTourScript(
  parentProfile: string,
  specificConcerns: string
): Promise<string> {
  const prompt = `Generate a tour script for TISA School.

**Parent Profile:** ${parentProfile}
**Their Specific Concerns/Questions:** ${specificConcerns}

Create a complete tour script including:
1. **Welcome & Connection** (establish rapport, mirror their values)
2. **Opening Statement** (position TISA immediately)
3. **Key Talking Points** (3-4 points tailored to this profile)
4. **Objection Handling** (anticipate and address their concerns)
5. **The Close** (how to end the tour with next steps)

Use the selective admissions framing. Make them feel they need to qualify for TISA, not the other way around.`;

  return generateWithClaude(prompt);
}

export async function handleObjection(
  objection: string,
  context: string
): Promise<string> {
  const prompt = `A parent has raised this objection/concern during a TISA interaction:

**Objection:** "${objection}"
**Context:** ${context}

Provide:
1. **The Psychology Behind This Objection** (what are they really asking?)
2. **Reframe the Conversation** (how to shift their perspective)
3. **The Response** (exactly what to say, word-for-word)
4. **Follow-up Question** (to regain control of the conversation)

Remember: Never be defensive. Turn objections into opportunities to demonstrate TISA's unique value.`;

  return generateWithClaude(prompt);
}

export async function upgradeDocument(
  originalText: string,
  documentType: string
): Promise<string> {
  const prompt = `Rewrite this text in the TISA voice and style:

**Original Text:**
${originalText}

**Document Type:** ${documentType}

Upgrade this to:
- Match TISA's premium, confident tone
- Apply psychological framing (status/belonging/transformation)
- Make it more compelling and professional
- Keep the core information but elevate the language

Provide the upgraded version ready to use.`;

  return generateWithClaude(prompt);
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
  const prompt = `Write an email for TISA School.

**Recipient:** ${recipient}
**Purpose:** ${purpose}
**Context:** ${context}

Create a complete email with:
- Subject line
- Greeting
- Body (appropriately formatted)
- Professional closing
- Signature line

Match TISA's tone: warm but professional, confident but not arrogant, premium but accessible.`;

  return generateWithClaude(prompt);
}

export { TISA_SYSTEM_PROMPT };
