const baseStyle = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '0.75rem',
    color: '#0F172A',
    fontSize: '0.9375rem',
    fontFamily: 'inherit',
    outline: 'none',
    appearance: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default function SelectField({ label, id, value, onChange, options = [], placeholder = 'Select...', required = false }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {label && (
                <label htmlFor={id} style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}>
                    {label} {required && <span style={{ color: '#F43F6F' }}>*</span>}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    style={{ ...baseStyle, paddingRight: '2.5rem' }}
                    onFocus={e => {
                        e.target.style.borderColor = '#F43F6F'
                        e.target.style.boxShadow = '0 0 0 3px rgba(244,63,111,0.1)'
                    }}
                    onBlur={e => {
                        e.target.style.borderColor = '#E2E8F0'
                        e.target.style.boxShadow = 'none'
                    }}
                >
                    <option value="" disabled style={{ color: '#94A3B8' }}>{placeholder}</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <span style={{
                    position: 'absolute',
                    right: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#94A3B8',
                    fontSize: '0.75rem',
                }}>▼</span>
            </div>
        </div>
    )
}
