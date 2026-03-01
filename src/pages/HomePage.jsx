import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'

const features = [
    { icon: '📝', title: 'Guided Questionnaire', desc: 'Simple, jargon-free form that captures your app idea step by step.' },
    { icon: '🧠', title: 'Smart Prompt Engine', desc: 'Instantly generates a Senior Developer-level instruction prompt.' },
    { icon: '🎨', title: 'Design Vibes', desc: 'Pick a visual style — Minimal, Neon, Frosted Glass, and more.' },
    { icon: '🚀', title: 'No Jargon Needed', desc: 'Just pick your app type. We handle the tech stack for you.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Copy your prompt and paste it straight into Canva Code or any AI tool.' },
    { icon: '👁', title: 'Vibe Preview', desc: 'See colors, fonts, and a preview of your chosen design vibe.' },
]

const templates = [
    {
        icon: '📊',
        title: 'Event Registration System',
        desc: 'A multi-step form to collect attendee details, save to Google Sheets, and auto-send a confirmation email.',
    },
    {
        icon: '🚀',
        title: 'High-Converting Sales Page',
        desc: 'A landing page with hero, testimonials, pricing tables, and a CTA button redirecting to a payment gateway.',
    },
    {
        icon: '🏢',
        title: 'Corporate Inquiry Portal',
        desc: 'A professional contact page with a dynamic dropdown form, connected to a Google Sheet database.',
    },
]

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

export default function HomePage() {
    return (
        <div style={{ minHeight: '100vh', overflowX: 'hidden', background: '#FFFFFF' }}>
            {/* ── Hero ─────────────────────────────────────────────── */}
            <section style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '5rem 1.25rem 3rem',
                minHeight: '75vh',
                overflow: 'hidden',
            }}>
                {/* Animated mesh gradient blobs */}
                <div className="mesh-blob blob-1" />
                <div className="mesh-blob blob-2" />
                <div className="mesh-blob blob-3" />

                {/* Badge */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    style={{
                        position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.5rem 1rem', borderRadius: '100px',
                        background: '#FFF1F3', border: '1px solid #FECDD6',
                        color: '#E11D55', fontSize: '0.75rem', fontWeight: 700,
                        letterSpacing: '0.03em', marginBottom: '1.5rem',
                    }}
                >
                    ✦ Your Canva Code Prompt Superpower
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        position: 'relative', zIndex: 1,
                        fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1,
                        letterSpacing: '-0.02em', marginBottom: '1.25rem', maxWidth: '700px', color: '#0F172A',
                    }}
                >
                    Turn Canva Designs Into{' '}
                    <span style={{ background: 'linear-gradient(135deg, #F43F6F, #E11D55)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Fully Functional Apps
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                        position: 'relative', zIndex: 1,
                        fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)', color: '#64748B',
                        maxWidth: '580px', lineHeight: 1.65, marginBottom: '2rem',
                    }}
                >
                    Stop struggling with complex coding. VibePrompt generates precise, structured prompts that guide AI and Canva Code to build your frontend layouts and backend in minutes.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    <Link to="/generate" style={{ textDecoration: 'none' }}>
                        <Button variant="primary">🚀 Start Building</Button>
                    </Link>
                    <a href="#features" style={{ textDecoration: 'none' }}>
                        <Button variant="ghost">How It Works ↓</Button>
                    </a>
                </motion.div>

                {/* Tool pills */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '0.75rem', marginTop: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    {['Booking Calendar', 'Corporate Website', 'Landing Page', 'Invitation Form'].map((tool, i) => (
                        <motion.span key={tool}
                            animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }}
                            style={{
                                padding: '0.375rem 0.875rem', borderRadius: '100px',
                                background: '#F8FAFC', border: '1px solid #E2E8F0',
                                color: '#64748B', fontSize: '0.75rem', fontWeight: 600,
                            }}
                        >
                            {tool}
                        </motion.span>
                    ))}
                </motion.div>
            </section>

            {/* ── Ready-to-Use Templates ────────────────────────────── */}
            <section style={{
                padding: '4rem 1.5rem 5rem',
                background: '#F8FAFC',
                borderTop: '1px solid #F1F5F9',
                borderBottom: '1px solid #F1F5F9',
            }}>
                <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                    >
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.625rem' }}>
                            Out of ideas? Start with a proven template.
                        </h2>
                        <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
                            Click on any of these ready-made project concepts to jumpstart your Canva Code workflow.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="templates-grid"
                    >
                        {templates.map(t => (
                            <motion.div key={t.title} variants={item}>
                                <div className="template-card">
                                    <span style={{ fontSize: '2.25rem', display: 'block', marginBottom: '1rem' }}>{t.icon}</span>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>{t.title}</h3>
                                    <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>{t.desc}</p>
                                    <Link to="/generate" style={{ textDecoration: 'none' }}>
                                        <button style={{
                                            width: '100%', padding: '0.625rem 1rem',
                                            borderRadius: '0.625rem', border: '1.5px solid #FECDD6',
                                            background: '#FFF1F3', color: '#E11D55',
                                            fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            fontFamily: 'inherit',
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.background = '#E11D55'; e.currentTarget.style.color = '#fff' }}
                                            onMouseLeave={e => { e.currentTarget.style.background = '#FFF1F3'; e.currentTarget.style.color = '#E11D55' }}
                                        >
                                            Use Template →
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Features ─────────────────────────────────────────── */}
            <section id="features" style={{
                padding: '3rem 1.5rem 5rem',
                maxWidth: '1120px',
                margin: '0 auto',
            }}>
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}
                >
                    Everything You Need
                </motion.h2>
                <p style={{ textAlign: 'center', color: '#64748B', fontSize: '0.9375rem', marginBottom: '2.5rem' }}>
                    From zero to a fully integrated Canva web app in under 5 minutes.
                </p>

                <motion.div
                    variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="features-grid"
                >
                    {features.map(f => (
                        <motion.div key={f.title} variants={item}>
                            <div style={{
                                height: '100%', padding: '1.5rem',
                                background: '#FFFFFF', borderRadius: '1rem',
                                border: '1px solid #F1F5F9',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
                                transition: 'box-shadow 0.2s, transform 0.2s',
                                cursor: 'default',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(244,63,111,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)'; e.currentTarget.style.transform = 'translateY(0)' }}
                            >
                                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>{f.icon}</span>
                                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>{f.title}</h3>
                                <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.55 }}>{f.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    style={{ textAlign: 'center', marginTop: '3rem' }}
                >
                    <Link to="/generate" style={{ textDecoration: 'none' }}>
                        <Button variant="primary">✦ Generate Your Prompt</Button>
                    </Link>
                </motion.div>
            </section>

            {/* ── Footer ───────────────────────────────────────────── */}
            <footer style={{
                textAlign: 'center', padding: '2rem 1.25rem',
                borderTop: '1px solid #F1F5F9', color: '#94A3B8', fontSize: '0.75rem',
            }}>
                Built with ✦ by VibePrompt — Kalin Creative 2026
            </footer>

            {/* Styles */}
            <style>{`
        .templates-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 768px) {
          .templates-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .template-card {
          height: 100%;
          padding: 1.75rem;
          background: #FFFFFF;
          border-radius: 1rem;
          border: 1px solid #F1F5F9;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .template-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(244,63,111,0.10);
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        }
        @media (min-width: 1024px) {
          .features-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .mesh-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
        }
        .blob-1 {
          top: -10%; right: -8%;
          width: 650px; height: 650px;
          background: rgba(251, 113, 133, 0.38);
          filter: blur(90px);
          animation: blobDrift1 14s ease-in-out infinite;
        }
        .blob-2 {
          bottom: -5%; left: -12%;
          width: 580px; height: 580px;
          background: rgba(232, 121, 249, 0.30);
          filter: blur(100px);
          animation: blobDrift2 15s ease-in-out infinite;
        }
        .blob-3 {
          top: 35%; left: 55%;
          width: 480px; height: 480px;
          background: rgba(253, 186, 116, 0.22);
          filter: blur(80px);
          animation: blobDrift3 12s ease-in-out infinite;
        }
        @keyframes blobDrift1 {
          0%   { transform: translate(0, 0) scale(1) rotate(0deg); }
          33%  { transform: translate(-80px, 60px) scale(1.15) rotate(60deg); }
          66%  { transform: translate(50px, -40px) scale(0.88) rotate(120deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @keyframes blobDrift2 {
          0%   { transform: translate(0, 0) scale(1) rotate(0deg); }
          33%  { transform: translate(90px, -50px) scale(1.18) rotate(-45deg); }
          66%  { transform: translate(-60px, 70px) scale(0.85) rotate(-90deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @keyframes blobDrift3 {
          0%   { transform: translate(0, 0) scale(1) rotate(0deg); }
          33%  { transform: translate(-70px, -80px) scale(1.2) rotate(70deg); }
          66%  { transform: translate(85px, 45px) scale(0.82) rotate(140deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @media (max-width: 640px) {
          .mesh-blob { width: 280px !important; height: 280px !important; }
        }
      `}</style>
        </div>
    )
}
