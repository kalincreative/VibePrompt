import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import GeneratorPage from './pages/GeneratorPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { supabase } from './lib/supabase'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
    const [showVerifiedModal, setShowVerifiedModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!supabase) return

        // Supabase puts the auth tokens in the URL hash after email confirmation.
        // The hash contains `type=signup` for email verification flows.
        const hash = window.location.hash
        const isEmailVerification = hash.includes('type=signup') || hash.includes('type=recovery')

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' && isEmailVerification) {
                // Clear the hash tokens from the URL immediately so the modal
                // only shows once, even if the user refreshes.
                window.history.replaceState(null, '', window.location.pathname)
                setShowVerifiedModal(true)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleGoGenerate = () => {
        setShowVerifiedModal(false)
        navigate('/generate')
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/generate" element={
                        <ProtectedRoute>
                            <GeneratorPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="*" element={
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            minHeight: '60vh', padding: '2rem', textAlign: 'center',
                        }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>404</h1>
                            <p style={{ color: '#64748B', fontSize: '0.9375rem' }}>Page not found.</p>
                        </div>
                    } />
                </Routes>
            </main>

            {/* ── Email Verified Modal ───────────────────────────────── */}
            <AnimatePresence>
                {showVerifiedModal && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowVerifiedModal(false)}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 999,
                                background: 'rgba(15, 23, 42, 0.45)',
                                backdropFilter: 'blur(6px)',
                            }}
                        />

                        {/* Modal card */}
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.88, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 16 }}
                            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 1000,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                padding: '1.25rem',
                                pointerEvents: 'none',
                            }}
                        >
                            <div style={{
                                pointerEvents: 'auto',
                                background: '#FFFFFF',
                                borderRadius: '1.25rem',
                                padding: '2.5rem 2rem',
                                maxWidth: '420px',
                                width: '100%',
                                textAlign: 'center',
                                boxShadow: '0 24px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)',
                                border: '1px solid #F1F5F9',
                                position: 'relative',
                            }}>
                                {/* Close button */}
                                <button
                                    onClick={() => setShowVerifiedModal(false)}
                                    style={{
                                        position: 'absolute', top: '1rem', right: '1rem',
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        color: '#94A3B8', fontSize: '1.25rem', lineHeight: 1,
                                        padding: '0.25rem',
                                    }}
                                    aria-label="Close"
                                >×</button>

                                {/* Confetti icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.25, 1] }}
                                    transition={{ delay: 0.15, duration: 0.45 }}
                                    style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1 }}
                                >
                                    🎉
                                </motion.div>

                                <h2 style={{
                                    fontSize: '1.375rem', fontWeight: 800, color: '#0F172A',
                                    marginBottom: '0.5rem', lineHeight: 1.25,
                                }}>
                                    Email Verified Successfully!
                                </h2>
                                <p style={{
                                    fontSize: '0.875rem', color: '#64748B',
                                    lineHeight: 1.65, marginBottom: '1.75rem',
                                }}>
                                    Your account is all set. Start generating powerful Canva Code prompts right now.
                                </p>

                                <button
                                    onClick={handleGoGenerate}
                                    style={{
                                        width: '100%', padding: '0.8125rem 1.5rem',
                                        borderRadius: '0.75rem', border: 'none',
                                        background: 'linear-gradient(135deg, #F43F6F, #E11D55)',
                                        color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 700,
                                        cursor: 'pointer', fontFamily: 'inherit',
                                        boxShadow: '0 4px 14px rgba(225,29,85,0.35)',
                                        transition: 'opacity 0.2s, transform 0.2s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                    🚀 Start Generating Prompts
                                </button>

                                <p style={{ fontSize: '0.75rem', color: '#CBD5E1', marginTop: '1rem' }}>
                                    Welcome to VibePrompt ✦
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
