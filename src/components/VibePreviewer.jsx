import { motion, AnimatePresence } from 'framer-motion'
import { designVibePresets } from '../utils/presets'

export default function VibePreviewer({ vibeId }) {
    const vibe = designVibePresets.find(v => v.id === vibeId)

    if (!vibe) {
        return (
            <div style={{
                padding: '1.25rem',
                background: '#F8FAFC',
                borderRadius: '0.75rem',
                border: '1px solid #E2E8F0',
                textAlign: 'center',
                color: '#94A3B8',
                fontSize: '0.875rem',
            }}>
                Select a design vibe to preview
            </div>
        )
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={vibe.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                style={{
                    padding: '1.25rem',
                    background: '#F8FAFC',
                    borderRadius: '0.75rem',
                    border: '1px solid #E2E8F0',
                }}
            >
                <div style={{ marginBottom: '0.875rem' }}>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
                        {vibe.name}
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: '#64748B' }}>{vibe.description}</p>
                </div>

                {/* Color palette */}
                <div style={{ marginBottom: '0.875rem' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', marginBottom: '0.375rem' }}>
                        Color Palette
                    </span>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                        {vibe.colors.map((color, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05, type: 'spring', stiffness: 500 }}
                                title={color}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    background: color,
                                    border: '2px solid #E2E8F0',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Font */}
                <div style={{ marginBottom: '0.875rem' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', marginBottom: '0.25rem' }}>Font</span>
                    <span style={{ fontSize: '0.875rem', color: '#334155' }}>{vibe.font}</span>
                </div>

                {/* Mini preview card */}
                <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', marginBottom: '0.375rem' }}>Preview</span>
                    <motion.div style={{ padding: '0.875rem', borderRadius: '10px', ...parseCSSString(vibe.css) }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.25rem' }}>Sample Card</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>This is how your app will feel.</div>
                        <div style={{
                            marginTop: '0.625rem',
                            display: 'inline-block',
                            padding: '0.3rem 0.625rem',
                            borderRadius: '6px',
                            background: vibe.colors[3] || vibe.colors[2],
                            color: vibe.darkMode ? '#fff' : '#000',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                        }}>
                            Action
                        </div>
                    </motion.div>
                </div>

                {/* Badge */}
                <div style={{ marginTop: '0.625rem' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '100px',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        background: vibe.darkMode ? '#EEF2FF' : '#FFF7ED',
                        color: vibe.darkMode ? '#4F46E5' : '#EA580C',
                        border: `1px solid ${vibe.darkMode ? '#C7D2FE' : '#FDBA74'}`,
                    }}>
                        {vibe.darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </span>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

function parseCSSString(cssString) {
    if (!cssString) return {}
    const style = {}
    cssString.split(';').forEach(rule => {
        const [prop, val] = rule.split(':').map(s => s?.trim())
        if (prop && val) {
            const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
            style[camelProp] = val
        }
    })
    return style
}
