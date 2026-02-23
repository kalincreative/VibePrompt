import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CopyButton({ text, label = 'Copy Prompt' }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2200)
        } catch {
            const ta = document.createElement('textarea')
            ta.value = text
            ta.style.position = 'fixed'
            ta.style.opacity = '0'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
            setCopied(true)
            setTimeout(() => setCopied(false), 2200)
        }
    }

    return (
        <motion.button
            onClick={handleCopy}
            whileHover={{ y: -1, boxShadow: copied ? '0 4px 16px rgba(16,185,129,0.25)' : '0 4px 16px rgba(244,63,111,0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            aria-label={copied ? 'Copied!' : label}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                background: copied ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #F43F6F, #E11D55)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                outline: 'none',
                minWidth: '160px',
                boxShadow: copied ? '0 2px 8px rgba(16,185,129,0.3)' : '0 2px 8px rgba(244,63,111,0.3)',
                transition: 'background 0.3s',
            }}
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
                        ✓ Copied!
                    </motion.span>
                ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        📋 {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    )
}
