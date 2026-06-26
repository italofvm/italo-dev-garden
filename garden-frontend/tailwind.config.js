/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0A0A0C',
        darkCard: '#121215',
        darkBorder: '#1F1F23',
        lightBg: '#FAF9F6',
        lightCard: '#FFFFFF',
        lightBorder: '#E5E5E0',
        accent: '#6366F1',
        accentHover: '#4F46E5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.neutral.300'),
            '--tw-prose-headings': theme('colors.neutral.100'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': theme('colors.neutral.100'),
            '--tw-prose-code': theme('colors.accent'),
            '--tw-prose-pre-bg': theme('colors.darkCard'),
            '--tw-prose-pre-code': theme('colors.neutral.300'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
