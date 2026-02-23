import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', highlight = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={className}
      style={{
        padding: '1.5rem',
        background: '#FFFFFF',
        borderRadius: '1rem',
        border: highlight ? '2px solid #F43F6F' : '1px solid #E2E8F0',
        boxShadow: highlight
          ? '0 4px 24px rgba(244, 63, 111, 0.1)'
          : '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
