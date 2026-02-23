import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'
import InputField from '../components/InputField'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const { signIn, signUp, isConfigured } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        const result = isLogin ? await signIn(email, password) : await signUp(email, password)
        setLoading(false)

        if (result.error) {
            setError(result.error.message)
        } else if (isLogin) {
            navigate('/generate')
        } else {
            setSuccess('Account created! Check your email to confirm, then log in.')
            setIsLogin(true)
        }
    }

    return (
        <div style={{
            minHeight: 'calc(100vh - 56px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem 1.25rem', background: '#F8FAFC',
        }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '420px' }}>
                <GlassCard highlight>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.375rem', color: '#0F172A' }}>
                        {isLogin ? '👋 Welcome Back' : '🚀 Create Account'}
                    </h1>
                    <p style={{ textAlign: 'center', color: '#64748B', fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
                        {isLogin ? 'Log in to save your prompts.' : 'Sign up to save and revisit prompts.'}
                    </p>

                    {!isConfigured && (
                        <div style={{
                            padding: '0.75rem 1rem', background: '#FFF7ED',
                            border: '1px solid #FDBA74', borderRadius: '0.625rem',
                            fontSize: '0.8125rem', color: '#EA580C', marginBottom: '1.25rem', lineHeight: 1.5,
                        }}>
                            ⚠️ Supabase is not configured. Add your credentials to <strong>.env.local</strong> to enable auth.
                        </div>
                    )}

                    {error && (
                        <div style={{
                            padding: '0.75rem 1rem', background: '#FEF2F2',
                            border: '1px solid #FECACA', borderRadius: '0.625rem',
                            fontSize: '0.8125rem', color: '#DC2626', marginBottom: '1rem',
                        }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{
                            padding: '0.75rem 1rem', background: '#F0FDF4',
                            border: '1px solid #BBF7D0', borderRadius: '0.625rem',
                            fontSize: '0.8125rem', color: '#16A34A', marginBottom: '1rem',
                        }}>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <InputField label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
                        <InputField label="Password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                        <Button type="submit" fullWidth disabled={loading || !isConfigured}>
                            {loading ? 'Loading...' : isLogin ? 'Log In' : 'Create Account'}
                        </Button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                        <button
                            onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess('') }}
                            style={{
                                background: 'none', border: 'none',
                                color: '#F43F6F', fontSize: '0.8125rem', fontWeight: 600,
                                cursor: 'pointer', fontFamily: 'inherit',
                            }}
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                        </button>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    )
}
