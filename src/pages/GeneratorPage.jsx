import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'
import InputField from '../components/InputField'
import TextArea from '../components/TextArea'
import SelectField from '../components/SelectField'
import StepIndicator from '../components/StepIndicator'
import CopyButton from '../components/CopyButton'
import VibePreviewer from '../components/VibePreviewer'
import { appTypePresets, designVibePresets, featureTemplates } from '../utils/presets'
import { generateMegaPrompt } from '../utils/promptEngine'
import { useAuth } from '../hooks/useAuth'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const initialFormData = {
    appName: '',
    appDescription: '',
    targetAudience: '',
    appTypeId: '',
    designVibeId: '',
    features: [],
    additionalNotes: '',
    primaryColor: '',
    secondaryColor: '',
    logoUrl: '',
}

export default function GeneratorPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState(initialFormData)
    const [block1, setBlock1] = useState('')
    const [block2, setBlock2] = useState('')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const { user } = useAuth()

    const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

    const toggleFeature = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature],
        }))
    }

    const canAdvance = () => {
        if (step === 1) return formData.appName.trim() && formData.appDescription.trim()
        if (step === 2) return formData.appTypeId && formData.designVibeId
        if (step === 3) return true
        return true
    }

    const handleGenerate = async () => {
        const { block1: b1, block2: b2 } = generateMegaPrompt(formData)
        setBlock1(b1)
        setBlock2(b2)
        setStep(4)

        // Auto-save for logged-in users
        if (user && isSupabaseConfigured()) {
            setSaving(true)
            try {
                await supabase.from('saved_prompts').insert({
                    user_id: user.id,
                    prompt_text: b1 + '\n\n---\n\n' + b2,
                    app_name: formData.appName,
                })
                setSaved(true)
            } catch (err) {
                console.error('Failed to save prompt:', err)
            } finally {
                setSaving(false)
            }
        }
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setBlock1('')
        setBlock2('')
        setSaved(false)
        setStep(1)
    }

    return (
        <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '1.5rem 1.25rem 4rem',
            minHeight: 'calc(100vh - 56px)',
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                    ✦ Prompt Generator
                </h1>
                <p style={{ color: '#64748B', fontSize: '0.875rem' }}>
                    Fill in the form, get a pro-level prompt
                </p>
            </div>

            <StepIndicator currentStep={step} />

            {/* Main content */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: step === 4 ? '1fr' : '1fr',
                gap: '1.5rem',
                marginTop: '1.25rem',
                alignItems: 'start',
            }} className="generator-grid">
                {/* FORM */}
                {step < 4 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }} className="form-layout">
                        <AnimatePresence mode="wait">
                            <motion.div key={step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                                <GlassCard highlight>
                                    {/* Step 1 */}
                                    {step === 1 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#F43F6F' }}>
                                                Step 1 — Tell us about your project
                                            </h2>
                                            <InputField label="System / Website Name" id="appName" value={formData.appName} onChange={e => update('appName', e.target.value)} placeholder="e.g., Sistem Resit, Sales Page Tudung" required />
                                            <TextArea label="Describe your workflow or website purpose" id="appDescription" value={formData.appDescription} onChange={e => update('appDescription', e.target.value)} placeholder="Describe the flow. E.g., A sales page with a form where user fills details, data saves to Google Sheets, and redirects to WhatsApp." required />
                                            <InputField label="Who is it for?" id="targetAudience" value={formData.targetAudience} onChange={e => update('targetAudience', e.target.value)} placeholder="e.g., University students aged 18-25 in Malaysia" />
                                        </div>
                                    )}

                                    {/* Step 2 — NO TECH JARGON */}
                                    {step === 2 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#F43F6F' }}>
                                                Step 2 — Style & Type
                                            </h2>

                                            <SelectField
                                                label="What type of project are you building?"
                                                id="appType"
                                                value={formData.appTypeId}
                                                onChange={e => update('appTypeId', e.target.value)}
                                                options={appTypePresets.map(t => ({ value: t.id, label: t.name }))}
                                                placeholder="Choose one..."
                                                required
                                            />

                                            {formData.appTypeId && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                                    style={{
                                                        padding: '0.75rem 1rem', background: '#FFF1F3',
                                                        border: '1px solid #FECDD6', borderRadius: '0.625rem',
                                                        fontSize: '0.8125rem', color: '#64748B',
                                                    }}
                                                >
                                                    {appTypePresets.find(t => t.id === formData.appTypeId)?.description}
                                                </motion.div>
                                            )}

                                            <SelectField
                                                label="What vibe should your system/website have?"
                                                id="designVibe"
                                                value={formData.designVibeId}
                                                onChange={e => update('designVibeId', e.target.value)}
                                                options={designVibePresets.map(v => ({ value: v.id, label: v.name }))}
                                                placeholder="Pick a look & feel..."
                                                required
                                            />

                                            {/* Custom Branding (Optional) */}
                                            <div style={{
                                                marginTop: '0.5rem', padding: '1rem',
                                                background: '#F8FAFC', border: '1px solid #E2E8F0',
                                                borderRadius: '0.75rem',
                                            }}>
                                                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                                                    🎨 Custom Branding (Optional)
                                                </h3>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                    <InputField label="Primary Brand Color (HEX)" id="primaryColor" value={formData.primaryColor} onChange={e => update('primaryColor', e.target.value)} placeholder="#FF5733" />
                                                    <InputField label="Secondary Brand Color (HEX)" id="secondaryColor" value={formData.secondaryColor} onChange={e => update('secondaryColor', e.target.value)} placeholder="#333333" />
                                                    <InputField label="Logo URL (Optional)" id="logoUrl" value={formData.logoUrl} onChange={e => update('logoUrl', e.target.value)} placeholder="https://your-logo-link.png" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3 */}
                                    {step === 3 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#F43F6F' }}>
                                                Step 3 — Select Backend Integrations
                                            </h2>
                                            <p style={{ fontSize: '0.8125rem', color: '#64748B' }}>
                                                Tap the backend integrations your project needs (optional):
                                            </p>

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {featureTemplates.map(feature => {
                                                    const isSelected = formData.features.includes(feature)
                                                    return (
                                                        <motion.button key={feature} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => toggleFeature(feature)}
                                                            style={{
                                                                padding: '0.625rem 1rem', borderRadius: '0.625rem',
                                                                fontSize: '0.8125rem', fontWeight: 600, fontFamily: 'inherit',
                                                                cursor: 'pointer', outline: 'none', transition: 'all 0.2s',
                                                                background: isSelected ? '#FFF1F3' : '#F8FAFC',
                                                                border: `2px solid ${isSelected ? '#F43F6F' : '#E2E8F0'}`,
                                                                color: isSelected ? '#E11D55' : '#64748B',
                                                            }}
                                                        >
                                                            {isSelected ? '✓ ' : ''}{feature}
                                                        </motion.button>
                                                    )
                                                })}
                                            </div>

                                            <TextArea label="Anything else? (optional)" id="additionalNotes" value={formData.additionalNotes} onChange={e => update('additionalNotes', e.target.value)} placeholder="Color preferences, specific integrations, special behaviors..." rows={3} />
                                        </div>
                                    )}

                                    {/* Nav buttons */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: step > 1 ? 'space-between' : 'flex-end',
                                        gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap',
                                    }}>
                                        {step > 1 && <Button variant="ghost" onClick={() => setStep(s => s - 1)}>← Back</Button>}
                                        {step < 3 && <Button onClick={() => setStep(s => s + 1)} disabled={!canAdvance()}>Next →</Button>}
                                        {step === 3 && <Button onClick={handleGenerate} disabled={!canAdvance()}>✦ Generate Prompt</Button>}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>

                        {/* RIGHT SIDEBAR — sticky */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '72px', alignSelf: 'start' }}>
                            {step >= 2 && formData.designVibeId && (
                                <GlassCard>
                                    <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.625rem' }}>🎨 Vibe Preview</h3>
                                    <VibePreviewer vibeId={formData.designVibeId} />
                                </GlassCard>
                            )}

                            <GlassCard>
                                <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.625rem' }}>📋 Your Prompt Summary</h3>
                                <div style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.7 }}>
                                    {formData.appName ? (
                                        <>
                                            <div><strong style={{ color: '#0F172A' }}>Project:</strong> {formData.appName}</div>
                                            {formData.appDescription && <div><strong style={{ color: '#0F172A' }}>Does:</strong> {formData.appDescription.substring(0, 80)}{formData.appDescription.length > 80 ? '...' : ''}</div>}
                                            {formData.targetAudience && <div><strong style={{ color: '#0F172A' }}>For:</strong> {formData.targetAudience}</div>}
                                            {formData.appTypeId && <div><strong style={{ color: '#0F172A' }}>Type:</strong> {appTypePresets.find(t => t.id === formData.appTypeId)?.name}</div>}
                                            {formData.designVibeId && <div><strong style={{ color: '#0F172A' }}>Vibe:</strong> {designVibePresets.find(v => v.id === formData.designVibeId)?.name}</div>}
                                            {formData.features.length > 0 && <div><strong style={{ color: '#0F172A' }}>Features:</strong> {formData.features.length} selected</div>}
                                        </>
                                    ) : (
                                        <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>Start filling in the form to see your summary...</span>
                                    )}
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                )}

                {/* OUTPUT (Step 4) */}
                {step === 4 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        {/* Header */}
                        <GlassCard highlight>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A' }}>✨ Your 2-Block Mega Prompt</h2>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <CopyButton text={block1 + '\n\n---\n\n' + block2} />
                                    <Button variant="ghost" onClick={handleReset}>↺ New Prompt</Button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <span style={{ padding: '0.2rem 0.625rem', borderRadius: '100px', background: '#ECFDF5', border: '1px solid #6EE7B7', color: '#059669', fontSize: '0.6875rem', fontWeight: 600 }}>
                                    ✦ Canva Code + Google Apps Script
                                </span>
                                {saved && (
                                    <span style={{ padding: '0.2rem 0.625rem', borderRadius: '100px', background: '#FFF1F3', border: '1px solid #FECDD6', color: '#E11D55', fontSize: '0.6875rem', fontWeight: 600 }}>
                                        ✓ Saved to your dashboard
                                    </span>
                                )}
                                {saving && (
                                    <span style={{ padding: '0.2rem 0.625rem', borderRadius: '100px', background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#94A3B8', fontSize: '0.6875rem', fontWeight: 600 }}>
                                        Saving...
                                    </span>
                                )}
                            </div>
                        </GlassCard>

                        {/* Block 1 — GAS Backend Setup */}
                        <GlassCard>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>📋 Block 1 — Backend Setup (GAS)</h3>
                                <CopyButton text={block1} />
                            </div>
                            <pre style={{
                                background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '0.75rem',
                                padding: '1.25rem', fontSize: '0.8125rem', lineHeight: 1.6,
                                color: '#334155', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                maxHeight: '50vh', overflow: 'auto',
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            }}>
                                {block1}
                            </pre>
                        </GlassCard>

                        {/* Block 2 — Canva Code Frontend Prompts */}
                        <GlassCard>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>🎨 Block 2 — Frontend Prompt Generator (Canva Code)</h3>
                                <CopyButton text={block2} />
                            </div>
                            <pre style={{
                                background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '0.75rem',
                                padding: '1.25rem', fontSize: '0.8125rem', lineHeight: 1.6,
                                color: '#334155', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                maxHeight: '50vh', overflow: 'auto',
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            }}>
                                {block2}
                            </pre>
                        </GlassCard>

                        {/* How to Use — 4 Steps */}
                        <div style={{
                            padding: '1rem 1.125rem', background: '#FFF1F3', border: '1px solid #FECDD6',
                            borderRadius: '0.75rem', fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.75,
                        }}>
                            <strong style={{ color: '#E11D55', fontSize: '0.875rem' }}>💡 How to Use These Prompts</strong>
                            <ol style={{ marginTop: '0.5rem', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <li><strong style={{ color: '#0F172A' }}>Step 1 — Setup:</strong> Open ChatGPT or Claude. Paste <strong>Block 1</strong> and answer the follow-up questions (Sheet ID, Folder ID, etc.).</li>
                                <li><strong style={{ color: '#0F172A' }}>Step 2 — Deploy:</strong> Copy the GAS code, paste into Google Apps Script, and deploy as a Web App. Copy the Web App URL.</li>
                                <li><strong style={{ color: '#0F172A' }}>Step 3 — UI:</strong> Paste <strong>Block 2</strong> into the <strong>same chat</strong>. Replace <code>[YOUR GAS WEBAPP URL HERE]</code> with your real URL in the generated Canva Code prompts.</li>
                                <li><strong style={{ color: '#0F172A' }}>Step 4 — Build:</strong> Copy the Canva Code prompts into Canva Code's AI, one at a time (UI first, then JS Logic).</li>
                            </ol>
                        </div>
                    </motion.div>
                )}




            </div>

            <style>{`
        @media (max-width: 768px) {
          .form-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div >
    )
}
