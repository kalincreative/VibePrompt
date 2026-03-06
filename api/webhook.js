// api/webhook.js — Vercel Serverless Function
// Receives Bayarcash POST webhook → upgrades user to Pro in Supabase
// Uses the Service Role Key (bypasses RLS) — NEVER expose this on the frontend

import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const body = req.body || {}

        // ── Robustly extract the customer's email ────────────────────
        // Bayarcash and most payment gateways may nest email in various keys
        const email =
            body.customer_email ||
            body.email ||
            body?.data?.customer_email ||
            body?.data?.email ||
            body?.order?.email ||
            body?.customer?.email ||
            null

        if (!email) {
            console.warn('[webhook] No email found in payload:', JSON.stringify(body))
            // Return 200 so the gateway doesn't keep retrying a misconfigured payload
            return res.status(200).json({ received: true, warning: 'No email found in payload' })
        }

        // ── Init Supabase with Service Role Key (bypasses RLS) ───────
        const supabaseUrl = process.env.VITE_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !serviceKey) {
            console.error('[webhook] Missing Supabase env vars')
            return res.status(500).json({ error: 'Server misconfiguration' })
        }

        const supabase = createClient(supabaseUrl, serviceKey, {
            auth: { autoRefreshToken: false, persistSession: false },
        })

        // ── Upgrade user to Pro ──────────────────────────────────────
        const { error } = await supabase
            .from('profiles')
            .update({ is_pro: true })
            .eq('email', email.toLowerCase().trim())

        if (error) {
            console.error('[webhook] Supabase update error:', error.message)
            return res.status(500).json({ error: 'Database update failed' })
        }

        console.log(`[webhook] Upgraded to Pro: ${email}`)
        return res.status(200).json({ success: true, email })

    } catch (err) {
        console.error('[webhook] Unexpected error:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
}
