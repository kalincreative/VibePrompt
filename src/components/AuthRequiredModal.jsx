import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AuthRequiredModal({ open, onClose }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="auth-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 999,
                            background: 'rgba(15, 23, 42, 0.5)',
                            backdropFilter: 'blur(8px)',
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        key="auth-modal"
                        initial={{ opacity: 0, scale: 0.88, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 16 }}
                        transition={{ type: 'spring', stiffness: 330, damping: 27 }}
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
                            maxWidth: '420px', width: '100%',
                            textAlign: 'center',
                            boxShadow: '0 32px 72px rgba(0,0,0,0.16), 0 4px 20px rgba(0,0,0,0.06)',
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

                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                                    background: '#FFF1F3', marginBottom: '1rem',
                                }}
                            >
                                <UserPlus size={24} color="#E11D55" strokeWidth={1.75} />
                            </motion.div>

                            {/* Title */}
                            <h2 style={{
                                fontSize: '1.25rem', fontWeight: 800, color: '#0F172A',
                                marginBottom: '0.625rem', lineHeight: 1.3,
                            }}>
                                Sign in to generate your prompt.
                            </h2>

                            {/* Description */}
                            <p style={{
                                fontSize: '0.875rem', color: '#64748B',
                                lineHeight: 1.7, marginBottom: '1.75rem',
                            }}>
                                Create a free account to unlock your{' '}
                                <strong style={{ color: '#0F172A' }}>3 magic credits</strong>{' '}
                                and start building your Canva Code apps.
                            </p>

                            {/* Primary CTA */}
                            <Link to="/login" style={{ textDecoration: 'none', display: 'block', marginBottom: '0.625rem' }}>
                                <button style={{
                                    width: '100%', padding: '0.875rem 1.5rem',
                                    borderRadius: '0.75rem', border: 'none',
                                    background: 'linear-gradient(135deg, #F43F6F, #E11D55)',
                                    color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 700,
                                    cursor: 'pointer', fontFamily: 'inherit',
                                    boxShadow: '0 6px 18px rgba(225,29,85,0.32)',
                                    transition: 'opacity 0.2s, transform 0.15s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                                >
                                    <UserPlus size={17} strokeWidth={2} />
                                    Create Free Account
                                </button>
                            </Link>

                            {/* Secondary CTA */}
                            <button
                                onClick={onClose}
                                style={{
                                    width: '100%', padding: '0.8125rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    border: '1.5px solid #E2E8F0',
                                    background: '#F8FAFC',
                                    color: '#64748B', fontSize: '0.9375rem', fontWeight: 600,
                                    cursor: 'pointer', fontFamily: 'inherit',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                                onMouseLeave={e => e.currentTarget.style.background = '#F8FAFC'}
                            >
                                Cancel
                            </button>

                            <p style={{ fontSize: '0.7rem', color: '#CBD5E1', marginTop: '1.25rem' }}>
                                Already have an account?{' '}
                                <Link to="/login" style={{ color: '#E11D55', textDecoration: 'none', fontWeight: 600 }} onClick={onClose}>
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
