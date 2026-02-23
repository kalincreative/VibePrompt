import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 40, label = 'Loading...' }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '3rem' }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    border: '3px solid #F1F5F9',
                    borderTopColor: '#F43F6F',
                }}
            />
            <span style={{ color: '#94A3B8', fontSize: '0.8125rem', fontWeight: 600 }}>{label}</span>
        </div>
    )
}
