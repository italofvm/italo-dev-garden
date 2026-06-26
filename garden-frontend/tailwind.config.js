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
        DEFAULT: {
          css: {
            // Spacing melhorado
            'p': {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              lineHeight: '1.75',
            },
            'h1, h2, h3, h4, h5, h6': {
              marginTop: '2rem',
              marginBottom: '1.25rem',
              fontWeight: '700',
            },
            'h1': { fontSize: '2.25rem' },
            'h2': { fontSize: '1.875rem' },
            'h3': { fontSize: '1.5rem' },
            'h4': { fontSize: '1.25rem' },
            // Listas com espaçamento
            'ul, ol': {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.75rem',
            },
            'li': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            // Blockquotes melhoradas
            'blockquote': {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              paddingLeft: '1rem',
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.accent'),
              fontStyle: 'italic',
            },
            // CODE BLOCKS: o melhor parte!
            'pre': {
              backgroundColor: '#0f172a',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              border: `1px solid ${theme('colors.darkBorder')}`,
              overflow: 'auto',
              lineHeight: '1.5',
            },
            'code': {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.875em',
              fontWeight: '500',
            },
            // Code inline (sem highlight, só marcado)
            'code:not(pre code)': {
              backgroundColor: theme('colors.darkCard'),
              color: theme('colors.accent'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontSize: '0.875em',
              border: `1px solid ${theme('colors.darkBorder')}`,
            },
            // Links com acento
            'a': {
              color: theme('colors.accent'),
              textDecoration: 'underline',
              transition: 'color 0.2s',
              '&:hover': {
                color: theme('colors.accentHover'),
              },
            },
            // Imagens responsivas
            'img': {
              borderRadius: '0.75rem',
              maxWidth: '100%',
              height: 'auto',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            // Table styling
            'table': {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              borderCollapse: 'collapse',
            },
            'th, td': {
              padding: '0.75rem',
              borderBottom: `1px solid ${theme('colors.darkBorder')}`,
              textAlign: 'left',
            },
            'thead': {
              backgroundColor: theme('colors.darkCard'),
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.neutral.300'),
            '--tw-prose-headings': theme('colors.neutral.100'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': theme('colors.neutral.100'),
            '--tw-prose-code': theme('colors.accent'),
            '--tw-prose-pre-bg': '#0f172a',
            '--tw-prose-pre-code': theme('colors.neutral.300'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
