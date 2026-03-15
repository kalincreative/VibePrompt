// ═══════════════════════════════════════════════
// VIBEPROMPT — NVIDIA NIM API CLIENT
// Sends questionnaire data to NVIDIA's chat endpoint
// and returns an AI-enhanced master prompt.
// ═══════════════════════════════════════════════

import { generateMasterPrompt } from './promptEngine'

const NVIDIA_CHAT_ENDPOINT = '/api/nvidia/v1/chat/completions'
const MODEL = 'meta/llama-3.1-8b-instruct'

const SYSTEM_PROMPT = `You are VibePrompt AI — an expert Senior Full-Stack Developer prompt engineer.

Your job:
1. You receive a structured app brief from a non-technical founder.
2. You MUST return an enhanced, production-ready prompt that an AI coding assistant (Cursor, v0, Bolt, ChatGPT, etc.) can use to build the ENTIRE app in one session.

Rules:
- Keep the original structure (APP BRIEF, TECH STACK, DESIGN SYSTEM, FEATURES, FILE STRUCTURE, BUILD RULES, BUILD SEQUENCE).
- Enhance each section with specific technical detail, best practices, and edge-case handling.
- Add concrete implementation guidance (e.g., exact component names, API route suggestions, database schema hints).
- Keep the tone direct and actionable — no fluff.
- The output must be plain text (no markdown fences). Use ━━ separators and ► bullets like the input.
- Do NOT remove any information from the original prompt. Only add and improve.
- Output ONLY the enhanced prompt. No preambles, no explanations, no commentary.`

/**
 * Calls NVIDIA NIM chat completion to enhance the generated prompt.
 * Falls back to the local prompt if the API call fails.
 *
 * @param {object} formData — questionnaire answers
 * @returns {{ prompt: string, aiEnhanced: boolean, error?: string }}
 */
export async function generateWithNvidia(formData) {
    const localPrompt = generateMasterPrompt(formData)

    try {
        const response = await fetch(NVIDIA_CHAT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: localPrompt },
                ],
                temperature: 0.6,
                max_tokens: 4096,
                top_p: 0.9,
            }),
        })

        if (!response.ok) {
            const errorBody = await response.text().catch(() => '')
            console.error(`NVIDIA API error ${response.status}:`, errorBody)

            if (response.status === 401 || response.status === 403) {
                return { prompt: localPrompt, aiEnhanced: false, error: 'Invalid NVIDIA API key. Using local prompt instead.' }
            }
            if (response.status === 429) {
                return { prompt: localPrompt, aiEnhanced: false, error: 'NVIDIA rate limit reached. Using local prompt instead.' }
            }
            return { prompt: localPrompt, aiEnhanced: false, error: `NVIDIA API error (${response.status}). Using local prompt instead.` }
        }

        const data = await response.json()
        const aiContent = data?.choices?.[0]?.message?.content?.trim()

        if (!aiContent) {
            return { prompt: localPrompt, aiEnhanced: false, error: 'Empty response from NVIDIA. Using local prompt instead.' }
        }

        return { prompt: aiContent, aiEnhanced: true }
    } catch (err) {
        console.error('NVIDIA API call failed:', err)
        return { prompt: localPrompt, aiEnhanced: false, error: 'Could not reach NVIDIA API. Using local prompt instead.' }
    }
}
