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
