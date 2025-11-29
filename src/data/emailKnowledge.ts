// Teddy Kids / TISA Email Communication Knowledge Base

export interface EmailTemplate {
  id: string;
  category: 'onboarding' | 'operations' | 'challenges';
  title: string;
  subject?: string;
  body: string;
  useCase: string;
}

export interface CommunicationPrinciple {
  id: string;
  emoji: string;
  title: string;
  description: string;
  doThis: string[];
  avoidThis: string[];
}

// ============================================
// 20 EMAIL TEMPLATES
// ============================================

export const emailTemplates: EmailTemplate[] = [
  // A. FIRST CONTACT & ONBOARDING
  {
    id: 'welcome-inquiry',
    category: 'onboarding',
    title: 'Welcome Reply - New Parent Inquiry',
    subject: 'A Warm Welcome to Teddy Kids 🧸',
    useCase: 'First response to a new parent reaching out',
    body: `Dear [Parent],

Thank you for reaching out — and welcome to Teddy Kids! We're happy you found us and would love to explore a place for your little one in our Teddy family.

To check availability, could you share the details below?

**Child**
• Full name
• Date of birth
• Preferred start date
• Days you need
• Location preference

**Parents**
• Names
• Phone numbers
• Email addresses

Once I have this, I'll check our groups and guide you through the next steps.

Looking forward to helping you settle in.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'missing-info',
    category: 'onboarding',
    title: 'Follow-up Request for Missing Information',
    subject: 'A Few More Details Needed',
    useCase: 'When parent submission is incomplete',
    body: `Dear [Parent],

Thank you for your message. To complete your registration smoothly, could you share the missing details below?

[List missing fields]

Once received, I'll prepare everything right away.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'tour-confirmation',
    category: 'onboarding',
    title: 'Tour Confirmation',
    subject: 'Your Tour is Confirmed! 🎉',
    useCase: 'Confirming a scheduled tour visit',
    body: `Dear [Parent],

Wonderful — we're excited to welcome you for a tour on **[Date + Time]**.

You'll get a chance to meet the teachers, see the group rooms, and feel the warm atmosphere our children enjoy every day.

If anything changes, just let me know. See you soon!

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'after-tour',
    category: 'onboarding',
    title: 'After-Tour Follow-up',
    subject: 'Lovely Meeting You Today',
    useCase: 'Warm follow-up after a tour visit',
    body: `Dear [Parent],

It was lovely having you with us today — thank you for taking the time to visit. We truly enjoyed meeting your family and seeing your little one explore the space.

If you'd like to move forward, I'd be happy to prepare the placement agreement and next steps for you.

Let me know how you'd like to continue — we're here for you.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'placement-offer',
    category: 'onboarding',
    title: 'Placement Availability Offer',
    subject: 'Great News — We Have a Spot! ✨',
    useCase: 'Offering available placement to family',
    body: `Dear [Parent],

Great news — we have availability for **[child name]** on the following days:

• [list days]
• Start date: [date]
• Group: [group name]

If this matches your needs, I'll prepare the placement agreement immediately.

Looking forward to welcoming your family.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'contract-sent',
    category: 'onboarding',
    title: 'Contract Sent',
    subject: 'Your Placement Documents Are Ready',
    useCase: 'Sending contract and welcome materials',
    body: `Dear [Parent],

Thank you for your confirmation. Attached you'll find:

• The placement agreement
• Cost overview
• Welcome letter for your group

You'll also receive an electronic version you can sign digitally.

If you have any questions as you look through the documents, feel free to reach out — happy to help.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'settling-in',
    category: 'onboarding',
    title: 'Settling-in Explanation & Scheduling',
    subject: 'Preparing for a Gentle Start',
    useCase: 'Explaining the settling-in process',
    body: `Dear [Parent],

To make the first days gentle and comfortable for your little one, we'll plan two short settling-in moments:

• **Day 1:** 1–2 hours
• **Day 2:** 1–2 hours

The official start date will then be **[date]**.

Your group teacher will contact you shortly to confirm the times.

We're excited to begin this journey together.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'start-date-confirmation',
    category: 'onboarding',
    title: 'Start Date Confirmation',
    subject: 'All Set — See You Soon! 🌟',
    useCase: 'Final confirmation of official start date',
    body: `Dear [Parent],

Everything is arranged — we're happy to confirm that **[child name]** will officially start on:

**➡ [Start date]**

Your teachers will be ready to welcome you in the morning and guide you through the first steps.

We look forward to seeing you soon!

Warm regards,
Teddy Kids Team`
  },

  // B. DAILY OPERATIONS
  {
    id: 'invoice-question',
    category: 'operations',
    title: 'Invoice Question Reply',
    subject: 'Re: Invoice Question',
    useCase: 'Responding to billing inquiries',
    body: `Dear [Parent],

Thank you for checking in — happy to look into this for you.

I've reviewed your account, and all invoices up to this moment have been paid successfully. If you'd like copies of specific invoices or a full overview, just let me know and I'll send them right away.

Here for anything you need.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'payment-issue',
    category: 'operations',
    title: 'Payment Issue - Kind but Firm',
    subject: 'Quick Note About Your Account',
    useCase: 'Addressing overdue payment gently',
    body: `Dear [Parent],

Thank you for your message.

I've checked your account and noticed that the last invoice is still open. No worries — these things happen.

Could you please arrange the payment at your earliest convenience? Once processed, the extra-day request and Teddy Coins will activate again automatically.

Let me know if you need any help with the invoice details.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'extra-day-approved',
    category: 'operations',
    title: 'Extra Day Approved',
    subject: 'Extra Day Confirmed ✓',
    useCase: 'Confirming approved extra day request',
    body: `Dear [Parent],

Good news — we have space available and your extra day for **[child name]** on **[date]** is confirmed.

We wish your little one a wonderful day with the group!

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'extra-day-decline',
    category: 'operations',
    title: 'Extra Day Decline - Soft & Supportive',
    subject: 'Re: Extra Day Request',
    useCase: 'Declining unavailable extra day with alternatives',
    body: `Dear [Parent],

Thank you for your request. I checked availability, but unfortunately the group is fully booked on **[date]**.

If you'd like, I can keep an eye on cancellations or suggest alternative days where we *do* have space.

Happy to help in any way possible.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'status-update',
    category: 'operations',
    title: 'Parent Asking for Update',
    subject: 'Re: Update Request',
    useCase: 'Responding to follow-up questions',
    body: `Dear [Parent],

Thank you for your follow-up — and thank you for your patience.

Here's where we currently stand:
• [Short status summary]

I'll update you again as soon as the next step is ready. If you need anything in the meantime, feel free to reach out.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'sick-child',
    category: 'operations',
    title: 'Sick Child Pickup Request',
    subject: 'Please Pick Up [Child Name] — Not Feeling Well',
    useCase: 'Urgent but empathetic pickup request',
    body: `Dear [Parent],

I'm sorry to let you know that **[child name]** isn't feeling well today. We've kept them comfortable and close to us, but we think it's best for them to rest at home.

Could you please pick them up within the next 30 minutes?

We'll stay with your little one until you arrive.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'behavior-incident',
    category: 'operations',
    title: 'Behavior Incident Report',
    subject: 'A Small Update from Today',
    useCase: 'Reporting incidents without blame',
    body: `Dear [Parent],

I wanted to share something from today so we can support **[child name]** together.

During playtime, there was a small incident involving [biting/pushing/etc]. No child was seriously hurt, and the teachers handled everything calmly.

This age is full of big emotions and learning moments. We're guiding them gently — helping them express feelings, wait for turns, and build positive interactions.

If you notice anything at home or would like to talk more, I'm happy to connect.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'positive-update',
    category: 'operations',
    title: 'Positive Update Message',
    subject: 'A Lovely Moment to Share ✨',
    useCase: 'Sharing positive news (parents love this!)',
    body: `Dear [Parent],

Just a little update from today — **[child name]** had a fantastic moment we wanted to share.

[Describe short positive behavior or activity: "They danced during music time," "They helped a friend," "They spoke Dutch/English sentence," etc.]

We love watching their confidence grow.

Warm regards,
Teddy Kids Team`
  },

  // C. CHALLENGES & DELICATE MOMENTS
  {
    id: 'complaint-acknowledgment',
    category: 'challenges',
    title: 'Complaint Acknowledgment & De-escalation',
    subject: 'Thank You for Sharing This With Us',
    useCase: 'First response to a parent complaint',
    body: `Dear [Parent],

Thank you for sharing this with us — we appreciate your openness.

I understand how this situation may have felt, and I'd like to look into it carefully so we can resolve it together. Could we schedule a short call or meeting at your preferred time? That way, we can go through everything calmly and make sure you feel fully supported.

We're here for you, and we'll handle this with care.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'miscommunication',
    category: 'challenges',
    title: 'Miscommunication or Mistake - Ownership + Solution',
    subject: 'Thank You for Your Patience',
    useCase: 'Taking ownership of errors gracefully',
    body: `Dear [Parent],

Thank you for bringing this to my attention.

I can see how this caused confusion — thank you for your patience. Here's what we'll do moving forward:

• [Correction]
• [Clear next step]
• [Prevention if needed]

If anything still feels unclear, I'm here to help.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'policy-clarification',
    category: 'challenges',
    title: 'Policy Clarification Without Feeling "Policy-ish"',
    subject: 'Happy to Clarify',
    useCase: 'Explaining rules with warmth',
    body: `Dear [Parent],

Thank you for your message — happy to clarify this for you.

Here's how it works at Teddy Kids: [Explain rule calmly in 1–2 sentences]

We follow this approach to keep our groups safe, structured, and consistent for every child.

If you'd like, I can walk you through alternatives or next steps.

Warm regards,
Teddy Kids Team`
  },
  {
    id: 'goodbye',
    category: 'challenges',
    title: 'Goodbye / Contract Ending - Warm Closure',
    subject: 'Thank You for Being Part of Teddy Kids',
    useCase: 'Graceful farewell when family leaves',
    body: `Dear [Parent],

Thank you for letting us know — and thank you for the time your family spent with us.

We'll process the contract ending for **[child name]** on **[date]**, and we'll send confirmation once everything is updated in the system.

It's been a joy getting to know your little one, and we hope to stay in touch. If you ever return to Leiden or need support later on, our door is always open.

Warm regards,
Teddy Kids Team`
  },
];

// ============================================
// COMMUNICATION PRINCIPLES (Style Guide)
// ============================================

export const communicationPrinciples: CommunicationPrinciple[] = [
  {
    id: 'parents-first',
    emoji: '👨‍👩‍👧',
    title: 'Parents are our #1 priority. Always.',
    description: 'If a parent writes → we respond with warmth, clarity, and speed. Every message shapes their trust in us.',
    doThis: [
      'Respond to parent emails before internal admin',
      'Treat every message as relationship-building',
      'A warm reply = a loyal family for years'
    ],
    avoidThis: [
      'Delaying parent responses for "later"',
      'Treating parent emails as tasks to clear',
      'Cold replies that feel like forms'
    ]
  },
  {
    id: 'three-elements',
    emoji: '✨',
    title: 'Every message must show 3 things',
    description: 'Warmth (I see you), Reassurance (I\'ve got you), Guidance (Here\'s what happens next)',
    doThis: [
      '"Welcome to the Netherlands — we\'re here for you."',
      '"Thank you for checking — here is where we stand."',
      'Always include clear next steps'
    ],
    avoidThis: [
      'Jumping straight to requests without acknowledgment',
      'Leaving parents uncertain about what happens next',
      'Generic responses without personal touch'
    ]
  },
  {
    id: 'human-beings',
    emoji: '💬',
    title: 'Speak to parents like HUMAN BEINGS, not tasks',
    description: 'Tone matters more than words. Warm tone = emotional safety. Emotional safety = trust.',
    doThis: [
      '"Could you share the following details so I can prepare everything for you?"',
      '"Happy to check this for you — here\'s what I found."'
    ],
    avoidThis: [
      '"Send details."',
      '"We didn\'t send invoice."',
      'Transactional, robotic phrasing'
    ]
  },
  {
    id: 'not-standard',
    emoji: '🌍',
    title: 'We are not a standard daycare',
    description: 'We are Teddy Kids — international, warm, flexible, multicultural. Our communication must reflect that.',
    doThis: [
      'Kind, human, welcoming tone',
      'Clear, structured, easy to follow',
      'Think: "How would I speak to a friend moving countries with a child?"'
    ],
    avoidThis: [
      'Cold, robotic, or rushed replies',
      'Generic daycare language from 2008',
      'Making families feel like a number'
    ]
  },
  {
    id: 'soft-sentence',
    emoji: '💝',
    title: 'ALWAYS add one soft human sentence',
    description: 'This is where the Teddyverse magic lives. Just one warm line makes all the difference.',
    doThis: [
      '"We\'re happy to welcome you."',
      '"Thank you for your patience."',
      '"We\'re excited to meet your little one."',
      '"We\'re here to help with anything."'
    ],
    avoidThis: [
      'Ending emails abruptly',
      'Pure business without warmth',
      'Forgetting the human connection'
    ]
  },
  {
    id: 'no-fear',
    emoji: '🛡️',
    title: 'Avoid fear, pressure, or uncertainty',
    description: 'Parents should feel supported, guided, and safe. Never ignored, confused, rushed, or blamed.',
    doThis: [
      'If delayed → say it with care',
      'If complicated → explain calmly',
      'If missing → ask gently'
    ],
    avoidThis: [
      'Making parents feel ignored or blamed',
      'Creating confusion or uncertainty',
      'Pressuring or rushing families'
    ]
  },
  {
    id: 'internationals',
    emoji: '🌐',
    title: 'For internationals: extra empathy',
    description: 'They are new to Dutch system, taxes, illness rules, apps, schools, and culture. One friendly sentence = life changing.',
    doThis: [
      '"Welcome to the Netherlands!"',
      'Explain Dutch-specific things simply',
      'Acknowledge the challenge of relocating'
    ],
    avoidThis: [
      'Assuming they know Dutch systems',
      'Using jargon without explanation',
      'Forgetting the relocation stress'
    ]
  },
  {
    id: 'represent-culture',
    emoji: '🏠',
    title: 'You represent our culture',
    description: 'Every email is: a tour, a handshake, a smile, a welcome, an introduction to our philosophy.',
    doThis: [
      'Write like you\'re welcoming someone home',
      'Be the warm first impression',
      'Show the Teddy Kids soul'
    ],
    avoidThis: [
      'Cold administrative tone',
      'Making it feel like a government office',
      'Forgetting you\'re the brand ambassador'
    ]
  },
  {
    id: 'email-formula',
    emoji: '📝',
    title: 'Short Formula for Every Email',
    description: 'A. Warm opening → B. Acknowledge situation → C. Clear next steps → D. Soft closing. Perfect, every time.',
    doThis: [
      'A: "Thank you for your message — happy to help."',
      'B: "I understand you\'re new to NL..."',
      'C: "Here\'s what we need / here\'s what will happen..."',
      'D: "We\'re excited to welcome you."'
    ],
    avoidThis: [
      'Skipping the warm opening',
      'Forgetting to acknowledge their situation',
      'Ending without a soft closing'
    ]
  },
  {
    id: 'golden-rule',
    emoji: '⭐',
    title: 'The Golden Rule',
    description: '"Would this message make a parent feel safe, welcomed, and understood?" If yes → send. If no → rewrite.',
    doThis: [
      'Read your email before sending',
      'Ask: "Does this feel warm?"',
      'Ask: "Would I feel good receiving this?"'
    ],
    avoidThis: [
      'Sending without re-reading',
      'Prioritizing speed over warmth',
      'Forgetting the human on the other end'
    ]
  },
];

// ============================================
// AI SYSTEM PROMPT FOR EMAIL GENERATION
// ============================================

export const emailAssistantPrompt = `You are **TeddyLuna**, the official communication engine of Teddy Kids and TISA International School — warm, intelligent, emotionally aware, and always aligned with the Teddyverse philosophy.

You write emails to parents that combine:
— warmth — clarity — empathy — reassurance — soft professionalism — human connection

Your tone must ALWAYS reflect the Teddy Kids culture: **International, warm, flexible, multicultural, welcoming, structured, and human.**

No coldness. No robotic phrasing. No generic daycare language. Ever.

## CORE PRINCIPLES

For every reply, ALWAYS include:

**✔ 1. Warm connection**
Acknowledge the parent's situation or emotion. Use soft openings like:
- "Thank you for your message..."
- "We're happy to help you with this..."
- "Hope your little one is doing well today."

**✔ 2. Reassurance**
Parents must feel safe. Include gentle lines like:
- "We're here for you."
- "We'll take care of this right away."
- "Happy to clarify everything for you."

**✔ 3. Clear guidance**
Always provide structure:
→ What happens
→ When
→ What they need to do
→ What you will do

**✔ 4. Humanity over templates**
Always add **one or two lines** that feel personal or warm. This is the Teddy Kids signature.

**✔ 5. Short, simple, elegant sentences**
Clarity is kindness.

## OUTPUT FORMAT

When given a parent message or email thread, respond with:
1. **Suggested subject line** (if relevant)
2. **Full rewritten reply** in Teddy Kids style
3. **Warm closing** with "Teddy Kids Team" or the sender name if provided

## THINGS TO AVOID
❌ No cold administrative tone
❌ No rigid or formulaic replies
❌ No overly long blocks of text
❌ No blame
❌ No "policy dumping"
❌ No Dutch government-style phrasing
❌ Never say "Send details." — always soften requests

## THINGS TO ALWAYS INCLUDE
✔ Warmth
✔ Calmness
✔ Clear steps
✔ Softness
✔ Empathy
✔ Affirmation
✔ One gentle human sentence
✔ A feeling of "you're in safe hands"

## WHEN CONTENT IS COMPLEX
Explain it softly, clearly, and in one of these tones:
- "Here's how we'll help..."
- "To make things easy..."
- "Step by step, this is what happens next..."

Never overwhelm. Never talk down to parents.

## SIGNATURE STYLE
Your tone = A warm, confident, emotionally intelligent professional who cares deeply about children, parents, and cultural understanding.
A coach. A guide. A welcoming hand. A Teddy Kids heart.

## FOR INTERNATIONALS
Remember they may be new to:
- Dutch system
- Taxes and subsidies
- Illness rules
- Konnect app
- Dutch schools
- Local culture

One friendly, explanatory sentence can be life-changing for them.

## THE GOLDEN RULE
Before finishing any reply, ask: "Would this message make a parent feel safe, welcomed, and understood?"
If yes → send. If no → rewrite.`;

// Category labels
export const categoryLabels = {
  onboarding: { label: 'First Contact & Onboarding', emoji: '👋' },
  operations: { label: 'Daily Operations', emoji: '📅' },
  challenges: { label: 'Challenges & Delicate Moments', emoji: '🤝' },
};
