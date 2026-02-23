import { motion } from 'framer-motion'

const variants = {
    primary: {
        background: 'linear-gradient(135deg, #F43F6F, #E11D55)',
        color: '#FFFFFF',
        border: 'none',
        boxShadow: '0 2px 8px rgba(244, 63, 111, 0.3)',
    },
    secondary: {
        background: '#FFFFFF',
        color: '#334155',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    },
    ghost: {
        background: 'transparent',
        color: '#64748B',
        border: '1px solid #E2E8F0',
        boxShadow: 'none',
    },
    danger: {
        background: '#FEF2F2',
        color: '#DC2626',
        border: '1px solid #FECACA',
        boxShadow: 'none',
    },
}

export default function Button({
    children,
    variant = 'primary',
    onClick,
    disabled = false,
    type = 'button',
    fullWidth = false,
    className = '',
    ...props
}) {
    const style = variants[variant] || variants.primary

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={disabled ? {} : { y: -1, boxShadow: variant === 'primary' ? '0 4px 16px rgba(244,63,111,0.35)' : '0 2px 8px rgba(0,0,0,0.08)' }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={className}
            style={{
                ...style,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                width: fullWidth ? '100%' : 'auto',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'background 0.2s',
            }}
            {...props}
        >
            {children}
        </motion.button>
    )
}
