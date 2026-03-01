// ═══════════════════════════════════════════════
// VIBEPROMPT — PRESETS DATA
// App types (user-friendly) + design vibes
// Tech stacks are hidden, mapped automatically
// ═══════════════════════════════════════════════

// User-facing: project type choices for Canva Code + GAS workflow
export const appTypePresets = [
    {
        id: 'system-web-app',
        name: '🌐 System / Web App',
        description: 'A full system or web app with forms, data handling, and backend logic.',
        stack: ['Canva Code', 'Google Apps Script', 'Google Sheets'],
        fileStructure: 'canva-gas',
    },
    {
        id: 'sales-page',
        name: '💰 Sales Page',
        description: 'A conversion-focused page with forms, product info, and call-to-actions.',
        stack: ['Canva Code', 'Google Apps Script', 'Google Sheets'],
        fileStructure: 'canva-gas',
    },
    {
        id: 'landing-page',
        name: '🚀 Landing Page / Minisite',
        description: 'A compact, eye-catching page to capture leads or showcase a product.',
        stack: ['Canva Code', 'Google Apps Script', 'Google Sheets'],
        fileStructure: 'canva-gas',
    },
    {
        id: 'portfolio',
        name: '🔗 Portfolio / Link in Bio',
        description: 'A personal portfolio or link-in-bio page with social links and highlights.',
        stack: ['Canva Code', 'Google Apps Script'],
        fileStructure: 'canva-gas',
    },
    {
        id: 'corporate-website',
        name: '🏢 Corporate Website',
        description: 'A professional multi-page website for a business or organization.',
        stack: ['Canva Code', 'Google Apps Script', 'Google Sheets'],
        fileStructure: 'canva-gas',
    },
]

// Legacy export for backward compatibility in prompt engine
export const techStackPresets = appTypePresets

export const designVibePresets = [
    {
        id: 'minimalist',
        name: '✨ Clean & Minimal',
        description: 'Simple, elegant, lots of white space',
        colors: ['#FFFFFF', '#F8FAFC', '#0F172A', '#3B82F6', '#E2E8F0'],
        font: 'Inter',
        css: 'background: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0; font-weight: 400; letter-spacing: -0.01em;',
        darkMode: false,
    },
    {
        id: 'cyberpunk',
        name: '🌆 Neon & Dark',
        description: 'Glowing neon colors on a dark background',
        colors: ['#0A0A0F', '#1A1A2E', '#00FF88', '#FF0080', '#FFE600'],
        font: 'JetBrains Mono',
        css: 'background: #0A0A0F; border: 1px solid #00FF8833; box-shadow: 0 0 20px #00FF8822; color: #00FF88; font-family: monospace;',
        darkMode: true,
    },
    {
        id: 'glassmorphism',
        name: '🧊 Frosted Glass',
        description: 'Blurry see-through cards with soft glows',
        colors: ['#0B1220', '#60A5FA', '#A78BFA', '#F1F5F9', 'rgba(255,255,255,0.08)'],
        font: 'Inter',
        css: 'background: rgba(255,255,255,0.08); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); border-radius: 16px;',
        darkMode: true,
    },
    {
        id: 'neobrutalism',
        name: '🎯 Bold & Playful',
        description: 'Thick borders, heavy shadows, bright colors',
        colors: ['#FAFAF9', '#000000', '#F5D000', '#C8102E', '#3B82F6'],
        font: 'Space Grotesk',
        css: 'background: #FAFAF9; border: 3px solid #000; box-shadow: 4px 4px 0 #000; font-weight: 900; letter-spacing: 0.05em;',
        darkMode: false,
    },
    {
        id: 'retro',
        name: '🌈 Retro & Warm',
        description: 'Vintage gradients and warm sunset tones',
        colors: ['#FFF7ED', '#FB923C', '#A855F7', '#EC4899', '#FBBF24'],
        font: 'DM Sans',
        css: 'background: linear-gradient(135deg, #FFF7ED, #FEF3C7); border: 2px solid #FB923C; border-radius: 24px; color: #7C2D12;',
        darkMode: false,
    },
    {
        id: 'corporate',
        name: '💼 Professional',
        description: 'Trustworthy, clean, business-grade look',
        colors: ['#FFFFFF', '#F1F5F9', '#1E293B', '#2563EB', '#0EA5E9'],
        font: 'Outfit',
        css: 'background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);',
        darkMode: false,
    },
    {
        id: 'playful',
        name: '🎨 Fun & Colorful',
        description: 'Rounded shapes, bright pops of color, bouncy feel',
        colors: ['#FFFBEB', '#F472B6', '#34D399', '#818CF8', '#FACC15'],
        font: 'Nunito',
        css: 'background: #FFFBEB; border: 3px solid #F472B6; border-radius: 20px; color: #1E1B4B;',
        darkMode: false,
    },
    {
        id: 'dark-luxury',
        name: '🖤 Dark & Premium',
        description: 'Sleek dark theme with gold accents',
        colors: ['#09090B', '#18181B', '#D4AF37', '#F5F5F5', '#27272A'],
        font: 'Playfair Display',
        css: 'background: #09090B; border: 1px solid #27272A; color: #F5F5F5; font-family: serif;',
        darkMode: true,
    },
]

export const featureTemplates = [
    '📊 Save Data to Google Sheets',
    '📧 Auto-Send Email via Gmail',
    '📄 Generate PDF Document',
    '📅 Create Google Calendar Event',
    '💬 Auto-Redirect to WhatsApp',
    '📁 Upload File to Google Drive',
]
