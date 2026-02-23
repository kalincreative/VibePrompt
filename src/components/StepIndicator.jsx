import { motion } from 'framer-motion'

const steps = [
    { num: 1, label: 'Basics' },
    { num: 2, label: 'Style & Type' },
    { num: 3, label: 'Features' },
    { num: 4, label: 'Your Prompt' },
]

export default function StepIndicator({ currentStep }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            padding: '1rem 0',
            width: '100%',
        }}>
            {steps.map((step, i) => (
                <div key={step.num} style={{ display: 'flex', alignItems: 'center' }}>
                    <motion.div
                        animate={{
                            background: currentStep >= step.num
                                ? 'linear-gradient(135deg, #F43F6F, #E11D55)'
                                : '#F1F5F9',
                            boxShadow: currentStep === step.num
                                ? '0 0 16px rgba(244,63,111,0.25)'
                                : 'none',
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                            color: currentStep >= step.num ? '#FFFFFF' : '#94A3B8',
                            border: currentStep >= step.num ? 'none' : '2px solid #E2E8F0',
                            flexShrink: 0,
                        }}
                    >
                        {currentStep > step.num ? '✓' : step.num}
                    </motion.div>

                    <span style={{
                        marginLeft: '0.375rem',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: currentStep >= step.num ? '#F43F6F' : '#94A3B8',
                        whiteSpace: 'nowrap',
                        display: 'none',
                    }} className="step-label">
                        {step.label}
                    </span>

                    {i < steps.length - 1 && (
                        <div style={{
                            width: '40px',
                            height: '2px',
                            background: currentStep > step.num ? '#F43F6F' : '#E2E8F0',
                            margin: '0 0.25rem',
                            borderRadius: '1px',
                            transition: 'background 0.3s',
                        }} />
                    )}
                </div>
            ))}
            <style>{`@media (min-width: 480px) { .step-label { display: inline !important; } }`}</style>
        </div>
    )
}
