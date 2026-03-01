// ═══════════════════════════════════════════════
// VIBEPROMPT — SMART DYNAMIC PROMPT ENGINE
// 100% Frontend. No API calls. Conditional logic.
// ═══════════════════════════════════════════════

import { appTypePresets, designVibePresets } from './presets'

/**
 * generateMegaPrompt(formData)
 * Builds both prompt blocks conditionally based on selected features.
 * Returns { block1, block2 }
 */
export function generateMegaPrompt(formData) {
  const features = formData.features || []

  // ── Resolve human-readable labels from IDs ──────────────────────────
  const projectTypeObj = appTypePresets.find(t => t.id === formData.appTypeId)
  const projectType = projectTypeObj
    ? projectTypeObj.name.replace(/^[^\s]+\s/, '') // strip leading emoji
    : formData.appTypeId || 'System / Web App'

  const vibeObj = designVibePresets.find(v => v.id === formData.designVibeId)
  const vibe = vibeObj
    ? vibeObj.name.replace(/^[^\s]+\s/, '')
    : formData.designVibeId || 'Clean & Minimalist'

  const appName = formData.appName?.trim() || 'My Project'
  const description = formData.appDescription?.trim() || 'A form that collects data and processes it via Google Apps Script.'
  // ── Smart fallbacks for branding ────────────────────────────────────
  const safePrimary = formData.primaryColor?.trim() || '#2563EB'  // Tailwind Blue-600
  const safeSecondary = formData.secondaryColor?.trim() || '#F1F5F9'  // Tailwind Slate-100
  const safeLogo = formData.logoUrl?.trim()
    ? `Logo: ${formData.logoUrl.trim()}`
    : 'No specific logo, please use a modern generic icon matching the vibe.'

  // ── Conditional logic strings ────────────────────────────────────────
  const sheetLogic = features.includes('📊 Save Data to Google Sheets')
    ? 'Ensure the doPost(e) function parses the JSON payload and appends a new row to the active sheet using SpreadsheetApp.'
    : ''

  const emailLogic = features.includes('📧 Auto-Send Email via Gmail')
    ? "Include MailApp.sendEmail() in the GAS code to send an automated confirmation email to the user. Extract the user's email from the JSON payload."
    : ''

  const pdfLogic = features.includes('📄 Generate PDF Document')
    ? 'Include logic using Google DocumentApp and DriveApp to generate a PDF receipt from a template and return the PDF URL in the response.'
    : ''

  const waLogic = features.includes('💬 Auto-Redirect to WhatsApp')
    ? 'In the Frontend JS, after a successful 200 response, redirect the user to a WhatsApp link (wa.me) containing their dynamically encoded form data.'
    : 'In the Frontend JS, after a successful 200 response, hide the form and display the success container.'

  // Combine non-empty logic lines for Block 1
  const requiredLogic = [sheetLogic, emailLogic, pdfLogic]
    .filter(Boolean)
    .join(' ')

  // Additional notes from user (optional)
  const additionalNotes = formData.additionalNotes?.trim()
    ? `\nAdditional Notes/Links: ${formData.additionalNotes.trim()}`
    : ''

  // ── BLOCK 1: Project Kickoff & Backend Setup ────────────────────────
  const block1 = `Act as a Senior Tech Lead and UI/UX Architect. I want to build a ${projectType} named '${appName}' using Canva Code (Frontend) and Google Apps Script (Backend).

Client's Initial Concept: "${description}"${additionalNotes}

PHASE 1: BRAINSTORMING (DO THIS FIRST)
Before writing any code or generating Canva prompts, analyze my concept. Ask me up to 4 clarifying questions to finalize the UI scope (sections, form fields, user flow).
(Stop here and wait for my reply. DO NOT generate any GAS code or setup guides yet).

PHASE 2: DATABASE SETUP & ID REQUEST (DO THIS AFTER PHASE 1)
Once we agree on the scope, guide me step-by-step on how to set up the database (e.g., creating a Google Sheet, naming the columns based on our agreed fields). Then, teach me how to find the exact Sheet ID. Finally, explicitly ask me to reply with that exact Sheet ID.
(Stop here and wait for me to provide the ID. DO NOT generate the GAS code yet).

PHASE 3: FULL GAS CODE GENERATION (DO THIS AFTER I PROVIDE THE ID)
Once I provide the ID, give me the complete doGet(e) and doPost(e) GAS code.
Inject the exact ID I provided directly into the script.
Required Logic: ${sheetLogic}${emailLogic ? `\n${emailLogic}` : ''}${pdfLogic ? `\n${pdfLogic}` : ''}
CRITICAL API RULE: The doPost(e) function MUST return a proper JSON response. On success, return exactly: {"status": "success", "message": "Success"}. On error, return: {"status": "error", "message": "Error details"}.
Remind me to deploy it as a Web App to get the URL.`

  // ── BLOCK 2: Canva Code Frontend Prompt ─────────────────────────────
  const block2 = `Awesome, the backend is deployed. Now, based on the exact details, UI sections, and form fields we just brainstormed and finalized above, generate the 2-Step Mega Prompt for Canva Code's AI.

--- PROMPT 1: UI/UX DESIGN ---
Instruct the AI to generate this prompt using this EXACT structure:
"Act as a Senior UI/UX Expert. Build a complete Tailwind CSS layout for a ${projectType} named '${appName}'.
Scope: Build exactly the UI sections, pages, and specific form fields we finalized in our discussion. Use our agreed-upon text copy.
Design Vibe: ${vibe}. Primary Color: ${safePrimary}, Secondary Color: ${safeSecondary}. ${safeLogo}
Crucial Rule: For any forms, MUST build a hidden error message box, a hidden success container, and a submit button with a 'Loading...' state. Do not include JS logic yet."

--- PROMPT 2: JS LOGIC & INTEGRATION ---
Instruct the AI to generate this prompt using this EXACT structure:
"Perfect, now add the JavaScript integration for the layout above. Provide strict rules:
Use this exact GAS URL: [YOUR GAS WEBAPP URL HERE]
Fetch Rules: Gather form data into a flat JSON object matching our agreed fields. Send using \`JSON.stringify(formData)\`. STRICTLY FORBID \`URLSearchParams\`, \`FormData()\`, or \`'Content-Type': 'application/json'\` headers. STRICTLY FORBID \`mode: 'no-cors'\`. Use standard POST.
Success Handling: Parse the response JSON. If successful, hide the form and display the success container. If error, show the error box."
Please format your response by giving me 'Prompt 1' and 'Prompt 2' in copyable blocks.`

  return { block1, block2 }
}
