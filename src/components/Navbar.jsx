import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
    const { user, signOut, isConfigured } = useAuth()
    const location = useLocation()

    const linkStyle = (path) => ({
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: location.pathname === path ? '#F43F6F' : '#64748B',
        padding: '0.375rem 0.75rem',
        borderRadius: '0.5rem',
        background: location.pathname === path ? '#FFF1F3' : 'transparent',
        transition: 'all 0.2s',
    })

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1.25rem',
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid #F1F5F9',
            }}
        >
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #F43F6F, #E11D55)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    ✦ VibePrompt
                </span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link to="/generate" style={linkStyle('/generate')}>Generator</Link>

                {user ? (
                    <>
                        <Link to="/dashboard" style={linkStyle('/dashboard')}>My Prompts</Link>
                        <button
                            onClick={signOut}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.375rem',
                                background: '#F8FAFC',
                                border: '1px solid #E2E8F0',
                                borderRadius: '0.5rem',
                                padding: '0.375rem 0.75rem',
                                color: '#64748B',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                            }}
                        >
                            <span style={{
                                width: '22px', height: '22px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #F43F6F, #E11D55)',
                                color: '#fff', fontSize: '0.6875rem', fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {user.email?.[0]?.toUpperCase() || '?'}
                            </span>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={{
                        textDecoration: 'none',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        padding: '0.375rem 0.875rem',
                        borderRadius: '0.5rem',
                        background: 'linear-gradient(135deg, #F43F6F, #E11D55)',
                        display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                    }}>
                        Sign In
                    </Link>
                )}
            </div>
        </motion.nav>
    )
}
