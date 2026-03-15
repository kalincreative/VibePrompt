// ═══════════════════════════════════════════════
// VIBEPROMPT — GEMINI API ROUTE HANDLER
// Handles POST /api/generate
// Calls Gemini 1.5 Flash and returns 3 parsed blocks
// ═══════════════════════════════════════════════

/**
 * Creates a Vite plugin that adds `/api/generate` as a dev server middleware.
 * The GEMINI_API_KEY is read from the server-side env (never exposed to the browser).
 */
export function geminiApiPlugin() {
    return {
        name: 'gemini-api',
        configureServer(server) {
            server.middlewares.use('/api/generate', async (req, res) => {
                // Only accept POST
                if (req.method !== 'POST') {
                    res.writeHead(405, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Method not allowed' }))
                    return
                }

                // Parse the request body
                let body = ''
                for await (const chunk of req) {
                    body += chunk
                }

                try {
                    const { formData } = JSON.parse(body)

                    if (!formData) {
                        res.writeHead(400, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ error: 'Missing formData in request body' }))
                        return
                    }

                    const apiKey = process.env.GEMINI_API_KEY
                    if (!apiKey) {
                        res.writeHead(500, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the server.' }))
                        return
                    }

                    // Build the prompt for Gemini
                    const systemPrompt =
                        'You are an expert Senior Low-Code Developer. The user wants to build a system based on this input: ' +
                        JSON.stringify(formData) +
                        '. Respond STRICTLY in this format with EXACTLY 3 sections separated by "===DIVIDER===":\n\n' +
                        '[Step-by-step Backend Setup Guide (e.g., creating Google Sheets, Google Drive folders, enabling specific Google Workspace APIs) AND the FULL Google Apps Script Code for doGet and doPost]\n' +
                        '===DIVIDER===\n' +
                        '[UI/UX Prompt for Canva Code]\n' +
                        '===DIVIDER===\n' +
                        '[JavaScript Logic Prompt for Canva Code]'

                    // Call Gemini API
                    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

                    const geminiResponse = await fetch(geminiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [{ text: systemPrompt }],
                                },
                            ],
                            generationConfig: {
                                temperature: 0.7,
                                maxOutputTokens: 8192,
                            },
                        }),
                    })

                    if (!geminiResponse.ok) {
                        let errorMessage = `Gemini API error (${geminiResponse.status})`
                        try {
                            const errorJson = await geminiResponse.json()
                            errorMessage = errorJson?.error?.message || errorMessage
                        } catch {
                            // Couldn't parse error JSON, use the default message
                        }
                        console.error(errorMessage)
                        res.writeHead(geminiResponse.status, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ error: errorMessage }))
                        return
                    }

                    const data = await geminiResponse.json()
                    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

                    if (!rawText) {
                        res.writeHead(502, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ error: 'Empty response from Gemini API.' }))
                        return
                    }

                    // Parse the 3 blocks using the divider
                    const blocks = rawText.split('===DIVIDER===').map(b => b.trim())

                    const result = {
                        block1: blocks[0] || '',
                        block2: blocks[1] || '',
                        block3: blocks[2] || '',
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(result))
                } catch (err) {
                    console.error('API /api/generate error:', err)
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Internal server error: ' + err.message }))
                }
            })
        },
    }
}
