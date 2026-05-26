/** @type {import('tailwindcss').Config} */

/*
 * Tailwind reads colors from the CSS variables defined in
 * src/app/brand-tokens.css. To change brand colors, edit ONLY that file.
 * This config maps the variable names to Tailwind class names.
 */
const withOpacity = (varName) => ({ opacityValue }) =>
  opacityValue !== undefined
    ? `rgb(var(${varName}) / ${opacityValue})`
    : `rgb(var(${varName}))`;

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        midnight:  withOpacity('--color-midnight'),
        slate2:    withOpacity('--color-slate-2'),
        slate3:    withOpacity('--color-slate-3'),
        ice:       withOpacity('--color-ice'),
        iceDim:    withOpacity('--color-ice-dim'),
        gold:      withOpacity('--color-gold'),
        goldSoft:  withOpacity('--color-gold-soft'),
        turf:      withOpacity('--color-turf'),
        leather:   withOpacity('--color-leather'),
        chalk:     withOpacity('--color-chalk'),
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      borderRadius: {
        sharp: '2px',
        card:  '4px',
      },
      boxShadow: {
        card:      '0 1px 0 0 rgba(244,242,236,0.06) inset, 0 0 0 1px rgba(244,242,236,0.04)',
        cardHover: '0 1px 0 0 rgba(224,169,58,0.18) inset, 0 0 0 1px rgba(224,169,58,0.18)',
      },
    },
  },
  plugins: [],
};
