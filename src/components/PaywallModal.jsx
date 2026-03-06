import { motion, AnimatePresence } from 'framer-motion'
import { Lock, GraduationCap, Zap } from 'lucide-react'

export default function PaywallModal({ open, onClose }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="paywall-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 999,
                            background: 'rgba(15, 23, 42, 0.55)',
                            backdropFilter: 'blur(8px)',
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        key="paywall-modal"
                        initial={{ opacity: 0, scale: 0.86, y: 28 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 16 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '1.25rem', pointerEvents: 'none',
                        }}
                    >
                        <div style={{
                            pointerEvents: 'auto',
                            background: '#FFFFFF',
                            borderRadius: '1.375rem',
                            padding: '2.5rem 2rem 2rem',
                            maxWidth: '440px', width: '100%',
                            textAlign: 'center',
                            boxShadow: '0 32px 72px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.06)',
                            border: '1px solid #F1F5F9',
                            position: 'relative',
                        }}>
                            {/* Close */}
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute', top: '1rem', right: '1rem',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: '#94A3B8', fontSize: '1.35rem', lineHeight: 1,
                                    padding: '0.25rem', fontFamily: 'inherit',
                                }}
                                aria-label="Close"
                            >×</button>

                            {/* Lock icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                transition={{ delay: 0.1, duration: 0.45 }}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                                    background: '#FFF1F3', marginBottom: '1rem',
                                }}
                            >
                                <Lock size={24} color="#E11D55" strokeWidth={1.75} />
                            </motion.div>

                            {/* Headline */}
                            <h2 style={{
                                fontSize: '1.375rem', fontWeight: 800, color: '#0F172A',
                                marginBottom: '0.625rem', lineHeight: 1.25,
                            }}>
                                You've run out of free magic.
                            </h2>

                            {/* Description */}
                            <p style={{
                                fontSize: '0.875rem', color: '#64748B',
                                lineHeight: 1.7, marginBottom: '0.5rem',
                            }}>
                                You've used all <strong style={{ color: '#0F172A' }}>3 free credits</strong>.
                                Upgrade to Pro or join our exclusive Masterclass for unlimited prompt generations and premium support.
                            </p>

                            {/* Credits depleted pill */}
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                                padding: '0.3rem 0.75rem', borderRadius: '100px',
                                background: '#FFF1F3', border: '1px solid #FECDD6',
                                color: '#E11D55', fontSize: '0.75rem', fontWeight: 700,
                                marginBottom: '1.75rem',
                            }}>
                                <Lock size={12} strokeWidth={2.5} />
                                0 / 3 Credits Remaining
                            </div>

                            {/* CTA 1 — Primary: Masterclass */}
                            <a href="https://createandconvert.my" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', marginBottom: '0.625rem' }}>
                                <button style={{
                                    width: '100%', padding: '0.875rem 1.5rem',
                                    borderRadius: '0.75rem', border: 'none',
                                    background: 'linear-gradient(135deg, #F43F6F, #E11D55)',
                                    color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 700,
                                    cursor: 'pointer', fontFamily: 'inherit',
                                    boxShadow: '0 6px 18px rgba(225,29,85,0.35)',
                                    transition: 'opacity 0.2s, transform 0.15s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                                >
                                    <GraduationCap size={18} strokeWidth={2} />
                                    Join Masterclass (Lifetime Access)
                                </button>
                            </a>

                            {/* CTA 2 — Secondary: Subscribe RM19/mo */}
                            <a href="https://createandconvert.my/form/vp" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                                <button style={{
                                    width: '100%', padding: '0.8125rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    border: '1.5px solid #E2E8F0',
                                    background: '#F8FAFC',
                                    color: '#0F172A', fontSize: '0.9375rem', fontWeight: 700,
                                    cursor: 'pointer', fontFamily: 'inherit',
                                    transition: 'background 0.2s, border-color 0.2s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#CBD5E1' }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0' }}
                                >
                                    <Zap size={18} strokeWidth={2} />
                                    Subscribe for RM19/mo
                                </button>
                            </a>

                            <p style={{ fontSize: '0.7rem', color: '#CBD5E1', marginTop: '1.25rem' }}>
                                Cancel anytime · Secure payment
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
