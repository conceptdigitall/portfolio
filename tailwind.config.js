/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'digital-black': '#0624C7', // Azul Escuro profundo
                'digital-primary': '#FCE026', // Amarelo Sotaque
                'digital-secondary': '#FFFFFF', // Branco puro
                'digital-white': '#FFFFFF', // Branco puro
                'concept-blue': '#0624C7',
                'concept-white': '#FFFFFF',
                'concept-yellow': '#FCE026',
                'concept-gray': '#F8FAFC',
                'concept-darkblue': '#041885',
                'concept-ink': '#0B1030',
                'concept-muted': '#4A5070',
                'concept-line': '#E1E4EE',
                'concept-ground': '#F3F4F8',
                'concept-tint': '#DCE3FF',
                'concept-soft': '#EEF1FA',
                'whatsapp': '#25D366',
                // Tema dark premium (2026-09-25)
                'night': '#06081A',        // fundo da página
                'night-card': '#0C1030',   // cards
                'night-raise': '#111740',  // card em destaque / miniaturas
                'night-line': '#1E2550',   // contorno dos cards
                'night-edge': '#2A3160',   // contorno de botões e divisórias
                'night-rule': '#161B3D',   // linhas do cabeçalho e rodapé
                'night-text': '#F3F4FA',   // texto principal
                'night-soft': '#C7CBE0',   // links e navegação
                'night-muted': '#A3A9C7',  // texto secundário
                'night-dim': '#7F86A8',    // rótulos pequenos
                'concept-sky': '#6E86FF',  // azul legível sobre o escuro
                'concept-electric': '#3D5BFF',
            },
            fontFamily: {
                montserrat: ['var(--font-montserrat)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
                poppins: ['var(--font-poppins)', 'sans-serif'],
            },
            backgroundImage: {
                'luxury-gradient': 'linear-gradient(to bottom right, #001233, #001f3f, #002855)',
            },
            skew: {
                '-10': '-10deg',
            },
            borderRadius: {
                'card': '2px',
                'sharp': '2px',
                'none': '0px',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: 0.1, transform: 'scale(1)' },
                    '50%': { opacity: 0.3, transform: 'scale(1.1)' },
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-fast': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
                'matrix-scroll': 'matrix 20s linear infinite', // For code rain
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            }
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.preserve-3d': {
                    'transform-style': 'preserve-3d',
                },
                '.perspective-1000': {
                    'perspective': '1000px',
                },
                '.perspective-2000': {
                    'perspective': '2000px',
                },
                '.backface-hidden': {
                    'backface-visibility': 'hidden',
                },
                '.rotate-x-60': {
                    'transform': 'rotateX(60deg)',
                },
                '.rotate-z-45': {
                    'transform': 'rotateZ(45deg)',
                },
                '.rotate-y-12': {
                    'transform': 'rotateY(12deg)',
                },
            }
            addUtilities(newUtilities)
        }
    ],
}
