/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgb(var(--color-border-rgb) / <alpha-value>)',
        input: 'rgb(var(--color-input-rgb) / <alpha-value>)',
        ring: 'rgb(var(--color-ring-rgb) / <alpha-value>)',
        background: 'rgb(var(--color-background-rgb) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground-rgb) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-primary-foreground-rgb) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-secondary-foreground-rgb) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-accent-foreground-rgb) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--color-destructive-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-destructive-foreground-rgb) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgb(var(--color-success-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-success-foreground-rgb) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--color-warning-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-warning-foreground-rgb) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'rgb(var(--color-error-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-error-foreground-rgb) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-muted-foreground-rgb) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgb(var(--color-card-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-card-foreground-rgb) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--color-popover-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-popover-foreground-rgb) / <alpha-value>)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        heading: ['Crimson Text', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['IBM Plex Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      scale: {
        '97': '0.97',
      },
      ringWidth: {
        '3': '3px',
      },
      ringOffsetWidth: {
        '3': '3px',
      },
      zIndex: {
        '90': '90',
        '100': '100',
        '200': '200',
        '300': '300',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}