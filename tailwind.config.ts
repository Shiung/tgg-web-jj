import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindcssAnimate from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      xs: '375px',
      ...defaultTheme.screens,
    },
    fontWeight: {
      ...defaultTheme.fontWeight,
      ultra: '1000',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        app: {
          red: '#FF4D48',
          orange: '#FEBC02',
          yellow: '#FDCB04',
          green: '#3AE45A',
          cyan: '#25D7D8',
          blue: '#2D9BE6',
          pink: '#F54798',
          purple: '#7D2FD7',
        },
      },
      height: {
        header: 'var(--header-height)',
        nav: 'var(--bottom-nav-safe-padding)',
      },
      maxHeight: {
        main: 'calc(100dvh - var(--header-height) - var(--bottom-nav-safe-padding))',
        'main-without-nav': 'calc(100dvh - var(--header-height))',
        'main-without-header': 'calc(100dvh - var(--bottom-nav-safe-padding))',
        'main-without-header-nav': '100dvh',
      },
      padding: {
        safe: 'var(--bottom-nav-safe-padding)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'background-wave': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-with-pause': {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        'fall-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'background-wave': 'background-wave 4s linear infinite',
        'spin-with-pause': 'spin-with-pause 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) infinite',
        'fall-down': 'fall-down 0.3s ease-out forwards',
      },
      backgroundImage: {
        'colorLinear-red': 'linear-gradient(180deg, #FF8C8C 0%, #FF0E03 100%)',
        'colorLinear-orange': 'linear-gradient(180deg, #FFB800 0%, #FF8C00 100%)',
        'colorLinear-green': 'linear-gradient(180deg, #92EE6D 0%, #007E36 100%)',
        'colorLinear-cyan': 'linear-gradient(180deg, #4BFCFF 0%, #00B3B0 100%)',
        'colorLinear-blue': 'linear-gradient(180deg, #5ACDFF 0%, #0067CD 100%)',
        'colorLinear-purple': 'linear-gradient(180deg, #A95FFF 0%, #5200B0 100%)',
        'colorLinear-pink': 'linear-gradient(180deg, #FF90C2 0%, #EB0070 100%)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config
