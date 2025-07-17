/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#52b788',
          DEFAULT: '#1e8a4e',
          dark: '#0d5c30',
        },
        secondary: {
          light: '#ffba33',
          DEFAULT: '#ffa500',
          dark: '#cc8400',
        },
        golden: {
          light: '#FFD700',
          DEFAULT: '#DAA520',
          dark: '#B8860B',
        },
        deepGreen: {
          light: '#0A4D30',
          DEFAULT: '#053820',
          dark: '#021C10',
        },
        glossy: {
          light: '#F8F9FA',
          DEFAULT: '#E9ECEF',
          dark: '#343A40',
        },
        trueBlack: '#000000',
        darkGray: '#1A1A1A',
        charcoal: '#2C2C2C',
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db',
        neon: {
          blue: '#00FFFF',
          green: '#00FF00',
          purple: '#FF00FF',
          orange: '#FF6600',
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'shimmer-light': 'shimmer-light 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'border-spin': 'border-spin 3s linear infinite',
        scanline: 'scanline 2s linear infinite',
        'tech-pulse': 'tech-pulse 1.5s ease-in-out infinite',
        'data-flow': 'data-flow 4s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'shimmer-light': {
          '0%': { 
            backgroundPosition: '-200% 0',
            opacity: '0.3'
          },
          '50%': {
            opacity: '0.8'
          },
          '100%': { 
            backgroundPosition: '200% 0',
            opacity: '0.3'
          },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(218, 165, 32, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(218, 165, 32, 0.8)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(218, 165, 32, 0.3), 0 0 10px rgba(218, 165, 32, 0.2)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 15px rgba(218, 165, 32, 0.6), 0 0 25px rgba(218, 165, 32, 0.4)',
            transform: 'scale(1.02)'
          },
        },
        'border-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanline: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'tech-pulse': {
          '0%, 100%': { 
            opacity: '0.4',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05)'
          },
        },
        'data-flow': {
          '0%': { 
            transform: 'translateX(-100%) translateY(0)',
            opacity: '0'
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { 
            transform: 'translateX(100%) translateY(-10px)',
            opacity: '0'
          },
        },
        'hologram': {
          '0%, 100%': { 
            opacity: '0.8',
            filter: 'hue-rotate(0deg)'
          },
          '50%': { 
            opacity: '1',
            filter: 'hue-rotate(90deg)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'golden-gradient': 'linear-gradient(135deg, #FFD700, #DAA520, #B8860B)',
        'green-gradient': 'linear-gradient(135deg, #52b788, #1e8a4e, #0d5c30)',
        'glossy-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        'tech-grid': 'linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(45deg, #00FFFF, #FF00FF, #00FF00, #FF6600)',
        'cyber-gradient': 'linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1), rgba(0,255,0,0.1))',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
      },
      backgroundSize: {
        'tech-grid': '20px 20px',
      },
    },
  },
  plugins: [],
}