// ═══════════════════════════════════════════════
// VIBEPROMPT — MASTER PROMPT ENGINE
// Transforms simple form data into a Senior Dev prompt
// Hides all technical jargon from the user
// ═══════════════════════════════════════════════

import { appTypePresets, designVibePresets } from './presets'

/**
 * Generates a complete, structured master prompt from user form inputs.
 * The user picks simple options; this engine translates them to technical specs.
 */
export function generateMasterPrompt(data) {
    const appType = appTypePresets.find(t => t.id === data.appTypeId)
    const vibe = designVibePresets.find(v => v.id === data.designVibeId)

    const stackList = appType ? appType.stack.map(s => `► ${s}`).join('\n') : '► Next.js 14, TailwindCSS, Supabase'
    const featureList = data.features?.length
        ? data.features.map((f, i) => `${i + 1}. ${f}`).join('\n')
        : '1. Core feature (please specify)'

    const colorPalette = vibe
        ? vibe.colors.map((c, i) => `  ${['Primary', 'Secondary', 'Accent', 'Text', 'Surface'][i] || 'Extra'}: ${c}`).join('\n')
        : '  Not specified'

    const vibeCSS = vibe?.css || 'Not specified'
    const vibeFont = vibe?.font || 'Inter'
    const vibeName = vibe?.name?.replace(/^[^\s]+\s/, '') || 'Minimalist' // strip emoji
    const isDark = vibe?.darkMode ? 'Yes — use dark backgrounds as default' : 'No — use light backgrounds as default'

    const prompt = `You are a Senior Full-Stack Developer. Build a COMPLETE, SHIPPABLE app in ONE session.
No half-measures. No "add the rest later." Every file must be production-ready.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APP BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.appName || 'My App'}
Description: ${data.appDescription || 'No description provided'}
Target Audience: ${data.targetAudience || 'General users'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${stackList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vibe: ${vibeName}
Dark Mode: ${isDark}
Font: ${vibeFont}

Color Palette:
${colorPalette}

CSS Tokens:
  ${vibeCSS}

Design Rules:
- Apply the design system GLOBALLY from component 1
- Never mix vibes mid-app
- Every component must look like it belongs to the same design language
- Mobile-first in EVERY UI decision (test at 375px)
- Use smooth micro-animations for hover states and transitions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MUST-BUILD FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${featureList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${generateFileStructure(appType)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUILD RULES (NON-NEGOTIABLE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ALWAYS provide COMPLETE code. Never say "add the rest here."
2. If something needs an env variable, state it with the exact key name.
3. Prefer boring, proven solutions over clever ones.
4. Think mobile-first — test every layout at 375px width.
5. Ship the MVP. Save perfection for v2.
6. Build every component as its OWN file — no mega-components.
7. Handle loading, empty, and error states for EVERY feature.
8. Enable authentication & security from day 1.
9. One feature at a time — finish and test before the next.
10. Use semantic HTML and include accessibility attributes (aria-labels, roles).${data.additionalNotes ? `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.additionalNotes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUILD SEQUENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 → Scaffold the project with the tech stack above
STEP 2 → Set up the design system (global styles, theme, fonts)
STEP 3 → Build authentication (if applicable)
STEP 4 → Build the first core feature end-to-end
STEP 5 → Build remaining features one by one
STEP 6 → Polish: responsive design, animations, error states
STEP 7 → Build & deploy

Start building now. Output complete, working code.`

    return prompt
}

function generateFileStructure(appType) {
    if (!appType) {
        return `src/
├── components/   ← reusable UI pieces
├── pages/        ← route-level screens
├── utils/        ← helper functions
├── App.jsx       ← router setup
└── main.jsx      ← entry point`
    }

    if (appType.fileStructure === 'nextjs') {
        return `app/
├── layout.tsx        ← root layout + global styles
├── page.tsx          ← home page
├── globals.css       ← design system
├── components/       ← reusable UI pieces
├── lib/              ← database client, utils
└── (routes)/         ← nested route groups`
    }

    if (appType.fileStructure === 'expo') {
        return `app/
├── (tabs)/            ← tab navigation
│   ├── index.tsx      ← home tab
│   └── _layout.tsx    ← tab layout
├── components/        ← reusable UI
├── hooks/             ← custom hooks
├── lib/               ← API clients
└── app.json           ← Expo config`
    }

    if (appType.fileStructure === 'astro') {
        return `src/
├── pages/
│   └── index.astro   ← homepage
├── components/       ← reusable UI
├── layouts/          ← page layouts
├── styles/           ← global CSS
└── astro.config.mjs  ← Astro config`
    }

    return `src/
├── components/   ← small, reusable UI pieces
├── pages/        ← route-level screens
├── lib/          ← API clients
├── hooks/        ← custom React hooks
├── utils/        ← pure helper functions
├── App.jsx       ← router + auth listener
└── main.jsx      ← entry point`
}
