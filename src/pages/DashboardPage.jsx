import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'
import CopyButton from '../components/CopyButton'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth()
    const [prompts, setPrompts] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedId, setExpandedId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login')
            return
        }
        if (user && isSupabaseConfigured()) {
            fetchPrompts()
        }
    }, [user, authLoading])

    const fetchPrompts = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('saved_prompts')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
            if (error) throw error
            setPrompts(data || [])
        } catch (err) {
            console.error('Failed to fetch prompts:', err)
        } finally {
            setLoading(false)
        }
    }

    const deletePrompt = async (id) => {
        try {
            await supabase.from('saved_prompts').delete().eq('id', id)
            setPrompts(prev => prev.filter(p => p.id !== id))
        } catch (err) {
            console.error('Failed to delete prompt:', err)
        }
    }

    if (authLoading) return <LoadingSpinner label="Loading..." />

    if (!isSupabaseConfigured()) {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 1.25rem', textAlign: 'center' }}>
                <GlassCard>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Dashboard</h2>
                    <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '1rem' }}>Supabase is not configured. Add your credentials to <strong>.env.local</strong> to enable saved prompts.</p>
                    <Link to="/generate" style={{ textDecoration: 'none' }}><Button>Go to Generator</Button></Link>
                </GlassCard>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>📋 Your Prompts</h1>
                    <p style={{ color: '#64748B', fontSize: '0.875rem' }}>All your generated prompts, saved automatically.</p>
                </div>
                <Link to="/generate" style={{ textDecoration: 'none' }}>
                    <Button>✦ New Prompt</Button>
                </Link>
            </div>

            {loading ? (
                <LoadingSpinner label="Loading your prompts..." />
            ) : prompts.length === 0 ? (
                <GlassCard>
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🚀</span>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>No prompts yet</h3>
                        <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Generate your first prompt and it will appear here.</p>
                        <Link to="/generate" style={{ textDecoration: 'none' }}>
                            <Button>Create Your First Prompt</Button>
                        </Link>
                    </div>
                </GlassCard>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <AnimatePresence>
                        {prompts.map(prompt => (
                            <motion.div
                                key={prompt.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                layout
                            >
                                <GlassCard>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
                                                {prompt.app_name || 'Untitled Prompt'}
                                            </h3>
                                            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                                                {new Date(prompt.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
                                            <CopyButton text={prompt.prompt_text} label="Copy" />
                                            <Button variant="ghost" onClick={() => setExpandedId(expandedId === prompt.id ? null : prompt.id)}>
                                                {expandedId === prompt.id ? 'Hide' : 'View'}
                                            </Button>
                                            <Button variant="danger" onClick={() => deletePrompt(prompt.id)}>
                                                🗑
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Expanded view */}
                                    <AnimatePresence>
                                        {expandedId === prompt.id && (
                                            <motion.pre
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                style={{
                                                    marginTop: '1rem',
                                                    background: '#F8FAFC',
                                                    border: '1px solid #E2E8F0',
                                                    borderRadius: '0.75rem',
                                                    padding: '1rem',
                                                    fontSize: '0.75rem',
                                                    lineHeight: 1.5,
                                                    color: '#334155',
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                    maxHeight: '300px',
                                                    overflow: 'auto',
                                                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                                }}
                                            >
                                                {prompt.prompt_text}
                                            </motion.pre>
                                        )}
                                    </AnimatePresence>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}
